import React, { Component } from 'react'
import { Button, Form, Image, Segment } from 'semantic-ui-react'

class LoginForm extends Component {
  state = { username: '', password: '' };
  constructor (props) {
    super(props)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._changeUsername = this._changeUsername.bind(this)
    this._changePassword = this._changePassword.bind(this)
  }

  loggerState() {
    console.log(JSON.stringify(this.state));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.data.username,
      password: nextProps.data.password
    });
    this.loggerState();
  }

  _changeUsername (event) {
    this.setState({
      username: event.target.value
    });
    this.loggerState();
  }

  _changePassword (event) {
    this.setState({
      password: event.target.value
    });
    this.loggerState();
  }

  _handleSubmit (event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return(
      <Form size='large' onSubmit={this._handleSubmit}>
        <Segment stacked>
          <Form.Input
            id='username' 
            fluid icon='user' 
            iconPosition='left' 
            placeholder='User Name'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false'
            value={this.state.username}
            onChange={this._changeUsername}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            id='password'
            type='password'
            value={this.state.password}
            onChange={this._changePassword}
          />
          <Button color='blue' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
    );
  }
}

export default LoginForm