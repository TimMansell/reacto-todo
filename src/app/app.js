'use strict';

var React = require('react'),
    Todo,
    TodoBox,
    TodoList,
    TodoListItem,
    TodoClearItems;

// Todo container.
Todo = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadTodos: function() {
        var todos = JSON.parse(localStorage.getItem('todoItem'));

        this.setState({data: todos});
    },
    componentDidMount: function() {
        this.loadTodos();

        // Poll for any new todos.
        setInterval(this.loadTodos, this.props.pollInterval);
    },
    handleTodoSubmit: function(todo) {
        var items = (localStorage.getItem('todoItem')!==null) ? JSON.parse(localStorage.getItem('todoItem')) : [];

        // Add new item to array.
        items.push(todo);

        // Save to localStorage.
        localStorage.setItem('todoItem', JSON.stringify(items));
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="todo">
                <h1 className="todo-title text-center">React Todo</h1>
                <TodoBox onTodoSubmit={this.handleTodoSubmit} />
                <TodoClearItems/>
                <TodoList todos={this.state.data} />
            </div>
            /*jshint ignore:end */
        );
    }
});

// Input to save new todos.
TodoBox = React.createClass({
    handleSubmit: function(e) {    
        var todo = React.findDOMNode(this.refs.todo).value.trim();

        e.preventDefault();
        
        if (!todo) {
          return;
        }
        
        // Save new todo.
        this.props.onTodoSubmit({text: todo, completed: false});

        // Reset input.
        React.findDOMNode(this.refs.todo).value = '';
        
        return;
    },
    
    render: function() {
        return (
            /*jshint ignore:start */
            <form className="todo-form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <input className="form-control" type="text" placeholder="What would you like to do?" ref="todo"/>
                    </div>
                </div>
            </form>
            /*jshint ignore:end */
        );
    }
});

TodoClearItems = React.createClass({
    handleClick: function(e) {    
        localStorage.clear();

        console.log('c');
        
        return;
    },
    
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="row text-center">
                <br/>
                <button className="btn btn-primary" onClick={this.handleClick}>Clear All</button>
            </div>
            /*jshint ignore:end */
        );
    }
});

// Todo List items.
TodoList = React.createClass({
    render: function() {
        var todoNodes = this.props.todos;

        if(todoNodes!== null){
            todoNodes = this.props.todos.map(function (todo, index) {
              return (
                <TodoListItem todo={todo} index={index}/>
              );
            });
        } else {
            todoNodes = "No todos.";
        }

        return (
            /*jshint ignore:start */
            <div className="text-center">
                <h3>Items to do</h3>
                <ul className="list-unstyled">
                    {todoNodes}
                </ul>
            </div>
            /*jshint ignore:end */
        );
    }
});

TodoListItem = React.createClass({
    handleChange: function(event) {      
        return;
    },
    render: function() {
        var index = this.props.index;
        var todo = this.props.todo;

        return (
            /*jshint ignore:start */
           <li key={index}>
                <input type="checkbox" 
                    checked={todo.completed}
                    ref="complete"
                    onChange={this.handleChange}/>{todo.text}
            </li>
            /*jshint ignore:end */
        );
    }
});
// Render app.
React.render(
    /*jshint ignore:start */
    <Todo pollInterval={300} />,
    /*jshint ignore:end */
    document.getElementById('app')
);