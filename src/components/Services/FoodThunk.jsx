import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    foodData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Food Data
export const fetchAllItems = createAsyncThunk(
    "food/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/foodItems");
            if (!response.ok) {
                throw new Error("something went wrong while fetching food data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Food Data
export const AddingFood = createAsyncThunk(
    "food/addingFoodData",
    async (newFood, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/foodItems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newFood),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new food item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Food Data
export const DeleteFood = createAsyncThunk(
    "food/deletingFoodData",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/foodItems/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting food item");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Food Data
export const UpdateFood = createAsyncThunk(
    "food/updateFoodData",
    async ({ id, updateItem }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/foodItems/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating food item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const FoodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllItems.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.foodData = action.payload;
                state.error = null;
            })
            .addCase(fetchAllItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddingFood.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingFood.fulfilled, (state, action) => {
                state.addLoading = false;
                state.foodData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingFood.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeleteFood.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteFood.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.foodData = state.foodData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(DeleteFood.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdateFood.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateFood.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.foodData = state.foodData.map((item) => item.id === action.payload.id ? action.payload : item)
                state.error = null;
            })
            .addCase(UpdateFood.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default FoodSlice.reducer;