import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-clr5">
      <div className="flex items-center justify-between p-6 max-w-7xl mx-auto z-[1] relative">
        <div className="flex-1 text-left">
          <h1 className="font-bold text-4xl bg-gradient-to-r from-clr1 to-clr2 bg-clip-text text-transparent hover:bg-gradient-to-l from-clr1 to-clr3 transition duration-500 ease-in-out">
            <Link to="/">Sanraksha</Link>
          </h1>
        </div>

        <div className="flex items-center space-x-6">
          <ul className="flex space-x-4 items-center">
            <li className="px-4 text-xl py-2 text-clr2 font-bold hover:bg-gradient-to-r from-clr2 to-clr3 hover:text-clr5 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/">Home</Link>
            </li>
            <li className="px-4 py-2 text-xl text-clr2 font-bold hover:bg-gradient-to-r from-clr2 to-clr3 hover:text-clr5 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="px-4 py-2 text-xl text-clr2 font-bold hover:bg-gradient-to-r from-clr2 to-clr3 hover:text-clr5 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              <Link to="/">Contribute</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
