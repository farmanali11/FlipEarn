import imagekit from "../configs/imageKit.js";
import { prisma } from "../configs/prisma.js";

import fs from "fs";

// Controller for adding the Listings to the database

export const addListing = async (req, res) => {
  try {
    const { userId } = await req.auth();
    if (req.plan !== "premium") {
      const listingCount = await prisma.listing.count({
        where: { ownerId: userId },
      });

      if (listingCount >= 5) {
        return res.status(400).json({
          message:
            "You have reached the limit of 5 listings for free plan. Please upgrade to premium to add more listings.",
        });
      }
    }

    const accountDetails = JSON.parse(req.body.accountDetails);

    accountDetails.followers_count =
      parseFloat(accountDetails.followers_count) || 0;
    accountDetails.engagement_rate =
      parseFloat(accountDetails.engagement_rate) || 0;
    accountDetails.monthly_views =
      parseFloat(accountDetails.monthly_views) || 0;
    accountDetails.price = parseFloat(accountDetails.price);

    accountDetails.platform = accountDetails.platform?.toLowerCase() || "";
    accountDetails.niche = accountDetails.niche?.toLowerCase() || "";

    // Add safety check for username
    if (accountDetails.username && accountDetails.username.startsWith("@")) {
      accountDetails.username = accountDetails.username.slice(1);
    }

   const uploadImages = req.files.map(async (file) => {
     const response = await imagekit.upload({
       file: fs.readFileSync(file.path),
       fileName: `${Date.now()}-${file.originalname}`,
       folder: "/flip-earn",
     });

     // Clean up uploaded file
     fs.unlinkSync(file.path);

     return response.url;
   });

    // Wait for all uploads to complete
    const images = await Promise.all(uploadImages);

    const listing = await prisma.listing.create({
      data: {
        ownerId: userId,
        images,
        ...accountDetails,
      },
    });

    return res
      .status(201)
      .json({ message: "Account listed successfully", listing });
  } catch (error) {
    console.error("Add Listing Error:", error);
    return res
      .status(500)
      .json({ message: "Error adding listing", error: error.message });
  }
};

// controller for getting all public listings

export const getAllPublicListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      where: { status: "active" },
      include: {
        owner: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!listings || listings.length === 0) {
      return res.json({ message: "No listings found", listings: [] });
    }
    return res.json({ listings });
  } catch (error) {
    console.error("Get All Public Listings Error:", error);
    return res.status(500).json({
      message: error.message || error.code || "Internal Server Error",
    });
  }
};

// controller for getting all listing of a user

export const getAllUserListings = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const listings = await prisma.listing.findMany({
      where: {
        ownerId: userId,
        status: { not: "deleted" },
      },
      orderBy: { createdAt: "desc" },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const balance = {
      earned: user.earned || 0,
      withdrawn: user.withdrawn || 0,
      available: (user.earned || 0) - (user.withdrawn || 0),
    };

    if (!listings || listings.length === 0) {
      return res.json({ message: "No listings found", listings: [], balance });
    }
    return res.json({ listings, balance });
  } catch (error) {
    console.error("Get All User Listings Error:", error);
    return res.status(500).json({
      message: error.message || error.code || "Internal Server Error",
    });
  }
};

// Controller for updating listing in the database

export const updateListing = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const accountDetails = JSON.parse(req.body.accountDetails);

    if (req.files.length + accountDetails.images.length > 5) {
      return res
        .status(400)
        .json({ message: "You can upload maximum 5 images per listing" });
    }

    accountDetails.followers_count =
      parseFloat(accountDetails.followers_count) || 0;
    accountDetails.engagement_rate =
      parseFloat(accountDetails.engagement_rate) || 0;
    accountDetails.monthly_views =
      parseFloat(accountDetails.monthly_views) || 0;
    accountDetails.price = parseFloat(accountDetails.price);

    accountDetails.platform = accountDetails.platform?.toLowerCase() || "";
    accountDetails.niche = accountDetails.niche?.toLowerCase() || "";

    // Add safety check for username
    if (accountDetails.username && accountDetails.username.startsWith("@")) {
      accountDetails.username = accountDetails.username.slice(1);
    }

    const listing = await prisma.listing.findUnique({
      where: { id: accountDetails.id },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this listing" });
    }

    if (listing.status === "sold") {
      return res
        .status(400)
        .json({ message: "Sold listing cannot be updated" });
    }

    let newImages = [];
    if (req.files && req.files.length > 0) {
      const uploadImages = req.files.map(async (file) => {
        const response = await imagekit.upload({
          file: fs.readFileSync(file.path),
          fileName: `${Date.now()}-${file.originalname}`,
          folder: "flip-earn",
        });

        // Clean up uploaded file
        fs.unlinkSync(file.path);

        return response.url;
      });

      newImages = await Promise.all(uploadImages);
    }

    const updatedListing = await prisma.listing.update({
      where: { id: accountDetails.id },
      data: {
        ...accountDetails,
        images:
          newImages.length > 0
            ? [...accountDetails.images, ...newImages]
            : accountDetails.images,
      },
    });

    return res.status(200).json({
      message: "Account updated successfully",
      listing: updatedListing,
    });
  } catch (error) {
    console.error("Update Listing Error:", error);
    return res
      .status(500)
      .json({ message: "Error updating listing", error: error.message });
  }
};

export const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = await req.auth();
    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this listing" });
    }

    if (listing.status === "banned") {
      return res
        .status(400)
        .json({ message: "Cannot change status of a banned listing" });
    }

    if (listing.status === "sold") {
      return res
        .status(400)
        .json({ message: "Cannot change status of a sold listing" });
    }

    if (listing.status === "active" || listing.status === "inactive") {
      await prisma.listing.update({
        where: { id },
        data: { status: listing.status === "active" ? "inactive" : "active" },
      });
      return res
        .status(200)
        .json({ message: "Listing status updated successfully" });
    }

    return res.status(400).json({ message: "Invalid listing status" });
  } catch (error) {
    console.error("Toggle Listing Status Error:", error);
    return res
      .status(500)
      .json({ message: "Error toggling listing status", error: error.message });
  }
};

export const deleteUserListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { userId } = await req.auth();

    const listing = await prisma.listing.findFirst({
      where: { id: listingId },
      include: { owner: true },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this listing" });
    }

    if (listing.status === "sold") {
      return res
        .status(400)
        .json({ message: "Sold listing cannot be deleted" });
    }

    if (listing.isCredentialChanged) {
      return res.status(400).json({
        message:
          "Cannot delete listing with changed credentials. Please contact support.",
      });
    }

    await prisma.listing.update({
      where: { id: listingId },
      data: { status: "deleted" },
    });

    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Delete User Listing Error:", error);
    return res
      .status(500)
      .json({ message: "Error deleting listing", error: error.message });
  }
};

export const addCredential = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { listingId, credential } = req.body;

    if (!credential || credential.length === 0 || !listingId) {
      return res
        .status(400)
        .json({ message: "Listing ID and credential are required" });
    }

    const listing = await prisma.listing.findFirst({
      where: { id: listingId },
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (listing.ownerId !== userId) {
      return res.status(403).json({
        message: "You are not the owner of this listing",
      });
    }

    await prisma.credential.create({
      data: {
        listingId,
        originalCredential: credential,
      },
    });

    await prisma.listing.update({
      where: { id: listingId },
      data: { isCredentialSubmitted: true },
    });

    return res.status(200).json({ message: "Credential added successfully" });
  } catch (error) {
    console.error("Add Credential Error:", error);
    return res
      .status(500)
      .json({ message: "Error adding credential", error: error.message });
  }
};

export const markFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = await req.auth();
    const listing = await prisma.listing.findFirst({
      where: { id },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this listing" });
    }

    await prisma.listing.update({
      where: { id },
      data: { isFeatured: !listing.isFeatured },
    });

    return res.status(200).json({
      message: `Listing ${
        listing.isFeatured ? "removed from" : "marked as"
      } featured successfully`,
    });
  } catch (error) {
    console.error("Mark Featured Error:", error);
    return res
      .status(500)
      .json({ message: "Error marking featured", error: error.message });
  }
};

export const getAllUserOrders = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const orders = await prisma.order.findMany({
      where: { userId, isPaid: true },
      include: {
        listing: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!orders || orders.length === 0) {
      return res.json({ message: "No orders found", orders: [] });
    }

    const credentials = await prisma.credential.findMany({
      where: {
        listingId: { in: orders.map((order) => order.listingId) },
      },
    });

    const ordersWithCredentials = orders.map((order) => {
      const credential = credentials.find(
        (cred) => cred.listingId === order.listingId
      );
      return {
        ...order,
        credential,
      };
    });

    return res.json({ orders: ordersWithCredentials });
  } catch (error) {
    console.error("Get All User Orders Error:", error);
    return res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const withdrawAmount = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const available = (user.earned || 0) - (user.withdrawn || 0);

    if (amount > available) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { withdrawn: (user.withdrawn || 0) + amount },
    });

    return res.status(200).json({ message: "Withdrawal successful" });
  } catch (error) {
    console.error("Withdraw Amount Error:", error);
    return res
      .status(500)
      .json({ message: "Error withdrawing amount", error: error.message });
  }
};

export const purchaseAccount = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { listingId } = req.params;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { owner: true },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.status !== "active") {
      return res
        .status(400)
        .json({ message: "Listing is not available for purchase" });
    }

    if (listing.ownerId === userId) {
      return res
        .status(400)
        .json({ message: "You cannot purchase your own listing" });
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        listingId,
        amount: listing.price,
        isPaid: true,
      },
    });

    // Update listing status
    await prisma.listing.update({
      where: { id: listingId },
      data: { status: "sold" },
    });

    // Update owner's earnings
    await prisma.user.update({
      where: { id: listing.ownerId },
      data: { earned: { increment: listing.price } },
    });

    return res.status(200).json({ message: "Purchase successful", order });
  } catch (error) {
    console.error("Purchase Account Error:", error);
    return res
      .status(500)
      .json({ message: "Error purchasing account", error: error.message });
  }
};
