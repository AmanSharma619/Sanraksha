import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <div className="relative flex py-0 px-0 border border-t-1">
      <div className="w-1/2 bg-clr2 flex flex-col justify-center px-12 py-4 text-left">
        <h2 className="font-bold text-4xl text-white mb-1">Sanraksha</h2>
        <p className="text-xl text-white/80">Working towards a safer Delhi for women</p>
      </div>
      <div className="w-1/2 bg-clr1 flex flex-col justify-center items-center space-y-4 py-6">
        <div className="flex space-x-6">
          <Link
            to="/"
            className="px-5 py-2 text-white font-bold bg-white/10 hover:bg-white/20 rounded-lg transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2 text-white font-bold bg-white/10 hover:bg-white/20 rounded-lg transition duration-300 ease-in-out"
          >
            Dashboard
          </Link>
          <Link
            to="/feedback"
            className="px-5 py-2 text-white font-bold bg-white/10 hover:bg-white/20 rounded-lg transition duration-300 ease-in-out"
          >
            Contribute
          </Link>
        </div>
        <a
          href="https://github.com/AmanSharma619/Sanraksha/"
          className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
        >
          <Github size={40} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
