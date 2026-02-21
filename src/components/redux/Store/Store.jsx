import { configureStore } from "@reduxjs/toolkit";
import AuthThunk from "../../Services/AuthThunk";
import UsersThunk from "../../Services/UsersThunk";
import FoodThunk from "../../Services/FoodThunk";
import CartThunk from "../../Services/CartThunk";
import WishlistThunk from "../../Services/WishlistThunk";
import CompareThunk from "../../Services/CompareThunk";
import RoutesThunk from "../../Services/RouteThunk";
import PagesThunk from "../../Services/PageThunk";
import HeaderConfigThunk from "../../Services/ConfigThunk";
import { UsersApi } from "../../Services/Query/UsersQuery";
import WishlistSlice from "../Slice/WIshlistSlice";

const Store = configureStore({
    reducer: {
        auth: AuthThunk,
        users: UsersThunk,
        food: FoodThunk,
        cart: CartThunk,
        wishlist: WishlistThunk,
        compare: CompareThunk,
        route: RoutesThunk,
        page: PagesThunk,
        headerConfig: HeaderConfigThunk,

        // Slice
        wishlistLocal: WishlistSlice,

        [UsersApi.reducerPath]: UsersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(UsersApi.middleware)
    }
});

export default Store;