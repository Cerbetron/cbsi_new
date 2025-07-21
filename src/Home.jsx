import React, { useState } from "react";
import allServices from "./allServices";
import SearchPanel from "./components/SearchPanel";
import ResourceListing from "./components/ResourceListing";

const Home = () => {
  // Store filters as arrays for multi-select
  const [filters, setFilters] = useState({
    age: [],
    county: [],
    insurance: [],
    cw: [],
  });

  // Filtering logic: show all if filter array is empty
  const filteredServices = allServices.filter((service) => {
    const ageMatch = !filters.age.length || filters.age.includes(service.age);
    const countyMatch =
      !filters.county.length || filters.county.includes(service.county);
    const insuranceMatch =
      !filters.insurance.length ||
      filters.insurance.includes(service.insurance);
    const cwMatch = !filters.cw.length || filters.cw.includes(service.cw);
    return ageMatch && countyMatch && insuranceMatch && cwMatch;
  });

  return (
    <div>
      <SearchPanel setFilters={setFilters} />
      <ResourceListing services={filteredServices} />
    </div>
  );
};

export default Home;