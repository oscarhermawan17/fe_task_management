import { createBrowserRouter } from "react-router-dom"

// import ErrorPage from "../Pages/ErrorPage"
import SignInPage from "../Pages/SignInPage"
import NotFoundPage from "../Pages/NotFoundPage"
import HomePage from "../Pages/HomePage/HomePage"
import SignUpPage from "../Pages/SignUpPage"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignInPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <NotFoundPage />,
  },
  // ...protectedRoutes.map((route) => ({
  //   path: route.path,
  //   element: <ProtectedPage />,
  //   children: [
  //     {
  //       path: "",
  //       element: route.element,
  //       errorElement: <ErrorPage />,
  //     },
  //   ],
  // })),
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
