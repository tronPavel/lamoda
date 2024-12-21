import React from "react";
import { useState, useEffect} from "react";
import FlagsInput from "./FlagsInput";
import useFilter from "../hooks/useFilter";

import "./styles/SingleselectFilters.css"

const SingleselectFilters = ({ filterValues, filterName, onUpdateState, defaultValue, addFilterFunction }) => {
  const [checkedFilterValues, setCheckedFilterValue] = useState(defaultValue || "");
  useEffect(() => {
    onUpdateState({ [filterName]: checkedFilterValues });
  }, [checkedFilterValues]);

  useFilter(filterValues, filterName, addFilterFunction, createSortFunc);

  const handleToggleFilterInput = (value) => {
    setCheckedFilterValue(value);
  };

  return (
    <div className="single__select">
      {filterValues.map((value) => (
        <FlagsInput
          key={value.label}
          isRadio={true}
          filterValue={value.label}
          filterName={filterName}
          onToggleFilterInput={handleToggleFilterInput}
          checked={checkedFilterValues == value.label} 
        >
          {value.label}
        </FlagsInput>
      ))}
    </div>
  );
};
const createSortFunc = (fields, filterName) => 
({ [filterName]: value }, filteredArr)=>{
  const result = fields.find(field => field.label == value);
    const compare = (a, b) => {
      if (a < b) return 1;
      if (a === b) return 0;
      if (a > b) return -1;
    };
    return result.decrease?
    filteredArr.sort((a, b) => compare( b[result.key],a[result.key])):
    filteredArr.sort((a, b) => compare(a[result.key], b[result.key]));
}

export default  React.memo(SingleselectFilters);
