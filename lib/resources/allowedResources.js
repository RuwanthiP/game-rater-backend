export const moderatorAllowedResources = [
  { method: "POST", path: "/games" },
  { method: "GET", path: "/games" },
  { method: "DELETE", path: "/games" },
  { method: "POST", path: "/games/{gameId}/reviews" },
  { method: "GET", path: "/games/{gameId}/reviews" },
  { method: "DELETE", path: "/games/{gameId}/reviews" },
];

export const reviewerAllowedResources = [
  { method: "GET", path: "/games" },
  { method: "POST", path: "/games/{gameId}/reviews" },
  { method: "GET", path: "/games/{gameId}/reviews" },
];
