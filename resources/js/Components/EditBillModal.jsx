import React, { useState, useEffect } from 'react';

export default function EditBillModal({ bill, onClose, onSubmit }) {
    const [editData, setEditData] = useState({
        description: bill.description,
        amount: bill.amount,
        due_date: bill.due_date,
        frequency: bill.frequency,
    });

    useEffect(() => {
        setEditData({
            description: bill.description,
            amount: bill.amount,
            due_date: bill.due_date,
            frequency: bill.frequency,
        });
    }, [bill]);

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editData, bill.bill_id);
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <button type="submit">Update Bill</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
