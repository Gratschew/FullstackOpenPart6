import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAnecdotes } from "./reducers/anecdoteReducer";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAnecdotes = async () => {
      try {
        const response = await fetch("http://localhost:3001/anecdotes");
        const anecdotes = await response.json();
        dispatch(fetchAnecdotes());
      } catch (error) {
        dispatch(setNotification("Failed to load anecdotes", 10));
      }
    };

    getAnecdotes();
  }, [dispatch]);
  return (
    <div>
      <Notification></Notification>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
