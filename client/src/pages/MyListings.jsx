import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Eye,
  DollarSign,
  CheckCircle,
  WalletIcon,
  ArrowDownCircleIcon,
  CoinsIcon,
  StarIcon,
  LockIcon,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Users,
  BanIcon,
  XCircle,
  Clock,
  TrendingUp,
  TrashIcon,
  EyeOffIcon,
  EyeIcon,
  Edit,
  Award,
  Heart,
  MessageSquare,
  Share2,
  Download,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { platformIcons } from "../assets/assets";
import WithdrawModal from "../components/WithdrawModel";
import CredentialSubmission from "../components/CredentialSubmission";

const MyListings = () => {
  const { userListings = [], balance = {} } = useSelector(
    (state) => state.listings
  );

  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  // Modal states
  const [showCredentialSubmission, setShowCredentialSubmission] =
    useState(null);
  const [showWithdrawal, setShowWithdrawal] = useState(false);

  const totalValue = userListings.reduce(
    (sum, listing) => sum + (listing.price || 0),
    0
  );

  const formatNumber = (nums) => {
    if (nums >= 1000000) return (nums / 1000000).toFixed(1) + "M";
    if (nums >= 1000) return (nums / 1000).toFixed(1) + "K";
    return nums?.toString() || "0";
  };

  const toggleStatus = async (listingId) => {
    console.log("Toggle status:", listingId);
    // Implementation here
    // API call to toggle listing status
  };

  const deleteListing = async (listingId) => {
    console.log("Delete listing:", listingId);
    // Implementation here
    // Show confirmation dialog then delete
  };

  const markAsFeatured = async (listingId) => {
    console.log("Mark as featured:", listingId);
    // Implementation here
    // API call to mark listing as featured
  };

  const handleAddCredentials = (listing) => {
    setShowCredentialSubmission(listing);
  };

  const handleWithdraw = () => {
    setShowWithdrawal(true);
  };

  const getStatusConfig = (status) => {
    const configs = {
      active: {
        icon: <CheckCircle className="h-4 w-4" />,
        text: "Active",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        color: "text-emerald-700",
        dot: "bg-emerald-500",
      },
      ban: {
        icon: <BanIcon className="h-4 w-4" />,
        text: "Banned",
        bg: "bg-red-50",
        border: "border-red-200",
        color: "text-red-700",
        dot: "bg-red-500",
      },
      sold: {
        icon: <DollarSign className="h-4 w-4" />,
        text: "Sold",
        bg: "bg-purple-50",
        border: "border-purple-200",
        color: "text-purple-700",
        dot: "bg-purple-500",
      },
      inactive: {
        icon: <XCircle className="h-4 w-4" />,
        text: "Inactive",
        bg: "bg-gray-50",
        border: "border-gray-200",
        color: "text-gray-700",
        dot: "bg-gray-500",
      },
      pending: {
        icon: <Clock className="h-4 w-4" />,
        text: "Pending",
        bg: "bg-amber-50",
        border: "border-amber-200",
        color: "text-amber-700",
        dot: "bg-amber-500",
      },
    };
    return configs[status] || configs.pending;
  };

  const activeListings = userListings.filter(
    (listing) => listing.status === "active"
  ).length;

  const soldListings = userListings.filter(
    (listing) => listing.status === "sold"
  ).length;

  const getCredentialStatus = (listing) => {
    if (!listing.isCredentialSubmitted) {
      return {
        text: "Not Submitted",
        color: "text-gray-700",
        bg: "bg-gray-50",
        border: "border-gray-200",
        icon: <AlertCircle className="h-3.5 w-3.5" />,
      };
    }
    if (listing.isCredentialChanged) {
      return {
        text: "Changed",
        color: "text-orange-700",
        bg: "bg-orange-50",
        border: "border-orange-200",
        icon: <RefreshCw className="h-3.5 w-3.5" />,
      };
    }
    if (listing.isCredentialVerified) {
      return {
        text: "Verified",
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        icon: <ShieldCheck className="h-3.5 w-3.5" />,
      };
    }
    return {
      text: "Submitted",
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: <LockIcon className="h-3.5 w-3.5" />,
    };
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/10 to-pink-400/10 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    My Listings
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Manage and track your account listings
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/create-listing")}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 active:translate-y-0 active:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Plus className="relative h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
              <span className="relative">Create New Listing</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Listings"
              value={userListings.length}
              icon={<Eye size={20} />}
              color="indigo"
            />
            <StatCard
              title="Active Listings"
              value={activeListings}
              icon={<CheckCircle size={20} />}
              color="green"
            />
            <StatCard
              title="Sold Listings"
              value={soldListings}
              icon={<DollarSign size={20} />}
              color="purple"
            />
            <StatCard
              title="Total Value"
              value={`${currency}${totalValue.toLocaleString()}`}
              icon={<TrendingUp size={20} />}
              color="yellow"
            />
          </div>

          {/* Wallet Summary */}
          <div className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:border-blue-200/80 hover:shadow-blue-200/30">
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Wallet Summary
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Track your earnings and balance
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleWithdraw}
                    disabled={(balance.available || 0) <= 0}
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-600/30 transition-all hover:shadow-xl hover:shadow-green-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    Withdraw
                  </button>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 shadow-inner">
                    <WalletIcon className="h-7 w-7 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <WalletItem
                label="Total Earned"
                value={balance.earned || 0}
                icon={<WalletIcon className="h-7 w-7" />}
                iconBg="bg-gradient-to-br from-blue-100 to-blue-200"
                iconColor="text-blue-600"
                currency={currency}
                description="All-time earnings"
              />
              <WalletItem
                label="Withdrawn"
                value={balance.withdrawn || 0}
                icon={<ArrowDownCircleIcon className="h-7 w-7" />}
                iconBg="bg-gradient-to-br from-red-100 to-red-200"
                iconColor="text-red-600"
                currency={currency}
                description="Total withdrawals"
              />
              <WalletItem
                label="Available"
                value={balance.available || 0}
                icon={<CoinsIcon className="h-7 w-7" />}
                iconBg="bg-gradient-to-br from-green-100 to-emerald-200"
                iconColor="text-green-600"
                currency={currency}
                description="Ready to withdraw"
                onClick={handleWithdraw}
              />
            </div>
          </div>

          {/* Listings Grid */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Your Listings
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {userListings.length}{" "}
                    {userListings.length === 1 ? "listing" : "listings"} in
                    total
                  </p>
                </div>
              </div>
            </div>

            {userListings.length === 0 ? (
              <div className="py-24 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-200 shadow-xl shadow-blue-200/50">
                  <Plus className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  No listings yet
                </h3>
                <p className="mt-2 text-base text-slate-600">
                  Create your first listing to start reaching potential buyers
                </p>
                <button
                  onClick={() => navigate("/create-listing")}
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-200 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1"
                >
                  <Plus className="h-5 w-5" />
                  Create First Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
                {userListings.map((listing) => {
                  const credentialStatus = getCredentialStatus(listing);
                  const statusConfig = getStatusConfig(listing.status);

                  return (
                    <div
                      key={listing.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-2"
                    >
                      {/* Featured Badge */}
                      {listing.isFeatured && (
                        <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                          <Award className="h-3.5 w-3.5" />
                          Featured
                        </div>
                      )}

                      {/* Platform Badge */}
                      <div className="absolute right-4 top-4 z-10">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                          {platformIcons[listing.platform]}
                        </div>
                      </div>

                      {/* Card Header */}
                      <div className="relative h-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
                      </div>

                      {/* Card Content */}
                      <div className="relative -mt-8 space-y-4 p-6">
                        {/* Listing Info */}
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {listing.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200">
                              <Users className="h-4 w-4 text-slate-600" />
                            </div>
                            <p className="text-sm font-semibold text-slate-700">
                              @{listing.username}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold capitalize text-slate-700">
                              {listing.platform}
                            </span>
                          </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Users className="h-4 w-4" />
                              <span className="text-xs font-medium">
                                Followers
                              </span>
                            </div>
                            <p className="text-lg font-bold text-slate-900">
                              {formatNumber(listing.followers_count || 0)}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-600">
                              <TrendingUp className="h-4 w-4" />
                              <span className="text-xs font-medium">
                                Engagement
                              </span>
                            </div>
                            <p className="text-lg font-bold text-slate-900">
                              {listing.engagement_rate || 0}%
                            </p>
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                          <p className="text-xs font-medium text-slate-600">
                            Listing Price
                          </p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900">
                              {currency}
                              {listing.price?.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Credentials Section */}
                        <div className="space-y-2 rounded-xl bg-slate-50 p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-700">
                              Credentials Status
                            </span>
                            <div
                              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${credentialStatus.bg} ${credentialStatus.border} ${credentialStatus.color}`}
                            >
                              {credentialStatus.icon}
                              {credentialStatus.text}
                            </div>
                          </div>

                          {!listing.isCredentialSubmitted && (
                            <button
                              onClick={() => handleAddCredentials(listing)}
                              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5"
                            >
                              Add Credentials Now
                            </button>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${statusConfig.dot} animate-pulse`}
                            />
                            {statusConfig.icon}
                            {statusConfig.text}
                          </div>

                          {listing.status === "active" && (
                            <button
                              onClick={() => markAsFeatured(listing.id)}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-all hover:bg-amber-100 hover:scale-110"
                            >
                              <StarIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() =>
                              navigate(`/edit-listing/${listing.id}`)
                            }
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>

                          <button
                            onClick={() => toggleStatus(listing.id)}
                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all hover:bg-slate-200 hover:scale-110"
                            title={
                              listing.status === "active"
                                ? "Hide listing"
                                : "Show listing"
                            }
                          >
                            {listing.status === "active" ? (
                              <EyeOffIcon className="h-5 w-5" />
                            ) : (
                              <EyeIcon className="h-5 w-5" />
                            )}
                          </button>

                          {listing.status !== "sold" && (
                            <button
                              onClick={() => deleteListing(listing.id)}
                              className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-all hover:bg-red-100 hover:scale-110"
                              title="Delete listing"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Hover Gradient Effect */}
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 rounded-3xl border border-slate-200/80 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="px-8 py-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      © 2025 FARMAN BALOCH
                    </p>
                    <p className="text-xs text-slate-600">
                      All rights reserved
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-blue-100 hover:text-blue-600">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-blue-100 hover:text-blue-600">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-blue-100 hover:text-blue-600">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Modals - Rendered at Root Level */}
      {showWithdrawal && (
        <WithdrawModal
          onClose={() => setShowWithdrawal(false)}
          availableBalance={balance.available || 0}
        />
      )}

      {showCredentialSubmission && (
        <CredentialSubmission
          onClose={() => setShowCredentialSubmission(null)}
          listing={showCredentialSubmission}
        />
      )}
    </>
  );
};

const WalletItem = ({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  currency,
  description,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`group relative overflow-hidden p-8 transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-50/50 hover:to-blue-50/30 ${
      onClick ? "cursor-pointer" : ""
    }`}
  >
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconBg}`}
        >
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-600">{label}</p>
        <p className="text-3xl font-bold text-slate-900">
          {currency}
          {value.toFixed(2)}
        </p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>

    {/* Animated border on hover */}
    <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
    </div>
  </div>
);

export default MyListings;
