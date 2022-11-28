import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading,setLoading] = useState(false);
  const [detailMinuman,setDetailMinuman] = useState(null)

  const getDetailMinuman = async () =>{ 
    setLoading(true)
    try {
       const response = await fetch(`${url}${id}`)
       const data = await response.json()
       console.log(data)
       if(data.drinks){
        const {
          strDrink:name,
          strAlcoholic:info,
          strDrinkThumb:image,
          strGlass:glass,
          strCategory:category,
          strInstructions: instruction,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = data.drinks[0]
        console.log(name)
        
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ]

        const newMinuman = {
          name,info,image,glass,category,instruction,ingredients
        }
        setDetailMinuman(newMinuman);
        console.log(newMinuman)
       }
       else{
        setDetailMinuman(null);
       }
       setLoading(false)
      } catch (error) {
        console.log(error.response)
        setLoading(false)
    }
  }

  useEffect(()=>{
    getDetailMinuman()
  },[id])

  if(loading){
    return <Loading />
  }

  if(!detailMinuman){
    return (
        <h2 className='section-title'>Tidak ada lebih detail tentang minuman</h2>
    )
  } 
  else{
    const {
          name,info,image,glass,category,instruction,ingredients
        } = detailMinuman;
        return (
    <section className='section cocktail-section'>
      <Link to={'/'} className="btn btn-primary">Back Home</Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <div className='cocktail'>
          <img src={image} alt={name}/>
          <div className='drink-info'>
            <p>
              <span className='drink-data'>name :</span>
              {name}
            </p>
            <p>
              <span className='drink-data'>category :</span>
              {category}
            </p>
            <p>
              <span className='drink-data'>info :</span>
              {info}
            </p>
            <p>
              <span className='drink-data'>glass :</span>
              {glass}
            </p>
            <p>
              <span className='drink-data'>instructions :</span>
              {instruction}
            </p>
            <p>
              <span className='drink-data'>ingredients :</span>
              {ingredients.map((test,index)=>{
                return test ? <span key={index}>{test},</span> : null
              })}
            </p>
          </div>
        </div>
      </div>
    </section>

  )
  }
}

export default SingleCocktail
