import React, { Component } from 'react';

import * as StudentService from '../../services/StudentService';

import SearchBox from '../../components/SearchBox';

class StudentSearchBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            students: []
        }
    }

    keyChangeHandler = (name) => {
        if (name) {
            StudentService.findByName(name).then(students => this.setState({students}));
        }
    }

    render() {
        return (
            <SearchBox data={this.state.students}
                       placeholder={this.props.placeholder}
                       onKeyChange={this.keyChangeHandler}
                       onSelect={this.props.onSelect}/>
        );
    }
}

export default StudentSearchBox;