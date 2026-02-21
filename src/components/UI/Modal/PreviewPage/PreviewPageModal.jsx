import React from "react";

const PreviewPageModal = React.memo(({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">

                <h2 className="text-xl font-semibold mb-4">Page Preview</h2>

                <div className="border p-4 rounded-lg bg-gray-50">
                    <h1 className="text-2xl font-bold mb-3">About Us</h1>
                    <p>
                        This is dummy preview content. Later tu isko main website ke design
                        jaisa render karega.
                    </p>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
});

export default PreviewPageModal;
