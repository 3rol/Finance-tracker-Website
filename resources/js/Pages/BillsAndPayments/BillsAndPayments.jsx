import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AddBillModal from '@/Components/AddBillModal';
import { Inertia } from '@inertiajs/inertia';

    export default function BillsAndPayments({auth, bills}) {
        const [showModal, setShowModal] = useState(false);
        const handleAddBill = (billData) => {
            Inertia.post('/billsandpayments/store', {
                ...billData,
                due_date: new Date(billData.dueDate).toISOString().split('T')[0], 
                
            }, {
                preserveState: false, 
                onSuccess: () => setShowModal(false),
            });
        };
        return (
            <AuthenticatedLayout auth={auth} user={auth.user}>
                 <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => setShowModal(true)}>Add Bill</button>
                {showModal && (
                <AddBillModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleAddBill}
                />
                )}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Due Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Frequency
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill, index) => (
                                <tr key={index} className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700 ${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : ''}`}>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {bill.description}
                                    </td>
                                    <td className="px-6 py-4 expenses">
                                        -${bill.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(bill.due_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {bill.frequency}
                                    </td>                             
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AuthenticatedLayout>
        );
    }
