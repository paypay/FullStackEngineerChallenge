import Database from './sqlite';
import * as axios from 'axios';

interface LoginInput {
  username: string;
  password: string;
}

interface ConfigureInput {
  selectedDates: [string, string];
  comparedDates: [string, string];
  storeID: string;
  factor: string[];
  selectedData: string[];
  image: number[];
  video: number[];
  file: string[];
}

interface CheckIndexSyncInput {
  date: [string, string];   // ['2020-01-01', '2020-01-07']
  factor: string[];         // ['store[]','Image@1[]','Video@1[]', 'File[]']
  asid: string;             // a1023s105
}

interface CheckIndexSyncOutput {
  date: [string, string];   // ['2020-01-01', '2020-01-07']
  factor: string[];         // ['store[]','store[F]','store[M]']
  asid: string;             // a1023s105
}

interface CheckConfigSyncInput {
  asid: string;
  date: [string, string];
}

interface CheckConfigSyncOutput {
  asid: string;
  date: [string, string];
}

interface QueryData {
  date: [string, string];
  select: Array<{
    store_id: string;
    factor?: string[];
    image?: number[];
    video?: number[];
    file?: string[];
  }>;
}

interface QueryConfigData {
  select: Array<{
    store_id: string;
    file: string[];
  }>;
}

interface Summary {
  [asid: string]: {
    [date: string]: {
      [factor: string]: number[],
    };
  };
}

interface Image {
  [asid: string]: {
    [date: string]: {
      [cameraId: number]: string[]
    };
  };
}

interface Video {
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

interface File {
  [asid: string]: string[];
}

interface Result {
  data: Summary;
  image?: Image;
  video?: Video;
  file?: File;
}

interface ConfigResult {
  data?: Summary;
  image?: Image;
  video?: Video;
  file: File;
}

interface Config {
  [asid: string]: {
    [date: string]: any;
  };
}

class SourceData {
  public skyrec: axios.AxiosInstance;
  public header: any = {};
  public constructor() {
    this.skyrec = axios.default.create({baseURL: `https://api.skyrec.cc`});
    this.header = {'Content-Type': 'application/json'};
  }
  public getData(body: QueryData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.header.authorization = 'JWT cb80febd750bd0d59bd7f451ae82c163edbc105bc9956c473178e782d14cebaea9c2516d0b148fa40af279001922755764d324e10e961b0617abfcdde64d09f31c1976ffbc8905ddba0f688c759d29433b9e46d7c7c455900c4f112f382540eea714e84a575324656a45f53304d8d476dea2332e54386199226b32285314b688eb02fe4536c1d8e082f4dac91fd25680fb326b4144313e54fd07d693e049d75adb81d9c980c6fe6d';
      this.skyrec.post('/v1/query/data', body, {headers: this.header}).then((res: any) => {
        resolve(res.data);
      }).catch(() => {
        reject();
      });
    });
  }
  public getConfig(body: QueryConfigData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.header.authorization = 'JWT cb80febd750bd0d59bd7f451ae82c163edbc105bc9956c473178e782d14cebaea9c2516d0b148fa40af279001922755764d324e10e961b0617abfcdde64d09f31c1976ffbc8905ddba0f688c759d29433b9e46d7c7c455900c4f112f382540eea714e84a575324656a45f53304d8d476dea2332e54386199226b32285314b688eb02fe4536c1d8e082f4dac91fd25680fb326b4144313e54fd07d693e049d75adb81d9c980c6fe6d';
      this.skyrec.post('/v1/query/data', body, {headers: this.header}).then((res: any) => {
        resolve(res.data);
      }).catch(() => {
        reject();
      });
    });
  }
  public getConfigData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.default.get(url).then((res: any) => {
        resolve(res.data);
      }).catch(() => {
        reject();
      });
    });
  }
}

const db = new Database();
db.initialize();

export default {
  async login(helper: any, input: LoginInput): Promise<boolean> {
    const {state} = helper;
    await mockCloudLogin();
    return true;
  }
};

/////////////////////////////////////
// Mock Function // 模擬功能
/////////////////////////////////////
function mockCloudLogin() {
  return new Promise((done) => {
    setTimeout(done, 2000);
  });
}
