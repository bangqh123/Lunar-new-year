import "./styles/index.scss"

import { StrictMode, lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

const CountDown = lazy(() => import("./pages/countdowns/CountDown"))
const Firework = lazy(() => import("./pages/fireworks/Firework"))
const WishPage = lazy(() => import("./pages/wishs/WishPage"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <Suspense fallback={null}>
            <CountDown />
          </Suspense>
        }
      />
      <Route
        path="/fireworks"
        element={
          <Suspense fallback={null}>
            <Firework />
          </Suspense>
        }
      />
      <Route
        path="/wishs"
        element={
          <Suspense fallback={null}>
            <WishPage />
          </Suspense>
        }
      />
    </>
  )
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
