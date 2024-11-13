import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    action: null,
    redirectPath: '/'
};

const pendingActionsSlice = createSlice({
    name: 'pendingActions',
    initialState,
    reducers: {
        setPendingAction: (state, action) => {
            const { type, data } = action.payload;
            
            switch (type) {
                case 'FOLLOW_TEAM':
                    state.action = action.payload;
                    state.redirectPath = `/TeamDetails/${data.teamId}`;
                    break;
                case 'REGISTER_TEAM':
                    state.action = action.payload;
                    state.redirectPath = '/register-team';
                    break;
                default:
                    return initialState;
            }
        },
        clearPendingAction: () => initialState
    }
});

export const { setPendingAction, clearPendingAction } = pendingActionsSlice.actions;
export default pendingActionsSlice.reducer;