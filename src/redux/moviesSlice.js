import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(process.env.REACT_APP_API_URL);
  console.log(response.data);
  return response.data;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    entities: [],
    favorites: [],
    status: "idle",
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.entities.findIndex(
        (movie) => movie.id === action.payload
      );
      if (index !== -1) {
        state.entities[index].favorite = !state.entities[index].favorite;
        if (state.entities[index].favorite) {
          if (!state.favorites.some((m) => m.id === action.payload)) {
            state.favorites.push(state.entities[index]);
          }
        } else {
          state.favorites = state.favorites.filter(
            (m) => m.id !== action.payload
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.entities = action.payload.sort((a, b) => b.rating - a.rating);
        state.status = "succeeded";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;