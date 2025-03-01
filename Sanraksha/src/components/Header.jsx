import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { adduser, removeuser } from "../utils/userSlice";
import { auth } from "../utils/firebase";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          adduser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(removeuser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(removeuser());
    navigate("/login"); 
  };

  return (
    <div className="bg-clr5">
      <div className="flex items-center justify-between p-6 max-w-7xl mx-auto z-[1] relative">
        <div className="flex text-left">
          <img src='/logo.png' className='w-32 px-2 py-0' />
          <h1 className="font-bold mt-8 text-4xl bg-gradient-to-r from-clr1 to-clr2 bg-clip-text text-transparent hover:bg-gradient-to-l from-clr1 to-clr3 transition duration-500 ease-in-out">
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
              <Link to="/feedback">Contribute</Link>
            </li>
            <li className="px-2 py-2 text-xl bg-clr1 text-white cursor-pointer rounded-full font-bold hover:bg-gradient-to-r from-clr2 to-clr3 hover:text-clr5 transition duration-300 ease-in-out transform hover:scale-105">
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
