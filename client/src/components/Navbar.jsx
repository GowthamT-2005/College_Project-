import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Recommend', path: '/recommend' },
        { name: 'Admin', path: '/admin' }
    ];

    const getLinkClass = (path) => {
        const baseClass = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
        return location.pathname === path
            ? `${baseClass} bg-green-100 text-green-800 shadow-sm`
            : `${baseClass} text-slate-600 hover:bg-slate-100 hover:text-green-700`;
    };

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all duration-300">
                            🌱
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-600">
                            Resource Allocation AI
                        </span>
                    </Link>

                    <div className="hidden md:flex space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={getLinkClass(link.path)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button - simplified for brevity */}
                    <div className="md:hidden flex items-center">
                        <button className="text-slate-500 hover:text-green-600 focus:outline-none focus:text-green-600">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
