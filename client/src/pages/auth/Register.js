import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Alert from '../../components/Alert';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: 'user'
    });
    const [error, setError] = useState(null);
    const { register } = useContext(AuthContext);
    const history = useHistory();

    const { name, email, password, passwordConfirm, role } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setError('Passwords do not match');
        }

        try {
            console.log('[REGISTER] Calling register API with:', { name, email, password, role });
            const result = await register({ name, email, password, role });
            console.log('[REGISTER] Registration successful');
            if (result && result.user && result.user.role === 'admin') {
                history.push('/admin/dashboard');
            } else {
                history.push('/dashboard');
            }
        } catch (err) {
            console.log('[REGISTER] Registration failed:', err);
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <h1>Register</h1>
            <p>Create your account</p>
            {error && <Alert type="danger" message={error} />}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={onChange}
                        minLength="6"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={onChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;