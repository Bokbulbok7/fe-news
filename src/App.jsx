import "./App.css";
import { ArticleContainer } from "./Components/Articles/ArticleContainer";
import { TopicContainer } from "./Components/Topics/TopicContainer";
import { Profile } from "./Components/Users/Profile";
import { Homepage } from "./Components/Homepage";
import { Header } from "./Components/Header";
import { NavBar } from "./Components/Navbar";
import { Route, Routes } from "react-router";
import { ArticlePage } from "./Components/Articles/ArticlePage";
import Error from "./Error";

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
        <Route path="/topics/:topic" element={<ArticleContainer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error message="Route not found." />} />
      </Routes>
    </>
  );
}

export default App;
