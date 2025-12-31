export const protect = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasPremium = await has({ plan: "premium" });
    req.plan = hasPremium ? "premium" : "free";

    return next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res
      .status(500)
      .json({
        message: error.message || error.code || "Internal Server Error",
      });
  }
};
