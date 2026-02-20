import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, user, loading: authLoading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect') || '/';

    // Only auto-redirect if auth context has finished loading AND user is already logged in
    useEffect(() => {
        if (!authLoading && user) {
            navigate(redirect);
        }
    }, [navigate, user, redirect, authLoading]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate(redirect);
        } catch (err) {
            setError(typeof err === 'string' ? err : 'Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-4">
                New Customer?{' '}
                <Link
                    to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'}
                    className="text-blue-600 hover:underline"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
