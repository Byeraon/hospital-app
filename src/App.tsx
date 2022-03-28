import React from "react";
import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
import { RootState } from "./redux/configureStore";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";

function App() {
  const { data } = useSelector((state: RootState) => state.user);

  return data ? <ProtectedRoute /> : <Auth />;
}

export default App;
