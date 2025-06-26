
import { useRouter } from 'next/router';
import React, { useState } from 'react'

function Register() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpHandler = async () => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();
        if(data.status === 'success') {
            router.push('/login');
        }
    }

    return (
        <div>
            <h3>Registration Form</h3>
            <input 
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
            onClick={signUpHandler}
            >
                Sign up
            </button>
        </div>
    )
}

export default Register
