import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'
import { queryClient } from './providers/query'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './providers/cart'
import Layout from './components/Layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <Layout>
            <App />
          </Layout>
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
