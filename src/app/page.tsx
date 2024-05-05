import { Suspense } from 'react';

import { getAllFlights } from './actions';
import ProductSkeleton from '@/components/skeletons/ProductSkeleton';

const Home = async ({ params, searchParams }: any) => {
  return (
    <section className='pt-14'>
      <Suspense
        fallback={<ProductSkeleton extraClassname='' numberProducts={18} />}
      >
        <AllProducts searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

const AllProducts = async ({ searchParams }: any) => {
  return <div>{searchParams?.departuredate || 'Hello!'}</div>;
};

export default Home;
