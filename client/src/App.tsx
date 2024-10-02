import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import MySnippetsPage from "./pages/MySnippetsPage";
import SignupPage from "./pages/SignUpPage";
import { UseAuthContext } from "./context/AuthContext";
import SnippetDetailPage from "./pages/SnippetDetailPage";

function App() {
  const { user, userLoading } = UseAuthContext();

  if (userLoading) {
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Layout>
                <Home></Home>
              </Layout>
            ) : (
              <Navigate to={"/signup"}></Navigate>
            )
          }
        ></Route>
        <Route
          path="/:id"
          element={
            user ? (
              <Layout>
                <SnippetDetailPage></SnippetDetailPage>
              </Layout>
            ) : (
              <Navigate to={"/signup"}></Navigate>
            )
          }
        ></Route>
        <Route
          path="/my-snippets"
          element={
            user ? (
              <Layout>
                <MySnippetsPage></MySnippetsPage>
              </Layout>
            ) : (
              <Navigate to={"/signup"}></Navigate>
            )
          }
        ></Route>
        <Route path="/signup" element={user ? <Navigate to={"/"}></Navigate> : <SignupPage></SignupPage>}></Route>'
      </Routes>
    </BrowserRouter>
  );
}

export default App;
