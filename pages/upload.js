import React, { useEffect, useRef, useState } from 'react'
import Layout from './components/Layout'

export default function upload() {

  const fileRef      = useRef();
  const API_ENDPOINT = "http://127.0.0.1:8000/api/v1";
  const [batchDetails, setBatchDetails] = useState({});

  const handleForm = (e) => {
    e.preventDefault();
    const inputFile = fileRef.current;
    const file = inputFile.files[0];
    
    if(!file) return false;

    const fromData = new FormData();
    fromData.append("mycsv", file);
    fetch(`${API_ENDPOINT}/upload`, { method: "post", body: fromData })
        .then( (res) => res.json())
        .then( (data) => console.log(data))

  }

  const fetchBatchDetails = () => {
    const batchId = "9708f9f8-5937-46b6-8684-d439aa63802a";
    fetch(`${API_ENDPOINT}/batch/${batchId}`)
        .then( (res) => res.json())
        .then( (data) => setBatchDetails(data))
  }

  useEffect( () => {
    fetchBatchDetails();
  }, []);

  return (
    <Layout>
      {batchDetails && 
        <section>
          <h1 className='text-xl text-gray-800 text-center mb-5 font-bold'>File uploading.... ({batchDetails.progress}%)</h1>
          <progress value={batchDetails.progress} max="100"></progress>
        </section>
      }

    { !batchDetails && 
      <section>
        <h1 className='text-xl text-gray-800 text-center mb-5 font-bold'>Choose a million record file to upload</h1>
        <form className='border rounded p-4' onSubmit={handleForm}>
          <input type="file" ref={fileRef}/>
          <input type="submit" value="Upload" className="px-4 py-2 bg-gray-700 rounded text-white" />
        </form>
      </section>
    }
      
    </Layout>
  )
}
