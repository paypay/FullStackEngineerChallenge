import useSWR from 'swr';
import {
  ApiAssetsReturnType,
  AssetsQueriesType,
  AssetsType
} from './ss-typings';
export type { EmployeeType, ReviewType } from './ss-typings';
export const versionPrefix = 'v1';
export const assetsApiEndpoint = `http://localhost:9090/${versionPrefix}/data`;

const paramsBuilder = <T>(obj: T): string => {
  let str = '';
  for (const key in obj) {
    if (str != '') {
      str += '&';
    }
    str += key + '=' + obj[key];
  }
  if (str.length !== 0) {
    return '?' + str;
  } else {
    return str;
  }
};

export const apiRoutes = {
  employees: `${assetsApiEndpoint}/employees`,
  reviews: `${assetsApiEndpoint}/reviews`
};

export const staticEmployees = {
  admin: {
    department: 'Admin',
    name: 'Irving Armenta',
    photoUrl: 'https://picsum.photos/id/0/230/250',
    rating: 5,
    email: 'irving.armenta@gmail.com',
    reviews: []
  },
  regular: {
    department: 'Regular',
    name: 'Regular Joe',
    photoUrl: 'https://picsum.photos/id/1010/230/250',
    rating: 2,
    email: 'regular.joe@gmail.com',
    reviews: []
  }
};

export const dataFetcher = async <T extends keyof AssetsType>(uri: string) => {
  const res = await fetch(uri);
  const resJson = ((await res.json()) as unknown) as ApiAssetsReturnType<T>;
  return resJson;
};

export const useDataApi = <T extends keyof AssetsType>(
  config: { assetType: T; query?: AssetsQueriesType },
  initialData?: ApiAssetsReturnType<T>
) => {
  const { data, error } = useSWR<ApiAssetsReturnType<T>>(
    `${apiRoutes[config.assetType]}${paramsBuilder(config.query)}`,
    dataFetcher,
    {
      initialData
    }
  );

  return {
    isLoading: !data && !error,
    fetchedData: data,
    error
  };
};
