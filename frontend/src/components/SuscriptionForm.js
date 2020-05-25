import React, { useState } from 'react'
import { format } from 'rut.js'
import axios from 'axios'


const SuscriptionForm = ({ markAsSubmited }) => {

  const [data, setData] = useState({
    name: '',
    email: '',
    rut: '',
    phone: ''
  })

  const [error, setError] = useState(false)


  const handleInputChange = (event) => {
    setError(false)

    if (event.target.name === 'rut') {
      event.target.value = format(event.target.value)
    }

    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = process.env.REACT_APP_API_URL || 'http://localhost:3100/local'

    console.log(JSON.stringify(data))

    try {
      const response = await axios.post(`${url}/landing/subscriptions`, data)

      console.log('[✅] Sucessfull suscription')

      setData({
        name: '',
        email: '',
        rut: '',
        phone: ''
      })

      markAsSubmited(true)

    } catch (error) {

      setError(true)

    }



  }


  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {error &&
        <div className="text-2xl text-center text-white border border-dashed border-red-400 p-4 mb-8">Los datos recibidios son inválidos</div>
      }
      <div className="mb-8">
        <div className="md:flex">
          <div className="md:w-1/2 w-full p-2">
            <label htmlFor="name" className="text-white mb-2 block">Nombre <span className="text-red-500">*</span></label>
            <input name="name" type="text" className="bg-white rounded px-3 py-2 w-full" placeholder="Ej. Jose Canseca"
              value={data.name} onChange={handleInputChange} />
          </div>
          <div className="md:w-1/2 w-full p-2">
            <label htmlFor="phone" className="text-white mb-2 block">Teléfono <span className="text-red-500">*</span></label>
            <div className="flex items-center">
              <input className="bg-gray-300 rounded rounded-r-none px-3 py-2 w-16" type="text" disabled value="+569" />
              <input type="number" name="phone" className="bg-white rounded rounded-l-none px-3 py-2 w-full" placeholder=" Ej 37729376" required
                value={data.phone} onChange={handleInputChange} />
            </div>
          </div>
        </div>
        <div className="md:flex">
          <div className="md:w-1/2 w-full p-2">
            <label htmlFor="email" className="text-white mb-2 block">Correo <span className="text-red-500">*</span></label>
            <input type="email" name="email" className="bg-white rounded px-3 py-2 w-full" placeholder="ej correo@gmail.com" required
              value={data.email} onChange={handleInputChange} />
          </div>
          <div className="md:w-1/2 w-full p-2">
            <label htmlFor="name" className="text-white mb-2 block">RUT <span className="text-red-500">*</span></label>
            <input type="text" name="rut" className="bg-white rounded px-3 py-2 w-full" placeholder="20.492.283-1" required
              value={data.rut} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      <button
        className="text-teal-200 tracking-wide bg-teal-500 py-2 px-4 rounded shadow w-full block text-center">
        Inscribirse
        </button>
    </form>
  )
}

export default SuscriptionForm;