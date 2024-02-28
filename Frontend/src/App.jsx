import React, { Suspense } from "react";
import "./App.css";
import Header from "./component/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
function App() {
  const Home = React.lazy(() => import("./pages/home/home"));
  const Login = React.lazy(() => import("./pages/login/login"));
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <AuthContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthContextProvider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
