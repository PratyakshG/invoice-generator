import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import AddProducts from "./components/AddProducts";
import { UserContextProvider } from "../context/userContext";
import { Provider } from "react-redux";
import store from "./components/store";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <Toaster
          position="top-center"
          toastOptions={{ duration: 2000 }}
        />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/add-products"
            element={<AddProducts />}
          />
        </Routes>
      </UserContextProvider>
    </Provider>
  );
}

export default App;
