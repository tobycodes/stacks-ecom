import { ToastProvider, ColorModeProvider, ModalProvider } from "@stacks/ui";
import { BrowserRouter as Router } from "react-router-dom";

import { CartProvider } from "./context/Cart";

import AppRoutes from "./pages/route";

function App() {
  return (
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
  );
}

export default App;
