import React from 'react'

export default class SignUp extends React.Component {
    render() {
        return (
            <div className='forms'>
                <form>
                    Username: <input type='text' />
                    Password: <input type='password' />
                    Password: <input type='password' />
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}