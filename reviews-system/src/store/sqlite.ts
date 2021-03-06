import * as math_ from 'mathjs';
import initSqlJs from 'sql.js';
import moment, {Moment} from 'moment';

interface CheckIndexSyncInput {
  date: [string, string];     // ['2020-01-01', '2020-01-07']
  factor: string[];           // ['store[]','Image@1[]','Video@1[]']
  asid: string;               // a1023s105
}

interface CheckIndexSyncOutput {
  date: [string, string];     // ['2020-01-01', '2020-01-07']
  factor: string[];           // ['store[]','store[F]','store[M]']
  asid: string;               // a1023s105
}

interface WriteDataSyncInput {
  [asid: string]: {
    [date: string]: {
      [factor: string]: number[]
    };
  };
}

interface WriteImageSyncInput {
  [asid: string]: {
    [date: string]: {
      [cameraId: number]: string
    };
  };
}

interface WriteVideoSyncInput {
  [asid: string]: {
    [date: string]: {
      [cameraId: number]: {
        start: number;
        end: number;
        url: string;
      };
    };
  };
}

interface WriteFileSyncInput {
  [asid: string]: {
    [date: string]: {
      [index: string]: string;
    };
  };
}

interface WriteConfigSyncInput {
  [asid: string]: {
    [date: string]: any;
  };
}

interface DataFromDB {
  columns: string[][];
  values: string[][];
}

/////////////////////////////////////////////////
// StoreThen
/////////////////////////////////////////////////
// tslint:disable:max-classes-per-file
class StoreThen {
  private db_: any;
  private asid_: string;

  constructor(db: any, asid: string) {
    this.db_ = db;
    this.asid_ = asid;
  }

  public facc(): string {
    try {
      const faccFileResult: DataFromDB[] = this.db_.exec(`
        SELECT url FROM tbl_facc_csv WHERE store_id = '${this.asid_}';
      `);
      const url: string = Object.values(faccFileResult[0].values).toString();
      return url;
    } catch (err) {
      console.error(`get facc function fail, ${err.message}`);
      throw err;
    }
  }
}



/////////////////////////////////////////////////
// Database
/////////////////////////////////////////////////

class Database {
  private db_: any;

  public store(asid: string = ''): StoreThen {
    if (asid.length === 0) throw new Error('invalid asid');
    return new StoreThen(this.db_, asid);
  }

  public async initialize(): Promise<boolean> {
    try {
      const SQL = await initSqlJs({
        locateFile: (filename: any, prefix: any) => {
          return `${prefix}/${filename}`;
        }
      });
      this.db_ = new SQL.Database();
      this.db_.run(`
        -- create tbl_factor_data --
        CREATE TABLE IF NOT EXISTS tbl_factor_data(store_id text, date date, factor text,
        data text, sum integer, region text, store_type text,
        PRIMARY KEY (store_id, date, factor));
        -- create tbl_index --
        CREATE TABLE IF NOT EXISTS tbl_index(store_id text, factor text, week date,
        PRIMARY KEY (store_id, factor, week));
        -- create tbl_image --
        CREATE TABLE IF NOT EXISTS tbl_image(store_id text, date date, camera_id integer, url text,
        PRIMARY KEY (store_id, date, camera_id));
        -- create tbl_video --
        CREATE TABLE IF NOT EXISTS tbl_video(store_id text, date date, camera_id integer, start integer,
        end integer , url text, PRIMARY KEY (store_id, date, camera_id, start, end));
        -- create tbl_facc_csv --
        CREATE TABLE IF NOT EXISTS tbl_facc_csv(store_id text, url text,
          PRIMARY KEY (store_id));
        -- create tbl_config --
        CREATE TABLE IF NOT EXISTS tbl_config(store_id text, date date, config text,
          PRIMARY KEY (store_id, date));
      `);
      return true;
    } catch (err) {
      console.error(`initialize database fail, ${err.message}`);
      return false;
    }
  }

  public export(file: string = 'file.db'): boolean {
    if (!this.db_) return false;
    const blob = new Blob([this.db_.export()]);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(blob);
    a.download = file;
    a.onclick = () => {
      setTimeout(() => {
        window.URL.revokeObjectURL(a.href);
      }, 1500);
    };
    a.click();
    return true;
  }

  public async checkConfigSync(asid: string): Promise<boolean> {
    const result: DataFromDB[] = this.db_.exec(`
      SELECT config FROM tbl_config
      WHERE store_id = '${asid}'
    ;`);
    return !(result.length === 0);
  }

  public async writeConfigSync(input: WriteConfigSyncInput): Promise<boolean> {
    try {
      let sqlString: string = '';
      for (const asid of Object.keys(input)) {
        for (const date of Object.keys(input[asid])) {
          const configData: string = JSON.stringify(input[asid][date]);
          sqlString += `INSERT INTO tbl_config VALUES ('${asid}', '${this.stringToDate(date)}', '${configData}');`;
        }
      }
      this.db_.run(sqlString);
      return true;
    } catch (err) {
      console.error(`writeConfigSync function fail, ${err.message}`);
      return false;
    }
  }

  public async writeDataSync(input: WriteDataSyncInput): Promise<boolean> {
    try {
      let sqlString: string = '';
      const allData: {[index: string]: any} = {};
      for (const asid of Object.keys(input)) {
        for (const date of Object.keys(input[asid])) {
          const week: string = this.dateToWeek(date);
          for (const factor of Object.keys(input[asid][date])) {
            const data: number[] = input[asid][date][factor];
            sqlString += `INSERT INTO tbl_factor_data VALUES ('${asid}', '${this.stringToDate(date)}', '${factor}'
            , '[${data}]', ${this.sumFactorData(data)},'TW','retail');`;
            allData[`${week}.${factor}`] = {asid, factor, week};
          }
        }
      }
      let indexUpdateString: string = '';
      for (const d of Object.values(allData)) {
        indexUpdateString += `INSERT INTO tbl_index VALUES('${d.asid}', '${d.factor}', '${d.week}');`;
      }
      this.db_.run(sqlString);
      this.db_.run(indexUpdateString);
      return true;
    } catch (err) {
      console.error(`writeDataSync function fail, ${err.message}`);
      return false;
    }
  }

  public async checkDataSync(input: CheckIndexSyncInput): Promise<CheckIndexSyncOutput[]> {
    const allDataList: {[key: string]: any} = this.inputToObject(input);
    const result: DataFromDB[] = this.db_.exec(`
      SELECT factor, week FROM tbl_index
      WHERE store_id = '${input.asid}'
      AND factor IN ('${input.factor.join(`','`)}')
      AND week >= '${this.dateToWeek(input.date[0])}'
      AND week <= '${this.dateToWeek(input.date[1])}'
    `);
    // if (result.length === 0) {}
    for (const d of result[0].values) {
      const factor: string = d[0];
      const week: string = d[1];
      delete allDataList[`${factor}.${week}`];
    }
    const pair: Map<string, string[]> = this.allDataToMap(allDataList);
    const output: CheckIndexSyncOutput[] = [];
    for (const [week, factor] of pair) {
      const monday: string = this.findDayOfWeek(week, 1);
      const sunday: string = this.findDayOfWeek(week, 7);
      output.push({date: [monday, sunday], factor, asid: input.asid});
    }
    return output;
  }

  public async writeImageSync(input: WriteImageSyncInput): Promise<boolean> {
    try {
      let sqlString: string = '';
      const allData: {[index: string]: any} = {};
      for (const asid of Object.keys(input)) {
        for (const date of Object.keys(input[asid])) {
          const week: string = this.dateToWeek(date);
          for (const camera of Object.keys(input[asid][date])) {
            const cameraInt: number = Number(camera);
            const url: string = input[asid][date][cameraInt];
            sqlString += `INSERT INTO tbl_image VALUES(
            '${asid}', '${this.stringToDate(date)}', '${cameraInt}', '${url}');`;
            allData[`${week}.${camera}`] = {asid, camera, week};
          }
        }
      }
      let indexUpdateString: string = '';
      for (const d of Object.values(allData)) {
        indexUpdateString += `INSERT INTO tbl_index
        VALUES('${d.asid}', '${'Image@' + d.camera + '[]'}', '${d.week}');`;
      }
      this.db_.run(sqlString);
      this.db_.run(indexUpdateString);
      return true;
    } catch (err) {
      console.error(`writeImageSync function fail, ${err.message}`);
      return false;
    }
  }

  public async checkImageSync(input: CheckIndexSyncInput): Promise<CheckIndexSyncOutput[] | []> {
    const allDataList: {[key: string]: any} = this.inputToObject(input);
    const result: DataFromDB[] = this.db_.exec(`
      SELECT factor, week FROM tbl_index
      WHERE store_id = '${input.asid}'
      AND factor IN ('${input.factor.join(`','`)}')
      AND week >= '${this.dateToWeek(input.date[0])}'
      AND week <= '${this.dateToWeek(input.date[1])}'
    `);
    const output: CheckIndexSyncOutput[] = [];
    for (const d of result[0].values) {
      const factor: string = d[0];
      const week: string = d[1];
      delete allDataList[`${factor}.${week}`];
    }
    if (allDataList !== null) {
      const pair: Map<string, string[]> = this.allDataToMap(allDataList);
      for (const [week, factor] of pair) {
        const monday: string = this.findDayOfWeek(week, 1);
        const sunday: string = this.findDayOfWeek(week, 7);
        output.push({date: [monday, sunday], factor, asid: input.asid});
      }
    } else {
      return [];
    }
    return output;
  }

  public async writeVideoSync(input: WriteVideoSyncInput): Promise<boolean> {
    try {
      let sqlString: string = '';
      const allData: {[index: string]: any} = {};
      for (const asid of Object.keys(input)) {
        for (const date of Object.keys(input[asid])) {
          const week: string = this.dateToWeek(date);
          for (const camera of Object.keys(input[asid][date])) {
            const cameraInt: number = Number(camera);
            const data: {[index: string]: any} = input[asid][date][cameraInt];
            sqlString += `INSERT INTO tbl_video VALUES('${asid}', '${this.stringToDate(date)}',
            '${cameraInt}', '${data.start}', '${data.end}', '${data.url}');`;
            allData[`${week}.${camera}`] = {asid, camera, week};
          }
        }
      }
      let indexUpdateString: string = '';
      for (const d of Object.values(allData)) {
        indexUpdateString += `INSERT INTO tbl_index
        VALUES('${d.asid}', '${'Video@' + d.camera + '[]'}', '${d.week}');`;
      }
      this.db_.run(sqlString);
      this.db_.run(indexUpdateString);
      return true;
    } catch (err) {
      console.error(`writeVideoSync function fail, ${err.message}`);
      return false;
    }
  }

  public async checkVideoSync(input: CheckIndexSyncInput): Promise<CheckIndexSyncOutput[]> {
    const allDataList: {[key: string]: any} = this.inputToObject(input);
    const result: DataFromDB[] = this.db_.exec(`
      SELECT factor, week FROM tbl_index
      WHERE store_id = '${input.asid}'
      AND factor IN ('${input.factor.join(`','`)}')
      AND week >= '${this.dateToWeek(input.date[0])}'
      AND week <= '${this.dateToWeek(input.date[1])}'
    `);
    for (const d of result[0].values) {
      const factor: string = d[0];
      const week: string = d[1];
      delete allDataList[`${factor}.${week}`];
    }
    const pair: Map<string, string[]> = this.allDataToMap(allDataList);
    const output: CheckIndexSyncOutput[] = [];
    for (const [week, factor] of pair) {
      const monday: string = this.findDayOfWeek(week, 1);
      const sunday: string = this.findDayOfWeek(week, 7);
      output.push({date: [monday, sunday], factor, asid: input.asid});
    }
    return output;
  }

  public async writeFileSync(input: WriteFileSyncInput): Promise<boolean> {
    try {
      let sqlString: string = '';
      const allData: {[index: string]: any} = {};
      for (const asid of Object.keys(input)) {
        for (const date of Object.keys(input[asid])) {
          for (const fileName of Object.keys(input[asid][date])) {
            const url: string = input[asid][date][fileName];
            const week: string = this.dateToWeek(date);
            const factor: string = 'File@' + fileName + '[].pdf';
            sqlString += `INSERT INTO tbl_file VALUES(
            '${asid}', '${this.stringToDate(date)}', '${fileName}', '${url}');`;
            allData[`${week}.${factor}`] = {asid, factor, week};
          }
        }
      }
      let indexUpdateString: string = '';
      for (const d of Object.values(allData)) {
        indexUpdateString += `INSERT INTO tbl_index
        VALUES('${d.asid}', '${d.factor}', '${d.week}');`;
      }
      this.db_.run(sqlString);
      this.db_.run(indexUpdateString);
      return true;
    } catch (err) {
      console.error(`writeFileSync function fail, ${err.message}`);
      return false;
    }
  }

  public async checkFileSync(input: CheckIndexSyncInput): Promise<CheckIndexSyncOutput[]> {
    const allDataList: {[key: string]: any} = this.inputToObject(input);
    const result: DataFromDB[] = this.db_.exec(`
      SELECT factor, week FROM tbl_index
      WHERE store_id = '${input.asid}'
      AND factor IN ('${input.factor.join(`','`)}')
      AND week >= '${this.dateToWeek(input.date[0])}'
      AND week <= '${this.dateToWeek(input.date[1])}'
    `);
    for (const d of result[0].values) {
      const factor: string = d[0];
      const week: string = d[1];
      delete allDataList[`${factor}.${week}`];
    }
    const output: CheckIndexSyncOutput[] = [];
    for (const data of Object.values(allDataList)) {
      const monday: string = this.findDayOfWeek(data.week, 1);
      const sunday: string = this.findDayOfWeek(data.week, 7);
      output.push({date: [monday, sunday], factor: data.factor, asid: input.asid});
    }
    return output;
  }

  private sumFactorData(factordata: number[]): string {
    return math_.sum(factordata).toString();
  }

  private stringToDate(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }

  private dateToWeek(date: string): string {
    return moment(date).format('YYYYWW');
  }

  private inputToObject(input: CheckIndexSyncInput): object {
    const allDataList: {[key: string]: any} = {};
    const dateT0: Moment = moment(input.date[0]);
    const dateT1: Moment = moment(input.date[1]).add(7, 'd');
    for (const d: Moment = dateT0; d.isBefore(dateT1); d.add(7, 'd')) {
      const week: string = d.format('YYYYWW');
      for (const factor of input.factor) {
        allDataList[`${factor}.${week}`] = {factor, week};
      }
    }
    return allDataList;
  }

  private allDataToMap(input: object): Map<string, string[]> {
    const pair: Map<string, string[]> = new Map();
    for (const d of Object.values(input)) {
      const factor: string[] | undefined = pair.get(d.week);
      if (factor) factor.push(d.factor);
      else pair.set(d.week, [d.factor]);
    }
    return pair;
  }

  private findDayOfWeek(input: string, day: number): string {
    const year: number = Number(input.slice(0, 4));
    const week: number = Number(input.slice(4, 6));
    return moment().year(year).week(week).day(day).format('YYYY-MM-DD');
  }

}
export default Database;
