
import React, { Component } from 'react';
import {Navbar ,Container} from 'react-bootstrap';
import { FaBook} from 'react-icons/fa';


export default class Footer extends Component{

    render(){
        return(                
         <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom">
         <Container>
         <Navbar.Brand href="home"><FaBook size={20} style={{marginBottom:5, marginRight:10}}/>
  City Library</Navbar.Brand>
            </Container>
          </Navbar>
        );
    }
}