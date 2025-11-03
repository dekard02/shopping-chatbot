import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'
import { useDispatch, useSelector } from 'react-redux'
import { set } from '../redux/product-modal/productModalSlice'
import axios from 'axios'
import { apiUrl } from '../utils/constant'
import { deleteProduct } from '../redux/product/productsSlice'
import { setAlert } from '../redux/alert-message/alertMessage'

const ProductCard = props => {
    const productData = useSelector(state => state.productsSlice.value)
    const categoryData = useSelector(state => state.categorySlice.value)
    const token = useSelector(state => state.userState.token)

    const delProduct = async (id, name) => {
        if (window.confirm(`Bạn có muốn xóa sản phẩm ${name} này chứ?`)) {
            let productForm = productData.find(item => item.id === id)
            if (productForm) {
                let categoryName = categoryData.find(item => item.slug === productForm.categorySlug) ? categoryData.find(item => item.slug === productForm.categorySlug).name : ""
                let body = {
                    ...productForm,
                    category: categoryName ? categoryName : ""
                }
                let rs = await axios.post(`${apiUrl}/product/delete-product`, body, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
                if (rs.data) {
                    dispatch(setAlert({
                        message: "Xóa sản phẩm thành công",
                        type: "success"
                    }))
                    dispatch(deleteProduct(productForm))
                }
                else {
                    dispatch(setAlert({
                        message: "Xóa sản phẩm thất bại ",
                        type: "danger"
                    }))
                }
            }
        }
    }
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <div className='product-card'>
            <Link to={props.admin ? `/admin/product/${props.slug}` : `/catalog/${props.slug}`}>
                <div className='product-card-image'>
                    <img src={props.img01.includes("images") ? require(`../assets/${props.img01}`) : props.img01} alt="" />
                    <img src={props.img02.includes("images") ? require(`../assets/${props.img02}`) : props.img02} alt="" />
                </div>
                <h3 className='product-card-name'>{props.name}</h3>
                <div className="product-card-price">
                    {
                        props.sale ?
                            (
                                <div>
                                    {numberWithCommas(Number((Number(props.price) - Number(props.price) * props.sale / 100)))} đ
                                    <span className='product-card-price-old'>
                                        <del>{numberWithCommas(props.price)} đ</del>
                                    </span>
                                </div>)
                            :
                            <div>{numberWithCommas(Number((props.price)))} đ</div>
                    }

                </div>
            </Link>
            <div className="product-card-btn">
                {!props.admin ?
                    <Button
                        size='xs'
                        icon='bx bx-cart'
                        animate={true}
                        onclick={() => dispatch(set(props.slug))}
                    >
                        chọn mua
                    </Button>
                    :
                    <div className="product-card-btn-double">
                        <Button
                            backgroundColor={'green'}
                            size='sm'
                            icon='bx bx-edit'
                            animate={true}
                            onclick={() => navigate(`/admin/product/${props.slug}`)}
                        >
                            chỉnh sửa
                        </Button>  <Button
                            size='sm'
                            backgroundColor={'red'}
                            icon='bx bx-trash'
                            animate={true}
                            onclick={() => delProduct(props.id, props.name)}
                        >
                            xóa
                        </Button>
                    </div>
                }

            </div>
        </div>
    )
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    sale: PropTypes.number,
    admin: PropTypes.bool,
    id: PropTypes.string
}

export default ProductCard
