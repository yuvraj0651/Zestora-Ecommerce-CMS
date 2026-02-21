import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    headerConfigData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Header Config Data
export const fetchHeaderConfig = createAsyncThunk(
    "headerConfig/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/header");
            if (!response.ok) {
                throw new Error("something went wrong while fetching header config data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Header Config Data
export const AddingHeaderConfig = createAsyncThunk(
    "config/addingHeaderConfig",
    async (newHeaderConfig, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/header", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newHeaderConfig),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new header config item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Header Config
export const DeleteHeaderConfig = createAsyncThunk(
    "config/deletingHeaderConfig",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/header/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting header config item");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Header Config
export const UpdateHeaderConfig = createAsyncThunk(
    "config/updateHeaderConfig",
    async ({ id, updateItem }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/header/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating header config item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const HeaderConfigSlice = createSlice({
    name: "headerConfig",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeaderConfig.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHeaderConfig.fulfilled, (state, action) => {
                state.isLoading = false;
                state.headerConfigData = action.payload;
                state.error = null;
            })
            .addCase(fetchHeaderConfig.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddingHeaderConfig.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingHeaderConfig.fulfilled, (state, action) => {
                state.addLoading = false;
                state.headerConfigData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingHeaderConfig.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeleteHeaderConfig.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteHeaderConfig.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.headerConfigData = state.headerConfigData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(DeleteHeaderConfig.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdateHeaderConfig.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateHeaderConfig.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.headerConfigData = state.headerConfigData.map((item) => item.id === action.payload.id ? action.payload : item)
                state.error = null;
            })
            .addCase(UpdateHeaderConfig.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default HeaderConfigSlice.reducer;