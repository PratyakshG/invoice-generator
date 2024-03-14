import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-full w-full flex items-center justify-center gap-10 flex-col">
      <h1 className="font-bold">Levitation Invoice Generator</h1>
      <Link
        to="/login"
        className="border rounded-lg px-4 py-2"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="border rounded-lg px-4 py-2"
      >
        Register
      </Link>
    </div>
  );
};

export default Home;
