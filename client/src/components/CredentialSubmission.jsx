import {
  CirclePlusIcon,
  X,
  Lock,
  Mail,
  Key,
  Shield,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Info,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { platformIcons } from "../assets/assets";

const CredentialSubmission = ({ onClose, listing }) => {
  const [newField, setNewField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});

  const [credential, setCredential] = useState([
    { type: "email", name: "Email", value: "", icon: Mail },
    { type: "password", name: "Password", value: "", icon: Lock },
  ]);

  const handleAddField = () => {
    const name = newField.trim();
    if (!name) {
      toast.error("Please enter a field name");
      return;
    }

    // Check for duplicate field names
    if (
      credential.some((cred) => cred.name.toLowerCase() === name.toLowerCase())
    ) {
      toast.error("Field name already exists");
      return;
    }

    setCredential((prev) => [
      ...prev,
      { type: "text", name, value: "", icon: Key },
    ]);
    setNewField("");
    toast.success(`${name} field added`);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    // Validation
    const emptyFields = credential.filter((cred) => !cred.value.trim());
    if (emptyFields.length > 0) {
      toast.error("Please fill in all credential fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Credentials submitted:", {
        listingId: listing?.id,
        credentials: credential.reduce((acc, cred) => {
          acc[cred.name] = cred.value;
          return acc;
        }, {}),
      });

      toast.success("Credentials submitted successfully!");
      onClose();
    } catch (err) {
      toast.error("Failed to submit credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (index, value) => {
    setCredential((prev) =>
      prev.map((c, i) => (i === index ? { ...c, value } : c))
    );
  };

  const handleRemoveField = (index) => {
    // Prevent removing default email and password fields
    if (index < 2) {
      toast.error("Cannot remove default email and password fields");
      return;
    }

    setCredential((prev) => prev.filter((_, i) => i !== index));
    toast.success("Field removed");
  };

  const togglePasswordVisibility = (index) => {
    setShowPasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddField();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl animate-in fade-in zoom-in duration-300">
        {/* Modal Container */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/20 pointer-events-none" />
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative border-b border-slate-200 bg-gradient-to-r from-white via-indigo-50/30 to-white px-8 py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-600/30">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {listing?.title || "Account Credentials"}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm text-slate-600">
                      Adding credentials for{" "}
                      <span className="font-semibold text-slate-900">
                        @{listing?.username}
                      </span>{" "}
                      on
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-700">
                      {listing?.platform && platformIcons[listing.platform]}
                      {listing?.platform}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-red-100 hover:text-red-600 hover:rotate-90 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmission} className="relative p-8">
            <div className="space-y-6">
              {/* Security Notice */}
              <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 flex-shrink-0 text-indigo-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-indigo-900">
                      Secure Credential Storage
                    </p>
                    <p className="text-xs text-indigo-700">
                      Your credentials are encrypted and stored securely. We
                      never share your information with third parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Credential Fields */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Key className="h-5 w-5 text-indigo-600" />
                  Account Credentials
                </h4>

                <div className="space-y-3">
                  {credential.map((cred, index) => {
                    const Icon = cred.icon;
                    const isPassword = cred.type === "password";
                    const showPassword = showPasswords[index];

                    return (
                      <div
                        key={`${cred.name}-${index}`}
                        className="group relative rounded-xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-indigo-200 hover:shadow-lg"
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 to-slate-200">
                            <Icon className="h-5 w-5 text-slate-600" />
                          </div>

                          {/* Input Field */}
                          <div className="flex-1 space-y-2">
                            <label className="text-sm font-semibold text-slate-700">
                              {cred.name}
                            </label>
                            <div className="relative">
                              <input
                                type={
                                  isPassword && !showPassword
                                    ? "password"
                                    : "text"
                                }
                                value={cred.value}
                                onChange={(e) =>
                                  handleFieldChange(index, e.target.value)
                                }
                                placeholder={`Enter ${cred.name.toLowerCase()}`}
                                className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 pr-12 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                required
                              />

                              {/* Password Toggle */}
                              {isPassword && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    togglePasswordVisibility(index)
                                  }
                                  className="absolute inset-y-0 right-2 flex items-center justify-center px-2 text-slate-400 transition-colors hover:text-slate-600"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Remove Button (only for custom fields) */}
                          {index >= 2 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveField(index)}
                              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 opacity-0 transition-all hover:bg-red-100 group-hover:opacity-100 hover:scale-110"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Field */}
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Plus className="h-4 w-4 text-slate-500" />
                  Add Custom Field (Optional)
                </h4>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newField}
                      onChange={(e) => setNewField(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g., Security Question, PIN, etc."
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:shadow-xl hover:shadow-indigo-600/40 hover:-translate-y-0.5"
                  >
                    <CirclePlusIcon className="h-5 w-5 transition-transform group-hover:rotate-90" />
                    Add
                  </button>
                </div>

                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Add any additional fields required for this account
                </p>
              </div>

              {/* Verification Status */}
              <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-green-900">
                      Verification Process
                    </p>
                    <p className="text-xs text-green-700">
                      Once submitted, our team will verify your credentials
                      within 24-48 hours. You'll receive a notification once
                      verification is complete.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
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
                  disabled={
                    isSubmitting || credential.some((c) => !c.value.trim())
                  }
                  className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:shadow-2xl hover:shadow-indigo-600/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        Submit Credentials
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

export default CredentialSubmission;
