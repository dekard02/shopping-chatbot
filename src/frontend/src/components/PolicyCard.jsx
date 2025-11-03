import React from 'react'
import PropTypes from 'prop-types'

const PolicyCard = props => {
    return (
        <div className='policy-card'>
            <div className="policy-card-icon">
                <i className={props.icon}></i>
            </div>
            <div className='policy-card-info'>
                <div className="policy-card-info-name">
                    {props.name}
                </div>
                <div className="policy-card-info-description">
                    {props.description}
                </div>
            </div>
        </div>
    )
}
PolicyCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}
export default PolicyCard