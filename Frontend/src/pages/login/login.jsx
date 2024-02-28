import React, { useContext, useEffect } from "react";
import RegLogForm from "../../component/Client/RegLogForm";
import { useAuth } from "../../hooks/useAuth";
import AuthContext from "../../context/AuthContext";
import { Toaster, toast } from 'sonner'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isCorrect, useLogin, useRegister, errorMSG } = useAuth();
  const { isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isCorrect) {
      if (isAdmin) {
        navigate("/dashboard");
        toast.success("Bienvenido, administrador!");
      }else{
      toast.success("Bienvenido!");
      navigate("/rent");
      }
    } else if (errorMSG) {
      toast.error(errorMSG);
    }
  }, [isCorrect, errorMSG, navigate]);

  return (
    <>
      <RegLogForm loginUser={useLogin} registerUser={useRegister} />
    </>
  );
};

export default Login;