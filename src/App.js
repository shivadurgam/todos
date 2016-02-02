import React, { Component } from 'react';
import Parse from 'parse';
import { render } from 'react-dom';
Parse.initialize('9ew9Zpoq42qFkv8MAm3bvqC7tXvGgGSp8MfpxA1H','Cv4YmDlNWNvGVcZe7YHQFqvzWKpgp2B7WfzNZhrr')
var TodoList = Parse.Object.extend('TodoList');

export class App extends Component {
  constructor(props){
    super(props)
    this.state = { todos: [], edit: false }
    this.loadTodos()
  }
  deleteTodo(todo) {
    todo.destroy({}).then((results) => {this.loadTodos()})
  }
  loadTodos(){
    var query = new Parse.Query(TodoList);
    query.find({}).then((results) => {
      this.setState({ todos: results })
    });
  }
  editTodo(todo) {
    this.setState({ edit: !this.state.edit })
  }
  showContent(todo) {
    if (this.state.edit) {
      return (
        <input type="text" value={todo.attributes.content} ref='t'/>
      )

    }
  }
  addTodo(evt) {
    evt.stopPropagation()
    var todo = new TodoList()
    todo.save({ content: this.refs.todo.value }).then(() => {
      this.loadTodos()
    })
    this.refs.todo.value = ''
  }
  render() {
    var index = 0;
    return(
      <div>
        <h1> Welcome to Shiva Krishna - todo app</h1>
        {this.state.todos.map( (todo) => {
          index = index + 1
          return(
            <div>
              {index}. {todo.attributes.content}
              {this.showContent.bind(this,todo)}
              <button onClick={this.deleteTodo.bind(this,todo)} key={index+1}>Delete</button>
              <button onClick={this.editTodo.bind(this,todo)}>Edit</button>
            </div>
          )
        })}<br/>
        <input type="text" ref="todo" placeholder="add a todo item here"/>
        <button onClick={this.addTodo.bind(this)}>Add</button>
      </div>
    )
  }

}
