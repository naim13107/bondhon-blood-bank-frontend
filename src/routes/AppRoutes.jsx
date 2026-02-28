import { Route, Routes } from "react-router-dom"; 
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Request from "../pages/Request"; 
import AddRequest from "../components/Requests/AddRequest";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RequestDetails from "../pages/RequestDetails";
import Fundraising from "../pages/Fundraising";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/Registration/ActivateAccount";
import Dashboard from "../pages/Dashboard";
import EditRequest from "../pages/EditRequest";
import AdminDashboard from "../pages/AdminDashboard";
import Donate from "../pages/Donate";

import PaymentSuccess from '../pages/PaymentSuccess'; 
import PaymentFail from '../pages/PaymentFail';       
import TransactionHistory from '../pages/TransactionHistory';
import PaymentCancel from "../pages/PaymentCancel";
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="requests" element={<Request />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/fundraising" element={<Fundraising />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="requests/:id" element={<RequestDetails />} />

        <Route
          path="add-request"
          element={
            <PrivateRoute>
              <AddRequest />
            </PrivateRoute>
          }
        />

        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />

        <Route 
        path="/edit-request/:id" 
        element={
        <PrivateRoute>
          <EditRequest />
          </PrivateRoute>
        } 
        />
        
        <Route 
        path="/admin" 
        element={
        <PrivateRoute>
          <AdminDashboard />
          </PrivateRoute>
        } 
        />

        <Route 
          path="/donate" 
          element={
          <PrivateRoute>
          <Donate />
          </PrivateRoute>
          } 
          />

        <Route path="dashboard/payment/success" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
        <Route path="dashboard/payment/fail" element={<PrivateRoute><PaymentFail /></PrivateRoute>} />
        <Route path="dashboard/payment/transactions" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} /> 
        <Route path="dashboard/payment/cancel" element={<PrivateRoute><PaymentCancel/></PrivateRoute>} /> 

      </Route>
    </Routes>
  );
};

export default AppRoutes;


