import React, { useEffect, useState } from 'react'
import ProductView from './ProductView'
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../redux/product-modal/productModalSlice'
import axios from 'axios'
import { apiUrl } from '../utils/constant'
const ProductViewModal = () => {

    const productSlug = useSelector((state) => state.productModal.value)
    const [product, setproduct] = useState(undefined)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const rs = await axios.get(`${apiUrl}/product/slug/${productSlug}`)
            setproduct(rs.data[0])
        }
        fetchData()
    }, [productSlug])
    return (
        <div className={`product-view-modal ${product === undefined ? '' : 'active'}`}>
            <div className="product-view-modal-content">
                <ProductView product={product} />
                <div className="product-view-modal-content-close">
                    <Button
                        size='sm'
                        onclick={() => dispatch(remove())}
                    >
                        đóng
                    </Button>
                </div>
            </div>

        </div>


    )
}
export default ProductViewModal
