import React from 'react';
class Button extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <button onClick={this.props.btn_click} type={this.props.btn_type}>{this.props.btn_name}</button>
        );
    }
}
export default Button;