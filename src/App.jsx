import './App.css'
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Footer from './components/Layout/Footer/Footer'
import Header from './components/Layout/Header/Header'
import ThemeProvider from './components/context/Theme/ThemeProvider';
import ErrorBoundary from "./components/Error Boundary/ErrorBoundary";
import CMSShimmer from "./components/UI/Shimmer/CMSShimmer";
const HomePage = lazy(() => import("./components/Pages/Home/HomePage"));
const AuthPage = lazy(() => import("./components/Pages/Auth/AuthPage"));
const Dashboard = lazy(() => import("./components/Pages/Dashboard/Dashboard"));
const RouteManagement = lazy(() => import("./components/Pages/Route Management/RouteManagement"));
const PageManagement = lazy(() => import("./components/Pages/Page Management/PageManagement"));
const UserManagement = lazy(() => import("./components/Pages/User Management/UserManagement"));
const PageSections = lazy(() => import("./components/Pages/Page Sections/PageSections"));
const NavigationControl = lazy(() => import("./components/Pages/Navigation Control/NavigationControl"));
const ContentManagement = lazy(() => import("./components/Pages/Content Management/ContentManagement"));
const TotalOrders = lazy(() => import("./components/Pages/Total Orders/TotalOrders"));
const TotalWishlist = lazy(() => import("./components/Pages/Total Wishlist/TotalWishlist"));
const TotalCompare = lazy(() => import("./components/Pages/Total Compare/TotalCompare"));
const Settings = lazy(() => import("./components/Pages/Settings/Settings"));

function App() {

  return (
    <>
      <ErrorBoundary>
        <ThemeProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              // Default options
              duration: 4000,
              style: {
                borderRadius: '12px',
                padding: '16px 24px',
                fontSize: '16px',
                color: '#fff',
              },
              success: {
                style: {
                  background: 'linear-gradient(to right, #4ade80, #16a34a)',
                  color: '#fff',
                },
                iconTheme: {
                  primary: '#16a34a',
                  secondary: '#fff',
                },
              },
              error: {
                style: {
                  background: 'linear-gradient(to right, #f87171, #b91c1c)',
                  color: '#fff',
                },
                iconTheme: {
                  primary: '#b91c1c',
                  secondary: '#fff',
                },
              },
              loading: {
                style: {
                  background: '#facc15',
                  color: '#000',
                },
              },
              successIcon: '✅',
              errorIcon: '❌',
              loadingIcon: '⏳',
            }}
          />
          {/* Header Component */}
          <Header />
          <main className="main-section dark:bg-slate-700">
            <Suspense fallback={<CMSShimmer />}>
              <Routes>
                <Route path="/" element={<Navigate to="/auth" replace />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path='/home' element={<HomePage />}>
                  <Route index element={<Dashboard />} />
                  <Route path='route-management' element={<RouteManagement />} />
                  <Route path='page-management' element={<PageManagement />} />
                  <Route path="user-management" element={<UserManagement />} />
                  <Route path='page-sections' element={<PageSections />} />
                  <Route path="navigation-control" element={<NavigationControl />} />
                  <Route path="content-management" element={<ContentManagement />} />
                  <Route path="total-orders" element={<TotalOrders />} />
                  <Route path="total-wishlist" element={<TotalWishlist />} />
                  <Route path="total-compare" element={<TotalCompare />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </Suspense>
          </main>
          {/* Footer Component */}
          <Footer />
        </ThemeProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
