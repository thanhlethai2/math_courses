import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css'
import { MathJaxContext } from "better-react-mathjax";

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
            <Navbar />
            <Outlet />
            <Footer />
        </MathJaxContext>
    )
}

export default App
