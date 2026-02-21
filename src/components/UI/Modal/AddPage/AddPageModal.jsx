import React from "react";
import { createPortal } from "react-dom";

const AddPageModal = React.memo(({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">

                <h2 className="text-xl font-semibold mb-4">Add New Page</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Page Title"
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        placeholder="Slug (example: about-us)"
                        className="w-full border p-3 rounded-lg"
                    />

                    <textarea
                        rows="6"
                        placeholder="Page Content..."
                        className="w-full border p-3 rounded-lg"
                    ></textarea>

                    <select className="w-full border p-3 rounded-lg">
                        <option>Draft</option>
                        <option>Published</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-6 flex-wrap">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        Save Page
                    </button>
                </div>
            </div>
        </div>
    )
});

export default AddPageModal;
