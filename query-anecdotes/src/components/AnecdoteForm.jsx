import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNotification } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const createAnecdote = async (content) => {
    const { data } = await axios.post("http://localhost:3001/anecdotes", {
      content,
      votes: 0,
    });
    return data;
  };

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(["anecdotes"]);
      showNotification(`You created: ${newAnecdote.content}`);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length < 5) {
      showNotification("too short anecdote, must have length 5 or more");
      return;
    }

    event.target.anecdote.value = "";

    mutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "creating..." : "create"}
        </button>
      </form>
      {mutation.isError && <p>Error creating anecdote</p>}
    </div>
  );
};

export default AnecdoteForm;
