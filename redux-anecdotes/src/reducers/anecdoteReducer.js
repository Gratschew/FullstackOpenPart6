import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch anecdotes from backend
export const fetchAnecdotes = createAsyncThunk(
  "anecdotes/fetchAll",
  async () => {
    const response = await fetch("http://localhost:3001/anecdotes");
    return await response.json();
  }
);

// Create a new anecdote
export const createNewAnecdote = createAsyncThunk(
  "anecdotes/create",
  async (content) => {
    const newAnecdote = { content, votes: 0 };
    const response = await fetch("http://localhost:3001/anecdotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnecdote),
    });
    return await response.json();
  }
);

// Vote for an anecdote
export const voteForAnecdote = createAsyncThunk(
  "anecdotes/vote",
  async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await fetch(
      `http://localhost:3001/anecdotes/${anecdote.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAnecdote),
      }
    );
    return await response.json();
  }
);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch anecdotes
      .addCase(fetchAnecdotes.fulfilled, (state, action) => {
        return action.payload.sort((a, b) => b.votes - a.votes);
      })
      // Create new anecdote
      .addCase(createNewAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
        state.sort((a, b) => b.votes - a.votes);
      })
      // Vote for anecdote
      .addCase(voteForAnecdote.fulfilled, (state, action) => {
        const updatedAnecdote = action.payload;
        const index = state.findIndex((a) => a.id === updatedAnecdote.id);
        if (index !== -1) {
          state[index] = updatedAnecdote;
          state.sort((a, b) => b.votes - a.votes);
        }
      });
  },
});

export default anecdoteSlice.reducer;
