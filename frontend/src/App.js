import React from 'react';
import { useState } from 'react';
import Nav from './components/Nav'
import SuscriptionForm from './components/SuscriptionForm'

function App() {

  const [submited, setSubmited] = useState(false)

  const markAsSubmited = () => {
    setSubmited(true)
  }

  return (
    <div className="App wrapper">
      <Nav />
      <div className="container mx-auto px-4 py-8 flex items-center justify-center flex-col min-h-screen">
        <div className="text-center text-white mb-6">
          <h1 className="text-4xl">Cursos de Verano +NEM</h1>
          <p className="">No dejes pasar esta increible oportunidad. Inscríbete acá</p>
        </div>
        {submited
          ? <div className="text-3xl text-white border border-dashed border-teal-100 p-8">Hemos recibido tu inscripción con exito ✅</div>
          : <SuscriptionForm markAsSubmited={markAsSubmited} />
        }
      </div>
    </div >
  );
}

export default App;
