import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';

class LoginModal extends Component {
    state = {
        isOpen: false,
        email: '',
        password: '',
        message: null
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {
            // Check for register error
            if(error.id === 'LOGIN_FAIL')
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

        const { email, password } = this.state;
        const user = { email, password };
        // Attempt to login
        this.props.login(user);
    }

    render() {
        const { message } = this.state;
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Login</NavLink>

                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {
                            message ? 
                                <Alert color="danger" toggle={this.onDismiss}>
                                    <h5 className="alert-heading mt-2">Login failed!</h5>
                                    <hr/>
                                    {message}
                                </Alert> 
                                : 
                                null
                        }
                        <Form onSubmit={this.onSubmit}>

                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email" className="mb-3" onChange={this.onChange}/>

                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" className="mb-3" onChange={this.onChange}/>

                            <Button color="dark" className="mt-3 col-md-12">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.errorReducer
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
