import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext';


const NavBar = () => {
    const { logout, isLogin } = useContext(AuthContext)

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Itransition Task 3</Navbar.Brand>          
                {
                    isLogin
                        ?
                        <Nav>
                            <Nav.Link onClick={logout}>Sign out</Nav.Link>
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link>Sign in</Nav.Link>
                        </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;