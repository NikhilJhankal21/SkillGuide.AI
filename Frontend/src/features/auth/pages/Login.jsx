import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

    const { loading, handleLogin } = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [error, setError] = useState("")


    const handleSubmit = async (e) => {

        e.preventDefault()

        setError("")

        const result = await handleLogin({
            email,
            password
        })

        if (result.success) {
            navigate('/home')
        } else {
            setError(result.message)
        }
    }


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
              <div className="flex flex-col items-center p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 shadow-2xl">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-300 font-medium tracking-wide">Loading your workspace...</p>
              </div>
            </div>
        )
    }


    return (
        <main>

            <div className="form-container">

                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    {error && (
                        <p className="auth-error">
                            ⚠ {error}
                        </p>
                    )}


                    <div className="input-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                        />

                    </div>


                    <div className="input-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            onChange={(e) => {
                                setpassword(e.target.value)
                            }}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                        />

                    </div>


                    <button className="button primary-button">
                        Login
                    </button>

                </form>


                <p>
                    Don't have an account?
                    <Link to="/register"> Register </Link>
                </p>

            </div>

        </main>
    )
}


export default Login