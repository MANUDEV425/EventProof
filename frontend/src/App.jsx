import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  signInGoogle,
} from "./Firebase/auth";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";

function App() {
  const [user,
    setUser] =
    useState(null);

  const handleLogin =
    async () => {

      const loggedInUser =
        await signInGoogle();

      if (
        loggedInUser
      ) {
        setUser(
          loggedInUser
        );
      }
    };

  return (
    <BrowserRouter>

      {user && (
        <Navbar />
      )}

      <Routes>

        <Route
          path="/"
          element={
            !user ? (
              <div
                style={{
                  textAlign:
                    "center",

                  marginTop:
                    "100px",
                }}
              >
                <h1>
                  🚀 EventProof
                </h1>

                <h2>
                  AI-Powered
                  Event Platform
                </h2>

                <button
                  onClick={
                    handleLogin
                  }
                >
                  Login
                  with Google
                </button>
              </div>
            ) : (
              <Home />
            )
          }
        />

        <Route
          path="/events"
          element={
            <Events
              user={user}
            />
          }
        />

        <Route
          path="/create-event"
          element={
            <CreateEvent
              user={user}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <Profile
              user={user}
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;