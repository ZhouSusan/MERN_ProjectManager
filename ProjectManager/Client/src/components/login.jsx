import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export function Login() {
    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }
        fetch("http://localhost:8000/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("token", data.token)
                console.log("Logged In successfully")
            })
            .then(history.push("/profile"))
            .catch(error =>(console.log(error)))
    }

    useEffect(() => {
        fetch("/user/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? history.push("/profile") : null)
    }, [])

    return (
        <form onSubmit={e => handleLogin(e)}>
            <label>Username: </label><input required type="text" /><br />
            <label>Password: </label><input required type="password" /><br />
            <button type="submit">Log In</button>
        </form>
    )
}