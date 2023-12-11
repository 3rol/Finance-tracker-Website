import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import "../../../css/styles.css";
import { useState } from 'react';
import AddTransactionModal from '@/Components/AddTransactionModal';

export default function Transactions({ auth, transactions }) {
    console.log(transactions);
    const [sortAscending, setSortAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const transactionArray = transactions.data || [];
    const [showModal, setShowModal] = useState(false);

    const handleAddTransaction = (transactionData) => {
        Inertia.post('/transactions/store', transactionData, {
            onSuccess: () => setShowModal(false),
        });
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
        setCurrentPage(pageNumber);
    };
    return (
        <AuthenticatedLayout auth={auth} user={auth.user}>
              <button onClick={() => setShowModal(true)}>Add Transaction</button>
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
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.data.map((transaction, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                                <td className="px-6 py-4">
                                    {transaction.description}
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
                            <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
                                <Link 
                                    as="button"
                                    onClick={() => paginate(link.label)}
                                    href={link.url ? link.url : '!#'}
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
