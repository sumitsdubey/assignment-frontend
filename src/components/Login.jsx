import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api';
import { AppContext } from './AppContext';
import toast from 'react-hot-toast';
import Loading from './Loading';

const Login = () => {

  const { isLoggedIn, setIsLoggedIn, loading, setLoading } = useContext(AppContext)

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await login(user)
      if (response.status === 200) {
        toast.success('Login successful')
        setIsLoggedIn(true)
        localStorage.setItem('token', response.data.token);
        setLoading(false)
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  return (
    <>
      {loading ? <Loading /> :
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 p-5">
          <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-7 backdrop-blur">
            <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 text-center mb-2">
              NotesFlow
            </h1>
            <p className="text-center text-slate-500 mb-6">Welcome back! Sign in to continue</p>
            <form className="grid gap-3" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border-2 border-slate-200 focus:border-indigo-400 outline-none bg-white px-4 py-3 text-slate-800 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full rounded-xl border-2 border-slate-200 focus:border-indigo-400 outline-none bg-white px-4 py-3 text-slate-800 placeholder-slate-400"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg transition-shadow"
              >
                Sign In
              </button>
              <button
                type="button"
                className="w-full rounded-xl border border-slate-200 bg-white text-slate-600 px-4 py-3 cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Don't have an account? Register
              </button>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default Login