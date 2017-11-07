import React, { PureComponent } from 'react';

export default class InputUpdate extends PureComponent {
    state = {
        isEditing: false
    };

    nodes = {};

    render() {
        if (this.state.isEditing) {
            return (
                <input
                    ref={inputNode => this.nodes.input = inputNode}
                    type='text'
                    name={this.props.name}
                    defaultValue={this.props.value}
                    onBlur={this.handleBlur}
                    onKeyDown={this.handleKeyDown} />
            );
        }

        return <span className={this.props.className} onDoubleClick={this.handleEdit}>{this.props.value}</span>;
    }

    handleKeyDown = event => {
        if (event.keyCode === 13) {
            this.handleBlur(event);
        }
    };

    handleEdit = () => {
        this.setState({
            isEditing: true
        }, () => {
            const inputNode = this.nodes.input;

            inputNode.focus();
            inputNode.setSelectionRange(0, inputNode.value.length);
        });
    };

    handleBlur = () => {
        const inputValue = this.nodes.input.value.trim();

        if (inputValue && inputValue !== this.props.value) {
            this.props.onChangeValue({ name: this.props.name, value: inputValue });
        }

        this.setState({
            isEditing: false
        });
    };
}
