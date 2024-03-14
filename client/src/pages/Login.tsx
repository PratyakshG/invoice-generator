import axios from "axios";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(data.email);
    // console.log(data.password);

    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          email: "",
          password: "",
        });
        toast.success("Login success");
        navigate("/add-products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center border border-gray-400 rounded-2xl p-10 gap-5"
      >
        <label className="flex flex-col gap-1">
          Email
          <input
            type="email"
            placeholder="email"
            className="p-3 rounded-lg"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1">
          Password
          <input
            type="password"
            placeholder="password"
            className="p-3 rounded-lg"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </label>

        <button
          type="submit"
          className="mt-8 border px-3 py-2 rounded-lg"
        >
          Login
        </button>

        <div className="flex gap-2 items-center">
          Don't have an account?
          <button
            className="underline underline-offset-2"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
