import React from "react";
import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
import { RootState } from "./redux/configureStore";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";
import { BX24 } from 'bx24';

function App() {
  const { data } = useSelector((state: RootState) => state.user);

  const bx24 = new BX24();

  bx24.getAuth().then(function(auth) {
    console.log(auth);
  });

  return data ? <ProtectedRoute /> : <Auth />;
}

export default App;
