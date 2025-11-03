import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid';
import DataGridOptions from './DataGridOptions';
const MyDataGrid = props => {
    const columns = props.ColumnHeader ?
        props.ColumnHeader.map((item) => {
            return {
                field: item.key,
                headerName: item.value,
                width: item.width,
                headerAlign: 'center',
                align: 'center',
                cellClassName: item.key === "option" ? item.class : "",
                renderCell: (params) => {
                    if (params.field === "option") {
                        let id = params.row.id
                        let name = params.row.name
                        let type = params.row ? params.row.option.type : ""
                        let func = params.row ? params.row.option.click : null
                        return <DataGridOptions click={() => func(id, name)} type={type} />
                    }
                }

            }
        }
        ) : []
    const rows = props.Data ? props.Data : []
    // const rows = props.Data ? props.Data.map((item, index) => {
    //     let keys = Object.keys(item)
    //     let values = Object.values(item)
    //     let row = {}
    //     for (let i = 0; i < keys.length; i++) {
    //         row = {
    //             ...row,
    //             [keys[i]]: values[i]
    //         }
    //     }
    //     return {
    //         ...row
    //     }
    // }) : []
    const handlechange = (id) => {
        let tmp = rows.filter((row) => { return row.id == id })[0]
        if (tmp)
            if (tmp.option.selectclick)
                tmp.option.selectclick(id)
    }
    return (
        <DataGrid
            density='comfortable'
            rows={rows}
            columns={columns}
            // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            // rowsPerPageOptions={10}
            // disableSelectionOnClick
            autoPageSize
            onSelectionModelChange={id => handlechange(id)}
            experimentalFeatures={{ newEditingApi: true }}
        />
    )
}

MyDataGrid.propTypes = {
    ColumnHeader: PropTypes.array,
    Data: PropTypes.array
}

export default MyDataGrid