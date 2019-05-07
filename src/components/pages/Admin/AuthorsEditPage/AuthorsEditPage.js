import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withBookService } from '../../../hoc';
import { compose } from '../../../utils';
import { fetchAuthors, addAuthor, updateAuthor} from '../../../../actions';
import { bindActionCreators } from 'redux';
import Spinner from '../../../Spinner';
import Error from '../../../Error/Error';
import { FaPen } from "react-icons/fa";
import { Form, Row, Table, Button, Col } from "react-bootstrap";
import './AuthorsEditPage.css';
import extractFormData from '../../../../helpers/form-data-extract';
import { Redirect } from 'react-router';

 class AuthorsEditPage extends Component{

    state ={
      editMode:false,
      editObject: null
    }
   
    componentDidMount() {      
        this.props.fetchAuthors();       
    }

    sortByFirstName(authors) {
        authors.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
    }

    onEditButtonClick=(author)=>{
        this.setState({
          editMode:true,
          editObject:author
        });
        if(window.matchMedia("(max-width: 992px)").matches){
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    };

    addAuthor=(e)=>{
        e.preventDefault();   
        const newAuthor = extractFormData(e.target); 
        this.props.addAuthor(newAuthor);             
    };

    updateAuthor =(e)=>{
      e.preventDefault();   

      let newAuthor = extractFormData(e.target);       
      newAuthor.id = parseInt(newAuthor.id);

      this.setState({
        editMode:false,
        editObject:null
      });

      this.props.updateAuthor(newAuthor);
    }

    mapAuthorsList(authors){
        return authors.map((item,idx)=>{
            return (<tr key={item.id}>
            <td>{idx + 1}</td>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>
            <Button
            size="sm"
            onClick={() => this.onEditButtonClick(item)}
            variant="outline-warning"
          >
            <FaPen/>
          </Button>
          </td>
            </tr>)
        });
    }

    render(){
        const { authors, loading, error,operationError,roleId } = this.props;
        const {editMode,editObject}=this.state; 
       
        if(roleId!==2){
          return <Redirect to ="/login"/>;
        }
    
        if (error) {
          return <Error errorMsg={error} />;
        }

        return(
            <Row>
            <Col xs={12} lg={3} className="forms-placeholder">
            <AddAuthorForm onSubmit={this.addAuthor}/>
            {editMode?<UpdateAuthorForm onSubmit={this.updateAuthor} author={editObject}/>:null}            
            </Col>
            {operationError?<Error errorMsg={operationError} />:null}
            {loading?<Spinner/>: 
            error?  <Error errorMsg={error} />:         
            <Col xs={12} lg={9}>
            <Table responsive className="authors-table">
            <thead>
              <tr>
                <th>#</th>
                <th>id</th>
                <th>Firstname</th>
                <th>LastName</th>
                <th>Edit</th>               
              </tr>
            </thead>    
            <tbody>{this.mapAuthorsList(authors)}</tbody>
          </Table>
          </Col>
            }
          </Row>);
    }

}

const AddAuthorForm=({onSubmit})=>{
    return (
        <Col xs={12} sm={6} className="d-flex add_author-form" >
        <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicfirstName">
          <Form.Label>Firstname</Form.Label>
          <Form.Control type="firstName" placeholder="Firstname" name="firstName" required />
        </Form.Group>

        <Form.Group controlId="formBasicLastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control type="Lastname" placeholder="Lastname" name="lastName" required />
        </Form.Group>
        <Button variant="outline-dark" type="submit">
         Add
        </Button>
      </Form>
      </Col>
    );
};

const UpdateAuthorForm=({onSubmit, author})=>{
  return (
      <Col xs={12} sm={6} className="d-flex update_author-form" >
      <Form onSubmit={onSubmit}>         
      <Form.Control type="hidden" name="id" value={author.id} />     
      <Form.Group controlId="formBasicfirstName">
        <Form.Label>Firstname</Form.Label>
        <Form.Control type="text" placeholder={author.firstName} name="firstName"  required />
      </Form.Group>

      <Form.Group controlId="formBasicLastname">
        <Form.Label>Lastname</Form.Label>
        <Form.Control type="text" placeholder={author.lastName}  name="lastName" required />
      </Form.Group>
      <Button variant="outline-dark" type="submit">
       Update
      </Button>
    </Form>
    </Col>
  );
};

const mapStateToProps = ({ authorsList,adminOperations,userStatus }) => {
    return {
      authors: authorsList.authors,
      loading: authorsList.loading,
      error: authorsList.error,
      operationError: adminOperations.error,
      operationErrorType:adminOperations.operationType,
      roleId:userStatus.roleId
    }
  };
  
  const mapDispatchToProps = (dispatch, { bookService }) => {
    return bindActionCreators({
      fetchAuthors: fetchAuthors(bookService),
      addAuthor: addAuthor(bookService),
      updateAuthor: updateAuthor(bookService)     
    }, dispatch);
  };
  
  export default compose(
    withBookService(),
    connect(mapStateToProps, mapDispatchToProps)
  )(AuthorsEditPage);