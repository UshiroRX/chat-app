import { ChatLayout } from "../../modules/layout/ui/chat-page";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatLayout></ChatLayout>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
