

import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

function Events({ user }) {
  const [events, setEvents] =
    useState([]);

  const [selectedEvent,
    setSelectedEvent] =
    useState(null);

  const [quizzes,
    setQuizzes] =
    useState([]);

  const [answers,
    setAnswers] =
    useState({});

  const [openedQuiz,
    setOpenedQuiz] =
    useState(null);

  const [selectedEventTitle,
    setSelectedEventTitle] =
    useState("");

  const [result,
    setResult] =
    useState(null);

  const [review,
    setReview] =
    useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents =
    async () => {
      try {
        const response =
          await axios.get(
            "http://localhost:5000/events"
          );

        setEvents(
          response.data
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  const handleRegister =
    async (
      eventId,
      eventTitle
    ) => {

      try {

        await axios.post(
          "http://localhost:5000/register",
          {
            userEmail:
              user.email,

            eventId,
          }
        );

        alert(
          "✅ Registered Successfully"
        );

        const response =
          await axios.get(
            `http://localhost:5000/events/${eventId}/quizzes`
          );

        setSelectedEvent(
          eventId
        );

        setSelectedEventTitle(
          eventTitle
        );

        setQuizzes(
          response.data
        );

      } catch (error) {

        if (
          error.response &&
          error.response
            .data
            .message
        ) {

          alert(
            error.response
              .data
              .message
          );
        }

        console.log(
          error
        );
      }
    };

  const handleQuizToggle =
    async (
      eventId,
      eventTitle
    ) => {

      if (
        openedQuiz ===
        eventId
      ) {

        setOpenedQuiz(
          null
        );

        setResult(
          null
        );

        setAnswers(
          {}
        );

        return;
      }

      try {

        const response =
          await axios.get(
            `http://localhost:5000/events/${eventId}/quizzes`
          );

        setOpenedQuiz(
          eventId
        );

        setSelectedEvent(
          eventId
        );

        setSelectedEventTitle(
          eventTitle
        );

        setQuizzes(
          response.data
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  const handleAnswerChange =
    (
      questionId,
      value
    ) => {

      setAnswers({
        ...answers,

        [questionId]:
          value,
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

        setResult(
          response.data
        );

        const reviewMap =
          {};

        response.data.review.forEach(
          (
            item
          ) => {

            reviewMap[
              item
                .questionId
            ] =
              item.isCorrect;
          }
        );

        setReview(
          reviewMap
        );

        alert(
          "🎉 Quiz Submitted!"
        );

      } catch (error) {

        if (
          error.response &&
          error.response
            .data
            .message
        ) {

          alert(
            error.response
              .data
              .message
          );
        }

        console.log(
          error
        );
      }
    };

  return (
     <div className="page-container">
      <h1>
        📅 All Events
      </h1>

      {events.map(
        (item) => (

          <div
  key={item._id}
  className="card"
>
            <h2>
              {item.title}
            </h2>

            <p>
              {
                item.description
              }
            </p>

            <p>
              📅
              {" "}
              {
                item.date
              }
            </p>

            <p>
              🏷
              {" "}
              {
                item.category
              }
            </p>

            {selectedEvent ===
            item._id ? (
              <>
                <button
                  disabled
                >
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
                  {openedQuiz ===
                  item._id
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

            {openedQuiz ===
              item._id &&
              quizzes.length >
                0 && (

                <div
                  style={{
                    marginTop:
                      "20px",
                  }}
                >
                  <h3>
                    📝
                    {" "}
                    {
                      selectedEventTitle
                    }
                    {" "}
                    Quiz
                  </h3>

                  {quizzes.map(
                    (
                      quiz,

                      index
                    ) => (

                      <div
                        key={
                          quiz._id
                        }
                      >
                        <p>
                          <strong>
                            Q
                            {
                              index +
                              1
                            }

                            :
                          </strong>

                          {" "}

                          {
                            quiz.question
                          }

                          {" "}

                          {review[
                            quiz
                              ._id
                          ] ===
                            true &&
                            "✅"}

                          {review[
                            quiz
                              ._id
                          ] ===
                            false &&
                            "❌"}
                        </p>
{quiz.options.map((option) => (

  <div key={option}>

    <label>

      <input
        type="radio"

        name={quiz._id}

        value={option}

        checked={
          answers[quiz._id] === option
        }

        onChange={(e) =>
          handleAnswerChange(
            quiz._id,
            e.target.value
          )
        }
      />

      {" "}

      {option}

    </label>

  </div>

))}
                      </div>
                    )
                  )}

                  <br />

                  <button
                    onClick={
                      handleSubmitQuiz
                    }

                    disabled={
                      result !==
                      null
                    }
                  >
                    {result
                      ? "✅ Quiz Submitted"
                      : "Submit Quiz"}
                  </button>

                  {result && (
                   <div className="score-card">
                      <h2>
                        🎯
                        {" "}
                        Score:
                        {" "}
                        {
                          result.score
                        }
                        {" / "}
                        {
                          result.total
                        }
                      </h2>

                      <h2>
                        {
                          result.badge
                        }

                        {" "}

                        Badge
                        Earned!
                      </h2>
                    </div>
                  )}
                </div>
              )}
          </div>
        )
      )}
    </div>
  );
}

export default Events;