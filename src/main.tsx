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
const TestPage = lazy(() => import("./pages/countdowns/background/BackGround"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<CountDown />} />
      <Route path="/test" element={<TestPage />} />
    </>
  )
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
