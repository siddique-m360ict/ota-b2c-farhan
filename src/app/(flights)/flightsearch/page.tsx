import { Suspense } from 'react';


const Home = async ({ params, searchParams }: any) => {
  return (
    <section className='pt-14'>
      <Suspense
        fallback={<>loading.....................</>}
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
