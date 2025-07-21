import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Clients, Home, Sales, NotFound, CreateUser } from "./pages";
import { MainLayout, PrivateRouter } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route
            path="/"
            element={
              <PrivateRouter>
                <MainLayout />
              </PrivateRouter>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}

export default App;
