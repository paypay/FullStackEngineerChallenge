import initSqlJs from 'sql.js';
import moment, {Moment} from 'moment';

export class Database {
  private db_: any;

  public async initialize(): Promise<boolean> {
    try {
      const response: Response = await fetch('demoSiteData.sqlite');
      const buffer: ArrayBuffer = await response.arrayBuffer();
      const SQL = await initSqlJs({
        locateFile: (filename: any, prefix: any) => {
          return `${prefix}${filename}`;
        }
      });
      this.db_ = new SQL.Database(new Uint8Array(buffer));
      return true;
    } catch (err) {
      console.error(`initialize database fail, ${err.message}`);
      return false;
    }
  }
}
export default Database;
