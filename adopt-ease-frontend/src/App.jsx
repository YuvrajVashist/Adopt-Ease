import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Listings from './pages/Listings.jsx';
import ListingDetails from './pages/ListingDetails.jsx';
import NewListing from './pages/NewListing.jsx';
import EditListing from './pages/EditListing.jsx';
import MyListings from './pages/MyListings.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import NewApplication from './pages/NewApplication.jsx';
import MyApplications from './pages/MyApplications.jsx';
import ReceivedApplications from './pages/ReceivedApplications.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="listings" element={<Listings />} />
        <Route path="listings/:id" element={<ListingDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="listings/new" element={<NewListing />} />
          <Route path="listings/:id/edit" element={<EditListing />} />
          <Route path="listings/my-listings" element={<MyListings />} />
          <Route path="adoptions/new/:petId" element={<NewApplication />} />
          <Route path="adoptions/my-applications" element={<MyApplications />} />
          <Route path="adoptions/received" element={<ReceivedApplications />} />
        </Route>

        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
