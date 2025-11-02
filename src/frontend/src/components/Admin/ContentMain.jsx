import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const ContentMain = props => {
    return (
        <React.Fragment>
            <div className='content-main-header'>

                {props.headerLeftAction ?
                    <div>
                        <Button
                            size={props.headerLeftAction.size}
                            onclick={props.headerLeftAction.action}
                            backgroundColor={'red'}
                            animate={true}
                            icon='bx bx-arrow-back'
                        >
                            {props.headerLeftAction.title}
                        </Button>
                    </div>
                    : <></>
                }

                <div className='content-main-header-title'>
                    {
                        props.headerTitle
                    }
                </div>
                <div>
                    {props.headerRightAction ?
                        <Button
                            size={props.headerRightAction.size}
                            onclick={props.headerRightAction.action}
                            icon='bx bx-edit'
                            animate={true}
                            backgroundColor={props.headerRightAction.title === "Tạo mới" ? 'main' : 'green'}
                        >
                            {props.headerRightAction.title}
                        </Button> : <></>
                    }
                </div>
            </div>
            <div className='content-main-body'>
                {props.children}
            </div>
        </React.Fragment>


    )
}

ContentMain.propTypes = {
    headerTitle: PropTypes.string.isRequired,
    headerRightAction: PropTypes.object,
    headerLeftAction: PropTypes.object
}

export default ContentMain