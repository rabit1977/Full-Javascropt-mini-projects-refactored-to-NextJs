// components/Navbar.tsx
'use client'; 

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import React from 'react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side - Logo */}
        <Link href="/">
          <img
            src="/nike-logo.png" // Replace with the actual path to your Nike logo
            alt="Nike Logo"
            className="h-10" 
          />
        </Link>

        {/* Center - Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-600">
              New & Featured
            </Link>
          </li>
          <li>
            <Link href="/men" className="hover:text-gray-600">
              Men
            </Link>
          </li>
          <li>
            <Link href="/women" className="hover:text-gray-600">
              Women
            </Link>
          </li>
          <li>
            <Link href="/kids" className="hover:text-gray-600">
              Kids
            </Link>
          </li>
        </ul>

        {/* Right Side - Search and User */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>

          {/* User Authentication */}
          {session ? (
            // User is signed in
            <div className="flex items-center">
              <img
                src={session.user.image || '/default-profile.png'} 
                alt={session.user.name || 'User'}
                className="h-8 w-8 rounded-full"
              />
              <button onClick={() => signOut()} className="ml-2">
                Sign Out
              </button>
            </div>
          ) : (
            // User is not signed in
            <button onClick={() => signIn()} className="bg-gray-200 px-4 py-2 rounded-md">
              Sign In
            </button>
          )}

          {/* Cart Icon */}
          <Link href="/cart">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;