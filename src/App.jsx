import { useRoutes } from 'react-router-dom'
import { routes } from './Route'


function App() {
  const element = useRoutes(routes)

  return element
}

export default App
