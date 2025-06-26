import { Link } from "react-router-dom";

const CTABar = () => {
  return (
    <div className="bg-indigo-500 px-5 py-1.5 flex justify-between items-center text-neutral-50">
      <span>Want to save your tasks?</span>
      <Link to={"/login"}>
        <button className="border-2 rounded-md px-2 py-0.5 transform  cursor-pointer hover:scale-105 hover:bg-indigo-600 hover:shadow-md transition duration-200 ease-in">
          Sign in or Register
        </button>
      </Link>
    </div>
  );
};

export default CTABar;
