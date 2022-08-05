import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/users";
import Post from "./components/post";
import DefaultLayout from "./layouts/defaultLayout";
import Home from "./components/home";
import Category from "./components/category";
import Reward from "./components/reward";
import Settings from "./components/settings";
import UsersDetail from "./components/usersDetail";
import UsersForm from "./components/userForm";
import PersistLogin from "./components/PersistLogin";
import Login from "./Login";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<p>Page Not Found 404</p>} />
        <Route
          path="/settings"
          element={
            <DefaultLayout>
              <Settings />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        ></Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth  />}>
            <Route
              path="/users"
              element={
                <DefaultLayout>
                  <Users />
                </DefaultLayout>
              }
            ></Route>
            <Route
              path="/userForm"
              element={
                <DefaultLayout>
                  <UsersForm />
                </DefaultLayout>
              }
            />
            <Route
              path="/users/:id"
              element={
                <DefaultLayout>
                  <UsersDetail />
                </DefaultLayout>
              }
            ></Route>
          </Route>
          <Route element={<RequireAuth  />}>
            <Route
              path="/post"
              element={
                <DefaultLayout>
                  <Post />
                </DefaultLayout>
              }
            ></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route
              path="/category"
              element={
                <DefaultLayout>
                  <Category />
                </DefaultLayout>
              }
            ></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route
              path="/reward"
              element={
                <DefaultLayout>
                  <Reward />
                </DefaultLayout>
              }
            ></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
