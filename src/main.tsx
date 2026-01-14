import "./styles/index.scss"

import { StrictMode, lazy } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"

const CountDown = lazy(() => import("./pages/countdowns/CountDown"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<CountDown />}/>
  )
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
