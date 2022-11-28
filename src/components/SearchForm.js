import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setIsSearch} = useGlobalContext();

  const searchValue = React.useRef('')

  const searchMinuman = () =>{
    console.log(searchValue)
    setIsSearch(searchValue.current.value)
  }

  // apa fungsinya???
  useEffect(()=>{
    searchValue.current.focus()
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault();
  }


  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor='name'>Cari minuman favorit anda!</label>
          <input
          type='text'
          id='name'
          ref={searchValue}
          onChange={searchMinuman}
          ></input>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
