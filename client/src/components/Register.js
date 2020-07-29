import React, { useState, useEffect} from 'react';
import { Form, Button} from 'react-bootstrap'
import axios from 'axios'

const Register = ({handleSuccessfulLogin}) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [users, setUsers] = useState([]) 
    
    useEffect(() => {
        axios.get('/users').then(res => {
            setUsers(res.data)
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
            setPasswordError(true)
            return
        } else {
            setPasswordError(false)
        axios.post('/users/signup', {
            username: username,
            password: password,
            password2: password2
        }).then(res => {
            console.log(res.data)
            handleSuccessfulLogin(res.data)
        }).catch(err => console.log(err.status))
    }
}

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => {
                    setUsername(e.target.value)
                    if(users.find(user => user.username === e.target.value)){
                        setUsernameError(true)
                    } else {
                        setUsernameError(false)
                    }
                }} />
                <Form.Text className={`${usernameError ? '' : 'd-none'} text-muted`}>Username already taken.</Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword2">
                <Form.Label>Re-Enter Password</Form.Label>
                <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                <Form.Text className={`${passwordError ? '' : 'd-none'} text-muted`}>Passwords don't match. </Form.Text>
            </Form.Group>
            <Button className="accent" type="submit">
                Register
            </Button>
        </Form>
    )
}

export default Register