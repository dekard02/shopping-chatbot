import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import numberWithCommas from '../utils/numberWithCommas'
import { getAllProduct } from '../redux/product/productsSlice'
import { setAlert } from '../redux/alert-message/alertMessage'
import { setLoginModal } from '../redux/login-sign_modal/loginSlice'
import { getAllSale } from '../redux/product/saleSlice'

const Cart = () => {

  const cartItems = useSelector((state) => state.cartItems.value)
  const productSale = useSelector(state => state.saleSlice.value)
  const [cartProducts, setcartProducts] = useState([])
  const [totalProducts, settotalProducts] = useState(0)
  const [totalPrice, settotalPrice] = useState(0)
  const productList = useSelector(state => state.productsSlice.value)
  const user = useSelector(state => state.userState.user)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const gotoOrder = () => {
    if (user) {
      if (cartItems.length > 0)
        navigate('/order')
      else
        dispatch(setAlert({
          message: "Chưa có sản phẩm trong giỏ hàng",
          type: "warning",
        }))
    }
    else {
      setTimeout(() => {
        dispatch(setLoginModal())
      }, 1500)
      dispatch(setAlert({
        message: "Bạn chưa đăng nhập vui lòng đặng nhập để đặt hàng",
        type: "danger",
      }))

    }
  }
  const getCartItemsInfo = (cartItems) => {
    if (productList.length > 0) {
      let res = []
      if (cartItems.length > 0) {
        cartItems.forEach(e => {
          let product = productList.filter(item => {

            return item.slug === e.slug
          })
          res.push({
            ...e,
            product: product[0]
          })
        })
      }

      return res.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))
    }
  }
  useEffect(() => {
    setcartProducts(getCartItemsInfo(cartItems))
    settotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    settotalPrice(cartItems.reduce((total, item) => {
      let findSale = productSale.find(element => element.slug === item.slug)
      if (findSale) {
        return total + (Number(item.quantity) * Number(item.price - item.price * findSale.sale / 100))
      }
      return total + (Number(item.quantity) * Number(item.price))
    }, 0))
  }, [cartItems, productList])
  useEffect(() => {
    dispatch(getAllProduct())
    dispatch(getAllSale())
  }, [])
  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart-info">
          <div className="cart-info-txt">
            <p>
              Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
            </p>
            <div className="cart-info-txt-price">
              <span>Thành tiền:</span> <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <div className="cart-info-btn">
            <Button size="block" onclick={() => {
              gotoOrder()
            }}>
              Đặt hàng
            </Button>
            <Link to="/catalog">
              <Button size="block">
                Tiếp tục mua hàng
              </Button>
            </Link>

          </div>
        </div>
        <div className="cart-list">
          {
            (cartProducts) ?
              cartProducts.map((item, index) => {
                return <CartItem item={item} key={index} />
              })
              : <></>
          }
        </div>
      </div>
    </Helmet>
  )
}

export default Cart
