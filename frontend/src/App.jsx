import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./component/Login";
import Register from "./component/Register";
import ChatPage from "./component/ChatPage";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="*" element={<Register setToken={setToken}/>}/>
        </>
      ) : (
        <>
          <Route path="/chat" element={<ChatPage setToken={setToken} />} />
          <Route path="*" element={<ChatPage />} />
        </>
      )}
    </Routes>
  );
}
export default App;