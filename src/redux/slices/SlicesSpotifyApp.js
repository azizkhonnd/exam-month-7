import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    likedSongs: JSON.parse(localStorage.getItem('likedSongs')) || [], 
};

const SlicesSpotifyApp = createSlice({
    name: 'spotifyApp',
    initialState,
    reducers: {
        likeSong: (state, action) => {
            state.likedSongs.push(action.payload);
            localStorage.setItem('likedSongs', JSON.stringify(state.likedSongs));
        },
        unlikeSong: (state, action) => {
            state.likedSongs = state.likedSongs.filter(song => song.id !== action.payload.id);
            localStorage.setItem('likedSongs', JSON.stringify(state.likedSongs));
        },
    },
});

export const { likeSong, unlikeSong } = SlicesSpotifyApp.actions;
export default SlicesSpotifyApp.reducer;
