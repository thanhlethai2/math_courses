import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import FormData from 'form-data'
import AdminLoginContext from '../AdminLoginContext'
import { toast } from 'react-toastify';

const toast_config = {
    position: toast.TOP_RIGHT,
    autoClose: 3000, // milliseconds
}

const EditLesson = () => {

    const arr = window.location.href.split("/")
    const id = arr[arr.length - 1]
    const [lesson, setLesson] = useState({})
    const { isAdminLogin, setIsAdminLogin } = useContext(AdminLoginContext)
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()
    const [course_id, setCourseId] = useState(lesson.course_id)
    const [name, setLessonName] = useState(lesson.name)
    const [content, setLessonContent] = useState(lesson.content)
    const [status, setLessonStatus] = useState(lesson.status)
    const [pdfFile, setPdfFile] = useState(null)

    useEffect(() => {

        setIsAdminLogin(true)

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
            const url = `/api/courses`
            await fetch(url).then(res => res.json()).then((data) => {
                setCourses(data)
            })
        }
        fetchCourse()

    }, [])

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };
    
    const handleCancel = () => {
        navigate('/Sfghhg-Hbgow-Omv-Wmkdsj-Lfdsj-Ee-Scsdwes-Scsfsov-Odsg-Ngdfs')
    }

    const deleteFile = async (filename) => {
        try {
            const response = await fetch(`http://localhost:5172/delete-file?filename=${filename}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message, toast_config)
            } else {
                toast.error(result.message, toast_config)
            }
        } catch (error) {
            toast.error('Error deleting file: ' + error, toast_config)
        }
    }

    const update = async (e) => {

        e.preventDefault();

        let pdf_file = ''

        if (pdfFile != null) {
            //-- Delete old pdf file
            lesson.pdf_file != null && deleteFile(lesson.pdf_file)
            //-- Insert new pdf file
            const formData = new FormData();
            formData.append('pdf', pdfFile);
            
            try {
                await axios.post('http://localhost:5172/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then((res) => pdf_file = res.data.file.filename)
            } catch (error) {
                toast.error('Error uploading file: ' + error, toast_config)
            }
        }

        const url = `/api/lessons/${id}`
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let data = {}
        if (pdfFile != null) {
            data = {course_id, name, content, pdf_file, status}
        } else {
            data = {course_id, name, content, status}
        }
        await fetch(url, {
            headers: myHeaders,
            method: "PUT",
            body: JSON.stringify(data),
        })
        .then(() => toast.success("Lesson updated successfully.", toast_config))
        .catch((error) => toast.error(error, toast_config))
        
        navigate('/Sfghhg-Hbgow-Omv-Wmkdsj-Lfdsj-Ee-Scsdwes-Scsfsov-Odsg-Ngdfs')

    }

    return (
        <div>
            <div className='py-16 bg-black text-center text-white px-4'>
                <h2 className='text-5xl lg:text-7xl leading-snug font-bold mt-16'>Edit Lesson Page</h2>
            </div>
            <div className='my-8 flex flex-col lg:flex-row gap-12'>
                <div className='lg:w-1/5'>&nbsp;</div>
                <div className='lg:w-3/5'>
                    <form onSubmit={update}>
                        {/* Course */}
                        <div className="col-span-full">
                            <label htmlFor="course_id" className="block text-xl font-medium text-gray-900">
                                Courses
                            </label>
                            <div className="mt-2 grid grid-cols-1 text-xl">
                                <select
                                    id="course_id"
                                    name="course_id"
                                    autoComplete="course-id"
                                    value={lesson.course_id}
                                    onChange={(e) => setCourseId(e.target.value)}
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                >
                                {
                                    courses.map((course) =>
                                        <option key={course.id} value={course.id} >
                                            {course.name}
                                        </option>
                                    )               
                                }
                                </select>
                            </div>
                        </div>

                        {/* Lesson name */}
                        <div className="col-span-full mt-4">
                            <label htmlFor="name" className="block text-xl font-medium text-gray-900">
                                Lesson Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={(e) => setLessonName(e.target.value)}
                                    autoComplete="name"
                                    defaultValue={lesson.name}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                />
                            </div>
                        </div>

                        {/* Lesson Content */}
                        <div className="col-span-full mt-4">
                            <label htmlFor="content" className="block text-xl font-medium text-gray-900">
                                Lesson Short Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="content"
                                    name="content"
                                    onChange={(e) => setLessonContent(e.target.value)}
                                    defaultValue={lesson.content}
                                    rows={3}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                />
                            </div>
                        </div>

                        {/* Lesson pdf_file */}
                        <div className="col-span-full mt-4">
                            <label htmlFor="name" className="block text-xl font-medium text-gray-900">
                                Lesson Content in PDF
                            </label>
                            <div className="mt-2">
                                <input
                                    id="pdf_file"
                                    name="pdf_file"
                                    type="file"
                                    onChange={(e) => handleFileChange(e)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                />
                            </div>
                        </div>

                        <div className='lg:flex flex-row'>
                            <div className='lg:w-1/2'>
                                {/* Status */}
                                <fieldset className='mt-4'>
                                    <legend className="text-xl font-semibold text-gray-900">Status</legend>
                                    <div className="mt-2 space-y-2 flex flex-col lg:flex-row">
                                        <div className="flex items-center gap-x-3 pr-8 mt-2">
                                            <input
                                                checked={lesson.status === 'on' ? true : false}
                                                id="status_on"
                                                name="status"
                                                type="radio"
                                                onChange={(e) => setLessonStatus(e.target.value)}
                                                value="on"
                                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                            />
                                            <label htmlFor="status_on" className="block text-md font-medium text-gray-900">
                                                On
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                checked={lesson.status === 'off' ? true : false}
                                                id="status_off"
                                                name="status"
                                                type="radio"
                                                onChange={(e) => setLessonStatus(e.target.value)}
                                                value="off"
                                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                            />
                                            <label htmlFor="status_off" className="block text-md font-medium text-gray-900">
                                                Off
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className='lg:w-1/2'>
                                {/* Buttons */}
                                <div className="mt-12 flex items-center justify-end gap-x-6">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleCancel()}
                                        className="rounded-md bg-cyan-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='lg:w-1/5'>&nbsp;</div>
            </div>
        </div>
    )
}

export default EditLesson