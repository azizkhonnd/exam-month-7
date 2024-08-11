import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    likedSongs: JSON.parse(localStorage.getItem('likedSongs')) || [],
};

const SlicesSpotifyApp = createSlice({
    name: 'spotifyApp',
    initialState,
    reducers: {
        likeSong: (state, action) => {
            if (!state.likedSongs.find(song => song.id === action.payload.id)) {
                state.likedSongs.push(action.payload);
                localStorage.setItem('likedSongs', JSON.stringify(state.likedSongs));
            }
        },
        unlikeSong: (state, action) => {
            state.likedSongs = state.likedSongs.filter(song => song.id !== action.payload.id);
            localStorage.setItem('likedSongs', JSON.stringify(state.likedSongs));
        },
        setLikedSongs: (state, action) => {
            state.likedSongs = action.payload;
            localStorage.setItem('likedSongs', JSON.stringify(state.likedSongs));
        },
    },
});

export const { likeSong, unlikeSong, setLikedSongs } = SlicesSpotifyApp.actions;
export default SlicesSpotifyApp.reducer;
