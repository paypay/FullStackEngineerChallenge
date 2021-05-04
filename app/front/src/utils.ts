/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export const isProduction = process.env.NODE_ENV === 'production';

const isBrowser = () => typeof window !== 'undefined';

export let debugConsole: any = () => {
  return false;
};

export let debugErrorLog: any = () => {
  return false;
};

export let debugConsoleGroup: any = () => {
  return false;
};

export let debugConsoleGroupEnd: any = () => {
  return false;
};

if (!isProduction) {
  if (isBrowser()) {
    debugConsole = console.log.bind(window.console.log);
    debugErrorLog = console.error.bind(window.console.error);
    debugConsoleGroup = console.group.bind(window.console.group);
    debugConsoleGroupEnd = console.groupEnd.bind(window.console.groupEnd);
  }
}
