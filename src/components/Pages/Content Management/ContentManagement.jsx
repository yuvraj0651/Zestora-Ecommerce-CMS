const ContentManagement = () => {
    return (
        <div className="w-full space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-50">
                        Content Management
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-50">
                        Create, manage and publish platform content.
                    </p>
                </div>

                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 dark:bg-red-600 dark:hover:bg-red-700 transition text-sm">
                    + Create New Content
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Total Articles</p>
                    <h3 className="text-2xl font-semibold mt-1 dark:text-slate-50">124</h3>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Published</p>
                    <h3 className="text-2xl font-semibold mt-1 text-green-600 dark:text-slate-50">98</h3>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Drafts</p>
                    <h3 className="text-2xl font-semibold mt-1 text-yellow-500 dark:text-slate-50">26</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4 dark:bg-slate-600 dark:border-slate-500">
                <input
                    type="text"
                    placeholder="Search content..."
                    className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 dark:bg-slate-500 dark:border-slate-600 dark:text-slate-50 focus:ring-orange-500"
                />
                <select className="px-4 py-2 border rounded-lg text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50">
                    <option>All Categories</option>
                    <option>Blog</option>
                    <option>News</option>
                    <option>Announcements</option>
                </select>
                <select className="px-4 py-2 border rounded-lg text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50">
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm hidden md:table">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 text-left">Title</th>
                            <th className="px-6 py-4 text-left">Category</th>
                            <th className="px-6 py-4 text-left">Author</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-800">
                                Product Launch Announcement
                            </td>
                            <td className="px-6 py-4 text-gray-600">News</td>
                            <td className="px-6 py-4 text-gray-600">Admin</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                                    Published
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-3">
                                <button className="text-blue-600 hover:underline">Edit</button>
                                <button className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="md:hidden p-4 space-y-4">
                    <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800">
                            Product Launch Announcement
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                            Category: News | Author: Admin
                        </p>
                        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                            Published
                        </span>
                        <div className="flex gap-4 mt-3 text-sm">
                            <button className="text-blue-600 hover:underline">Edit</button>
                            <button className="text-red-600 hover:underline">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;
