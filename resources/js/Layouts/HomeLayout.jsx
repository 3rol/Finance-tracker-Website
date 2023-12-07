import React from "react";
import { MdOutlineAttachMoney, MdOutlineSavings } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrMoney } from 'react-icons/gr';

export default function HomeLayout({user}) {
    
    return (
        <main>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Current Balance</h3>
                        <MdOutlineAttachMoney className='card_icon'/>
                    </div>
                    <h1>300</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Expenses</h3>
                        <GrMoney className='card_icon'/>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Income</h3>
                        <FaMoneyBillTrendUp className='card_icon'/>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Total Savings</h3>
                        <MdOutlineSavings className='card_icon'/>
                    </div>
                </div>
            </div>
         

            
        </main>
    )


}

