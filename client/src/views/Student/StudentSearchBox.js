import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as StudentService from 'services/StudentService';
import SearchBox from 'components/SearchBox/SearchBox';

class StudentSearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        };
    }

    keyChangeHandler = (name) => {
        if (name) {
            StudentService.findByName(name).then((students) =>
                this.setState({ students })
            );
        }
    };

    render() {
        const { students } = this.state;
        const { placeholder, onSelect } = this.props;
        return (
            <SearchBox
                data={students}
                placeholder={placeholder}
                onKeyChange={this.keyChangeHandler}
                onSelect={onSelect}
            />
        );
    }
}

StudentSearchBox.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default StudentSearchBox;
