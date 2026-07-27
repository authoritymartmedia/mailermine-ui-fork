import { useEffect, type ReactNode } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { bindNavigate } from '@/shims/inertia'
import { installRouteHelper } from '@/shims/route'
import NotFound from '@/Pages/NotFound'
import * as Pages from '@/routes/pages'

installRouteHelper()

function NavigateBinder({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  useEffect(() => {
    bindNavigate(navigate)
  }, [navigate])
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <NavigateBinder>
          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/features" element={<Pages.Features />} />
            <Route path="/pricing" element={<Pages.Pricing />} />
            <Route path="/docs" element={<Pages.Docs />} />
            <Route path="/api" element={<Pages.Docs />} />
            <Route path="/sdk" element={<Pages.Docs />} />
            <Route path="/sdks" element={<Pages.Docs />} />
            <Route path="/changelog" element={<Pages.Changelog />} />
            <Route path="/blog" element={<Pages.Blog />} />
            <Route path="/blog/:slug" element={<Pages.BlogShow />} />
            <Route path="/integrations" element={<Pages.Integrations />} />
            <Route path="/about" element={<Pages.About />} />
            <Route path="/customers" element={<Pages.Customers />} />
            <Route path="/contact" element={<Pages.Contact />} />
            <Route path="/privacy" element={<Pages.Privacy />} />
            <Route path="/terms" element={<Pages.Terms />} />
            <Route path="/status" element={<Pages.Status />} />
            <Route path="/login" element={<Pages.Login />} />
            <Route path="/register" element={<Pages.Signup />} />
            <Route path="/signup" element={<Pages.Signup />} />
            <Route path="/forgot-password" element={<Pages.ForgotPassword />} />
            <Route path="/reset-password/:token" element={<Pages.ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NavigateBinder>
      </BrowserRouter>
    </ThemeProvider>
  )
}
