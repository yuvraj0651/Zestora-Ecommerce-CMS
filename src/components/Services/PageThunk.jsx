import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    pageData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Page Data
export const fetchAllPages = createAsyncThunk(
    "pages/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/pages");
            if (!response.ok) {
                throw new Error("something went wrong while fetching all pages");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add New Page
export const AddingPage = createAsyncThunk(
    "pages/addingPage",
    async (newPage, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/pages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPage),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new page");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Page
export const DeletePage = createAsyncThunk(
    "pages/deletingPage",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/pages/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting page");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Page
export const UpdatePage = createAsyncThunk(
    "pages/updatePage",
    async ({ id, updateItem }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/pages/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateItem),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating page");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const PageSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllPages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pageData = action.payload;
                state.error = null;
            })
            .addCase(fetchAllPages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddingPage.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingPage.fulfilled, (state, action) => {
                state.addLoading = false;
                state.pageData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingPage.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeletePage.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeletePage.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.pageData = state.pageData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(DeletePage.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdatePage.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdatePage.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.pageData = state.pageData.map((item) => item.id === action.payload.id ? action.payload : item)
                state.error = null;
            })
            .addCase(UpdatePage.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default PageSlice.reducer;