const CustomSwitch = props => {
    const { test, children } = props
    return children.find(child => {
        return child.props.switchValue === test
    })
}

export default CustomSwitch
