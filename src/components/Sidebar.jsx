import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const mainCategories = ["Services", "Placement", "Programs"];
const childOptions = [
  "Child Welfare",
  "Probation",
  "Behavioral Health",
  "Dev Services",
  "Education",
];

const filterSections = [
  {
    label: "Service Type",
    options: ["All", "RFA", "TAH", "Group Home"],
    hasSearch: true,
  },
  {
    label: "Description",
    options: ["All"],
  },
  {
    label: "Eligibility",
    options: ["All"],
  },
  {
    label: "Partners Involved",
    options: ["All"],
  },
];

const serviceTypeOptions = [
  "Tribally Approved Home (TAH)",
  "Resource Family Approval (RFA)",
  "Group Home",
];
const descriptionOptions = [
  "High Fidelity Wrap (HFW)",
  "Child and Family Teams (CFTs)",
  "Resource Family Approval (RFA)",
];
const partnersInvolvedOptions = [
  "Child Welfare Services (CWS)",
  "Mental Health Plan (MHP)",
];
const eligibilityOptions = ["Option 1", "Option 2", "Option 3"];

const Sidebar = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    "Service Type": "All",
    Description: "All",
    Eligibility: "All",
    "Partners Involved": "All",
  });
  const [serviceTypeOpen, setServiceTypeOpen] = useState(true);
  const secondOptions = [
    "Tribally Approved Home (TAH)",
    "Resource Family Approval (RFA)",
    "Group Home",
  ];
  const handleCategoryClick = (cat) => {
    if (selectedCategory === cat) {
      setSelectedCategory(null);
      setSelectedMain(null);
    } else {
      setSelectedCategory(cat);
      setSelectedMain(null);
      setCategoryOpen(false);
    }
  };

  const handleFilterSelect = (section, option) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: option,
    }));
    if (section === "Service Type" && option === "All") {
      setServiceTypeOpen((prev) => !prev);
    } else if (section === "Service Type") {
      setServiceTypeOpen(true);
    }
  };

  return (
    <div className="bg-[#B1BBEF] w-64 rounded-xl p-3 flex flex-col border border-[#B1BBEF] max-h-min">
      {/* Category Dropdown */}
      <div className="mb-2 bg-[#A6ACE0] rounded-lg ">
        <div
          className="bg-[#015ABB] rounded-lg px-2 py-3 flex items-center cursor-pointer"
          onClick={() => setCategoryOpen((prev) => !prev)}
        >
          <span className="text-white font-normal text-md flex-1">
            {selectedCategory ? selectedCategory : "Category"}
          </span>
          <span className="ml-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              style={{
                display: "block",
                transition: "transform 0.2s",
                transform: categoryOpen ? "rotate(0deg)" : "rotate(180deg)",
              }}
            >
              <polygon points="9,6 14,11 4,11" fill="#fff" />
            </svg>
          </span>
        </div>
        {(categoryOpen || selectedCategory) && (
          <div className="bg-[#A6ACE0]  flex flex-col px-2 rounded-lg">
            {/* Main categories */}
            {categoryOpen && (
              <div className="flex flex-col gap-1 mt-1">
                {mainCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`w-full px-2 py-3 text-md rounded-xl text-left transition
                      ${selectedCategory === cat ? "bg-[#FFF8EA] text-[#CB3525]" : "bg-transparent text-[#222222]"}
                    `}
                    style={{
                      border: "none",
                      fontFamily: "Open Sans, sans-serif",
                      fontWeight: selectedCategory === cat ? 400 : 600,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            {/* Child options */}
            {!categoryOpen && selectedCategory && (
              <div className="flex flex-col mt-2">
                {childOptions.map((item) => (
                  <button
                    key={item}
                    className={`text-left full px-2 py-3 text-md transition rounded-lg 
  ${selectedMain === item
    ? "bg-[#FFF8EA] text-[#CB3525]"
    : "bg-transparent text-[#222222]"}
`}
                    style={{
                      border: "none",
                      fontFamily: "Open Sans, sans-serif", // <-- Open Sans here
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      textTransform: "capitalize",
                    }}
                    onClick={() => setSelectedMain(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filters */}
      {filterSections.map((section) => {
        let options = [];
        if (section.label === "Service Type") {
          options = serviceTypeOptions;
        } else if (section.label === "Description") {
          options = descriptionOptions;
        } else if (section.label === "Partners Involved") {
          options = partnersInvolvedOptions;
        } else if (section.label === "Eligibility") {
          options = eligibilityOptions;
        } else {
          options = ["Option 1", "Option 2", "Option 3"];
        }

        const isServiceType = section.label === "Service Type";
        const openKey = `${section.label}Open`;
        const isOpen = section.label === "Service Type" ? serviceTypeOpen : selectedFilters[openKey];

        return (
          <div key={section.label} className="mb-2">
            <div className="flex items-center mb-3 relative mt-3">
              <span
                className="text-xs font-semibold text-[#222222] z-10"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                }}
              >
                {section.label}
              </span>
              <span
                className="absolute left-1/2 top-1/2"
                style={{
                  width: "calc(100% - 50%)",
                  height: "1px",
                  backgroundColor: "#A6ACE0",
                  transform: "translateY(-50%)",
                }}
              ></span>
            </div>
            <div className="bg-[#A6ACE0] rounded-lg">
              <div className="relative mb-2">
                <button
                  className={`w-full border-none rounded-lg pl-2 py-2 text-md flex items-center justify-between focus:outline-none
    ${selectedFilters[section.label] === "All" ? "text-white" : "text-[#CB3525]"}
  `}
                  onClick={() => {
                    if (section.label === "Service Type") {
                      setServiceTypeOpen((prev) => !prev);
                      setSelectedFilters((prev) => ({
                        ...prev,
                        [section.label]: "All",
                      }));
                    } else {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        [openKey]: !prev[openKey],
                        [section.label]: "All",
                      }));
                    }
                  }}
                  style={{
                    fontWeight: 400,
                    background: selectedFilters[section.label] === "All" ? "#7D87CC" : "#FFF8EA",
                  }}
                >
                  All
                  <span className="ml-2">
                    {(section.label === "Service Type" ? serviceTypeOpen : isOpen) ? (
                      <svg width="22" height="22" viewBox="0 0 22 22">
                        <polygon
                          points="6,14 11,9 16,14"
                          fill={selectedFilters[section.label] !== "All" ? "#515254" : "#FFF8EA"}
                        />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 22 22">
                        <polygon
                          points="6,9 11,14 16,9"
                          fill={selectedFilters[section.label] !== "All" ? "#515254" : "#FFF8EA"}
                        />
                      </svg>
                    )}
                  </span>
                </button>
              </div>
              {isOpen && (
                <div className="flex flex-col gap-1">
                  {options
                    .filter((option) => option !== "All")
                    .map((option) => (
                      <div
                        key={option}
                        className="flex items-center justify-between pl-2 py-1.5 text-md text-[#222222] bg-[#A6ACE0] rounded-xl cursor-pointer"
                        style={{ fontWeight: 400 }}
                        onClick={() => {
                          setSelectedFilters((prev) => ({
                            ...prev,
                            [section.label]: option,
                            [openKey]: false,
                          }));
                        }}
                      >
                        {option}
                        <FaSearch className="text-[#FFF8EA] text-base mr-2 " />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;