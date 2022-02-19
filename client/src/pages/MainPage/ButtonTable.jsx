import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import blockicon from '../../assets/block2.png';
import deleteicon from '../../assets/delete.png';
import unblockicon from '../../assets/unblock.png'
import './style.css'

class ButtonTable extends Component {
    render() {
        const renderTooltipBlock = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Block user
            </Tooltip>
        );
        const renderTooltipUnBlock = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Unblock user
            </Tooltip>
        );
        const renderTooltipDelete = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Delete user
            </Tooltip>
        );
        return (
            <>
                <ul>
                    <li>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipBlock}
                        >
                            <img onClick={this.props.blockButton} src={blockicon} width="49%" alt="ico" />
                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipUnBlock}
                        >
                            <img onClick={this.props.unBlockButton} src={unblockicon} width="50%" alt="ico" />
                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipDelete}
                        >
                            <img onClick={this.props.removeButton} src={deleteicon} width="50%" alt="ico" />
                        </OverlayTrigger>
                    </li>

                </ul>
            </>
        );
    }
}

export default ButtonTable;