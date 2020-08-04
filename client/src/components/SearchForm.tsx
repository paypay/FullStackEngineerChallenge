import { Router } from "next/router";
import React, { FC, HTMLProps, useEffect, useState } from "react";

import { DEBOUNCE_TIME } from "../constants";
import { useDebounce } from "../helpers/useDebounce";
import { Input } from "./Input";

export interface SearchFormProps extends HTMLProps<HTMLInputElement> {
  onDebounce(value: string): void;
  clearOnRouteChange?: boolean;
}

export const SearchForm: FC<SearchFormProps> = ({
  onDebounce,
  clearOnRouteChange,
  ...props
}) => {
  const [search, setSearch] = useState("");

  const resetSearch = () => {
    setSearch("");
  };

  const debouncedText = useDebounce(search, DEBOUNCE_TIME);

  useEffect(() => {
    onDebounce(debouncedText);
  }, [debouncedText]);

  // Clear input when route changes
  useEffect(() => {
    if (clearOnRouteChange) {
      Router.events.on("routeChangeComplete", resetSearch);
    }

    // Unsubscribe when component is unmounted
    return () => setSearch("");
  }, [clearOnRouteChange]);

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()}>
      <Input
        className="w-full md:w-64 py-1"
        {...props}
        autoFocus
        spellCheck={false}
        value={search}
        onChange={(e) => setSearch(e.target["value"])}
        type="search"
      />
    </form>
  );
};
