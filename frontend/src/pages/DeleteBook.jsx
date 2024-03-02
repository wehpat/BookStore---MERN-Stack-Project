import React, {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const navigate = useNavigate()
  const handleDeleteButton = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("An error occured. Please check your console");
      });
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading? (<Spinner/>): ""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete the book?</h3>
        <button 
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteButton}
          >
            Yes, Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteBook