import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider/useAuth';

import AuthImage from '../images/auth-image-nutrition-01.jpg';

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [setedEmail, setSetedEmail] = useState(true)
  const [setedPassword, setSetedPassword] = useState(true)
  const [setedName, setSetedName] = useState(true)
  const [authenticated, setAuthenticated] = useState(true)

  const auth = useAuth()
  const navigate = useNavigate();

  const handleName = e => {
    setName(e.target.value)
  }

  const handleEmail = e => {
    setEmail(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const handleRegister = async e => {
    try {
      e.preventDefault()

      if (name) setSetedPassword(true)
      else {
        setSetedName(false)
        return
      }

      if (email) setSetedEmail(true)
      else {
        setSetedEmail(false)
        return
      }

      if (password) setSetedPassword(true)
      else {
        setSetedPassword(false)
        return
      }

      const authenticated = await auth.authenticate(email, password)

      setAuthenticated(authenticated)

      if(authenticated) navigate('/')

    } catch (error) {
      console.log(error.status)
      console.error('Email ou senha inválidos.')
    }
  }

  return (
    <main className="bg-white">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <div className="text-2xl font-bold mt-1 text-black-500">NutriApp</div>
                  {/* <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                        <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                        <stop stopColor="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                        <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                        <stop stopColor="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                  </svg> */}
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-gray-800 font-bold mb-6">Cadastrar nova conta</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  {!authenticated && <div className="text-sm mt-1 text-red-500">Usuário já existe.</div>}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Nome</label>
                    <input onChange={handleName} value={name} id="name" className="form-input w-full" type="text" />
                  </div>
                  {!setedName && <div className="text-xs mt-1 text-red-500">Preencha esse campo!</div>}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input onChange={handleEmail} value={email} id="email" className="form-input w-full" type="email" />
                  </div>
                  {!setedEmail && <div className="text-xs mt-1 text-red-500">Preencha esse campo!</div>}
                  {/* <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="role">Your Role <span className="text-red-500">*</span></label>
                    <select id="role" className="form-select w-full">
                      <option>Designer</option>
                      <option>Developer</option>
                      <option>Accountant</option>
                    </select>
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input onChange={handlePassword} value={password} id="password" className="form-input w-full" type="password" autoComplete="on" />
                  </div>
                  {!setedPassword && <div className="text-xs mt-1 text-red-500">Preencha esse campo!</div>}
                </div>
                <div className="flex items-center justify-end mt-6">
                  {/* <div className="mr-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm ml-2">Email me about product news.</span>
                    </label>
                  </div> */}
                  <button onClick={handleRegister} className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap" to="/">Cadastar</button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-200">
                <div className="text-sm">
                  Já possui uma conta? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signin">Entrar</Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
        </div>

      </div>

    </main>
  );
}

export default Signup;