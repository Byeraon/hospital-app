import React, {useState} from "react";
import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
import { RootState } from "./redux/configureStore";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";
import { BX24 } from 'bx24';
import {AdminPage} from "./pages/AdminPage/AdminPage";

function App() {
  const [isAdmin, setAdmin] = useState(false)
  const { data } = useSelector((state: RootState) => state.user);

  const bx24 = new BX24();

  bx24.getAuth().then(function(auth) {
    console.log(auth);
    if (auth) {
      setAdmin(true)
    }
  });


  return isAdmin ? <AdminPage /> : data ? <ProtectedRoute /> : <Auth />;
}

export default App;
