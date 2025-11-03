import React, { useState } from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import Card, { CardBody, CardHeader } from '../../components/Card'
import MyDataGrid from '../../components/MyDataGrid'
import formatDate from '../../utils/formatDate'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Searchbar from '../../components/Searchbar'
import CheckBox from '../../components/CheckBox'
import numberWithCommas from '../../utils/numberWithCommas'
const Order = () => {
  const orderData = useSelector(state => state.orderSlice.value)
  const customerData = useSelector(state => state.customerSlice.value)
  const [Check, setCheck] = useState("name")
  const [rows, setRows] = useState([])
  const [orderDataSearch, setorderDataSearch] = useState([])
  const navigate = useNavigate()
  const columns = [
    {
      key: "name",
      value: "Tên",
      class: "cell-green",
      width: 200,
    },
    {
      key: "email",
      value: "Email",
      class: "cell-green",
      width: 250,
    },
    {
      key: "status",
      value: "Trạng thái",
      class: "cell-green",
      width: 150,
    },
    {
      key: "createdate",
      value: "Ngày",
      class: "cell-green",
      width: 200,
    },
    {
      key: "total",
      value: "Tổng",
      class: "cell-green",
      width: 170,
    },
    {
      key: "option",
      value: "Tùy chọn",
      class: "cell-green",
      width: 100
    },
  ]
  const findCustomerById = (id) => {
    return customerData.find(item => item.id === id)
  }

  const gotoOrderView = (id) => {
    navigate(`/admin/order/${id}`)
  }
  useEffect(() => {
    setorderDataSearch(rows)
  }, [rows])
  useEffect(() => {
    if (orderData) {
      const tmprows = orderData.map((item) => {
        return {
          ...item,
          email: findCustomerById(item.customer_id) ? findCustomerById(item.customer_id).username : "",
          name: findCustomerById(item.customer_id) ? findCustomerById(item.customer_id).customer_name : "",
          createdate: item ? formatDate(item.create_date) : "",
          total: item ? numberWithCommas(item.total) : "",
          option: {
            type: "view",
            click: gotoOrderView
          }
        }
      })
      setRows(tmprows)
    }

  }, [orderData])
  return (
    <ContentMain headerTitle='Đơn hàng'>
      <CardHeader>
        <Searchbar type="order" keyword={`${Check}`} admin placeholder={"Tìm kiếm đơn hàng..."} data={rows} onsearch={(data) => { setorderDataSearch(data) }} />
        <div style={{ display: "contents" }}>
          <div onClick={() => { setCheck("name") }}>
            <CheckBox label='Tên' checked={Check === "name"} />
          </div>
          <div onClick={() => { setCheck("email") }}>
            <CheckBox label='E-mail' checked={Check === "email"} />
          </div>
          <div onClick={() => { setCheck("status") }}>
            <CheckBox label='Trạng thái' checked={Check === "status"} />
          </div>
          {/* <CheckBox label='Trạng thái' checked ={Check === "status"} /> */}
        </div>
      </CardHeader>
      <CardBody>
        {
          orderDataSearch.length < rows.length ?
            <div style={{ width: "100%", columnGap: 10, height: "540px" }}>
              <MyDataGrid ColumnHeader={columns} Data={orderDataSearch} />
            </div>
            :
            <div style={{ width: "100%", columnGap: 10, height: "540px" }}>
              <MyDataGrid ColumnHeader={columns} Data={rows} />
            </div>
        }
      </CardBody>
    </ContentMain >

  )
}

export default Order