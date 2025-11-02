import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useDispatch, useSelector } from 'react-redux'
import { removeLoginModal } from '../redux/login-sign_modal/loginSlice'
import { setSignModal } from '../redux/login-sign_modal/signSlice'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import { login } from '../redux/user/userState'
import { setLoading } from '../redux/loading/loadingSlice'

const LoginModal = () => {
    const user = useSelector(state => state.userState)
    const initialForm = {
        username: "",
        password: ""
    }

    const dispatch = useDispatch()
    const [LoginForm, setLoginForm] = useState(initialForm)
    const show = useSelector(state => state.loginModal.value)
    const [alert, setAlert] = useState(null)
    const { username, password } = LoginForm
    const [validated, setValidated] = useState(false);

    const gotoRegister = () => {
        dispatch(removeLoginModal())
        dispatch(setSignModal())
    }

    const onLoginFormChange = e => {
        setLoginForm({
            ...LoginForm,
            [e.target.name]: e.target.value,

        })
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            dispatch(login(LoginForm))
            setValidated(false)

        }

    };
    useEffect(() => {
        let timer1 = setTimeout(() => {
            setAlert(null)
        }, 2000)
        return () => {
            clearTimeout(timer1)
        }
    }, [alert])
    useEffect(() => {
        if (user.loading === false) {
            dispatch(setLoading(false))
            if (user.errorMess === undefined || user.errorMess) {
                setAlert(<Alert variant='danger'>Tài khoản hoặc mật khẩu không đúng!</Alert>)
            }
            else if (user.user) {
                dispatch(removeLoginModal())
            }
        }
        else {
            dispatch(setLoading(true))
        }

    }, [user, user.errorMess])
    useEffect(() => {
        setLoginForm(initialForm)
        setValidated(false)
        setAlert(null)
    }, [show])
    return (
        <Modal
            show={show}
            onHide={() => dispatch(removeLoginModal())}
            backdrop={"static"}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <ModalHeader closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Đăng nhập
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
                                                <div className="mb-5">
                                                    <h3 className="h4 font-weight-bold text-theme">Đăng nhập</h3>
                                                </div>

                                                <h6 className="h5 mb-0">Welcome back!</h6>
                                                <p className="text-muted mt-2 mb-5">Enter your email address and password to access
                                                    admin panel.</p>

                                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                    <Form.Group >
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="email"
                                                            value={username}
                                                            name="username"
                                                            onChange={onLoginFormChange}
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
                                                            onChange={onLoginFormChange}

                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Vui lòng nhập mật khẩu.
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <div>
                                                        <button className="btn btn-theme mb-3 mt-3" type='submit'>Đăng nhập</button>
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
                                                    <p className="lead text-white">"Best investment i made for a long time. Can only
                                                        recommend it for other users."</p>
                                                    <p>- Admin User</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-muted text-center mt-3 mb-0 d-flex justify-content-center">Don't have an account?&nbsp; <div
                                className="text-primary ml-1 modalmove" onClick={() => gotoRegister()}>Register</div></div>
                        </div>
                    </div>

                </div>
            </ModalBody>
        </Modal>
    )
}

export default LoginModal
