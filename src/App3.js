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
    todo.edit = !todo.edit
    this.setState({ todos: this.state.todos })
  }
  doneTodo(todo) {
    todo.edit = !todo.edit
    this.setState({ todos: this.state.todos })
  }
  showContent(todo, index) {
    if (todo.edit) {
      return (
        <div key={index+1}>
              <input type="text" value={todo.attributes.content} ref='t'/>
              <button onClick={this.doneTodo.bind(this,todo)} >Done</button>
        </div>
      )

    } else {
      return (
        <div key={index+1}>
              {index}. {todo.attributes.content}
              <button onClick={this.deleteTodo.bind(this,todo)} >Delete</button>
              <button onClick={this.editTodo.bind(this,todo)} >Edit</button>
        </div>
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
              {this.showContent(todo, index)}
            </div>
          )
        })}<br/>
        <input type="text" ref="todo" placeholder="add a todo item here"/>
        <button onClick={this.addTodo.bind(this)}>Add</button>
      </div>
    )
  }

}
