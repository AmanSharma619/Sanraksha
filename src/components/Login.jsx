import { useRef, useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { checkValidData } from "../utils/validate";
import { adduser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css"
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  const handleButtonClick = async () => {
    const message = checkValidData(emailRef.current.value, passwordRef.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // SIGN UP logic
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: nameRef.current.value,
        });

        dispatch(
          adduser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );

        navigate("/");
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      // SIGN IN logic
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
        const user = userCredential.user;

        dispatch(
          adduser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );

        navigate("/");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const SignInToggle=()=>{
    setIsSignInForm(!isSignInForm)
  }
 
  return (
    <>
      <div className="flex justify-center items-center min-h-screen main" >
        <form
          className=" text-white bg-opacity-50 hover:bg-opacity-100 rounded-3xl relayive p-8 w-3/12  mx-auto -mt-28 border flex flex-col justify-around "
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="text">

          <h1 className="font-extrabold text-center text-4xl py-2 text-white text-transparent bg-clip-text">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          <p className="p-4 text-clr1 hover:text-white cursor-pointer text-center" onClick={SignInToggle}>
            {isSignInForm ? "New to Sanraksha? Sign up now." : "Already a user? Sign In now."}
          </p>
          </div>
<div className="fields">

          {!isSignInForm && (
            <input
            type="text"
            placeholder="Name"
            className="p-4 my-2 font-bold w-full bg-clr2 hover:border-white bg-opacity-80 text-white rounded-md"
            ref={nameRef}
            />
          )}

          <input
            type="email"
            placeholder="E-mail"
            className="p-4 my-2 font-bold w-full bg-clr2 bg-opacity-80 text-white rounded-md"
            ref={emailRef}
            />

          <input
            type="password"
            placeholder="Enter Password"
            className="p-4 my-2 font-bold w-full bg-clr2 hover:border-white bg-opacity-80 text-white rounded-md"
            ref={passwordRef}
            />

          {!isSignInForm && (
            <input
            type="password"
            placeholder="Confirm your Password"
            className="p-4 my-2 font-bold w-full bg-clr2 hover:border-white bg-opacity-80 text-white rounded-md"
            />
          )}

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <button
            className="my-6 w-full font-bold rounded-xl hover:bg-gradient-to-l text-black text-lg py-4 px-4 mt-3 transition duration-300 ease-in-out  border border-clr5flex justify-center items-center text-center"
            onClick={handleButtonClick}
            >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
              </div>
        </form>
      </div>
    </>
  );
};

export default Login;
