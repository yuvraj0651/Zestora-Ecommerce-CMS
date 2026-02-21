import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../Services/CartThunk";
import useDebounce from "../../Hooks/useDebounce";

const TotalOrders = () => {
    const itemsPerLoad = 7;
    const [isVisibleCount, setIsVisibleCount] = useState(itemsPerLoad);
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearch = useDebounce(searchTerm, 500);

    const ordersRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const { cartData = [] } = useSelector((state) => state.cart);
    console.log(cartData);

    const filteredOrders = useMemo(() => {
        if (!debouncedSearch.trim()) return cartData;

        return cartData.filter((item) => {
            return item.strMeal?.toLowerCase().includes(debouncedSearch.toLowerCase());
        });
    }, [debouncedSearch, cartData]);

    const visibleCartOrders = filteredOrders.slice(0, isVisibleCount);

    useEffect(() => {
        const lastElement = ordersRef.current;
        if (!lastElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry.isIntersecting) {
                    setIsVisibleCount((prev) => {
                        if (prev >= filteredOrders.length) return prev;
                        return prev + itemsPerLoad;
                    });
                }
            },
            {
                threshold: 0.5,
            }
        );

        observer.observe(lastElement);

        return () => {
            observer.disconnect();
        };
    }, [visibleCartOrders.length, filteredOrders.length]);

    useEffect(() => {
        setIsVisibleCount(itemsPerLoad);
    }, [cartData, debouncedSearch]);

    return (
        <div className="w-full space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-50">
                        Orders Management
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-50">
                        View and manage all customer orders.
                    </p>
                </div>

                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 dark:bg-red-600 dark:hover:bg-red-700 transition text-sm">
                    Export Orders
                </button>
            </div>

            {/* Order Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Total Orders</p>
                    <h3 className="text-2xl font-semibold mt-1 dark:text-slate-50">{cartData.length}</h3>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Pending</p>
                    <h3 className="text-2xl font-semibold mt-1 text-yellow-500 dark:text-slate-50">4</h3>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Completed</p>
                    <h3 className="text-2xl font-semibold mt-1 text-green-600 dark:text-slate-50">7</h3>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Cancelled</p>
                    <h3 className="text-2xl font-semibold mt-1 text-red-500 dark:text-slate-50">0</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4 dark:bg-slate-600 dark:border-slate-500">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Order ID or Customer..."
                    className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 dark:bg-slate-500 dark:border-slate-600 focus:ring-orange-500"
                />

                <select className="px-4 py-2 border rounded-lg text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                </select>

                <select className="px-4 py-2 border rounded-lg text-sm dark:text-slate-50 dark:bg-slate-600 dark:border-slate-500">
                    <option>All Payment Methods</option>
                    <option>Credit Card</option>
                    <option>PayPal</option>
                    <option>COD</option>
                </select>
            </div>

            {/* Desktop Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                {/* Horizontal Scroll Wrapper */}
                <div className="overflow-x-auto">
                    <table className="min-w-[900px] w-full text-sm">

                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 text-left w-[140px]">Order ID</th>
                                <th className="px-6 py-4 text-left w-[180px]">Customer</th>
                                <th className="px-6 py-4 text-left w-[140px]">Date</th>
                                <th className="px-6 py-4 text-left w-[120px]">Amount</th>
                                <th className="px-6 py-4 text-left w-[180px]">Payment Method</th>
                                <th className="px-6 py-4 text-left w-[140px]">Status</th>
                                <th className="px-6 py-4 text-right w-[150px]">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                visibleCartOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="col-span-full text-center py-10">
                                            <p className="tracking-wide capitalize font-[500] text-[0.9rem]">no orders matched your search</p>
                                        </td>
                                    </tr>
                                ) : (
                                    visibleCartOrders?.map((item, index) => {
                                        const isLast = index === visibleCartOrders.length - 1;
                                        return (
                                            <tr key={`${item.id}-${index}`} ref={isLast ? ordersRef : null} className="border-t hover:bg-gray-50 transition">

                                                <td className="px-6 py-4 font-medium text-gray-800">
                                                    #ORD-{item.id}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {item.name ?? "John Doe"}
                                                </td>

                                                <td className="px-6 py-4 text-gray-500">
                                                    {item.dateModified ? new Date(item.dateModified).toLocaleDateString() : "N/A"}
                                                </td>

                                                <td className="px-6 py-4 font-medium">
                                                    ${item.strMealPrice}
                                                </td>

                                                {/* FIXED Payment Column */}
                                                <td className="px-6 py-4">
                                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs whitespace-nowrap">
                                                        Credit Card
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs whitespace-nowrap">
                                                        Pending
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                                                    <button className="text-blue-600 hover:underline">
                                                        View
                                                    </button>
                                                    <button className="text-green-600 hover:underline">
                                                        Complete
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                )}
                        </tbody>

                    </table>
                    {
                        isVisibleCount < filteredOrders.length && (
                            <div className="flex justify-center py-6">
                                <div className="animate-spin h-6 w-6 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                            </div>
                        )
                    }
                </div>
            </div>


            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-gray-800">
                                #ORD-10245
                            </h4>
                            <p className="text-xs text-gray-500">
                                John Doe • 12 Feb 2026
                            </p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">
                            Pending
                        </span>
                    </div>

                    <div className="flex justify-between mt-3 text-sm text-gray-600">
                        <span>Payment: Credit Card</span>
                        <span className="font-medium">$245.00</span>
                    </div>

                    <div className="flex gap-4 mt-4 text-sm">
                        <button className="text-blue-600 hover:underline">
                            View
                        </button>
                        <button className="text-green-600 hover:underline">
                            Mark Complete
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TotalOrders;
