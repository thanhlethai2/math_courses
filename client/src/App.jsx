import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css'
import { MathJaxContext } from "better-react-mathjax";
import { AdminLoginContextProvider } from "./AdminLoginContext";

const App = () => {

    const config = {
        loader: { load: ["[tex]/html"] },
        tex: {
          packages: { "[+]": ["html"] },
          inlineMath: [["$", "$"]],
          displayMath: [["$$", "$$"]]
        }
    };

    return (
        <MathJaxContext config={config} version={3}>
            <AdminLoginContextProvider>
                <Navbar />
                <Outlet />
                <Footer />                
            </AdminLoginContextProvider>
        </MathJaxContext>
    )
}

export default App
