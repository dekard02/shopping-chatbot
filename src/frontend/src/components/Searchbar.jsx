import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const Searchbar = props => {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        const newFilter = props.data.filter((value) => {
            if (props.type === "order")
                return normalizeStr(value[props.keyword]).toLowerCase().startsWith(normalizeStr(searchWord).toLowerCase());

            return normalizeStr(value[props.keyword]).toLowerCase().includes(normalizeStr(searchWord).toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        if (props.admin) {
            if (searchWord === "") {
                props.onsearch(props.data)
            }
            else props.onsearch(newFilter)

        }

    };

    // cchuẩn hóa chuỗi về dạng không dấu
    const normalizeStr = (str) => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
        if (props.admin)
            props.onsearch(props.data)
    };
    return (
        <div className="search">
            <div className="search-inputs">
                <input
                    type="text"
                    placeholder={props.placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="search-icon">
                    {filteredData.length === 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
            </div>
            <div className={`search-data ${(filteredData.length !== 0 && props.type !== "order" && props.type !== "customer"  && props.type !== "staff" )? 'active' : ''}`}>
                {filteredData.length != 0 && (

                    filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <Link key={key} className="search-data-item" to={props.admin ? `/admin/product/${value.slug}` : `/catalog/${value.slug}`}>
                                <p>{value[props.keyword]} </p>
                            </Link>

                        );
                    })
                )}
            </div>
        </div>
    )
}
Searchbar.propsTypes = {
    data: PropTypes.array,
    placeholder: PropTypes.string,
    admin: PropTypes.bool,
    onsearch: PropTypes.func,
    keyword: PropTypes.string,
    type: PropTypes.string
}
export default Searchbar
