import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const initialState ={
  emailError: '', passwordError: '', addressError: '', firstNameError: '', lastNameError: '',usernameError: '', repeatpasswordError: ''
}

export class Register extends Component {
    static displayName = Register.name;
    state = initialState;

    constructor(props) {
        super(props);
        this.state = { emailadress: '', password: '', address: '', firstName: '', lastName: '',username: '', repeatpassword: '',
               };
    }

    componentDidMount() {

    }

    Validate = () => {

      let emailError= '';
       let passwordError= '';
        let addressError= '';
         let firstNameError= '';
          let lastNameError= '';
          let usernameError= '';
          let repeatpasswordError= '';
      // if(this.state.password < =){

      // }

      if(!this.state.firstName.match(/^[a-zA-Z]+$/)){
        firstNameError = "can only contain letters"
      }

      if(!this.state.lastName.match(/^[a-zA-Z]+$/)){
        lastNameError = "can only contain letters"
      }

      if(this.state.password.length < 10){
        passwordError = "Password is not long enough"
      }

      if (firstNameError || lastNameError || passwordError){
        this.setState({firstNameError});
        this.setState({lastNameError});
        this.setState({passwordError});
        return false;
      }


      if (lastNameError){
        this.setState({lastNameError});
        return false;
      }

      return true;
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
        console.log(event.target.value)
    }

    RegisterUser = event => {
      event.preventDefault();
      const isValid = this.Validate();

      if(isValid){
        console.log("hello")
        axios.post('https://localhost:44355/api/user/{id}/register', {username: this.state.username, firstName: this.state.firstName, lastName: this.state.lastName, address: this.state.address,
         password: this.state.password, email: this.state.emailadress})
            .then(response =>
            {
                if (response.data.id !== 0) {
                  this.setState(initialState);
                    alert("register succesfull!")

                }
            console.log(response)
        })
            .catch(error => {
                console.log(error)
                alert("Login Failed.")
            })
            
      }
      else{
        alert("Check if you filled in the required fields correctly.")
      }

    }

    render() {
        return (
<Form onSubmit={this.RegisterUser}>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input onChange={this.handleInputChange } type="email" name="emailadress" id="exampleEmail" placeholder="with a placeholder" />
            {this.state.emailError ? (
                      <Label style={{color: 'red'}}>{}</Label>
            ): null}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="FirstName">First name</Label>
            <Input onChange={this.handleInputChange } type="FirstName" name="firstName" id="FirstName" placeholder="First name" />
            {this.state.firstNameError ? (
                      <Label style={{color: 'red'}}>{this.state.firstNameError}</Label>
            ): null}
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="LastName">Last name</Label>
            <Input onChange={this.handleInputChange } type="text" name="lastName" id="LastName" placeholder="Last name"/>
            {this.state.lastNameError ? (
                      <Label style={{color: 'red'}}>{this.state.lastNameError}</Label>
            ): null}
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input onChange={this.handleInputChange } type="text" name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input onChange={this.handleInputChange } type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="Username">Username</Label>
            <Input onChange={this.handleInputChange } type="text" name="username" id="Username"/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input onChange={this.handleInputChange } type="password" name="password" id="Password"/>
            {this.state.passwordError ? (
                      <Label style={{color: 'red'}}>{this.state.passwordError}</Label>
            ): null}
          </FormGroup>  
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="Password">Repeat password</Label>
            <Input onChange={this.handleInputChange } type="password" name="repeatpassword" id="repeatpassword"/>
          </FormGroup>  
        </Col>
      </Row>
      <button type="submit" class="btn btn-primary">Register</button>
      <td><Link to={{
        pathname: '/login',
        }}>Login</Link></td>
    </Form>
        );
    }
}