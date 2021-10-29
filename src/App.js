import { ToastProvider, ColorModeProvider, ModalProvider } from "@stacks/ui";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

import { CartProvider } from "context/Cart";
import AppRoutes from "pages/route";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
    <ColorModeProvider defaultMode="light">
      <ToastProvider>
        <ModalProvider>
          <Router>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </Router>
        </ModalProvider>
      </ToastProvider>
    </ColorModeProvider>
    </QueryClientProvider>
  );
}

export default App;
