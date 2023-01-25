import React  from 'react';
import {
  Field,
  Form,
  ErrorMessage,
  Formik,
} from 'formik';
import * as Yup from 'yup';

import FetchService from '../../services/Fetch.service';
import { useGlobalMessaging } from '../../services/GlobalMessaging.context';

export const Register = ({ setMode, toggleLogin }) => {
  const [messageState, messageDispatch] = useGlobalMessaging();

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(50, 'Must be 50 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(50, 'Must be 50 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(1, 'Too short')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        FetchService.isofetch(
          '/auth/register',
          {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
          },
          'POST'
        )
          .then((res) => {
            setSubmitting(false);
            if (res.success) {
              messageDispatch({
                type: 'setMessage',
                payload: {
                  message: res.message,
                  klass: 'success'
                }
              });
              setMode('login');
              toggleLogin(false);
            } else {
              messageDispatch({
                type: 'setMessage',
                payload: {
                  message: res.message,
                  klass: 'danger'
                }
              });
            }
          })
          .catch();
      }}
    >
      {({ isSubmitting }) => (
        <Form className='form-sign'>
          <div className='field-input'>
            <Field id='firstName' name='firstName' placeholder='First Name' type='text' />
            <ErrorMessage name='firstName'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
          </div>

          <div className='field-input'>
            <Field id='lastName' name='lastName' placeholder='Last Name' type='text' />
            <ErrorMessage name='lastName'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
          </div>

          <div className='field-input'>
            <Field id='email' name='email' placeholder='Email' type='email' />
            <ErrorMessage name='email'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
          </div>

          <div className='field-input'>
            <Field id='password' name='password' placeholder='Password' type='password' />
            <ErrorMessage name='password'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
          </div>

          <div className='field-check'>
            <label htmlFor='accept'>
              <input type='checkbox' id='accept' />
              Accept the <a title='Terms' href='#'>Terms</a> and <a title='Privacy Policy' href='#'>Privacy Policy</a>
              <span className='checkmark'>
                <i className='la la-check'></i>
              </span>
            </label>
          </div>
          <input type='submit' name='submit' value='Sign Up' disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};
