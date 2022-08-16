import React, { useEffect, useRef, useState } from 'react'
import Layout from './components/Layout'

export default function upload() {

  const fileRef                         = useRef();
  const API_ENDPOINT                    = "http://127.0.0.1:8000/api/v1";
  const [batchDetails, setBatchDetails] = useState({});
  const [batchId, setBatchId]           = useState(null);
  const [isLoading, setIsLoading]       = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    if(isLoading) return false;

    const inputFile = fileRef.current;
    const file = inputFile.files[0];
    
    if(!file) return false;

    const fromData = new FormData();
    fromData.append("mycsv", file);
    setIsLoading(true);
    fetch(`${API_ENDPOINT}/upload`, { method: "post", body: fromData })
        .then( (res) => res.json())
        .then( (data) => {
          setIsLoading(false);
          setBatchId(data.id);
        })

  }

  const fetchBatchDetails = (id = null) => {
    const currentBatchId = id ?? batchId;
    console.log(currentBatchId);
    fetch(`${API_ENDPOINT}/batch/${currentBatchId}`)
        .then( (res) => res.json())
        .then( (data) => setBatchDetails(data))
  }

  const updateProgress = () => {
    setInterval(() => {
      fetchBatchDetails();
    }, 2000);    
  }

  useEffect( () => {

    if(batchId != null){
      updateProgress();
    }    

  }, [batchId]);

  return (
    <Layout>
      {batchDetails.progress != undefined && 
        <section>
          <h1 className='text-xl text-gray-800 text-center mb-5 font-bold'>Upload in progress ({batchDetails.progress}%)</h1>
          <div className='w-full h-4 rounded-lg shadow-inner border'>
            <div className='bg-green-700 w-full h-4 rounded-lg' style={{ width:`${batchDetails.progress}%` }}></div>
          </div>
        </section>
      }

    { batchDetails.progress == undefined && 
      <section>
        <h1 className='text-xl text-gray-800 text-center mb-5 font-bold'>Choose a million record file to upload</h1>
        <form className='border rounded p-4' onSubmit={handleForm}>
          <input type="file" ref={fileRef}/>
          <input type="submit" value="Upload" className={`px-4 py-2 rounded text-white ${isLoading ? 'bg-gray-400' : 'bg-gray-700'}`} />
        </form>
      </section>
    }
      
    </Layout>
  )
}
