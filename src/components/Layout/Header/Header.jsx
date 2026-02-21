import { Menu, Bell, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Services/AuthThunk";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ThemeToggler from "../../UI/ThemeToggler/ThemeToggler";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { authData, isAuthenticated } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        toast.error("Logging You Out");
        setTimeout(() => {
            navigate("/auth");
        }, 500);
    };

    return (
        <header className="w-full bg-white shadow-sm border-b border-gray-200 dark:bg-slate-900 dark:border-slate-600 dark:backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 md:px-6 py-3">

                {/* Left Section */}
                <div className="flex items-center gap-4">

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                        <Menu size={22} />
                    </button>

                    {/* Zestora Logo */}
                    <div className="flex flex-col leading-tight">
                        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 dark:bg-none dark:bg-slate-50 bg-clip-text text-transparent">
                            Zestora
                        </h1>
                        <span className="text-xs text-gray-500 tracking-wide dark:text-slate-100">
                            CMS Dashboard
                        </span>
                    </div>
                </div>

                {/* Center Search (Hidden on mobile) */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3 dark:bg-slate-600 dark:text-slate-50">
                    <Search size={18} className="text-gray-500 dark:text-slate-50" />
                    <input
                        type="text"
                        placeholder="Search pages, routes..."
                        className="bg-transparent outline-none ml-2 w-full text-sm"
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggler */}
                    <ThemeToggler />

                    {/* Notification */}
                    <button className="p-2 rounded-lg hover:bg-gray-100 relative dark:hover:bg-black">
                        <Bell size={20} className="dark:text-slate-50 dark:hover:text-slate-50" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center font-semibold text-orange-600">
                            {authData?.fullName ? authData.fullName.charAt(0) : "A"}
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-slate-50">
                                {authData?.fullName || "Username"}
                            </span>
                            <span className="-mt-[0.1rem] text-[0.9rem] text-gray-500 capitalize dark:text-slate-50">
                                {authData?.role || "role"}
                            </span>
                        </div>
                    </div>


                    {/* Logout */}
                    {
                        authData && isAuthenticated && (
                            <button
                                onClick={() => logoutHandler()}
                                className="hidden md:block px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">
                                Logout
                            </button>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
