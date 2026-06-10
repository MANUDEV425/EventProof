import { useState, useEffect } from "react";
import axios from "axios";
import { signInGoogle } from "./Firebase/auth";

function App() {
  const [user, setUser] = useState(null);

 const [selectedEvent, setSelectedEvent] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [selectedEventTitle, setSelectedEventTitle] = useState("");
  const [openedQuiz, setOpenedQuiz] = useState(null);
  const [result, setResult] =
  useState(null);
  const [review, setReview] = useState({});

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
  });

  const [events, setEvents] = useState([]);
  const [badges, setBadges] =
  useState([]);
  const [showBadges, setShowBadges] =
  useState(false);

  const handleLogin = async () => {
    const loggedInUser = await signInGoogle();

    if (loggedInUser) {
      setUser(loggedInUser);
    }
  };

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/events"
      );

      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchEvents();
}, []);

useEffect(() => {

  if (user) {
    fetchBadges();
  }

}, [user]);

  const handleCreateEvent = async () => {
    try {
      await axios.post(
        "http://localhost:5000/events",
        {
          ...event,
          organizerEmail: user.email,
        }
      );

      alert("✅ Event Saved!");

      setEvent({
        title: "",
        description: "",
        date: "",
        category: "",
      });

      fetchEvents();

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("❌ Error Saving Event");
      }
    }
  };

  const handleRegister = async (eventId, eventTitle) => {
  try {
    await axios.post(
      "http://localhost:5000/register",
      {
        userEmail: user.email,
        eventId,
      }
    );

    alert("✅ Registered Successfully");

    const response = await axios.get(
      `http://localhost:5000/events/${eventId}/quizzes`
    );

    setSelectedEvent(eventId);
    setSelectedEventTitle(eventTitle);
    setQuizzes(response.data);

  } catch (error) {

    if (
      error.response &&
      error.response.data.message
    ) {
      alert(error.response.data.message);
    }

    console.log(error);
  }
};
const handleQuizToggle = async (
  eventId,
  eventTitle
) => {
  if (openedQuiz === eventId) {
    setOpenedQuiz(null);
    setResult(null);
    setAnswers({});
    return;
  }

  try {
    const response = await axios.get(
      `http://localhost:5000/events/${eventId}/quizzes`
    );

    setSelectedEventTitle(eventTitle);
    setQuizzes(response.data);
    setOpenedQuiz(eventId);

    setResult(null);
    setAnswers({});

  } catch (error) {
    console.log(error);
  }
};

  const handleAnswerChange = (
    questionId,
    value
  ) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };
  const handleSubmitQuiz =
  async () => {

    try {

      const response =
        await axios.post(
          "http://localhost:5000/results",
          {
            userEmail:
              user.email,

            eventId:
              selectedEvent,

            answers,
          }
        );

      setResult(response.data);

      fetchBadges();

      const reviewMap = {};

      response.data.review.forEach(
        (item) => {
          reviewMap[item.questionId] =
            item.isCorrect;
        }
      );

      setReview(reviewMap);

      alert("🎉 Quiz Submitted!");

    } catch (error) {

      if (
        error.response &&
        error.response.data.message
      ) {
        alert(
          error.response.data.message
        );
      }

      console.log(error);
    }
};
const fetchBadges = async () => {

  if (!user) return;

  try {

    const response =
      await axios.get(
        `http://localhost:5000/badges/${user.email}`
      );

    setBadges(response.data);

  } catch (error) {

    console.log(error);
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 EventProof </h1>

      {!user ? (
        <button onClick={handleLogin}>
          Login with Google
        </button>
      ) : (
        <>
          <img
            src={user.photoURL}
            alt="profile"
            width="80"
            style={{ borderRadius: "50%" }}
          />

          <h2>{user.displayName}</h2>

          <p>{user.email}</p>

          <button
  onClick={() => {
    setShowBadges(!showBadges);

    if (!showBadges) {
      fetchBadges();
    }
  }}
>
  {showBadges
    ? "❌ Hide Badges"
    : "🏅 My Badges"}
</button>
          <hr />



{showBadges && (
  <>
    <hr />

    <h2>🏅 My Badges</h2>

    {badges.length === 0 ? (

      <p>
        No badges earned yet.
      </p>

    ) : (

      badges.map((badge) => (

        <div
          key={badge._id}
          style={{
            border: "1px solid white",
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>
            {badge.badge}
          </h3>

          <p>
            {badge.eventTitle}
          </p>
        </div>

      ))
    )}
  </>
)}

          <hr />

          <h2>Create Event</h2>

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
            placeholder="Event Description"
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

          <button onClick={handleCreateEvent}>
            Create Event
          </button>

          <hr />

          <h2>All Events</h2>

          {events.map((item) => (
  <div
    key={item._id}
    style={{
      border: "1px solid white",
      padding: "10px",
      margin: "10px",
      borderRadius: "10px",
    }}
  >
    <h3>{item.title}</h3>

    <p>{item.description}</p>

    <p>
      <strong>Date:</strong> {item.date}
    </p>

    <p>
      <strong>Category:</strong> {item.category}
    </p>

    {selectedEvent === item._id ? (
  <>
    <button disabled>
      ✅ Registered
    </button>

    {" "}

    <button
      onClick={() =>
        handleQuizToggle(
          item._id,
          item.title
        )
      }
    >
      {openedQuiz === item._id
        ? "❌ Close Quiz"
        : "📝 Open Quiz"}
    </button>
  </>
) : (
  <button
    onClick={() =>
      handleRegister(
        item._id,
        item.title
      )
    }
  >
    Register
  </button>
)}

    {openedQuiz === item._id &&
      quizzes.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        >
          <h3>
  📝 {selectedEventTitle} Quiz
</h3>

          {quizzes.map((quiz, index) => (
            <div
              key={quiz._id}
              style={{
                marginBottom: "15px",
              }}
            >
              <p>
  <strong>
    Q{index + 1}:
  </strong>{" "}
  {quiz.question}

  {" "}

  {review[quiz._id] === true && "✅"}

  {review[quiz._id] === false && "❌"}
</p>

              <input
                type="text"
                placeholder="Your answer"
                value={
                  answers[quiz._id] || ""
                }
                onChange={(e) =>
                  handleAnswerChange(
                    quiz._id,
                    e.target.value
                  )
                }
              />
            </div>
          ))}

        <button
  onClick={handleSubmitQuiz}
  disabled={result !== null}
>
  {result
    ? "✅ Quiz Submitted"
    : "Submit Quiz"}
</button>
{result && (
  <div
    style={{
      marginTop: "20px",
    }}
  >
    <h3>
      🎯 Score:
      {" "}
      {result.score}
      {" / "}
      {result.total}
    </h3>
    <h2>
  {result.badge}
  {" "}
  Badge Earned!
</h2>
  </div>
)}
        </div>
      )}
  </div>
))}
          
        </>
      )}
    </div>
  );
}

export default App;