import React from 'react';
import './App.css';

function App() {
  return (
    <div className='container my-5'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            data-testid='password'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='confirm-password' className='form-label'>
            Confirm password
          </label>
          <input
            type='password'
            id='confirm-password'
            name='confirm-password'
            className='form-control'
            data-testid='confirm-password'
          />
        </div>
      </form>
    </div>
  );
}

export default App;
