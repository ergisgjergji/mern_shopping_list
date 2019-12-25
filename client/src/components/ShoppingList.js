import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ClipLoader, GridLoader } from "react-spinners";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../redux/actions/itemActions';

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

    render() {
        const { items, isLoading } = this.props.itemReducer;
        const { isAuthenticated } = this.props; 

        return (
            <Container>
                <ListGroup>
                    {
                        isLoading ?
                            <GridLoader
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
                                                    <Button 
                                                        className="remove-btn mr-2" color="danger" size="sm" 
                                                        onClick={this.onDeleteItem.bind(this, _id)}>
                                                        &times;
                                                    </Button> : null
                                            }
                                            {name}
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

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
