import React, { useEffect } from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import Form from 'react-bootstrap/Form'
import Card, { CardBody } from '../../components/Card'
import MyDataGrid from '../../components/MyDataGrid'
import Button from '../../components/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiUrl } from '../../utils/constant'
import axios from 'axios'
import { setAlert } from '../../redux/alert-message/alertMessage'
import { addCategory, deleteCategory, updateCategory } from '../../redux/category/categorySlice'
const Category = () => {
  const dispatch = useDispatch()
  const [IdItem, setIdItem] = useState([])
  const [isUpdate, setIsUpdate] = useState(true)
  const categoryData = useSelector(state => state.categorySlice.value)
  const token = useSelector(state => state.userState.token)
  const [rows, setRows] = useState([])
  const initialForm = {
    id: "",
    name: "",
    slug: ""
  }
  const [categoryForm, setcategoryForm] = useState(initialForm)
  const { name } = { ...categoryForm }
  const columns = [
    {
      key: "name",
      value: "Tên",
      class: "cell-red",
      width: 330,
    },
    {
      key: "option",
      value: "Tùy chọn",
      class: "cell-red",
      width: 100
    },
  ]
  const getItemUpdate = (id) => {
    setIdItem(id)
  }
  const deleteItem = async (id, name) => {
    const element = categoryData.find(item => item.id === id)
    if (window.confirm(`Bạn có muốn xóa ${name} khỏi loại sản phẩm chứ?`)) {
      let rs = await axios.delete(`${apiUrl}/category/delete-category/${id}`, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
      if (rs.data) {
        dispatch(setAlert({
          message: "Xóa phân loại thành côngg",
          type: "success"
        }))
        dispatch(deleteCategory(element))
        setIsUpdate(true)
        setcategoryForm(initialForm)
      }
      else {
        dispatch(setAlert({
          message: "Xóa phân loại thất bại ",
          type: "danger"
        }))
      }
    }
  }
  const handleChange = (e) => {
    if (e.target.value === "") {
      setIsUpdate(true)
      setIdItem([])
      setcategoryForm(initialForm)
    }
    else {
      setIsUpdate(false)
      setcategoryForm({
        ...categoryForm,
        name: e.target.value
      })
    }
  }

  const Update = async () => {
    const type = categoryData.findIndex(item => item.id === IdItem[0])

    if (type > -1) {
      let rs = await axios.post(`${apiUrl}/category/update-category`, categoryForm, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
      if (rs.data) {
        dispatch(setAlert({
          message: "Cập nhật phân loại thành công",
          type: "success"
        }))
        dispatch(updateCategory(categoryForm))
      }
      else {
        dispatch(setAlert({
          message: "Cập nhật phân loại thất bại ",
          type: "danger"
        }))
      }
    }
    else {
      if (window.confirm(`${categoryForm.name} chưa có, xác nhận tạo?`)) {
        let rs = await axios.post(`${apiUrl}/category/add-category`, categoryForm, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
        if (rs.data) {

          dispatch(setAlert({
            message: "Tạo phân loại thành công",
            type: "success"
          }))
          dispatch(addCategory(rs.data))
        }
        else {
          dispatch(setAlert({
            message: "Tên phân loại loại tồn tại ",
            type: "danger"
          }))
        }
      }
    }

    setIsUpdate(true)
    setcategoryForm(initialForm)
  }
  useEffect(() => {
    if (IdItem.length > 0) {
      const tmp = categoryData.filter(row => row.id == IdItem)[0]
      setcategoryForm({ ...tmp })
      setIsUpdate(false)
    }
  }, [IdItem]);
  useEffect(() => {
    const tmprows = categoryData.map((item) => {
      return {
        ...item,
        option: {
          type: "delete",
          click: deleteItem,
          selectclick: getItemUpdate
        }
      }
    })
    setRows(tmprows)
  }, [categoryData])
  return (
    <ContentMain headerTitle='Phân loại'>
      <Card>
        <CardBody>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", columnGap: 10, height: "480px" }}>
            <div style={{ width: "100%" }}>
              <Form.Group className='me-5 mb-3 w-100' >
                <Form.Label>Loại sản phẩm </Form.Label>
                <Form.Control
                  required
                  name="name"
                  value={name}
                  onChange={handleChange}
                  type="text"
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập loại sản phẩm.
                </Form.Control.Feedback>
              </Form.Group>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", columnGap: 10 }}>
                <Button
                  disabled={isUpdate}
                  animate={true}
                  size="sm"
                  backgroundColor={"green"}
                  icon="bx bx-edit"
                  onclick={Update}
                >cập nhật</Button>
                {/* <Button
                  disabled={isUpdate}
                  animate={true}
                  size="sm"
                  icon="bx bx-plus"
                  onclick={Create}
                >tạo mới</Button> */}
              </div>
            </div>
            <div style={{ width: "100%", height: "100%" }}>
              <MyDataGrid ColumnHeader={columns} Data={rows} />
            </div>
          </div>
        </CardBody>
      </Card>

    </ContentMain >
  )
}

export default Category