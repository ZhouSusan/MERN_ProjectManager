import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import style from "./style.css"
import 'bootstrap/dist/css/bootstrap.css';
const Main = (props) => {

    const history = useHistory();
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/user/isUserAuth", {
            method: 'POST',
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.username)
                console.log("User Auth response", data)
                return data.isLoggedIn ? null : history.push("/login")
            })
    }, [])

    //This gets the All projects from DB
    useEffect(() => {
        fetch("http://localhost:8000/api/projects", {
            method: 'GET',
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                //console.log("Response is: ", data)
                setProjects(data);
            })
    }, [])

    // DELETE
    const deleteProject = (deleteId) => {
        console.log(deleteId);

        if (window.confirm("really?")) {
            fetch("http://localhost:8000/api/projects/" + deleteId, {
                method: 'DELETE',
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            })
                //Todo: push to projectid
                .then(a => history.push(`/projects`));


        }
    }
    function calculateProgress() {
        let completedCount = 0;
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].status) {
                completedCount += 1;
            }
        }
        let progress = (completedCount / projects.length) * 100
        console.log(progress)
        return progress;
    }
    // calculateProgress();

    function filterProjects(e) {
        e.preventDefault();
        let tempList = []
        var today = new Date();
        if (e.target.value === "quarter") {
            tempList = projects.filter(p => {
                let tempDate = new Date(p.dueDate)
                let result = (tempDate.getTime() - today.getTime()) / (1000 * 3600 * 24) < 90;
                console.log(result)
                return result
            })
        }
        if (e.target.value === "priority") {

            console.log("Projects", projects)
            let highP = projects.filter(p => p.priority === "High");
            let midP = projects.filter(p => p.priority === "Medium");
            let lowP = projects.filter(p => p.priority === "Low");
            tempList = [...highP, ...midP, ...lowP];
        }
        console.log("Temp List", tempList)
        setFilteredProjects(tempList)
    }




    return (
        <>
            <div className='topbar'>
                <h1>Task Manager</h1>
                <div className='topRight'>
                    <button className='btn btn-info btn-outline-dark'><Link to="/profile">Home</Link></button>
                    <button className='btn btn-info btn-outline-dark'>
                        <Link to="/logOut">Log Out</Link>
                    </button>

                </div>
            </div>
            <div className="MidControl">
                <div className='welcome'>
                    <h2>Welcome {user}</h2>

                </div>
                <div className='mid1'>
                    <div className='filter'>
                        <label htmlFor="sorted">sorted/Filtered by:</label>
                        <select name="sorted" id="sorted" selc onChange={filterProjects} >
                            <option value="default">-----</option>
                            <option value="quarter" >Due in 90 days</option>
                            <option value="priority">Priority - high to low</option>
                        </select>
                    </div>
                    <Link to="/projects/new" className='btn btn-success'>Create A New Project</Link>
                </div>
                <div className='progressbar'>
                    Your progress: {calculateProgress()} %
                </div>
            </div>
            <div className='ongoing-proj proj-list'>
                <h3>Display all the ongoing Projects</h3>

                {
                    (filteredProjects.length > 0) ?
                        (filteredProjects.map((project, idx) => {
                            return (
                                // <div className='projectCard d-flex'  >
                                    <table class='table'>
                                        <tbody>
                                            <tr key={project._id}>
                                                <td>
                                                    <Link to={"/projects/" + project._id} className='bLink'>{project.projectName}</Link>
                                                </td>
                                                <td>

                                                    <Link to={"/projects/" + project._id + "/edit"} className='btn btn-warning'>Edit</Link>
                                                    <button className='btn btn-danger' onClick={() => deleteProject(project._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>


                                // </div>
                            )
                        })) : (projects.map((project, idx) => {
                            return (
                                // <div className='projectCard '  >
                                    <table className='table'>
                                        <tbody>
                                            <tr key={project._id}>
                                                <td>
                                                    <Link to={"/projects/" + project._id} className='bLink'>{project.projectName}</Link>

                                                </td>
                                                <td >
                                                    <Link to={"/projects/" + project._id + "/edit"} className='btn btn-warning'>Edit</Link>
                                                    <button className='btn btn-danger' onClick={() => deleteProject(project._id)}>Delete</button>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                // </div>
                            )
                        }))
                }
            </div>
            <div className='complete-proj proj-list'>
                <h3>Display all the completed Projects</h3>
                {
                    projects.map((project, idx) => {

                        return (
                            (project.status) ?
                                (<div className='projectCard' key={project._id} >
                                    <h5>
                                        <Link to={"/projects/" + project._id} className='bLink'>{project.projectName}</Link>
                                    </h5>
                                </div>) : null
                        )
                    })
                }
            </div>
        </>
    )
}

export default Main;