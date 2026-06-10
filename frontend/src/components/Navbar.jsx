import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid gray",
      }}
    >
      <Link to="/">🏠 Home</Link>

      <Link to="/events">
        📅 Events
      </Link>

      <Link to="/create-event">
        ➕ Create Event
      </Link>

      <Link to="/profile">
        👤 Profile
      </Link>
    </nav>
  );
}

export default Navbar;