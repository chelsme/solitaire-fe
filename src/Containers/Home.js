import React from 'react'

export default class Home extends React.Component {
    render() {
        return (
            <div className='forms'>
                <form>
                    Username: <input type='text' />
                    Password: <input type='password' />
                    <button>Login</button>
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}