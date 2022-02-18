import React, { useState, useContext } from 'react';
import { BrowserRouter, Switch, Route, Link, useHistory } from 'react-router-dom'
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import './style.css'


const AuthPage = () => {
    const history = useHistory()

    const [form, setForm] = useState({
        email: '',
        name: '',
        password: '',
        date: new Date().toLocaleDateString()
    })

    const { login } = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const regHandler = async () => {
        try {
            await axios.post('/api/auth/reg', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            history.push('/')
        } catch (err) { alert("Data entry error") }
    }

    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.data.userStatus === true) {
                        alert("Block")
                        history.push('/login')
                        login(!response.data.token, !response.data.userId)
                    }
                    else {
                        login(response.data.token, response.data.userId)
                    }

                    if (!response.data.token) {
                        alert("Incorrect data!")
                    }
                })
        } catch (err) { console.log(err) }
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <Container className="d-flex justify-content-center align-items-center"
                        style={{ height: window.innerHeight - 54 }} >
                        <Card className="p-5 card-style">
                            <h2 className="m-auto mb-5">Authorization</h2>
                            <Form className="d-flex flex-column" onSubmit={e => e.preventDefault()}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="email"
                                    name="email"
                                    placeholder="Enter email..."
                                    onChange={changeHandler}
                                />
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password..."
                                    onChange={changeHandler}
                                />
                                <Link to="/reg">Don't have an account?</Link>
                                <Button
                                    variant="outline-dark"
                                    className="button-custom-style"
                                    onClick={loginHandler}
                                >
                                    Sign in
                                </Button>
                            </Form>
                        </Card>
                    </Container>
                </Route>

                <Route path="/reg">
                    <Container className="d-flex justify-content-center align-items-center"
                        style={{ height: window.innerHeight - 54 }} >
                        <Card className="p-5 card-style">
                            <h2 className="m-auto mb-5">Registration</h2>
                            <Form className="d-flex flex-column" onSubmit={e => e.preventDefault()}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="email"
                                    name="email"
                                    placeholder="Enter email..."
                                    onChange={changeHandler}
                                />
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="name"
                                    name="name"
                                    placeholder="Enter name..."
                                    onChange={changeHandler}
                                />
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="password"
                                    name="password"
                                    placeholder="Enter пароль..."
                                    onChange={changeHandler}
                                />
                                <Link to="/login">Have an account?</Link>
                                <Button
                                    variant="outline-dark"
                                    className="button-custom-style"
                                    onClick={regHandler}
                                >
                                    Register
                                </Button>
                            </Form>
                        </Card>
                    </Container>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default AuthPage;