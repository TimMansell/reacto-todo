(function () {
    'use strict';

    var React = require('react'),
        Todo,
        TodoBox,
        TodoList,
        TodoListItem,
        TodoRemoveAllItems,
        TodoRemoveCompletedItems;

    // Todo container.
    Todo = React.createClass({
        getInitialState: function() {
            return {data: []};
        },
        loadTodos: function() {
            var todos = JSON.parse(localStorage.getItem('todoItem')) || [];

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
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <h1 className="todo-title text-center">React Todo</h1>
                            <TodoBox onTodoSubmit={this.handleTodoSubmit} />
                            <TodoRemoveAllItems/>
                            <TodoList todos={this.state.data} />
                            <TodoRemoveCompletedItems remainingTodos={this.state.data.length}/>
                        </div>
                    </div>
                </div>
                /*jshint ignore:end */
            );
        }
    });

    // Input to save new todos.
    TodoBox = React.createClass({
        handleSubmit: function(e) {    
            var todo = React.findDOMNode(this.refs.todo).value.trim(),
                key = Math.floor(Math.random() * 10000) + 1;

            e.preventDefault();
            
            if (!todo) {
              return;
            }
            
            // Save new todo.
            this.props.onTodoSubmit({key: key, text: todo, completed: false});

            // Reset input.
            React.findDOMNode(this.refs.todo).value = '';
            
            return;
        },
        
        render: function() {
            return (
                /*jshint ignore:start */
                <form className="todo-form" onSubmit={this.handleSubmit}>
                    <input className="form-control" type="text" placeholder="What would you like to do?" ref="todo"/>
                </form>
                /*jshint ignore:end */
            );
        }
    });

    // Remove all items.
    TodoRemoveAllItems = React.createClass({
        handleClick: function(e) {    
            localStorage.setItem('todoItem', JSON.stringify([]));
            
            return;
        },
        
        render: function() {
            return (
                /*jshint ignore:start */
                <div className="row text-center">
                    <br/>
                    <button className="btn btn-warning" onClick={this.handleClick}>Remove All</button>
                </div>
                /*jshint ignore:end */
            );
        }
    });

    // Remove completed items.
    TodoRemoveCompletedItems = React.createClass({
        handleClick: function(e) {    
            var items = (localStorage.getItem('todoItem')!==null) ? JSON.parse(localStorage.getItem('todoItem')) : [],
                itemsCompleted;


            // Find all uncompleted items.
            itemsCompleted = _.filter(items, {completed: false});

            // Save to localStorage uncompleted items..
            localStorage.setItem('todoItem', JSON.stringify(itemsCompleted));
            
            return;
        },
        
        render: function() {
            return (
                /*jshint ignore:start */
                <div className="row text-center">
                    <br/>
                    <span className={this.props.remainingTodos ? '' : 'hidden'}>
                        <button className="btn btn-primary" onClick={this.handleClick}>Clear Completed</button>
                    </span>
                </div>
                /*jshint ignore:end */
            );
        }
    });

    // Todo List items.
    TodoList = React.createClass({
        render: function() {
            var todoNodes = this.props.todos;

            if(todoNodes.length){
                todoNodes = this.props.todos.map(function (todo, index) {
                  return (
                    <TodoListItem key={index} todo={todo}/>
                  );
                });
            } else {
                todoNodes = "No todos.";
            }

            return (
                /*jshint ignore:start */
                <div>
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
            var todo = this.props.todo,
                items = (localStorage.getItem('todoItem')!==null) ? JSON.parse(localStorage.getItem('todoItem')) : [],
                index;

            // Swap checked stae.
            todo.completed = !todo.completed;

            // Find current item in items array.
            index = _.indexOf(items, _.find(items, {key: todo.key}));

            // Update item.
            items.splice(index, 1, todo);

            // Save to localStorage.
            localStorage.setItem('todoItem', JSON.stringify(items));

            return;
        },
        render: function() {
            var todo = this.props.todo,
                classString = '';
            
            // Has the task been completed?
            if (this.props.todo.completed) {
                classString = 'todo-item_done';
            }

            return (
                /*jshint ignore:start */
               <li>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" checked={todo.completed} ref="task"
                        onChange={this.handleChange}/>
                        <span className={classString}>{todo.text}</span>
                      </label>
                    </div>
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
})();