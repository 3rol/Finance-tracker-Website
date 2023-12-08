import React from "react";
import { InertiaLink} from '@inertiajs/inertia-react';
import { BsSearch, BsJustify } from 'react-icons/bs';
import { Inertia } from '@inertiajs/inertia';

export default function HeaderLayout({ user }) {
    const handleAddBalance = () => {
        const available_balance = prompt("Enter the amount to add:");
        if (available_balance) {
            Inertia.post('/add-balance', { available_balance });
        }
    }
    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon'/>
            </div>
            <div className='header-left'>
                <button className='sidebar-brand'>Finance Tracker</button>
            </div>
            <div className='header-right'>
            <button type="button" onClick={handleAddBalance}  className="button-header focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Balance</button>
                {user ? (
                    <InertiaLink href="/logout" method="post" as="button">Logout</InertiaLink>
                ) : (
                    <>
                        <InertiaLink href="/login" className="header-link">Login</InertiaLink>
                        <InertiaLink href="/register" className="header-link">Register</InertiaLink>
                        
                    </>
                )}
                
            </div>
        </header>
    );
}
