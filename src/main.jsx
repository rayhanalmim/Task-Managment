
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Route from './Component/Root/Route.jsx'
import AuthProvider from './Authentication/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider><RouterProvider router={Route}></RouterProvider></AuthProvider>

)
