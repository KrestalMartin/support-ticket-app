import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserDashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Alert from './components/Alert';
import './components/Navbar.css';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <div className="content-container">
                        <Alert />
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <PrivateRoute exact path="/dashboard" component={UserDashboard} />
                            <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                            <Route exact path="/">
                                <div className="home-page">
                                    <h1>Intellipaat Support System</h1>
                                    <p>Get help with your course-related issues</p>
                                    <div className="cta-buttons">
                                        <a href="/login" className="btn btn-primary">Login</a>
                                        <a href="/register" className="btn btn-secondary">Register</a>
                                    </div>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;