import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import Slide from '../components/Slide';
import Listings from '../components/Listings';
const Home = () => {

  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
    </>
  )
}

export default Home