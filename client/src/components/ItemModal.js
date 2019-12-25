import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../redux/actions/itemActions';
import itemReducer from '../redux/reducers/itemReducer';

class ItemModal extends Component {
    state = {
        isOpen: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        };
        // Add item
        this.props.addItem(newItem);
        // Toggle modal
        this.toggle();
    }

    render() {
        const { isAuthenticated } = this.props;

        return (
            <div>
                {
                    isAuthenticated ? 
                        <Button color="dark" className="mb-3" onClick={this.toggle}>Add Item</Button>
                        :
                        <h4 className="mb-3 ml-4">Please log in to manage items.</h4>
                }
                
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <Input type="text" name="name" id="name" placeholder="Add item..." onChange={this.onChange}/>
                            <Button color="dark" className="mt-3 col-md-12">Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    static propTypes = {
        itemReducer: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
}

const mapStateToProps = state => ({
    itemReducer: state.itemReducer,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
