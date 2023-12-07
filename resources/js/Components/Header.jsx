import React from "react";
import { InertiaLink } from '@inertiajs/inertia-react';
import 
{BsFillBellFill, BsFillEnvelopeFill, BsSearch, BsJustify, BsPersonCircle}
 from 'react-icons/bs'

export default function Header(user){
    return (
        
        <header className='header'>
            {user && <h1>Hello, {user.name}!</h1>}
            <div className='menu-icon'>
                <BsJustify className='icon'/>

            </div>
            <div className='header-left'>
                <BsSearch className='icon'/>

            </div>
            <div className='header-right'>
            <InertiaLink href="/login">Login</InertiaLink>
            
            <InertiaLink href="/register">Register</InertiaLink>

            </div>
        </header>
        
    )


}

