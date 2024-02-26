import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

export const ShowBook = () => {
  const [book,setBook]=useState({});
  const [loading,setLoading]=useState(false)
  const {id}=useParams();

  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:9000/books/${id}`)
    .then((response)=>{
      setBook(response.data);
      setLoading(false);
      // console.log(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])


  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner/>
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>           
          <span className='text-4xl mr-4 text-gray-500'>Id : </span>
          <span className='text-4xl mr-4 text-gray-500'>{book._id}</span>
          </div>
          <div className='my-4'>           
          <span className='text-4xl mr-4 text-gray-500'>Title : </span>
          <span className='text-4xl mr-4 text-gray-500'>{book.title}</span>
          </div>
          <div className='my-4'>           
          <span className='text-4xl mr-4 text-gray-500'>Author : </span>
          <span className='text-4xl mr-4 text-gray-500'>{book.author}</span>
          </div>
          <div className='my-4'>           
          <span className='text-4xl mr-4 text-gray-500'>Publish Year : </span>
          <span className='text-4xl mr-4 text-gray-500'>{book.publishYear}</span>
          </div>
          <div className='my-4'>           
          <span className='text-4xl mr-4 text-gray-500'>Create Time : </span>
          <span className='text-4xl mr-4 text-gray-500'>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>           
          <span className='text-4xl mr-4 text-gray-500'>Last Update Time : </span>
          <span className='text-4xl mr-4 text-gray-500'>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
