import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/web/ss-logo-full.png';
import MotionWrapper from '@/components/app/MotionWrapper';

const SignUp: React.FC = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Using the same strategy to retrieve the API URL:
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    useEffect(() => {
        // Redirect to dashboard if user is already logged in
        const token = localStorage.getItem('access_token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Call the /auth/register endpoint from the FastAPI backend
            const response = await fetch(`${API_URL}/api/v1/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Failed to register');
            }

            // Registration successful, redirect to sign in page
            router.push('/signin');
        } catch (err: any) {
            setError(err.message || 'An error occurred during sign up');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 h-[calc(100vh)] items-center justify-center">
            <MotionWrapper className="flex items-center justify-center p-[10vw]">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex justify-center mb-6">
                        <Image src={logo} alt="Logo" width={150} height={120} />
                    </div>
                    <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
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
                                value={userData.username}
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
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
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
                                value={userData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
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
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-blue-600 hover:text-blue-700">
                            Sign In
                        </Link>
                    </p>
                </div>
            </MotionWrapper>
        </div>
       
    );
};

export default SignUp;
