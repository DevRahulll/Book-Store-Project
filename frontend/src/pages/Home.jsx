import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner.jsx'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BookCard from '../components/home/BookCard.jsx';
import BookTable from '../components/home/BookTable.jsx';

export const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table')

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:9000/books')
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);


    return (
        <div className='h-screen w-screen p-4 '>
            <div className='flex justify-center items-center gap-x-4'>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-xl'
                    onClick={() => setShowType('table')}
                >Table
                </button>

                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-xl'
                    onClick={() => setShowType('card')}
                >Card
                </button>

            </div>

            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : showType === 'table' ? (
                <BookTable books={books} />
            ) : (<BookCard books={books} />
            )}
        </div>
    )
}
