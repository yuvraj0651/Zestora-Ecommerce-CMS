import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    usersData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Users Data
export const fetchAllUsers = createAsyncThunk(
    "users/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5001/auth");
            if (!response.ok) {
                throw new Error("something went wrong while fetching users data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Users Data
export const AddingUsers = createAsyncThunk(
    "users/addingUserData",
    async (newUser, { rejectWithValue }) => {
        const UserWithData = {
            ...newUser,
            status: "active",
            joined: new Date().toISOString(),
        };
        try {
            const response = await fetch("http://localhost:5001/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(UserWithData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new user data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Users Data
export const DeleteUser = createAsyncThunk(
    "users/deletingUserData",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5001/auth/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting user data");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Users Data
export const UpdateUsers = createAsyncThunk(
    "users/updateUserData",
    async ({ id, updatedUser }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5001/auth/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating user data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.usersData = action.payload;
                state.error = null;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddingUsers.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingUsers.fulfilled, (state, action) => {
                state.addLoading = false;
                state.usersData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingUsers.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeleteUser.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.usersData = state.usersData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(DeleteUser.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdateUsers.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateUsers.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.usersData = state.usersData.map((item) => item.id === action.payload.id ? action.payload : item)
                state.error = null;
            })
            .addCase(UpdateUsers.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default UsersSlice.reducer;