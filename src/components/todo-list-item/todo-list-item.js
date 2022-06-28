import React, { Component } from "react";
import "./todo-list-item.css";

export default class TodoListItem extends Component {

  render() {
    const { label, done, important,
            onItemDeleted, 
            onToggleImportant, 
            onToggleDone } = this.props;

    let classNames = "todo-list-item";
    if (done) {
      classNames += " done"
    }

    if (important) {
      classNames += " important"
    }
  
    return (
      <span className={classNames}>
        <span className="todo-list-item-label"
              onClick={ onToggleDone }>
          {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-dark btn-sm float-right"
                onClick={ onToggleImportant }>
          <i className="fa fa-exclamation-circle" />
        </button>
  
        <button type="button"
                className="btn btn-outline-dark btn-sm float-right"
                onClick={ onItemDeleted }>
          <i className="fa fa-trash" />
        </button>
      </span>
    );
  };
}
