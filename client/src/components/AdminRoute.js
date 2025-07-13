import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const AdminRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, isAdmin, loading } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                if (loading) return <div>Loading...</div>;
                if (!isAuthenticated) return <Redirect to="/login" />;
                if (!isAdmin) return <Redirect to="/dashboard" />;
                return <Component {...props} />;
            }}
        />
    );
};

export default AdminRoute;