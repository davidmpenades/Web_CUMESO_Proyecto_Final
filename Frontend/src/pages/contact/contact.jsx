import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { Toaster, toast } from "sonner";
import contact from "../../assets/imgs/contact.webp";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const divStyle = {
    backgroundImage: `url(${contact})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    Height: "100%",
  };
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ps1ix3h",
        "template_0373bxq",
        e.target,
        "y4ei3M-hc_WcjebZf"
      )
      .then(
        (result) => {
          setFormData({
            name: "",
            company: "",
            email: "",
            message: "",
          });
          setTimeout(() => {
          navigate("/");
          }, 1800);
        },
        (error) => {
          <Toaster position="top-center" richColors />;
          toast.error("Error al enviar el mensaje");
        }
      );
  };
  return (
    <body className="text-white font-sans mt-6" style={divStyle}>
      <div className="min-h-screen flex items-center justify-center">
        <div className=" p-8 rounded-lg w-full md:w-1/2 lg:w-1/3 backdrop-blur-md">
          <h2 className="text-3xl font-semibold mb-6 text-center text:shadow-lg">
            Contacta con nosotros
          </h2>

          <form onSubmit={sendEmail} className="space-y-4">
            <div className="flex items-center">
              <input
                type="text"
                style={{ color: "black" }}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="flex-1 p-3 border border-black rounded focus:outline-none focus:border-blue-500"
                placeholder="Nombre"
              />
            </div>
            <div className="flex items-center">
              <input
                type="text"
                style={{ color: "black" }}
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="flex-1 p-3 border border-black rounded focus:outline-none focus:border-blue-500"
                placeholder="Compañía"
              />
            </div>

            <div className="flex items-center">
              <input
                type="email"
                style={{ color: "black" }}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1 p-3 border border-black-600 rounded focus:outline-none focus:border-blue-500"
                placeholder="Email"
              />
            </div>

            <div className="flex items-center">
              <textarea
                id="message"
                name="message"
                style={{ color: "black" }}
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className="flex-1 p-3 border border-black-600 rounded focus:outline-none focus:border-blue-500"
                placeholder="Mensaje"
              ></textarea>
            </div>

            <div onSubmit={sendEmail} className="flex justify-end">
              <Toaster position="top-center" richColors />
              <button
                type="submit"
                onClick={() => toast.success("Mensaje enviado correctamente")}
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
    </body>
  );
}
