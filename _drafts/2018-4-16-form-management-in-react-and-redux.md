---
layout: post
title:  "React + Redux Form"
date:   2018-4-16 19:46:27
comments: true
categories: thoughts
featured-icon-url: /assets/posts/11-09-15/terminal-icon.png
featured-icon-alt: "Icon of Golden Gate Bridge"
---

After just a few React projects, I grew to loathe setting up and managing forms. Having only developed CMS-based sites (think Wordpress) or helped with front-end styling, I was new to the world of app development, data-binding, and state management.

Using <a href='https://reactjs.org/docs/forms.html#controlled-components' target="_blank" class="link--text-in-p">controlled components</a> to store and update the values of input fields before a form even submitted was a completely foreign concept to me. After a few projects, a coworker suggested I try <a href='https://redux-form.com' target="_blank" class="link--text-in-p">Redux Form</a> instead. I found my happy place ♥.

## What is Redux Form?
Redux Form is a Redux-based method for managing form state. The library uses a reducer (`formReducer`) and a <a href='https://reactjs.org/docs/higher-order-components.html' target="_blank" class="link--text-in-p">React HOC</a> (`reduxForm()`) that wraps your `form` component to store and manage any interactions with your form as part of your Redux store.

In practice, this meant that I could take the state of my form out of my form component and let Redux Form handle any changes in Redux.

### Disclaimer
As stated in the Redux form documentation, in order to get the most out of library, you'll need a basic understanding of:
- Redux state container
- React and Higher-Order Components (HOCs)

## An Example Form
### Before
Here we have one of my earliest login forms <strong>without Redux Form</strong>. Do yourself a favor and don't do what I did here.

The form inputs' values and error states were stored in the form component's `state`, while a `handleInputChange()` method handled updates to individual fields and two functions, `formIsValid()` and `renderErrorMessage()`, managed validation and error messages.

None of this was very DRY and made it difficult to build new forms. All of the following code is for a form only two inputs: `email` and `password`. Imagine an even more complicated form and you can see that this method isn't sustainable.

```
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Components
import Button from '../../components/Button'

// Utils
import { validateEmail } from '../../utils/helpers'
import * as API  from '../../utils/api'

class SignInForm extends Component {
  state = {
    input: {
      email: {
        value: "",
        hasError: false
      },
      password: {
        value: "",
        hasError: false
      }
    },
    accessError: false
  }

  handleInputChange(newPartialInput) {
    this.setState(state => ({
      ...state,
      input: {
        ...state.input,
        ...newPartialInput
      }
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const userCanidate = {
      'email': this.state.input.email.value,
      'password': this.state.input.password.value
    }

    if (this.isFormValid()) {
      API.login(userCanidate).then(response => {
        if (response.success)) {
          // Do some stuff! The form worked :)
        } else {
          this.setState(state => ({
            ...state,
            accessError: true
          }))
        }
      })
    }
  }

  isFormValid = () => {
    let newInputState = {...this.state.input}
    let errorsArePresent = false

    if (!validateEmail(newInputState.email.value)) {
      newInputState.email.hasError = true
      errorsArePresent = true
    }

    if (newInputState.password.value === '') {
      newInputState.password.hasError = true
      errorsArePresent = true
    }

    if (errorsArePresent) {
      this.setState(state => ({
        ...state,
        input: newInputState
      }))
    } else {
      return true
    }
  }

  renderErrorMessage = (input) => {
    let message = ''

    if (input === 'email') {
      message = 'Please enter a valid email'
    } else if (input === 'password') {
      message = 'Please enter a password'
    } else {
      message = 'Invalid email or password'
    }
    return (
      <div className="input-error-message">
        {message}
      </div>
    )
  }

  render() {
    const { input, accessError } = this.state

    return (
      <div>
        {accessError &&
          <div className='input-container error'>
            {this.renderErrorMessage()}
          </div>
        }
        <form className="sessions-form" onSubmit={(event) => this.handleSubmit(event)}>
          <div
            className={`input-container${input.email.hasError ? ' error' : ''}`}
          >
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@youremail.com"
              value={input.email.value}
              onChange={event => this.handleInputChange(
                {email: {value: event.target.value, hasError: false}}
              )}
            />
            {input.email.hasError ? this.renderErrorMessage('email') : null}
          </div>
          <div
            className={`input-container${input.password.hasError ? ' error' : ''}`}
          >
            <label>Password</label>
            <div className="password-input-container">
              <input
                className={`${input.password.hasError ? 'error' : ''}`}
                name="password"
                type="password"
                placeholder="password"
                value={input.password.value}
                onChange={event => this.handleInputChange(
                    {password: {value: event.target.value, hasError: false}}
                )}
              />
              <Link
                className="forgot-password-link"
                to="/reset-password"
              >
                Forgot?
              </Link>
            </div>
            {input.password.hasError ? this.renderErrorMessage('password') : null}
          </div>
          <Button
            className='cta full-width invert'
            submitting={true}
          >
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

export default SignInForm
```

### After
Using `redux-form` simplifies form management by storing values in redux, handling any input's `onChange` interaction and also helps with individual field validation.

```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

// Components
import ReduxFormInput from '../../../components/Inputs/ReduxFormInput'
import Button from '../../../components/Button'

// Utils
import {
  required,
  email,
} from '../../../utils/formValidators'
import * as API  from '../../utils/api'

class SignInForm extends Component {
  state = {
    submitting: false
  }

  handleSubmit = (user) => {
    // `user` is the object of values passed in from Redux Form
    // user = {
    //   email: user.email,
    //   password: user.password
    // }

    if (this.isFormValid()) {
      API.login(user).then(response => {
        if (response.success)) {
          // Do some stuff! The form worked :)
        } else {
          // Set an error message
        }
      })
    }
  }

  render() {
    const { submitting } = this.state
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          component={ReduxFormInput}
          label='Email'
          name='email'
          placeholder='Enter your email'
          type='email'
          validate={[required, email]}
        />
        <Field
          component={ReduxFormInput}
          label='Password'
          name='password'
          placeholder='Enter a password'
          type='password'
          validate={required}
        />
        <Button
          className='cta full-width invert'
          submitting={true}
        >
          Submit
        </Button>
      </form>
    )
  }
}

// Connect to redux-form
SignInForm = reduxForm({
  form: 'SignInForm'
})(SignInForm)

export default SignInForm
```
Using `redux-form` the code for that single login form component goes from about 159 lines to 76.

Although there is some initial overhead when setting it up, I've found this method to significantly speed up development due to the fact that I'm not needlessly repeating code. It feels like magic.

## Redux Form: Under the Hood
After setting up Redux Form, you'll be able to see it at work using <a href='https://github.com/reduxjs/redux-devtools' target="_blank" class="link--text-in-p">Redux DevTools</a>:
<div class="video-container">
  <div class='embed-container'><iframe src='https://player.vimeo.com/video/265891862?autoplay=1&loop=1&loop=1&title=0&byline=0&portrait=0' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>
</div>

The form is stored under the name you give it, in this case `SignInForm`, while input data is stored under `values` and errors under `syncErrors`. Redux Form then provides meta information like those error messages, whether an input has been `touched`, and whether the form is or isn't `dirty` as props in your form and input components.

### Custom Field Components

Speaking of input components, you'll see that the above example contains `Field` component imported from `redux-form`. `Field` takes its own `component` prop that should be either a `Component`, a stateless function, or a string name of one of the default supported DOM inputs (`input`, `textarea` or `select`).

In my case, I created a `ReduxFormInput` component. Creating a fleshed out input component allows you to create some custom structure such as the placement and styling of the error message generated by redux-form.


```
// from ReduxFormInput's render function:
render() {
  // Provided by Redux Form:
  // { input, label, type, meta: { touched, error } }
  const {
    input,
    label,
    meta: {
      touched,
      error
    },
    placeholder,
    type,
    disabled,
    handleInputRemoval,
    optionalClasses,
  } = this.props

  return (
    <div
      className={`input-container${optionalClasses ? ' ' + optionalClasses : ''}${touched && error ? ' error' : ''}`}
    >
      { label &&
        <label>{label}</label>
      }
      <div className={`input-container-inner${handleInputRemoval ? ' removable' : ''}`}>
        <input
          {...input}
          type={type}
          placeholder={placeholder || label}
          disabled={disabled || false}
        />
      </div>
      {touched && error &&
        <div className="input-container-error-message">
          {error}
        </div>
      }
    </div>
  )
}
```

### Field-Level Validation
One of my favorite parts of Redux Form is how easy it makes validation. While Redux Form provides several types of validation (Sync, Submit, Async Blur, and more), I mainly make use of Field-Level Validation.

`Field`'s `validate` prop accepts one or more functions to validate the value of the given field. If any field in a form doesn't pass its field-level validation, this prevents the form from submitting.

```

import { reduxForm, Field } from 'redux-form'

// Components
import ReduxFormInput from '../../../components/Inputs/ReduxFormInput'

// Utils
import { required, email } from '../../../utils/formValidators'

/* ... */

<Field
  component={ReduxFormInput}
  label='Email'
  name='email'
  placeholder='Enter your email'
  type='email'
  validate={[required, email]}
/>

/* ... */
```

While Redux Form documentation also provides examples of some basic validation functions that you can import and use on your `Field`s, you can always build your own.

```
{/* formValidators.js */}
export const multipleValidations = (value, validations) => {
  const checks = validations.map(validation => validation(value))
  const failedChecks = checks.filter(check => !!check)

  return failedChecks.length === 0 ? undefined : failedChecks.join(", ")
}
export const required = value => !value || value === "" ? 'Required' : undefined
export const matchPasswords = (value, allValues, props, name) => {
  if (allValues['password']) {
    return value !== allValues['password'] ? "Passwords Don't Match" : undefined
  } else {
    return undefined
  }
}
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
export const minValue18 = minValue(18)
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
export const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
export const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined
```










https://changelog.com/reactpodcast/2 - Formik
