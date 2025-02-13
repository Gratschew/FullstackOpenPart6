import axios from "axios";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useNotification } from "./components/NotificationContext";
const fetchAnecdotes = async () => {
  const { data } = await axios.get("http://localhost:3001/anecdotes");
  return data;
};

const App = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const updateVotes = async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const { data } = await axios.put(
      `http://localhost:3001/anecdotes/${anecdote.id}`,
      updatedAnecdote
    );
    return data;
  };

  const voteMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["anecdotes"]);
      showNotification(`You voted for: ${variables.content}`);
    },
  });

  const {
    data: anecdotes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: fetchAnecdotes,
  });

  if (isLoading) {
    return <div>Loading anecdotes...</div>;
  }

  if (error) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
