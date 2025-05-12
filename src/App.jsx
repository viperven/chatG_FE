import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import Signup from "./components/pages/Signup";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="*" element={<h1>no page found</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
