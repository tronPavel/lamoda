import React from "react";
import { useState, useCallback } from "react";

import { generateProducts } from "./generateProducts/generateProducts";

import SearchFilter from "./components/SearchFilter";
import RangeFilter from "./components/RangeFilter";
import ProductList from "./components/ProductList";
import SingleselectFilters from "./components/SingleselectFilters";
import MultiselectFilters from "./components/MultiselectFilters";

import "./App.css";

const App = () => {
  const [products, setProducts] = useState(generateProducts(20));
  const [filterSettings, setFilterSettings] = useState({
    searchValue: "",
    color: [],
    range: { min: "", max: "" },
    order: "Сначала популярные",
  });
  const [filterFunctions, setFilterFunctions] = useState([]);

  const handleUpdateFilterFunctionsArray = useCallback((func) => {
    setFilterFunctions((prev) => [...prev, func]);
  }, []);

  const handleUpdatefilterSettings = useCallback((updatedState) => {
    setFilterSettings((prev) => ({ ...prev, ...updatedState }));
  }, []);

  return (
    <main>
      <SearchFilter
        onUpdateState={handleUpdatefilterSettings}
        addFilterFunction={handleUpdateFilterFunctionsArray}
        filteredParams={["name", "description"]}
        filterName="searchValue"
      />
      <SingleselectFilters
        onUpdateState={handleUpdatefilterSettings}
        filterValues={[
          { key: "rating", label: "Сначала популярные" },
          { key: "price", label: "Сначала дешевые", decrease: true },
          { key: "price", label: "Сначала дорогие" },
        ]}
        filterName="order"
        defaultValue="Сначала популярные"
        addFilterFunction={handleUpdateFilterFunctionsArray}
      />
      <div className="container">
        <aside>
          <MultiselectFilters
            onUpdateState={handleUpdatefilterSettings}
            filteredEntity={products}
            filteredName="color"
            addFilterFunction={handleUpdateFilterFunctionsArray}
          >
            По цвету
          </MultiselectFilters>
          <RangeFilter
            onUpdateState={handleUpdatefilterSettings}
            addFilterFunction={handleUpdateFilterFunctionsArray}
            filterName="range"
            filteredParam="price"
          >
            По цене
          </RangeFilter>
        </aside>
        <ProductList
          products={products}
          filterSettings={filterSettings}
          filterFunctions={filterFunctions}
        />
      </div>
    </main>
  );
};
export default App;
