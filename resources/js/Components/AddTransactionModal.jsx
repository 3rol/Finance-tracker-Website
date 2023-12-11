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
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit">Add Transaction</button>
                <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
