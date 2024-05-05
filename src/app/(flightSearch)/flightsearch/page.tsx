import { Suspense } from 'react';
 
 

const Home = async ({ params, searchParams }: any) => {
  return (
    <section className='pt-14'>
      <Suspense
        fallback={<>Page Loading........</>}
      >
        <AllProducts searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

const AllProducts = async ({ searchParams }: any) => {
  return  <div>{searchParams?.departuredate || "Hello!"}</div>
};

export default Home;