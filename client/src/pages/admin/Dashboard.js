import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/authContext';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const getTickets = async () => {
            try {
                const res = await api.get('/api/admin/tickets');
                setTickets(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        getTickets();
    }, []);

    const handleStatusChange = async (ticketId, status) => {
        try {
            await api.put(`/api/admin/tickets/${ticketId}`, { status });
            setTickets(tickets.filter(ticket => ticket._id !== ticketId && status !== 'Closed'));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={logout}>Logout</button>

            <h2>Open Tickets</h2>
            {tickets.length === 0 ? (
                <p>No open tickets found</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Contact</th>
                        <th>Concern</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket._id}>
                            <td>{ticket.name}</td>
                            <td>{ticket.email}</td>
                            <td>{ticket.course}</td>
                            <td>{ticket.contactNumber}</td>
                            <td>{ticket.concern}</td>
                            <td>{ticket.status}</td>
                            <td>
                                <select
                                    value={ticket.status}
                                    onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                                >
                                    <option value="Open">Open</option>
                                    <option value="Need to Call">Need to Call</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;