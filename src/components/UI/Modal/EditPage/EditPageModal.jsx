import React, { useState } from "react";

const EditPageModal = React.memo(({ onClose, editData }) => {

    const [formData, setFormData] = useState({
        pageTitle: editData.title || "",
        pageSlug: editData.slug || "",
        pageContent: editData.pageContent || "",
        pageStatus: editData.status || "draft",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.pageTitle.trim()) {
            newErrors.pageTitle = "Page title field is empty";
        }

        if (!formData.pageSlug.trim()) {
            newErrors.pageSlug = "Page Slug field is empty";
        }

        if (!formData.pageContent.trim()) {
            newErrors.pageContent = "Page Content is empty";
        }

        if (!formData.pageStatus.trim()) {
            newErrors.pageStatus = "Please select page status first";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const editValidateErr = validateForm();
        setErrors(editValidateErr);

        if (Object.keys(editValidateErr).length === 0) {
            alert("Page Data Updated Successfully");
        };

        setFormData({
            pageTitle: "",
            pageSlug: "",
            pageContent: "",
            pageStatus: "draft",
        });
        setErrors({});
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">

                <h2 className="text-xl font-semibold mb-4">Edit Page</h2>

                <form id="editForm" onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="pageTitle"
                        value={formData.pageTitle}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />
                    {
                        errors.pageTitle && (
                            <p className="pl-2 tracking-wide font-[500] text-[0.9rem] text-red-700">*{errors.pageTitle}</p>
                        )
                    }

                    <input
                        type="text"
                        name="pageSlug"
                        value={formData.pageSlug}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />
                    {
                        errors.pageSlug && (
                            <p className="pl-2 tracking-wide font-[500] text-[0.9rem] text-red-700">*{errors.pageSlug}</p>
                        )
                    }

                    <textarea
                        rows="6"
                        name="pageContent"
                        value={formData.pageContent}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />
                    {
                        errors.pageContent && (
                            <p className="pl-2 tracking-wide font-[500] text-[0.9rem] text-red-700">*{errors.pageContent}</p>
                        )
                    }

                    <select
                        name="pageStatus"
                        value={formData.pageStatus}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    {
                        errors.pageStatus && (
                            <p className="pl-2 tracking-wide font-[500] text-[0.9rem] text-red-700">*{errors.pageStatus}</p>
                        )
                    }
                </form>

                <div className="flex justify-end gap-3 mt-6 flex-wrap">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        form="editForm"
                        type="submit"
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg">
                        Update Page
                    </button>
                </div>
            </div>
        </div>
    )
});

export default EditPageModal;
