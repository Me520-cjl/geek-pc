// 导入路由
import { useRoutes } from 'react-router-dom'

// 导入页面组件
import Login from './pages/Login'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'

const routes = [
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

// 配置路由规则
function App() {
  const element = useRoutes(routes)
  return (
      <div className="App">
				{element}
      </div>
  )
}

export default App