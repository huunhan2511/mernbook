import PropTypes from "prop-types";
import React, { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";


// home pages
const HomeBookStore = lazy(() => import("./pages/home/HomeBookStore"));
// shop pages
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
// product pages
const ProductTabLeft = lazy(() => import("./pages/shop-product/ProductTabLeft"));
// other pages
const Cart = lazy(() => import("./pages/other/Cart"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const About = lazy(() => import("./pages/other/About"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const Contact = lazy(() => import("./pages/other/Contact"));
const ForgotPassword = lazy(()=>import("./pages/other/ForgotPassword"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = props => {
  

return (
  <ToastProvider placement="bottom-left">
    <BreadcrumbsProvider>
      <Router>
        <ScrollToTop>
          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Switch>

              {/* Homepages */}
              <Route
                exact
                path={process.env.PUBLIC_URL + "/"}
                component={HomeBookStore}
              />
              {/* Shop pages */}
                
              <Route
                path={process.env.PUBLIC_URL + "/products"}
                component={ShopGridFullWidth}
              />
              {/* Shop product pages */}
              <Route
                path={process.env.PUBLIC_URL + "/product/:id"}
                render={routeProps => (
                  <ProductTabLeft {...routeProps} key={routeProps.match.params.id}/>
                )}
              />
              {/* Other pages */}
              <Route
                path={process.env.PUBLIC_URL + "/about"}
                component={About}
              />
              <Route
                path={process.env.PUBLIC_URL + "/cart"}
                component={Cart}
              />
              <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />
                
              <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
              />
              <Route
                path={process.env.PUBLIC_URL + "/checkout"}
                component={Checkout}
              />
              <Route
                path={process.env.PUBLIC_URL + "/contact"}
                component={Contact}
              />
              <Route
                  path={process.env.PUBLIC_URL + "/forgotpassword"}
                  component={ForgotPassword}
                />
              <Route
                path={process.env.PUBLIC_URL + "/not-found"}
                component={NotFound}
              />

              <Route exact component={NotFound} />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Router>
    </BreadcrumbsProvider>
  </ToastProvider>
);
};

App.propTypes = {
dispatch: PropTypes.func
};

export default connect()(App);
