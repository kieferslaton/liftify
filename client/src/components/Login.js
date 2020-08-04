import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap'
import axios from 'axios'

const Login = ({handleSuccessfulLogin}) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/users/login', {
            username: username,
            password: password
        }).then(res => {
            console.log(res.data)
            handleSuccessfulLogin(res.data)
        }).catch(err => console.log(err.status))
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button className="accent" type="submit">
                Log In
            </Button>
        </Form>
    )
}

export default Login