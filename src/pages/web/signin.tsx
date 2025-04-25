import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/web/ss-logo-full.png';
import MotionWrapper from '@/components/app/MotionWrapper';

const SignIn: React.FC = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Retrieve the API URL from environment variables.
    // You can set NEXT_PUBLIC_API_URL=http://localhost:8000 in your .env file.
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    useEffect(() => {
        // Redirect to dashboard if token exists
        const token = localStorage.getItem('access_token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Prepare form data as required by OAuth2PasswordRequestForm:
            const formData = new URLSearchParams();
            formData.append('username', credentials.username);
            formData.append('password', credentials.password);

            // Use the /auth/token endpoint from the FastAPI backend
            const response = await fetch(`${API_URL}/api/v1/auth/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Failed to sign in');
            }

            // Store the access token and redirect to dashboard
            localStorage.setItem('access_token', data.access_token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'An error occurred during sign in');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 h-[calc(100vh-110px)]">
            <MotionWrapper className="flex items-center justify-center p-[10vw]">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex justify-center">
                    <Image src={logo} alt="Logo" width={150} height={120} />
                </div>
                <h1 className="text-2xl font-semibold text-center mb-4">Sign In</h1>
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300
                         rounded-md shadow-sm focus:outline-none focus:ring
                         focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300
                         rounded-md shadow-sm focus:outline-none focus:ring
                         focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent
                       rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:ring-offset-2 disabled:bg-blue-300"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-blue-600 hover:text-blue-700">
                        Sign Up
                    </Link>
                    </p>
                </div>
            </MotionWrapper>
        </div>
    );
};

export default SignIn;
