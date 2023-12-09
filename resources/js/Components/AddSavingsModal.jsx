import React, { useState } from 'react';

export default function AddSavingsGoalModal({ onClose, onSubmit }) {
    const [savingsGoalData, setSavingsGoalData] = useState({
        goal_name: '',
        current_amount: 0,
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
                <button type="submit">Add Savings Goal</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
