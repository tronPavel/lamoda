import React, { useState, useEffect } from "react";
import "./styles/SearchFilter.css";
import useFilter from "../hooks/useFilter";
import useDebounce from "../hooks/useDebounce";

const SearchFilter = ({
  onUpdateState,
  addFilterFunction,
  filteredParams,
  filterName,
}) => {
  const [searchValue, setSearchValue] = useState("");
  useFilter(filteredParams, filterName, addFilterFunction, createSortFunc);

  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    onUpdateState({ [filterName]: debouncedSearchValue.trim().toLowerCase() });
  }, [debouncedSearchValue, filterName]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <input
      className="search"
      placeholder="найти"
      type="text"
      value={searchValue}
      onChange={handleChange}
    />
  );
};
const createSortFunc = (fields, filterName) => {
  if (Array.isArray(fields)) {
    return ({ [filterName]: value }, filteredArr) => {
      if (!value) return filteredArr;
      return filteredArr.filter((obj) => {
        return fields.some(
          (field) =>
            obj[field] && obj[field].toLowerCase().includes(value.toLowerCase())
        );
      });
    };
  }
  return ({ [filterName]: value }, filteredArr) =>
    filteredArr.filter(
      (obj) =>
        obj[fields] && obj[fields].toLowerCase().includes(value.toLowerCase())
    );
};
export default React.memo(SearchFilter);
