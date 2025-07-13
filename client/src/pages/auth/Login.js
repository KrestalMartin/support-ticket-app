import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Alert from '../../components/Alert';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const history = useHistory();

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login({ email, password });
            history.push('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <p>Sign in to your account</p>
            {error && <Alert type="danger" message={error} />}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
            <div className="admin-login">
                <p>Admin login:</p>
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        setFormData({
                            email: 'admin@intellipaat.com',
                            password: 'admin123'
                        });
                    }}
                >
                    Auto-fill Admin Credentials
                </button>
            </div>
        </div>
    );
};

export default Login;