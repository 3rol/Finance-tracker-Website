import HeaderLayout from './HeaderLayout'; 
import SidebarLayout from './SidebarLayout';
import "../../css/styles.css";


export default function Authenticated({ user, children }) {

    return (
        <div className="grid-container">
            <HeaderLayout user={user} />
            <SidebarLayout />
            <div className="main-content">
                {children} 
            </div>
        </div>
    );
                
}