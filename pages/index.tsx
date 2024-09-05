import Header from "@/components/Header";
import Form from "@/components/Form/Form";
import PostFeed from "@/components/Posts/PostFeed";
const Home = () => {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's Happening ?" />
      <PostFeed />
    </>
  );
};

export default Home;
