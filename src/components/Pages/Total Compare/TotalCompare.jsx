import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompare } from "../../Services/CompareThunk";

const TotalCompare = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCompare());
    }, [dispatch]);

    const { compareData = [] } = useSelector((state) => state.compare) || {};
    console.log(compareData);

    return (
        <div className="w-full space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-50">
                        Product Compare Management
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-50">
                        Monitor products users are comparing.
                    </p>
                </div>

                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                    Clear All Comparisons
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Total Compare Items</p>
                    <h3 className="text-2xl font-semibold mt-1 dark:text-slate-50">{compareData.length}</h3>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Active Compare Sessions</p>
                    <h3 className="text-2xl font-semibold mt-1 text-blue-600 dark:text-slate-50">{compareData.length}</h3>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Top Compared Product</p>
                    <h3 className="text-lg font-semibold mt-1 dark:text-slate-50">
                        Samsung Galaxy S24
                    </h3>
                </div>
            </div>

            {/* Compare Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
                <table className="min-w-[700px] w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 text-left">Feature</th>
                            <th className="px-6 py-4 text-left">iPhone 15 Pro</th>
                            <th className="px-6 py-4 text-left">Samsung Galaxy S24</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            compareData?.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t">
                                    <td className="px-6 py-4 font-medium">Price</td>
                                    <td className="px-6 py-4">${item.strMealPrice}</td>
                                    <td className="px-6 py-4">${((Math.random() * (2000 -1000 + 1)) + 1000).toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TotalCompare;
