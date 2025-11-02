import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../../assets/images/sunshinelogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faShoppingBag, faList, faCartPlus, faUser, faUserShield, faAddressCard, faGear } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const mainNav = [
        {
            display: "Dashboard",
            path: "/admin",
            icon: faHouse
        },
        {
            display: "Sản phẩm",
            path: "/admin/product",
            icon: faShoppingBag
        },
        {
            display: "Phân loại",
            path: "/admin/category",
            icon: faList
        },
        {
            display: "Đơn hàng",
            path: "/admin/order",
            icon: faCartPlus
        },
        {
            display: "Khách hàng",
            path: "/admin/customer",
            icon: faUser
        },
        {
            display: "Nhân viên",
            path: "/admin/staff",
            icon: faUserShield
        },
        // {
        //     display: "Thông tin",
        //     path: "/admin/profile",
        //     icon: faAddressCard
        // },
        // {
        //     display: "Cài đặt",
        //     path: "/admin/setting",
        //     icon: faGear
        // },
    ]
    const { pathname } = useLocation();
    const activeNav = mainNav.findIndex(e => e.path === pathname)
    return (

        <aside className='navbar'>
            <div className='navbar-header'>
                <img src={logo}/>
                {/* <div className='navbar-header-icon'>
                    <button>icon</button>
                </div> */}
            </div>
            <nav className='navbar-body'>
                <ul className='navbar-body-menu'>
                    {
                        mainNav.map((item, index) => (
                            <React.Fragment key={index}>
                                {item.path.includes('profile') ? <hr /> : ''}
                                <li className={`navbar-body-menu-item  ${index === activeNav ? 'active' : ''}`}>
                                    <Link className='navbar-body-menu-item-link' to={item.path}>
                                        <FontAwesomeIcon icon={item.icon} />
                                        <span>{item.display}</span>

                                    </Link>

                                </li>
                            </React.Fragment>
                        )
                        )
                    }
                </ul>
            </nav>

        </aside>

    )
}

export default Navbar