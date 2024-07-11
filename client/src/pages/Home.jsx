import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import Slide from '../components/Slide';
import Listings from '../components/Listings';
import Footer from '../components/Footer';
import Post from '../components/Post';

const Home = () => {

  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
      <Post />
      <Footer />
    </>
  )
}

export default Home