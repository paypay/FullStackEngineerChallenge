import { Trans } from "@lingui/macro";
import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUID } from "react-uid";

import { DEBOUNCE_TIME } from "../../constants";
import { useDebounce } from "../../helpers/useDebounce";
import { Input } from "../Input";
import { Loading } from "../Loading";
import { Option } from "./components/Option";

export type ResolverTypeWrapper<T> = Promise<T> | T;

interface AutocompleteProps<T> {
  options?: T[];
  onChange: (value: string) => void;
  onSelected?: (option: T) => void;
  renderOption: (option: T) => JSX.Element;
  getOptionDisabled?: (option: T) => boolean;
  placeholder?: string;
  loading?: boolean;
}

export function Autocomplete<T>({
  onChange,
  options = [],
  loading,
  placeholder,
  renderOption,
  onSelected,
  getOptionDisabled = (option: T) => false,
}: AutocompleteProps<T>) {
  const id = `autocomplete-${useUID()}`;
  // Used to navigate trough options
  const [cursor, setCursor] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const debouncedText = useDebounce(search, DEBOUNCE_TIME);

  const ref = useRef(null);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any).contains(e.target)) {
        setSearch("");
        setOpen(false);
      }
    },
    [ref.current]
  );

  // handle on click outside
  useEffect(() => {
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, []);

  useEffect(() => {
    if (debouncedText) {
      onChange(debouncedText);
      setOpen(true);
      setCursor(0);
    }
  }, [debouncedText]);

  const discardSearch = () => {
    if (open) {
      setSearch("");
      setOpen(false);
    }
  };

  const enabledOptions = options.reduce((acc = [], option, index) => {
    if (!getOptionDisabled(option)) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);

  const onKeyUp = (evt: KeyboardEvent<HTMLInputElement>) => {
    switch (evt.key) {
      case "ArrowUp":
        evt.preventDefault();
        if (cursor === 0) {
          // Moves focus to the last value when is the first position
          setCursor(enabledOptions.length - 1);
        } else if (enabledOptions[cursor - 1] >= 0) {
          setCursor(cursor - 1);
        }

        break;
      case "ArrowDown":
        evt.preventDefault();
        // Moves focus to the first value
        if (cursor === enabledOptions.length - 1) {
          setCursor(0);
        } else if (!!enabledOptions[cursor + 1]) {
          // Moves focus to then next position
          setCursor(cursor + 1);
        }
        break;
      case "Backspace":
        if (!search) {
          discardSearch();
        }
        break;

      case "Escape":
        evt.preventDefault();
        discardSearch();
        break;
      case "Tab":
        discardSearch();
        break;

      // ENTER key
      case "Enter":
        //  Return the selected option
        if (open && options) {
          const selectedIndex = enabledOptions[cursor];
          onSelected && onSelected(options[selectedIndex]);
          discardSearch();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div ref={ref} className="w-full my-2 relative">
      <div
        role="combobox"
        aria-expanded={open}
        aria-owns={id}
        aria-haspopup="listbox"
      >
        <Input
          type="text"
          className="py-2"
          autoFocus={true}
          value={search}
          aria-activedescendant={
            open ? `${id}-option-${enabledOptions[cursor]}` : undefined
          }
          onKeyUp={onKeyUp}
          onChange={(e) => setSearch(e.target["value"])}
          placeholder={placeholder}
          aria-autocomplete="list"
          autoComplete="off"
          aria-controls={id}
        />
      </div>

      {open && (
        <div>
          <ul
            role="listbox"
            id={id}
            className="absolute max-h-64 w-full mt-2 p-2 bg-white shadow-md border border-gray-200 rounded overflow-y-scroll"
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                {options.length > 0 &&
                  options.map((option, index) => (
                    <Option
                      key={`${id}-${index}`}
                      id={`${id}-option-${index}`}
                      selected={enabledOptions[cursor] === index}
                      disabled={!enabledOptions.includes(index)}
                      onClick={() => {
                        onSelected && onSelected(option);
                        discardSearch();
                      }}
                    >
                      {renderOption(option)}
                    </Option>
                  ))}
                {options.length === 0 && (
                  <div className="px-3 text-gray-500 py-5">
                    <Trans id="autocomplete.error.generic">
                      We could not find any results matching your criteria, try
                      changing the filters.
                    </Trans>
                  </div>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
