import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const EditRouteModal = React.memo(({ isOpen, onClose, routeData, onUpdate }) => {
    const [formData, setFormData] = useState({
        path: "",
        component: "",
        protected: false,
    });

    const dispatch = useDispatch();

    // Pre-fill form when routeData changes
    useEffect(() => {
        if (routeData) {
            setFormData({
                path: routeData.path || "",
                component: routeData.component || "",
                protected: routeData.protected || false,
            });
        }
    }, [routeData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await onUpdate({ ...routeData, ...formData });
            toast.success("Route Data Updated");
            onClose();
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Edit Route
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Path */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Route Path
                        </label>
                        <input
                            type="text"
                            name="path"
                            value={formData.path}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                            required
                        />
                    </div>

                    {/* Component */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Component Name
                        </label>
                        <input
                            type="text"
                            name="component"
                            value={formData.component}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                            required
                        />
                    </div>

                    {/* Protected Toggle */}
                    <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                        <span className="text-sm text-gray-700">
                            Protected Route
                        </span>
                        <input
                            type="checkbox"
                            name="protected"
                            checked={formData.protected}
                            onChange={handleChange}
                            className="w-5 h-5 accent-orange-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                        >
                            Update Route
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
});

export default EditRouteModal;
