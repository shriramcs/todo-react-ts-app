import { stringify } from "querystring";
import React, { useState } from "react";
import { ITodo } from "./ITodo";
import './todo.css';

const isComplete = (status: number) => {
    return status === 1;
}

const NEW_TODO_ITEM: ITodo = {
    title: '',
    status: 0
};

const INITIAL_TODO_LIST: ITodo[] = [
    {
        title: 'task 1',
        status: 0
    },
    {
        title: 'task 2',
        status: 1
    },
    {
        title: 'task 3',
        status: 0
    },
];

function Todos(): JSX.Element {
    let [newItem, setNewItem] = useState<ITodo>(NEW_TODO_ITEM);
    let [todos, setTodos] = useState<ITodo[]>(INITIAL_TODO_LIST);
    let [users, setUsers] = useState([]);



    // useEffect(() => {
    //   fetch('https://pokeapi.co/api/v2/pokemon')
    //   .then(response => response.json() )
    //   .then(result => {
    //     console.log("loaded", result);
    //     setUsers(result.results);

    //     result.results.forEach(poke => {
    //       fetch(poke.url)
    //       .then(response => response.json() )
    //       .then(result => {
    //         console.log("child", result);
    //       });
    //     });

    //   });
    // }, []);

    function isTaskCompleted(item: ITodo) {
        return isComplete(item.status)
    }

    function onChangeNewItem(event: React.ChangeEvent<HTMLInputElement>) {
        setNewItem({
            ...NEW_TODO_ITEM,
            title: event.target.value
        });
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();
        addToTodoList(newItem);
    }

    function clearItemFromNewTodo() {
        setNewItem({
            ...NEW_TODO_ITEM
        })
    }

    function addToTodoList(item: ITodo) {
        setTodos([...todos, item]);
        clearItemFromNewTodo();
    }

    function onChangeTaskStatus(event: React.ChangeEvent<HTMLInputElement>, item: ITodo) {
        console.log(event.target.checked, item);
        item.status = event.target.checked ? 1 : 0;
        const tempTodos = todos.map(task => {
            if (task.title === item.title) {
                return ({
                    ...item,
                    status: event.target.checked ? 1 : 0
                })
            } else {
                return task;
            };
        });
        setTodos(tempTodos);
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input id="newTodo" value={newItem.title}
                onChange={onChangeNewItem}
                placeholder="Todo item title"
                className="todo__control"
            />
            <input type="submit" value="Add" className="todo__button-primary" />

            <ul id="todoList">
                {todos.map((item, index) => {
                    return <li key={index}>
                        <input type="checkbox" id={item.title + index}
                            onChange={e => onChangeTaskStatus(e, item)}
                            checked={item.status === 1}
                        />
                        <label htmlFor={item.title + index}
                            className={isTaskCompleted(item) ? 'complete' : ''}>
                            {item.title}
                        </label>
                    </li>
                })}
            </ul>
        </form>
    </div>
}

export default Todos;