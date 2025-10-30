import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import AuthProvider, { useAuth } from './contexts/AuthContext';
import Hero from './components/Hero';
import Features from './components/Features';
import EventPreview from './components/EventPreview';
import InTheSpotlight from './components/InTheSpotlight';
import Footer from './components/Footer';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import EventForm from './components/EventForm';
import RegistrationForm from './components/RegistrationForm';
import About from './components/About';
import Contact from './components/Contact';
import Products from './components/Products';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import PlanningSoftware from './components/PlanningSoftware';
import SchedulingTools from './components/SchedulingTools';
import BudgetManagement from './components/BudgetManagement';
import TeamCollaboration from './components/TeamCollaboration';
import Newsletter from './components/Newsletter';
import Careers from './components/Careers';
import CareersOverview from './components/CareersOverview';
import CareersOpenPositions from './components/CareersOpenPositions';
import CareersCulture from './components/CareersCulture';
import CareersBenefits from './components/CareersBenefits';
import CareersInclusion from './components/CareersInclusion';
import CareersEventPlanning from './components/CareersEventPlanning';
import CareersMarketing from './components/CareersMarketing';
import CareersEngineering from './components/CareersEngineering';
import CareersAdministration from './components/CareersAdministration';
import CareersInterviewing from './components/CareersInterviewing';
import CareersInternships from './components/CareersInternships';
import JobApplication from './components/JobApplication';
import OurTeams from './components/OurTeams';
import AwardsRecognition from './components/AwardsRecognition';
import SecurityTrust from './components/SecurityTrust';
import VenueLogistics from './components/VenueLogistics';
import VenueBooking from './components/VenueBooking';
import LogisticsManagement from './components/LogisticsManagement';
import VendorCoordination from './components/VendorCoordination';
import OnlineTicketing from './components/OnlineTicketing';
import RegistrationForms from './components/RegistrationForms';
import PaymentProcess from './components/PaymentProcess';
import AttendanceTracking from './components/AttendanceTracking';
import TicketingOverview from './components/TicketingOverview';
import FeedbackSurvey from './components/FeedbackSurvey';
import Feedback from './components/Feedback';
//user
import SignUp from './components/SignUp';
import Login from './components/Login';
//admin
import AdminLogin from './components/AdminLogin';
import AdminSignUp from './components/AdminSignUp';
import AdminDashboard from './components/AdminDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
//speaker
import SpeakerLogin from './components/SpeakerLogin';
import SpeakerSignUp from './components/SpeakerSignUp';
import SpeakerDashboard from './components/SpeakerDashboard';
import SpeakerProfile from './components/SpeakerProfile';
import SpeakerUpcomingTalks from './components/SpeakerUpcomingTalks';
import SpeakerPastEvents from './components/SpeakerPastEvents';
import SpeakerSettings from './components/SpeakerSettings';
import ProtectedSpeakerRoute from './components/ProtectedSpeakerRoute';

import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Tickets from './components/Tickets';
import Recents from './components/Recents';
import Settings from './components/Settings';
import AdminUserEdit from './components/AdminUserEdit';
import AdminUserManagement from './components/AdminUserManagement';
import AdminEvents from './components/AdminEvents';
import AdminEventEdit from './components/AdminEventEdit';
import AdminTickets from './components/AdminTickets';
import AdminAnalytics from './components/AdminAnalytics';
import AdminSettings from './components/AdminSettings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [location]);

  useEffect(() => {
    const toggleFeedbackHandler = (e) => {
      setShowFeedback(e.detail);
    };
    window.addEventListener('toggleFeedback', toggleFeedbackHandler);
    return () => {
      window.removeEventListener('toggleFeedback', toggleFeedbackHandler);
    };
  }, []);

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <EventPreview />
              <InTheSpotlight />
            </>
          } />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/register" element={<RegistrationForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/planning-software" element={<PlanningSoftware />} />
          <Route path="/products/scheduling-tools" element={<SchedulingTools />} />
          <Route path="/products/budget-management" element={<BudgetManagement />} />
          <Route path="/products/team-collaboration" element={<TeamCollaboration />} />
          <Route path="/products/venue-logistics" element={<VenueLogistics />} />
          <Route path="/products/venue-booking" element={<VenueBooking />} />
          <Route path="/products/logistics-management" element={<LogisticsManagement />} />
          <Route path="/products/vendor-coordination" element={<VendorCoordination />} />
          <Route path="/ticketing">
            <Route index element={<TicketingOverview />} />
            <Route path="online" element={<OnlineTicketing />} />
            <Route path="registration" element={<RegistrationForms />} />
            <Route path="payment" element={<PaymentProcess />} />
            <Route path="attendance" element={<AttendanceTracking />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/about/who-we-are" element={<About />} />
          <Route path="/about/our-teams" element={<OurTeams />} />
          <Route path="/about/awardsrecognition" element={<AwardsRecognition />} />
          <Route path="/about/security-trust" element={<SecurityTrust />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/careers" element={<Careers />}>
            <Route index path="overview" element={<CareersOverview />} />
            <Route path="open-positions" element={<CareersOpenPositions />} />
            <Route path="culture" element={<CareersCulture />} />
            <Route path="benefits" element={<CareersBenefits />} />
            <Route path="inclusion" element={<CareersInclusion />} />
            <Route path="event-planning" element={<CareersEventPlanning />} />
            <Route path="marketing" element={<CareersMarketing />} />
            <Route path="engineering" element={<CareersEngineering />} />
            <Route path="administration" element={<CareersAdministration />} />
            <Route path="interviewing" element={<CareersInterviewing />} />
            <Route path="internships" element={<CareersInternships />} />
          </Route>
          <Route path="/careers/apply/:id" element={<JobApplication />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUserManagement /></ProtectedAdminRoute>} />
          <Route path="/admin/users/:id/edit" element={<ProtectedAdminRoute><AdminUserEdit /></ProtectedAdminRoute>} />
          <Route path="/admin/events" element={<ProtectedAdminRoute><AdminEvents /></ProtectedAdminRoute>} />
          <Route path="/admin/events/:id/edit" element={<ProtectedAdminRoute><AdminEventEdit /></ProtectedAdminRoute>} />
          <Route path="/admin/tickets" element={<ProtectedAdminRoute><AdminTickets /></ProtectedAdminRoute>} />
          <Route path="/admin/analytics" element={<ProtectedAdminRoute><AdminAnalytics /></ProtectedAdminRoute>} />
          <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>} />
          <Route path="/speaker/login" element={<SpeakerLogin />} />
          <Route path="/speaker/signup" element={<SpeakerSignUp />} />
          <Route path="/speaker/dashboard" element={<ProtectedSpeakerRoute><SpeakerDashboard /></ProtectedSpeakerRoute>} />
          <Route path="/speaker/profile" element={<ProtectedSpeakerRoute><SpeakerProfile /></ProtectedSpeakerRoute>} />
          <Route path="/speaker/talks" element={<ProtectedSpeakerRoute><SpeakerUpcomingTalks /></ProtectedSpeakerRoute>} />
          <Route path="/speaker/past-events" element={<ProtectedSpeakerRoute><SpeakerPastEvents /></ProtectedSpeakerRoute>} />
          <Route path="/speaker/settings" element={<ProtectedSpeakerRoute><SpeakerSettings /></ProtectedSpeakerRoute>} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/registrations" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
          <Route path="/recents" element={<ProtectedRoute><Recents /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
        {location.pathname !== '/dashboard' && location.pathname !== '/recents' && location.pathname !== '/settings' && location.pathname !== '/registrations' && location.pathname !== '/ticketing/attendance' && location.pathname !== '/profile' && location.pathname !== '/admin/events' && location.pathname !== '/admin/users' && location.pathname !== '/admin/dashboard' && location.pathname !== '/admin/profile' && location.pathname !== '/admin/tickets' && location.pathname !== '/admin/analytics' && location.pathname !== '/admin/settings' && location.pathname !== '/speaker/dashboard' && location.pathname !== '/speaker/profile' && location.pathname !== '/speaker/talks' && location.pathname !== '/speaker/past-events' && location.pathname !== '/speaker/settings' && !location.pathname.startsWith('/admin/users/') && <Feedback />}
        {showFeedback && <FeedbackSurvey onClose={handleCloseFeedback} />}
        <Footer />
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
