import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MathJax } from 'better-react-mathjax'
import { FaGreaterThan } from "react-icons/fa";

const Lesson = () => {

    const arr = window.location.href.split("/")
    const id = arr[arr.length - 1]
    const [lesson, setLesson] = useState({})
    const [lessons, setLessons] = useState([])
    const [courseName, setCourseName] = useState('')

    useEffect(() => {

        async function fetchLesson() {
            const url = `/api/lessons/${id}`
            await fetch(url).then(res => res.json()).then((d) => {
                setLesson(d[0])
            })
        }

        fetchLesson()

    }, [])

    useEffect(() => {

        async function fetchCourse() {
            if (typeof(lesson.course_id) === 'undefined') return;
            const url = `/api/courses/${lesson.course_id}`
            await fetch(url).then(res => res.json()).then((d) => {
                setCourseName(d[0].name)
            })
        }
        async function fetchLessons() {
            await fetch(`/api/lessons`)
                .then(res => res.json())
                .then((data) => data.filter((dd) => dd.course_id === lesson.course_id))
                .then((data) => data.sort((a,b) => a.name.localeCompare(b.name)))
                .then((data) => setLessons(data))                
        }

        fetchCourse()
        fetchLessons()

    }, [lesson])


    return (
        <div>
            <div className='py-20 bg-black text-center text-white px-4'>
                <h2 className='text-5xl lg:text-7xl text-orange-500 leading-snug font-bold mt-5'>
                { courseName }
                </h2>
            </div>
            <div className='my-12 flex flex-col md:flex-row ml-16'>
                <div className='lg:w-3/4 text-xl'>
                    <MathJax>
                        <div className='text-blue-700 text-center text-3xl mb-8'>
                            {lesson.name}
                        </div>
                    </MathJax>
                    <MathJax>
                        <div className='text-xl mb-8'>
                            {lesson.content}
                        </div>
                    </MathJax>
                    {
                        lesson.pdf_file != null && <object data={`http://localhost:5172/uploads/${lesson.pdf_file}`} type="application/pdf" width="100%" height="700vh"></object>
                    }
                </div> 
                
                <div className='lg:w-1/4 ml-8'>
                    <p className='mt-3 mb-2 text-xl text-gray-600'>Lessons</p>
                    <hr/>
                    <div className='text-gray-500 ml-6'>
                    {
                        lessons.map((les) => (les.id !== lesson.id) 
                            ?
                            <Link reloadDocument={true} to={`/lessons/${les.id}`} key={les.id}>
                                <div className='flex flex-row my-2'>
                                    <div className='mr-3 mt-2'><FaGreaterThan /></div>
                                    <div className='hover:text-orange-500 text-sm my-1'>
                                        {les.name}
                                    </div>
                                </div>
                            </Link>
                            : 
                            <div className='flex flex-row my-2'>
                                <div className='mr-3 mt-2'><FaGreaterThan /></div>
                                <div className='text-sm my-1 font-semibold text-blue-700'>
                                    {les.name}
                                </div>
                            </div>
                        )
                    }
                    </div>
                    <hr/> 
                </div>
            </div>
        </div>
    )
}

export default Lesson


