import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  
  const [items, setItems] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/products')
    .then(response => {
      
      console.log(response.data)
      setItems(response.data)
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
 }, [])

  return (
    <>
      <div>
      <h1>
        E-Commerce Store
      </h1>
      <div className="items-container">

        <img src="https://www.gokite.travel/wp-content/uploads/2025/02/4.-Essential-Tips-for-Visiting-IMG-Indoor-Theme-Park.webp" alt="" width={100} />
        <h1>sample product</h1>
       </div>
       {items.map(item => (
        <div key={item.id} className="items-container">
          <img src={item.image} alt={item.title} width={100} />
          <h1>{item.title}</h1>
          <h2>${item.price}</h2>
        </div>
       ))}
      </div>
    </>
  )
}

export default App
