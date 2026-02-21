import React from "react";

const sections = [
    {
        id: 1,
        title: "Hero Section",
        type: "Hero",
        status: "Active",
        order: 1,
    },
    {
        id: 2,
        title: "Featured Products",
        type: "Product Grid",
        status: "Active",
        order: 2,
    },
    {
        id: 3,
        title: "Newsletter",
        type: "CTA",
        status: "Hidden",
        order: 3,
    },
];

const PageSections = () => {
    return (
        <div className="w-full px-4 md:px-8 py-6 bg-gray-50 min-h-screen dark:bg-slate-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-50">
                        Page Sections
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-slate-50">
                        Manage sections inside your selected page
                    </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select className="w-full md:w-56 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50">
                        <option>Home Page</option>
                        <option>About Page</option>
                        <option>Menu Page</option>
                    </select>

                    <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:opacity-90 transition dark:bg-red-600 dark:hover:bg-red-700">
                        + Add Section
                    </button>
                </div>
            </div>

            {/* Section List Desktop */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 text-left">Order</th>
                            <th className="px-6 py-4 text-left">Section Title</th>
                            <th className="px-6 py-4 text-left">Type</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sections.map((section) => (
                            <tr key={section.id} className="border-t hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-700">
                                    {section.order}
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {section.title}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        {section.type}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${section.status === "Active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {section.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right space-x-3">
                                    <button className="text-blue-600 hover:underline">
                                        Edit
                                    </button>
                                    <button className="text-red-500 hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="bg-white rounded-xl p-4 shadow-sm border"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800">
                                {section.title}
                            </h3>
                            <span
                                className={`px-3 py-1 rounded-full text-xs ${section.status === "Active"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {section.status}
                            </span>
                        </div>

                        <div className="mt-3 text-sm text-gray-600">
                            <p>Type: {section.type}</p>
                            <p>Order: {section.order}</p>
                        </div>

                        <div className="flex gap-4 mt-4 text-sm">
                            <button className="text-blue-600 hover:underline">
                                Edit
                            </button>
                            <button className="text-red-500 hover:underline">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PageSections;
