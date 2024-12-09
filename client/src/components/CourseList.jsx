import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCodeCommit, FaBookOpen } from 'react-icons/fa6'

const CourseList = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        async function fetchCourses() {
            const url = "/api/courses"
            await fetch(url).then(res => res.json()).then((data) => {
                // console.log(data);
                setCourses(data.filter((course => course.status === 'on')))
            })
        }
        fetchCourses()
    }, [])


    return (
        <div>
            <div className='text-center'>
                <p className='p-4 text-2xl text-inter-500'>Our Objectives</p>
                <p className='p-4 text-5xl text-inter-700'>COURSES</p>
            </div>
            <div className='pl-24 pr-24 justify-between items-center grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
            {
                courses.map((course) => 
                <Link to={`/courses/${course.id}`} key={course.id} className='p-5 shadow-lg rounded cursor-pointer'>
                    <div>
                        <img src={`/src/assets/images/${course.image}`} alt="" className='w-full' />
                    </div>
                    <div className='mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer text-center'>
                        {course.name}
                    </div>
                    <p className='mb-2 text-gray-600'><FaCodeCommit className='mr-2 inline-flex items-center' />{course.code}</p>
                    <p className='mb-2 text-gray-600'><FaBookOpen className='mr-2 inline-flex items-center' />{course.description}</p>
                </Link>)
            }
            </div>
        </div>
    )
}

export default CourseList