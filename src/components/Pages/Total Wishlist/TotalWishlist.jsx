import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteWishlist, fetchWishlist } from "../../Services/WishlistThunk";
import toast from "react-hot-toast";
import LazyImage from "../../UI/LazyImage/LazyImage";
import useDebounce from "../../Hooks/useDebounce";

const TotalWishlist = () => {

    const itemPerLoad = 6;
    const [searchTerm, setSearchTerm] = useState("");
    const [isVisibleCount, setIsVisibleCount] = useState(itemPerLoad);
    const debouncedSearch = useDebounce(searchTerm, 500);

    const dispatch = useDispatch();
    const wishlistRef = useRef();

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    const { wishlistData = [] } = useSelector((state) => state.wishlist) || {};
    // console.log(wishlistData);

    const filteredWishlist = useMemo(() => {
        if (!debouncedSearch.trim()) return wishlistData;

        return wishlistData.filter((item) => {
            return item.strMeal?.toLowerCase().includes(debouncedSearch.toLowerCase());
        });
    }, [debouncedSearch, wishlistData]);

    const visibleWishlistData = filteredWishlist.slice(0, isVisibleCount);

    useEffect(() => {
        if (!wishlistRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                console.log("Triggered 👀");
                setIsVisibleCount((prev) => {
                    if (prev >= filteredWishlist.length) return prev;
                    console.log("Previous:", prev);
                    return prev + itemPerLoad;
                })
            }
        }, {
            threshold: 0.1,
            root: null,
        });

        if (wishlistRef.current) observer.observe(wishlistRef.current);

        return () => observer.disconnect();
    }, [filteredWishlist.length, visibleWishlistData.length]);

    const deleteWishlistItem = useCallback((id) => {
        dispatch(DeleteWishlist(id))
            .unwrap()
            .then(() => {
                toast.success("Wishlist Item Deleted From CMS");
            }).catch((error) => {
                toast.error(error.message || "Something went wrong");
            })
    }, [dispatch]);

    useEffect(() => {
        setIsVisibleCount(itemPerLoad);
    }, [debouncedSearch, wishlistData]);

    // console.log("Wishlist Items:", wishlistData.length);

    return (
        <div className="w-full space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-50">
                        Wishlist Management
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-50">
                        Manage all products added to user wishlists.
                    </p>
                </div>

                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg dark:bg-red-600 dark:hover:bg-red-700 hover:bg-orange-700 text-sm">
                    Export Wishlist
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Total Wishlist Items</p>
                    <h3 className="text-2xl font-semibold mt-1 dark:text-slate-50">{wishlistData.length}</h3>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Active Users</p>
                    <h3 className="text-2xl font-semibold mt-1 text-green-600 dark:text-slate-50">2</h3>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                    <p className="text-sm text-gray-500 dark:text-slate-50">Out of Stock Items</p>
                    <h3 className="text-2xl font-semibold mt-1 text-red-500 dark:text-slate-50">0</h3>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border dark:bg-slate-600 dark:border-slate-500">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Product or User..."
                    className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 dark:bg-slate-500 dark:border-slate-600 focus:ring-orange-500"
                />
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    visibleWishlistData?.length === 0 ? (
                        <div className="col-span-full py-10">
                            <p className="text-center capitalize tracking-wide font-[500] text-[0.9rem]">no wishlist data to show</p>
                        </div>
                    ) : (
                        visibleWishlistData?.map((item, index) => {
                            const isLast = index === visibleWishlistData.length - 1;
                            return (
                                <div
                                    key={`${item.id}-${index}`}
                                    ref={isLast ? wishlistRef : null}
                                    className="bg-white rounded-xl shadow-sm border p-4 flex flex-col dark:bg-slate-600 dark:border-slate-500 dark:text-slate-50">
                                    <LazyImage
                                        src={item.strMealThumb}
                                        alt={item.strMeal}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />

                                    <h4 className="mt-3 font-semibold text-gray-800 dark:text-slate-50">
                                        {item.strMeal}
                                    </h4>

                                    <p className="text-sm text-gray-500 dark:text-slate-50">
                                        Added by: John Doe
                                    </p>

                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-green-600 font-medium dark:text-slate-50">
                                            ${item.strMealPrice}
                                        </span>
                                        <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                                            In Stock
                                        </span>
                                    </div>

                                    <div className="flex gap-3 mt-4 text-sm">
                                        <button className="flex-1 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                                            Move to Cart
                                        </button>
                                        <button
                                            onClick={() => deleteWishlistItem(item.id)}
                                            className="px-3 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-red-600">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    )}
            </div>
            {
                isVisibleCount < filteredWishlist.length && (
                    <div className="flex justify-center py-6">
                        <div className="animate-spin h-6 w-6 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                    </div>
                )
            }
        </div>
    );
};

export default TotalWishlist;
