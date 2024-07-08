import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import Slide from '../components/Slide';
import Listings from '../components/Listings';
import Blog from '../components/Blog';

const Home = () => {

  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
      <Blog />
    </>
  )
}

export default Home