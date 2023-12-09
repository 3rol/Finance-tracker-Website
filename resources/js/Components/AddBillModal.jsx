import React, { useState } from 'react';

export default function AddBillModal({ onClose, onSubmit }){
    const [billData, setBillData] = useState({
        description: '',
        amount: '',
        dueDate: '',
        frequency: 'Monthly, Weekly',
    });

    const handleChange = (e) => {
        setBillData({ ...billData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(billData);
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={billData.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={billData.amount}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="dueDate"
                    placeholder="Due Date"
                    value={billData.dueDate}
                    onChange={handleChange}
                />
                <select name="frequency" value={billData.frequency} onChange={handleChange}>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                </select>
                <button type="submit">Add Bill</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

