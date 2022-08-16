import React, { useEffect, useRef, useState } from 'react'
import Layout from './components/Layout'

export default function upload() {

  const fileRef      = useRef();
  const API_ENDPOINT = "http://127.0.0.1:8000/api/v1";
  const [batchDetails, setBatchDetails] = useState({});
  const [batchId, setBatchId] = useState(null);

  const handleForm = (e) => {
    e.preventDefault();
    const inputFile = fileRef.current;
    const file = inputFile.files[0];
    
    if(!file) return false;

    const fromData = new FormData();
    fromData.append("mycsv", file);
    fetch(`${API_ENDPOINT}/upload`, { method: "post", body: fromData })
        .then( (res) => res.json())
        .then( (data) => {
          console.log(data);
          setBatchId(data.id);
          fetchBatchDetails(data.id);
        })

  }

  const fetchBatchDetails = (id = null) => {
    const currentBatchId = id ?? batchId;
    console.log(currentBatchId);
    fetch(`${API_ENDPOINT}/batch/${currentBatchId}`)
        .then( (res) => res.json())
        .then( (data) => setBatchDetails(data))
  }

  useEffect( () => {
    setInterval( () => {
      if(batchDetails.progress && batchDetails.progress !== 100){
        fetchBatchDetails();
      }
    }, 2000);
  }, []);

  return (
    <Layout>
      {batchDetails.progress && 
        <section>
          <h1 className='text-xl text-gray-800 text-center mb-5 font-bold'>File uploading.... ({batchDetails.progress}%)</h1>
          <progress value={batchDetails.progress} max="100"></progress>
        </section>
      }

    { !batchDetails.progress && 
      <section>
        <h1 className='text-xl text-gray-800 text-center mb-5 font-bold'>Choose a million record file to upload</h1>
        <form className='border rounded p-4' onSubmit={handleForm}>
          <input type="file" ref={fileRef}/>
          <input type="submit" value="Upload" className="px-4 py-2 bg-gray-700 rounded text-white bg-indigo-500" />
        </form>
      </section>
    }
      
    </Layout>
  )
}
