import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import Maybe from '../Maybe';
import { Login } from './Login';
import { Register } from './Register';

export const Auth = ({ visible, toggleLogin }) => {
  const [mode, setMode] = useState('login');

  return (
    <>
      <Link to='#' className='nav-link' data-bs-toggle='modal' data-bs-target='#auth-modal'>
        Login
      </Link>
      <div className='modal fade' id='auth-modal' tabIndex='-1' aria-labelledby='authModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='authModalLabel'>Modal title</h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <ul className='choose-form'>
                <li className='nav-signup'>
                  <a title='Sign Up' onClick={() => setMode('signup')}>Sign Up</a>
                </li>
                <li className='nav-login'>
                  <a title='Log In' onClick={() => setMode('login')}>Log In</a>
                </li>
              </ul>
              <p className='choose-more'>Continue with <a title='Facebook' className='fb' href='#'>Facebook</a> or <a title='Google' className='gg' href='#'>Google</a></p>
              <Maybe test={mode === 'login'} >
                <Login toggleLogin={toggleLogin} />
              </Maybe>
              <Maybe test={mode !== 'login'} >
                <Register setMode={setMode} toggleLogin={toggleLogin} /> 
              </Maybe>
              ...
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
              <button type='button' className='btn btn-primary'>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
