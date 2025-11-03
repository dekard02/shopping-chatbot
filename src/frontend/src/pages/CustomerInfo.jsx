import React, { useEffect, useRef, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { useSelector, useDispatch } from 'react-redux'
import address from '../assets/fake-data/address.json'
import { getCart, updateUser } from '../redux/user/userState'
import { getAllProduct } from '../redux/product/productsSlice'
import axios from 'axios'
import { apiUrl } from '../utils/constant'
import numberWithCommas from '../utils/numberWithCommas'
const CustomerInfo = () => {

    const user = useSelector(state => state.userState.user)
    const token = useSelector(state => state.userState.token)
    const cart = useSelector(state => state.userState.cart)
    const products = useSelector(state => state.productsSlice.value)
    console.log(cart);
    const initialForm = {
        customer_name: user.customer_name ? user.customer_name : "",
        username: user.username,
        phone: Number(user.phone) ? Number(user.phone) : "",
        house_address: user.house_address ? user.house_address : "",
        address1: user.address1 ? user.address1 : "",
        address2: user.address2 ? user.address2 : "",
        address3: user.address3 ? user.address3 : ""
    }
    const dispatch = useDispatch()
    const infoRef = useRef(null)
    const addressRef = useRef(null)
    const provinceRef = useRef(null)
    const districtRef = useRef(null)
    const wardRef = useRef(null)
    const provinceInvalidRef = useRef(null)
    const districtInvalidRef = useRef(null)
    const wardInvalidRef = useRef(null)

    const [validated, setValidated] = useState(false)
    const [CustomerForm, setCustomerForm] = useState(initialForm)
    const { customer_name, phone, address1, address2, address3, house_address } = CustomerForm
    const [Province, SetProvince] = useState(address)
    const [District, setDistrict] = useState([])
    const [Ward, setWard] = useState([])

    const onCustomerFormChange = e => {
        setCustomerForm({
            ...CustomerForm,
            [e.target.name]: e.target.value
        })
    }
    const onCustomerFormChangeProvince = e => {
        setCustomerForm({
            ...CustomerForm,
            [e.target.name]: e.target.value,
            address2: "",
            address3: ""
        })

    }
    const onCustomerFormChangeDistrict = e => {
        setCustomerForm({
            ...CustomerForm,
            [e.target.name]: e.target.value,
            address3: ""
        })

    }
    const getProductName = (slug) => {
        let rs = products.filter(item => item.slug === slug)[0]
        return rs ? rs.title : ""
    }
    const getProductSale = (slug) => {
        let rs = products.filter(item => item.slug === slug)[0]
        return rs ? rs.sale : ""
    }
    // submit change customer information
    const handleSubmit = async () => {
        let data = {
            id: user.id,
            ...CustomerForm
        }
        
        let rs = await axios.patch(`${apiUrl}/user/update`, data, { headers: { Authorization: `Bearer ${token}` } })
        dispatch(updateUser(data))
    }
    useEffect(() => {
        handleSubmit()
    }, [CustomerForm])
    useEffect(() => {
        dispatch(getCart())
        dispatch(getAllProduct())
    }, [])
    useEffect(() => {
        if (address1) {
            if (address.filter(item => item.Name === address1)[0])
                setDistrict(address.filter(item => item.Name === address1)[0].Districts)
            else
                setDistrict([])
        }
        if (address1 !== "" && provinceRef.current && provinceInvalidRef.current) {
            provinceRef.current.classList.remove('active')
            provinceInvalidRef.current.classList.remove('active')
        }

    }, [address1, Province])
    useEffect(() => {
        if (address2) {
            if (District.filter(item => item.Name === address2)[0])
                setWard(District.filter(item => item.Name === address2)[0].Wards)
        }
        else
            setWard([])
        if (address2 !== "" && districtRef.current && districtInvalidRef.current) {
            districtRef.current.classList.remove('active')
            districtInvalidRef.current.classList.remove('active')
        }
    }, [address2, District])
    useEffect(() => {
        if (address3 !== "" && wardRef.current && wardInvalidRef.current) {
            wardRef.current.classList.remove('active')
            wardInvalidRef.current.classList.remove('active')
        }
    }, [address3])

    return (
        <div className='customer-info'>
            <div className="customer-info-header">
                Tài khoản của tôi
            </div>
            <div className="customer-info-content">
                <div className="customer-info-content-left">
                    <div className="customer-info-content-left-header">
                        Lịch sử đơn hàng
                    </div>
                    <div className="customer-info-content-left-table " >
                        <Table responsive hover striped variant='info' size='lg'  >
                            <thead>
                                <tr>
                                    <th >Đơn hàng</th>
                                    <th >Ngày</th>
                                    <th >Tình trạng</th>
                                    <th >Tổng</th>
                                    <th>Địa chỉ giao hàng</th>
                                    <th> Sản phẩm</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart ? cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.cart_id}</td>
                                            <td className='tdcell'>{item.create_date}</td>
                                            <td className='tdcell'>{item.status}</td>
                                            <td className='tdcell'>{numberWithCommas(item.total)}đ</td>
                                            <td className='tdcell2'>{item.address}</td>
                                            <td className='tdcell3'>{item.list_product.map((product, index) => {
                                                return (
                                                    <div key={index}>
                                                        {
                                                            `${product.product_id} - ${getProductName(product.slug)} - 
                                                    ${product.color} - ${product.size} - sale: ${getProductSale(product.slug) ? `${getProductSale(product.slug)}%` : "none"} - ${numberWithCommas(product.price)}đ`
                                                        }
                                                    </div>
                                                )
                                            })}</td>
                                        </tr>
                                    )) : <></>
                                }

                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="customer-info-content-right">
                    <div className="customer-info-content-right-header">
                        Chi tiết tài khoản
                    </div>
                    <div className="customer-info-content-right-table">
                        <fieldset className='border p-3 mt-4'  >
                            <legend className='float-none w-auto p-3'>Thông tin khách hàng</legend>
                            <Form.Group className='me-5 mb-3'  >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    disabled
                                    required
                                    type="email"
                                    defaultValue={user.username}
                                    size="lg"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='me-5 mb-3'  >
                                <Form.Label>Tên</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="customer_name"
                                    value={customer_name}
                                    onChange={onCustomerFormChange}
                                    size="lg"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='me-5 mb-4' >
                                <Form.Label>Số điện thoại </Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="phone"
                                    value={phone}
                                    onChange={onCustomerFormChange}
                                    size="lg"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng số điện thoại.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </fieldset>
                        <fieldset className='border p-3 mt-4'  >
                            <legend className='float-none w-auto p-3'>Thông tin giao hàng</legend>
                            <Form validated={validated} noValidate ref={addressRef}>
                                <Form.Group className=' mb-3' >
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        value={house_address}
                                        name="house_address"
                                        onChange={onCustomerFormChange}
                                        size="lg"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Vùi lòng nhập địa chỉ.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                            <div className='customer-info-content-right-table-select  '>
                                <div className='customer-info-content-right-table-select-item'>
                                    <Form.Select size="lg"
                                        required
                                        value={address1}
                                        name="address1"
                                        ref={provinceRef}
                                        onChange={onCustomerFormChangeProvince}
                                        bsPrefix="form-select form-select-lg "
                                    >
                                        <option >Tỉnh/Thành</option>
                                        {
                                            Province.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.Name} >{item.Name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                    <div className='p-2 invalidmess '>
                                        <div ref={provinceInvalidRef}>
                                            Vui lòng nhập tỉnh thành
                                        </div>
                                    </div>
                                </div>
                                <div className='customer-info-content-right-table-select-item'>
                                    <Form.Select size="lg"
                                        required
                                        value={address2}
                                        name="address2"
                                        onChange={onCustomerFormChangeDistrict}
                                        ref={districtRef}
                                        bsPrefix="form-select form-select-lg "
                                    >
                                        <option >Quận/Huyện</option>
                                        {
                                            District.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.Name} >{item.Name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                    <div className='p-2 invalidmess '>
                                        <div ref={districtInvalidRef}>
                                            Vui lòng nhập quận huyện
                                        </div>
                                    </div>
                                </div>
                                <div className='customer-info-content-right-table-select-item '>
                                    <Form.Select size="lg"
                                        required
                                        value={address3}
                                        name="address3"
                                        ref={wardRef}
                                        bsPrefix="form-select form-select-lg"
                                        onChange={onCustomerFormChange}
                                    >
                                        <option >Phường/Xã</option>
                                        {
                                            Ward.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.Name} >{item.Name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                    <div className='p-2 invalidmess '>
                                        <div ref={wardInvalidRef}>
                                            Vui lòng nhập phường xã
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerInfo