import { Link } from "react-router-dom";
import Features from "./Features";
import { Outlet } from 'react-router-dom';
import Kavach from "./Kavach";
const Dashboard = () => {
  return (
    <>
  <Features/>
  <Kavach/>
    </>
  )
}

export default Dashboard