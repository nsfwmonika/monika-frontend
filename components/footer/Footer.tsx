import FooterLinks from "@/components/footer/FooterLinks";

const Footer = () => {
  const d = new Date();
  return (
    <footer>
      <div className="mt-16 footer-block space-y-2 pt-6 pb-4 flex flex-col items-center text-gray-400 border-t font-bold text-4xl" style={{borderColor:'#1c1a22'}}>
        <FooterLinks />
        <span className="text-gray-100">Monika Al</span>
      </div>
    </footer>
  );
};

export default Footer;
