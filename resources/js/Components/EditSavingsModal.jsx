import React, { useState, useEffect } from 'react';

export default function EditSavingsModal({ savingsGoal, onClose, onSubmit }) {
    const [editData, setEditData] = useState({
        goal_name: savingsGoal.goal_name,
        current_amount: savingsGoal.current_amount,
        target_amount: savingsGoal.target_amount,
        target_date: savingsGoal.target_date
    });

    useEffect(() => {
        setEditData({
            goal_name: savingsGoal.goal_name,
            current_amount: savingsGoal.current_amount,
            target_amount: savingsGoal.target_amount,
            target_date: savingsGoal.target_date
        });
    }, [savingsGoal]);

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editData, savingsGoal.goal_id);
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="goal_name"
                    placeholder="Goal Name"
                    value={editData.goal_name}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="current_amount"
                    placeholder="Current Amount"
                    value={editData.current_amount}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="target_amount"
                    placeholder="Target Amount"
                    value={editData.target_amount}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="target_date"
                    value={editData.target_date}
                    onChange={handleChange}
                />
                <button type="submit">Update Savings Goal</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
