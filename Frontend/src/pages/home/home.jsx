import React from "react";
import logo from "../../assets/imgs/Logo.webp";
import video from "../../assets/video/home.mp4";
import "./home.css";
import fondo from "../../assets/imgs/register.webp";
import foto1 from "../../assets/imgs/Foto1.webp";
import foto2 from "../../assets/imgs/Foto2.webp";
import foto3 from "../../assets/imgs/Foto3.webp";
import foto4 from "../../assets/imgs/Foto4.webp";
import foto5 from "../../assets/imgs/Foto5.webp";
import foto6 from "../../assets/imgs/Foto6.webp";
import { useInView } from "react-intersection-observer";
import { Carousel } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const AnimatedImage = ({ src, alt, direction, fullWidth }) => {
    const { ref, inView } = useInView({
      triggerOnce: false,
      threshold: 0.1,
    });

    const animationClass = inView
      ? "translate-x-0 opacity-100 blur-none"
      : `${
          direction === "left" ? "-translate-x-full" : "translate-x-full"
        } opacity-0 blur`;

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
            marginTop: "10rem",
          }}
        />
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
          <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-500 xl:text-3xl dark:text-white">
            Realizamos soluciones mecánicas{" "}
            <span className="text-black">personalizadas.</span>
          </h2>

          <p className="max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300">
            Somos especialistas en la fabricación de maquinaria industrial, con
            un enfoque en la optimización de procesos de producción. Nuestro
            equipo de expertos en ingeniería mecánica y electrónica trabaja en
            estrecha colaboración con nuestros clientes para desarrollar
            soluciones personalizadas que se adapten a sus necesidades
            específicas.
          </p>

          <div className="inline-flex w-full mt-6 sm:w-auto">
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center w-full px-6 py-2 text-white duration-300 bg-gray-500 rounded-lg hover:bg-gray-300 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              Contacto
            </button>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font bg-gradient-to-r from-gray-50 to-gray-200">
        <div className="container px-5 py-4 mx-auto flex flex-wrap">
          <div className="w-full mb-4 rounded flex flex-col lg:flex-row rounded shadow-xl p-6 bg-gray-150">
            <div className="lg:w-1/2 flex flex-col justify-center items-center h-full">
              <h1 className="text-3xl font-medium title-font text-gray-900 mb-4 lg:mb-0 border-b border-red-500">
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
                <li>Extracción de bobinas por sistema de brazo robótico</li>
              </ul>
            </div>
          </div>

          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-wrap md:-m-2 -m-1">
              {/* Columna izquierda */}
              <div className="flex flex-wrap w-1/2">
                <AnimatedImage
                  src={foto1}
                  alt="Maquina"
                  direction="left"
                  fullWidth={false}
                />
                <AnimatedImage
                  src={foto5}
                  alt="Maquina"
                  direction="left"
                  fullWidth={false}
                />
                <div className="md:p-2 p-1 w-full">
                  <AnimatedImage
                    src={foto6}
                    alt="Maquina"
                    direction="left"
                    fullWidth={true}
                  />
                </div>
              </div>
              {/* Columna derecha */}
              <div className="flex flex-wrap w-1/2">
                <div className="md:p-2 p-1 w-full">
                  <AnimatedImage
                    src={foto4}
                    alt="Maquina"
                    direction="right"
                    fullWidth={true}
                  />
                </div>
                <AnimatedImage
                  src={foto2}
                  alt="Pantalla"
                  direction="right"
                  fullWidth={false}
                />
                <AnimatedImage
                  src={foto3}
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
                  src={foto1}
                  alt="image 1"
                  className="h-full w-full object-cover"//cambiar a className="image-contain" cuando las fotos sean todas iguales
                />
                <img
                  src={foto5}
                  alt="image 2"
                  className="h-full w-full object-cover"//cambiar a className="image-contain" cuando las fotos sean todas iguales
                />
                <img
                  src={foto4}
                  alt="image 3"
                  className="h-full w-full object-cover"//cambiar a className="image-contain" cuando las fotos sean todas iguales
                />
                <img
                  src={foto6}
                  alt="image 3"
                  className="h-full w-full object-cover"//cambiar a className="image-contain" cuando las fotos sean todas iguales
                />
                <img
                  src={foto3}
                  alt="image 3"
                  className="h-full w-full object-cover"//cambiar a className="image-contain" cuando las fotos sean todas iguales
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

      <section className="text-gray-600 body-font bg-gradient-to-r from-gray-50 to-gray-200 mt-6">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Pídenos presupuesto sin compromiso
            </h1>
            <p className="mb-8 leading-relaxed">
            No pierdas la oportunidad de revolucionar tu línea de producción con nuestra Rebobinadora 1400, diseñada específicamente para aumentar la eficiencia y 
            precisión en tus operaciones. Con tecnología de vanguardia, esta máquina se convierte en la solución ideal para superar los desafíos de la manufactura moderna.
             Contáctanos hoy para obtener un presupuesto personalizado y descubre cómo podemos ayudarte a elevar tus procesos de producción a nuevos horizontes de éxito. 
             En <b>CUMESO</b>, estamos comprometidos con tu crecimiento y satisfacción.
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
              src={foto5}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
