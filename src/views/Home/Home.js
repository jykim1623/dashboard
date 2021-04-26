import { lazy, Suspense } from "react";

const LoadData = lazy(() => import("./LoadData"));

function Home() {
  return (
    <Suspense fallback={<h1>Loading data...</h1>}>
      <LoadData />
      <LoadData />
      <LoadData />
      <LoadData />
    </Suspense>
  );
}
export default Home;
