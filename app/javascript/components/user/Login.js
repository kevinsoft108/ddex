import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom';
import {
  Field,
  Form,
  Formik,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';

import FetchService from '../../services/Fetch.service';
import TokenService from '../../services/Token.service';
import { useAuth } from '../../services/Auth.context';
import { useGlobalMessaging } from '../../services/GlobalMessaging.context';

export const Login = ({ toggleLogin }) => {
  const [messageState, messageDispatch] = useGlobalMessaging();
  const [authState, authDispatch] = useAuth();
  const { t } = useTranslation('translations');

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        FetchService.isofetch(
          '/auth/login',
          {
            email: values.email,
            password: values.password
          },
          'POST'
        )
          .then((res) => {
            setSubmitting(false);
            if (res.success) {
              // save token in cookie for subsequent requests
              const tokenService = new TokenService();
              tokenService.saveToken(res.authToken);

              authDispatch({
                type: 'setAuthDetails',
                payload: {
                  id: res.id,
                  firstName: res.firstName,
                  lastName: res.lastName,
                  email: res.email,
                  avatar: res.avatar,
                }
              });
              messageDispatch({
                type: 'setMessage',
                payload: {
                  message: t('login-success'),
                  klass: 'success'
                }
              });
              toggleLogin(false);
              navigate('/user/dashboard')
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
          <div className='inputWrap'>
            <Field id='email' name='email' placeholder='Username or Email' />
            <ErrorMessage name='email'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
          </div>
          <div className='inputWrap'>
            <Field id='password' name='password' placeholder='Password' type='password' />
            <ErrorMessage name='password'>{msg => <div className='error'>{msg}</div>}</ErrorMessage>
          </div>
          <a title='Forgot password' className='forgot_pass' href='#'>Forgot password</a>
          <input type='submit' name='submit' value='Login' disabled={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};
