import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import "../../../css/styles.css";

export default function BillsAndPayments({auth, bills}) {
    return (
        <AuthenticatedLayout auth={auth} user={auth.user}>
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
                            <th scope="col" className="px-6 py-3">
                                Actions
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
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
