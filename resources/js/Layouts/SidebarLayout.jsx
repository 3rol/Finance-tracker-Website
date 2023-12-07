import React from "react";
import 
{BsCart3, BsFillGearFill, BsGrid1X2Fill} from 'react-icons/bs'
import {RiBillFill} from 'react-icons/ri' 
import { GrMoney } from 'react-icons/gr';
import { MdOutlineSavings } from "react-icons/md";
export default function SidebarLayout(){
    return (

        <aside id='sidebar'>
            <div className='sidebar-title'>
                

                <span className='icon close_icon'>X</span>


            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsGrid1X2Fill className='icon'/>Dashboard
                    </a>

                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <RiBillFill className='icon'/>Bills & Payments
                    </a>

                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <GrMoney className='icon'/>Expenses
                    </a>

                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <MdOutlineSavings className='icon'/>Savings Goals
                    </a>

                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillGearFill className='icon'/>Settings
                    </a>

                </li>
               
            </ul>

        </aside>
    )


}

