import React, { useEffect, useState } from 'react'
import { MathJaxContext, MathJax } from 'better-react-mathjax'

const Lesson = () => {

    const arr = window.location.href.split("/")
    const id = arr[arr.length - 1]
    const [lesson, setLesson] = useState({})
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

        fetchCourse()

    }, [lesson])


    return (
        <div>
            <div className='py-20 bg-black text-center text-white px-4'>
                <h2 className='text-5xl lg:text-7xl text-orange-500 leading-snug font-bold mt-5'>
                { courseName }
                </h2>
            </div>
            <div className='my-12 flex flex-col md:flex-row'>
                <div className='lg:w-1/5'>&nbsp;</div>
                <div className='lg:w-3/5 text-xl'>
                    <MathJaxContext>
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
                    </MathJaxContext>
                {
                    lesson.image != null && <object data={`/src/assets/docs/${lesson.image}`} type="application/pdf" width="100%" height="700vh"></object>
                } 

                </div>
                <div className='lg:w-1/5'>&nbsp;</div>
            </div>
        </div>
    )
}

export default Lesson
