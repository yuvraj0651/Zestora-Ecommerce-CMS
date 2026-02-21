import {
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddPageModal from "../../UI/Modal/AddPage/AddPageModal";
import EditPageModal from "../../UI/Modal/EditPage/EditPageModal";
import PreviewPageModal from "../../UI/Modal/PreviewPage/PreviewPageModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPages } from "../../Services/PageThunk";
import useDebounce from "../../Hooks/useDebounce";

const PageManagement = () => {

    const [isAddPageOpen, setIsAddPageOpen] = useState(false);
    const [isEditPageOpen, setIsEditPageOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState("all-status");
    const [selectedCategory, setSelectedCategory] = useState("all-types");

    const debouncedSearch = useDebounce(searchTerm, 500);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPages());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, selectedStatus, selectedCategory]);

    const { pageData = [] } = useSelector((state) => state.page) || {};

    const toggleAddPageHandler = () => {
        setIsAddPageOpen((prev) => !prev);
    };

    const toggleEditPageHandler = () => {
        setIsEditPageOpen((prev) => !prev);
    };

    const togglePreviewPageHandler = () => {
        setIsPreviewOpen((prev) => !prev);
    };

    const saveEditHandler = useCallback((page) => {
        setEditingId(page.id);
        setEditData(page);
    }, []);

    const filteredPages = useMemo(() => {
        let filterData = [...pageData];

        if (debouncedSearch.trim()) {
            filterData = filterData.filter((item) => {
                return item.title.toLowerCase().includes(debouncedSearch.toLowerCase());
            });
        };

        if (selectedStatus !== "all-status") {
            filterData = filterData.filter((item) => {
                return item.status.toLowerCase() === selectedStatus;
            });
        };

        if (selectedCategory !== "all-types") {
            filterData = filterData.filter((item) => {
                return item.type.toLowerCase() === selectedCategory;
            });
        };

        return filterData;
    }, [pageData, debouncedSearch, selectedStatus, selectedCategory]);

    const itemsPerPage = 6;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const paginatedPages = filteredPages.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
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
                        Page Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 dark:text-slate-50">
                        Manage and control all website pages
                    </p>
                </div>

                <button
                    onClick={() => toggleAddPageHandler()}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 dark:bg-none dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition">
                    <Plus size={18} />
                    Add New Page
                </button>
            </div>

            {/* Filters + Search */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:bg-slate-500">
                <div className="flex gap-3">
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50 dark:ring-red-600">
                        <option value="all-status" hidden>All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50 dark:ring-red-600">
                        <option value="all-types" hidden>All Types</option>
                        <option value="public">Public</option>
                        <option value="dynamic">Dynamic</option>
                        <option value="protected">Protected</option>
                    </select>

                    <button className="text-sm bg-gray-200 px-3 py-2 rounded-lg dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50 dark:ring-red-600">
                        Bulk Action
                    </button>
                </div>

                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search pages..."
                        className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 outline-none dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50 dark:ring-red-600"
                    />
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-gray-600 uppercase text-xs tracking-wider">
                            <th className="px-6 py-4 text-left">
                                <input type="checkbox" />
                            </th>
                            <th className="px-6 py-4 text-left">Title</th>
                            <th className="px-6 py-4 text-left">Slug</th>
                            <th className="px-6 py-4 text-left">Type</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Updated</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            paginatedPages.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="col-span-full text-center py-6">
                                        <p className="tracking-wide text-[0.8rem] capitalize font-[500]">
                                            No Pages matched your{" "}
                                            {debouncedSearch && <span>search</span>}{" "}
                                            {selectedStatus !== "all-status" && <span>selected status</span>}{" "}
                                            {selectedCategory !== "all-types" && <span>selected category</span>}
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedPages?.map((page) => (
                                    <tr
                                        key={page.id}
                                        className="border-b last:border-none hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <input type="checkbox" />
                                        </td>

                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {page.title}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {page.slug}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {page.type}
                                        </td>

                                        <td className="px-6 py-4">
                                            {page.status === "Published" ? (
                                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium">
                                                    Draft
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-gray-500">
                                            {page.updated ?? "N/A"}
                                        </td>

                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            <button
                                                onClick={() => togglePreviewPageHandler()}
                                                className="text-blue-500 hover:text-blue-600">
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    toggleEditPageHandler();
                                                    saveEditHandler(page)
                                                }}
                                                className="text-orange-500 hover:text-orange-600">
                                                <Pencil size={16} />
                                            </button>
                                            <button className="text-red-500 hover:text-red-600">
                                                <Trash2 size={16} />
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
                {paginatedPages.map((page) => (
                    <div
                        key={page.id}
                        className="bg-white p-4 rounded-xl shadow-md"
                    >
                        <div className="flex justify-between">
                            <h2 className="font-semibold text-gray-800">
                                {page.title}
                            </h2>
                            <span className="text-xs text-gray-500">
                                {page.updated}
                            </span>
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                            {page.slug}
                        </p>

                        <div className="flex justify-between items-center mt-3">
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                                {page.type}
                            </span>

                            {page.status === "Published" ? (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                    Published
                                </span>
                            ) : (
                                <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                                    Draft
                                </span>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 mt-4">
                            <Eye size={16} className="text-blue-500" />
                            <Pencil size={16} className="text-orange-500" />
                            <Trash2 size={16} className="text-red-500" />
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

                {/* Showing Info */}
                <div className="text-sm text-gray-600 dark:text-slate-50">
                    {filteredPages.length === 0 ? (
                        "No results found"
                    ) : (
                        <>
                            Showing{" "}
                            <span className="font-medium">{firstItemIndex + 1}</span> to{" "}
                            <span className="font-medium">
                                {Math.min(lastItemIndex, filteredPages.length)}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium">{filteredPages.length}</span>{" "}
                            results
                        </>
                    )}
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-100 transition">
                        Previous
                    </button>
                    {
                        pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-2 text-sm border rounded-md hover:bg-orange-500 dark:border-slate-500 dark:hover:bg-red-500 hover:text-white transition-all duration-300 ${currentPage === page ? "bg-orange-500 dark:bg-red-500 text-white" : "bg-white text-[#000]"} `}>
                                {page}
                            </button>
                        ))
                    }
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-100 transition">
                        Next
                    </button>
                </div>
            </div>
            {
                isAddPageOpen && (
                    <div>
                        <AddPageModal onClose={toggleAddPageHandler} />
                    </div>
                )
            }
            {
                isEditPageOpen && editingId !== null && (
                    <div>
                        <EditPageModal
                            onClose={toggleEditPageHandler}
                            editData={editData}
                        />
                    </div>
                )
            }
            {
                isPreviewOpen && (
                    <div>
                        <PreviewPageModal onClose={togglePreviewPageHandler} />
                    </div>
                )
            }
        </div>
    );
};

export default PageManagement;
