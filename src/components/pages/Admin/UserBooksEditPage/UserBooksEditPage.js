import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Button, Col, FormControl, Table, Form } from "react-bootstrap";
import { withBookService } from "../../../hoc/";
import { bindActionCreators } from "redux";
import Error from "../../../Error/Error";
import { compose } from "../../../utils";
import { fetchUserBooks, updateUserBook } from "../../../../actions";
import "./UserBooksEditPage.css";
import { Redirect } from 'react-router';
import Spinner from '../../../Spinner';
import { FaPen } from "react-icons/fa";
import extractFormData from '../../../../helpers/form-data-extract';

class UserBooksEditPage extends Component {
    state = {
        email: '',
        editMode: false,
        editObject: null
    };

    onInputChange = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    onEditButtonClick = (userBook) => {
        this.setState({
            editMode: true,
            editObject: userBook
        });

        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    updateUserBook = (e) => {
        e.preventDefault();
        const userBook = extractFormData(e.target);       

        this.props.updateUserBook(userBook,this.state.email);      

        this.setState({
            editMode: false,
            editObject: null
        });

    };

    findUserBooks = (e) => {
        e.preventDefault();
        this.props.fetchUserBooks(this.state.email);
    };

    mapOrderedBooksList(arr) {
        if (arr !== null && arr !== undefined) {
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
                            onClick={() => this.onEditButtonClick(item)}
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

    mapOrdersData(userId, phoneNumber, books) {
        return (<Row className="orders-details">
            <Col>
                <h5>User id: {userId}</h5>              
                <h5>Phone number: {phoneNumber}</h5>
                {this.mapOrderedBooksList(books)}
            </Col>
        </Row>);
    }

    render() {
        const { roleId, loading, error, books, userEmail, phoneNumber, userId } = this.props;
        const { editMode, editObject } = this.state;
        if (roleId !== 2) {
            return <Redirect to ="/login"/>;
        }

        return (
            <Row>
                <Col xs={12} className="d-flex forms-placeholder no-gutters">
                    {editMode ? <UpdateUserBookForm onSubmit={this.updateUserBook} userBook={editObject} userEmail={userEmail} userId={userId} /> : null}
                </Col>
                <Col className="search-placeholder">
                    <FormControl placeholder="Consumer email" type="text" name="query" onInput={this.onInputChange} />
                    <Button variant="outline-dark" type="button" onClick={this.findUserBooks}>
                        Search
                    </Button>
                </Col>
                <Col xs={12}>
                    {loading ? <Spinner /> :
                        error ? <Error errorMsg={error} /> :
                            this.mapOrdersData(userId, phoneNumber, books)}
                </Col>
            </Row>
        );
    }
}

const UpdateUserBookForm = ({ onSubmit, userBook, userId, userEmail }) => {
    return (
        <Col xs={12} sm={6} className="d-flex update_userBook-form" >
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicUserEmail">
                    <Form.Label>User email: {userEmail}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicUserId">
                    <Form.Label>User id {userId}</Form.Label>
                    <Form.Control type="hidden" name="userId" value={userId} />
                </Form.Group>
                <Form.Group controlId="formBasicBookId">
                    <Form.Label>Book id: {userBook[0].id}</Form.Label>
                    <Form.Control type="hidden" name="bookId" value={userBook[0].id} />
                </Form.Group>
                <Form.Group controlId="formBasicBookTitle">
                    <Form.Label>Title: {userBook[0].title}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicBookYear">
                    <Form.Label>Book publish year: {userBook[0].year}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicOldCount">
                    <Form.Label>User ordered count: {userBook[1]}</Form.Label>
                    <Form.Control type="hidden" name="oldCount" value={userBook[1]} />
                </Form.Group>
                <Form.Group controlId="formBasicNewCount">
                    <Form.Label>New count</Form.Label>
                    <Form.Control pattern="\d*" max={userBook[1]} type="number" placeholder="Count" name="newCount" required />
                </Form.Group>
                <Button variant="outline-dark" type="submit">
                    Update count
        </Button>
            </Form>
        </Col>
    );
};

const mapStateToProps = ({ adminOperations, userStatus, userBooks }) => {
    return {
        operationError: adminOperations.error,
        operationErrorType: adminOperations.operationType,
        roleId: userStatus.roleId,
        userEmail: userStatus.email,
        phoneNumber: userBooks.phoneNumber,
        userId: userBooks.userId,       
        error: userBooks.error,
        books: userBooks.books,
        loading: userBooks.loading
    };
};

const mapDispatchToProps = (dispatch, { bookService }) => {
    return bindActionCreators(
        {
            fetchUserBooks: fetchUserBooks(bookService),
            updateUserBook :updateUserBook(bookService)
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