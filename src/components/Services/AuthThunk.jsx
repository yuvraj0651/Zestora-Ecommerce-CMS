import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

export const initialState = {
    authData: storedAuth?.user || [],
    isAuthenticated: storedAuth?.isAuthenticated || false,
    token: storedAuth?.token || null,
    loginLoading: false,
    registerLoading: false,
    error: null,
};

// Fetch Auth Data
export const fetchAuthData = createAsyncThunk(
    "auth/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5001/auth");
            if (!response.ok) {
                throw new Error("something went wrong while fetching auth data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Login User
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password, role }, { rejectWithValue }) => {
        try {
            const userResponse = await fetch("http://localhost:5001/auth");
            if (!userResponse.ok) {
                throw new Error("something went wrong while logging in user");
            };
            const users = await userResponse.json();

            const existingUser = users.find((user) => user.email === email && user.password === password && user.role === role);

            if (!existingUser) {
                return rejectWithValue("Invalid Credentials");
            };

            return existingUser;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Register User
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUser, { rejectWithValue }) => {
        const UserWithData = {
            ...newUser,
            status: "Active",
            joined: new Date().toISOString(),
        };
        try {
            const userResponse = await fetch("http://localhost:5001/auth");
            if (!userResponse.ok) {
                throw new Error("something went wrong while logging in user");
            };
            const users = await userResponse.json();

            const existingUser = users.find((user) => user.email === newUser.email);

            if (existingUser) {
                return rejectWithValue("User Already Exists");
            };

            const response = await fetch("http://localhost:5001/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(UserWithData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while register new user");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authData = [];
            state.isAuthenticated = false;
            state.loginLoading = false;
            state.registerLoading = false;
            state.error = null;
            state.token = null;

            localStorage.removeItem("auth");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loginLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const fakeToken = Math.random().toString(36).slice(2);

                state.loginLoading = false;
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.authData = action.payload;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: action.payload,
                    token: fakeToken,
                    isAuthenticated: true,
                }));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.registerLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const fakeToken = Math.random().toString(36).slice(2);

                state.registerLoading = false;
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.authData.push(action.payload);
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: action.payload,
                    token: fakeToken,
                    isAuthenticated: true,
                }));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;