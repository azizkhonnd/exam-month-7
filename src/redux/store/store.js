import { configureStore } from '@reduxjs/toolkit';
import likedSongsReducer from '../slices/SlicesSpotifyApp'; 

const store = configureStore({
  reducer: {
    likedSongs: likedSongsReducer,
  },
});

export default store;
