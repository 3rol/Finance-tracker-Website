import React from "react";
import { InertiaLink } from '@inertiajs/inertia-react';
import { BsSearch, BsJustify } from 'react-icons/bs';

export default function HeaderLayout({ user }) {
    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon'/>
            </div>
            <div className='header-left'>
                <button className='sidebar-brand'>Finance Tracker</button>
            </div>
            <div className='header-right'>
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
