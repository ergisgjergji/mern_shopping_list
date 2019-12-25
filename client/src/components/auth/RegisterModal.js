import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';

class RegisterModal extends Component {
    state = {
        isOpen: false,
        name: '',
        email: '',
        password: '',
        message: null
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL')
                this.setState({ message: error.message });
            else
                this.setState({ message: null })
        }

        // If authenticated, close modal
        if(this.state.isOpen) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onDismiss = () => {
        this.props.clearErrors();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;
        const newUser = { name, email, password };
        // Attempt to register
        this.props.register(newUser);
    }

    render() {
        const { message } = this.state;
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Register</NavLink>

                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {
                            message ? 
                                <Alert color="danger" toggle={this.onDismiss}>
                                    <h5 className="alert-heading">Register failed!</h5>
                                    <hr/>
                                    {message}
                                </Alert> 
                                : 
                                null
                        }
                        <Form onSubmit={this.onSubmit}>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name" className="mb-3" onChange={this.onChange}/>

                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email" className="mb-3" onChange={this.onChange}/>

                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" className="mb-3" onChange={this.onChange}/>

                            <Button color="dark" className="mt-3 col-md-12">Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.errorReducer
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
