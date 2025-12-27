import React, { useState } from "react";
import {
  X,
  DollarSign,
  Building2,
  User,
  CreditCard,
  Code,
  MapPin,
  Wallet,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const WithdrawModal = ({ onClose, availableBalance = 0 }) => {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [account, setAccount] = useState([
    {
      type: "text",
      name: "Account Holder Name",
      value: "",
      icon: User,
      placeholder: "John Doe",
    },
    {
      type: "text",
      name: "Bank Name",
      value: "",
      icon: Building2,
      placeholder: "Bank of America",
    },
    {
      type: "number",
      name: "Account Number",
      value: "",
      icon: CreditCard,
      placeholder: "1234567890",
    },
    {
      type: "text",
      name: "Account Type",
      value: "",
      icon: Wallet,
      placeholder: "Savings / Checking",
    },
    {
      type: "text",
      name: "Swift Code",
      value: "",
      icon: Code,
      placeholder: "BOFAUS3N",
    },
    {
      type: "text",
      name: "Branch",
      value: "",
      icon: MapPin,
      placeholder: "Main Branch",
    },
  ]);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      setError("Insufficient balance");
      return;
    }

    const emptyFields = account.filter((field) => !field.value);
    if (emptyFields.length > 0) {
      setError("Please fill in all bank account details");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Handle success
      console.log("Withdrawal request submitted:", {
        amount,
        account: account.reduce((acc, field) => {
          acc[field.name] = field.value;
          return acc;
        }, {}),
      });

      // Close modal or show success message
      onClose();
    } catch (err) {
      setError("Failed to process withdrawal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (index, value) => {
    setAccount((prev) =>
      prev.map((field, i) => (i === index ? { ...field, value } : field))
    );
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setError("");
  };

  const setMaxAmount = () => {
    setAmount(availableBalance.toString());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl animate-in fade-in zoom-in duration-300">
        {/* Modal Container */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/20 pointer-events-none" />
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative border-b border-slate-200 bg-gradient-to-r from-white via-blue-50/30 to-white px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30">
                  <Wallet className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Withdraw Funds
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Request withdrawal from your account
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-red-100 hover:text-red-600 hover:rotate-90 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmission} className="relative p-8">
            <div className="space-y-6">
              {/* Available Balance Info */}
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600">
                      Available Balance
                    </p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">
                      ${availableBalance.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-lg font-bold text-slate-600">$</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max={availableBalance}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white py-4 pl-10 pr-24 text-lg font-semibold text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                    required
                  />
                  <button
                    type="button"
                    onClick={setMaxAmount}
                    className="absolute inset-y-0 right-3 flex items-center rounded-lg bg-blue-100 px-3 text-xs font-bold text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
                  >
                    MAX
                  </button>
                </div>
                {parseFloat(amount) > availableBalance && (
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Amount exceeds available balance
                  </p>
                )}
              </div>

              {/* Bank Account Details */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                  Bank Account Details
                </h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  {account.map((field, index) => {
                    const Icon = field.icon;
                    return (
                      <div
                        key={index}
                        className={`space-y-2 ${
                          index === 0 || index === 1 ? "sm:col-span-2" : ""
                        }`}
                      >
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <Icon className="h-4 w-4 text-slate-500" />
                          {field.name}
                        </label>
                        <div className="relative">
                          <input
                            type={field.type}
                            value={field.value}
                            onChange={(e) =>
                              handleFieldChange(index, e.target.value)
                            }
                            placeholder={field.placeholder}
                            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                            required
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                  <p className="text-sm font-semibold text-red-700">{error}</p>
                </div>
              )}

              {/* Info Box */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-blue-900">
                      Withdrawal Processing Time
                    </p>
                    <p className="text-xs text-blue-700">
                      Your withdrawal request will be processed within 3-5
                      business days. You will receive a confirmation email once
                      the transfer is complete.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2 border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Withdrawal Request
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
