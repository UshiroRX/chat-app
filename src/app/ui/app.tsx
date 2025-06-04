import "./app.css";
import { ChatPage } from "../../pages/chat-page";
import { BrowserRouter, Route, Routes }  from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage></ChatPage>} ></Route>
      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
