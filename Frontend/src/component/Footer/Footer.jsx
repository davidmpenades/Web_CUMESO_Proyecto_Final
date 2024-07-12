import { Footer } from 'flowbite-react';
import logo from "../../assets/imgs/Logo.webp";

const FooterComponent = () => {
  return (
    <div>
    <Footer>
      <div className="w-full text-center text-white px-4 mt-0 shadow-xl bg-white py-3">
        <div className="max-w-screen-xl mx-auto text-white ">
          <div className="flex justify-between items-center">
            <Footer.Brand
              href="/"
              src={logo}
              alt="Cumeso Logo"
              width={200}
              height={50}
            />
            <Footer.LinkGroup>
              <Footer.Link href="#">Sobre Nosotros</Footer.Link>
              <Footer.Link href="/contact">Contacto</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href="/" by="Cumeso" year={2024} />
        </div>
      </div>
    </Footer>
  </div>
  );
}

export default FooterComponent;