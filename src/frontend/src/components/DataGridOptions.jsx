import React from 'react'
import PropTypes from 'prop-types'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const DataGridOptions = props => {
    const type = props.type ? props.type : "option"
    return (
        <div style={{ cursor: 'pointer' }} onClick={props.click ? props.click : null}>
            {
                type === "delete" ? <DeleteIcon /> : type === "view" ? <RemoveRedEyeIcon /> : <MoreHorizIcon />
            }
        </div>
    )
}
DataGridOptions.propTypes = {
    type: PropTypes.string,
    click: PropTypes.func,
    listFunc: PropTypes.object
}
export default DataGridOptions