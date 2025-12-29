import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  Users,
  TrendingUp,
  DollarSign,
  Globe,
  Calendar,
  Shield,
  Coins,
  Info,
  Sparkles,
  BarChart3,
  Target,
} from "lucide-react";
import { platformIcons } from "../assets/assets";

const ManageListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userListings = [] } = useSelector((state) => state.listings || {});

  const [loadListing, setLoadListing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    followers_count: "",
    engagement_rate: "",
    monthly_views: "",
    niche: "",
    price: "",
    description: "",
    verified: false,
    monetized: false,
    country: "",
    age_range: "",
    images: [],
  });

  const platforms = [
    "youtube",
    "instagram",
    "tiktok",
    "facebook",
    "twitter",
    "linkedin",
    "pinterest",
    "snapchat",
    "twitch",
    "discord",
  ];

  const niches = [
    "technology",
    "finance",
    "health",
    "fitness",
    "beauty",
    "fashion",
    "gaming",
    "education",
    "entertainment",
    "travel",
    "food",
    "lifestyle",
    "business",
    "marketing",
    "music",
    "sports",
    "art",
    "photography",
    "automotive",
    "real-estate",
    "cryptocurrency",
    "productivity",
    "self-improvement",
    "comedy",
    "motivation",
    "news",
    "politics",
    "environment",
    "science",
    "nature",
    "history",
    "culture",
  ];

  const ageRanges = [
    "13-17 years",
    "18-24 years",
    "25-34 years",
    "35-44 years",
    "45-54 years",
    "55-64 years",
    "65+ years",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    if (files.length + formData.images.length > 5) {
      toast.error("You can add up to 5 images only");
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
    toast.success(`${validFiles.length} image(s) added`);
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }));
    toast.success("Image removed");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.platform) newErrors.platform = "Platform is required";
    if (!formData.followers_count || formData.followers_count <= 0)
      newErrors.followers_count = "Valid follower count is required";
    if (!formData.engagement_rate || formData.engagement_rate < 0)
      newErrors.engagement_rate = "Valid engagement rate is required";
    if (!formData.monthly_views || formData.monthly_views <= 0)
      newErrors.monthly_views = "Valid monthly views required";
    if (!formData.niche) newErrors.niche = "Niche is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.age_range) newErrors.age_range = "Age range is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);

      if (isEditing) {
        toast.success("Listing updated successfully!");
      } else {
        toast.success("Listing created successfully!");
      }

      navigate("/my-listings");
    } catch (error) {
      toast.error("Failed to save listing. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    setIsEditing(true);
    setLoadListing(true);

    const listing = userListings?.find((listing) => listing.id === id);
    if (listing) {
      setFormData(listing);
      setLoadListing(false);
    } else {
      toast.error("Listing not found");
      navigate("/my-listings");
    }
  }, [id, userListings, navigate]);

  if (loadListing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-lg font-semibold text-slate-700">
            Loading listing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-linear-to-br from-blue-400/10 to-purple-400/10 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-linear-to-br from-indigo-400/10 to-pink-400/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/my-listings")}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg transition-all hover:bg-slate-50 hover:shadow-xl hover:-translate-x-1"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {isEditing ? "Edit Listing" : "Create New Listing"}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {isEditing
                  ? "Update your listing details"
                  : "Fill in the details to create a new listing"}
              </p>
            </div>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-slate-50 px-8 py-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <Info className="h-6 w-6 text-blue-600" />
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Essential details about your account
              </p>
            </div>

            <div className="space-y-6 p-8">
              {/* Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Target className="h-4 w-4 text-blue-600" />
                  Account Title
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Premium Gaming Channel"
                  className={`w-full rounded-xl border-2 ${
                    errors.title ? "border-red-300" : "border-slate-200"
                  } bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10`}
                />
                {errors.title && (
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Platform & Niche */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Globe className="h-4 w-4 text-indigo-600" />
                    Platform
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) =>
                      handleInputChange("platform", e.target.value)
                    }
                    className={`w-full rounded-xl border-2 ${
                      errors.platform ? "border-red-300" : "border-slate-200"
                    } bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10`}
                  >
                    <option value="">Select platform</option>
                    {platforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </option>
                    ))}
                  </select>
                  {errors.platform && (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.platform}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Target className="h-4 w-4 text-purple-600" />
                    Niche
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.niche}
                    onChange={(e) => handleInputChange("niche", e.target.value)}
                    className={`w-full rounded-xl border-2 ${
                      errors.niche ? "border-red-300" : "border-slate-200"
                    } bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10`}
                  >
                    <option value="">Select niche</option>
                    {niches.map((niche) => (
                      <option key={niche} value={niche}>
                        {niche.charAt(0).toUpperCase() + niche.slice(1)}
                      </option>
                    ))}
                  </select>
                  {errors.niche && (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.niche}
                    </p>
                  )}
                </div>
              </div>

              {/* Country & Age Range */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Globe className="h-4 w-4 text-green-600" />
                    Country
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    placeholder="e.g., United States"
                    className={`w-full rounded-xl border-2 ${
                      errors.country ? "border-red-300" : "border-slate-200"
                    } bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/10`}
                  />
                  {errors.country && (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.country}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    Primary Age Range
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.age_range}
                    onChange={(e) =>
                      handleInputChange("age_range", e.target.value)
                    }
                    className={`w-full rounded-xl border-2 ${
                      errors.age_range ? "border-red-300" : "border-slate-200"
                    } bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-all focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10`}
                  >
                    <option value="">Select age range</option>
                    {ageRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  {errors.age_range && (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.age_range}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-slate-50 px-8 py-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
                Account Statistics
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Performance metrics and engagement data
              </p>
            </div>

            <div className="space-y-6 p-8">
              <div className="grid gap-6 sm:grid-cols-3">
                {/* Followers */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Users className="h-4 w-4 text-blue-600" />
                    Followers
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.followers_count}
                    onChange={(e) =>
                      handleInputChange("followers_count", e.target.value)
                    }
                    placeholder="10000"
                    className={`w-full rounded-xl border-2 ${
                      errors.followers_count
                        ? "border-red-300"
                        : "border-slate-200"
                    } bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10`}
                  />
                  {errors.followers_count && (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.followers_count}
                    </p>
                  )}
                </div>

                {/* Engagement Rate */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Engagement Rate (%)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.engagement_rate}
                    onChange={(e) =>
                      handleInputChange("engagement_rate", e.target.value)
                    }
                    placeholder="5.2"
                    className={`w-full rounded-xl border-2 ${
                      errors.engagement_rate
                        ? "border-red-300"
                        : "border-slate-200"
                    } bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/10`}
                  />
                  {errors.engagement_rate && (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.engagement_rate}
                    </p>
                  )}
                </div>

                {/* Monthly Views */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Eye className="h-4 w-4 text-purple-600" />
                    Monthly Views
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.monthly_views}
                    onChange={(e) =>
                      handleInputChange("monthly_views", e.target.value)
                    }
                    placeholder="100000"
                    className={`w-full rounded-xl border-2 ${
                      errors.monthly_views
                        ? "border-red-300"
                        : "border-slate-200"
                    } bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10`}
                  />
                  {errors.monthly_views && (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.monthly_views}
                    </p>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  Listing Price ({currency})
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-lg font-bold text-slate-600">
                      {currency}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    className={`w-full rounded-xl border-2 ${
                      errors.price ? "border-red-300" : "border-slate-200"
                    } bg-white py-3 pl-10 pr-4 text-lg font-semibold text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10`}
                  />
                </div>
                {errors.price && (
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Status Toggles */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Verified Account
                      </p>
                      <p className="text-xs text-slate-600">
                        Platform verified badge
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("verified", !formData.verified)
                    }
                    className={`relative h-8 w-14 rounded-full transition-colors ${
                      formData.verified ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${
                        formData.verified ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                      <Coins className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Monetized
                      </p>
                      <p className="text-xs text-slate-600">Earning eligible</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("monetized", !formData.monetized)
                    }
                    className={`relative h-8 w-14 rounded-full transition-colors ${
                      formData.monetized ? "bg-green-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-lg transition-transform ${
                        formData.monetized ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-slate-50 px-8 py-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <Info className="h-6 w-6 text-blue-600" />
                Description
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Detailed information about your account
              </p>
            </div>

            <div className="space-y-2 p-8">
              <label className="text-sm font-bold text-slate-900">
                Account Description
                <span className="text-red-500"> *</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe your account, its content style, audience demographics, and what makes it unique..."
                rows={6}
                className={`w-full rounded-xl border-2 ${
                  errors.description ? "border-red-300" : "border-slate-200"
                } bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10`}
              />
              {errors.description && (
                <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-slate-500">
                {formData.description.length} / 1000 characters
              </p>
            </div>
          </div>

          {/* Images Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-slate-50 px-8 py-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <ImageIcon className="h-6 w-6 text-purple-600" />
                Images
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Upload up to 5 images (max 5MB each)
              </p>
            </div>

            <div className="space-y-6 p-8">
              {/* Upload Area */}
              <div className="relative">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={formData.images.length >= 5}
                />
                <label
                  htmlFor="image-upload"
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed ${
                    errors.images
                      ? "border-red-300 bg-red-50"
                      : "border-slate-300 bg-slate-50"
                  } p-12 transition-all hover:border-blue-500 hover:bg-blue-50 ${
                    formData.images.length >= 5
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="mt-4 text-base font-bold text-slate-900">
                    {formData.images.length >= 5
                      ? "Maximum images reached"
                      : "Click to upload images"}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    PNG, JPG, GIF up to 5MB each
                  </p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {formData.images.length} / 5 images uploaded
                  </p>
                </label>
                {errors.images && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.images}
                  </p>
                )}
              </div>

              {/* Image Preview Grid */}
              {formData.images.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-3">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50"
                    >
                      <div className="aspect-video w-full bg-slate-100">
                        {image instanceof File ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition-all hover:bg-red-600 group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/my-listings")}
              className="flex-1 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex-1 overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    {isEditing ? "Update Listing" : "Create Listing"}
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Success Info Box */}
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Ready to publish?
                </p>
                <p className="mt-1 text-xs text-green-700">
                  Once you submit, your listing will be reviewed and published
                  within 24 hours. Make sure all information is accurate.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageListing;
