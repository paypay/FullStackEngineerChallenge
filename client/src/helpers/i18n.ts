import { i18n } from "@lingui/core";
import { en, ja } from "make-plural/plurals";

i18n.loadLocaleData("en", { plurals: en });
i18n.loadLocaleData("ja", { plurals: ja });

export const activate = async (locale: string) => {
  const { messages } = await import(`../locales/${locale}/messages.js`);
  i18n.load(locale, messages);

  i18n.activate(locale);
};
