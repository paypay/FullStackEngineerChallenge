import { DEFAULT_LOCALE } from "../constants";
import * as catalogs from "../locales";

export const isLocale = (tested?: string) =>
  // Check if tested locale is defined and return true if it's exist on catalogs
  !!(
    tested &&
    Object.keys(localeDisplayNames).some((locale) => locale === tested)
  );

export function getLocale(): string {
  const isSSR = typeof window !== undefined;

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
