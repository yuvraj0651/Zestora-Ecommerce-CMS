import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    wishlistData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Wishlist Data
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/wishlist");
            if (!response.ok) {
                throw new Error("something went wrong while fetching wishlist data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Wishlist Data
export const AddingWishlist = createAsyncThunk(
    "wishlist/addingWishlist",
    async (newWishlistItem, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newWishlistItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new wishlist item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Wishlist Data
export const DeleteWishlist = createAsyncThunk(
    "wishlist/deletingWishlist",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/wishlist/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting wishlist item");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Wishlist Data
export const UpdateWishlist = createAsyncThunk(
    "wishlist/updateWishlist",
    async ({ id, updateItem }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/wishlist/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating wishlist item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistData = action.payload;
                state.error = null;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddingWishlist.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingWishlist.fulfilled, (state, action) => {
                state.addLoading = false;
                state.error = null;

                const existingItem = state.wishlistData.find((item) => item.id === action.payload.id);
                if (!existingItem) {
                    state.wishlistData.push(action.payload);
                }
            })
            .addCase(AddingWishlist.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeleteWishlist.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteWishlist.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.wishlistData = state.wishlistData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(DeleteWishlist.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdateWishlist.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateWishlist.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.wishlistData = state.wishlistData.map((item) => item.id === action.payload.id ? action.payload : item)
                state.error = null;
            })
            .addCase(UpdateWishlist.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default WishlistSlice.reducer;   