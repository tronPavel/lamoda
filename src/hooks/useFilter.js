import { useEffect } from "react";

const useFilter = (filterValues, filterName, addFilterFunction, createSortFunc) => {
  useEffect(() => {
    const sortFunc = createSortFunc(filterValues, filterName);
    addFilterFunction(sortFunc);
  }, []);
};
export default useFilter;

