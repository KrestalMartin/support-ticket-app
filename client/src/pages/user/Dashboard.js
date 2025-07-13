import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TicketForm from './TicketForm';
import api from '../../services/api';
import { AuthContext } from '../../context/authContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const getTickets = async () => {
            try {
                const res = await api.get('/api/tickets/user');
                setTickets(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        getTickets();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            const res = await api.post('/api/tickets', formData);
            setTickets([res.data.data, ...tickets]);
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            <button onClick={logout}>Logout</button>

            {!showForm ? (
                <button onClick={() => setShowForm(true)}>Create New Ticket</button>
            ) : (
                <TicketForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
            )}

            <h2>Your Tickets</h2>
            {tickets.length === 0 ? (
                <p>No tickets found</p>
            ) : (
                <ul>
                    {tickets.map(ticket => (
                        <li key={ticket._id}>
                            <h3>{ticket.course}</h3>
                            <p>Status: {ticket.status}</p>
                            <p>Concern: {ticket.concern}</p>
                            <p>Created: {new Date(ticket.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;