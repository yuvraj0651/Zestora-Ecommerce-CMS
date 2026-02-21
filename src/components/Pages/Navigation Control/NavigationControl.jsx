import { useState } from "react";

const NavigationControl = () => {
    const [activeTab, setActiveTab] = useState("users");

    const tabs = [
        { id: "dashboard", label: "Dashboard" },
        { id: "users", label: "Users" },
        { id: "roles", label: "Roles" },
        { id: "permissions", label: "Permissions" },
        { id: "settings", label: "Settings" },
    ];

    return (
        <div className="w-full bg-white shadow-sm border rounded-xl p-2">

            {/* Desktop Tabs */}
            <div className="hidden md:flex items-center gap-2">

                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                                ? "bg-orange-500 text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}

            </div>

            {/* Mobile Scroll Tabs */}
            <div className="flex md:hidden overflow-x-auto no-scrollbar gap-2">

                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                                ? "bg-orange-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}

            </div>
        </div>
    );
};

export default NavigationControl;
