import { createSlice } from '@reduxjs/toolkit';

const initialLikedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];

const likedSongsSlice = createSlice({
    name: 'likedSongs',
    initialState: initialLikedSongs,
    reducers: {
        likeSong: (state, action) => {
            state.push(action.payload);
        },
        unlikeSong: (state, action) => {
            return state.filter(song => song.id !== action.payload.id);
        },
    },
});

export const { likeSong, unlikeSong } = likedSongsSlice.actions;
export default likedSongsSlice.reducer;
