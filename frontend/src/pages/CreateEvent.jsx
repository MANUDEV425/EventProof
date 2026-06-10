



import { useState } from "react";
import axios from "axios";

function CreateEvent({ user }) {
  const [event, setEvent] =
    useState({
      title: "",
      description: "",
      date: "",
      category: "",
    });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleCreateEvent =
    async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/events`,
          {
            ...event,
            organizerEmail:
              user.email,
          }
        );

        alert(
          "✅ Event Created!"
        );

        setEvent({
          title: "",
          description: "",
          date: "",
          category: "",
        });

      } catch (error) {
        console.log(error);

        alert(
          "❌ Failed to create event"
        );
      }
    };

  return (
    <div className="page-container">
  <div className="form-card">
      <h1>➕ Create Event</h1>

      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={event.title}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="description"
        placeholder="Description"
        value={event.description}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={event.category}
        onChange={handleChange}
      />

      <br /><br />

      <button
        onClick={
          handleCreateEvent
        }
      >
        Create Event
      </button>
    </div>
    </div>
  );
}

export default CreateEvent;