import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider, useNavigate} from "react-router-dom"
import ExecutionPage from './pages/ExecutionPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProblemCreating from './pages/ProblemCreating.jsx'
import AuthProvider, { useAuthProvider } from './Context/ContextProvider.jsx'
import ExecutionProvider from './Context/ExecutionProvider.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProblemPage from './pages/ProblemPage.jsx'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/Home.jsx'
import ProblemContextProvider from './Context/ProblemListContext.jsx'
import IndivisualProblem from './pages/IndivisualProblem.jsx'

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
        path:"/dashboard/:username/:problemId",
        element:<IndivisualProblem/>
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
        <ProblemContextProvider>
          <div className='max-w-[1920px] mx-auto'>
          <RouterProvider router={router}>
          </RouterProvider>
          </div>
        </ProblemContextProvider>
      </ExecutionProvider>
    </AuthProvider>
  </StrictMode>,
)
