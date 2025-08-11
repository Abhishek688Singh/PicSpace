"use client"

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

// Intermediate Footer component (Tailwind CSS)
// - Responsive, accessible, and customizable via props
// - Includes: newsletter mock form, sitemap columns, contact info, social icons, and small print
// - Usage: import Footer from './IntermediateFooterComponent';

export default function Footer({
    companyName = 'Pic-Space',
    tagline = 'Building delightful experiences',
    links = {
        products: [
            { name: 'Features', href: '/dashbord' },
            { name: 'Join a Pic-Space', href: '/join-workspace' },
            { name: 'Integrations', href: '/integrations' }
        ],
        company: [
            { name: 'About', href: '/about' },
            { name: 'Careers', href: '/careers' },
            { name: 'Blog', href: '/blog' }
        ],
        support: [
            { name: 'Report a bug', href: '#' },
            { name: 'Community', href: '/community' },
            { name: 'Contact', href: '/contact' }
        ]
    },
    social = {
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
    }
}) {

    const { data: session } = useSession();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // null | 'success' | 'error' | 'loading'
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // initialize theme from localStorage (simple theme toggle saved per-user)
        const saved = localStorage.getItem('site-theme');
        setIsDark(saved === 'dark');
        if (saved === 'dark') document.documentElement.classList.add('dark');
    }, []);

    function toggleTheme() {
        setIsDark((prev) => {
            const next = !prev;
            if (next) document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
            localStorage.setItem('site-theme', next ? 'dark' : 'light');
            return next;
        });
    }

    function validateEmail(e) {
        // simple RFC-5322-ish-ish regex (small & forgiving)
        return /.+@.+\..+/.test(e);
    }

    async function handleSubscribe(e) {
        e.preventDefault();
        if (!validateEmail(email)) {
            setStatus('error');
            return;
        }
        setStatus('loading');

        // This is a mock — replace with your API call
        try {
            await new Promise((r) => setTimeout(r, 800));
            setStatus('success');
            setEmail('');
        } catch (err) {
            setStatus('error');
        }
    }

    return (
        <footer className="bg-gray-900 dark:bg-gray-900 text-gray-200 relative dark:text-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                    {/* Brand + tagline */}
                    <div className="flex-1 min-w-0">
                        <a href="/" className="inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded">
                            <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center overflow-hidden">
                                <img
                                    src="/logo.png" // replace with your logo path
                                    alt={`${companyName} logo`}
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{companyName}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{tagline}</p>
                            </div>
                        </a>

                        {/* <div className="mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">Subscribe to our newsletter for product updates and tips.</p>

              {/* <form onSubmit={handleSubscribe} className="mt-3 flex max-w-md">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  aria-invalid={status === 'error'}
                  className="flex-1 py-2 px-3 rounded-l-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  type="submit"
                  className="px-4 rounded-r-md font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form> 

              <div className="mt-2 h-6">
                {status === 'success' && <p className="text-sm text-green-600">Subscribed — thank you!</p>}
                {status === 'error' && <p className="text-sm text-red-600">Please enter a valid email address.</p>}
              </div>
            </div> */}

                        <div className="mt-6 flex items-center gap-3">
                            {/* <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
                aria-pressed={isDark}
              >
                {isDark ? 'Dark' : 'Light'} theme
              </button> */}

                            {/* <nav aria-label="Social">
                                <ul className="flex items-center gap-3">
                                    <li>
                                        <a href={social.twitter} className="p-2 rounded hover:underline" aria-label="Twitter">
                                             Twitter SVG 
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                <path d="M8 19c7.5 0 11.6-6.2 11.6-11.6v-.5A8.3 8.3 0 0 0 21 4.3a8.1 8.1 0 0 1-2.3.6 4.1 4.1 0 0 0 1.8-2.3 8.2 8.2 0 0 1-2.6 1A4.1 4.1 0 0 0 12 7.6a11.6 11.6 0 0 1-8.4-4.2 4.1 4.1 0 0 0 1.3 5.5A4 4 0 0 1 2 8.8v.1A4.1 4.1 0 0 0 4 12a4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.8A8.3 8.3 0 0 1 2 17.5 11.6 11.6 0 0 0 8 19z" fill="currentColor" />
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a href={social.github} className="p-2 rounded hover:underline" aria-label="GitHub">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.03-.02-2.02-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.22-1.5 3.2-1.19 3.2-1.19.63 1.65.23 2.87.11 3.17.75.81 1.2 1.85 1.2 3.11 0 4.43-2.71 5.4-5.29 5.68.42.36.8 1.07.8 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" fill="currentColor" />
                                            </svg>
                                        </a>
                                    </li>

                                    <li>
                                        <a href={social.linkedin} className="p-2 rounded hover:underline" aria-label="LinkedIn">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-.9 1.8-1.8 3.7-1.8 4 0 4.7 2.6 4.7 6v7h-4v-6.2c0-1.5 0-3.5-2.1-3.5-2.1 0-2.4 1.6-2.4 3.4V21H9z" fill="currentColor" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav> */ }
                        </div>
                    </div>

                    {/* Sitemap columns */}
                    {session?.user ? (
                        <div className="flex space-x-4 mt-2 sm:mt-0">
                            <a href="/dashbord" className="hover:text-white text-sm">
                                Dashboard
                            </a>
                            <a href="/join-workspace" className="hover:text-white text-sm">
                                Join a Pic-Space
                            </a>
                            <a href="/" className="hover:text-white text-sm">
                                Home
                            </a>
                        </div>
                    ) : (
                        <div className="flex space-x-4 mt-2 sm:mt-0">
                            <a href="/login" className="hover:text-white text-sm">
                                Login
                            </a>
                            <a href="/join-workspace" className="hover:text-white text-sm">
                                Join Pic-Space
                            </a>
                            <a href="/" className="hover:text-white text-sm">
                                Home
                            </a>
                        </div>
                    )}
                    {/* */}
                </div>

                <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-sm text-gray-400 dark:text-gray-400">© {new Date().getFullYear()} {companyName}. All rights reserved.</p>

                    {/* <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/security" className="hover:underline">Security</a>
          </div> */}
                </div>
            </div>
        </footer>
    );
}
