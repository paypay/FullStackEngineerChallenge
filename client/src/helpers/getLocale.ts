import Router from "next/router";

import { COOKIE_LANGUAGE, DEFAULT_LOCALE } from "../constants";
import localeDisplayNames from "../locales/localeDisplayNames.json";
import cookies from "./cookies";

export const isLocale = (tested?: string) =>
  // Check if tested locale is defined and return true if it's exist on catalogs
  !!(
    tested &&
    Object.keys(localeDisplayNames).some((locale) => locale === tested)
  );

export function getLocale(): string {
  const isSSR = typeof window !== undefined;
  const languageFromCookie = cookies().get(COOKIE_LANGUAGE);
  const languageFromUrl = Router.query.lang as string;

  if (languageFromUrl && isLocale(languageFromUrl)) {
    return languageFromUrl;
  }

  if (isLocale(languageFromCookie)) {
    return languageFromCookie;
  }

  // Check browser when is not in server side rendering
  if (!isSSR) {
    // The language setting of the browser
    const [browserSetting] = navigator.language.split("-");
    if (isLocale(browserSetting)) {
      return browserSetting;
    }
  }

  return DEFAULT_LOCALE;
}
