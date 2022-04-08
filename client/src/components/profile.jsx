import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


export function Profile() {
    const history = useHistory();
    const [projects, setProjects] = useState([]);
    //const [isLoaded, setIsLoaded] = useState(false);
    //This verifies that the user is logged
    useEffect(() => {
        fetch("/user/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("User Auth response", data)
                return data.isLoggedIn ? null : history.push("/")
            })
    }, projects)
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
                console.log("Response is: ", data)
                setProjects(data);
            })
    }, [])

    return (
        <div>
            <div className='topbar'>
                <h1>Task Manager</h1>
                <div className='topRight'>
                    <Link className='btn btn-primary' to="/profile">Home</Link>
                    <Link className='btn btn-danger' to="/logOut">Log Out</Link>
                </div>
            </div>
            {
                projects.map((project, i) => {
                    return (
                        <div className='projectCard mx-auto m-3' key={i}>
                            <h1>{project.projectName}</h1>
                            <p>{project.description}</p>
                            <div>
                                <Link to={"/projects/" + project._id}>View Project</Link><span> || </span>
                                <Link to={"/projects/" + project._id + "/edit"}>Edit Project</Link>
                            </div>
                        </div>
                    )
                })
            }
            <div className='text-center'>
                <Link className='btn btn-primary' to="/projects/new">Create a New Project</Link>
            </div>
        </div>

    )
}