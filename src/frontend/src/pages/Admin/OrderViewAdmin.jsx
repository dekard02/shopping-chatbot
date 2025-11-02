import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import Card, { CardBody, CardHeader } from '../../components/Card'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import formatDate from '../../utils/formatDate'
import Button from '../../components/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { apiUrl } from '../../utils/constant'
import { setAlert } from '../../redux/alert-message/alertMessage'
import { updateOrder } from '../../redux/order/orderSlice'
import OrderItem from "../../components/OrderItem"
import numberWithCommas from '../../utils/numberWithCommas'
const OrderViewAdmin = () => {

  const { id } = useParams()
  const orderData = useSelector(state => state.orderSlice.value)
  const token = useSelector(state => state.userState.token)
  const productData = useSelector(state => state.productsSlice.value)
  const productSaleData = useSelector(state => state.saleSlice.value)
  const customerData = useSelector(state => state.customerSlice.value)
  const [order, setOrder] = useState({})
  const [status, setStatus] = useState("")
  const [totalPrice, settotalPrice] = useState(0)
  const [tmpPrice, settmpPrice] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const statusOption = [
    "đang chờ xữ lí",
    "Xác nhận",
    "Đang chuẩn bị hàng",
    "Đang giao hàng",
    "Đã giao hàng",
    "Đã thanh toán",
    "Chờ thanh toán"
  ]
  const onChange = (e) => {
    setStatus(e.target.value)
  }
  const updateStatus = async () => {
    if (status !== "Trạng thái" && status !== order.status)
      if (window.confirm(`Xác nhận thay đổi trạng thái đơn hàng?`)) {
        let body = {
          id: order.id,
          status: status
        }
        let rs = await axios.post(`${apiUrl}/cart/update-by-id`, body, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
        if (rs.data) {

          dispatch(setAlert({
            message: "Cập nhật trạng thái đơn hàng thành công!",
            type: "success"
          }))
          let tmp = {
            ...order,
            status: status
          }
          dispatch(updateOrder(tmp))
        }
        else {
          dispatch(setAlert({
            message: "Cập nhật trạng thái đơn hàng thất bại",
            type: "danger"
          }))
        }
      }
  }
  const findProductById = (id) => {
    return productData.find(item => {
      return item.id === id
    })
  }
  const findCustomerById = (id) => {
    return customerData.find(item => item.id === id)
  }
  useEffect(() => {
    if (orderData) {
      let list
      let order = orderData.find((item) => {
        return item.id === id
      })
      if (order) {
        list = order.list_product.map(item => {
          return { ...item, product: findProductById(item.product_id) }
        })
      }
      setOrder({ ...order, list_product: list })

    }

  }, [id, orderData])
  useEffect(() => {
    setStatus(order.status)
  }, [order])
  useEffect(() => {
    if (order.list_product) {
      settotalPrice(order.list_product.reduce((total, item) => {
        let findSale = productSaleData.find(element => element.slug === item.slug)
        if (findSale) {
          return total + (Number(item.quantity) * Number(item.price - item.price * findSale.sale / 100))
        }
        return total + (Number(item.quantity) * Number(item.price))
      }, 0))
      settmpPrice(order.list_product.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
    }

  }, [order])

  return (
    <ContentMain headerTitle='Chi tiết đơn hàng'
      headerLeftAction={{
        ...btnAction,
        title: 'Quay lại Đơn hàng',
        action: () => navigate('/admin/order')
      }}
    >
      <div className='orderview'>
        <Card>
          <CardHeader>
            <div className='orderview-header'>
              <div className="orderview-header-item">
                <div className='orderview-header-item-date'>
                  <i className='bx bx-calendar'></i>
                  <span>{formatDate(order.create_date ? order.create_date : [])}</span>
                </div>
                <div className='orderview-header-item-orderid'>
                  <span>{`Mã đơn hàng: ${order.id}`}</span>
                </div>
              </div>
              <div className="orderview-header-item">
                <Form.Group  >
                  <Form.Select
                    size="lg"
                    value={status}
                    name="status"
                    onChange={onChange}
                    bsPrefix="form-select form-select-lg"
                  >
                    <option>Trạng thái</option>
                    {
                      statusOption.map((item, index) => {
                        return (
                          <option key={index} value={item} >{item}</option>
                        )
                      })
                    }
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập loại sản phẩm.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="orderview-header-item" onClick={updateStatus}>
                <Button backgroundColor={"green"}
                  size={"sm"}
                >
                  <i className='bx bx-save'></i>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="orderview-body">
              <div className='orderview-body-info'>
                <div className="dashboard-counts-item">
                  <Card>
                    <CardBody>
                      <div className="dashboard-counts-item-container">
                        <span className='dashboard-counts-item-container-icon customer'>
                          <i className='bx bx-face'></i>
                        </span>
                        <div className='dashboard-counts-item-container-title'>
                          <p>Khách hàng</p>
                          <p>{order ? findCustomerById(order.customer_id) ? findCustomerById(order.customer_id).customer_name : "" : ""}</p>
                          <p>{order ? findCustomerById(order.customer_id) ? findCustomerById(order.customer_id).username : "" : ""}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="dashboard-counts-item">
                  <Card>
                    <CardBody>
                      <div className="dashboard-counts-item-container">
                        <span className='dashboard-counts-item-container-icon order'>
                          <i class='bx bxs-truck'></i>
                        </span>
                        <div className='dashboard-counts-item-container-title'>
                          <p>Thông tin đơn</p>
                          <p>Giao hàng nhanh</p>
                          <p>Thanh toán: tiền mặt</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="dashboard-counts-item">
                  <Card>
                    <CardBody>
                      <div className="dashboard-counts-item-container">
                        <span className='dashboard-counts-item-container-icon sale'>
                          <i class='bx bxs-edit-location' ></i>
                        </span>
                        <div className='dashboard-counts-item-container-title'>
                          <p>Vận chuyển</p>
                          <p></p>
                          <p>Địa chỉ: {order ? order.address : ""}</p>

                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="orderview-body-listproduct">
                {
                  order ?
                    order.list_product ?
                      order.list_product.map((item, index) => {
                        return <OrderItem item={item} key={index} />
                      })
                      : <></>
                    : <></>
                }
              </div>
              <div className='order-rightcontent-content-fee'>
                <div className="order-rightcontent-content-fee-item">
                  <div className='order-rightcontent-content-fee-item-left' >
                    Tạm tính
                  </div>
                  <div className='order-rightcontent-content-fee-item-right'>
                    {numberWithCommas(Number(tmpPrice))} đ
                  </div>
                </div>
                <div className="order-rightcontent-content-fee-item">
                  <div className='order-rightcontent-content-fee-item-left' >
                    Phí ship
                  </div >
                  <div className='order-rightcontent-content-fee-item-right' >
                    {totalPrice > 279000 ? "0" : numberWithCommas(Number(25000))} đ
                  </div>
                </div>
                <div className="order-rightcontent-content-fee-item">
                  <div className='order-rightcontent-content-fee-item-left' >
                    Giảm giá
                  </div >
                  <div className='order-rightcontent-content-fee-item-right' >
                    {totalPrice === tmpPrice ? "0" : numberWithCommas(Number(totalPrice - tmpPrice))} đ
                  </div>
                </div>
              </div>
              <div className='order-rightcontent-content-fee'>
                <div className="order-rightcontent-content-fee-item">
                  <div className='order-rightcontent-content-fee-item-left' >
                    Tổng
                  </div>
                  <div className='order-rightcontent-content-fee-item-right'>
                    {totalPrice > 279000 ? numberWithCommas(Number(totalPrice))
                      : numberWithCommas(Number(totalPrice + 25000))} đ
                  </div>
                </div>

              </div>

            </div>
          </CardBody>
        </Card>
      </div>
    </ContentMain >
  )
}

export default OrderViewAdmin