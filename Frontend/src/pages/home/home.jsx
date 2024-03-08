import React, { useState, useEffect } from "react";
import logo from "../../assets/imgs/Logo.webp";
import video from "../../assets/video/home.mp4";
import "./home.css";
import fondo from "../../assets/imgs/register.webp";
import maquina from "../../assets/imgs/maquina1400.webp";
import maquinaR from "../../assets/imgs/maquina1400-R.webp";
import pantalla from "../../assets/imgs/pantalla.webp";
import { useInView } from "react-intersection-observer";
import { Carousel, Tooltip, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const AnimatedImage = ({ src, alt, direction, fullWidth }) => {
    const { ref, inView } = useInView({
      triggerOnce: false,
      threshold: 0.1,
    });

    // Las clases de animación controlan la dirección y visibilidad
    const animationClass = inView
      ? "translate-x-0 opacity-100 blur-none"
      : `${
          direction === "left" ? "-translate-x-full" : "translate-x-full"
        } opacity-0 blur`;

    // Las clases de tamaño manejan si la imagen debe ser de ancho completo o parcial
    const sizeClass = fullWidth ? "w-full" : "w-1/2";

    return (
      <div
        ref={ref}
        className={`md:p-2 p-1 ${sizeClass} transition-all duration-1000 transform ${animationClass}`}
      >
        <img
          alt={alt}
          className="w-full object-cover h-full object-center block rounded-xl shadow-2xl"
          src={src}
        />
      </div>
    );
  };

  return (
    <>
      <div
        className="relative w-screen overflow-hidden"
        style={{ height: "32rem", marginTop: "-6rem" }}
      >
        <video
          src={video}
          autoPlay
          loop
          muted
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        ></video>
        <img
          src={logo}
          alt="Company Logo"
          className="z-0 mx-auto md:max-w-2xl"
          style={{
            position: "relative",
            marginTop: "10rem"            
          }}
        />
      </div>
      <section className="text-gray-600 body-font bg-gradient-to-r from-gray-50 to-gray-200">
        <div className="container px-5 py-4 mx-auto flex flex-wrap">
          <div className="w-full mb-4 rounded flex flex-col lg:flex-row rounded shadow-xl p-6 bg-gray-150">
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-medium title-font text-gray-900 mb-4 lg:mb-0">
                Rebobinadora 1400
              </h1>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-6 rounded shadow-xl bg-gray-100">
              <ul className="list-disc space-y-2 text-justify p-6">
                <li>Rebobinadora de 1400mm de ancho de trabajo</li>
                <li>Alta velocidad de trabajo más de 800m/min</li>
                <li>Precisión de corte de 0.1mm</li>
                <li>Con sistema de corte por navaja y cuchilla</li>
                <li>Con sistema de control de tensión y velocidad</li>
                <li>Control de diámetro de bobina</li>
                <li>Extración de bobinas por sistema de brazo robótico</li>
              </ul>
            </div>
          </div>

          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-wrap md:-m-2 -m-1">
              {/* Columna izquierda */}
              <div className="flex flex-wrap w-1/2">
                <AnimatedImage
                  src={maquina}
                  alt="Maquina"
                  direction="left"
                  fullWidth={false} 
                />
                <AnimatedImage
                  src={maquina}
                  alt="Maquina"
                  direction="left"
                  fullWidth={false} 
                />
                <div className="md:p-2 p-1 w-full">
                  <Tooltip
                    content={
                      <div className="w-80">
                        <Typography color="white" className="font-medium">
                          Material Tailwind
                        </Typography>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal opacity-80"
                        >
                          Material Tailwind is an easy to use components library
                          for Tailwind CSS and Material Design.
                        </Typography>
                      </div>
                    }
                  >
                    <AnimatedImage
                      src={maquina}
                      alt="Maquina"
                      direction="left"
                      fullWidth={true}
                    />
                  </Tooltip>
                </div>
              </div>
              {/* Columna derecha */}
              <div className="flex flex-wrap w-1/2">
                <div className="md:p-2 p-1 w-full">
                  <AnimatedImage
                    src={maquina}
                    alt="Maquina"
                    direction="right"
                    fullWidth={true}
                  />
                </div>
                <AnimatedImage
                  src={pantalla}
                  alt="Pantalla"
                  direction="right"
                  fullWidth={false} 
                />
                <AnimatedImage
                  src={maquina}
                  alt="Maquina"
                  direction="right"
                  fullWidth={false} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center w-full px-[10%] py-[4rem]">
        <div className="w-4/5">
          <div className="relative" style={{ paddingTop: "56.25%" }}>
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <Carousel
                className="w-full h-full rounded-xl"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
              >
                <img
                  src={maquina}
                  alt="image 1"
                  className="h-full w-full object-cover"
                />
                <img
                  src={maquinaR}
                  alt="image 2"
                  className="h-full w-full object-cover"
                />
                <img
                  src={pantalla}
                  alt="image 3"
                  className="h-full w-full object-cover"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div
          className="bg-fixed bg-center bg-cover h-52 w-full"
          style={{ backgroundImage: `url(${fondo})` }}
        >
          <div className="flex justify-center items-center h-full">
            <h1
              className="text-4xl text-white"
              style={{ fontFamily: "DisplayOTF, sans-serif" }}
            >
              Desde CUMESO queremos acompañarte en tu viaje
            </h1>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font bg-gradient-to-r from-gray-200 to-blue-200 mt-6">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Pidenos presupuesto sín compromiso
            </h1>
            <p className="mb-8 leading-relaxed">
              No dejes pasar la oportunidad de transformar tu línea de
              producción y dar un paso adelante hacia el futuro de la
              manufactura. Solicita tu presupuesto hoy y descubre cómo nuestra
              Rebobinadora 1400 puede ser la pieza clave en la optimización de
              tus operaciones. ¡Estamos aquí para ayudarte a alcanzar nuevos
              niveles de éxito!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-lg"
              >
                Pedir presupuesto
              </button>
              <button
                onClick={() => navigate("/login")}
                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                Registro
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={maquinaR}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
