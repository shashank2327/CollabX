export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
  AUTH: {
    SIGNUP: "/api/auth/signup",        // Register user
    LOGIN: "/api/auth/login",          // Login user & get JWT
    LOGOUT: "/api/auth/logout",        // Logout user
    ME: "/api/auth/me",                // Get logged-in user
  },

  USER: {
    UPDATE_PROFILE: "/api/users/me",   // Update logged-in user's profile
  },

  PROJECT: {
    CREATE: "/api/projects",           
    GET_ALL: "/api/projects",           
    GET_ONE: (id) => `/api/projects/${id}`, 
    DELETE: (id) => `/api/projects/${id}`,  
  },

  HELP_POST: {
    CREATE: "/api/help-posts",          
    GET_ALL: "/api/help-posts",          
    GET_ONE: (id) => `/api/help-posts/${id}`, 
    CLOSE: (id) => `/api/help-posts/${id}/close`, 
  },

  CONTRIBUTION_REQUEST: {
    SEND: (helpPostId) =>
      `/api/requests/${helpPostId}`,          
    ACCEPT: (requestId) =>
      `/api/requests/${requestId}/accept`,    
    REJECT: (requestId) =>
      `/api/requests/${requestId}/reject`,    
    GET_BY_HELP_POST: (helpPostId) =>
      `/api/requests/help-post/${helpPostId}`, 
  },
};
