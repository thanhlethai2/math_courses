import React, { useState, useEffect, useContext } from 'react'
// import axios from 'axios';
import { useNavigate } from 'react-router-dom'
// import FormData from 'form-data'
import AdminLoginContext from '../AdminLoginContext'
import { toast } from 'react-toastify';

const toast_config = {
    position: toast.TOP_RIGHT,
    autoClose: 3000, // milliseconds
}

const EditQuestion = () => {

    const arr = window.location.href.split("/")
    const id = arr[arr.length - 1]
    const { isAdminLogin, setIsAdminLogin } = useContext(AdminLoginContext)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [lessons, setLessons] = useState([])
    const [question, setQuestion] = useState({})
    const [course_id, setCourseId] = useState(question.course_id)
    const [lesson_id, setLessonId] = useState(question.lesson_id)
    const [stem, setStem] = useState(question.stem)
    const [answer, setAnswer] = useState(question.answer)
    const [alt1, setAlt1] = useState(question.alt1)
    const [alt2, setAlt2] = useState(question.alt2)
    const [alt3, setAlt3] = useState(question.alt3)
    const [alt4, setAlt4] = useState(question.alt4)
    const [image, setImage] = useState(null)
    const [status, setQuestionStatus] = useState('on')
    const [type, setType] = useState('MC5')

    //-- Get question with id from DB
    useEffect(() => {

        setIsAdminLogin(true)

        async function fetchQuestion() {
            const url = `/api/questions/${id}`
            await fetch(url).then(res => res.json()).then((data) => {
                setQuestion(data[0])
            })
        }

        fetchQuestion()

    }, [])

    //-- Get courses from DB
    useEffect(() => {

        async function fetchCourses() {
            const url = `/api/courses`
            await fetch(url).then(res => res.json()).then((data) => {
                setCourses(data)
            })
        }

        fetchCourses()

    }, [])
    
    //-- Get lesson from DB, depending on question.
    useEffect(() => {

        if (course_id === 0) return;

        async function fetchLessons() {
            const url = `/api/lessons`
            await fetch(url).then(res => res.json()).then((data) => {
                setLessons(data.filter((da) => da.course_id == question.course_id))
            })
        }

        fetchLessons()

    }, [course_id, question])

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };    

    const handleCancel = () => {
        navigate("/Sbcjzhk-Hfsg-Ods93-Wbvcnz91-Qczx-23nz-Udak-E09czcx82-Sbzouen45-Txz-I12345-Ozxxfr-Nsa56")
    }

    const save = async (e) => {

        e.preventDefault();
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const data = {lesson_id, stem, answer, alt1, alt2, alt3, alt4, status}
        await fetch('/api/questions', {
            headers: myHeaders,
            method: "POST",
            body: JSON.stringify(data),
        })
        .then(() => toast.success("Lesson created successfully.", toast_config))
        .catch((error) => toast.error(error, toast_config))
        
        navigate('/Sbcjzhk-Hfsg-Ods93-Wbvcnz91-Qczx-23nz-Udak-E09czcx82-Sbzouen45-Txz-I12345-Ozxxfr-Nsa56')
    }

    return (
        <div>
            <div className='py-16 bg-black text-center text-white px-4'>
                <h2 className='text-5xl lg:text-7xl leading-snug font-bold mt-16'>Create Question Page</h2>
            </div>
            <div className='my-8 flex flex-col lg:flex-row gap-12'>
                <div className='lg:w-1/5'>&nbsp;</div>
                <div className='lg:w-3/5'>
                    <form onSubmit={save}>
                        {/* Courses and Lessons */}
                        <div className='flex flex-row gap-x-6'>
                            <div className="w-1/2 col-span-full">
                                <label htmlFor="course_id" className="block text-xl font-medium text-gray-900">
                                    Courses
                                </label>
                                <div className="mt-2 grid grid-cols-1 text-xl">
                                    <select
                                        id="course_id"
                                        name="course_id"
                                        autoComplete="course-id"
                                        // defaultValue={question.course_id}
                                        onChange={(e) => setCourseId(e.target.value)}
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    >
                                    {
                                        courses.map((course) =>
                                            <option key={course.id} value={course.id} selected={course.id == question.course_id ? true : false}>
                                                {course.name}
                                            </option>
                                        )
                                    }
                                    </select>
                                </div>
                            </div>
                            <div className="w-1/2 col-span-full">
                                <label htmlFor="lesson_id" className="block text-xl font-medium text-gray-900">
                                    Lessons
                                </label>
                                <div className="mt-2 grid grid-cols-1 text-xl">
                                    <select
                                        id="lesson_id"
                                        name="lesson_id"
                                        autoComplete="lesson-id"
                                        // defaultValue={question.lesson_id}
                                        onChange={(e) => setLessonId(e.target.value)}
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    >
                                    {
                                        lessons.map((les) =>
                                            <option key={les.id} value={les.id} selected={les.id == question.lesson_id ? true : false}>
                                                {les.name}
                                            </option>
                                        )               
                                    }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row gap-x-6'>
                            {/* Question Stem */}
                            <div className="w-1/2 col-span-full mt-4">
                                <label htmlFor="stem" className="block text-xl font-medium text-gray-900">
                                    Question Stem
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="stem"
                                        name="stem"
                                        defaultValue={question.stem}
                                        onChange={(e) => setStem(e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    />
                                </div>
                            </div>
                            {/* Correct Answer */}
                            <div className="w-1/2 col-span-full mt-4">
                                <label htmlFor="answer" className="block text-xl font-medium text-gray-900">
                                Correct Answer
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="answer"
                                        name="answer"
                                        defaultValue={question.answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row gap-x-6'>
                            {/* Alt1 */}
                            <div className="w-1/2 col-span-full mt-4">
                                <label htmlFor="alt1" className="block text-xl font-medium text-gray-900">
                                    Alternate 1
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="alt1"
                                        name="alt1"
                                        defaultValue={question.alt1}
                                        onChange={(e) => setAlt1(e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    />
                                </div>
                            </div>
                            {/* Alt2 */}
                            <div className="w-1/2 col-span-full mt-4">
                                <label htmlFor="alt2" className="block text-xl font-medium text-gray-900">
                                    Alternate 2
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="alt2"
                                        name="alt2"
                                        defaultValue={question.alt2}
                                        onChange={(e) => setAlt2(e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-x-6'>
                            {/* Alt3 */}
                            <div className="w-1/2 col-span-full mt-4">
                                <label htmlFor="alt3" className="block text-xl font-medium text-gray-900">
                                    Alternate 3
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="alt3"
                                        name="alt3"
                                        defaultValue={question.alt3}
                                        onChange={(e) => setAlt3(e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    />
                                </div>
                            </div>
                            {/* Alt4 */}
                            <div className="w-1/2 col-span-full mt-4">
                                <label htmlFor="alt4" className="block text-xl font-medium text-gray-900">
                                    Alternate 4
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="alt4"
                                        name="alt4"
                                        defaultValue={question.alt4}
                                        onChange={(e) => setAlt4(e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row gap-x-6'>
                            {/* Question Image */}
                            <div className="w-1/2 col-span-full mt-4">
                                <label htmlFor="image" className="block text-xl font-medium text-gray-900">
                                    Question Image
                                </label>
                                <div className="mt-2">
                                    <input
                                        disabled
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={(e) => handleImageChange(e)}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    />
                                </div>
                            </div>
                            {/* Question TYPE */}
                            <div className="w-1/2 col-span-full mt-4">
                                <label htmlFor="type" className="block text-xl font-medium text-gray-900">
                                    Question Type
                                </label>
                                <div className="mt-2 grid grid-cols-1 text-xl">
                                    <select
                                        disabled
                                        id="type"
                                        name="type"
                                        autoComplete="type"
                                        onChange={(e) => setType(e.target.value)}
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-md"
                                    >
                                        <option value={'MC5'}>Multiple Choice with 5 altenatives</option>
                                        <option value={'MC4'}>Multiple Choice with 4 altenatives</option>
                                        <option value={'TFQ'}>True-False</option>
                                        <option value={'ESS'}>Essay</option>
                                    </select>
                                </div>
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
                                                checked={question.status === 'on' ? true : false}
                                                id="status_on"
                                                name="status"
                                                type="radio"
                                                onChange={(e) => setQuestionStatus(e.target.value)}
                                                value="on"
                                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                            />
                                            <label htmlFor="status_on" className="block text-md font-medium text-gray-900">
                                                On
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                checked={question.status === 'off' ? true : false}
                                                id="status_off"
                                                name="status"
                                                type="radio"
                                                onChange={(e) => setQuestionStatus(e.target.value)}
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
                                {/* Button */}
                                <div className="mt-12 flex items-center justify-end gap-x-6">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Create
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

export default EditQuestion