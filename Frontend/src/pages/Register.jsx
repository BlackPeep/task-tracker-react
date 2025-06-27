import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    confirmPassword: false,
    passwordMatch: false,
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrors({
        username: !username.trim(),
        password: !password.trim(),
        confirmPassword: !confirmPassword.trim(),
        passwordMatch: false,
      });
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setErrors({ passwordMatch: true });
      return;
    }

    setIsLoggedIn(true);
    navigate("/");
  }

  return (
    <div className="w-full mx-auto md:w-3/4 lg:w-1/2 mt-5 px-5">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          className="bg-indigo-500 rounded-md p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          className="bg-indigo-500 rounded-md p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="bg-indigo-500 rounded-md p-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          {errors.username && (
            <span className="text-xs text-red-500 ">Username is required</span>
          )}
          {errors.password && (
            <span className="text-xs text-red-500 ">Password is required</span>
          )}
          {errors.confirmPassword && (
            <span className="text-xs text-red-500 ">
              Confirm Password is required
            </span>
          )}
          {errors.passwordMatch && (
            <span className="text-xs text-red-500 ">Passwords don't match</span>
          )}
        </div>

        <button
          type="submit"
          className="w-2/3 mx-auto bg-indigo-500 rounded-md p-2 text-neutral-50 cursor-pointer hover:scale-105 hover:bg-indigo-600 hover:shadow-md transition duration-200 ease-in"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
