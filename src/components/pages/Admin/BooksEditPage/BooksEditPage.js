import React, { Component } from "react";
import { connect } from "react-redux";
import { Row,Button, Col, Form } from "react-bootstrap";
import { withBookService } from "../../../hoc/";
import { bindActionCreators } from "redux";
import Error from "../../../Error/Error";
import { compose } from "../../../utils";
import BooksEditList from "./BooksEditList/BooksEditList";
import { fetchBooks, addBook, updateBook } from "../../../../actions";
import extractFormData from '../../../../helpers/form-data-extract';
import "./BooksEditPage.css";
import { Redirect } from 'react-router';
class BooksEditPage extends Component {
    state = {
        editMode: false,
        editObject: null,
        showForms:true
    };

    addBook =(e)=>{
        e.preventDefault();
        const book = extractFormData(e.target);
        this.props.addBook(book);      
    };

    onEditButtonClick =(book)=>{
       
        this.setState({
            editMode:true,
            editObject:book
          });
          
        document.body.scrollTop = document.documentElement.scrollTop = 0;
          
    };

    updateBook =(e)=>{
        e.preventDefault();
        const book = extractFormData(e.target);        
        this.props.updateBook(book);
        this.setState({
            editMode:false,
            editObject:null
          });
    };

    toggleShowMode=(e)=>{
        this.setState({
            showForms:!this.state.showForms
        });
    };

    render() {
        const {editMode,editObject,showForms}=this.state;
        const {operationError,roleId} = this.props;

        if(roleId!==2){
            return <Redirect to ="/login"/>;
        }

        return (<React.Fragment>
            <Row>
                <Col>
                <Button size="sm" variant="outline-dark" onClick={this.toggleShowMode} type="button" className="toggle-button">show/hide forms</Button>
                </Col>
            </Row>
            {showForms?
            <Row>
                <Col className="d-flex forms-placeholder">
                <AddBookForm onSubmit={this.addBook}/>
                {editMode?<UpdateBookForm onSubmit={this.updateBook} book={editObject}/>:null}
                </Col>               
            </Row>
            :null}
            {operationError?<Error errorMsg={operationError} />:null}
            <BooksEditList onEdit={this.onEditButtonClick}/>
        </React.Fragment>);
    }
}

const mapStateToProps = ({ booksList,adminOperations,userStatus }) => {
    return {
        error: booksList.error,
        operationError: adminOperations.error,
        operationErrorType:adminOperations.operationType,
        roleId:userStatus.roleId
    };
};

const mapDispatchToProps = (dispatch, { bookService }) => {
    return bindActionCreators(
        {
            fetchBooks: fetchBooks,
            addBook:addBook(bookService),
            updateBook:updateBook(bookService)
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
)(BooksEditPage);

const AddBookForm = ({ onSubmit }) => {
    return (
        <Col xs={12} sm={6} className="d-flex" >
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" name="title" required />
                </Form.Group>

                <Form.Group controlId="formBasicYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder="Year" name="year" required />
                </Form.Group>

                <Form.Group controlId="formBasicAuthorId">
                    <Form.Label>Author id</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder="Author id" name="authorId" required />
                </Form.Group>

                <Form.Group controlId="formBasicGenreId">
                    <Form.Label>Genre id</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder="Genre id" name="genreId" required />
                </Form.Group>

                <Form.Group controlId="formBasicAvailableCount">
                    <Form.Label>Available count</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder="Available count" name="availableCount" required />
                </Form.Group>

                <Form.Group controlId="formBasicTotalCount">
                    <Form.Label>Total count</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder="Total count" name="totalCount" required />
                </Form.Group>

                <Button variant="outline-dark" type="submit">
                    Add
                </Button>
            </Form>
        </Col>
    );
};

const UpdateBookForm = ({ onSubmit, book }) => {
    return (
        <Col xs={12} sm={6} className="d-flex" >
            <Form onSubmit={onSubmit}>
            <Form.Control type="hidden" name="id" value={book.id} />     
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder={book.title} name="title" required />
                </Form.Group>

                <Form.Group controlId="formBasicYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder={book.year} name="year" required />
                </Form.Group>

                <Form.Group controlId="formBasicAuthorId">
                    <Form.Label>Author id</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder={book.author.id} name="authorId" required />
                </Form.Group>

                <Form.Group controlId="formBasicGenreId">
                    <Form.Label>Genre id</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder={book.genre.id} name="genreId" required />
                </Form.Group>

                <Form.Group controlId="formBasicAvailableCount">
                    <Form.Label>Available count</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder={book.availableCount} name="availableCount" required />
                </Form.Group>

                <Form.Group controlId="formBasicTotalCount">
                    <Form.Label>Total count</Form.Label>
                    <Form.Control pattern="\d*" type="number" placeholder={book.totalCount} name="totalCount" required />
                </Form.Group>

                <Button variant="outline-dark" type="submit">
                    Edit
                </Button>
            </Form>
        </Col>
    );
};