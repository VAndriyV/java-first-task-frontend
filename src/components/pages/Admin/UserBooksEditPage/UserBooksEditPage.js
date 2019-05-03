import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Button, Col, FormControl, Table } from "react-bootstrap";
import { withBookService } from "../../../hoc/";
import { bindActionCreators } from "redux";
import Error from "../../../Error/Error";
import { compose } from "../../../utils";
import { fetchUserBooks } from "../../../../actions";
import "./UserBooksEditPage.css";
import { Redirect } from 'react-router';
import Spinner from '../../../Spinner';
import { FaPen } from "react-icons/fa";

class UserBooksEditPage extends Component {
    state = {
        searchQuery: ''
    };

    onInputChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        });
    };

    findUserBooks = (e) => {
        e.preventDefault();
        this.props.fetchUserBooks(this.state.searchQuery);
    };

    mapOrderedBooksList(arr) {
        if (arr!==null && arr!==undefined) {
           return <Table responsive className="books-table">
                <thead>
                    <tr>
                        <th>Book id</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Ordered count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{arr.map(item => {
                    return (<tr key={item[0].id}>

                        <td>{item[0].id}</td>
                        <td>{item[0].title}</td>
                        <td>{item[0].year}</td>
                        <td>{item[1]}</td>
                        <td><Button
                            size="sm"
                            onClick={()=>{}}
                            variant="outline-warning"
                        >
                            <FaPen />
                        </Button>
                        </td>
                    </tr>)
                })}</tbody>
            </Table>;
        }
    }

    mapOrdersData(userEmail,phoneNumber,books){
        return (<Row className="orders-details">
        <Col>
        <h5>Email: {userEmail}</h5>
        <h5>Phone number: {phoneNumber}</h5>
        {this.mapOrderedBooksList(books)}
        </Col>
        </Row>);
    }

    render() {
        const { roleId, loading, error, books,userEmail,phoneNumber } = this.props;

        if (roleId !== 2) {
            return <Redirect to="/" />;
        }

        return (
            <Row>
                <Col xs={12} className="search-placeholder">
                    <FormControl placeholder="Consumer email" type="text" name="query" onInput={this.onInputChange} />
                    <Button variant="outline-dark" type="button" onClick={this.findUserBooks}>
                        Search
                    </Button>
                </Col>
                <Col xs={12}>
                    {loading ? <Spinner /> :
                        error ? <Error errorMsg={error} /> :                            
                                this.mapOrdersData(userEmail,phoneNumber,books)}                            
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = ({ adminOperations, userStatus, userBooks }) => {
    return {
        operationError: adminOperations.error,
        operationErrorType: adminOperations.operationType,
        roleId: userStatus.roleId,
        userEmail: userBooks.userEmail,
        phoneNumber: userBooks.phoneNumber,
        loading: userBooks.loading,
        error: userBooks.error,
        books: userBooks.books,
        loading: userBooks.loading
    };
};

const mapDispatchToProps = (dispatch, { bookService }) => {
    return bindActionCreators(
        {
            fetchUserBooks: fetchUserBooks(bookService)
        },
        dispatch
    );
};

export default compose(
    withBookService(),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserBooksEditPage);