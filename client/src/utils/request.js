import jwt_decode from "jwt-decode";
const API_PATH = "http://localhost:8080/api/paypay";

const createFetchOptions = (options, accessToken) => {
  const mergedOptions = { ...options };

  if (!mergedOptions.headers) {
    mergedOptions.headers = {};
  }
  if (!mergedOptions.headers.Authorization) {
    mergedOptions.headers.Authorization = accessToken;
  }
  return mergedOptions;
};

const authorizedFetch = (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken)
    throw new FetchException("Access token not found or empty!");
  const decoded = jwt_decode(accessToken);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    localStorage.removeItem("accessToken");
    window.location.href = "/logout";
  }
  return fetch(url, createFetchOptions(options, accessToken));
};

export const doLogin = async (baseUrl, data) => {
  const res = await doPost(baseUrl, data, false);
  const { token, ...rest } = res;
  if (token) {
    localStorage.setItem("accessToken", token);
  }

  return { ...rest };
};

export const doPut = async (baseUrl, data) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return await request(baseUrl, options);
};

export const doDelete = async (baseUrl) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await request(baseUrl, options);
};

export const doPost = async (baseUrl, data, auth) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return await request(baseUrl, options, auth);
};

export const doGet = async (baseUrl) => {
  const options = {
    method: "GET",
  };
  const res = await request(baseUrl, options);
  return res;
};

const request = (baseUrl, options, auth = true) => {
  let hasError = false;
  const fetchFn = auth
    ? authorizedFetch(`${API_PATH}${baseUrl}`, options)
    : fetch(`${API_PATH}${baseUrl}`, options);
  return fetchFn
    .then((response) => {
      hasError = !response.ok;
      const contentType = response.headers.get("content-type");
      if (contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else if (contentType.indexOf("text/plain") !== -1) {
        return response.text();
      } else {
        hasError = true;
        return new Error("Unrecognized response type");
      }
    })
    .then((data) => {
      if (hasError) {
        throw new Error(data.message);
      }
      return data;
    });
};

class FetchException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  getMessage() {
    return this.message;
  }
}
