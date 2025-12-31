import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import MyListings from "./pages/MyListings";
import ManageListing from "./pages/ManageListing";
import ListingDetails from "./pages/ListingDetails";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import MyOrders from "./pages/MyOrders";
import Loading from "./pages/Loading";
import Navbar from "./components/Navbar";
import ChatBox from "./components/ChatBox";

import { Toaster } from "react-hot-toast";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AllListings from "./pages/admin/allListings";
import CredentialChange from "./pages/admin/CredentialChange";
import CredentialVerify from "./pages/admin/CredentialVerify";
import Transactions from "./pages/admin/Transactions";
import Withdrawal from "./pages/admin/Withdrawal";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import {
  getAllPublicListings,
  getAllUserListing,
} from "./app/features/listingSlice";

const App = () => {
  const { pathname } = useLocation();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPublicListings());
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded && user) {
      dispatch(getAllUserListing({ getToken }));
    }
  }, [isLoaded, user, dispatch, getToken]);

  return (
    <div>
      <Toaster position="top-right" />
      {!pathname.includes("/admin") && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/listings/:listingId" element={<ListingDetails />} />
        <Route path="/create-listing" element={<ManageListing />} />
        <Route path="/edit-listing/:id" element={<ManageListing />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/loading" element={<Loading />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="verify-credentials" element={<CredentialVerify />} />
          <Route path="change-credentials" element={<CredentialChange />} />
          <Route path="list-listings" element={<AllListings />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="withdrawal" element={<Withdrawal />} />
        </Route>
      </Routes>

      <ChatBox />
    </div>
  );
};

export default App;
