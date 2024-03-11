import React, { Suspense } from "react";
import "./App.css";
import Header from "./component/header/Header";
import Footer from "./component/Footer/Footer";
import { Toaster } from "sonner";
import SpinnerLoading from "./component/SpinnerLoading/SpinnerLoading";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { MachineContextProvider } from "./context/MachineContext";
import { PartContextProvider } from "./context/PartContext";
import { ProviderContextProvider } from "./context/ProviderContext";
import { UserContextProvider } from "./context/UserContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import AdminGuard from "./services/Guards/Adminguard";
import AuthGuard from "./services/Guards/AuthGuard";

function Layout({ children }) {
  const location = useLocation();
  const showHeaderAndFooter = location.pathname !== "/dashboard";

  return (
    <>
      {showHeaderAndFooter && <Header />}
      <div className="container_personalized">{children}</div>
      {showHeaderAndFooter && <Footer />}
    </>
  );
}

function App() {
  const Home = React.lazy(() => import("./pages/home/home"));
  const Login = React.lazy(() => import("./pages/login/login"));
  const Contact = React.lazy(() => import("./pages/contact/contact"));
  const Machine = React.lazy(() => import("./pages/Machine/machine"));
  const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"));
  const MachineList = React.lazy(() =>
    import("./component/Admin/Machine/MachineList")
  );
  const PartList = React.lazy(() => import("./component/Admin/Part/PartList"));
  const ProviderList = React.lazy(() =>
    import("./component/Admin/Providers/ProviderList")
  );
  const UserTable = React.lazy(() =>
    import("./component/Admin/Users/UserTable")
  );
  const Profile = React.lazy(() => import("./pages/Client/Profile"));

  return (
    <div className="App">
      <Suspense fallback={<SpinnerLoading />}>
        <BrowserRouter>
          <AuthContextProvider>
            <MachineContextProvider>
              <PartContextProvider>
                <ProviderContextProvider>
                  <UserContextProvider>
                    <ProfileContextProvider>
                    <Toaster position="top-center" richColors expand={true} />
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <Layout>
                            <Home />
                          </Layout>
                        }
                      />
                      <Route
                        path="/contact"
                        element={
                          <Layout>
                            <Contact />
                          </Layout>
                        }
                      />
                      <Route
                        path="/login"
                        element={
                          <Layout>
                            <Login />
                          </Layout>
                        }
                      />
                      <Route
                        path="/machine"
                        element={
                          <Layout>
                            <Machine />
                          </Layout>
                        }
                      />
                      <Route element={<AdminGuard />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                          path="/dashboard/machine"
                          element={<MachineList />}
                        />
                        <Route path="/dashboard/part" element={<PartList />} />
                        <Route
                          path="/dashboard/provider"
                          element={<ProviderList />}
                        />
                        <Route path="/dashboard/user" element={<UserTable />} />
                      </Route>
                      <Route element={<AuthGuard />}>
                        <Route path="/profile" element={<Layout><Profile /></Layout>} />
                      </Route>
                    </Routes>
                    </ProfileContextProvider>
                  </UserContextProvider>
                </ProviderContextProvider>
              </PartContextProvider>
            </MachineContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
