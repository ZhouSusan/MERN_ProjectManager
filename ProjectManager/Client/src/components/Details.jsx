import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import style from "./style.css"


const Detail = (props) => {
    const [thisProject, setThisProject] = useState({});
    const { id } = useParams();
    const history = useHistory();
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
    console.log(id);

    useEffect(() => {
        fetch("http://localhost:8000/api/projects/" + id, {
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => { setIsLoaded(true); setThisProject(data); })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/api/tasks/${id}`, {
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => { setIsLoaded2(true); setTasks(data); })
    }, [])

    function handleProjectDelete() {
        fetch("http://localhost:8000/api/projects/" + id, {
            method: 'DELETE',
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            //Todo: push to projectid
            .then(a => history.push(`/profile`));


    }

    return (
        <>
            <div className='topbar'>
                <h1>Project Manager</h1>
                <div className='topRight'>
                    <Link className='btn btn-primary' to="/profile">Home</Link>
                    <Link className='btn btn-danger' to="/logOut">Log Out</Link>
                </div>
            </div>

            <div className='mainDisplay'>
                <br />
                <h2>View One</h2><br />
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Project Name:</td>
                                <td>{thisProject.projectName}</td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>{thisProject.description}</td>
                            </tr>
                            <tr>
                                <td>Priority:</td>
                                <td>{thisProject.priority}</td>
                            </tr>
                            <tr>
                                <td>Due Date:</td>
                                <td>{new Date(thisProject.dueDate).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <td>Team Members:</td>
                                <td>{thisProject.teammates}</td>
                            </tr>
                            <tr>
                                <td>Invite a friend:</td>
                                <td>
                                    <input type="text" />    <button>send</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                {
                                    thisProject.status ? <td>Complete</td> : <td>Ongoing</td>
                                } 
                            
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='task-control'>
                <h3>Tasks for this project:</h3>
                <div className='task-list'>
                    {
                        tasks.map((task, idx) => {
                            return (
                                <div className='taskCard' key={task._id} >
                                    <h5>
                                        <Link to={"/task/" + task._id} className='bLink'>{task.taskName}</Link>
                                    </h5>
                                </div>
                            )
                        })
                    }

                </div>
                <div className='add-task'>
                    <Link to={"/tasks/" + thisProject._id}>Add Task</Link>
                </div>
            </div>
            <div className='edit-delete'>
                <button className='edit-btn'><Link to={"/projects/" + thisProject._id + "/edit"} className='bLink'>Edit</Link></button><button onClick={handleProjectDelete}>Delete</button>
            </div>
        </>
    )
}

export default Detail;

