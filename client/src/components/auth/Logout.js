import React, { Component, Fragment } from 'react'
import { NavLink } from 'reactstrap';
import { logout } from '../../redux/actions/authActions';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Logout extends Component {
    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} href="#">
                    Logout
                </NavLink>
            </Fragment>
        )
    }

    static propTypes = {
        logout: PropTypes.func.isRequired
    };
}

export default connect(null, { logout })(Logout);