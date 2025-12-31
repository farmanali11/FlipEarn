import React from "react";
import Title from "./Title";
import { useSelector } from "react-redux";
import ListingCard from "./ListingCard";

const LatestListings = () => {
  const { listings } = useSelector((state) => state.listings);

  // Safety check for undefined or empty listings
  if (!listings || listings.length === 0) {
    return (
      <div className="mt-20 mb-8">
        <Title
          title="Latest Listings"
          description="Discover the hottest and social profiles available right now"
        />
        <div className="flex flex-col gap-6 px-6">
          <p className="text-center text-gray-500">
            No listings available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 mb-8">
      <Title
        title="Latest Listings"
        description="Discover the hottest and social profiles available right now"
      />

      <div className="flex flex-col gap-6 px-6">
        {listings.slice(0, 4).map((listing, index) => (
          <div
            key={listing.id || index}
            className="mx-auto w-full max-w-3xl rounded-xl"
          >
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestListings;
