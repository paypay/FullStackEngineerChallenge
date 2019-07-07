import Axios, { AxiosRequestConfig } from "axios";
import { showAlert } from "~/components/GlobalAlert";

const apiBase = "/api/v1";

interface APIError {
  message: string;
  code: string;
}

const request = async (
  config: AxiosRequestConfig
): Promise<[null | APIError, any]> => {
  config.url = apiBase + config.url;

  let res: [null | APIError, object] = [null, {}];

  try {
    const { data } = await Axios(config);
    res = [null, data];
  } catch (e) {
    // TODO: better error messages from API response
    if (e.message === "Network Error" || !e.response) {
      res = [
        {
          code: "network.error",
          message: "Network Error, please check"
        },
        {}
      ];
    } else if (e.response.status === 400) {
      res = [
        {
          code: "request.malformed",
          message: "Request data is not valid"
        },
        {}
      ];
    } else if (e.response.status === 401) {
      res = [
        {
          code: "auth.required",
          message: "Please login"
        },
        {}
      ];
    } else if (e.response.status === 403) {
      res = [
        {
          code: "auth.forbidden",
          message: "Please relogin with proper account"
        },
        {}
      ];
    } else {
      res = [
        {
          code: "unexpected",
          message: "Unexpected error"
        },
        {}
      ];
    }
  }

  // if there is error
  if (res[0] !== null) {
    showAlert({ message: res[0].message });
  }

  return res;
};

export default {
  get(pathname: string, params?: object) {
    return request({ method: "get", url: pathname, params });
  },
  delete(pathname: string, params?: object) {
    return request({ method: "delete", url: pathname, params });
  },
  put(pathname: string, data?: object) {
    return request({ method: "put", url: pathname, data });
  },
  post(pathname: string, data?: object) {
    return request({ method: "post", url: pathname, data });
  }
};
