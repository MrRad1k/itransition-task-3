import React, { Component } from 'react';
import blockicon from '../../assets/block2.png';
import deleteicon from '../../assets/delete.png';
import unblockicon from '../../assets/unblock.png'
import './style.css'

class ButtonTable extends Component {
    render() {
        return (
            <>
                <ul>
                    <li><img onClick={this.props.blockButton} src={blockicon} width="49%" alt="ico" /></li>
                    <li><img onClick={this.props.unBlockButton}src={unblockicon} width="50%" alt="ico" /></li>
                    <li><img onClick={this.props.removeButton}src={deleteicon} width="50%" alt="ico" /></li>
                </ul>
            </>
        );
    }
}

export default ButtonTable;