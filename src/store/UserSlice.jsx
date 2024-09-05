import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Login Thunks
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
                return rejectWithValue(error.response.data.message);
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

            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An unknown error occurred');
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
});

// Profile Change Thunk
export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (userCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/update/user/${userCredentials.id}`, userCredentials,
                {
                    headers: {
                      Authorization: `Bearer ${userCredentials.access_token}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.errors) {
                return rejectWithValue(error.response.data.errors);
            } else if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error);
            }
        }
    }
);



export const useInactivityLogout = (onLogout, timeout = 2500) => {
    const rememberMe = useSelector(state => state.auth?.user?.user_details?.remember_me);
    
    useEffect(() => {
      if(rememberMe ===1 ) return;
      let timer;
  
      const resetTimer = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          onLogout();
        }, timeout);
      };
  
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keypress', resetTimer);
  
      resetTimer(); // Initialize the timer
  
      return () => {
        if (timer) clearTimeout(timer);
        window.removeEventListener('mousemove', resetTimer);
        window.removeEventListener('keypress', resetTimer);
      };
    }, [onLogout, timeout, rememberMe]);
  };

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
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
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Assuming `user` is the current user
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user.user_details = action.payload.user_details;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
    reducers: {},
});

export default authSlice.reducer;