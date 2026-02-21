import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    routesData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Routes Data
export const fetchAllRoutes = createAsyncThunk(
    "routes/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5002/routes");
            if (!response.ok) {
                throw new Error("something went wrong while fetching all routes");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Routes Data
export const AddingRoute = createAsyncThunk(
    "route/addingRoute",
    async (newRoute, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5002/routes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRoute),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new route");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Route Data
export const DeleteRoute = createAsyncThunk(
    "route/deletingRoute",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5002/routes/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting route");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Route Data
export const UpdateRoute = createAsyncThunk(
    "route/updateRoute",
    async ({ id, updateItem }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5002/routes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating route");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const RouteSlice = createSlice({
    name: "route",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRoutes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllRoutes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.routesData = action.payload;
                state.error = null;
            })
            .addCase(fetchAllRoutes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddingRoute.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingRoute.fulfilled, (state, action) => {
                state.addLoading = false;
                state.routesData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingRoute.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeleteRoute.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteRoute.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.routesData = state.routesData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(DeleteRoute.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdateRoute.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateRoute.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.routesData = state.routesData.map((item) => item.id === action.payload.id ? action.payload : item)
                state.error = null;
            })
            .addCase(UpdateRoute.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default RouteSlice.reducer;