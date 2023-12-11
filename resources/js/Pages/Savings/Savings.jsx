import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import "../../../css/styles.css";
import AddSavingsModal from '@/Components/AddSavingsModal';
import React, { useState } from 'react';
import EditSavingsModal from '@/Components/EditSavingsModal';
import { Link } from '@inertiajs/inertia-react';

export default function Savings({auth, savings, balance}) {
    const [showModal, setShowModal] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedSavings, setSelectedSavings] = useState(null);
    const savingsData = savings.data || [];

    const handleAddSavingsGoal = (savingsGoalData) => {
        Inertia.post('/savingsgoals/store', savingsGoalData, {
            onSuccess: () => setShowModal(false),
        });
    };

    const handleDeleteSavings = (savings_id) => {
        console.log(`Attempting to delete savings goal with ID: ${savings_id}`);
        if (window.confirm('Are you sure you want to delete this savings goal?')) {
            Inertia.delete(`/savingsgoals/delete/${savings_id}`);
        }
    };

    const handleEdit = (savings) => {
        setSelectedSavings(savings);
        setEditModalVisible(true);
    };

    const handleUpdateSavings = (editData, savings_id) => {
        console.log(`Updating savings goal with ID: ${savings_id}`, editData);
        Inertia.put(`/savingsgoals/update/${savings_id}`, editData, {
            onSuccess: () => {
                setEditModalVisible(false);
            },
        });
    };;
    const paginate = (pageNumber) => {
        Inertia.get(`/savingsgoals?page=${pageNumber}`);
    };

    return (
        <AuthenticatedLayout auth={auth} user={auth.user}>
            <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => setShowModal(true)}>Add Savings Goal</button>
            {showModal && (
                <AddSavingsModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleAddSavingsGoal}
                    currentBalance={balance}
                />
            )}
             {editModalVisible && selectedSavings && (
                <EditSavingsModal
                    savingsGoal={selectedSavings}
                    onClose={() => setEditModalVisible(false)}
                    onSubmit={handleUpdateSavings}
                />
            )}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Goal Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Current Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Target Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Targeted Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {savingsData.map((saving, index) => (
                            <tr key={saving.goal_id} className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700 ${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : ''}`}>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {saving.goal_name}
                                </td>
                                <td className="px-6 py-4">
                                    $ {saving.current_amount}
                                </td>
                                <td className="px-6 py-4">
                                    $ {saving.target_amount}
                                </td>
                                <td className="px-6 py-4">
                                    {saving.target_date}
                                </td>
                                <td class="px-6 py-4">
                                <button onClick={() => handleEdit(saving)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                <button 
                                    onClick={() => handleDeleteSavings(saving.goal_id)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-container">
                <nav aria-label="Page navigation">
                    <ul className='pagination'>
                        {savings.links.map((link, index) => (
                            <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
                                <Link as="button" onClick={() => paginate(link.label)}
                                      href={link.url ? link.url : '!#'}
                                      dangerouslySetInnerHTML={{ __html: link.label }}
                                      className='page-link' />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </AuthenticatedLayout>
    );
}
