import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-clr5">
      <div className="container mx-auto px-8 py-6 relative mt-8 border-t border-t-clr3">
        <div className="text-left space-y-2">
          <h2 className="font-bold text-2xl bg-gradient-to-l from-clr1 to-clr2 bg-clip-text text-transparent">
            Sanraksha
          </h2>
          <p className="text-md text-clr2">Working towards a safer Delhi for women</p>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-6">
          <Link
            to="/"
            className="px-4 py-2 text-clr2 font-bold hover:bg-gradient-to-r from-clr2 to-clr3 hover:text-clr5 rounded-lg transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 text-clr2 font-bold hover:bg-gradient-to-r from-clr2 to-clr3 hover:text-clr5 rounded-lg transition duration-300 ease-in-out"
          >
            Dashboard
          </Link>
        </div>
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <a
            href="https://github.com/AmanSharma619/Sanraksha/"
            className="text-clr1 hover:text-clr3 transition duration-300 ease-in-out"
          >
            <Github size={36} />
          </a>
        </div>
      </div>
      <div className="text-center text-clr2 mb-6">
        ©2025 Sanraksha, All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
