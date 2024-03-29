import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css'
import { CSSTransition } from "react-transition-group";
import { Welcome, LoginFooter } from '../../Components'
import { trello_left, trello_right } from '../../Assets/Images';

const LoginForm = () => {
  const [backendErrors, setBackendErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setBackendErrors(data);
      setSubmitted(!submitted)
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@demo.io', 'password'))
  }

  useEffect(() => {
    const valErrors = [];
    backendErrors.forEach(err => {
      if (err === 'email : 1') valErrors.push('There is no account for this email.')
      if (err === 'password : 3') valErrors.push('Incorrect password and email combination')
    })
    if (!email.trim().length) valErrors.push('Please provide a valid email address')
    setErrors(valErrors)
  }, [submitted])

  useEffect(() => {
    const lengthErrors = []
    if (email.length > 49) {
      lengthErrors.push('Please keep email to under 50 characters')
      setDisabled(true)
    }
    if (password.length === 40) {
      lengthErrors.push('Please keep password to under 40 characters')
      setDisabled(true)
    }
    if (lengthErrors.length) setErrors(lengthErrors)
    else {
      setDisabled(false)
      setErrors([]);
    }
  }, [email, password])

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login__wrapper'>
      <div className='login__background' />
      <div className='login__container'>
        <div className='login__logo-container'>
          <div className='login__logo'>💠</div>
          <h3 className='login__header-text'>WhatNext?</h3>
        </div>
        <Welcome />
        <div className='login__form-wrapper'>

          <div className='login__form-container'>
            <form className='login__form' onSubmit={onLogin}>
              <p className='login__call'>Log in to WhatNext</p>
              <CSSTransition
                in={errors[0]}
                timeout={500}
                classNames="error-transition"
                unmountOnExit
              >
                <div className='error__container-login'>
                  {errors.map((error, ind) => (
                    <div className='error__text-login' key={ind}>{error}</div>
                  ))}
                </div>
              </CSSTransition>
              <div>
                <input
                  className='login__input login__input-top'
                  name='email'
                  type='text'
                  required
                  maxLength={50}
                  autoComplete="off"
                  placeholder='Enter email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                <input
                  className='login__input'
                  name='password'
                  maxLength={40}
                  required
                  autoComplete="off"
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <button
                className={disabled ? 'signup__btn-disabled' : 'login__button-submit'}
                type='submit'
                disabled={disabled}
              >Log in</button>
              <p className='login__or'>OR</p>
              <div className='login__demo' onClick={handleDemo}>
                <p className='login__emoji'>👍</p>
                <p className='login__demo-text'>Continue as demo user</p>
              </div>
              <div className='login__underline' />
              <NavLink className='login__signup' to='/sign-up' exact>
                Sign up for an account
              </NavLink>
            </form>
          </div>
          <LoginFooter />
        </div>
      </div>
      <div className='landing__photo-container'>
        <figure className='landing__image landing__image-left' style={{ backgroundImage: `url(${trello_left})` }} />
        <figure className='landing__image image landing__image-left' style={{ backgroundImage: `url(${trello_right})` }} />
      </div>
    </div>
  );
};

export default LoginForm;
