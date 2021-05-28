import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./user/FontAwesomeIcons";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import LandingPage from "./core/LandingPage";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Orders from "./admin/Orders";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import AdminFAQ from "./admin/AdminFAQ";
import userFAQ from "./user/userFAQ";
import userFeedback from "./user/userFeedback";
import adminFeedback from "./admin/adminFeedback";
import ForgotPassword from "./user/ForgotPassword";
import AdminUpdateFeedback from "./admin/AdminUpdateFeedback";
import UserUpdateFeedback from "./user/UserUpdateFeedback";
import SignupAdmin from "./user/SignupAdmin";
import UpdateBackground from "./admin/UpdateBackground";
import UpdateAboutUs from "./admin/UpdateAboutUs";
import UpdateCategory from "./admin/UpdateCategory"
import UpdateCollection from "./admin/UpdateCollection"
import orderTracker from "./core/orderTracker";
import Lookbook from "./core/Lookbook";
import AddCollection from "./admin/AddCollection";
import Collection from "./core/Collection";
import ResetPasswordEmail from "./user/ResetPasswordEmail";
import Collections from "./core/Collections"
import ManageCategories from "./admin/ManageCategories"
import ManageCollections from "./admin/ManageCollections"
import Cart2 from "./core/Cart2"
import landingpageadmin from "./core/landingpageadmin";
import AdminCollections from "./admin/AdminCollections";
import AdminCollection from "./admin/AdminCollection";
import SearchPage from "./core/SearchPage";
import feedback from "./user/feedback";
import HomeNew from "./core/HomeNew";
import HomeBest from "./core/HomeBest";
import FAQbuttonAdmin from "./user/FAQbuttonAdmin";
import SearchPageAdmin from "./core/SearchPageAdmin";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/home" exact component={Home} />
				<Route path="/homenew" exact component={HomeNew}/>
				<Route path="/homebest" exact component={HomeBest} />
				<Route path="/shop" exact component={Shop} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/feedback" exact component={feedback} />
				<Route
					path="/signup/admin/SecretAdminSignup"
					exact
					component={SignupAdmin}
				/>
				<Route path="/forgot" exact component={ForgotPassword} />
				<Route path="/forgot/reset/:token" exact component={ResetPasswordEmail} />
				<Route path="/product/:productId" exact component={Product} />
				<Route path="/collection/:collectionId/:mode" exact component = {Collection} />
				<Route path="/ordertracker" exact component={orderTracker} />
				<Route path="/lookbook" exact component={Lookbook} />
				<Route path="/collections" exact component={Collections} />
				<Route path="/SearchPage" exact component={SearchPage}/>
				<Route path="/SearchPageAdmin" exact component={SearchPageAdmin}/>
				<PrivateRoute
					path="/user/dashboard"
					exact
					component={Dashboard}
				/>
				<PrivateRoute
					path="/user/userFeedback/:userId/:feedbackId"
					exact
					component={UserUpdateFeedback}
				/>
				<AdminRoute
					path="/admin/adminFeedback/:feedbackId"
					exact
					component={AdminUpdateFeedback}
				/>
					<AdminRoute
					path="/admin/landingpageadmin"
					exact
					component={landingpageadmin}
				/>
					<AdminRoute
					path="/admin/FAQbuttonAdmin"
					exact
					component={FAQbuttonAdmin}
				/>	
				
				<AdminRoute
					path="/admin/dashboard"
					exact
					component={AdminDashboard}
				/>
				<AdminRoute
					path="/create/category"
					exact
					component={AddCategory}
				/>
				<AdminRoute
					path="/create/product"
					exact
					component={AddProduct}
				/>
				<AdminRoute
					path="/create/collection"
					exact
					component={AddCollection}
				/>
				<AdminRoute path="/admin/orders" exact component={Orders} />
				<PrivateRoute path="/cart" exact component={Cart} />
				<PrivateRoute path="/cart2" exact component={Cart2} />
				<Route path="/user/userFAQ" exact component={userFAQ} />
				<AdminRoute path="/admin/AdminFAQ" exact component={AdminFAQ} />
				<Route
					path="/feedback/submit/:feedbackToken"
					exact
					component={userFeedback}
				/>
				<AdminRoute
					path="/admin/adminFeedback"
					exact
					component={adminFeedback}
				/>
				<PrivateRoute
					path="/profile/:userId"
					exact
					component={Profile}
				/>
				<AdminRoute
					path="/admin/products"
					exact
					component={ManageProducts}
				/>
				<AdminRoute
					path="/admin/product/update/:productId"
					exact
					component={UpdateProduct}
				/>
				<AdminRoute
					path="/admin/category/update/:categoryId"
					exact
					component={UpdateCategory}
				/>
				<AdminRoute
					path="/admin/collection/update/:collectionId"
					exact
					component={UpdateCollection}
				/>
				<AdminRoute
					path="/admin/updateBackground"
					exact
					component={UpdateBackground}
				/>
				<AdminRoute
					path="/admin/UpdateAboutUs"
					exact
					component={UpdateAboutUs}
				/>
				<AdminRoute
					path="/admin/categories"
					exact
					component={ManageCategories}
				/>
				<AdminRoute
					path="/admin/collections"
					exact
					component={ManageCollections}
				/>
				<AdminRoute
					path="/admin/admincollections"
					exact component = {AdminCollections} 
				/>
				<AdminRoute
					path="/admincollection/:collectionId/:mode" 
					exact component = {AdminCollection} 
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
