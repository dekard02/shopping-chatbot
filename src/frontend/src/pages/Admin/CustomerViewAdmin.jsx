import React from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import Card, { CardBody} from '../../components/Card'
import { useNavigate } from 'react-router-dom'
const CustomerViewAdmin = () => {
    const navigate = useNavigate()
    return (
        <ContentMain headerTitle='Chi tiết khách hàng'
        headerLeftAction={{
          ...btnAction,
          title: 'Quay lại Khách hàng hàng',
          action: () => navigate('/admin/customer')
        }}
      >
        <Card>
          <CardBody>
          
  
          </CardBody>
        </Card>
      </ContentMain >
    )
}

export default CustomerViewAdmin