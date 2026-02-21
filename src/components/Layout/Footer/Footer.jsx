import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200 mt-auto dark:bg-slate-900 dark:backdrop-blur-sm dark:border-slate-600">
            <div className="max-w-full px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">

                {/* Left Side */}
                <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
                    <h2 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 dark:bg-none dark:bg-white bg-clip-text text-transparent">
                        Zestora CMS
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-slate-100">
                        © {new Date().getFullYear()} Zestora. All rights reserved.
                    </span>
                </div>

                {/* Center */}
                <div className="text-sm text-gray-400 dark:text-slate-50">
                    Version 1.0.0
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4 text-sm">
                    <button className="text-gray-500 hover:text-orange-500 transition dark:text-slate-50">
                        Documentation
                    </button>
                    <button className="text-gray-500 hover:text-orange-500 transition dark:text-slate-50">
                        Support
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
