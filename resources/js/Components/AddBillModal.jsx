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
                
                <button className='ftext-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800ocus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' type="submit">Add Bill</button>
                <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

