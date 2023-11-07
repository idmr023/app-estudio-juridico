import GlobalStyle from './GlobalStyle';
import React, { useContext} from 'react';
import { Route, Routes } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {Menu} from './componentes/Menu';
import Footer from './componentes/Footer';
import { CounterContext } from "./pages/delivery/Context";
import { MenuContext } from './contexts/MenuContext/MenuContext';

function App() {
  const {
    rutas,
  } = useContext(MenuContext)

  const counterData = useContext(CounterContext);
  // const [ products ] = useState(initialProducts)
  // const [filters, setFilters] = useState({  
  //   category: 'all',
  //   minPrice: 0
  // })
  library.add(faArrowUp);

  // const filterProducts = (products) => {
  //   return products.filter( product => {
  //     return (
  //       product.price >= filters.minPrice &&
  //       (
  //         filters.category == 'all' ||
  //         product.category == filters.category
  //       )
  //     )
  //  })
  // }

  // const filteredProducts = filterProducts(products)
  
  return (
    <>
            <GlobalStyle />
              <Menu />
 
              <Routes>
                {rutas.map((ruta) => (
                  <Route key={ruta.key} path={ruta.path} element={ruta.element} />
                ))}
              </Routes>
            <Footer />
    </>
  );

}

export default App;