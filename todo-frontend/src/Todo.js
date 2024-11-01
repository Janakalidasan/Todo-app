// src/Todo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import '../src/App.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);
    const [message, setMessage] = useState(''); // New state for modal message
    const [showMessageModal, setShowMessageModal] = useState(false); // State to control the message modal

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:8000/api/todos');
        setTodos(response.data);
    };

    const addTodo = async (e) => {
        e.preventDefault();
        const todoData = { title, description, firstname, lastname, email };
        if (editTodoId) {
            await axios.put(`http://localhost:8000/api/todos/${editTodoId}`, todoData);
            setTodos(todos.map(todo => (todo.id === editTodoId ? { ...todo, ...todoData } : todo)));
            setMessage('Detail updated successfully!'); // Set message for update
        } else {
            const response = await axios.post('http://localhost:8000/api/todos', todoData);
            setTodos([...todos, response.data]);
            setMessage('Todo Detail added successfully!'); // Set message for add
        }
        resetForm();
        setShowMessageModal(true); // Show message modal
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setFirstname('');
        setLastname('');
        setEmail('');
        setEditTodoId(null);
    };

    const editTodo = (todo) => {
        setTitle(todo.title);
        setDescription(todo.description);
        setFirstname(todo.firstname);
        setLastname(todo.lastname);
        setEmail(todo.email);
        setEditTodoId(todo.id);
    };

    const confirmDeleteTodo = (todo) => {
        setTodoToDelete(todo);
        setShowModal(true);
    };

    const deleteTodo = async () => {
        await axios.delete(`http://localhost:8000/api/todos/${todoToDelete.id}`);
        setTodos(todos.filter(todo => todo.id !== todoToDelete.id));
        setShowModal(false);
        setTodoToDelete(null);
        setMessage('Todo deleted successfully!'); // Set message for delete
        setShowMessageModal(true); // Show message modal
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">TODO APP</h1>
            <form onSubmit={addTodo} className='mb-4'>
                <div className="row mb-3">
                    <div className="col">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={firstname} 
                            onChange={(e) => setFirstname(e.target.value)} 
                            placeholder="Firstname" 
                            required 
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={lastname} 
                            onChange={(e) => setLastname(e.target.value)} 
                            placeholder="Lastname" 
                            required 
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                            required 
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Title" 
                            required 
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Description"
                            required 
                        />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            {editTodoId ? 'Update' : 'Add'}
                        </button>
                    </div>
                </div>
            </form>

            <table className="table table-striped table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={todo.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{todo.firstname}</td>
                            <td>{todo.lastname}</td>
                            <td>{todo.email}</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => editTodo(todo)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => confirmDeleteTodo(todo)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this TODO Details?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteTodo}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Message Modal */}
            <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowMessageModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Todo;
