import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import ExecutionPage from './pages/ExecutionPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProblemCreating from './pages/ProblemCreating.jsx'
import AuthProvider from './Context/ContextProvider.jsx'
import CreateProblemContextProvider from './Context/CreateProblemContext.jsx'
import ExecutionProvider from './Context/ExecutionProvider.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProblemPage from './pages/ProblemPage.jsx'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"/dashboard/:id",
        element:<Dashboard/>
      },
      
      {
        path:"/all-problem",
        element:<ProblemPage/>
      }
    ]
    
  },
  {
    path:"/execution/:id",
    element:<ExecutionPage/>
  },
  {
    path:"/problem-create",
    element:<ProblemCreating/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/signup",
    element:<LoginPage/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ExecutionProvider>
        <CreateProblemContextProvider>
          <div className='max-w-[1920px] mx-auto'>
          <RouterProvider router={router}>
          </RouterProvider>
          </div>
        </CreateProblemContextProvider>
      </ExecutionProvider>
    </AuthProvider>
  </StrictMode>,
)
