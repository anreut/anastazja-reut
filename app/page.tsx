import { Header, PostPreview } from "../_components";
import { getAllPosts } from "./lib/api";

const Home = () => {
  const posts = getAllPosts();
  return (
    <div>
      <Header />
      <main className="main">
        <div className="main__container">
          {posts.map((post, i) => (
            <PostPreview
              key={post.title}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
