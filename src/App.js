import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Content from "./layout/Content";
import Header from "./layout/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="container-fluid">
          <Header />
          <Content />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
