import React, { useState } from 'react';

export default function AddTransactionModal({ onClose, onSubmit }) {
    const [transactionData, setTransactionData] = useState({
        type: 'Income',
        category: '',
        amount: '',
        transaction_date: '',
        description: '',
    });

    const handleChange = (e) => {
        setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(transactionData);
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <select name="type" value={transactionData.type} onChange={handleChange}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={transactionData.category}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={transactionData.amount}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="transaction_date"
                    placeholder="Transaction Date"
                    value={transactionData.transaction_date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={transactionData.description}
                    onChange={handleChange}
                />
                <button type="submit">Add Transaction</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
