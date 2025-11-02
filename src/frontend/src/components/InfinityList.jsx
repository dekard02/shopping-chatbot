import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import ProductCard from './ProductCard'
const InfinityList = props => {
    const listRef = useRef(null)
    const perLoad = 6 // each items load
    const [data, setData] = useState([])
    const [load, setload] = useState(true)
    const [index, setIndex] = useState(0)


    useEffect(() => {
        setData(props.data.slice(0, perLoad))
        setIndex(1)
    }, [props.data])
    // add event scroll 
    useEffect(() => {
        window.addEventListener("scroll", () => {

            if (listRef.current) {
                if (window.scrollY + window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop + 200) {
                    setload(true)
                }
            }
        })

        /*   return () => {
              window.removeEventListener("scroll")
          } */
    }, [listRef])
    // load rest products  when scroll
    useEffect(() => {
        const getItems = () => {
            const pages = Math.floor(props.data.length / perLoad)
            const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1

            if (load && index <= maxIndex) {
                const start = perLoad * index
                const end = start + perLoad

                setData(data.concat(props.data.slice(start, end)))
                setIndex(index + 1)
            }

        }
        getItems()
        setload(false)
    }, [load, index, data, props.data])


    return (
        <div ref={listRef}>
            <Grid
                col={3}
                mdCol={2}
                smCol={1}
                gap={20}>
                {
                    data.map((item, index) => (
                        <ProductCard
                            key={index}
                            img01={item.image1}
                            img02={item.image2}
                            name={item.title}
                            price={item.price}
                            slug={item.slug}
                            sale={item.sale}
                        />
                    ))

                }
            </Grid>

        </div>
    )
}

InfinityList.propTypes = {
    data: PropTypes.array.isRequired
}

export default InfinityList
