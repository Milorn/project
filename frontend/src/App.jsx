import axios from "axios"
import { useState } from "react"

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState([])

  const submit = async (e) => {
    setStatus('')
    setErrors([])
    try {
      e.preventDefault();
      await axios.post('http://localhost:3000/auth/login', { email, password })
      setStatus('success')
    } catch (e) {
      setStatus('error')
      if(e.response) {
        setErrors(e.response.data.errors)
      }
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {
        status &&
        <div className={`w-96 p-5 mb-5 rounded-lg shadow-lg text-white ${status == 'success' ? 'bg-green-400' : 'bg-red-400'} `}>
          {
            status == 'success' ? 'Logged in successfully.' :
              <ul>
                <li>Errors:</li>
                {errors.map((error, index) => <li key={index}>{error}</li>)}
              </ul>
          }
        </div>
      }
      <div className="shadow-xl border rounded-lg p-5 w-96">
        <h1 className="font-extralight tracking-widest text-3xl uppercase text-center">Login</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={submit}>
          <input className="border px-2 py-2 shadow-sm rounded-lg" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="border px-2 py-2 shadow-sm rounded-lg" type="password" placeholder="••••" onChange={(e) => setPassword(e.target.value)} />
          <button className="border py-2 rounded-lg font-extralight tracking-widest uppercase">Submit</button>
        </form>
      </div>
    </div>
  )
}