import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProfileLink, platformIcons } from "../assets/assets";
import {
  ArrowLeftIcon,
  LoaderIcon,
  ArrowUpRightFromSquareIcon,
  CheckCircle2,
  DollarSign,
  ChevronLeftIcon,
  ChevronRightIcon,
  Users,
  LineChart,
  EyeIcon,
  Calendar,
  MapPin,
} from "lucide-react";

const ListingDetails = () => {
  const navigate = useNavigate();
  const { listingId } = useParams();

  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [listing, setListing] = useState(null);
  const [current, setCurrent] = useState(0);

  const { listings = [] } = useSelector((state) => state.listings);
  const images = listing?.images || [];

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const profileLink =
    listing && getProfileLink(listing.platform, listing.username);

  useEffect(() => {
    const foundListing = listings.find(
      (item) => String(item.id) === String(listingId)
    );
    if (foundListing) setListing(foundListing);
  }, [listingId, listings]);

  if (!listing) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderIcon className="size-7 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen px-6 md:px-16 lg:px-32">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 py-5 text-slate-600 hover:text-slate-800"
      >
        <ArrowLeftIcon className="size-4" />
        Go to previous page
      </button>

      <div className="flex items-start gap-16 max-md:flex-col">
        <div className="flex-1 w-full">
          {/* Top Section */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="rounded-xl p-2 bg-gray-50">
                  {platformIcons[listing.platform]}
                </div>

                <div>
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                    {listing.title}
                    {profileLink && (
                      <Link to={profileLink} target="_blank">
                        <ArrowUpRightFromSquareIcon className="size-4 text-gray-400 hover:text-indigo-500" />
                      </Link>
                    )}
                  </h2>

                  <p className="text-sm text-gray-500">
                    @{listing.username}.{" "}
                    {listing.platform?.charAt(0).toUpperCase() +
                      listing.platform?.slice(1)}
                  </p>

                  <div className="mt-2 flex gap-2">
                    {listing.verified && (
                      <span className="flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs text-indigo-600">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Verified
                      </span>
                    )}

                    {listing.monetized && (
                      <span className="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs text-green-600">
                        <DollarSign className="mr-1 h-3 w-3" />
                        Monetized
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <h3 className="text-xl font-semibold text-gray-800">
                  {currency}
                  {listing.price.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-500">USD</p>
              </div>
            </div>
          </div>

          {/* Screenshots Section */}
          {images.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h4 className="mb-4 text-lg font-semibold text-gray-800">
                Screenshots & Proofs
              </h4>

              <div className="relative overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Listing proof"
                      className="h-80 w-full flex-shrink-0 object-cover"
                    />
                  ))}
                </div>

                {/* Navigation */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow"
                >
                  <ChevronLeftIcon className="size-5" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow"
                >
                  <ChevronRightIcon className="size-5" />
                </button>
              </div>

              {/* Dots */}
              <div className="mt-4 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      current === index ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Account Metrics */}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
                Account Metrics
              </h4>
            </div>

            <div
              className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-2 
    lg:grid-cols-4 
    gap-4 
    md:gap-5 
    lg:gap-6
  "
            >
              <div
                className="
      flex flex-col items-center justify-center 
      rounded-xl 
      bg-gray-50 
      p-4 
      sm:p-5 
      lg:p-6 
      text-center 
      transition 
      hover:bg-indigo-50
    "
              >
                <Users className="mb-3 size-5 sm:size-6 text-indigo-600" />
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  {listing.followers_count?.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Followers</p>
              </div>

              <div
                className="
      flex flex-col items-center justify-center 
      rounded-xl 
      bg-gray-50 
      p-4 
      sm:p-5 
      lg:p-6 
      text-center 
      transition 
      hover:bg-indigo-50
    "
              >
                <LineChart className="mb-3 size-5 sm:size-6 text-indigo-600" />
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  {listing.engagement_rate}%
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Engagement</p>
              </div>

              <div
                className="
      flex flex-col items-center justify-center 
      rounded-xl 
      bg-gray-50 
      p-4 
      sm:p-5 
      lg:p-6 
      text-center 
      transition 
      hover:bg-indigo-50
    "
              >
                <EyeIcon className="mb-3 size-5 sm:size-6 text-indigo-600" />
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  {listing.monthly_views?.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Monthly Views
                </p>
              </div>

              <div
                className="
      flex flex-col items-center justify-center 
      rounded-xl 
      bg-gray-50 
      p-4 
      sm:p-5 
      lg:p-6 
      text-center 
      transition 
      hover:bg-indigo-50
    "
              >
                <Calendar className="mb-3 size-5 sm:size-6 text-indigo-600" />
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Listed</p>
              </div>
            </div>
          </div>

          {/*Description */}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-8">
            <div className="mb-4">
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
                Description
              </h4>
            </div>

            <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
              {listing.description}
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
                Additional Details
              </h4>
            </div>

            <div
              className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-4
      md:gap-5
      lg:gap-6
    "
            >
              <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Niche</p>
                <p className="text-sm sm:text-base font-medium text-gray-900">
                  {listing.niche}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">
                  Primary Country
                </p>
                <p className="flex items-center gap-1 text-sm sm:text-base font-medium text-gray-900">
                  <MapPin className="size-4 text-indigo-600" />
                  {listing.country}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">
                  Audience Age
                </p>
                <p className="text-sm sm:text-base font-medium text-gray-900">
                  {listing.age_range}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">
                  Platform Verified
                </p>
                <p
                  className={`text-sm sm:text-base font-medium ${
                    listing.platformAssured ? "text-green-600" : "text-gray-700"
                  }`}
                >
                  {listing.platformAssured ? "Yes" : "No"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">
                  Monetization
                </p>
                <p
                  className={`text-sm sm:text-base font-medium ${
                    listing.platformAssured ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {listing.platformAssured ? "Enabled" : "Disabled"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Status</p>
                <p className="text-sm sm:text-base font-medium text-gray-900 capitalize">
                  {listing.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Info / Purchase Section */}
        <div className="w-full max-w-sm">
          {/* you can build this later */}
          <h4>Seller Information</h4>
          <div>
            <img src={listing.owner?.image} alt="seller image" />
            <div>
              <p>{listing.owner?.name} </p>
              <p>{listing.owner?.email}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
