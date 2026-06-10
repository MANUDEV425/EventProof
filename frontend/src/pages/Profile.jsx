

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function Profile({ user }) {

if (!user) {
    return (
      <div className="page-container">
        <h1>Please login first.</h1>
      </div>
    );
  }

  const [badges,
    setBadges] =
    useState([]);

  const [showBadges,
    setShowBadges] =
    useState(false);

  const fetchBadges =
    async () => {
      try {
        const response =
          await axios.get(
            `http://localhost:5000/badges/${user.email}`
          );

        setBadges(
          response.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchBadges();
  }, []);

  return (
    <div className="page-container profile">
    
    
      <img
  src={user.photoURL}
  alt="profile"
/>

      <h2>
        {user.displayName}
      </h2>

      <p>
        {user.email}
      </p>

      <button
        onClick={() =>
          setShowBadges(
            !showBadges
          )
        }
      >
        {showBadges
          ? "❌ Hide Badges"
          : "🏅 My Badges"}
      </button>

      {showBadges && (
        <>
          <h2>
            🏅 My Badges
          </h2>

          {badges.length === 0 ? (

  <p>
    No badges yet.
  </p>

) : (

  <div className="badge-grid">

    {badges.map((badge) => (

      <div
        key={badge._id}
        className="badge-card"
      >
        <h3>
          {badge.badge}
        </h3>

        <p>
          {badge.eventTitle}
        </p>
      </div>

    ))}

  </div>

)}
        </>
      )}
    </div>
  );
}

export default Profile;