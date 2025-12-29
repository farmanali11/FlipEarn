import React, { useEffect, useState } from "react";
import { dummyOrders, platformIcons } from "../assets/assets";
import toast from "react-hot-toast";
import {
  CheckCircleIcon,
  ChevronDown,
  ChevronUp,
  Loader2Icon,
  DollarSign,
  Copy,
  Eye,
  EyeOff,
  Calendar,
  Users,
  TrendingUp,
  ShoppingBag,
  Award,
  Shield,
  Coins,
} from "lucide-react";
import { format } from "date-fns";

const MyOrders = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const fetchOrders = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrders(dummyOrders);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const mask = (val, type) => {
    if (!val && val !== 0) return "-";
    return type.toLowerCase() === "password" ? "•".repeat(8) : String(val);
  };

  const copy = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy: " + error.message);
    }
  };

  const togglePasswordVisibility = (orderId, fieldName) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [`${orderId}-${fieldName}`]: !prev[`${orderId}-${fieldName}`],
    }));
  };

  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        bg: "bg-green-50",
        border: "border-green-200",
        color: "text-green-700",
        dot: "bg-green-500",
        text: "Completed",
      },
      pending: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        color: "text-amber-700",
        dot: "bg-amber-500",
        text: "Pending",
      },
      processing: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        color: "text-blue-700",
        dot: "bg-blue-500",
        text: "Processing",
      },
    };
    return configs[status] || configs.completed;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg">
            <Loader2Icon className="h-8 w-8 animate-spin text-blue-600" />
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-700">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/10 to-pink-400/10 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 shadow-xl shadow-blue-200/50">
              <ShoppingBag className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              No Orders Found
            </h3>
            <p className="mt-2 text-base text-slate-600">
              You have not purchased anything yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/10 to-pink-400/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30">
            <ShoppingBag className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">My Orders</h2>
            <p className="mt-1 text-sm text-slate-600">
              {orders.length} {orders.length === 1 ? "order" : "orders"} in
              total
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const id = order.id;
            const listing = order.listing;
            // Access the nested credential structure correctly
            const credentialData = order.credential || order.credentials || {};
            // Use updatedCredential if available, otherwise use originalCredential
            const credentials =
              credentialData.updatedCredential ||
              credentialData.originalCredential ||
              [];
            const isExpanded = expandedId === id;
            const statusConfig = getStatusConfig(order.status || "completed");

            // Debug log
            console.log("Order:", id);
            console.log("Credentials:", credentials);
            console.log("IsExpanded:", isExpanded);

            return (
              <div
                key={id}
                className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:border-blue-200/80 hover:shadow-2xl hover:shadow-blue-200/30"
              >
                {/* Order Header */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-4">
                      {/* Platform Icon */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-lg transition-transform group-hover:scale-110">
                        {platformIcons[listing.platform]}
                      </div>

                      {/* Listing Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                          {listing.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          @{listing.username} ·{" "}
                          <span className="capitalize">{listing.platform}</span>
                        </p>

                        {/* Badges */}
                        <div className="mt-2 flex items-center gap-2">
                          {listing.verified && (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                              <CheckCircleIcon className="h-3 w-3" />
                              Verified
                            </span>
                          )}
                          {listing.monetized && (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                              <DollarSign className="h-3 w-3" />
                              Monetized
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price & Status */}
                    <div className="flex items-center gap-4">
                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-600">
                          Amount Paid
                        </p>
                        <p className="mt-0.5 text-2xl font-bold text-slate-900">
                          {currency}
                          {Number(order.amount).toLocaleString()}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${statusConfig.dot} animate-pulse`}
                        />
                        <span className="text-xs font-bold">
                          {statusConfig.text}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expand Button & Date */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">
                      Purchased:{" "}
                      {order.createdAt
                        ? format(new Date(order.createdAt), "MMM d, yyyy")
                        : "N/A"}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedId((prev) => (prev === id ? null : id))
                    }
                    className="group/btn inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4 transition-transform group-hover/btn:translate-y-0.5" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                        View Details
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="space-y-6 p-6">
                    {/* Stats Grid */}
                    <div className="grid gap-4 sm:grid-cols-4">
                      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-4">
                        <div className="flex items-center gap-2 text-blue-700">
                          <Users className="h-4 w-4" />
                          <span className="text-xs font-medium">Followers</span>
                        </div>
                        <p className="mt-2 text-lg font-bold text-slate-900">
                          {listing?.followers_count?.toLocaleString() || "-"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 p-4">
                        <div className="flex items-center gap-2 text-green-700">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-xs font-medium">
                            Engagement
                          </span>
                        </div>
                        <p className="mt-2 text-lg font-bold text-slate-900">
                          {listing?.engagement_rate || "-"}%
                        </p>
                      </div>

                      <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 p-4">
                        <div className="flex items-center gap-2 text-purple-700">
                          <Shield className="h-4 w-4" />
                          <span className="text-xs font-medium">Verified</span>
                        </div>
                        <p className="mt-2 text-lg font-bold text-slate-900">
                          {listing?.verified ? "Yes" : "No"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-4">
                        <div className="flex items-center gap-2 text-amber-700">
                          <Coins className="h-4 w-4" />
                          <span className="text-xs font-medium">Monetized</span>
                        </div>
                        <p className="mt-2 text-lg font-bold text-slate-900">
                          {listing?.monetized ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>

                    {/* Credentials Section */}
                    {credentials && credentials.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <Shield className="h-5 w-5 text-green-600" />
                          Account Credentials
                        </h4>

                        <div className="space-y-3">
                          {credentials.map((cred, index) => {
                            const isPassword =
                              cred.type?.toLowerCase() === "password" ||
                              cred.name?.toLowerCase().includes("password");
                            const visibilityKey = `${id}-${cred.name}`;
                            const isVisible = visiblePasswords[visibilityKey];

                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-xl border-2 border-slate-200 bg-slate-50 p-4 transition-all hover:border-blue-200 hover:bg-white"
                              >
                                <div className="flex-1">
                                  <p className="text-xs font-semibold text-slate-600">
                                    {cred.name}
                                  </p>
                                  <p className="mt-1 text-base font-bold text-slate-900">
                                    {isPassword && !isVisible
                                      ? mask(cred.value, "password")
                                      : cred.value || "-"}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2">
                                  {/* Toggle Password Visibility */}
                                  {isPassword && (
                                    <button
                                      onClick={() =>
                                        togglePasswordVisibility(id, cred.name)
                                      }
                                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-600 transition-all hover:bg-slate-300 hover:scale-110"
                                      title={
                                        isVisible
                                          ? "Hide password"
                                          : "Show password"
                                      }
                                    >
                                      {isVisible ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </button>
                                  )}

                                  {/* Copy Button */}
                                  <button
                                    onClick={() => copy(cred.value)}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-700 hover:scale-110"
                                    title="Copy to clipboard"
                                  >
                                    <Copy className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Order Details */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <h5 className="mb-3 text-sm font-bold text-slate-900">
                        Order Information
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Order ID:</span>
                          <span className="font-semibold text-slate-900">
                            #{order?.id || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">
                            Transaction ID:
                          </span>
                          <span className="font-mono text-xs font-semibold text-slate-900">
                            {order?.transactionId || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">
                            Payment Method:
                          </span>
                          <span className="font-semibold text-slate-900">
                            {order?.paymentMethod || "Credit Card"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">
                            Payment Status:
                          </span>
                          <span className="font-semibold text-slate-900">
                            {order?.isPaid ? "Paid" : "Unpaid"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
