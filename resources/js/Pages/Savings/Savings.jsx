import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import "../../../css/styles.css";

export default function BillsAndPayments({auth, savings}) {
    return (
        <AuthenticatedLayout auth={auth} user={auth.user}>
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
                        </tr>
                    </thead>
                    <tbody>
                        {savings.map((saving, index) => (
                            <tr key={index} className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700 ${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : ''}`}>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {saving.goal_name}
                                </td>
                                <td className="px-6 py-4">
                                    $ {bill.current_amount}
                                </td>
                                <td className="px-6 py-4">
                                    $ {bill.target_amount}
                                </td>
                                <td className="px-6 py-4">
                                    {bill.target_date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
