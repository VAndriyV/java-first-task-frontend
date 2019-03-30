import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaUser, FaUserEdit, FaBook, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import "./NavMenu.css";
import { connect } from 'react-redux';
import { logout} from '../../actions';
import { bindActionCreators } from 'redux';

class NavMenu extends Component {
  checkActive = route => (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.includes(route);
  };

  render() {
    const {isLoggedIn,logout}=this.props;
   
    return (
      <Navbar variant="dark" bg="dark" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="home">
            <FaBook size={20} style={{ marginBottom: 5, marginRight: 10 }} />
            City Library
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to={"/"} isActive={this.checkActive("/")} exact>
                <Nav.Link active={false}>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={"/books/"}
                isActive={this.checkActive("/books/")}
                exact
              >
                <Nav.Link>All books</Nav.Link>
              </LinkContainer>
              <LinkContainer
                to={"/authors"}
                isActive={this.checkActive("/authors")}
                exact
              >
                <Nav.Link active={false}>Authors</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Genres" id="basic-nav-dropdown">
                <NavDropdown.Item href="action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>

              <LinkContainer
                to={"/cart"}
                isActive={this.checkActive("/cart")}
                exact
              >
                <Nav.Link active={false}>
                  <FaShoppingCart size={20} style={{ marginRight: 10 }} />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {isLoggedIn ?
                <LinkContainer
                  to={"/logout"}                  
                  isActive={false}                 
                  exact
                  onClick={logout}
                >
                  <Nav.Link active={false}>
                    <FaSignOutAlt size={20} style={{ marginRight: 10 }} />
                    Logout
              </Nav.Link>
                </LinkContainer>
                :
                <LinkContainer
                  to={"/login"}
                  isActive={this.checkActive("/login")}
                  exact
                >
                  <Nav.Link active={false}>
                    <FaUser size={20} style={{ marginRight: 10 }} />
                    Login
                </Nav.Link>
                </LinkContainer>}
              <LinkContainer
                to={"/registration"}
                isActive={this.checkActive("/registration")}
                exact
              >
                <Nav.Link active={false}>
                  <FaUserEdit size={24} style={{ marginRight: 10 }} />
                  Registration
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
      logout: logout
    },dispatch);
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStatus.isLoggedIn
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(NavMenu);