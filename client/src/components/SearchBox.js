import React, { Component } from 'react';

import Dropdown from './Dropdown';

class SearchBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            searchKey: ''
        }
    }

    handleClickOutside = evt => {
        this.setState({
            open: false
        });
    }

    searchHandler = event => {
        let searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.onKeyChange(searchKey);
        this.setState({
            open:true
        });
    }

    selectHandler = (index, value, label) => {
        this.setState({
            searchKey: "", open: false
        });
        if (this.props.onSelect) {
            this.props.onSelect(index, value, label);
        }
    }

    render() {
        return (
            <form className="slds-form--inline">
                <div className="slds-form-element">
                    <div className="slds-form-element__control">
                        <input className="slds-input" type="text"
                               placeholder={this.props.placeholder || 'Search...'}
                               value={this.state.searchKey}
                               style={{minWidth:"200px",marginTop:"1px"}}
                               onChange={this.searchHandler}/>
                    </div>
                    {this.state.open && this.props.data && this.props.data.length>0?
                    <Dropdown data={this.props.data}
                              position="left"
                              valueField={this.props.valueField}
                              labelField={this.props.labelField}
                              onChange={this.selectHandler}/>
                    :null}
                </div>
            </form>
        );
    }
}

export default SearchBox;