import React from "react";

const FooterComponent: React.FC = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white p-4">
        <p data-testid="footer-p">Footer © 2025</p>
      </footer>
    </>
  );
};

const Footer = React.memo(FooterComponent);
export default Footer;
