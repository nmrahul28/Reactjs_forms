import React from 'react';
import Input from './Input.js'
import './signup.css';
import Button from './Button.js';
import FormErrors from './formerrors.js';
class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      SignIn: true,
      is_SignUp: false,
      name: '',
      password: '',
      email: '',
      mobile: '',
      login_email: '',
      login_password: '',
      formErrors: { name: '', email: '', password: '', mobile: '', login_email: '', login_password: '' },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      phoneValid: false,
      formValid: false
    }


  }
  toggle_signin = () => {
    this.setState({
      is_SignUp: false,
      SignIn: true,
      login_email: '',
      login_password: '',
      formErrors: { login_email: '', login_password: '' },

    });
  }
  toggle_signup = () => {
    this.setState({
      is_SignUp: true,
      SignIn: false,
      name: '',
      password: '',
      email: '',
      mobile: '',
      formErrors: { name: '', email: '', password: '', mobile: '' }
    })
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [event.target.name]: event.target.value
    }, () => { this.validation_checker(name, value) });
  }
  validation_checker(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let nameValid = this.state.passwordValid;
    let phoneValid = this.state.phoneValid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'invalid';
        break;
      case 'password':
        passwordValid = (value.length) >= 8 &&  value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

        fieldValidationErrors.password = passwordValid ? '' : 'is too Weak';
        break;
      case 'name':
        nameValid = value.match(/^[a-zA-Z]+$/);;
        fieldValidationErrors.name = nameValid ? '' : ' is required';
        break;
      case 'mobile':
        phoneValid = value.length === 10 && value.match(/^[0-9]+$/);;
        fieldValidationErrors.mobile = phoneValid ? '' : ' number is not valid.';
        break;
      case 'login_email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'invalid';
        break;
      case 'login_password':
        passwordValid = value.length >= 8 && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        fieldValidationErrors.password = passwordValid ? '' : 'is too weak';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      nameValid: nameValid,
      phoneValid: phoneValid
    }, this.validateForm);
  }
  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid && this.state.phoneValid });
  }
  render() {
    return (
      <div className='form_style'>
        <Button btn_click={this.toggle_signin} btn_type={'button'} btn_name={'Login'}></Button>
        <Button btn_click={this.toggle_signup} btn_type={'button'} btn_name={'Signup'}></Button>
        {
          this.state.SignIn && <div> <form>
            <h1>Login Form</h1>
            <div className="default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <label>Email</label>
            <Input input_type={'email'} input_name={'login_email'} input_placeholder={'Email'} input_value={this.state.login_email} input_change={this.handleChange}></Input>
            <label>Password</label>
            <Input input_type={'password'} input_name={'login_password'} input_placeholder={'Password'} input_value={this.state.login_password} input_change={this.handleChange}></Input><br></br>
            <Button btn_type={'submit'} btn_name={'Submit'}></Button>
          </form>
          </div>
        }

        {
          this.state.is_SignUp && <div><form>
            <h1>Signup Form</h1>
            <div className="default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <label>Name</label>
            <Input input_type={'text'} input_name={'name'} input_placeholder={'Name'} input_value={this.state.name} input_change={this.handleChange}></Input>
            <label>Email</label>
            <Input input_type={'email'} input_name={'email'} input_placeholder={'Email'} input_value={this.state.email} input_change={this.handleChange}></Input>
            <label>Mobile</label>
            <Input input_type={'tel'} input_name={'mobile'} input_placeholder={'Mobile'} input_value={this.state.mobile} input_change={this.handleChange}></Input>
            <label>Password</label>
            <Input input_type={'password'} input_name={'password'} input_placeholder={'Password'} input_value={this.state.password} input_change={this.handleChange}></Input><br></br>
            <Button btn_type={'submit'} btn_name={'Submit'}></Button>
          </form>
          </div>
        }
      </div>

    )
  }
}

export default Signup;
