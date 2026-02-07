import React, { createContext, useState, useEffect } from "react";
import api from "../lib/axios";
import { API_PATHS } from "../lib/apiPath";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Check for token & Fetch User on App Load (Page Refresh)
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Token exists, so we fetch the user data
                const response = await api.get(API_PATHS.AUTH.ME);
                // Ensure we extract the user object correctly
                console.log(response)
                setUser(response.data.user || response.data);
            } catch (error) {
                console.error("Session expired or invalid:", error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // 2. Helper to update user state (Login / Signup / Profile Update)
    const updateUser = (data) => {
        // If the response has a 'user' key, use that. Otherwise use data itself.
        const userData = data.user || data;
        
        setUser(userData);

        // Only update the token if the backend actually sent a new one.
        // (Profile updates usually don't send a token, so we keep the old one).
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};