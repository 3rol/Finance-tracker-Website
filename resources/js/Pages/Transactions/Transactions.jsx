import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import "../../../css/styles.css";
import { useState } from 'react';
import AddTransactionModal from '@/Components/AddTransactionModal';
import EditTransactionModal from '@/Components/EditTransactionModal';


export default function Transactions({ auth, transactions }) {
    const [sortAscending, setSortAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const transactionArray = transactions.data || [];
    const [showModal, setShowModal] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleAddTransaction = (transactionData) => {
        Inertia.post('/transactions/store', transactionData, {
            onSuccess: () => setShowModal(false),
        });
    };

    const handleDeleteTransaction = (transaction_id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            Inertia.delete(`/transactions/delete/${transaction_id}`)
        }
    };
    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setEditModalVisible(true);
    };
    const handleUpdateTransaction = (editData, transactionId) => {
        console.log(`Updating transaction with ID: ${transactionId}`, editData);
        Inertia.put(`/transactions/update/${transactionId}`, editData)
            
    };
    

    const toggleSortOrder = () => {
        setSortAscending(!sortAscending); 
    
        transactions.sort((a, b) => {
            const dateA = new Date(a.transaction_date);
            const dateB = new Date(b.transaction_date);
    
            return sortAscending ? dateA - dateB : dateB - dateA;
        });
    };

    const paginate = (pageNumber) => {
        if (!isNaN(pageNumber)) {
            setCurrentPage(pageNumber);
            Inertia.get(`/transactions?page=${pageNumber}`);
        }
    };
    return (
        <AuthenticatedLayout auth={auth} user={auth.user}>
            {editModalVisible && selectedTransaction && (
        <EditTransactionModal
        transaction={selectedTransaction}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleUpdateTransaction}
        />
)}
              <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => setShowModal(true)}>Add Transaction</button>
            {showModal && (
                <AddTransactionModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleAddTransaction}
                />
            )}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 cursor-pointer" onClick={toggleSortOrder}>
                                Transaction Date
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.data.map((transaction) => (
                            <tr key={transaction.transaction_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {transaction.transaction_date}
                                </th>
                                <td className="px-6 py-4">
                                    {transaction.type}
                                </td>
                                <td className="px-6 py-4">
                                    {transaction.category}
                                </td>
                                <td class={`px-6 py-4 ${transaction.type === 'Income' ? 'balance' : 'expenses'}`}>
                                    {transaction.type === 'Income' ? `+${transaction.amount}` : `-${transaction.amount}`}
                                </td>
                                <td class="px-6 py-4">
                                    <span className="mr-2">
                                        <button onClick={() => handleEdit(transaction)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                    </span>
                                    <span>
                                        <button onClick={() => handleDeleteTransaction(transaction.transaction_id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                    </span>
                                </td>
                                

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-container">
                <nav aria-label="Page navigation">
                    <ul className='pagination'>
                        {transactions.links.map((link, index) => (
                            <li key={index} className={`page-item ${link.active ? 'active' : ''} ${link.url ? '' : 'disabled'}`}>
                            <Link 
                        as="button"
                        onClick={() => link.url && paginate(index)}
                        href={link.url ? link.url : '#'}
                        dangerouslySetInnerHTML={{__html: link.label}}
                        className='page-link'
                    />
                            </li>
                    ))}
                    </ul>
                </nav>
            </div>



        </AuthenticatedLayout>
    );
}   
