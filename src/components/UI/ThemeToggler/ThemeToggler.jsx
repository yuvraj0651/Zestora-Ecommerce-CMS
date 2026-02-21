import { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import ThemeContext from "../../context/Theme/ThemeContext";

const ThemeToggler = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 flex items-center bg-gray-300 dark:bg-purple-200 rounded-full p-1 transition-colors duration-300"
        >
            {/* Circle */}
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center dark:bg-purple-700
                ${theme === "dark" ? "translate-x-7" : "translate-x-0"}`}
            >
                {theme === "dark" ? (
                    <Moon size={14} className="text-gray-800 dark:text-slate-100" />
                ) : (
                    <Sun size={14} className="text-yellow-500" />
                )}
            </div>
        </button>
    );
};

export default ThemeToggler;
