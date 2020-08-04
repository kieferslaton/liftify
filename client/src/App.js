import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'
import { Container, Navbar, Nav, Button, Modal } from 'react-bootstrap'
import './App.scss';
import logo from './logo.png'

import Login from './components/Login'
import Register from './components/Register'
import Workout from './components/Workout'
import FrontPage from './components/FrontPage'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [user, setUser] = useState()
  const [token, setToken] =useState(Cookies.get('token'))

  useEffect(() => {
    if(token){
      console.log('token found')
      const payload = {headers: { authorization: token}}
      axios.post('/users/accounts', {}, payload).then(res => setUser(res.data)).catch(err => console.log(err.status))
    }
  }, [])

  const handleSuccessfulLogin = (token) => {
    const payload = {headers: {authorization: token}}
    axios.post('/users/accounts', {}, payload).then(res => {
      console.log(res.data)
      setUser(res.data)
      setIsLogin(false)
      setIsRegister(false)
      Cookies.set('token', token)
    }).catch(err => console.log(err.status))
  }

  const handleLogout = (token) => {
      setUser('')
      Cookies.remove('token', token)
  }

  return (
    <>
    <Navbar variant="dark" className="navbar mx-0 pr-0 py-0">
        <Navbar.Brand className="font-weight-bold p-0 my-0"><img className='logo' src={logo} /></Navbar.Brand>
        <Navbar.Collapse className="mx-0 py-0 my-0">
        <Nav className="ml-auto my-0 py-0">
          {user ?
          <Button className="nav-button my-0" onClick={() => handleLogout(token)}>Logout</Button>:
          <>
          <Button className="nav-button my-0" onClick={() => setIsLogin(true)}>Login</Button>
          <Button className="nav-button my-0" onClick={() => setIsRegister(true)}>Register</Button>
          </>
}     
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    <Container className="w-100 mw-100 m-0 p-0">
      {user ?
      <Workout user={user} />:
      <FrontPage />}
    </Container>
    <Modal show={isLogin} onHide={() => setIsLogin(false)}>
      <Modal.Header closeButton><h3 className="header p-0 m-0">Login</h3></Modal.Header>
      <Modal.Body>
        <Login handleSuccessfulLogin={handleSuccessfulLogin} />
      </Modal.Body>
    </Modal>
    <Modal show={isRegister} onHide={() => setIsRegister(false)}>
      <Modal.Header closeButton><h3 className="header p-0 m-0">Register</h3></Modal.Header>
      <Modal.Body>
        <Register handleSuccessfulLogin={handleSuccessfulLogin}/>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default App;
