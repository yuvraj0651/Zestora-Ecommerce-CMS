import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    ShieldCheck,
    ShieldOff,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRoutes, UpdateRoute } from "../../Services/RouteThunk";
import AddRouteModal from "../../UI/Modal/AddRoute/AddRouteModal";
import EditRouteModal from "../../UI/Modal/EditRoute/EditRouteModal";
import useDebounce from "../../Hooks/useDebounce";

const RouteManagement = () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearch = useDebounce(searchTerm, 500);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllRoutes());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    const { routesData = [] } = useSelector((state) => state.route);
    console.log(routesData)

    const toggleAddModal = () => setIsAddOpen((prev) => !prev);
    const toggleEditModal = () => setIsEditOpen((prev) => !prev);

    const saveEditHandler = useCallback((route) => {
        setEditData(route);
        setIsEditOpen(true);
    }, []);

    const filteredRoutes = useMemo(() => {
        if (!debouncedSearch.trim()) return routesData;

        return routesData.filter((item) => {
            return item.path.toLowerCase().includes(debouncedSearch.toLowerCase());
        })
    }, [debouncedSearch, routesData]);

    const itemsPerPage = 6;

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const paginatedRoutes = filteredRoutes.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="p-6 md:p-10 bg-gray-100 min-h-screen dark:bg-slate-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-50">
                        Route Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 dark:text-slate-50">
                        Manage application routes and access permissions
                    </p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search routes..."
                            className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm dark:border-slate-600 dark:bg-slate-500 dark:text-slate-50 dark:ring-red-600"
                        />
                    </div>

                    <button
                        onClick={toggleAddModal}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
                    >
                        <Plus size={18} />
                        Add Route
                    </button>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="px-6 py-4 text-left">Path</th>
                            <th className="px-6 py-4 text-left">Component</th>
                            <th className="px-6 py-4 text-left">Access</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedRoutes.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="col-span-full text-center py-5">
                                        <p className="capitalize text-[0.9rem] tracking-wide">No Routes matched your search</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedRoutes.map((route) => (
                                    <tr
                                        key={route.id}
                                        className="border-b last:border-none hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {route.path}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {route.component}
                                        </td>
                                        <td className="px-6 py-4">
                                            {route.protected ? (
                                                <span className="inline-flex items-center gap-1 text-red-500 bg-red-100 px-3 py-1 rounded-full text-xs font-medium">
                                                    <ShieldCheck size={14} />
                                                    Protected
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
                                                    <ShieldOff size={14} />
                                                    Public
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => saveEditHandler(route)}
                                                className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid md:hidden gap-4">
                {paginatedRoutes.map((route) => (
                    <div
                        key={route.id}
                        className="bg-white p-4 rounded-xl shadow-md"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="font-semibold text-gray-800">
                                    {route.path}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {route.component}
                                </p>
                            </div>

                            {route.protected ? (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                    Protected
                                </span>
                            ) : (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                    Public
                                </span>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => saveEditHandler(route)}
                                className="text-xs bg-blue-500 text-white px-3 py-1 rounded-md"
                            >
                                Edit
                            </button>
                            <button className="text-xs bg-red-500 text-white px-3 py-1 rounded-md">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 bg-white px-4 py-3 rounded-2xl shadow-md dark:bg-slate-500 dark:border-slate-600">
                    <div className="text-sm text-gray-500 dark:text-slate-50">
                        Page{" "}
                        <span className="font-semibold text-gray-700 dark:text-slate-50">
                            {currentPage}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-700 dark:text-slate-50">
                            {totalPages}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Prev */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className={`p-2 rounded-lg transition ${currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-500 dark:hover:bg-red-100 dark:hover:text-red-700"
                                }`}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Page Numbers */}
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`px-3 py-1.5 text-sm rounded-lg transition ${currentPage === number
                                    ? "bg-orange-500 text-white shadow-md dark:bg-red-600"
                                    : "bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-500 dark:hover:bg-red-100 dark:hover:text-red-700"
                                    }`}
                            >
                                {number}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className={`p-2 rounded-lg transition ${currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-500 dark:hover:bg-red-100 dark:hover:text-red-700"
                                }`}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Modals */}
            {isAddOpen && <AddRouteModal onClose={toggleAddModal} />}

            {isEditOpen && (
                <EditRouteModal
                    isOpen={isEditOpen}
                    routeData={editData}
                    onClose={() => {
                        toggleEditModal();
                        setEditData(null);
                    }}
                    onUpdate={async (updatedRoute) => {
                        await dispatch(UpdateRoute(updatedRoute)).unwrap();
                    }}
                />
            )}
        </div>
    );
};

export default RouteManagement;
