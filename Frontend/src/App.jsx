import React, { Suspense } from "react";
import "./App.css";
import Header from "./component/header/Header";
import Footer from "./component/Footer/Footer";
import { Toaster } from "sonner";
import SpinnerLoading from "./component/SpinnerLoading/SpinnerLoading";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
function App() {
  const Home = React.lazy(() => import("./pages/home/home"));
  const Login = React.lazy(() => import("./pages/login/login"));
  const Contact = React.lazy(() => import("./pages/contact/contact"));
  return (
    <div className="App">
      <Suspense fallback={<SpinnerLoading />}>
        <BrowserRouter>
          <AuthContextProvider>
            <Toaster position="top-center" richColors expand={true}/>
            <Header />
            <div className="container_personalized">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
            <Footer />
          </AuthContextProvider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
