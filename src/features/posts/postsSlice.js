import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (apiAddress) => {
    const response = await fetch(apiAddress);
    if (!response.ok) throw new Error("Request Unsuccessful!");
    const data = await response.json();
    return data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    redditPosts: {},
    areLoading: false,
    haveError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.areLoading = true;
        state.haveError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.redditPosts = action.payload.data;
        state.areLoading = false;
        state.haveError = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.areLoading = false;
        state.haveError = true;
      });
  },
});

// Selectors
export const selectRedditPosts = (state) => state.posts.redditPosts;
export const selectPostsAreLoading = (state) => state.posts.areLoading;
export const selectPostsHaveError = (state) => state.posts.haveError;

export default postsSlice.reducer;
