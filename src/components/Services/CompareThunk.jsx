import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    compareData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Compare Data
export const fetchCompare = createAsyncThunk(
    "compare/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/compare");
            if (!response.ok) {
                throw new Error("something went wrong while fetching compare data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Compare Data
export const AddingCompare = createAsyncThunk(
    "compare/addingCompare",
    async (newCompareItem, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/compare", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCompareItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new compare item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Compare Data
export const DeleteCompare = createAsyncThunk(
    "compare/deletingCompare",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/compare/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting compare item");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Compare Data
export const UpdateCompare = createAsyncThunk(
    "compare/updateCompare",
    async ({ id, updateItem }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/compare/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating compare item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const CompareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompare.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCompare.fulfilled, (state, action) => {
                state.isLoading = false;
                state.compareData = action.payload;
                state.error = null;
            })
            .addCase(fetchCompare.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddingCompare.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingCompare.fulfilled, (state, action) => {
                state.addLoading = false;
                state.compareData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingCompare.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeleteCompare.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteCompare.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.compareData = state.compareData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(DeleteCompare.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdateCompare.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateCompare.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.compareData = state.compareData.map((item) => item.id === action.payload.id ? action.payload : item)
                state.error = null;
            })
            .addCase(UpdateCompare.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default CompareSlice.reducer;