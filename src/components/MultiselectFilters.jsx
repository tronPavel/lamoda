import React from "react";
import { useState, useEffect, useCallback} from "react";
import FlagsInput from "./FlagsInput";
import useFilter from "../hooks/useFilter";


const MultiselectFilters = ({
  filteredEntity,
  filteredName,
  onUpdateState,
  addFilterFunction,
  children,
}) => {
  const [checkedFilterValues, setCheckedFilterValue] = useState([]);

  useEffect(() => {
    onUpdateState({ [filteredName]: checkedFilterValues });
  }, [checkedFilterValues]);

  useFilter( filteredName, filteredName, addFilterFunction, createSortFunc);

  const handleToggleFilterInput =useCallback( (value) => {
    const newSettings = checkedFilterValues.includes(value)
      ? checkedFilterValues.filter((el) => el !== value)
      : [...checkedFilterValues, value];
    setCheckedFilterValue([...newSettings]);
  },[checkedFilterValues])

  const filterValues = handleGetUniqValuesForFilters(
    filteredEntity,
    filteredName
  );
  return (
    <>
      {filterValues.length > 1 && (
        <div className="multiselect__filter">
          <h2>{children}</h2>
          {filterValues.map((value) => (
            <FlagsInput
              key={value}
              isRadio={false}
              filterValue={value}
              filterName={filteredName}
              onToggleFilterInput={handleToggleFilterInput}
            >
              {value}
            </FlagsInput>
          ))}
        </div>
      )}
    </>
  );
};

const handleGetUniqValuesForFilters = (filteredEntity, filteredName) => {
  const uniqueValues = [
    ...new Set(filteredEntity.map((el) => el[filteredName])),
  ];
  return uniqueValues;
};

const createSortFunc =
  (filteredName) =>
  ({ [filteredName]: value }, filteredArr) => {
    if (!value.length) return filteredArr;
    return filteredArr.filter((obj) => value.includes(obj[filteredName]));
  };
export default React.memo(MultiselectFilters);
