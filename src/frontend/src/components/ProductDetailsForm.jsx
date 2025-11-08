import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import numberWithCommas from '../utils/numberWithCommas';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../redux/shopping-cart/cartItemsSlice';

export const ProductDetailsForm = ({ initialArgs, onSubmited }) => {
    const dispatch = useDispatch();

    const product = useSelector((state) =>
        state.productsSlice.value.find((p) => p.slug === initialArgs.slug)
    );

    const [color, setColor] = useState(undefined);
    const [size, setSize] = useState(undefined);
    const [quantity, setQuantity] = useState(1);

    const productDetails = {
        ...product,
        colors: product.colors.split(','),
        size: product.size.split(','),
    };

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    const handleSubmit = () => {
        console.log("Submitting with:", { color, size, quantity });
        if (!color) {
            alert('Vui lòng chọn màu sắc');
            return;
        }
        if (!size) {
            alert('Vui lòng chọn kích cỡ');
            return;
        }

        // Call the onSubmited function (which is the 'respond' function from the hook)
        // to send the data back to the AI.
        dispatch(addItem({
            slug: product.slug,
            color,
            size,
            quantity,
            price: product.price,
        }));
        console.log({
            slug: product.slug,
            color,
            size,
            quantity,
            price: product.price,
        });
        onSubmited({
            slug: product.slug,
            color,
            size,
            quantity,
            price: product.price,
        });
    };
    
    if (!product) {
        onSubmited(null);
        return <div className="text-red-500">Sản phẩm không được tìm thấy.</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Vui lòng chọn thông tin sản phẩm</h3>
            <div className="flex items-center mb-4">
                <img
                    src={require(`../assets/${productDetails.image1}`)}
                    alt={productDetails.title}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div>
                    <h4 className="font-bold text-lg">{productDetails.title}</h4>
                    <p className="text-gray-700">{numberWithCommas(productDetails.price)}đ</p>
                </div>
            </div>

            <div className="mb-4">
                <div className="font-semibold mb-2">Màu sắc</div>
                <div className="flex flex-wrap gap-2">
                    {productDetails.colors.map((item, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer p-2 border rounded-md ${color === item ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
                            onClick={() => setColor(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <div className="font-semibold mb-2">Kích cỡ</div>
                <div className="flex flex-wrap gap-2">
                    {productDetails.size.map((item, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer p-2 border rounded-md ${size === item ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
                            onClick={() => setSize(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <div className="font-semibold mb-2">Số lượng</div>
                <div className="flex items-center">
                    <button onClick={() => updateQuantity('minus')} className="border rounded-md px-3 py-1">-</button>
                    <span className="px-4">{quantity}</span>
                    <button onClick={() => updateQuantity('plus')} className="border rounded-md px-3 py-1">+</button>
                </div>
            </div>

            <Button onclick={handleSubmit} size="block">Xác nhận và thêm vào giỏ</Button>
        </div>
    );
};

ProductDetailsForm.propTypes = {
    initialArgs: PropTypes.shape({
        slug: PropTypes.string.isRequired,
    }).isRequired,
    onSubmited: PropTypes.func.isRequired,
};
