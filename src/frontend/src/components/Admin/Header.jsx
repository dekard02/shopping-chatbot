import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/user/userState'
import { useDispatch, useSelector } from 'react-redux'
const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector(state => state.userState.user)
    let dispatch = useDispatch()
    return (

        <div className='ad_header'>
            <Dropdown>
                <Dropdown.Toggle bsPrefix='dropdown-toggle dropdown-avatar' >
                    <img src='https://static-admin-dashboard-example.netlify.app/images/favicon.png' />

                </Dropdown.Toggle>

                <Dropdown.Menu align={{ xxl: "end" }}>
                    <Dropdown.Item href="/admin/profile">My profile</Dropdown.Item>
                    <Dropdown.Item href="/admin/setting">Setting</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="" style={{ color: 'red' }}
                        onClick={() => {
                            dispatch(logout())
                            // nếu logout ở quá trình đặt hàng thì bay về /cart
                            if (location.pathname.includes('/admin'))
                                navigate('/')
                        }}
                    >Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* <div class="dropdown nav-item">
                <a class="dropdown-toggle" data-bs-toggle="dropdown" href="/products" aria-expanded="false">
                    <img class="img-xs rounded-circle" src="/images/favicon.png" alt="User" />
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">My profile</a>
                    <a class="dropdown-item" href="/products">Settings</a>
                    <a class="dropdown-item text-danger" href="/products">Exit</a>
                </div>
            </div> */}
        </div >

    )
}

export default Header