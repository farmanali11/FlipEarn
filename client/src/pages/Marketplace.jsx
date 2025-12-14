import React, { useState } from "react";
import { ArrowLeftIcon, FilterIcon, Verified } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import FilterSideBar from "../components/FilterSideBar";

const Marketplace = () => {
  const navigate = useNavigate();
  const [showFilterPhone,setShowFilterPhone] = useState(false);
  const [filters,setFilters] = useState({
    platform:null,
    maxPrice:10000,
    minFollowers:0,
    niche:null,
    verified:false,
    monetized:false,
  });

  const { listings } = useSelector((state) => state.listings);

  const filteredListings = listings.filter((listing) => {

    if (filters.platform && filters.platform.length > 0) {
      if(!filters.platform.includes(listing.platform))
        return false;
      }

    if (filters.maxPrice) {
      if(listing.price > filters.maxPrice)
        return false;
      }

    if (filters.minFollowers) {
      if(listing.followers_count < filters.minFollowers)
        return false;
      }

    if (filters.niche && filters.niche.length > 0) {
      if(!filters.niche.includes(listing.niche))
        return false;
      }

    if (filters.verified && listing.verified !== filters.verified) return false;

    if (filters.monetized && listing.monetized !== filters.monetized) return false;


      return true;
  });

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center justify-between text-slate-500">
        <button
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 py-5"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Home
        </button>

        <button
          onClick={() => setShowFilterPhone(true)}
          className="flex items-center gap-2 py-5 sm:hidden"
        >
          <FilterIcon className="size-4" />
          Filters
        </button>
      </div>

      <div className="flex items-start justify-between gap-8 pb-8 relative">
        <FilterSideBar setFilters={setFilters} filters={filters} setShowFilterPhone={setShowFilterPhone} showFilterPhone={showFilterPhone}/>

        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredListings
            .sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0))
            .map((listing, index) => (
              <ListingCard listing={listing} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
