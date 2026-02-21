import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, UpdateUsers } from "../../Services/UsersThunk";
import EditUserModal from "../../UI/Modal/EditUser/EditUserModal";
import useDebounce from "../../Hooks/useDebounce";

const UserManagement = () => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearch = useDebounce(searchTerm, 500);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    const { usersData = [] } = useSelector((state) => state.users);
    const { authData = [] } = useSelector((state) => state.auth);
    console.log(authData);

    const closeEditModal = useCallback(() => {
        setIsEditOpen(false);
        setEditData(null);
        setEditingId(null);
    },[]);

    const saveEditHandler = useCallback((user) => {
        setEditingId(user.id);
        setEditData(user);
        setIsEditOpen(true);
    },[]);

    const toggleBlockUser = useCallback((user) => {
        const UpdatedStatus = user.status === "Active" ? "Blocked" : "Active";

        if (window.confirm(`Are you sure you want to ${UpdatedStatus} this user?`)) {
            dispatch(UpdateUsers({
                id: user.id,
                updatedUser: { status: UpdatedStatus },
            }));
        }
    },[dispatch]);

    const filteredUsers = useMemo(() => {
        if (!debouncedSearch.trim()) return usersData;

        return usersData.filter((item) => {
            return item.fullName.toLowerCase().includes(debouncedSearch.toLowerCase());
        })
    }, [debouncedSearch, usersData]);

    const itemsPerPage = 6;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const paginatedUsers = filteredUsers.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="w-full px-4 md:px-8 py-6 bg-gray-50 min-h-screen dark:bg-slate-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-50">
                        User Management
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-slate-50">
                        Manage and control platform users
                    </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search users..."
                        className="w-full md:w-64 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50"
                    />
                    <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 dark:bg-red-600 dark:hover:bg-red-700 transition-all duration-200 text-white rounded-lg text-sm hover:opacity-90">
                        + Add User
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Total Users</p>
                    <h2 className="text-2xl font-semibold mt-1 dark:text-slate-50">{usersData.length}</h2>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Active Users</p>
                    <h2 className="text-2xl font-semibold mt-1 text-green-600 dark:text-slate-50">{usersData.filter((user) => user.status === "Active").length || 0}</h2>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Blocked Users</p>
                    <h2 className="text-2xl font-semibold mt-1 text-red-500 dark:text-slate-50">{usersData.filter((user) => user.status === "Blocked").length || 0}</h2>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Joined</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="cols-span-full text-center py-6">
                                        <p className="capitalize tracking-wide font-[500] text-[0.9rem]">no users data to show</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedUsers.map((user) => (
                                    <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {user.fullName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === "Admin"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-blue-100 text-blue-700"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === "Active"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {user.joined ? new Date(user.joined).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button
                                                onClick={() => saveEditHandler(user)}
                                                className="text-blue-600 hover:underline">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => toggleBlockUser(user)}
                                                className={`hover:underline ${user.status === "Active"
                                                    ? "text-red-600" : "text-green-600"
                                                    }`}>
                                                {user.status === "Active" ? "Block" : "Unblock"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {paginatedUsers.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white rounded-xl p-4 shadow-sm border"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {user.fullName}
                                </h3>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs ${user.status === "Active"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {user.status}
                            </span>
                        </div>

                        <div className="flex justify-between mt-3 text-sm text-gray-600">
                            <span>Role: {user.role}</span>
                            <span>Joined: {user.joined}</span>
                        </div>

                        <div className="flex gap-4 mt-4 text-sm">
                            <button
                                onClick={() => saveEditHandler(user)}
                                className="text-blue-600 hover:underline">
                                Edit
                            </button>
                            <button
                                onClick={() => toggleBlockUser(user)}
                                className={`hover:underline ${user.status === "Active"
                                    ? "text-red-600" : "text-green-600"
                                    }`}>
                                {user.status === "Active" ? "Block" : "Unblock"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

                {/* Showing Info */}
                <div className="text-sm text-gray-600">
                    {paginatedUsers.length === 0 ? (
                        "No results found"
                    ) : (
                        <>
                            Showing{" "}
                            <span className="font-medium">{firstItemIndex + 1}</span> to{" "}
                            <span className="font-medium">
                                {Math.min(lastItemIndex, filteredUsers.length)}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium">{filteredUsers.length}</span>{" "}
                            results
                        </>
                    )}
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:bg-gray-200">
                        Previous
                    </button>
                    {
                        pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-2 text-sm border rounded-md hover:bg-orange-500 hover:text-white transition-all duration-300 ${currentPage === page ? "bg-orange-500 dark:bg-red-600 dark:border-slate-500 text-white" : "bg-white text-[#000]"} `}>
                                {page}
                            </button>
                        ))
                    }
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:bg-gray-200">
                        Next
                    </button>
                </div>
            </div>
            {
                isEditOpen && editingId !== null && (
                    <div>
                        <EditUserModal
                            onClose={closeEditModal}
                            editData={editData}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default UserManagement;
