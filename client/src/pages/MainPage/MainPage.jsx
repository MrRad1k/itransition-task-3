import axios from 'axios';
import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import DataTable from '../../components/DataTable/DataTable';
import './style.css'


export default class MainPage extends Component {
    constructor() {
        super();
        this.state = { usersCollection: [] };
    }

    componentDidMount() {
        axios.get('/api/auth')
            .then(res => {
                this.setState({ usersCollection: res.data });
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    dataTable() {
        return this.state.usersCollection.map((data, i) => {
            return <DataTable obj={data} key={i} checked={this.state.checked} />;
        });
    }

    render() {
        return (
            <Container>
                <h1 className='mt-4 mb-5'>Users</h1>
                <Table striped bordered hover variant="white" >
                    <thead>
                        <tr>
                            <th style={{ width: "250px" }}>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.dataTable()}
                    </tbody>
                </Table>
            </Container>
        );
    };
}