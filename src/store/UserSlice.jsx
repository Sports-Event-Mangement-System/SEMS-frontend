import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'user/login',
    async (userCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/login`, userCredentials);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('role', response.data.role);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.errors);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
                .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                    state.user = null;
                    console.log(action.error);
                    if (action.payload) {
                        state.error = action.payload;
                    } else if (action.error.message === 'Network Error') {
                        state.error = 'Network error occurred. Please try again later.';
                    } else {
                        state.error = action.error.message;
                    }

                })
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer; 
