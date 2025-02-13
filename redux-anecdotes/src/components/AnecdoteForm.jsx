import { useDispatch } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    try {
      dispatch(createNewAnecdote(content));
      dispatch(setNotification(`you created '${content}'`, 10));
    } catch (error) {
      dispatch(setNotification("Failed to create anecdote", 10));
    }
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
