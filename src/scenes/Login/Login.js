import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { Form, Grid, Header, Image } from 'semantic-ui-react'
import { loginRequest } from './login.action';


class Login extends Component {
  constructor (props) {
    super(props)
  }

  _login({username, password}) {
    this.props.loginRequest({username, password});
  }

  render () {
    const { formState, currentlyStatus, error } = this.props.data;
    return (
      <div className='login-form'>
          {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
          */}
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
              background: url(tax-background2.jpg) no-repeat center center fixed; 
              -webkit-background-size: cover;
              -moz-background-size: cover;
              -o-background-size: cover;
              background-size: cover;
            }
          `}
          </style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='blue' textAlign='center'>
                <Image src='/fastek.png' /> Log-in to your account
              </Header>
              <LoginForm data={formState} onSubmit={(data) => this._login(data)}/>
              {/* <Message>New to us? <a href='#'>Sign Up</a></Message> */}
            </Grid.Column>
          </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginRequest: (data) => {
      dispatch(loginRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
