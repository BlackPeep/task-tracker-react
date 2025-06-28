import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";

function getUsernameFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.username;
  } catch (error) {
    return null;
  }
}

const UserBar = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = getUsernameFromToken();
    if (name) setUsername(name);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <div className="bg-indigo-500 px-5 py-1.5 flex justify-between items-center text-neutral-50">
      <span>
        Logged in as: <strong>{username}</strong>
      </span>

      <button
        className="border-2 rounded-md px-2 py-0.5 transform  cursor-pointer hover:scale-105 hover:bg-indigo-600 hover:shadow-md transition duration-200 ease-in"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default UserBar;
