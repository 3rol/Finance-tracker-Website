import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import HeaderLayout from './HeaderLayout'; 
import SidebarLayout from './SidebarLayout';
import HomeLayout from './HomeLayout'; 
import "../../css/styles.css";


export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="grid-container">
            <HeaderLayout user={user} />
            <SidebarLayout />
            <div className="main-content">
                {children} {/* Main content goes here */}
            </div>
        </div>
    );
                
}