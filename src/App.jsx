//import RecipeList from './components/RecipeList'
import Homepage from './components/Homepage'
import Categorypage from './components/Categorypage'
import './App.css'
import Bullarpage from './components/Categorypages/Bullarpage'
import Julgodispage from './components/Categorypages/Julgodispage'
import Kakorpage from './components/Categorypages/Kakorpage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipePage from './components/RecipePage'
import PageNotFound from './components/PageNotFound'

function App() {
  return (
    //<RecipePage/>
    //<Homepage/>
    //<Categorypage/>
    //<Bullarpage/>
    //<Julgodispage/> 
    //<Kakorpage/>

    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/categories' element={<Categorypage />} />
        <Route path='/categories/bullar' element={<Bullarpage />} />
        <Route path='/categories/julgodis' element={<Julgodispage />} />
        <Route path='/categories/kakor' element={<Kakorpage />} />
        <Route path='/recipe/:_id' element={<RecipePage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
