import React, { useState, useEffect } from "react";
import useFilter from "../hooks/useFilter";
import useDebounce from "../hooks/useDebounce";

import "./styles/RangeFilter.css";

const RangeFilter = ({
  onUpdateState,
  children,
  addFilterFunction,
  filterName,
  filteredParam,
}) => {
  const [error, setError] = useState(false);
  const [state, setState] = useState({ min: "", max: "" });
  const debouncedState=useDebounce(state)

  useFilter(filteredParam, filterName, addFilterFunction, createSortFunc);

  useEffect(() => {
    if (state.min != "" && state.max != "") {
      if (
        !isNaN(state.min) &&
        !isNaN(state.max) &&
        state.max > 0 &&
        state.min > 0
      ) {
      onUpdateState({ [filterName]: debouncedState });
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(false);
      onUpdateState({ [filterName]: debouncedState });
    }
  }, [state, debouncedState]);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>{children}</h2>
      <input
        className="range__filter"
        type="number"
        name="min"
        value={state.min}
        placeholder="от"
        onChange={handleInputChange}
        min="0"
      />
      <span> - </span>
      <input
        className="range__filter"
        type="number"
        name="max"
        value={state.max}
        placeholder="до"
        onChange={handleInputChange}
        min="0"
      />
      {error && <p style={{ color: "red" }}>некоректный ввод</p>}
    </div>
  );
};

const createSortFunc = (field, filterName) => (filterObj, filteredArr) => {
  const { [filterName]: value } = filterObj;
  if (!value.max) return filteredArr;
  return filteredArr.filter(
    (obj) => obj[field] <= value.max && obj[field] >= value.min
  );
};

export default React.memo(RangeFilter);
