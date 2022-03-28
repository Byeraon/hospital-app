import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";

const firebaseConfig = {
  apiKey: "AIzaSyAlpCp3mVIlHVtAg-e7Q3-4bi1-RHZNBSU",
  authDomain: "hospital-89974.firebaseapp.com",
  projectId: "hospital-89974",
  storageBucket: "hospital-89974.appspot.com",
  messagingSenderId: "529156600799",
  appId: "1:529156600799:web:51dba251641e407f078a6a",
  measurementId: "G-23WY9Q6H6S",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
