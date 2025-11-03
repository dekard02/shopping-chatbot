import React, { useEffect, useState } from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import Card, { CardBody, CardHeader } from '../../components/Card'
import Grid from '../../components/Grid'
import ProductCard from '../../components/ProductCard'
import Searchbar from '../../components/Searchbar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProductAdmin = () => {
  const navigate = useNavigate()
  const productData = useSelector(state => state.productsSlice.value)
  const [productDataSearch, setproductDataSearch] = useState([])
  useEffect(() => {
    setproductDataSearch(productData)
  }, [productData])

  return (
    <ContentMain headerTitle='Sản phẩm'
      headerRightAction={{
        ...btnAction,
        title: 'Tạo mới',
        action: () => navigate('/admin/product/new')
      }}
    >
      <Card>
        <CardHeader>
          <Searchbar keyword="title" type="product" admin placeholder={"Tìm kiếm sản phẩm..."} data={productData} onsearch={(data) => { setproductDataSearch(data) }} />
        </CardHeader>
        <CardBody>
          <Grid col={4}
            mdCol={2}
            smCol={1}
            gap={25}
          >
            {
              productDataSearch ?
                productDataSearch.map((item, index) => {
                  return (
                    <ProductCard
                      key={index}
                      img01={item.image1}
                      img02={item.image2}
                      name={item.title}
                      price={item.price}
                      slug={item.slug}
                      sale={item.sale}
                      id={item.id}
                      admin
                    />
                  )
                })
                : <></>
            }

          </Grid>
        </CardBody>
      </Card>

    </ContentMain>
  )
}

export default ProductAdmin