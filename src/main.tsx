import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "~/assets/styles/global.styles.scss"
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Bounce, ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </BrowserRouter>
    </AuthProvider>


  </StrictMode>,
)
