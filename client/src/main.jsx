import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Course from './pages/Course.jsx';
import Lesson from './pages/Lesson.jsx';
import CreateLesson from './pages/CreateLesson.jsx';
import ShowLessons from './pages/ShowLessons.jsx';

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
            path: "/create-lesson",
            element: <CreateLesson />
        },
        {
            path: "/Sfghhg-Hbgow-Omv-Wmkdsj-Lfdsj-Ee-Scsdwes-Scsfsov-Odsg-Ngdfs",
            element: <ShowLessons />
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
    </StrictMode>,
)
