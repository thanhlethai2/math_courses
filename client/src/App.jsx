import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css'

const App = () => {

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default App
