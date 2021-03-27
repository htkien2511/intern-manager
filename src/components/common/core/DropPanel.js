import React from 'react'
import styled from 'styled-components'
import useToggle from 'hooks/useToggle'

const Trigger = () => {
    return null
}

const Content = () => {
    return null
}

const DropPanel = ({ children }) => {
    const { isShowing, show, hide, toggle } = useToggle()
    
    if (!Array.isArray(children)) {
        children = [children]
    }

    const trigger = children.find((child) => child.type.name === 'Trigger')
    const content = children.find((child) => child.type.name === 'Content')

    return (
        <DropContainer className="drop__container">
            <div className="drop__trigger">
                {trigger
                    ? trigger.props.children({ isShowing, show, hide, toggle })
                    : null}
            </div>
            {
                isShowing ?
                <div className="drop__content">
                {content
                    ? content.props.children({ isShowing, show, hide, toggle })
                    : null}
                </div>
                : null }
        </DropContainer>
    )
}
DropPanel.Trigger = Trigger
DropPanel.Content = Content

const DropContainer = styled.div`
    

    .drop__content {
        width: 100%;
        padding: 5px 25px;
        text-align: left;
    }
`
export default DropPanel
