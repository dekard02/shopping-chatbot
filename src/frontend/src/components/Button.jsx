import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main'
    const size = props.size ? 'btn-' + props.size : ''
    const animate = props.animate ? 'btn-animate' : ''
    return (
        <button type={props.type ? props.type : null} disabled={props.disabled ? props.disabled : false} className={`btn ${bg} ${size} ${animate}`}
            onClick={props.onclick ? () => props.onclick() : null}>
            <span className='btn-txt'>{props.children}</span>
            {
                props.icon ? (
                    <span className='btn-icon'>
                        <i className={`${props.icon} bx-tada`}></i>
                    </span>
                ) : null
            }


        </button>
    )
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onclick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string
}

export default Button