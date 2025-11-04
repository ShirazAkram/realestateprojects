import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar container" style={{ padding: "1rem 0" }}>
      <h2>🏠 RealEstate</h2>
      <div>
        <Link to="/">Home</Link>{" "}
        {token ? (
          <>
            <Link to="/add">Add Property</Link>{" "}
            <button onClick={logoutHandler}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>{" "}
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
