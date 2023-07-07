import Featured from './featured/Featured';
import FeaturedProperties from './featuredProperties/FeaturedProperties';
import PropertyList from './propertyList/PropertyList';
import SearchForm from './SearchForm';

import classes from './Home.module.css';
import Card from '../../UI/Card';

const Home = () => {
  return (
    <div>
      <SearchForm />
      <Card className={classes.homeContainer}>
        <Featured />
        <h1 className='larger'>Browse by property type</h1>
        <PropertyList />
        <h1 className='larger'>Homes guests love</h1>
        <FeaturedProperties />
      </Card>
    </div>
  );
};

export default Home;
