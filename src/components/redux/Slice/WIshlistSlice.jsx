import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    wishlistItems: [],
};

const WishlistSlice = createSlice({
    name: "wishlistLocal",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const existingItem = state.wishlistItems.find((item) => item.id === action.payload.id);

            if (!existingItem) {
                state.wishlistItems.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload.id);
        }
    },
});

export const {
    addToWishlist,
    removeFromWishlist
} = WishlistSlice.actions;

export default WishlistSlice.reducer;