import create, { GetState, SetState, StateCreator, StoreApi } from 'zustand';
import { EmployeeType } from 'api';
import { debugConsoleGroup, debugConsole, debugConsoleGroupEnd } from 'utils';
import { EmployeeNoPasswordType } from 'api/withAuth';

export const objFilter = <T extends { [key: string]: any }>(
  o: T,
  f: (keyValue: T, key: keyof T) => boolean
) => {
  const newObj = {};
  Object.keys(o).forEach((k) => {
    if (f.call(self, o[k], k, o)) {
      newObj[k] = o[k];
    }
  });
  return newObj as { [key: string]: T };
};

export type AppStoreType<
  T extends Record<string | number | symbol, unknown>,
  S
> = (set: SetState<T>, get: GetState<T>) => T & { actions: S };

export type StoreLoggerType = <S extends Record<string, unknown>>(
  config: StateCreator<S>,
  storeName?: string,
  predicate?: (keyValue: S, key: keyof S) => boolean
) => (set: SetState<S>, get: GetState<S>, api: StoreApi<S>) => S;

export const log: StoreLoggerType = (
  config,
  storeName,
  predicate = (k, ke) => ke !== 'actions'
) => (set, get, api) =>
  config(
    (args) => {
      debugConsoleGroup(storeName || 'zustand state change');
      debugConsole(' applying:', args);
      set(args);
      debugConsole(' new state:', objFilter(get(), predicate));
      debugConsoleGroupEnd();
    },
    get,
    api
  );

export type GlobalStateType = {
  employees: EmployeeType[];
  detailEmployee: EmployeeNoPasswordType | null;
  itsTheAdmin: boolean;
  currentPage: number;
};

export type GlobalActionsType = {
  updateEmployees: (employees: EmployeeType | EmployeeType[]) => void;
  updatePagination: (currentPage: number, dir: 'pre' | 'next') => void;
};

const globalState: AppStoreType<GlobalStateType, GlobalActionsType> = (
  set,
  get
) => ({
  detailEmployee: null,
  employees: [],
  currentPage: 1,
  itsTheAdmin: false,
  actions: {
    updateEmployees: (incomingEmployees) => {
      const currentEmployees = get().employees;
      if (Array.isArray(incomingEmployees)) {
        const newArr = [...currentEmployees, ...incomingEmployees];
        const unique = [...new Set(newArr)];
        set({ employees: [...unique] });
      } else {
        set({ employees: [...currentEmployees, incomingEmployees] });
      }
    },
    updatePagination: (currentPage, where) => {
      const numb =
        where === 'pre' ? get().currentPage - 1 : get().currentPage + 1;

      set({ currentPage: numb });
    }
  }
});

export const useGlobalStore = create<
  GlobalStateType & { actions: GlobalActionsType }
>(log((set, get) => globalState(set, get), 'Global store'));
