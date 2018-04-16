---
layout: post
title:  "My Journey with Forms in React"
date:   2018-4-16 19:46:27
comments: true
categories: thoughts
featured-icon-url: /assets/posts/11-09-15/terminal-icon.png
featured-icon-alt: "Icon of Golden Gate Bridge"
---

This is the story of my introduction to forms with both React and Redux. Although I've worked on designing and building websites and apps for years, it's been a shorter time that I've been working as a front-end developer.

Before becoming a full-time developer, I designed many web and mobile apps but had only contributed to small portions of codes on the front-end of web applications. When it came to learning and building with an actual front-end library/framework, the learning curve for me was actually pretty high. The beginning was not pretty, but after a few React projects, I've developed a better personal workflow for managing and working with forms in React.

## Part I: A Rough Beginning

I began my adventure with forms in React through <a href='https://reactjs.org/docs/forms.html#controlled-components' target="_blank" class="link--text-in-p">controlled components</a>, storing input values for elements like `<input>`, `<textarea>`, and `<select>` in a parent form component's state. It made sense enough.

Create a state for the component that holds each input's value and update that value whenever the user interacts with the input. Here's an example of some early work for a Login Form comprised of two inputs, an email and a password:

```
import React, { Component } from 'react'

class LoginForm extends Component {

  // "Alright, here's that state I've been talking about."
  state = {
    input: {
      email: '',
      password: ''
    }
  }

  // "Oh, and gotta update it whenever we change the input"
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
    // "We'll get to you later"
  }

  // "And finally, just render the form!"
  render() {
    const { input } = this.state

    return (
      <div>
        <form
          className="sessions-form"
          onSubmit={this.handleSubmit}
        >
          <div
            className='input-container'
          >
            <label>
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@youremail.com"
              value={input.email.value}
              onChange={event => this.handleInputChange(
                {email: event.target.value}
              )}
            />
          </div>
          <div
            className='input-container'
          >
            <label>
              Password
            </label>
            <div className="password-input-container">
              <input
                name="password"
                type="password"
                placeholder="password"
                value={input.password.value}
                onChange={event => this.handleInputChange(
                    {password: event.target.value}
                )}
              />
            </div>
          </div>
          <input className="cta" type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default LoginForm

```

"Awesome!", I thought. "But... how do I validate the form once the user fills it out?"

I'll spare you too much of the step-by-step detail, but let's say my initial pass at front-end validation was... crude.

The code will follow, but as a basic jist, here's what's going on:

1. I expanded the form's `state` to hold both the value of an input and a boolean `hasError` to indicate whether or not it had an error. This would be used to set a class of `error` on the input's containing div (for styling purposes)
2. I added a function to determine if the form was valid, `isFormValid()`, and set the `hasError` bool to true for any input that had an error
3. I added a function `renderErrorMessage()` to render an error message for the form as a whole or a specific message individual fields if passed in a string of `email` or `password`
4. And lastly, an `accessError` bool to the component state to determine whether or not to show the combined form error message above the form



```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Utils
import { validateEmail } from '../../utils/helpers';
import * as API  from '../../utils/api';

class LoginForm extends Component {
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
    event.preventDefault();
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
      });
    }
  }

  isFormValid = () => {
    let newInputState = {...this.state.input};
    let errorsArePresent = false;

    if (!validateEmail(newInputState.email.value)) {
      newInputState.email.hasError = true;
      errorsArePresent = true;
    }

    if (newInputState.password.value === '') {
      newInputState.password.hasError = true;
      errorsArePresent = true;
    }

    if (errorsArePresent) {
      this.setState(state => ({
        ...state,
        input: newInputState
      }))
    } else {
      return true;
    }
  }

  renderErrorMessage = (input) => {
    let message = '';

    if (input === 'email') {
      message = 'Please enter a valid email';
    } else if (input === 'password') {
      message = 'Please enter a password'
    } else {
      message = 'Invalid email or password';
    }
    return (
      <div className="input-error-message">
        {message}
      </div>
    )
  }

  render() {
    const { input, accessError } = this.state;

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
          <input className="cta" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
```

It wasn't great, but it worked. Even before the project was over, I knew that the way I was building and managing forms was unsustainable. The code I was writing wasn't DRY. Each form caused unnecessary duplication in validation and error message functions and there was a lack of abstraction for reapeated components like inputs with error messages.

## Part II: It Got (a Little) Better
### Building Abstractions for Repeated Elements

Much like the [view driven approach discussed by A. Sharif](https://medium.com/javascript-inside/some-thoughts-on-forms-in-react-9ca2d9078c20), I began to break out repeated input elements into their own components. This allowed me to pass props such as an input's label and error message into the component as well as onchange function

It made an input like this...
```
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
```

into a more manageable component, like this...

```
<Input
  onChange={doSomething}
  label='Name Field'
  errorMessage={getSomeMessage()}
/>
```

Building components for different types of inputs helped solve the repetitive nature of managing inputs' labels and error messages, but still didn't solve the issue of actually validating the form as a whole.

## Part III: Redux Forms
### Learning to Love Forms Again

After my first project using React, I had gotten the hang of building out forms using abstracted components, but I knew there had to be an easier way.

My coworker, Jake, suggested I look into [redux-form](https://redux-form.com). He had been using it on some of his React projects and


https://changelog.com/reactpodcast/2 - Formik
