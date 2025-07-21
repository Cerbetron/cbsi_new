import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import SearchPanel from '../components/SearchPanel'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import ResourceListing from '../components/ResourceListing'
import SidebarButton from '../components/SidebarButton'

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://217.196.48.69:8000/api/all_data');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Combine all service arrays from the API response
        const combinedServices = data
        
        setServices(combinedServices);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
        setServices([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filtering logic
  const filteredServices = React.useMemo(() => {
    if (!filters) return services;
    return services.filter(service => {
      // Search filter (case-insensitive, matches service_type or description)
      const search = filters.search?.trim().toLowerCase() || '';
      const matchesSearch =
        !search ||
        service.service_type.toLowerCase().includes(search) ||
        service.description.toLowerCase().includes(search);

      // Multi-select filters - Note: API doesn't have age, county, insurance, cw fields
      // These filters are kept for UI compatibility but will match all services since fields don't exist
      const matchesAge = true; // API doesn't have age field
      const matchesCounty = true; // API doesn't have county field  
      const matchesInsurance = true; // API doesn't have insurance field
      const matchesCw = true; // API doesn't have cw field

      // Partners filter (filter chips)
      const matchesPartners = (() => {
        if (!filters.selectedFilter || filters.selectedFilter === "All") {
          return true; // Show all services when "All" is selected or no filter
        }
        
        if (!service.partners || service.partners.length === 0) {
          return false; // Services without partners don't match any specific filter
        }

        // Create mapping between filter chips and actual partner names in the data
        const partnerMapping = {
          "Child Welfare (CW)": ["CWS", "Child Welfare", "CW"],
          "Probation": ["Probation"],
          "Behavioral Health (BH)": ["Mental Health Plan (MHP)", "BH", "Behavioral Health", "County SUD"],
          "Developmental Services": ["Regional Center", "Developmental Services"],
          "Education": ["Education", "Educational"]
        };

        const targetPartners = partnerMapping[filters.selectedFilter] || [];
        
        // Check if any of the service's partners match the selected filter
        return service.partners.some(partner => 
          targetPartners.some(targetPartner => 
            partner.toLowerCase().includes(targetPartner.toLowerCase()) ||
            targetPartner.toLowerCase().includes(partner.toLowerCase())
          )
        );
      })();

      return matchesSearch && matchesAge && matchesCounty && matchesInsurance && matchesCw && matchesPartners;
    });
  }, [filters, services]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#f6f8ff] flex flex-col min-h-screen w-full relative overflow-x-hidden">
        <div className="w-full">
          <Header />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Loading services...
            </p>
          </div>
        </div>
        <div className="flex min-w-full">
          <Footer />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#f6f8ff] flex flex-col min-h-screen w-full relative overflow-x-hidden">
        <div className="w-full">
          <Header />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Error Loading Services
            </h3>
            <p className="text-gray-600 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Try Again
            </button>
          </div>
        </div>
        <div className="flex min-w-full">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f8ff] flex flex-col min-h-screen w-full relative overflow-x-hidden">
      {/* Header */}
      <div className="w-full">
        <Header />
      </div>

      {/* Search Panel */}
      <div className="w-full sm:px-2">
        <SearchPanel onSearch={setFilters} />
      </div>

      {/* Main content area with blur overlay when sidebarOpen */}
      <div className="relative w-full flex-1 px">
        
            {/* Resource Listing */}
            <div className="relative flex-1 flex flex-col w-full overflow-x-auto overflow-y-hidden">
              <div className={sidebarOpen ? "transition-all duration-300 relative z-10" : ""}>
                <ResourceListing services={filteredServices} />

              </div>
            </div>
          </div>

  
      <div className="flex min-w-full">
<Footer />
      </div>
      
    </div>
  )
}

export default Home