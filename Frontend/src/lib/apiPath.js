export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
  AUTH: {
    SIGNUP: "/api/auth/signup",          // Register user
    LOGIN: "/api/auth/login",            // Login user & get JWT
    LOGOUT: "/api/auth/logout",          // Logout user
    ME: "/api/auth/me",                  // Get logged-in user profile
  },

  USER: {
    UPDATE_PROFILE: "/api/users/me",     // Update user profile (avatar, bio, skills, github, etc.)
  },

  HELP_POST: {
    CREATE: "/api/help-posts",                    // Create help post
    FEED: "/api/help-posts/feed",                 // Get all OPEN help posts (except mine)
    GET_ONE: (id) => `/api/help-posts/${id}`,     // Get help post details
    CLOSE: (id) => `/api/help-posts/${id}/close`, // Close help post
    DELETE: (id) => `/api/help-posts/${id}`,      // Delete help post

    MY_CONTRIBUTIONS: "/api/help-posts/my/contributions", // posts where i am contributing
    MY_OPEN: "/api/help-posts/my/open",            // My open help posts
    MY_CLOSED: "/api/help-posts/my/closed",        // My closed help posts
  },

  CONTRIBUTION_REQUEST: {
    CREATE: (helpPostId) =>
      `/api/requests/${helpPostId}`,              // Send contribution request

    GET_BY_HELP_POST: (helpPostId) =>
      `/api/requests/help-post/${helpPostId}`,    // Get requests for a help post (owner only)

    ACCEPT: (requestId) =>
      `/api/requests/${requestId}/accept`,        // Accept request

    REJECT: (requestId) =>
      `/api/requests/${requestId}/reject`,        // Reject request
  },
};
