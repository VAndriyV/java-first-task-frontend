import React, { Component } from 'react';
import { Row, Col,Table } from 'react-bootstrap';
import './OrderedBooksPage.css';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withBookService } from "../../hoc/";
import { compose } from "../../utils/";
import { fetchUserBooks } from '../../../actions';
import Spinner from '../../Spinner';
import Error from '../../Error/Error';
import { Redirect } from 'react-router';

class OrderedBooksPage extends Component{

    componentDidMount(){             
        const {fetchUserBooks,userEmail} = this.props;        
        fetchUserBooks(userEmail);
    }

    mapUserBooks=(arr)=>{
        if (arr !== null && arr !== undefined) {
            return <Table responsive className="books-table">
                <thead>
                    <tr>                        
                        <th>Title</th>
                        <th>Year</th>
                        <th>Ordered count</th>                       
                    </tr>
                </thead>
                <tbody>{arr.map(item => {
                    return (<tr key={item[0].id}>
                        
                        <td>{item[0].title}</td>
                        <td>{item[0].year}</td>
                        <td>{item[1]}</td>                        
                    </tr>)
                })}</tbody>
            </Table>;
        }
    };

    render(){
       
        const {loading,error,books, isLoggedIn} = this.props;

        if(!isLoggedIn){
            return <Redirect to ="/login"/>;
        }

        if(loading){
            return <Spinner/>;
        }

        if (error) {
            return <Error errorMsg={error} />;
          }

        return (
            <Row>
                <Col>
                {this.mapUserBooks(books)}
                </Col>
            </Row>
        );
    }
}

const mapStateToProps=({userBooks,userStatus})=>{
    return{
        loading: userBooks.loading,
        error: userBooks.error,
        books: userBooks.books,
        userEmail: userStatus.email,
        isLoggedIn:userStatus.isLoggedIn
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
)(OrderedBooksPage);