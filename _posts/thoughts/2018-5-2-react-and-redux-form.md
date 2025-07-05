---
layout: post
title: "React + Redux Form"
date: 2018-5-2 19:46:27
comments: true
categories: thoughts
featured-icon-url: /assets/posts/5-2-18/form-icon@2x.png
featured-icon-alt: "Form Illustration"
---

When I started learning and building with React, app development, data-binding, and state management were new to me and the idea of using <a href='https://reactjs.org/docs/forms.html#controlled-components' target="_blank" class="link--text-in-p">controlled components</a> to store and update input field values seemed like a lot of unnessesary overhead.

Luckily, a coworker suggested I try out <a href='https://redux-form.com' target="_blank" class="link--text-in-p">Redux Form</a>, a library that helps you manage form state and validation in redux rather than in a component.

## What is Redux Form?

By connecting a form component to redux through Redux Form's `reduxForm()` <a href='https://reactjs.org/docs/higher-order-components.html' target="_blank" class="link--text-in-p">higher-order component</a> and `formReducer`, the library keeps track of common application form state in a redux store rather in the local component.

In fact, it helps manage things such as:

- Fields that are in the form
- Values of each field
- Focused field
- If field values are valid
- Which fields the user has interacted with
- Wheter the form is being submitted
- Any asynchronous validation
  ^https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8

## Under the Hood

Before I began using Redux Form, I stored form input values and error states in its own component `state` and created a `handleInputChange()` method to handle updates for each individual field. I'd then create methods to manage validation and error messages on submit. None of this was DRY and made it difficult to build new forms.

Using `redux-form` simplified form management by allowing me to store a form's input values in a redux store, handling inputs' `onChange` methods and providing field-level validation.

After setting up Redux Form, you'll be able to see it at work using <a href='https://github.com/reduxjs/redux-devtools' target="_blank" class="link--text-in-p">Redux DevTools</a>:

<!-- <div class="video-container">
  <div class='embed-container'>
    <iframe src='https://player.vimeo.com/video/265891862?autoplay=1&loop=1&loop=1&title=0&byline=0&portrait=0&muted=1' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
  </div>
</div> -->

The form is stored under the name you give it, in this case `SignInForm`, while input data is stored under `values` and errors under `syncErrors`. Redux Form then provides meta information like those error messages, whether an input has been `touched`, and whether the form is or isn't `dirty` as props in your form and input components.

### A Sample Redux Form

The following is an example form for a Sign In screen. `reduxForm()` connects the form component to redux while `redux-form`'s `Field` component manages the actual inputs including the `validation` that the field requires.

```
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

// Components
import ReduxFormInput from '../../../components/Inputs/ReduxFormInput'
import Button from '../../../components/Button'

//Utils
import {
  required,
  email,
} from '../../../utils/formValidators'
import * as API  from '../../utils/api'
class SignInForm extends Component {
  handleSubmit = (user) => {
    /*
    * `user` is the object of values passed in from Redux Form
    * user = {
    *   email: user.email,
    *   password: user.password
    * }
    */

    API.login(user).then(response => {
      if (response.success)) {
        // Do some stuff! The form worked :)
      } else {
        // Set an error message
      }
    })
  }

  render() {
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

### Custom Field Components

In the above example, you'll see that `Field` takes a prop called `component`. This prop allows you define your own input component and can be either a `Component`, a stateless function, or a string name of one of the default supported DOM inputs (`input`, `textarea` or `select`).

In my case, I created a component called `ReduxFormInput`, allowing me to define the structure I wanted surrounding a basic `input` field:

```
import React, { Component } from 'react'

class ReduxFormInput extends Component {
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
        className={buildClassName([
          'input-container',
          optionalClasses,
          touched && error ? ' error' : '',
        ])}
      >
        { label &&
          <label>{label}</label>
        }
        <div className='input-container-inner'>
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
}

const buildClassName = (classes) => classes.filter(Boolean).join(" ")

export default ReduxFormInput
```

### Field-Level Validation

One of my favorite parts of Redux Form is how easy it makes validation. While Redux Form provides several types of validation (<a href='https://redux-form.com/7.3.0/examples/syncvalidation/' target="_blank" class="link--text-in-p">Sync</a>, <a href='https://redux-form.com/7.3.0/examples/submitvalidation/' target="_blank" class="link--text-in-p">Submit</a>, <a href='https://redux-form.com/7.3.0/examples/asyncvalidation/' target="_blank" class="link--text-in-p">Async Blur</a>, and more), I mainly make use of <a href='https://redux-form.com/7.3.0/examples/fieldlevelvalidation/' target="_blank" class="link--text-in-p">Field-Level Validation</a>.

Field-Level Validation focuses on `Field`'s `validate` prop. It accepts one or more functions to validate the value of the given field. If an input doesn't pass the requirements passed through `validate`, the entire form won't submit and an `error` prop is then passed to the input allowing you to render a message to the user.

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

Redux Form's documentation provides example validation functions, but you can also create custom functions to check input field values any way you want.

Here are a bunch of snippets that I've used before:

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

## Conclusion

React Form isn't the only package out there to manage forms in React (see <a href='https://github.com/jaredpalmer/formik' target="_blank" class="link--text-in-p">Formik</a>, <a href='https://github.com/davidkpiano/react-redux-form' target="_blank" class="link--text-in-p">React Redux Form</a>, and <a href='https://github.com/react-tools/react-form' target="_blank" class="link--text-in-p">React-Form</a> to name a few), but it's the one that's been making my life a whole lot easier.

### Other Resources

- <a href='https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8' target="_blank" class="link--text-in-p">The React Podcast ft. Jared Palmer (touches on Formik)</a>
- <a href='https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8' target="_blank" class="link--text-in-p">Why Build Your Forms with Redux Form</a>
