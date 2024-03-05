import { Footer } from 'flowbite-react';
import logo from "../../assets/imgs/Logo.webp";

const FooterComponent = () => {
  return (
    <div>
    <Footer>
      <div className="w-full text-center px-4 mt-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-between items-center">
            <Footer.Brand
              href="/"
              src={logo}
              alt="Cumeso Logo"
              width={200}
              height={50}
            />
            <Footer.LinkGroup>
              <Footer.Link href="#">About</Footer.Link>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
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