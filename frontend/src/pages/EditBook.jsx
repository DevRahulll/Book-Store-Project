import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9000/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author)
        setTitle(response.data.title)
        setPublishYear(response.data.publishYear)
        // console.log(response.data);
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        alert("An error occured while in useffect . PPlease check Console")
        console.log(error);
      })
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
      .put(`http://localhost:9000/books/${id}`,data)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        alert("An error occured . Please check Console")
        console.log(error);
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Edit Book : </h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title : </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author : </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year : </label>
          <input
            type="Number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button
          className='p-2 bg-sky-400 m-8'
          onClick={handleEditBook}
        >Save</button>
      </div>
    </div>
  )
}
