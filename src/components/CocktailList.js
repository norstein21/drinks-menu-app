import React from 'react'
import Cocktails from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const {loading,minuman} = useGlobalContext();
  
  if(loading){
    return <Loading />
  }
  if(minuman.length < 1){
    return (
      <div>
        <h2 className='section-title'>Minuman yang dicari tidak ada</h2>
      </div>
    )
  }

  return (
    <section className='section'>
      <h2 className='section-title'>minuman</h2>
      <div className='cocktails-center'>
        {minuman.map((minum)=>{
          return <Cocktails key={minum.id} {...minum} />
        })}
      </div>
    </section>
  )
}

export default CocktailList
