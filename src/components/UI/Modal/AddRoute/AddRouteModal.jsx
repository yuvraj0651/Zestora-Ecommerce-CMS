import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddingRoute } from '../../../Services/RouteThunk';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

const AddRouteModal = React.memo(({ onClose }) => {
    const [formData, setFormData] = useState({
        path: "",
        component: "",
        protected: false,
    });

    const dispatch = useDispatch();
    const { addLoading } = useSelector((state) => state.route);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.path || !formData.component) {
            alert("All fields are required");
            return;
        };

        dispatch(AddingRoute(formData))
            .unwrap()
            .then(() => {
                toast.success("New Route Added");
            }).catch((error) => {
                toast.error(error.message || "Something went wrong");
            })

        setFormData({
            path: "",
            component: "",
            protected: false,
        });

        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-fadeIn">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Add New Route
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Path */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Route Path
                            </label>
                            <input
                                type="text"
                                name="path"
                                placeholder="/about"
                                value={formData.path}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            />
                        </div>

                        {/* Component */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Component Name
                            </label>
                            <input
                                type="text"
                                name="component"
                                placeholder="AboutPage"
                                value={formData.component}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            />
                        </div>

                        {/* Protected Toggle */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="protected"
                                checked={formData.protected}
                                onChange={handleChange}
                                className="h-4 w-4 accent-orange-500"
                            />
                            <label className="text-sm text-gray-600">
                                Make this route protected
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={addLoading}
                                className="px-5 py-2 text-sm rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-md disabled:opacity-60"
                            >
                                {addLoading ? "Adding..." : "Add Route"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
});

export default AddRouteModal