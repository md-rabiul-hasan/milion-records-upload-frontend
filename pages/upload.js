import React, { useRef } from 'react'
import Layout from './components/Layout'

export default function upload() {

  const fileRef      = useRef();
  const API_ENDPOINT = "http://127.0.0.1:8000/api/v1";

  const handleForm = (e) => {
    e.preventDefault();
    const inputFile = fileRef.current;
    const file = inputFile.files[0];
    
    if(!file) return false;

    console.log(file);
    const fromData = new FormData();
    fromData.append("mycsv", file);
    fetch(`${API_ENDPOINT}/upload`, fromData)
        .then( (res) => console.log(res) )
        .then( (data) => console.log(data))

  }

  return (
    <Layout>
      <h1 className='text-xl text-gray-800 text-center mb-5 font-bold'>Choose a million record file to upload</h1>
      <form className='border rounded p-4' onSubmit={handleForm}>
        <input type="file" ref={fileRef}/>
        <input type="submit" value="Upload" className="px-4 py-2 bg-gray-700 rounded text-white" />
      </form>
    </Layout>
  )
}
