import React, { PureComponent } from 'react';

export default class Form extends PureComponent {
    state = {
        value: ''
    };

    render() {
        const { value } = this.state;
        const { disabled } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    value={value}
                    type='text'
                    disabled={disabled}
                    onChange={this.handleChangeValue} />
                <button type='submit' disabled={!value}>Add</button>
            </form>
        );
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit(this.state.value);

        this.setState({ value: '' });
    };

    handleChangeValue = event => {
        this.setState({
            value: event.target.value
        });
    };
}
