import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import AdminLoginContext from '../AdminLoginContext'
import { FaTrash, FaPencil } from 'react-icons/fa6'
import { toast } from 'react-toastify';

const toast_config = {
    position: toast.TOP_RIGHT,
    autoClose: 3000, // milliseconds
}

const ShowLessons = () => {

    const [lessons, setLessons] = useState([])
    const { isAdminLogin, setIsAdminLogin } = useContext(AdminLoginContext)
    const navigate = useNavigate()

    useEffect(() => {

        setIsAdminLogin(true)

        async function fetchLessons() {
            await fetch("/api/lessons").then(res => res.json()).then((data) => {
                setLessons(data)
            })
        }

        fetchLessons()

    }, [])

    const getCourseName = (id) => {

        const [name, setName] = useState('')

        async function fetchCourse() {
            await fetch(`/api/courses/${id}`).then(res => res.json()).then((data) => {
                setName(data[0].name)
            })
        }
        fetchCourse()
        return name
    }

    const handleCreateLesson = () => {
        navigate('/Cfsh12-Rghs-Exbcuw-Aas-Tpomdh-Eqa-Lvcxxw-Efdsh-Suic-Sqwas-Offas-Ngdfhg')
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

    const handleDeleteLesson = async (id) => {
        if (confirm(`Deleting lesson with id = ${id}?`)) {
            const lesson = lessons.find((les) => id === les.id)
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            await fetch(`/api/lessons/${id}`, {
                headers: myHeaders,
                method: "DELETE",
            })
            .then(() => toast.success("Lesson deleted successfully.", toast_config))
            .catch((error) => toast.error(error, toast_config))
            //-- Delete old pdf file
            lesson.pdf_file != null && deleteFile(lesson.pdf_file)
            navigate(0)
        }
    }

    const handleEditLesson = (id) => {
        // const ret = confirm(`Edit lesson with id = ${id}?`)
        // if (ret) {
        navigate(`/Eewu29h-D12dr-Ids93-Tdl3o-Lalsu7-Edajsh67-Svcnzx-Steyuq-O000-Ndhjady/${id}`)
        // }
    }

    const handleShowQuestion = () => {
        navigate("/Sbcjzhk-Hfsg-Ods93-Wbvcnz91-Qczx-23nz-Udak-E09czcx82-Sbzouen45-Txz-I12345-Ozxxfr-Nsa56")
    }

    // Define columns
    const columns = [
        {
            name: 'Id',
            selector: row => row.id, // Access the `id` property
            sortable: true,
            width: '80px'
        },
        {
            name: 'Course Name',
            selector: row => getCourseName(row.course_id), // Access the `course_id` property
            sortable: false,
            width: '180px'
        },
        {
            name: 'Name',
            selector: row => row.name, // Access the `name` property
            sortable: false,
            width: '250px'
        },
        {
            name: 'Content',
            selector: row => row.content, // Access the `content` property
            sortable: false,
            width: '400px'
        },
        {
            name: 'Pdf_File',
            selector: row => row.pdf_file, // Access the `pdf_file` property
            sortable: false,
            width: '160px'
        },
        {
            name: 'Status',
            selector: row => row.status, // Access the `pdf_file` property
            sortable: false,
            width: '120px'
        },
        {
            name: 'Actions',
            cell: row => <div>
                <button onClick={() => handleEditLesson(row.id)}><FaPencil className='text-yellow-500'/></button>
                &nbsp;&nbsp;
                <button onClick={() => handleDeleteLesson(row.id)}><FaTrash className='text-red-500'/></button>
            </div>,
            ignoreRowClick: true, // Prevent triggering row selection on click
            // allowOverflow: true,
            // button: true,
          },
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '40px', // Set row height
            },
        },
        headCells: {
            style: {
                backgroundColor: '#f4f4f4',
                color: 'darkcyan',
                fontWeight: 'bold',
                fontSize: '12pt'
            },
        },
    };
      
    return (
        <div className='py-24 px-6 w-[100%]'>
            <div className='mx-auto flex justify-between items-center'>
                <div>
                    <h1 className='text-3xl my-4 font-bold text-orange-500'>Lesson List</h1>
                </div>
                <div>
                    <button className='bg-cyan-700 text-white hover:bg-cyan-500 px-6 py-2 rounded transition-all ease-in mr-2' onClick={() => handleCreateLesson()}>Create Lesson</button>
                    <button className='bg-blue-700 text-white hover:bg-blue-500 px-6 py-2 rounded transition-all ease-in' onClick={() => handleShowQuestion()}>Show Questions</button>
                </div>
            </div>

            <DataTable
                // title="Course List"
                columns={columns}   // Define the columns
                data={lessons}      // Pass the data
                pagination          // Enable pagination
                highlightOnHover    // Highlight rows on hover
                customStyles={customStyles}
            />
        </div>
    ) 
}

export default ShowLessons
