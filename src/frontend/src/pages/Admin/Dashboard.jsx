import React, { useEffect, useState } from 'react'
import Card, { CardBody, CardHeader } from '../../components/Card'
import ContentMain from '../../components/Admin/ContentMain'
import { useSelector } from 'react-redux'
import numberWithCommas from '../../utils/numberWithCommas'
import Form from 'react-bootstrap/Form'
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import MyDataGrid from '../../components/MyDataGrid'
import { useNavigate } from 'react-router-dom'
import formatDate from '../../utils/formatDate'


const Dashboard = () => {
    ChartJS.register(ArcElement, Tooltip, Legend, Colors)
    ChartJS.register(CategoryScale, LinearScale, BarElement)
    let navigate = useNavigate()
    const options = {
        plugins: {
            colors: {
                forceOverride: true
            }
        }
    }
    const Saleoptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
        scales: {
            order: {
                // id: 'order',
                type: 'linear',
                position: 'left',
                ticks: { beginAtZero: true, color: 'green' },
            },
            sale: {
                // id: 'sale',
                type: 'linear',
                position: 'right',
                
                ticks: { beginAtZero: true, color: 'blue' },
            },
            x: { ticks: { beginAtZero: true } }
        }
    };
    const categoryData = useSelector(state => state.categorySlice.value)
    const orderData = useSelector(state => state.orderSlice.value)
    const customerData = useSelector(state => state.customerSlice.value)
    const productData = useSelector(state => state.productsSlice.value)
    const staffData = useSelector(state => state.staffSlice.value)
   
    const [rows, setRows] = useState([])
    const [ProductDataChart, setProductDataChart] = useState({
        labels: [],
        datasets: [{
            label: ' số lượng: ',
            data: [],

        }]
    })
    const [SaleDataChart, setSaleDataChart] = useState({
        labels: [],
        datasets: [{
            label: ' Đơn hàng: ',
            data: [],

        },
        {
            label: ' Doanh thu: ',
            data: [],

        }
        ]
    })
    const columns = [
        {
            key: "name",
            value: "Tên",
            class: "cell-green",
            width: 200,
        },
        {
            key: "email",
            value: "Email",
            class: "cell-green",
            width: 250,
        },
        {
            key: "status",
            value: "Trạng thái",
            class: "cell-green",
            width: 150,
        },
        {
            key: "createdate",
            value: "Ngày",
            class: "cell-green",
            width: 200,
        },
        {
            key: "total",
            value: "Tổng",
            class: "cell-green",
            width: 170,
        },
        {
            key: "option",
            value: "Tùy chọn",
            class: "cell-green",
            width: 100
        },
    ]
    const [Year, setYear] = useState(new Date().getFullYear())
    const listYears = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2]
    const { year } = Year
    const findProdutByCategory = (find, data) => {
        if (data && data.length > 0) {
            let tmp = data.filter(item => item.categorySlug === find)
            return tmp.length
        }
        return 0
    }

    const onChange = (e) => {
        if (orderData && orderData.length > 0) {
            setSaleDataChart({ ...saleDataChart(orderData, e.target.value) })
        }

    }
    const productDataChart = (Data) => {

        if (Data && Data.length > 0) {
            let labels = categoryData.map(item => { return item.name })
            let data = categoryData.map(item => {
                let count = findProdutByCategory(item.slug, Data)
                return count
            })

            return {
                labels: labels,
                datasets: [{
                    label: ' số lượng: ',
                    data: data,
                    // borderWidth: 1
                }]

            }
        }
        return {
            labels: [],
            datasets: [{
                label: ' số lượng: ',
                data: [],
            }]
        }
    }

    const saleDataChart = (Data, year) => {

        if (Data && Data.length > 0) {
            let labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
            let orders = labels.map((item, index) => {
                let count = Data.filter(item => { return item.create_date[0] == year }).filter(item => {

                    return item.create_date[1] === (index + 1)
                })
                return count.length
            })
            let sales = labels.map((item, index) => {
                let total = Data.reduce((prev, cur) => {
                    if (cur.create_date[0] == year)
                        if (cur.create_date[1] === (index + 1))
                            return prev + cur.total
                    return prev
                }, 0)
                return total
            })
            return {
                labels: labels,
                datasets: [{
                    label: ' Đơn hàng: ',
                    yAxisID: 'order',
                    data: orders,

                },
                {
                    label: ' Doanh thu: ',
                    yAxisID: 'sale',
                    data: sales,

                }]
            }
        }
        return {
            labels: [],
            datasets: [{
                label: ' Đơn hàng: ',
                data: [],

            },
            {
                label: ' Doanh thu: ',
                data: [],

            }]
        }
    }
    const totalSales = (data) => {
        if (data && data.length > 0) {
            let tmp = data.reduce((prev, cur) => { return prev + cur.total }, 0)
            return tmp
        }
        return 0
    }
    const findCustomerById = (id) => {
        return customerData.find(item => item.id === id)
    }
    useEffect(() => {
        if (productData && productData.length > 0) {
            setProductDataChart({ ...productDataChart(productData) })
        }

    }, [productData])
    useEffect(() => {
        if (orderData && orderData.length > 0) {
            setSaleDataChart({ ...saleDataChart(orderData, new Date().getFullYear()) })
        }

    }, [orderData])
    const gotoOrderView = (id) => {
        navigate(`/admin/order/${id}`)
    }
    useEffect(() => {
        if (orderData && orderData.length > 0) {
            const tmprows = orderData.map((item) => {
                return {
                    ...item,
                    email: findCustomerById(item.customer_id) ? findCustomerById(item.customer_id).username : "",
                    name: findCustomerById(item.customer_id) ? findCustomerById(item.customer_id).customer_name : "",
                    createdate: item ? formatDate(item.create_date) : "",
                    total: item ? numberWithCommas(item.total) : "",
                    option: {
                        type: "view",
                        click: gotoOrderView
                    }
                }
            })
            setRows(tmprows)
        }
    }, [orderData])

    return (
        <ContentMain headerTitle='Dashboard'>
            <div className="dashboard">
                <div className="dashboard-counts">
                    <div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon sale'>
                                        <i className="bx bx-money"></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Doanh thu</p>
                                        <p>{numberWithCommas(totalSales(orderData))} đ</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon customer'>
                                        <i className='bx bx-face'></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Khách hàng</p>
                                        <p>{customerData ? customerData.length : 0}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon order'  >
                                        <i className='bx bxs-shopping-bags' ></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Đơn hàng</p>
                                        <p>{orderData ? orderData.length : 0}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div><div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon product'>
                                        <i className={"bx bx-money"}></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Sản phẩm</p>
                                        <p>{productData ? productData.length : 0}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon staff'>
                                        <i className='bx bx-user-circle'></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Nhân viên</p>
                                        <p>{staffData ? staffData.length : 0}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="dashboard-statistic">
                    <div className="dashboard-statistic-chart">
                        <Card>
                            <CardHeader>
                                Doanh thu
                                <Form.Group className='h-100' >
                                    <Form.Select
                                        size="lg"
                                        required
                                        value={year}
                                        name="categorySlug"
                                        onChange={onChange}
                                        bsPrefix="form-select form-select-lg"
                                    >
                                        {
                                            listYears.map((item, index) => {
                                                return (
                                                    <option key={index} value={item} >{item}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập loại sản phẩm.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </CardHeader>
                            <CardBody>
                                <Bar data={SaleDataChart}
                                    options={Saleoptions}
                                    redraw
                                />
                            </CardBody>
                        </Card>
                    </div>
                    <div className="dashboard-statistic-chart">
                        <Card>
                            <CardHeader>
                                Sản phẩm
                            </CardHeader>
                            <CardBody>
                                <Doughnut data={ProductDataChart}
                                    redraw
                                    options={options}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="dashboard-order">
                    <div className="dashboard-order-title">
                        <Card>
                            <CardHeader>
                                Đơn hàng mới nhất
                            </CardHeader>
                            <CardBody>
                                <div style={{ width: "100%", columnGap: 10, height: "350px" }}>
                                    <MyDataGrid ColumnHeader={columns} Data={rows} />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>

        </ContentMain>
    )
}

export default Dashboard