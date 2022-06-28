import React, { Component } from "react";
import "./app.css"
import ItemAdd from '../item-add';
import ItemStatusFilter from "../item-status-filter";
import AppHeader from "./../app-header";
import SearchPanel from "./../search-panel";
import TodoList from "./../todo-list";

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a Lunch"),
    ],
    term: "",
    filter: "all",
  };

  createTodoItem(label) {
    return {
      id: this.maxId++, 
      label, 
      important: false,
      done: false 
    };
  };

  onItemDeleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx), ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  onItemAdded = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem]
      }
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [
      ...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)
    ];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      const label = item.label.toLowerCase();
      return label.indexOf(term.toLowerCase()) !== -1;
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter = (items, filter) => {
    switch(filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  render() {

    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(
      this.search(todoData, term), filter
    );

    const doneCount = todoData.filter((el) => el.done).length;
    const todoeCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoeCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={ this.onSearchChange } />
          <ItemStatusFilter 
            filter={ filter }
            onFilterChange={ this.onFilterChange } 
          />
        </div>
        <TodoList 
          todos={ visibleItems }
          onItemDeleted={ this.onItemDeleted }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
          />
        <ItemAdd onItemAdded={ this.onItemAdded } />
      </div>
    );
  };
}
