import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FadeLoader } from "react-spinners";
import EdiText from 'react-editext'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem } from '../redux/actions/itemActions';

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ShoppingList extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteItem = id => {
        this.props.deleteItem(id);
    }

    onUpdate = (id, val) => {
        const updatedItem = { id, name: val };
        this.props.updateItem(updatedItem);
    }

    render() {
        const { items, isLoading } = this.props.itemReducer;
        const { isAuthenticated } = this.props; 

        return (
            <Container>
                <ListGroup>
                    {
                        isLoading ?
                            <FadeLoader
                                css={override}
                                size={10}
                                loading={isLoading}/>
                            :
                            <TransitionGroup className="shopping-list">
                            { 
                                items.map( ({_id, name}) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <ListGroupItem>
                                            {
                                                isAuthenticated ? 
                                                    <>
                                                        <Button 
                                                            className="remove-btn mr-2" color="danger" size="sm" 
                                                            onClick={this.onDeleteItem.bind(this, _id)}>
                                                            &times;
                                                        </Button>
                                                        <div className="d-inline-block mt-1 ml-2 shadow p-2 bg-dark text-white rounded">
                                                            <EdiText
                                                                type="text"
                                                                value={name}
                                                                hideIcons={true}
                                                                saveButtonClassName="textfield-save"
                                                                editButtonClassName="textfield-edit"
                                                                cancelButtonClassName="textfield-cancel"
                                                                validationMessage="Please type at least 3 characters."
                                                                validation={val => val.length >= 3}
                                                                editOnViewClick={true}
                                                                onSave={this.onUpdate.bind(this, _id)}
                                                                submitOnEnter
                                                            />
                                                        </div>
                                                    </> : name
                                            }
                                        </ListGroupItem>
                                    </CSSTransition>
                                ))
                            }
                            </TransitionGroup>

                    }
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired, 
    itemReducer: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    itemReducer: state.itemReducer,
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem, updateItem })(ShoppingList);
