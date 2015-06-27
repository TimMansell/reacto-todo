'use strict';

var React = require('react'),
    Todo,
    TodoBox,
    TodoList;

Todo = React.createClass({
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                <h1>React Todo</h1>
                <p>What would you like to do?</p>
                <TodoBox />
                <TodoList />
            </div>
            /*jshint ignore:end */
        );
    }
});

TodoBox = React.createClass({
    render: function() {
        return (
            /*jshint ignore:start */
            <input type="text" value=""/>
            /*jshint ignore:end */
        );
    }
});

TodoList = React.createClass({
    render: function() {
        return (
            /*jshint ignore:start */
            <div>
                <h2>Items todo</h2>
                <ul>
                    <li>Get Milk</li>
                    <li>Wash car</li>
                </ul>
            </div>
            /*jshint ignore:end */
        );
    }
});

React.render(
    /*jshint ignore:start */
    <Todo />,
    /*jshint ignore:end */
    document.getElementById('app')
);