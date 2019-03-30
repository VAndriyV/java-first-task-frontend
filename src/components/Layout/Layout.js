import React, { Component } from 'react';
import { Container} from 'react-bootstrap';
import NavMenu from "../NavMenu/NavMenu";
import Footer from "../Footer/Footer";
import "./Layout.css";
export default class Layout extends Component {


  render() {
    return (
      <React.Fragment>                     
       <NavMenu/>  
      <Container>                  
        {this.props.children}        
      </Container>
      <Footer/>
      </React.Fragment>  
    );
  }
}