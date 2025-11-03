import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginModal } from '../redux/login-sign_modal/loginSlice'
import { removeSignModal } from '../redux/login-sign_modal/signSlice'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { apiUrl } from '../utils/constant'
const RegisterModal = () => {
    const initialForm = {
        username: "",
        password: "",
        rpassword: "",
        customer_name: "",
        phone: "",
        role: "customer"
    }

    const dispatch = useDispatch()
    const [RegisterForm, setRegisterForm] = useState(initialForm)
    const show = useSelector(state => state.signModal.value)
    const [alert, setAlert] = useState(null)
    const { username, password, rpassword, customer_name } = RegisterForm
    const [validated, setValidated] = useState(false);

    const gotoLogin = () => {
        dispatch(removeSignModal())
        dispatch(setLoginModal())
    }
    const onRegisterFormChange = e => {
        setRegisterForm({
            ...RegisterForm,
            [e.target.name]: e.target.value,

        })
    }
    const checkPass = () => {
        if (password !== rpassword)
            return true
        return false
    }
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
        }
        else if (checkPass()) {
            // check pass and rpass
            setAlert(<Alert variant='danger'>Mật khẩu và Mật khẩu lặp không trùng nhau! Mời nhập lại</Alert>)
        }
        else {
            try {

                const rs = await axios.post(`${apiUrl}/user/sign-in`, RegisterForm)
                if (rs.data) {
                    setAlert(<Alert variant='success'>Tạo tài khoản thành công!</Alert>)                    
                }
            }
            catch {
                setAlert(<Alert variant='danger'>Đăng ký thất bại! Email đã tồn tại</Alert>)
                
            }
            setRegisterForm(initialForm)
            setValidated(false)
        }

    }


    useEffect(() => {
        setRegisterForm(initialForm)
        setValidated(false)
        setAlert(null)
    }, [show])
    useEffect(() => {
        setTimeout(() => {
            setAlert(null)
        }, 3500)
    }, [alert])
    return (
        <Modal
            show={show}
            onHide={() => dispatch(removeSignModal())}
            backdrop={"static"}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <ModalHeader closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Register Form
                </Modal.Title>
            </ModalHeader>
            <ModalBody>
                <div id="main-wrapper" className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="card border-0">
                                <div className="card-body p-0">
                                    <div className="row no-gutters">
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="mb-3">
                                                    <h3 className="h4 font-weight-bold text-theme">Đăng ký</h3>
                                                </div>
                                                <h6 className="h5 mb-0">Biểu mẫu đăng ký.</h6>
                                                <p className="text-muted mt-2 mb-3">If You Really Want To Know, Look In The Register.
                                                </p>
                                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                    <Form.Group >
                                                        <Form.Label>Họ và tên</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder=""
                                                            value={customer_name}
                                                            name="customer_name"
                                                            onChange={onRegisterFormChange}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui lòng nhập họ tên.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="email"
                                                            placeholder=""
                                                            value={username}
                                                            name="username"
                                                            onChange={onRegisterFormChange}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui lòng nhập email.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <Form.Label>Mật khẩu</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            value={password}
                                                            name="password"
                                                            onChange={onRegisterFormChange}

                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui lòng nhập mật khẩu.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group >
                                                        <Form.Label>Lặp lại Mật khẩu</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            value={rpassword}
                                                            name="rpassword"
                                                            onChange={onRegisterFormChange}

                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui lòng nhập lại mật khẩu.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <div>
                                                        <button type="submit" className="btn btn-theme mb-3 mt-3">Xác nhận đăng ký</button>
                                                        {alert}
                                                    </div>

                                                </Form>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 d-none d-lg-inline-block">
                                            <div className="account-block rounded-right">
                                                <div className="overlay rounded-right"></div>
                                                <div className="account-testimonial">
                                                    <h4 className="text-white mb-4">This beautiful theme yours!</h4>
                                                    <p className="lead text-white">"Chúc quý khách hàng sẽ có những trải nghiệm tuyệt vời khi mua sắm ở đây."</p>
                                                    <p>- Admin User</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="text-muted text-center mt-3 mb-0 d-flex justify-content-center" >Đã có tài khoản? &nbsp;<div
                                className="text-primary ml-1 modalmove" onClick={() => gotoLogin()}> Đăng nhập</div></div>

                        </div>

                    </div>

                </div>
            </ModalBody>
        </Modal>
    )
}

export default RegisterModal