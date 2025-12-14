import React, { useState } from "react";
import { ChevronDown, CurrencyIcon, Filter, X } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

const FilterSideBar = ({
  showFilterPhone,
  setShowFilterPhone,
  filters,
  setFilters,
}) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value !== "") {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
      navigate("/marketplace");
    }
  };

  const [expandedSections, setExpandedSections] = useState({
    platform: true,
    price: true,
    filters: true,
    niche: true,
    status: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const onFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const onClearFilters = ()=>{
    if(search){
      navigate("/marketplace")
    }
    setFilters({
      platforms:null,
      maxPrice:10000,
      minFollowers:0,
      niche:null,
      verified:false,
      monetized:false,
  })
}

  const platforms = [
    { value: "youtube", label: "YouTube" },
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "TikTok" },
    { value: "twitter", label: "Twitter" },
    { value: "facebook", label: "Facebook" },
    { value: "twitch", label: "Twitch" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "pinterest", label: "Pinterest" },
    { value: "discord", label: "Discord" },
  ];

  const niches = [
    { value: "lifestyle", label: "Lifestyle" },
    { value: "gaming", label: "Gaming" },
    { value: "fitness", label: "Fitness" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food" },
    { value: "fashion", label: "Fashion" },
    { value: "technology", label: "Technology" },
    { value: "education", label: "Education" },
    { value: "beauty", label: "Beauty" },
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    {value:"art & design", label:"Art & Design"},
    {value:"health", label:"Health"},
    {value:"business", label:"Business"},
    {value:"photography", label:"Photography"},
  ]

  return (
    <div
      className={`${showFilterPhone ? "max-sm:fixed" : "max-sm:hidden"} 
      max-sm:inset-0 z-100 max-sm:h-screen max-sm:overflow-scroll 
      bg-white rounded-lg shadow-sm border border-gray-200 
      h-fit sticky top-24 md:min-w-[300px]`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700">
            <Filter className="size-4" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="flex items-center gap-2">
            <X onClick={onClearFilters} className="size-6 text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer" />
            <button
              onClick={() => setShowFilterPhone(false)}
              className="sm:hidden text-sm border text-gray-700 py-1 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 sm:max-h-[calc(100vh-200px)] overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by username, platform, niche, etc."
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md outline-indigo-500"
            value={search}
            onChange={onSearchChange}
          />
        </div>

        {/* Platform Filters */}
        <div>
          <button
            onClick={() => toggleSection("platform")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">
              Platform
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${
                expandedSections.platform ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.platform && (
            <div className="flex flex-col gap-2">
              {platforms.map((platform) => (
                <label
                  key={platform.value}
                  className="flex items-center gap-2 text-gray-700 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={
                      filters.platform
                        ? filters.platform.includes(platform.value)
                        : false
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const current = filters.platform || [];

                      const updated = checked
                        ? [...current, platform.value]
                        : current.filter((p) => p !== platform.value);

                      onFilterChange({
                        platform: updated.length > 0 ? updated : null,
                      });
                    }}
                  />
                  <span>{platform.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        {/* Price Range Filter Section */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">
              Price Range
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${
                expandedSections.price ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.price && (
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={filters.maxPrice || 10000}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    maxPrice: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 "
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{currency} 0</span>
                <span>
                  {currency} {(filters.maxPrice || 10000).toLocaleString()}{" "}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Followers Range */}
        <div>
          <button
            onClick={() => toggleSection("followers")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">
              Minimum Followers
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${
                expandedSections.followers ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.followers && (
            <select
              value={filters.minFollowers?.toString() || "0"}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minFollowers: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 outline-indigo-500 "
            >
              <option value="0">Any Amount</option>
              <option value="1000">1K+</option>
              <option value="10000">10K+</option>
              <option value="50000">50K+</option>
              <option value="100000">100K+</option>
              <option value="500000">500K+</option>
              <option value="1000000">1M+</option>
            </select>
          )}
        </div>
        {/* Niche Filters */}
        <div>
          <button
            onClick={() => toggleSection("niche")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">Niche</label>
            <ChevronDown
              className={`size-4 transition-transform ${
                expandedSections.niche ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.niche && (
            <select
              value={filters.niche || " "}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  niche: e.target.value || null,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 outline-indigo-500 "
            >
              <option value="">All Niches</option>
              {niches.map((niche) => (
                <option key={niche.value} value={niche.value}>
                  {niche.label}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* Verification Status  */}
        <div>
          <button
            onClick={() => toggleSection("status")}
            className="flex items-center justify-between w-full mb-3"
          >
            <label className="text-sm font-medium text-gray-800">
              Account Status
            </label>
            <ChevronDown
              className={`size-4 transition-transform ${
                expandedSections.status ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.status && (
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verified || false}
                  onChange={(e) =>
                    onFilterChange({ ...filters, verified: e.target.checked })
                  }
                />
                <span className="text-sm text-gray-700">
                  Verified Accounts only
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.monetized || false}
                  onChange={(e) =>
                    onFilterChange({ ...filters, monetized: e.target.checked })
                  }
                />
                <span className="text-sm text-gray-700">
                  Monetized Accounts only
                </span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
