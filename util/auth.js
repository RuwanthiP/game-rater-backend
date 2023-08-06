import jwt from "jsonwebtoken";

export const generateToken = (userInfo) => {
  if (!userInfo) {
    return null;
  }

  // 60 * 1 means, 60s x 1 = 60s
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: userInfo,
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const verifyToken = (emailAddress, token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return {
        verified: false,
        message: err,
      };
    }

    if (decoded.data.emailAddress !== emailAddress) {
      return {
        verified: false,
        message: "Invalid User",
      };
    }

    return {
      verified: true,
      message: "Verified",
    };
  });
};

export const verifyTokenExpire = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return {
        verified: false,
        message: err,
      };
    }

    return {
      verified: true,
      message: "Verified",
    };
  });
};
