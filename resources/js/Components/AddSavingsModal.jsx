import React, { useState } from 'react';

export default function AddSavingsGoalModal({ onClose, onSubmit, currentBalance }) {
    const [savingsGoalData, setSavingsGoalData] = useState({
        goal_name: '',
        current_amount: currentBalance,
        target_amount: '',
        target_date: '',
    });

    const handleChange = (e) => {
        setSavingsGoalData({ ...savingsGoalData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(savingsGoalData);
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="goal_name"
                    placeholder="Goal Name"
                    value={savingsGoalData.goal_name}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="current_amount"
                    placeholder="Current Amount"
                    value={savingsGoalData.current_amount}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="target_amount"
                    placeholder="Target Amount"
                    value={savingsGoalData.target_amount}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="target_date"
                    placeholder="Target Date"
                    value={savingsGoalData.target_date}
                    onChange={handleChange}
                />
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit">Add Savings Goal</button>
                <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
