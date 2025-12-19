import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  MessageSquareMoreIcon,
  ShoppingBagIcon,
  BadgeCheck,
} from "lucide-react";
import { setChat } from "../app/features/chatSlice";

const ListingDetails = () => {

  const dispatch = useDispatch()
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

  const loadChatBox = () => {
    // Your chat box logic here
    dispatch(setChat({
      listing:listing
    }))
  };

  const purchaseAccount =  async() => {
    // Your purchase logic here
    console.log("Initiating purchase...");
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
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <LoaderIcon className="mx-auto size-10 animate-spin text-indigo-600" />
          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading listing details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header Navigation */}
      <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 py-4 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to listings</span>
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Left Sidebar - Seller Information */}
          <aside className="w-full lg:sticky lg:top-24 lg:h-fit lg:w-80 xl:w-96">
            <div className="space-y-4">
              {/* Seller Profile Card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 pb-16"></div>
                <div className="relative px-6 pb-6">
                  <div className=" absolute -top-12 left-50">
                    <div className=" relative ">
                      <img
                        src={listing.owner?.image}
                        alt={listing.owner?.name}
                        className=" size-24 rounded-2xl border-4 border-white bg-white object-cover shadow-lg"
                      />
                      {listing.owner?.verified && (
                        <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-1">
                          <BadgeCheck className="size-5 text-indigo-600" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="mt-14 space-y-4">
                      <div>
                        <h3 className="text-left text-xl font-bold text-slate-900">
                          {listing.owner?.name}
                        </h3>
                        <p className=" text-left mt-1 text-sm text-slate-600">
                          {listing.owner?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm ">
                      <Calendar className="size-4 text-slate-500" />
                      <span className=" text-slate-700">
                        Member since{" "}
                        {new Date(listing.owner?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-2">
                      <button
                        onClick={loadChatBox}
                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95"
                      >
                        <MessageSquareMoreIcon className="size-5 transition-transform group-hover:scale-110" />
                        <span>Chat with Seller</span>
                      </button>

                      {listing.isCredentialChanged && (
                        <button
                          onClick={purchaseAccount}
                          className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-indigo-600 bg-white px-4 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50 active:scale-95"
                        >
                          <ShoppingBagIcon className="size-5 transition-transform group-hover:scale-110" />
                          <span>Purchase Account</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Safety & Trust
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-green-50 p-2">
                      <CheckCircle2 className="size-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Verified Seller
                      </p>
                      <p className="text-xs text-slate-600">
                        Identity confirmed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-50 p-2">
                      <BadgeCheck className="size-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        Secure Transaction
                      </p>
                      <p className="text-xs text-slate-600">
                        Protected by escrow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content - Listing Details */}
          <main className="flex-1 space-y-6">
            {/* Listing Header */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-3 shadow-inner">
                      {platformIcons[listing.platform]}
                    </div>

                    <div className="flex-1">
                      <h1 className="flex flex-wrap items-center gap-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                        {listing.title}
                        {profileLink && (
                          <Link
                            to={profileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-transform hover:scale-110"
                          >
                            <ArrowUpRightFromSquareIcon className="size-5 text-slate-400 hover:text-indigo-600" />
                          </Link>
                        )}
                      </h1>

                      <p className="mt-2 text-sm font-medium text-slate-600">
                        @{listing.username} •{" "}
                        <span className="capitalize">{listing.platform}</span>
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {listing.verified && (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-600/10">
                            <CheckCircle2 className="size-3.5" />
                            Verified Account
                          </span>
                        )}

                        {listing.monetized && (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/10">
                            <DollarSign className="size-3.5" />
                            Monetized
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-4 text-center ring-1 ring-indigo-600/10">
                    <p className="text-sm font-medium text-slate-600">Price</p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">
                      {currency}
                      {listing.price.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      USD
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshots Section */}
            {images.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-4 sm:px-8">
                  <h2 className="text-lg font-bold text-slate-900">
                    Screenshots & Proof
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Verified account images
                  </p>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="relative overflow-hidden rounded-xl bg-slate-50">
                    <div
                      className="flex transition-transform duration-500 ease-out"
                      style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                      {images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Proof ${index + 1}`}
                          className="h-64 w-full flex-shrink-0 object-cover sm:h-80 lg:h-96"
                        />
                      ))}
                    </div>

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
                          aria-label="Previous image"
                        >
                          <ChevronLeftIcon className="size-5 text-slate-700" />
                        </button>

                        <button
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95"
                          aria-label="Next image"
                        >
                          <ChevronRightIcon className="size-5 text-slate-700" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/75 px-3 py-1.5 backdrop-blur-sm">
                      <p className="text-xs font-medium text-white">
                        {current + 1} / {images.length}
                      </p>
                    </div>
                  </div>

                  {/* Dots Navigation */}
                  {images.length > 1 && (
                    <div className="mt-4 flex justify-center gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrent(index)}
                          className={`h-2 rounded-full transition-all ${
                            current === index
                              ? "w-8 bg-indigo-600"
                              : "w-2 bg-slate-300 hover:bg-slate-400"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Metrics */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4 sm:px-8">
                <h2 className="text-lg font-bold text-slate-900">
                  Account Metrics
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Performance statistics
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-5 text-center transition-all hover:shadow-md hover:ring-2 hover:ring-indigo-600/20">
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-white shadow-sm">
                      <Users className="size-6 text-indigo-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {listing.followers_count?.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                      Followers
                    </p>
                  </div>

                  <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-5 text-center transition-all hover:shadow-md hover:ring-2 hover:ring-indigo-600/20">
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-white shadow-sm">
                      <LineChart className="size-6 text-indigo-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {listing.engagement_rate}%
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                      Engagement
                    </p>
                  </div>

                  <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-5 text-center transition-all hover:shadow-md hover:ring-2 hover:ring-indigo-600/20">
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-white shadow-sm">
                      <EyeIcon className="size-6 text-indigo-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">
                      {listing.monthly_views?.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                      Monthly Views
                    </p>
                  </div>

                  <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-5 text-center transition-all hover:shadow-md hover:ring-2 hover:ring-indigo-600/20">
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-white shadow-sm">
                      <Calendar className="size-6 text-indigo-600" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {new Date(listing.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                      Listed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4 sm:px-8">
                <h2 className="text-lg font-bold text-slate-900">
                  Description
                </h2>
              </div>

              <div className="p-6 sm:p-8">
                <div className="prose prose-slate max-w-none text-slate-700">
                  <p className="whitespace-pre-line leading-relaxed">
                    {listing.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4 sm:px-8">
                <h2 className="text-lg font-bold text-slate-900">
                  Additional Details
                </h2>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Niche
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {listing.niche}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Primary Country
                    </p>
                    <p className="mt-2 flex items-center gap-2 font-semibold text-slate-900">
                      <MapPin className="size-4 text-indigo-600" />
                      {listing.country}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Audience Age
                    </p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {listing.age_range}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Platform Verified
                    </p>
                    <p
                      className={`mt-2 font-semibold ${
                        listing.platformAssured
                          ? "text-emerald-600"
                          : "text-slate-700"
                      }`}
                    >
                      {listing.platformAssured ? "Yes" : "No"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Monetization
                    </p>
                    <p
                      className={`mt-2 font-semibold ${
                        listing.monetized
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {listing.monetized ? "Enabled" : "Disabled"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </p>
                    <p className="mt-2 font-semibold capitalize text-slate-900">
                      {listing.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-600">
            © 2025{" "}
            <span className="font-semibold text-indigo-700">FARMAN BALOCH</span>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ListingDetails;
