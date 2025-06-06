import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckBox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";
const SignUp = () => {
  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(input);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              value={input.fullName}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              value={input.userName}
              onChange={(e) => setInput({ ...input, userName: e.target.value })}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <GenderCheckbox input={input} setInput={setInput} />

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to={"/login"}
          >
            Already have an account?
          </Link>

          <div>
            {!loading ? (
              <button className="btn btn-block btn-sm mt-2 border border-slate-700">
                Sign Up
              </button>
            ) : (
              <div className="loading loading-spinner"></div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
