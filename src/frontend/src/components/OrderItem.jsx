import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import numberWithCommas from '../utils/numberWithCommas';



const OrderItem = props => {
    const [item, setItem] = useState(props.item)
    const [quantity, setquantity] = useState(props.item.quantity)
    useEffect(() => {
        setquantity(props.item.quantity)
        setItem(props.item)
    }, [props.item])
    return (
        <div className='cart-item'>
            <div className="cart-item-image">
                {/* <img src={item.product ? require(`../assets/${item.product.image1}`) : ""} alt='' /> */}
                {/* <img src={props.img01.includes("images") ? require(`../assets/${props.img01}`) : props.img01} alt="" /> */}
                <img src={item ? item.product.image1.includes("images") ? require(`../assets/${item.product.image1}`) : item.product.image1 : ""} alt='' />
            </div>
            <div className="cart-item-info">
                <div className="cart-item-info-name">
                    {`${item.product ? item.product.title : ""} - ${item.color} - ${item.size}`}
                </div>
                <div className="cart-item-info-price">
                    {item.product ? item.product.sale ?
                        (
                            <div>
                                {numberWithCommas(Number((item.product.price - item.product.price * item.product.sale / 100)))} đ
                                <span className='product-card-price-old'>
                                    <del>{numberWithCommas(item.product.price)} đ</del>
                                </span>
                            </div>)
                        :
                        <div>{numberWithCommas(Number((item.product.price)))} đ</div>
                        : ""}
                </div>
                <div className="cart-item-info-quantity">
                    <div className="product-info-item-quantity">

                        <div className="product-info-item-quantity-input fs-5">
                            Số lượng: {quantity}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

OrderItem.propTypes = {
    item: PropTypes.object
}

export default OrderItem