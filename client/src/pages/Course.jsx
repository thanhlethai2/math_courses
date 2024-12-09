import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Course = () => {

    const arr = window.location.href.split("/")
    const id = arr[arr.length - 1]
    const [data, setData] = useState({})
    const [lessons, setLessons] = useState([])

    useEffect(() => {

        async function fetchCourse() {
            const url = `/api/courses/${id}`
            await fetch(url).then(res => res.json()).then((d) => {
                setData(d[0])
            })
        }
        async function fetchLessons() {
            const url = `/api/lessons`
            await fetch(url).then(res => res.json()).then((d) => {
                const da = d.filter((dd) => dd.course_id === data.id)
                setLessons(da)
            })
        }

        fetchCourse()
        fetchLessons()

    }, [data])


    return (
        <div>
            <div className='py-40 bg-black text-center text-white px-4'>
                <h2 className='text-5xl lg:text-7xl leading-snug font-bold mt-5'>Single Course Page</h2>
                <h3 className='text-3xl lg:text-5xl mt-4 text-gray-400'>{data.name}&nbsp;-&nbsp;{data.code}</h3>
            </div>
            <div className='lg:flex'>
                <div  className='lg:w-1/5'>&nbsp;</div>
                <div className='lg:w-3/5'>
                    <div className='my-12 flex flex-col md:flex-row gap-12'>
                        <div className='lg:w-2/5'>
                            <img src={`/src/assets/images/${data.image}`} alt="" className='w-full mx-auto rounded' />
                        </div>
                        <div className='lg:w-3/5'>
                            <p className='mb-3 text-2xl text-gray-600'>Description</p>
                            <div className='text-base text-gray-500'>
                                <p>{data.description}</p>
                            </div>
                            <p className='mt-3 mb-2 text-2xl text-gray-600'>Lessons</p>
                            <ul className='text-gray-500 ml-6'>
                            {
                                lessons.map((lesson) => 
                                <Link to={`/lessons/${lesson.id}`} key={lesson.id}>
                                    <div className='hover:text-orange-500'>
                                        +&nbsp;{lesson.name}
                                    </div>
                                </Link>)
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                <div  className='lg:w-1/5'>&nbsp;</div>
            </div>
        </div>
    )
}

export default Course