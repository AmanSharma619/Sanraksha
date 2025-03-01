import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { checkValidData } from "../utils/validate";
import { adduser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

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
      <div className="bg-gradient-to-b from-clr5 via-clr3 to-clr3 flex justify-center items-center min-h-screen">
        <form
          className="bg-clr4 text-white bg-opacity-50 hover:bg-opacity-100 rounded-3xl absolute p-8 w-3/12 mx-auto -mt-28 border border-clr1 hover:border-clr2 transition-colors duration-600 ease-in-out"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="font-extrabold text-center text-4xl py-2 bg-gradient-to-r from-clr1 to-clr3 text-transparent bg-clip-text">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          <p className="p-4 text-clr1 hover:text-white cursor-pointer text-center" onClick={SignInToggle}>
            {isSignInForm ? "New to Sanraksha? Sign up now." : "Already a user? Sign In now."}
          </p>

          {!isSignInForm && (
            <input
              type="text"
              placeholder="Name"
              className="p-4 my-2 font-bold w-full bg-clr2 hover:border-white bg-opacity-80 text-black rounded-md"
              ref={nameRef}
            />
          )}

          <input
            type="email"
            placeholder="E-mail"
            className="p-4 my-2 font-bold w-full bg-clr2 bg-opacity-80 text-black rounded-md"
            ref={emailRef}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="p-4 my-2 font-bold w-full bg-clr2 hover:border-white bg-opacity-80 text-black rounded-md"
            ref={passwordRef}
          />

          {!isSignInForm && (
          <input
            type="password"
            placeholder="Confirm your Password"
            className="p-4 my-2 font-bold w-full bg-clr2 hover:border-white bg-opacity-80 text-black rounded-md"
          />
          )}

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <button
            className="my-6 w-full font-bold rounded-xl bg-gradient-to-r from-clr1 to-clr3 hover:bg-gradient-to-l text-white text-lg py-4 px-4 mt-3 transition duration-300 ease-in-out hover:text-white border border-clr5 hover:border-clr4 flex justify-center items-center text-center"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
