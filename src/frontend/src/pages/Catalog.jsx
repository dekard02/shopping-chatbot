import React, { useEffect, useState, useCallback, useRef } from 'react'
import Helmet from '../components/Helmet'
import colors from '../assets/fake-data/product-color'
import size from '../assets/fake-data/product-size'
import gender from '../assets/fake-data/gender'
import CheckBox from '../components/CheckBox'
import Button from '../components/Button'
import CatalogNotFound from '../components/CatalogNotFound'
import InfinityList from '../components/InfinityList'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../redux/product/productsSlice'
const Catalog = () => {
  // const Clothes = useSelector(state => state.clothesSlice.value)
  const categoryData = useSelector(state => state.categorySlice.value)
  const productData = useSelector(state => state.productsSlice.value)
  const initFilter = {
    category: [],
    color: [],
    size: [],
    gender: []

  }
  const [productList, setProductList] = useState();
  const [products, setProducts] = useState()
  const [filter, setFilter] = useState(initFilter)
  const [category, setCategory] = useState([])
  const filterRef = useRef(null)
  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({ ...filter, category: [...filter.category, item.slug] })
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.color] })
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item.size] })
          break;
        case "GENDER":
          setFilter({ ...filter, gender: [...filter.gender, item.value] })
          break;
        default:
      }
    }
    else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(e => e !== item.slug)
          setFilter({ ...filter, category: newCategory })
          break;
        case "COLOR":
          const newColor = filter.color.filter(e => e !== item.color)
          setFilter({ ...filter, color: newColor })
          break;
        case "SIZE":
          const newSize = filter.size.filter(e => e !== item.size)
          setFilter({ ...filter, size: newSize })
          break;
        case "GENDER":
          const newGender = filter.gender.filter(e => e !== item.value)
          setFilter({ ...filter, gender: newGender })
          break;
        default:

      }
    }
  }
  const clearFilter = () => {
    setFilter(initFilter)
  }
  const updateProducts = useCallback(
    () => {
      let temp = productList
      if (filter.category.length > 0) {
        temp = temp.filter(e => filter.category.includes(e.categorySlug))
      }
      if (filter.color.length > 0) {
        temp = temp.filter(e => {
          const check = e.colors.split(",").find(color => filter.color.includes(color))
          return check !== undefined
        })
      }
      if (filter.size.length > 0) {
        temp = temp.filter(e => {
          const check = e.size.split(",").find(size => filter.size.includes(size))
          return check !== undefined
        })
      }
      if (filter.gender.length > 0) {
        temp = temp.filter(e => filter.gender.includes(e.gender))
      }
      setProducts(temp)
    },
    [filter, setProducts],
  )
  useEffect(() => {
    updateProducts();
  }, [updateProducts])

  useEffect(() => {
    let tmp = categoryData.filter(item => {
      return item.slug.includes("ao") || item.slug.includes("quan")
    })
    setCategory(tmp)
  }, [categoryData])
  useEffect(() => {
    let Clothes = productData.filter(item => {

      return category.findIndex(itemt => itemt.slug === item.categorySlug) > -1
    })
    setProductList(Clothes)
    setProducts(Clothes)
  }, [productData, category])

  const showHideFilter = () => filterRef.current.classList.toggle('active')
  return (
    <Helmet title='Quần áo'>
      <div className="catalog">
        <div className="catalog-filter " ref={filterRef}>
          <div className="catalog-filter-close" onClick={() => { showHideFilter() }}>
            <i className='bx bx-left-arrow-alt'></i>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-title">
              Giới tính
            </div>
            <div className="catalog-widget-filter-content">
              {

                gender.map((item, index) => (
                  <div key={index} className='catalog-filter-widget-content-item'>
                    <CheckBox
                      label={item.display}
                      onChange={(input) => { filterSelect("GENDER", input.checked, item) }}
                      checked={filter.gender.includes(item.value)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-title">
              Danh mục sản phẩm
            </div>
            <div className="catalog-widget-filter-content">
              {
                category.map((item, index) => (
                  <div key={index} className='catalog-filter-widget-content-item'>
                    <CheckBox
                      label={item.name}
                      onChange={(input) => { filterSelect("CATEGORY", input.checked, item) }}
                      checked={filter.category.includes(item.slug)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-title">
              màu sắc
            </div>
            <div className="catalog-widget-filter-content">
              {
                colors.map((item, index) => (
                  <div key={index} className='catalog-filter-widget-content-item'>
                    <CheckBox
                      label={item.display}
                      onChange={(input) => { filterSelect("COLOR", input.checked, item) }}
                      checked={filter.color.includes(item.color)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-title">
              Kích cỡ
            </div>
            <div className="catalog-widget-filter-content">
              {
                size.map((item, index) => (
                  <div key={index} className='catalog-filter-widget-content-item'>
                    <CheckBox
                      label={item.display}
                      onChange={(input) => { filterSelect("SIZE", input.checked, item) }}
                      checked={filter.size.includes(item.size)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="catalog-filter-widget">
            <div className="catalog-filter-widget-content">
              <Button size='sm' onclick={clearFilter}>Xóa bộ lọc</Button>
            </div>
          </div>
        </div>
        <div className="catalog-filter-toggle">
          <Button size="sm" onclick={() => { showHideFilter() }}>bộ lọc</Button>
        </div>
        <div className="catalog-content">
          {products ?
            products.length == 0 ?
              <CatalogNotFound />
              :
              <InfinityList data={products} />
            : <></>
          }
        </div>
      </div>
    </Helmet>
  )
}


export default Catalog