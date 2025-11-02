import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentMain from '../../components/Admin/ContentMain'
import Card, { CardBody, CardHeader } from '../../components/Card'
import btnAction from '../../utils/btnAction'
import Searchbar from '../../components/Searchbar'
import CheckBox from '../../components/CheckBox'
import MyDataGrid from '../../components/MyDataGrid'
import { useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from '../../utils/constant'
import { setAlert } from '../../redux/alert-message/alertMessage'
import { addStaff, deleteStaff } from '../../redux/user/staffSlice'
import Button from '../../components/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
const Staff = () => {
  const staffData = useSelector(state => state.staffSlice.value)
  const [Check, setCheck] = useState("customer_name")
  const [staffDataSearch, setstaffDataSearch] = useState([])
  const [rows, setRows] = useState([])
  const token = useSelector(state => state.userState.token)
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const initialForm = {
    username: "",
    customer_name: "",
    phone: "",
    address: ""
  }
  const [userForm, setuserForm] = useState(initialForm)
  const { username, customer_name, phone, address } = userForm
  const dispatch = useDispatch()
  
  const columns = [
    {
      key: "customer_name",
      value: "Tên",
      class: "cell-green",
      width: 200,
    },
    {
      key: "username",
      value: "Email",
      class: "cell-green",
      width: 250,
    },
    {
      key: "phone",
      value: "Số điện thoại",
      class: "cell-green",
      width: 250,
    },
    {
      key: "address",
      value: "Địa chỉ",
      class: "cell-green",
      width: 250,
    },
    {
      key: "option",
      value: "Tùy chọn",
      class: "cell-red",
      width: 100
    }
  ]
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onChange = (e) => {
    setuserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }
  const deleteItem = async (id, name) => {
    let element = staffData.find(item => item.id === id)
    if (window.confirm(`Bạn có muốn xóa tài khoản của ${name} khỏi danh sách nhân viên?`)) {
      let rs = await axios.delete(`${apiUrl}/user/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
      if (rs.data) {
        dispatch(setAlert({
          message: "Xóa tài khoản thành công",
          type: "success"
        }))
        dispatch(deleteStaff(element))
      }
      else {
        dispatch(setAlert({
          message: "Xóa tài khoản thất bại ",
          type: "danger"
        }))
      }
    }
  }
  const handleAddress = (item) => {
    console.log(item);
    let tmp = item.split(",")
    console.log(tmp);
    return {
      house_address: tmp[0],
      address1: tmp[3],
      address2: tmp[2],
      address3: tmp[1],
    }
  }
  const addItem = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else {
      setValidated(false)
      if (window.confirm(`Xác nhận đăng ký tài khoản?`)) {
        let body = {
          ...userForm,
          ...handleAddress(userForm.address),
          password: "admin"
        }
        let rs = await axios.post(`${apiUrl}/user/sign-in-admin`, body, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
        if (rs.data) {
          setShow(false)
          dispatch(setAlert({
            message: "Tạo tài khoản thành công!",
            type: "success"
          }))

          dispatch(addStaff(rs.data))

        }
        else {
          dispatch(setAlert({
            message: "Tạo tài khoản thất bại!",
            type: "danger"
          }))
        }
      }
    }
  }
  useEffect(() => {
    setstaffDataSearch(rows)
  }, [rows])
  useEffect(() => {
    const tmprows = staffData.map((item) => {
      return {
        ...item,
        name: item.customer_name,
        address: item.house_address ? `${item.house_address} phường ${item.address3},quận ${item.address2}, tp ${item.address1}` : "",
        option: {
          type: "delete",
          click: deleteItem
        }
      }
    })
    setRows(tmprows)
  }, [staffData])
  return (
    <ContentMain headerTitle='Nhân viên'
      headerRightAction={{
        ...btnAction,
        title: 'Tạo mới',
        action: () => { handleShow(true) }
      }}
    >
      <CardHeader>
        <Searchbar type="staff" keyword={`${Check}`} admin placeholder={"Tìm kiếm nhân viên..."} data={rows} onsearch={(data) => { setstaffDataSearch(data) }} />
        <div style={{ display: "contents" }}>
          <div onClick={() => { setCheck("customer_name") }}>
            <CheckBox label='Tên' checked={Check === "customer_name"} />
          </div>
          <div onClick={() => { setCheck("username") }}>
            <CheckBox label='Tài khoản' checked={Check === "username"} />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {
          staffDataSearch.length < rows.length ?
            <div style={{ width: "100%", columnGap: 10, height: "540px" }}>
              <MyDataGrid ColumnHeader={columns} Data={staffDataSearch} />
            </div>
            :
            <div style={{ width: "100%", columnGap: 10, height: "540px" }}>
              <MyDataGrid ColumnHeader={columns} Data={rows} />
            </div>
        }

      </CardBody>
      <Modal show={show} onHide={handleClose} size="xl" centered backdrop="static" dialogClassName='modal-90w'>
        <Form noValidate validated={validated} onSubmit={addItem}>
          <Modal.Header closeButton>
            <Modal.Title>Đăng ký tài khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group >
              <Form.Label>Tài khoản/Email</Form.Label>
              <Form.Control
                required
                type="email"
                value={username}
                name="username"
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Tên</Form.Label>
              <Form.Control
                required
                type="text"
                value={customer_name}
                name="customer_name"
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập họ tên.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="number"
                value={phone}
                name="phone"
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập số điện thoại.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                required
                type="text"
                value={address}
                name="address"
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập địa chỉ.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' size={"sm"} >
              Lưu
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </ContentMain >
  )
}

export default Staff