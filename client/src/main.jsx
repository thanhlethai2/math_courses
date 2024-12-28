import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Course from './pages/Course.jsx';
import Lesson from './pages/Lesson.jsx';
import CreateLesson from './pages/CreateLesson.jsx';
import EditLesson from './pages/EditLesson.jsx';
import ShowLessons from './pages/ShowLessons.jsx';
import ShowQuestions from './pages/ShowQuestions.jsx';
import CreateQuestion from './pages/CreateQuestion.jsx';
import EditQuestion from './pages/EditQuestion.jsx';

const router = createBrowserRouter([
{
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/Cfsh12-Rghs-Exbcuw-Aas-Tpomdh-Eqa-Lvcxxw-Efdsh-Suic-Sqwas-Offas-Ngdfhg",
            element: <CreateLesson />
        },
        {
            path: "/Cfghsd-Rdas32-E212-Axza-Trtyc-E423cxz-Qdas-Udascxz-Eass-Sfdggf-Tsdfs-Isa-Oadcz-Nsads",
            element: <CreateQuestion />
        },
        {
            path: "/Eewu29h-D12dr-Ids93-Tdl3o-Lalsu7-Edajsh67-Svcnzx-Steyuq-O000-Ndhjady/:id",
            element: <EditLesson />
        },
        {
            path: "/Eecas-Da12s-I6t5-Tzxda-Q657h-U1a7k-Edase-Sgf8tre-Tsas3b-Ida-O3489-Nsadar321da/:id",
            element: <EditQuestion />
        },
        {
            path: "/Sfghhg-Hbgow-Omv-Wmkdsj-Lfdsj-Ee-Scsdwes-Scsfsov-Odsg-Ngdfs",
            element: <ShowLessons />
        },
        {
            path: "/Sbcjzhk-Hfsg-Ods93-Wbvcnz91-Qczx-23nz-Udak-E09czcx82-Sbzouen45-Txz-I12345-Ozxxfr-Nsa56",
            element: <ShowQuestions />
        },
        {
            path: "/about",
            element: <About />
        },
        {
            path: "/contact",
            element: <Contact />
        },
        {
            path: "/courses/:id",
            element: <Course />
        },
        {
            path: "/lessons/:id",
            element: <Lesson />
        },
    ]
}])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
    </StrictMode>,
)
