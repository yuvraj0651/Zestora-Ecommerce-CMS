import {
    LayoutDashboard,
    Route,
    FileText,
    Layers,
    Heart,
    GitCompare,
    ShoppingCart,
    Users,
    Database,
    Settings,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NavLink } from "react-router";

const Sidebar = () => {
    const [isVisible, setIsVisible] = useState(false);

    const sidebarRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            })
        }, {
            threshold: 0.3,
        })

        if (sidebarRef.current) observer.observe(sidebarRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden md:flex flex-col dark:bg-slate-900 dark:border-slate-600">

            {/* Sidebar Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-500">
                <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 dark:bg-none dark:bg-slate-50 bg-clip-text text-transparent">
                    Zestora CMS
                </h2>
            </div>

            {/* Navigation */}
            <nav ref={sidebarRef} className={`flex-1 relative z-50 px-4 py-6 space-y-2 text-sm transition-all duration-500 
            ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>

                <SidebarItem
                    to="/home"
                    icon={<LayoutDashboard size={18} />}
                    label="Dashboard"
                />

                <SidebarItem
                    to="/home/route-management"
                    icon={<Route size={18} />}
                    label="Route Management"
                />

                <SidebarItem
                    to="/home/page-management"
                    icon={<FileText size={18} />}
                    label="Page Management"
                />

                <SidebarItem
                    to="/home/page-sections"
                    icon={<Layers size={18} />}
                    label="Page Sections"
                />

                {/* Wishlist */}
                <SidebarItem
                    to="/home/total-wishlist"
                    icon={<Heart size={18} />}
                    label="Total Wishlist"
                />

                {/* Compare */}
                <SidebarItem
                    to="/home/total-compare"
                    icon={<GitCompare size={18} />}
                    label="Total Compare"
                />

                {/* Orders */}
                <SidebarItem
                    to="/home/total-orders"
                    icon={<ShoppingCart size={18} />}
                    label="Total Orders"
                />

                {/* Users */}
                <SidebarItem
                    to="/home/user-management"
                    icon={<Users size={18} />}
                    label="User Management"
                />

                {/* Content */}
                <SidebarItem
                    to="/home/content-management"
                    icon={<Database size={18} />}
                    label="Content Management"
                />

                {/* Settings */}
                <SidebarItem
                    to="/home/settings"
                    icon={<Settings size={18} />}
                    label="Settings"
                />

            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-400">
                Zestora Admin Panel
            </div>
        </aside>
    );
};

const SidebarItem = ({ icon, label, to }) => {
    return (
        <NavLink
            to={to || "#"}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition dark:text-slate-50 dark:hover:bg-orange-600">
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};

export default Sidebar;
