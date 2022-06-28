import React, { Component } from "react";
import "./item-add.css";

export default class ItemAdd extends Component {

  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.label.length !== 0) {
      this.props.onItemAdded(this.state.label);

      this.setState({
        label: "",
      });
    }
  };

  render() {
    return (
      <form className="item-add d-flex" 
            onSubmit={ this.onSubmit }>
        <input type="text"
               placeholder="What needs to be done"
               className="form-control"
               onChange={ this.onLabelChange }
               value={ this.state.label } />
        <button type="submit" 
                className="btn btn-outline-dark">
          Add Item
        </button>
      </form>
    );
  };
}
