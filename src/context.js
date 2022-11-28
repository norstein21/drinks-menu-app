import React, { useState, useContext, useEffect,useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading,setLoading] = useState(false);
  const [isSearch,setIsSearch] = useState('');
  const [minuman,setMinuman] = useState([]);

  const fetchData = useCallback(async () =>{
    setLoading(true)
    try {
      const response = await fetch(`${url}${isSearch}`)
      const data = await response.json()
      const {drinks} = data;
      if(drinks){
        const newMinuman = drinks.map((item)=>{
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass 
          } = item;
          return {
            id : idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setMinuman(newMinuman)
      } else{
        setMinuman([]);
      }
      setLoading(false)
      } catch (error) {
        console.log(error.response)
        setLoading(false)
      }
    },[isSearch])

  useEffect(()=>{
    fetchData()
  },[isSearch,fetchData])

  return <AppContext.Provider 
  value={{loading,setIsSearch,minuman}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
