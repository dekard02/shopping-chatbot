import React from 'react'

const Card = props => {
    return (
        <div className='kard'>
            {props.children}
        </div>
    )
}
export const CardHeader = props => {
    return (
        <div className='kard-header'>
            {props.children}
        </div>
    )
}
export const CardBody = props => {
    return (
        <div className='kard-body'>
            {props.children}
        </div>
    )
}


export default Card
