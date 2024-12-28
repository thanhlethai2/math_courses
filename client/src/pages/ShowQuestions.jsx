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

const ShowQuestions = () => {

    const [questions, setQuestions] = useState([])
    const { isAdminLogin, setIsAdminLogin } = useContext(AdminLoginContext)
    const navigate = useNavigate()

    useEffect(() => {

        setIsAdminLogin(true)

        async function fetchQuestions() {
            await fetch("/api/questions").then(res => res.json()).then((data) => {
                setQuestions(data)
            })
        }

        fetchQuestions()

    }, [])

    const getLessonName = (id) => {

        const [name, setName] = useState('')

        async function fetchLesson() {
            await fetch(`/api/lessons/${id}`).then(res => res.json()).then((data) => {
                setName(data[0].name)
            })
        }
        fetchLesson()
        return name
    }

    const handleCreateQuestion = () => {
        navigate("/Cfghsd-Rdas32-E212-Axza-Trtyc-E423cxz-Qdas-Udascxz-Eass-Sfdggf-Tsdfs-Isa-Oadcz-Nsads")
    }
    
    const handleDeleteQuestion = async (id) => {
        if (confirm(`Deleting question with id = ${id}?`)) {
            // const question = questions.find((ques) => id === ques.id)
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            await fetch(`/api/questions/${id}`, {
                headers: myHeaders,
                method: "DELETE",
            })
            .then(() => toast.success("Question deleted successfully.", toast_config))
            .catch((error) => toast.error(error, toast_config))
            navigate(0)
        }
    }

    const handleEditQuestion = (id) => {
        // alert('Edit Question')
        navigate(`/Eecas-Da12s-I6t5-Tzxda-Q657h-U1a7k-Edase-Sgf8tre-Tsas3b-Ida-O3489-Nsadar321da/${id}`)
    }

    const handleShowLessons = () => {
        navigate("/Sfghhg-Hbgow-Omv-Wmkdsj-Lfdsj-Ee-Scsdwes-Scsfsov-Odsg-Ngdfs")
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
            name: 'Lesson Name',
            selector: row => getLessonName(row.lesson_id), // Access the `lesson_id` property
            sortable: false,
            width: '180px'
        },
        {
            name: 'Stem',
            selector: row => row.stem, 
            sortable: false,
            width: '200px'
        },
        {
            name: 'Correct Answer',
            selector: row => row.answer, 
            sortable: false,
            width: '200px'
        },
        {
            name: 'Alt1',
            selector: row => row.alt1, 
            sortable: false,
            width: '200px'
        },
        {
            name: 'Alt2',
            selector: row => row.alt2, 
            sortable: false,
            width: '200px'
        },
        {
            name: 'Alt3',
            selector: row => row.alt3, 
            sortable: false,
            width: '200px'
        },
        {
            name: 'Alt4',
            selector: row => row.alt4, 
            sortable: false,
            width: '200px'
        },
        {
            name: 'Status',
            selector: row => row.status, 
            sortable: false,
            width: '120px'
        },
        {
            name: 'Actions',
            cell: row => <div>
                <button onClick={() => handleEditQuestion(row.id)}><FaPencil className='text-yellow-500'/></button>
                &nbsp;&nbsp;
                <button onClick={() => handleDeleteQuestion(row.id)}><FaTrash className='text-red-500'/></button>
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
                    <h1 className='text-3xl my-4 font-bold text-orange-500'>Question List</h1>
                </div>
                <div>
                    <button className='bg-cyan-700 text-white hover:bg-cyan-500 px-6 py-2 rounded transition-all ease-in mr-2' onClick={() => handleCreateQuestion()}>Create Question</button>
                    <button className='bg-blue-700 text-white hover:bg-blue-500 px-6 py-2 rounded transition-all ease-in' onClick={() => handleShowLessons()}>Show Lessons</button>
                </div>
            </div>

            <DataTable
                // title="Course List"
                columns={columns}   // Define the columns
                data={questions}      // Pass the data
                pagination          // Enable pagination
                highlightOnHover    // Highlight rows on hover
                customStyles={customStyles}
            />
        </div>
    ) 
}

export default ShowQuestions
