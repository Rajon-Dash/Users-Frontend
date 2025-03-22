import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

// Suppress ResizeObserver Error
const resizeObserverErrHandler = (e) => {
  if (e.message === "ResizeObserver loop completed with undelivered notifications") {
    e.stopImmediatePropagation();
  }
};
window.addEventListener("error", resizeObserverErrHandler);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container-fluid">
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
