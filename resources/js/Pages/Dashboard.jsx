import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MdOutlineAttachMoney, MdOutlineSavings } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrMoney } from 'react-icons/gr';
import React from "react";

export default function Dashboard({ auth, balance, totalExpenses, totalIncome }) {
    return (
        <AuthenticatedLayout auth={auth} user={auth.user}>
            <h2>Hello, {auth.user.name}</h2>   
            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Current Balance</h3>
                        <MdOutlineAttachMoney className='card_icon'/>
                    </div>
                    <h1 className='balance'>$ {balance}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Expenses</h3>
                        <GrMoney className='card_icon'/>
                    </div>
                    <h1 className='expenses'>$ {totalExpenses}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Income</h3>
                        <FaMoneyBillTrendUp className='card_icon'/>
                    </div>
                    <h1 className='balance'>$ {totalIncome}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Savings</h3>
                        <MdOutlineSavings className='card_icon'/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
