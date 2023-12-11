import React, { useState, useEffect } from 'react';

export default function EditTransactionModal({ transaction, onClose, onSubmit }) {
    const [editData, setEditData] = useState({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        transaction_date: transaction.transaction_date,
        description: transaction.description,
    });

    useEffect(() => {
        setEditData({
            type: transaction.type,
            category: transaction.category,
            amount: transaction.amount,
            transaction_date: transaction.transaction_date,
            description: transaction.description,
        });
    }, [transaction]);

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editData, transaction.transaction_id);
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={editData.category}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={editData.amount}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="transaction_date"
                    value={editData.transaction_date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={editData.description}
                    onChange={handleChange}
                />
                <button type="submit">Update Transaction</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
