import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1>
            🚀 EventProof
        </h1>

        <h2>Learn. Compete. Earn.</h2>

        <p>
          Create events, participate in
          AI-powered quizzes, and earn
          badges.
        </p>

        <div className="hero-buttons">
          <Link to="/events">
            <button>
              📅 Explore Events
            </button>
          </Link>

          {" "}

          <Link to="/create-event">
            <button>
              ➕ Create Event
            </button>
          </Link>
        </div>
      </div>

      <div
  style={{
    marginTop: "100px",
  }}
>
      <h2
  style={{
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "50px",
  }}
>
          Why EventProof?
        </h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h1>🤖</h1>

            <h3>AI Quizzes</h3>

            <p>
              Automatically generated
              quizzes for every event.
            </p>
          </div>

          <div className="feature-card">
            <h1>🏆</h1>

            <h3>Earn Badges</h3>

            <p>
              Showcase your achievements
              through badges.
            </p>
          </div>

          <div className="feature-card">
            <h1>🎯</h1>

            <h3>Track Scores</h3>

            <p>
              Monitor your performance
              and improve continuously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;