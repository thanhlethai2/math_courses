import React, { useEffect, useState } from 'react'

const Lesson = () => {

    const arr = window.location.href.split("/")
    const id = arr[arr.length - 1]
    const [lesson, setLesson] = useState({})

    useEffect(() => {

        async function fetchLessons() {
            const url = `/api/lessons/${id}`
            await fetch(url).then(res => res.json()).then((d) => {
                setLesson(d[0])
            })
        }

        fetchLessons()

    }, [])


    return (
        <div>
            <div className='py-20 bg-black text-center text-white px-4'>
                <h2 className='text-5xl lg:text-7xl text-orange-500 leading-snug font-bold mt-5'>{lesson.name}</h2>
            </div>
            <div className='my-12 flex flex-col md:flex-row gap-12'>
                <div className='lg:w-1/5'>&nbsp;</div>
                <div className='lg:w-3/5 text-xl'>
                        {lesson.content}



                </div>
                <div className='lg:w-1/5'>&nbsp;</div>
            </div>
        </div>
    )
}

export default Lesson
