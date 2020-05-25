import React, { Fragment, useState } from 'react'
import axios from 'axios'


const SuscriptionForm = ({ markAsSubmited }) => {

  const [data, setData] = useState({
    name: '',
    email: '',
    rut: '',
    phone: ''
  })


  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(JSON.stringify(data))
    console.log('✅')
    markAsSubmited(true)
    setData({
      name: '',
      email: '',
      rut: '',
      phone: ''
    })
  }


  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="mb-8">
        <div className="md:flex">
          <div className="md:w-1/2 w-full p-2">
            <label htmlFor="name" className="text-white mb-2 block">Nombre <span className="text-red-500">*</span></label>
            <input name="name" type="text" className="bg-white rounded px-3 py-2 w-full" placeholder="Ej. Jose Canseca"
              value={data.name} onChange={handleInputChange} />
          </div>
          <div className="md:w-1/2 w-full p-2">
            <label htmlFor="phone" className="text-white mb-2 block">Teléfono <span className="text-red-500">*</span></label>
            <input type="text" name="phone" className="bg-white rounded px-3 py-2 w-full" placeholder=" Ej +569 3772 9376" required
              value={data.phone} onChange={handleInputChange} />
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