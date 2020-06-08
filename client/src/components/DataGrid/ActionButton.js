/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown/Dropdown';
import { ButtonIcon } from 'components/Icons/Icons';

class ActionButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            label: '',
            opened: true
        };
    }

    changeHandler = (index, value, label) => {
        const { onChange } = this.props;
        this.setState({
            value,
            label,
            opened: false
        });
        onChange(index, value, label);
    };

    render() {
        const { header, valueField, labelField, actions } = this.props;
        return (
            <div className="slds-dropdown-trigger" aria-haspopup="true">
                <button
                    className="slds-button slds-button--icon-border-filled slds-button--icon-border-small"
                    type="button"
                >
                    <ButtonIcon name="down" size="small" />
                    <span className="slds-assistive-text">More</span>
                </button>
                <Dropdown
                    header={header}
                    valueField={valueField}
                    labelField={labelField}
                    data={actions}
                    onChange={this.changeHandler}
                />
            </div>
        );
    }
}

ActionButton.propTypes = {
    onChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    header: PropTypes.object.isRequired,
    valueField: PropTypes.string.isRequired,
    labelField: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    actions: PropTypes.any.isRequired
};

export default ActionButton;
