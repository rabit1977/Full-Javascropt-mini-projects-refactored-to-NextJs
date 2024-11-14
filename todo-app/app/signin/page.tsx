// pages/signin.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React from 'react';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const result = await signIn("nodemailer", {
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/"); // Redirect on successful sign-in
      }
    } catch (error: unknown) {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" }); // Redirect to home on successful Google sign-in
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && (
          <div className="border border-red-400 rounded-md bg-red-100 p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Google Sign-In Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.4 0 6.1 1.2 8.1 2.8l6-6.1C34.3 3.8 29.7 2 24 2 14.8 2 7 8.2 4 16.6l7 5.4C13.3 15.2 18.1 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.7 0 10.3-1.9 13.7-5.2l-6.2-5.1c-1.7 1.2-4 1.9-7.5 1.9-6 0-11-4.1-12.8-9.7l-7.1 5.4C7 37.8 14.8 44 24 44z"
              />
              <path
                fill="#FBBC05"
                d="M11.2 26.9c-.4-1.2-.7-2.5-.7-3.9s.3-2.7.7-3.9L4.1 13.7C2.8 16.3 2 19.3 2 22.5s.8 6.2 2.1 8.8l7.1-4.4z"
              />
              <path
                fill="#EA4335"
                d="M24 9.5c3.4 0 6.1 1.2 8.1 2.8l6-6.1C34.3 3.8 29.7 2 24 2 14.8 2 7 8.2 4 16.6l7 5.4C13.3 15.2 18.1 9.5 24 9.5z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
