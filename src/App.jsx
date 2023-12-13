import "./App.css";
import { ArticleContainer } from "./Components/Articles/ArticleContainer";
import { TopicContainer } from "./Components/TopicContainer/TopicContainer";
import { Profile } from "./Components/Users/Profile";
import { Homepage } from "./Components/Homepage";
import { Header } from "./Components/Header";
import { NavBar } from "./Components/Navbar";
import { Route, Routes } from "react-router";
import { ArticlePage } from "./Components/Articles/ArticlePage";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles" element={<ArticleContainer />} />
        <Route path="/articles/:articleId" element={<ArticlePage />} />
        <Route path="/topics" element={<TopicContainer />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
