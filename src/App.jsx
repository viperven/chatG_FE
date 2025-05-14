import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import Signup from "./components/pages/Signup";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store";
import ChatPage from "./components/pages/ChatPage";
import ConversationById from "./components/pages/ConversationById";
import Test from "./Test";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/conversation/:friendId" element={<ConversationById />} />
            <Route path="/test" element={<Test/>} />
            <Route path="*" element={<h1>no page found</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
