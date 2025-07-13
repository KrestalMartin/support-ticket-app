import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await api.get('/api/auth/me');
                setUser(res.data);
                setIsAuthenticated(true);
                setIsAdmin(res.data.role === 'admin');
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const register = async (formData) => {
        const res = await api.post('/api/auth/register', formData);
        setUser(res.data.user);
        setIsAuthenticated(true);
        setIsAdmin(res.data.user.role === 'admin');
        return res.data;
    };

    const login = async (formData) => {
        const res = await api.post('/api/auth/login', formData);
        setUser(res.data.user);
        setIsAuthenticated(true);
        setIsAdmin(res.data.user.role === 'admin');
        return res.data;
    };

    const logout = async () => {
        await api.get('/api/auth/logout');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isAdmin,
                loading,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };