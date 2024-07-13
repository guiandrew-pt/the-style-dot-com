import Categories from '../../components/categories/categories.component';

import categories from '../../data/categories';

const Home = () => {
  return <Categories categories={categories} />
};

export default Home;