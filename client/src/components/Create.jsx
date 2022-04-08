import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function Create() {
    const history = useHistory();

    const priorityList = [
                "Low",
                "Medium",
                "High"
            ]
            let displayPos = priorityList;

    async function handleNewProject(e) {
        e.preventDefault();

        const form = e.target;
        const project = {
            projectName: form[0].value,
            description: form[1].value,
            priority: form[2].value,
            dueDate: form[3].value,
            teamMates: form[4].value,
            status: form[5].checked
        }
        console.log(project);

        fetch("http://localhost:8000/api/projects", {
            method: "POST",
            headers : {
                "Content-type" : "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(project)
        })
        history.push("/profile");
    }

    useEffect(() => {
        fetch("/user/isUserAuth", {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/profile") : null)
    }, [])

    return(
        <div>
            <div className='topbar'>
                <h1>Task Manager</h1>
                <div className='topRight'>
                    <Link className='btn btn-primary' to="/profile">Home</Link>
                    <Link className='btn btn-danger' to="/logOut">Log Out</Link>
                </div>
            </div>    
            <form onSubmit={handleNewProject}>
                <table>
                    <tbody>
                        <tr>
                            <td>

                                Project Name:

                            </td>
                            <td>
                                <input required type="text"/>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                Description:
                            </td>
                            <td>
                                <input required type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Priority:
                            </td>
                            <td>
                                <select name="priority" id="priority">
                                    {displayPos.map((po, idx) => <option key={idx} >{po}</option>)}
                                </select><br />

                            </td>
                        </tr>
                        <tr>
                            <td>

                                Due Date:
                            </td>
                            <td>
                                <input required type="date"/>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                TeamMembers:
                            </td>
                            <td>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Status:
                            </td>
                            <td>
                                <input type="checkbox"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='btn btn-success' >Create Project</button>
                </form>
            <button>
                <Link className='btn btn-danger' to="/profile">Cancel</Link>
            </button>
        </div>
    )
}
