import React, { useState } from 'react';

const TicketForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        course: 'AWS',
        contactNumber: '',
        concern: ''
    });

    const { course, contactNumber, concern } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="ticket-form">
            <h2>Create New Support Ticket</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="course">Course</label>
                    <select
                        id="course"
                        name="course"
                        value={course}
                        onChange={onChange}
                        required
                    >
                        <option value="AWS">AWS</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="Python">Python</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={contactNumber}
                        onChange={onChange}
                        required
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="concern">Concern</label>
                    <textarea
                        id="concern"
                        name="concern"
                        value={concern}
                        onChange={onChange}
                        required
                        rows="5"
                        placeholder="Describe your issue in detail"
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Submit Ticket
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TicketForm;