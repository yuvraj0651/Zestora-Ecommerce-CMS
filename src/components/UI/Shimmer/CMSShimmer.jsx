import React from "react";

/* Reusable Shimmer Block */
const ShimmerBlock = ({ className }) => (
    <div
        className={`relative overflow-hidden bg-gray-200 dark:bg-slate-700 rounded-xl ${className}`}
    >
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-slate-500/30 to-transparent"></div>
    </div>
);

const CMSShimmer = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <ShimmerBlock className="h-8 w-52" />
                <ShimmerBlock className="h-10 w-32" />
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ShimmerBlock className="h-28 w-full" />
                <ShimmerBlock className="h-28 w-full" />
                <ShimmerBlock className="h-28 w-full" />
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow space-y-4">
                <ShimmerBlock className="h-6 w-40" />

                <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <ShimmerBlock className="h-5 w-1/3" />
                            <ShimmerBlock className="h-5 w-24" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow space-y-4">
                <ShimmerBlock className="h-6 w-48" />

                <div className="grid md:grid-cols-2 gap-6">
                    <ShimmerBlock className="h-10 w-full" />
                    <ShimmerBlock className="h-10 w-full" />
                    <ShimmerBlock className="h-10 w-full" />
                    <ShimmerBlock className="h-10 w-full" />
                </div>

                <ShimmerBlock className="h-24 w-full" />
            </div>
        </div>
    );
};

export default CMSShimmer;
