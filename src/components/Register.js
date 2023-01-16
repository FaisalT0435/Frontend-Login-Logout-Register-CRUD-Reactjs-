import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPassword_confirm] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();
    

    const Register = async(e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users',{
                name: name,
                email: email,
                password: password,
                password_confirm: password_confirm
            });
            history("/");
        } catch (error) {
            if (error.response){
                setMsg(error.response.data.msg);
            }
        }
    }
    
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-mobile">
                        <div className="column is-three-fifths is-offset-one-fifth">
                            <p className='has-text-centered'>{msg} </p>
                            <form onSubmit={Register} className='box'>
                                <div className="field mt-5">
                                    <label className='label'>
                                        Name
                                    </label>
                                    <div className="controls">
                                        <input type="text" className='input' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt">
                                    <label className='label'>
                                        Email
                                    </label>
                                    <div className="controls">
                                        <input type="text" className='input' placeholder='email@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className='label'>
                                        Password
                                    </label>
                                    <div className="controls">
                                        <input type="password" className='input' placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className='label'>
                                        Password Confirmation
                                    </label>
                                    <div className="controls">
                                        <input type="password" className='input' placeholder='*******' value={password_confirm} onChange={(e) => setPassword_confirm(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <button className='button is-info is-fullwidth'> Register </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Register
