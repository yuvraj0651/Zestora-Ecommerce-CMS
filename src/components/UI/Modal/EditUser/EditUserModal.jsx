import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateUsers } from "../../../Services/UsersThunk";
import toast from "react-hot-toast";

const EditUserModal = React.memo(({ onClose, editData }) => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        role: "Admin",
        status: "Active",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (editData) {
            setFormData({
                fullName: editData.fullName || "",
                email: editData.email || "",
                role: editData.role || "Admin",
                status: editData.status || "Active",
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const updateUserHandler = (e) => {
        e.preventDefault();

        dispatch(UpdateUsers({
            id: editData.id,
            updatedUser: formData,
        }))
            .unwrap()
            .then(() => {
                toast.success("User Updated Successfully");

                setFormData({
                    fullName: "",
                    email: "",
                    role: "Admin",
                    status: "Active",
                });
                onClose();
            }).catch((error) => {
                toast.error(error.message || "Something went wrong");
            })
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                {/* Modal Box */}
                <div className="bg-white rounded-xl w-full max-w-md mx-4 md:mx-0 p-6 shadow-lg relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        ✕
                    </button>

                    {/* Modal Header */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Edit User
                    </h2>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={updateUserHandler}>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black">
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black">
                                <option value="Active">Active</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
});

export default EditUserModal;
