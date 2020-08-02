import Cookies from "universal-cookie";

interface CookieProps {
  get(key: string): string;
  set(key: string, value?: string | null): void;
  remove(key: string): void;
}

const cookies = (): CookieProps => {
  const cookies = new Cookies();

  return {
    get: (key) => cookies.get(key),
    set: (key, value) => cookies.set(key, value, { path: "/" }),
    remove: (key) => cookies.remove(key, { path: "/" }),
  };
};

export default cookies;
