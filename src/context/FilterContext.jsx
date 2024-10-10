// src/context/FilterContext.js
import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <FilterContext.Provider value={{ selectedCategories, toggleCategory }}>
      {children}
    </FilterContext.Provider>
  );
};
