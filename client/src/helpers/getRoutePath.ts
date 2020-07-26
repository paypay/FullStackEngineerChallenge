import { getLocale } from "./getLocale";
import Router from "next/router";

export const getRoutePath = (pathName: string) => {
  return pathName.replace("[lang]", getLocale());
};

export const getLocationSearch = () => {
  return location.search || "?";
};

export const getCurrentLocationParams = () => {
  const query = { ...Router.query };
  // remove crud related params
  ["view", "create", "edit", "delete"].forEach((key: string) => {
    delete query[key];
  });

  return "?" + new URLSearchParams(query as Record<string, string>);
};
