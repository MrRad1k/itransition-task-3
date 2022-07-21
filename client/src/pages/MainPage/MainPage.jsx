import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

import blockicon from '../../assets/block2.png';
import deleteicon from '../../assets/delete.png';
import unblockicon from '../../assets/unblock.png'
import './style.css'


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            List: [],
            MasterChecked: false,
            SelectedList: [],
        };
    }

    componentDidMount() {
        axios.get('/api/auth')
            .then(res => {
                this.setState({ List: res.data });
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onMasterCheck(e) {
        let tempList = this.state.List;
        tempList.map((user) => (user.isChecked = e.target.checked));
        this.setState({
            MasterChecked: e.target.checked,
            List: tempList,
            SelectedList: this.state.List.filter((e) => e.isChecked),
        });
    }

    onItemCheck(e, item) {
        let tempList = this.state.List;
        tempList.map((user) => {
            if (user._id === item._id) {
                user.isChecked = e.target.checked;
            }
            return user;
        });

        const totalItems = this.state.List.length;
        const totalCheckedItems = tempList.filter((e) => e.isChecked).length;

        this.setState({
            MasterChecked: totalItems === totalCheckedItems,
            List: tempList,
            SelectedList: this.state.List.filter((e) => e.isChecked),
        });
    }

    handleRemove() {
        let tempList = this.state.List;

        tempList.map((user) => {
            if (user.isChecked === true) {
                axios.delete(`/api/auth/${user._id}`)
                    .then(res => {
                        localStorage.removeItem('userData')
                        window.location.reload();
                        this.setState({
                            List: this.state.List.filter((item) => item._id !== user._id)
                        })
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
            return user;
        });
    }

    handleBlock() {
        let tempList = this.state.List;
        tempList.map((user) => {
            if (user.status === false && user.isChecked === true) {
                axios.put(`/api/auth/${user._id}`)
                    .then(res => {
                        user.status = true;
                        localStorage.removeItem('userData')
                        window.location.reload()
                        this.setState({
                            List: this.state.List
                        })
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
            return user
        })
    }

    handleUnblock() {
        let tempList = this.state.List;
        tempList.map((user) => {
            if (user.status === true && user.isChecked === true) {
                axios.put(`/api/auth/${user._id}`)
                    .then(res => {
                        user.status = false;
                        this.setState({
                            List: this.state.List
                        })
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
            return user
        })
    }


    render() {
        return (
            <Container>
                <h1 className='mt-4 mb-5'>Users</h1>

                <ul>
                    <li><img onClick={() => this.handleRemove()} src={deleteicon} width="49%" alt="ico" title="Delete"/></li>
                    <li><img onClick={() => this.handleBlock()} src={blockicon} width="50%" alt="ico" title="Block"/></li>
                    <li><img onClick={() => this.handleUnblock()} src={unblockicon} width="50%" alt="ico" title="Unblock" /></li>
                </ul>

                <Table striped bordered hover variant="white" >
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={this.state.MasterChecked}
                                    id="mastercheck"
                                    onChange={(e) => this.onMasterCheck(e)}
                                />
                            </th>
                            <th style={{ width: "250px" }}>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.List.map((user) => (
                            <tr key={user._id} className={user.isChecked ? "isChecked" : ""}>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={user.isChecked}
                                        className="form-check-input"
                                        id="rowcheck{user._id}"
                                        onChange={(e) => this.onItemCheck(e, user)}
                                    />
                                </th>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.date}</td>
                                <td>
                                    {user.status === false
                                        ?
                                        'Unblock'
                                        :
                                        'Block'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default MainPage;