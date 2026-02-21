import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    cartData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Cart Data
export const fetchCart = createAsyncThunk(
    "cart/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/cart");
            if (!response.ok) {
                throw new Error("something went wrong while fetching cart data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Cart Data
export const AddingCart = createAsyncThunk(
    "cart/addingCart",
    async (newCartItem, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCartItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new cart item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Cart Data
export const DeleteCart = createAsyncThunk(
    "cart/deletingCart",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/cart/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting cart item");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Cart Data
export const UpdateCart = createAsyncThunk(
    "cart/updateCart",
    async ({ id, updateItem }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/cart/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating cart item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartData = action.payload;
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddingCart.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingCart.fulfilled, (state, action) => {
                state.addLoading = false;
                state.cartData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingCart.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeleteCart.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteCart.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.cartData = state.cartData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(DeleteCart.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdateCart.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateCart.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.cartData = state.cartData.map((item) => item.id === action.payload.id ? action.payload : item)
                state.error = null;
            })
            .addCase(UpdateCart.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default CartSlice.reducer;