import axios from "axios";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          name: "",
          email: "",
          password: "",
        });
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center justify-center border border-gray-400 rounded-2xl p-10 gap-5"
      >
        <label className="flex flex-col gap-1">
          Name
          <input
            type="text"
            placeholder="name"
            className="p-3 rounded-lg"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </label>
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
          Register
        </button>

        <div className="flex gap-2 items-center">
          Already have an account?
          <button
            className="underline underline-offset-2"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
