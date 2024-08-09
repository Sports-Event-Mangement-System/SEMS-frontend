import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/login`, userCredentials);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.errors) {
                return rejectWithValue(error.response.data.errors);
            } else if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error);
            }
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('access_token') ?? '';

            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('role', response.data.role);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    console.log('clicked');
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = {};
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = {};
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.currentUser = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.loading = false;
                state.currentUser = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            });
    },
});

export default authSlice.reducer;
