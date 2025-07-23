import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

// Cookie utilities
const setCookie = (name, value, days = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${JSON.stringify(value)};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return JSON.parse(c.substring(nameEQ.length, c.length));
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Reusable dropdown arrow component
const DropdownArrow = ({ isOpen, size = "16" }) => (
  <div className={`transform transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}>
    <svg
      width={size}
      height={size === "16" ? "8" : size === "32" ? "32" : size === "14" ? "10" : "16"}
      viewBox={size === "32" ? "0 0 32 32" : size === "14" ? "0 0 24 16" : "0 0 16 8"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {size === "32" ? (
        <>
          <path d="M21.7852 19H10.1955C9.13619 19 8.5754 17.7102 9.38544 16.9731L15.2426 11.3225C15.7411 10.8925 16.4888 10.8925 16.925 11.3225L22.6576 16.9731C23.4053 17.7102 22.8445 19 21.7852 19Z" fill="#015AB8" />
          <path d="M16 31C7.73077 31 1 24.2692 1 16C1 7.73077 7.73077 1 16 1C24.2692 1 31 7.73077 31 16C31 24.2692 24.2692 31 16 31ZM16 1.76923C8.15385 1.76923 1.76923 8.15385 1.76923 16C1.76923 23.8462 8.15385 30.2308 16 30.2308C23.8462 30.2308 30.2308 23.8462 30.2308 16C30.2308 8.15385 23.8462 1.76923 16 1.76923Z" fill="#015AB8" />
        </>
      ) : size === "14" ? (
        <polygon points="12,14 4,6 20,6" fill="#3B4A9F" />
      ) : (
        <path d="M0 7.38086L8 -0.000279427L16 7.38086H0Z" fill="#3F5590" />
      )}
    </svg>
  </div>
);

// Example options
const countyOptions = ["County", "Alameda", "Los Angeles", "Sacramento", "San Diego"];
const insuranceOptions = [
  "Insurance",
  "Private",
  "MediCal Managed Care",
  "MediCal FFS",
  "Other"
];
const cwOptions = ["Child Welfare", "Option 1", "Option 2", "Option 3"];

const filterChips = [
  "All",
  "Child Welfare (CW)",
  "Probation",
  "Behavioral Health (BH)",
  "Developmental Services",
  "Education"
];

const buttonTextStyle = {
  fontFamily: 'Open Sans, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '100%',
  letterSpacing: '0%',
  textTransform: 'capitalize'
};

// Custom dropdown using div/ul
const CustomDropdown = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Determine border color
  const borderColor = open ? "#005CB9" : "#bfc6ea";

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        className={`
          min-w-full rounded-xl bg-white
          flex justify-between items-center
          px-3 py-2 text-[14px] sm:text-[14px] md:text-[15px]
          focus:outline-none whitespace-nowrap min-h-[44px]
          transition-colors duration-150
        `}
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textTransform: 'capitalize',
          border: `2px solid ${borderColor}`,
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="truncate">{value}</span>
        <span className="ml-2 flex-shrink-0">
          <DropdownArrow isOpen={open} size="14" />
        </span>
      </button>
      {open && (
        <ul
          className={`
            absolute left-0 mt-1 w-full bg-white border border-[#bfc6ea] rounded-xl shadow z-50
            text-[13px] sm:text-[14px] md:text-[15px]
            max-h-56 overflow-y-auto
          `}
        >
          {options.map((opt) => (
            <li
              key={opt}
              className={`
                px-3 py-2 cursor-pointer hover:bg-blue-100 transition
                ${opt === value ? "bg-blue-50 font-semibold" : ""}
              `}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SearchPanel = ({ onSearch }) => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [county, setCounty] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [cw, setCw] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const searchInputRef = useRef();

  // Decision Tree state
  const [decisionTreeOpen, setDecisionTreeOpen] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [decisionTreeAnswers, setDecisionTreeAnswers] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({FUNNEL:true});
  const [selectedFunnel, setSelectedFunnel] = useState(2); // Add state for funnel selection

  // Dialog state for "Other" option
  const [showOtherDialog, setShowOtherDialog] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [otherInputValue, setOtherInputValue] = useState('');

  // Save My Preference state
  const [isPreferenceSaved, setIsPreferenceSaved] = useState(false);

  // Load preferences from cookies on component mount
  useEffect(() => {
    const savedPreferences = getCookie('searchPanelPreferences');
    if (savedPreferences) {
      // Load filter preferences
      if (savedPreferences.selectedFilter !== undefined) {
        setSelectedFilter(savedPreferences.selectedFilter);
      }
      if (savedPreferences.searchInput) {
        setSearchInput(savedPreferences.searchInput);
      }
      if (savedPreferences.county) {
        setCounty(savedPreferences.county);
      }
      if (savedPreferences.insurance) {
        setInsurance(savedPreferences.insurance);
      }
      if (savedPreferences.cw) {
        setCw(savedPreferences.cw);
      }
      
      // Load decision tree preferences
      if (savedPreferences.decisionTreeOpen !== undefined) {
        setDecisionTreeOpen(savedPreferences.decisionTreeOpen);
      }
      if (savedPreferences.expandedQuestions) {
        setExpandedQuestions(savedPreferences.expandedQuestions);
      }
      if (savedPreferences.decisionTreeAnswers) {
        setDecisionTreeAnswers(savedPreferences.decisionTreeAnswers);
      }
      if (savedPreferences.expandedCategories) {
        setExpandedCategories(savedPreferences.expandedCategories);
      }
      if (savedPreferences.selectedFunnel !== undefined) {
        setSelectedFunnel(savedPreferences.selectedFunnel);
      }
      
      // Set preference saved state
      setIsPreferenceSaved(true);
    }
  }, []);

  // Save preferences to cookies
  const savePreferencesToCookies = () => {
    const preferences = {
      selectedFilter,
      searchInput,
      county,
      insurance,
      cw,
      decisionTreeOpen,
      expandedQuestions,
      decisionTreeAnswers,
      expandedCategories,
      selectedFunnel
    };
    setCookie('searchPanelPreferences', preferences);
  };

  // Clear preferences from cookies
  const clearPreferencesFromCookies = () => {
    deleteCookie('searchPanelPreferences');
  };

  // Decision Tree data
  const decisionTreeQuestions = [
    {
      id: 1,
      category: "Demographic",
      question: "What system are you affiliated with?",
      options: [
        "Child Welfare Services (CWS)",
        "Behavioral Health (BH)",
        "Education",
        "Probation",
        "Regional center",
        "Community partner",
        "Other"
      ]
    },
    {
      id: 2,
      category: "Demographic",
      question: "What role do you most closely identify with?",
      options: [
        "Direct Services",
        "Leadership/Management",
        "Fiscal",
        "Other"
      ]
    },
    {
      id: 3,
      category: "Funnels",
      question: "If you would like child-specific resources, please select from the following resource choices, or if looking for general system information, go to the next question.",
      options: [
        "Services",
        "Placement options"
      ],
      hasSubQuestions: true
    },
    {
      id: 3.1,
      parentId: 3,
      question: "What systems already serve the youth, or what systems would the youth be eligible for?",
      options: [
        "Child Welfare Services (CWS)",
        "Behavioral Health (BH)",
        "Regional Center",
        "Probation",
        "Education"
      ],
      showWhen: (answers) => {
        return answers[3] === "Services" || answers[3] === "Placement options";
      }
    },
    {
      id: 3.2,
      parentId: 3,
      question: "What complex needs does the youth have?",
      options: [
        "Developmental needs",
        "Behavioral health needs",
        "Education needs",
        "Substance use disorder(s)",
        "CSEC",
        "Placement disruption"
      ],
      showWhen: (answers) => {
        return answers[3] === "Services" || answers[3] === "Placement options";
      }
    },
    {
      id: 4,
      category: "Funnels",
      question: "If you would like more information about system partner placements and services, please identify which system and which resource you would like to learn more about.",
      options: [
        "Child Welfare",
        "Behavioral Health (BH)",
        "Education",
        "Probation",
        "Regional center"
      ],
      hasSubQuestions: true
    },
    {
      id: 4.1,
      parentId: 4,
      question: "Would you like to know more about services and/or supports from the systems selected?",
      options: [
        "Services",
        "Placement options"
      ],
      showWhen: (answers) => {
        return answers[4] && answers[4] !== "";
      }
    }
  ];

  // Toggle decision tree visibility
  const toggleDecisionTree = () => {
    setDecisionTreeOpen(!decisionTreeOpen);
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Toggle question expansion
  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Handle answer selection - allow toggle functionality
  const handleAnswerSelect = (questionId, option) => {
    console.log('Selected:', questionId, option); // Debug log
    
    try {
      // If "Other" is selected, show inline input
      if (option === "Other") {
        setCurrentQuestionId(questionId);
        setOtherInputValue('');
        setDecisionTreeAnswers(prev => ({
          ...prev,
          [questionId]: option
        }));
        return;
      }

      // Reset currentQuestionId if it's not "Other"
      setCurrentQuestionId(null);
      
      setDecisionTreeAnswers(prev => {
        const currentAnswer = prev[questionId];
        
        // If the same option is clicked again, unselect it
        if (currentAnswer === option || (typeof currentAnswer === 'string' && currentAnswer.startsWith('Other: ') && option === 'Other')) {
          const newAnswers = { ...prev };
          delete newAnswers[questionId]; // Remove the answer completely
          return newAnswers;
        } else {
          // Otherwise, select the new option
          return {
            ...prev,
            [questionId]: option
          };
        }
      });
    } catch (error) {
      console.error('Error in handleAnswerSelect:', error);
    }
  };  // Handle funnel selection
  const handleFunnelSelect = (funnelNumber) => {
    setSelectedFunnel(selectedFunnel === funnelNumber ? null : funnelNumber);
  };

  // Handle "Other" dialog submission
  const handleOtherSubmit = () => {
    if (otherInputValue.trim()) {
      setDecisionTreeAnswers(prev => ({
        ...prev,
        [currentQuestionId]: `Other: ${otherInputValue.trim()}`
      }));
    } else {
      // If no value entered, just clear the selection
      setDecisionTreeAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[currentQuestionId];
        return newAnswers;
      });
    }
    setCurrentQuestionId(null);
    setOtherInputValue('');
  };

  // Handle "Other" dialog cancel
  const handleOtherCancel = () => {
    setDecisionTreeAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestionId];
      return newAnswers;
    });
    setCurrentQuestionId(null);
    setOtherInputValue('');
  };

  // Handle Save My Preference toggle
  const handleSavePreferenceToggle = () => {
    const newPreferenceSavedState = !isPreferenceSaved;
    setIsPreferenceSaved(newPreferenceSavedState);
    
    if (newPreferenceSavedState) {
      // Save preferences to cookies
      savePreferencesToCookies();
    } else {
      // Clear preferences from cookies
      clearPreferencesFromCookies();
    }
  };

  // Multi-select dropdown logic
  const handleMultiSelect = (current, setCurrent, option, defaultOption) => {
    if (option === defaultOption) {
      setCurrent([]);
    } else {
      setCurrent(prev =>
        prev.includes(option)
          ? prev.filter(v => v !== option)
          : [...prev.filter(v => v !== defaultOption), option]
      );
    }
  };

  // Call onSearch whenever filters change
  useEffect(() => {
    try {
      if (onSearch && typeof onSearch === 'function') {
        onSearch({
          search: searchInput,
          county,
          insurance,
          cw,
          selectedFilter: filterChips[selectedFilter]
        });
      }
    } catch (error) {
      console.error('Error in onSearch callback:', error);
    }
    // eslint-disable-next-line
  }, [searchInput, county, insurance, cw, selectedFilter]);

  // Auto-save preferences whenever they change (if user has enabled saving)
  useEffect(() => {
    if (isPreferenceSaved) {
      savePreferencesToCookies();
    }
  }, [searchInput, county, insurance, cw, selectedFilter, decisionTreeOpen, expandedQuestions, decisionTreeAnswers, expandedCategories, selectedFunnel, isPreferenceSaved]);

  // Clear all filters and search
  const clearAll = () => {
    setSelectedFilter(0);
    setSearchInput('');
    setCounty([]);
    setInsurance([]);
    setCw([]);
    setDecisionTreeAnswers({});
    setExpandedQuestions({});
    setExpandedCategories({});
    setSelectedFunnel(null);
    setDecisionTreeOpen(false);
    
    // If preferences are saved, update the cookies with cleared state
    if (isPreferenceSaved) {
      savePreferencesToCookies();
    }
  };

  // Multi-select dropdown component
  const MultiSelectDropdown = ({ options, value, setValue, defaultOption }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    useEffect(() => {
      const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    const borderColor = open ? "#005CB9" : "#bfc6ea";
    return (
      <div ref={ref} className="relative flex-1">
        <button
          type="button"
          className={`
            min-w-full rounded-xl bg-white
            flex justify-between items-center
            px-3 py-2 text-[14px] sm:text-[14px] md:text-[15px]
            focus:outline-none whitespace-nowrap min-h-[44px]
            transition-colors duration-150
          `}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textTransform: 'capitalize',
            border: `2px solid ${borderColor}`,
          }}
          onClick={() => setOpen(o => !o)}
        >
          <span className="truncate">
            {value.length === 0 ? defaultOption : value.join(', ')}
          </span>
          <span className="ml-2 flex-shrink-0">
            <DropdownArrow isOpen={open} size="14" />
          </span>
        </button>
        {open && (
          <ul
            className={`
              absolute left-0 mt-1 w-full bg-white border border-[#bfc6ea] rounded-xl shadow z-50
              text-[13px] sm:text-[14px] md:text-[15px]
              max-h-56 overflow-y-auto
            `}
          >
            {options.map((opt) => (
              <li
                key={opt}
                className={`
                  flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-blue-100 transition
                  border-b border-gray-100
                  ${value.includes(opt) ? "bg-blue-50 font-semibold" : ""}
                `}
                onClick={() => handleMultiSelect(value, setValue, opt, defaultOption)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value.includes(opt)}
                    readOnly
                    className="mr-2 w-5 h-5 accent-blue-500"
                  />
                  <span>{opt}</span>
                </div>
                {value.includes(opt) && (
                  <svg
                    className="text-blue-500"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <polyline
                      points="5 11 9 15 15 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // Listen for any keydown event and focus the search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input/textarea already
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.isContentEditable
      ) {
        return;
      }
      // Only activate for visible characters (not ctrl, shift, etc.)
      if (e.key.length === 1) {
        setIsActive(true);
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle filter selection
  const handleFilterSelect = (index) => {
    setSelectedFilter(index);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchInput('');
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      // Optionally, you can call onSearch here if you want to trigger search on Enter
      // onSearch({ search: searchInput, age, county, insurance, cw, selectedFilter: filterChips[selectedFilter] });
      e.preventDefault();
    }
  };

  const partnerFullNames = {
    TAH: "Tribally Approved Home (TAH)",
    RFA: "Resource Family Approval (RFA)",
    CWS: "Child Welfare Services (CWS)",
    MHP: "Mental Health Plan (MHP)",
    ASAM: "American Society of Addiction Medicine (ASAM)",
  };

  // Decision Tree Component
  const DecisionTree = () => (
    <div className="w-full  mb-4">
      {/* Decision Tree Header */}
      <div
        className="flex items-center justify-center p-4 cursor-pointer bg-[#FFF8EA] relative"
        onClick={toggleDecisionTree}
      >
        <h3
          className="text-[#333]"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textTransform: 'uppercase'
          }}
        >
          DECISION TREE
        </h3>
        <div className="ml-5">
          <DropdownArrow isOpen={decisionTreeOpen} size="32" />
        </div>
      </div>

      {/* Decision Tree Content */}
      {decisionTreeOpen && (
        <div className="bg-[#FFF8EA] px-6 py-6">
          <div className="max-w-6xl mx-auto space-y-1">
            {/* Show Categories First */}
            {["DEMOGRAPHIC", "FUNNEL"].map((category) => (
              <div key={category}>
                {category === "DEMOGRAPHIC" ? (
                  <>
                    {/* Category Header */}
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer bg-[#E2E4FB]"
                      onClick={() => toggleCategory(category)}
                    >
                      <div className="flex-1">
                        <span
                          className="text-[#333]"
                          style={{
                            fontFamily: 'Open Sans, sans-serif',
                            fontWeight: 400,
                            fontSize: '20px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            textTransform: 'uppercase'
                          }}
                        >
                          {category}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <DropdownArrow isOpen={expandedCategories[category]} size="32" />
                      </div>
                    </div>

                    {/* Category Questions */}
                    {expandedCategories[category] && (
                      <div className="mt-2 space-y-1">
                        {decisionTreeQuestions
                          .filter(q => q.category && q.category.toUpperCase() === category)
                          .map((question) => (
                            <div key={question.id} className="bg-[#F5F5F5] p-4">
                              {/* Question Header with Dropdown Arrow */}
                              <div
                                className="flex items-center justify-between cursor-pointer w-full"
                                onClick={() => toggleQuestion(question.id)}
                              >
                                <div className="flex-1">
                                  <p className="text-[#333] font-medium"
                                    style={{
                                      fontFamily: 'Open Sans, sans-serif',
                                      fontWeight: 400,
                                      fontSize: '18px',
                                      lineHeight: '114.99999999999999%',
                                      letterSpacing: '1%'
                                    }}>
                                    {question.question}
                                  </p>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <div className={`transform transition-transform duration-200 ${expandedQuestions[question.id] ? 'rotate-180' : ''}`}>
                                    <svg
                                      width="10"
                                      height="10"
                                      viewBox="0 0 24 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <polygon points="12,14 4,6 20,6" fill="#3B4A9F" />
                                    </svg>
                                  </div>
                                </div>
                              </div>

                              {/* Options - Only show when question is expanded */}
                              {expandedQuestions[question.id] && (
                              <div className="mt-4">
                                <div className="flex flex-wrap gap-4">
                                  {question.options.map((option, optionIndex) => {
                                    const isSelected =
                                      option === "Other"
                                        ? typeof decisionTreeAnswers[question.id] === "string" &&
                                          decisionTreeAnswers[question.id].startsWith("Other: ")
                                        : decisionTreeAnswers[question.id] === option;

                                    return (
                                      <div key={optionIndex} className="flex items-center">
                                        {/* Hidden radio for accessibility */}
                                        <input
                                          type="radio"
                                          id={`q${question.id}-option${optionIndex}`}
                                          name={`question-${question.id}`}
                                          checked={isSelected}
                                          onChange={() => handleAnswerSelect(question.id, option)}
                                          className="sr-only"
                                        />

                                        {/* Custom styled radio */}
                                        <div
                                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-150
                                            ${isSelected ? 'border-[#D14B3A]' : 'border-gray-400 hover:border-gray-500'}`}
                                          onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleAnswerSelect(question.id, option);
                                          }}
                                        >
                                          {isSelected && (
                                            <div className="w-2.5 h-2.5 bg-[#D14B3A] rounded-full"></div>
                                          )}
                                        </div>

                                        {/* Label */}
                                        <label
                                          htmlFor={`q${question.id}-option${optionIndex}`}
                                          className="ml-2 text-[#333] cursor-pointer"
                                          style={{
                                            fontFamily: 'Open Sans, sans-serif',
                                            fontWeight: 400,
                                            fontSize: '18px',
                                            lineHeight: '114.99999999999999%',
                                            letterSpacing: '1%'
                                          }}
                                          onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleAnswerSelect(question.id, option);
                                          }}
                                        >
                                          {option}
                                        </label>

                                        {/* Inline input for "Other" */}
                                        {option === "Other" && currentQuestionId === question.id && (
                                          <input
                                            type="text"
                                            placeholder="Please specify..."
                                            value={otherInputValue}
                                            onChange={(e) => setOtherInputValue(e.target.value)}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                handleOtherSubmit();
                                              } else if (e.key === 'Escape') {
                                                handleOtherCancel();
                                              }
                                            }}
                                            onBlur={() => {
                                              if (otherInputValue.trim()) {
                                                handleOtherSubmit();
                                              } else {
                                                handleOtherCancel();
                                              }
                                            }}
                                            className="ml-2 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#D14B3A] w-48"
                                            autoFocus
                                          />
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  // FUNNEL Category with two partitions
                  <>
                    {/* Category Header */}
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer bg-[#E2E4FB]"
                      onClick={() => toggleCategory(category)}
                    >
                      <div className="flex-1">
                        <span
                          className="text-[#333]"
                          style={{
                            fontFamily: 'Open Sans, sans-serif',
                            fontWeight: 400,
                            fontSize: '20px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            textTransform: 'uppercase'
                          }}
                        >
                          {category}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <DropdownArrow isOpen={expandedCategories[category]} size="32" />
                      </div>
                    </div>

                    {/* FUNNEL Content with two partitions */}
                    {expandedCategories[category] && (
                      <div className="mt-2 space-y-1">
                        {/* Horizontal layout for FUNNEL-1 and FUNNEL-2 */}
                        <div className="flex gap-1">
                          {/* FUNNEL-1 Section */}
                          <div className="flex-1">
                            <div className={`p-4 ${selectedFunnel === 1 ? 'bg-white' : 'bg-[#ECEEFF]'}`}>
                              <div className="flex items-center justify-center">
                                <span
                                  className="text-[#333]"
                                  style={{
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '114.99999999999999%',
                                    letterSpacing: '1%'
                                  }}
                                >
                                  FUNNEL - 1
                                </span>
                              </div>
                            </div>

                            {/* Question section below FUNNEL-1 */}
                            <div 
                              className={`p-4 transition-all duration-200 min-h-[120px] flex items-center mt-2 rounded cursor-pointer ${
                                selectedFunnel === 1 
                                  ? 'bg-white border-b-2 border-[#015AB8]' 
                                  : 'bg-[#F5F5F5] hover:bg-gray-200'
                              }`}
                              onClick={() => handleFunnelSelect(1)}
                            >
                              <div className="flex items-center">
                                {/* Visually hidden native input for accessibility */}
                                <input
                                  type="radio"
                                  id="funnel-1"
                                  name="funnel-selection"
                                  checked={selectedFunnel === 1}
                                  onChange={() => handleFunnelSelect(1)}
                                  className="sr-only"
                                />

                                {/* Custom radio circle */}
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-150 mr-3 shrink-0
                                    ${selectedFunnel === 1 ? 'border-[#015AB8]' : 'border-gray-400'}`}
                                >
                                  {selectedFunnel === 1 && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#015AB8]" />
                                  )}
                                </div>


                                {/* Label text */}
                                <label
                                  htmlFor="funnel-1"
                                  className="text-[#333] cursor-pointer"
                                  style={{
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '115%',
                                    letterSpacing: '1%'
                                  }}
                                >
                                  If you would like more information about system partner placements and services, select Funnel 1
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* FUNNEL-2 Section */}
                          <div className="flex-1">
                            <div className={`p-4 ${selectedFunnel === 2 ? 'bg-white' : 'bg-[#ECEEFF]'}`}>
                              <div className="flex items-center justify-center">
                                <span
                                  className="text-[#333]"
                                  style={{
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '114.99999999999999%',
                                    letterSpacing: '1%'
                                  }}
                                >
                                  FUNNEL - 2
                                </span>
                              </div>
                            </div>

                            {/* Question section below FUNNEL-2 */}
                            <div 
                              className={`p-4 cursor-pointer transition-all duration-200 min-h-[120px] flex items-center mt-2 ${
                                selectedFunnel === 2 
                                  ? 'bg-white border-b-2 border-blue-500' 
                                  : 'bg-[#F5F5F5] hover:bg-gray-200'
                              }`}
                              onClick={() => handleFunnelSelect(2)}
                            >
                              <div className="flex items-center">
                                {/* Hidden native input */}
                                <input
                                  type="radio"
                                  id="funnel-2"
                                  name="funnel-selection"
                                  checked={selectedFunnel === 2}
                                  onChange={() => handleFunnelSelect(2)}
                                  className="sr-only"
                                />

                                {/* Custom radio button */}
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 cursor-pointer mr-3 shrink-0
                                    ${selectedFunnel === 2 ? 'border-[#015AB8]' : 'border-gray-400'}`}
                                >
                                  {selectedFunnel === 2 && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#015AB8]" />
                                  )}
                                </div>

                                {/* Label */}
                                <label
                                  htmlFor="funnel-2"
                                  className="text-[#333] cursor-pointer"
                                  style={{
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '115%',
                                    letterSpacing: '1%'
                                  }}
                                >
                                  If you would like child-specific resources, select Funnel 2
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Full-width questions section that appears when Funnel 1 is selected */}
                        {selectedFunnel === 1 && (
                          <div className="mt-4 bg-white p-6 border border-gray-200 w-full">
                            {/* Question 1 for Funnel 1 */}
                            <div className="mb-6">
                              <div className="flex items-start gap-2 mb-4">
                                <span
                                  className="text-[#333] font-medium"
                                  style={{
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '115%',
                                    letterSpacing: '1%',
                                  }}
                                >
                                  1.
                                </span>
                                <p
                                  className="text-[#333] font-medium"
                                  style={{
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '115%',
                                    letterSpacing: '1%',
                                  }}
                                >
                                  If you would like more information about system partner placements and services, please identify
                                  which system and which resource you would like to learn more about.
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {["Child welfare services (CWS)", "Behavioral health (BH)", "Regional Center", "Probation", "Education"].map((option, index) => (
                                  <button
                                    key={index}
                                    className={`px-4 py-2 rounded-full border transition-all duration-150 cursor-pointer ${decisionTreeAnswers[4] === option
                                        ? 'bg-[#015AB8] text-white border-[#015AB8]'
                                        : 'bg-white text-[#333] border-gray-300 hover:border-[#015AB8]'
                                      }`}
                                    style={{
                                      fontFamily: 'Open Sans, sans-serif',
                                      fontWeight: 400,
                                      fontSize: '14px',
                                      lineHeight: '114.99999999999999%',
                                      letterSpacing: '1%'
                                    }}
                                    onClick={() => handleAnswerSelect(4, option)}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Separator */}
                            <hr className="border-gray-200 mb-6" />

                            {/* Question 2 for Funnel 1 - Always visible */}
                            <div className="mb-6">
                              <p className="text-[#333] mb-4 font-medium"
                                style={{
                                  fontFamily: 'Open Sans, sans-serif',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '114.99999999999999%',
                                  letterSpacing: '1%'
                                }}>
                                2. Would you like to know more about services and/or supports from the systems selected?
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {["Services", "Placement options", "Both"].map((option, index) => (
                                  <button
                                    key={index}
                                    className={`px-4 py-2 rounded-full border transition-all duration-150 cursor-pointer ${decisionTreeAnswers[4.1] === option
                                        ? 'bg-[#D14B3A] text-white border-[#D14B3A]'
                                        : 'bg-white text-[#333] border-gray-300 hover:border-[#D14B3A]'
                                      }`}
                                    style={{
                                      fontFamily: 'Open Sans, sans-serif',
                                      fontWeight: 400,
                                      fontSize: '14px',
                                      lineHeight: '114.99999999999999%',
                                      letterSpacing: '1%'
                                    }}
                                    onClick={() => handleAnswerSelect(4.1, option)}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Full-width questions section that appears when Funnel 2 is selected */}
                        {selectedFunnel === 2 && (
                          <div className="mt-4 bg-white p-6 border border-gray-200 w-full">
                            {/* Question 1 for Funnel 2 */}
                            <div className="mb-6">
                              <p className="text-[#333] mb-4 font-medium"
                                style={{
                                  fontFamily: 'Open Sans, sans-serif',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '114.99999999999999%',
                                  letterSpacing: '1%'
                                }}>
                                1. If you would like child-specific resources, please select from the following resource choices.
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {["Services", "Placement Options", "Both"].map((option, index) => (
                                  <button
                                    key={index}
                                    className={`px-4 py-2 rounded-full border transition-all duration-150 cursor-pointer ${decisionTreeAnswers[3] === option
                                        ? 'bg-[#D14B3A] text-white border-[#D14B3A]'
                                        : 'bg-white text-[#333] border-gray-300 hover:border-[#D14B3A]'
                                      }`}
                                    style={{
                                      fontFamily: 'Open Sans, sans-serif',
                                      fontWeight: 400,
                                      fontSize: '14px',
                                      lineHeight: '114.99999999999999%',
                                      letterSpacing: '1%'
                                    }}
                                    onClick={() => handleAnswerSelect(3, option)}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Separator */}
                            <hr className="border-gray-200 mb-6" />

                            {/* Question 2 for Funnel 2 */}
                            <div className="mb-6">
                              <p className="text-[#333] mb-4 font-medium"
                                style={{
                                  fontFamily: 'Open Sans, sans-serif',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '114.99999999999999%',
                                  letterSpacing: '1%'
                                }}>
                                2. What systems already serve the youth? Select all that apply.
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {["CWS", "BH", "Regional Center", "Probation", "Education"].map((option, index) => (
                                  <button
                                    key={index}
                                    className={`px-4 py-2 rounded-full border transition-all duration-150 cursor-pointer ${decisionTreeAnswers[3.1] === option
                                        ? 'bg-[#D14B3A] text-white border-[#D14B3A]'
                                        : 'bg-white text-[#333] border-gray-300 hover:border-[#D14B3A]'
                                      }`}
                                    style={{
                                      fontFamily: 'Open Sans, sans-serif',
                                      fontWeight: 400,
                                      fontSize: '14px',
                                      lineHeight: '114.99999999999999%',
                                      letterSpacing: '1%'
                                    }}
                                    onClick={() => handleAnswerSelect(3.1, option)}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Separator */}
                            <hr className="border-gray-200 mb-6" />

                            {/* Question 3 for Funnel 2 */}
                            <div className="mb-6">
                              <p className="text-[#333] mb-4 font-medium"
                                style={{
                                  fontFamily: 'Open Sans, sans-serif',
                                  fontWeight: 400,
                                  fontSize: '16px',
                                  lineHeight: '114.99999999999999%',
                                  letterSpacing: '1%'
                                }}>
                                3. What complex needs or issues does the youth have? Select all that apply.
                              </p>

                              {/* Radio button options */}
                              <div className="flex flex-wrap gap-4 mb-4">
                                {["Developmental needs", "Behavioral health needs", "Education needs", "Substance use disorder(s)", "Child Trafficking", "Placement disruption", "Others"].map((option, index) => (
                                  <div key={index} className="flex items-center">
                                    {/* Hidden native input */}
                                    <input
                                      type="radio"
                                      id={`q3.2-option${index}`}
                                      name="question-3.2"
                                      checked={decisionTreeAnswers[3.2] === option}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          handleAnswerSelect(3.2, option);
                                        }
                                      }}
                                      className="sr-only"
                                    />

                                    {/* Custom radio button */}
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-150 mr-2 shrink-0
                                        ${decisionTreeAnswers[3.2] === option 
                                          ? 'border-[#D14B3A]' 
                                          : 'border-gray-400 hover:border-gray-500'
                                        }`}
                                      onClick={() => handleAnswerSelect(3.2, option)}
                                    >
                                      {decisionTreeAnswers[3.2] === option && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#D14B3A]" />
                                      )}
                                    </div>

                                    {/* Label */}
                                    <label
                                      htmlFor={`q3.2-option${index}`}
                                      className="text-[#333] cursor-pointer"
                                      style={{
                                        fontFamily: 'Open Sans, sans-serif',
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        lineHeight: '115%',
                                        letterSpacing: '1%'
                                      }}
                                      onClick={() => handleAnswerSelect(3.2, option)}
                                    >
                                      {option}
                                    </label>
                                  </div>
                                ))}
                              </div>

                              {/* Sub-options for specific categories */}
                              {decisionTreeAnswers[3.2] === "Substance use disorder(s)" && (
                                <div className="mb-4">
                                  <div className="flex flex-wrap gap-2">
                                    {["SUD", "Substance", "Drug", "MAT", "Medication Assisted Treatment"].map((subOption, subIndex) => (
                                      <button
                                        key={`sub-sud-${subIndex}`}
                                        className={`px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer text-sm ${decisionTreeAnswers[`3.2.sud.${subIndex}`] === subOption
                                            ? 'bg-[#D14B3A] text-white border-[#D14B3A]'
                                            : 'bg-white text-[#333] border-gray-300 hover:border-[#D14B3A]'
                                          }`}
                                        style={{
                                          fontFamily: 'Open Sans, sans-serif',
                                          fontWeight: 400,
                                          fontSize: '12px'
                                        }}
                                        onClick={() => handleAnswerSelect(`3.2.sud.${subIndex}`, subOption)}
                                      >
                                        {subOption}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {decisionTreeAnswers[3.2] === "Child Trafficking" && (
                                <div className="mb-4">
                                  <div className="flex flex-wrap gap-2">
                                    {["Exploitation", "CSEC", "Commercial Sexual Exploitation of Children", "Trafficking"].map((subOption, subIndex) => (
                                      <button
                                        key={`sub-trafficking-${subIndex}`}
                                        className={`px-3 py-1.5 rounded-full border transition-all duration-150 text-sm cursor-pointer ${
                                          decisionTreeAnswers[`3.2.trafficking.${subIndex}`] === subOption
                                            ? 'bg-[#D14B3A] text-white border-[#D14B3A]'
                                            : 'bg-white text-[#333] border-gray-300 hover:border-[#D14B3A]'
                                          }`}
                                        style={{
                                          fontFamily: 'Open Sans, sans-serif',
                                          fontWeight: 400,
                                          fontSize: '12px'
                                        }}
                                        onClick={() => handleAnswerSelect(`3.2.trafficking.${subIndex}`, subOption)}
                                      >
                                        {subOption}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {decisionTreeAnswers[3.2] === "Placement disruption" && (
                                <div className="mb-4">
                                  <div className="flex flex-wrap gap-2">
                                    {["Placement", "Disruption", "Stabilization", "Permanency", "Crisis"].map((subOption, subIndex) => (
                                      <button
                                        key={`sub-placement-${subIndex}`}
                                        className={`px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer text-sm ${decisionTreeAnswers[`3.2.placement.${subIndex}`] === subOption
                                            ? 'bg-[#D14B3A] text-white border-[#D14B3A]'
                                            : 'bg-white text-[#333] border-gray-300 hover:border-[#D14B3A]'
                                          }`}
                                        style={{
                                          fontFamily: 'Open Sans, sans-serif',
                                          fontWeight: 400,
                                          fontSize: '12px'
                                        }}
                                        onClick={() => handleAnswerSelect(`3.2.placement.${subIndex}`, subOption)}
                                      >
                                        {subOption}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {decisionTreeAnswers[3.2] === "Others" && (
                                <div className="mb-4">
                                  <div className="flex flex-wrap gap-2">
                                    {["Absent from care", "Assessment/Evaluation", "Career guidance", "Chronic absenteeism", "Developmental needs diagnosis", "Dual jurisdiction youth CW and Probation", "Family Connection", "Family Criminality", "Gang affiliation/membership", "High-risk sexual behavior", "Homelessness", "Hospitalization", "IEP / 504", "Independent living skills", "In-Patient", "Learning disabilities", "LGBTQIA+", "Mental Health Crisis", "Missing", "Physically Assaultive", "Suicidal / Self Harm", "Suspension / Expulsion", "Teaming", "Threatening Physical Violence", "Truancy", "Victim Awareness", "Vocational Training"].map((option, index) => (
                                      <button
                                        key={`extended-${index}`}
                                        className={`px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer text-sm ${decisionTreeAnswers[`3.2.${index}`] === option
                                            ? 'bg-[#D14B3A] text-white border-[#D14B3A]'
                                            : 'bg-white text-[#333] border-gray-300 hover:border-[#D14B3A]'
                                          }`}
                                        style={{
                                          fontFamily: 'Open Sans, sans-serif',
                                          fontWeight: 400,
                                          fontSize: '12px',
                                          lineHeight: '114.99999999999999%',
                                          letterSpacing: '1%'
                                        }}
                                        onClick={() => handleAnswerSelect(`3.2.${index}`, option)}
                                      >
                                        {option}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-screen flex flex-col items-center bg-[#f6f8ff] py-6 border border-blue-200 rounded-b-lg px-4">
      {/* Description */}
      <div
        className="w-full md:w-[80%] mx-auto text-xs text-gray-700 mb-4 px-4 md:text-center sm:text-justify"
        style={{
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "115%",
          letterSpacing: "1%",
          textAlign: "center",
        }}
      >
        CBSI activates CFPIC's vision to support AB 2083 Children, Youth & Families System of Care (CYFSOC) leadership by helping them advance their partnerships across all child and family serving systems, at every level. The goals of CBSI are to enhance the care continuum for children and youth, and particularly those with complex care needs and who are involved in multiple systems.
      </div>

      {/* Decision Tree */}
      <div className="w-[80%] flex justify-center"><div className="w-[100%] mb-4">
        <DecisionTree />
      </div></div>
      {/* Filters */}
      <div className="md:w-[80%] bg-[#f6f8ff] rounded-xl p-4 shadow flex flex-col gap-3 sm:w-full">
        {/* Dropdowns - remove Age dropdown */}


        {/* Search Bar */}
        <div className={`flex items-center rounded-lg px-4 py-4 bg-white transition-all duration-150
          ${isActive ? "border-[#005CB9]" : "border-[#B7B9EA]"}
        `}
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
          }}>
          <FaSearch className="text-gray-400 mr-2" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            className={`flex-1 bg-white outline-none border-none shadow-none focus:ring-0 text-gray-700 transition-all duration-150`}
            style={{ boxShadow: "none" }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
          />
          {searchInput && (
            <button onClick={clearSearch}>
              <IoMdClose className="text-gray-400 text-lg" />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-1 pb-2">
          {filterChips.map((chip, idx) => (
            <button
              key={chip}
              style={buttonTextStyle}
              onClick={() => handleFilterSelect(idx)}
              className={`px-3 py-2 rounded-xl border-2 font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer
                ${idx === selectedFilter
                  ? 'bg-[#D14B3A] text-white border-[#D14B3A]'
                  : 'bg-white text-[#222] border-[#E8ECFF] hover:bg-white hover:border-gray-300'
                }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom buttons section */}
      <div className="w-[100%] sm:w-[80%] flex justify-between items-center mt-2">
        {/* Save My Preference Button - Left */}
        <button
          onClick={handleSavePreferenceToggle}
          className="flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-150"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '114.99999999999999%',
            letterSpacing: '1%',
            color: '#015AB8',
            background: 'transparent',
            border: 'none'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.09375" y="1.09082" width="21.8182" height="21.8182" fill={isPreferenceSaved ? "#015AB8" : "#E2E4FB"} />
            <path d="M1.37791 0.000125028C0.674643 -0.00799572 0.0144335 0.380148 0 0.968127V23.0229C0.0726698 23.8001 0.754016 23.9573 1.37791 23.9996H22.6308C23.2268 24.0144 23.9654 23.6211 24 23.0229V0.968127C23.8072 0.19924 23.2704 0.0328173 22.6308 0.000125028H1.37791ZM1.67442 1.67451H22.3256V22.3252H1.67442V1.67451ZM17.939 6.69765L9.62791 14.9649L6.06105 11.4156L4.88372 12.5929C6.46379 14.1639 8.05231 15.7265 9.62791 17.3021C12.787 14.1531 15.9529 11.0109 19.1163 7.86623L17.939 6.69765Z" fill={isPreferenceSaved ? "#FFFFFF" : "#015AB8"} />
          </svg>
          Save My Preference
        </button>

        {/* Clear All Button - Right */}
        <button
          onClick={clearAll}
          style={buttonTextStyle}
          className="bg-[#3eb6e0] text-white px-4 py-2 rounded-xl text-sm"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;