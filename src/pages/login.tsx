import { useState } from "react";
import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import { auth } from "../firebase.js";
import { useLoginMutation } from "../redux/api/userAPI.js";
import { userExist, userNotExist } from "../redux/reducer/userReducer.js";
import { MessageResponse } from "../types/api-types.js";

const Login = () => {
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        _id: user.uid,
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        role: "user",
        gender,
        dob: date,
      });

      if ("data" in res) {
        toast.success(res.data?.message as string);
        if (res.data?.user) dispatch(userExist(res.data?.user));
      } else {
        const error = res.error as FetchBaseQueryError;
        const { message } = error.data as MessageResponse;
        dispatch(userNotExist());
        toast.error(message);
      }
    } catch {
      toast.error("Sign In failed.");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
