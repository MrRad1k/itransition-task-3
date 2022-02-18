import React, { Component } from 'react';
import ButtonTable from '../../pages/MainPage/ButtonTable'


class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: false };
        this.blockButton = this.blockButton.bind(this);
    }

    onChangeHandler = (event) => {
        const { obj, chacked } = event.target;
        this.setState({ [obj]: chacked, checked: !this.state.checked });
    }

    blockButton = (event) => {
        const { obj, chacked } = event.target;
        this.setState({ [obj]: chacked });
        if (this.props.obj.status === false) {
            this.props.obj.status = true
        }
    }

    unBlockButton = (event) => {
        const { obj, chacked } = event.target;
        this.setState({ [obj]: chacked });
        if (this.props.obj.status === true) {
            this.props.obj.status = false
        }
    }

    removeButton = (event) => {
        const { obj, chacked } = event.target;
        this.setState({ [obj]: chacked });

        delete this.props.obj._id
        delete this.props.obj.name
        delete this.props.obj.email
        delete this.props.obj.date
        delete this.props.obj.status
    }


    render() {
        return (
            <tr onChange={this.onChangeHandler}>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    {this.props.obj.date}
                </td>
                <td>
                    {
                        this.props.obj.status === false
                            ?
                            'Unblock'
                            :
                            'Block'
                    }
                </td>
                <td>
                    <ButtonTable
                        blockButton={this.blockButton}
                        unBlockButton={this.unBlockButton}
                        removeButton={this.removeButton}
                    />
                </td>
            </tr>
        );
    }
}

export default DataTable;