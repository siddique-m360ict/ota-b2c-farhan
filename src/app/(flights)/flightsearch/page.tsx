import { Suspense } from 'react';

import ProductSkeleton from '@/components/skeletons/ProductSkeleton';
import { getAllFlights } from '../../actions';

const Home = async ({ params, searchParams }: any) => {
  console.log(searchParams);

  return <section className='pt-14'>hellol</section>;
};

export default Home;
