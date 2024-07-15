import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import contact from "../../assets/imgs/contact.webp";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import MachineContext from "../../context/MachineContext";

const schema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  company: yup.string().required("La empresa es obligatoria"),
  email: yup
    .string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  message: yup
    .string()
    .min(20, "El mensaje debe tener al menos 20 caracteres")
    .required("El mensaje es obligatorio"),
  reason: yup.string().required("El motivo es obligatorio"),
}).required();

const Contact = () => {
  const navigate = useNavigate();
  const divStyle = {
    backgroundImage: `url(${contact})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100%",
    marginTop: "3rem",
  };

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
    reason: "",
  });

  const { machines } = useContext(MachineContext);
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const form = useRef();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const formattedErrors = err.inner.reduce(
        (acc, error) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {}
      );
      setErrors(formattedErrors);
      return false;
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) {
      toast.error("Por favor, corrige los errores antes de enviar.", {
        duration: 1500,
      });
      return;
    }

    if (!recaptchaValue) {
      toast.error("Por favor, completa el CAPTCHA.", { duration: 1500 });
      return;
    }

    const formDataToSubmit = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      message: formData.message,
      reason: formData.reason,
      "g-recaptcha-response": recaptchaValue,
    };

    fetch("https://submit-form.com/your-form-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToSubmit),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Mensaje enviado correctamente", { duration: 1500 });
          setFormData({ name: "", company: "", email: "", message: "", reason: "" });
          setRecaptchaValue(null);
          setTimeout(() => navigate("/"), 1800);
        } else {
          throw new Error("Error al enviar el mensaje");
        }
      })
      .catch((error) => {
        toast.error("Error al enviar el mensaje", { duration: 1500 });
        console.error("Error:", error);
      });
  };

  const onRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div className="min-h-screen flex text-white font-sans items-center justify-center mt-6" style={divStyle}>
      <div className=" p-8 rounded-lg w-full md:w-1/2 lg:w-1/3 backdrop-blur-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text:shadow-lg">
          Contacta con nosotros
        </h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div className="flex items-center">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="flex-1 p-3 border border-black rounded focus:outline-none focus:border-blue-500"
              placeholder="Nombre"
              style={{ color: 'black', backgroundColor: 'white' }} 
            />
          </div>
          <p style={{ color: "red" }}>{errors.name}</p>

          <div className="flex items-center">
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="flex-1 p-3 border border-black rounded focus:outline-none focus:border-blue-500"
              placeholder="Empresa"
              style={{ color: 'black', backgroundColor: 'white' }} 
            />
          </div>
          <p style={{ color: "red" }}>{errors.company}</p>

          <div className="flex items-center">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="flex-1 p-3 border border-black-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Email"
              style={{ color: 'black', backgroundColor: 'white' }} 
            />
          </div>
          <p style={{ color: "red" }}>{errors.email}</p>
          <div className="flex items-center">
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="flex-1 p-3 border border-black-600 rounded focus:outline-none focus:border-blue-500"
              style={{ color: 'black', backgroundColor: 'white' }}
            >
              <option value="" disabled>Seleccione una opción</option>
              <option value="custom">Pedir presupuesto personalizado</option>
              {machines.map(machine => (
                <option key={machine.id} value={machine.name}>{machine.name}</option>
              ))}
            </select>
          </div>
          <p style={{ color: "red" }}>{errors.reason}</p>

          <div className="flex items-center">
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className="flex-1 p-3 border border-black-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Mensaje"
              style={{ color: 'black', backgroundColor: 'white' }} 
            ></textarea>
          </div>
          <p style={{ color: "red" }}>{errors.message}</p>

          <div className="flex items-center justify-center">
            <ReCAPTCHA
              sitekey="YOUR_SITE_KEY"
              onChange={onRecaptchaChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
            >
              Enviar mensaje
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 inline-block ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
