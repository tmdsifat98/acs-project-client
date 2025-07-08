import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-black py-10">
      <div className="w-11/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <Logo/>
          <p>Empowering learners with quality education anytime, anywhere.</p>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Resources */}
        <divdiv className="flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Use</a></li>
          </ul>
        </divdiv>

        {/* Social Links */}
        <divdiv className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
        </divdiv>

      </div>

      {/* Footer bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} EduPlatform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
