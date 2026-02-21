import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { fetchAllItems } from "../../Services/FoodThunk";
import { fetchCart } from "../../Services/CartThunk";
import { fetchWishlist } from "../../Services/WishlistThunk";
import { fetchCompare } from "../../Services/CompareThunk";
import { fetchAllUsers } from "../../Services/UsersThunk";

const Dashboard = () => {
    const [isVisible, setIsVisible] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllItems());
        dispatch(fetchCart());
        dispatch(fetchWishlist());
        dispatch(fetchCompare());
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const { usersData = [] } = useSelector((state) => state.users) || {};
    const { foodData = [] } = useSelector((state) => state.food) || {};
    const { cartData = [] } = useSelector((state) => state.cart) || {};
    const { wishlistData = [] } = useSelector((state) => state.wishlist) || {};
    const { compareData = [] } = useSelector((state) => state.compare) || {};

    // Static Data for Charts
    const salesData = [
        { month: "Jan", sales: 4000 },
        { month: "Feb", sales: 3000 },
        { month: "Mar", sales: 5000 },
        { month: "Apr", sales: 4000 },
        { month: "May", sales: 6000 },
        { month: "Jun", sales: 7000 },
    ];

    const ordersData = [
        { day: "Mon", orders: 20 },
        { day: "Tue", orders: 35 },
        { day: "Wed", orders: 25 },
        { day: "Thu", orders: 40 },
        { day: "Fri", orders: 30 },
        { day: "Sat", orders: 50 },
        { day: "Sun", orders: 45 },
    ];

    const statsRef = useRef();
    const lineChartRef = useRef();
    const barRef = useRef();
    const pieRef = useRef();

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
        });

        if (statsRef.current) observer.observe(statsRef.current);
        if (lineChartRef.current) observer.observe(lineChartRef.current);
        if (barRef.current) observer.observe(barRef.current);
        if (pieRef.current) observer.observe(pieRef.current);

        return () => observer.disconnect();
    }, []);

    const pieData = [
        { name: "Food Items", value: foodData.length },
        { name: "Cart Items", value: cartData.length },
        { name: "Wishlist Items", value: wishlistData.length },
        { name: "Compare Items", value: compareData.length },
    ];

    const COLORS = ["#f97316", "#4ade80", "#3b82f6", "#a855f7"];

    return (
        <div className="p-6 bg-gray-50 min-h-screen dark:bg-slate-700">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-slate-50">Dashboard</h1>

            {/* Key Metrics */}
            <div ref={statsRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <div className="bg-white p-4 rounded-lg shadow flex flex-col dark:bg-slate-600">
                    <span className="text-gray-500 dark:text-slate-50">Total Users</span>
                    <span className="text-2xl font-bold text-green-500 dark:text-slate-50">{usersData.length}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex flex-col dark:bg-slate-600">
                    <span className="text-gray-500 dark:text-slate-50">Food Items</span>
                    <span className="text-2xl font-bold text-orange-500 dark:text-slate-50">{foodData.length}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex flex-col dark:bg-slate-600">
                    <span className="text-gray-500 dark:text-slate-50">Items in Cart</span>
                    <span className="text-2xl font-bold text-blue-500 dark:text-slate-50">{cartData.length}</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex flex-col dark:bg-slate-600">
                    <span className="text-gray-500 dark:text-slate-50">Wishlist Items</span>
                    <span className="text-2xl font-bold text-purple-500 dark:text-slate-50">{wishlistData.length}</span>
                </div>
            </div>

            {/* Charts Section */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6`}>
                {/* Sales Line Chart */}
                <div ref={lineChartRef} className={`bg-white p-4 relative z-30 rounded-lg shadow transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Sales</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders Bar Chart */}
                <div ref={barRef} className={`bg-white p-4 rounded-lg shadow transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Weekly Orders</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={ordersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="orders" fill="#4ade80" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div ref={pieRef} className={`bg-white p-4 rounded-lg shadow transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Data Distribution</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
