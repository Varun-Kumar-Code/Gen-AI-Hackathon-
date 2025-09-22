import { Switch, Route } from "wouter";
import { AuthenticatedRoute, UnauthenticatedRoute } from "@/components/ProtectedRoute";
import { useThemeEffect } from "@/hooks/use-theme-effect";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Favorites from "@/pages/favorites";
import Categories from "@/pages/categories";
import Cart from "@/pages/cart";
import UserProfile from "@/pages/user";
import Product from "@/pages/product";
import Order from "@/pages/order";
import Payment from "@/pages/payment";
import Explore from "@/pages/explore";
import JharkhandMonuments from "@/pages/jharkhand-monuments";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/signup";

function Router() {
  // Apply theme globally
  useThemeEffect();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login">
        <UnauthenticatedRoute>
          <LoginPage />
        </UnauthenticatedRoute>
      </Route>
      <Route path="/signup">
        <UnauthenticatedRoute>
          <SignUpPage />
        </UnauthenticatedRoute>
      </Route>
      <Route path="/favorites">
        <AuthenticatedRoute>
          <Favorites />
        </AuthenticatedRoute>
      </Route>
      <Route path="/categories" component={Categories} />
      <Route path="/cart">
        <AuthenticatedRoute>
          <Cart />
        </AuthenticatedRoute>
      </Route>
      <Route path="/user">
        <AuthenticatedRoute>
          <UserProfile />
        </AuthenticatedRoute>
      </Route>
      <Route path="/product/:id" component={Product} />
      <Route path="/order/:id">
        <AuthenticatedRoute>
          <Order />
        </AuthenticatedRoute>
      </Route>
      <Route path="/payment">
        <AuthenticatedRoute>
          <Payment />
        </AuthenticatedRoute>
      </Route>
      <Route path="/explore" component={Explore} />
      <Route path="/jharkhand-monuments" component={JharkhandMonuments} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;
