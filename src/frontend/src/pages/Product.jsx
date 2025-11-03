import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import { useParams } from 'react-router-dom'
import ProductView from '../components/ProductView'
import axios from 'axios'
import { apiUrl } from '../utils/constant'

const Product = props => {
  const { slug } = useParams();
  const [product, setproduct] = useState()
  const [relatedProducts, setRelatedProducts] = useState(undefined)
  useEffect(() => {
    const fetchData = async () => {
      const rs = await axios.get(`${apiUrl}/product/category_slug/${product.categorySlug}`)
      setRelatedProducts(rs.data)
    }
    if (product)
      fetchData()
  }, [product])
  useEffect(() => {
    const fetchData = async () => {
      const rs = await axios.get(`${apiUrl}/product/slug/${slug}`)
      setproduct(
        rs.data[0]
      )
    }
    fetchData()
  }, [slug])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])
  return (
    <Helmet title={product ? product.title : ""}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>
          Khám phá thêm
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {relatedProducts ?
              relatedProducts.map((item, index) => (
                <ProductCard
                  key={index}
                  img01={item.image1}
                  img02={item.image2}
                  name={item.title}
                  price={item.price}
                  slug={item.slug}
                />
              ))
              : <></>
            }
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  )
}

export default Product
