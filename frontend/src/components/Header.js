import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';
import img from '../images/plan_events_1.png';

const Header = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, logout: contextLogout } = useAuth();

  const dashboardLink = user?.role === 'admin' ? '/admin/dashboard' : 
  user?.role === 'speaker' ? '/speaker/dashboard' : '/dashboard';
  
  const dashboardText = user?.role === 'admin' ? 'Admin Dashboard' : 
  user?.role === 'speaker' ? 'Speaker Dashboard' : 'User Dashboard';

  const profileLink = user?.role === 'admin' ? '/admin/profile' : 
  user?.role === 'speaker' ? '/speaker/profile' : '/profile';

  const profileText = user?.role === 'admin' ? 'Admin Profile' : user?.role === 'speaker' ? 'Speaker Profile' : 'Profile';

  const handleLogout = () => {
    contextLogout();
    setShowProfileDropdown(false);
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery(''); // Reset query when opening
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        // Define keyword to route mappings
        const routeMappings = {
          'home': '/',
          'products': '/products',
          'events': '/events',
          'about': '/about',
          'contact': '/contact',
          'careers': '/careers/overview',
          'newsletter': '/newsletter',
          'privacy': '/privacy',
          'terms': '/terms',
          'ticketing': '/ticketing',
          'venue': '/products/venue-booking',
          'logistics': '/products/logistics-management',
          'planning': '/products/planning-software',
          'scheduling': '/products/scheduling-tools',
          'budget': '/products/budget-management',
          'team': '/products/team-collaboration',
          'vendor': '/products/vendor-coordination',
          'registration': '/ticketing/registration',
          'payment': '/ticketing/payment',
          'attendance': '/ticketing/attendance',
          'online': '/ticketing/online',
          'awards': '/about/awardsrecognition',
          'security': '/about/security-trust',
          'teams': '/about/our-teams',
          'culture': '/careers/culture',
          'benefits': '/careers/benefits',
          'inclusion': '/careers/inclusion',
          'event planning': '/careers/event-planning',
          'marketing': '/careers/marketing',
          'engineering': '/careers/engineering',
          'administration': '/careers/administration',
          'interviewing': '/careers/interviewing',
          'internships': '/careers/internships',
          'open positions': '/careers/open-positions',
          'dashboard': '/dashboard',
          'profile': '/profile',
          'settings': '/settings',
          'registrations': '/registrations',
          'recents': '/recents',
          'login': '/login',
          'signup': '/signup',
          'admin login': '/admin/login',
          'admin signup': '/admin/signup',
          'speaker login': '/speaker/login',
          'speaker signup': '/speaker/signup',
          'forgot password': '/forgot'
        };

        // Check if query matches a keyword
        if (routeMappings[query]) {
          navigate(routeMappings[query]);
        } else {
          // Fallback to event search
          navigate(`${encodeURIComponent(searchQuery.trim())}`);
        }
      }
      setShowSearch(false); // Close popup after search
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={img} alt="Logo" className="logo-img" />
        </div>
        <nav >
          <ul className="nav-list">
            <li><i className="fa fa-home"></i><Link to="/">Home</Link></li>
            <li className="dropdown">
              <i className="fa fa-cogs"></i><Link to="/products">Products</Link>
              <div className="dropdown-menu">
                <div className="dropdown-inner">
                  <div className="dropdown-section">
                    <h4>Event Planning</h4>
                    <ul className="dropdown-submenu">
                      <li>
                        <i className="fa fa-desktop"></i><Link to="/products/planning-software">Planning Software</Link>
                      </li>
                      <li>
                        <i className="fa fa-clock-o"></i><Link to="/products/scheduling-tools">Scheduling Tools</Link>
                      </li>
                      <li>
                        <i className="fa fa-money"></i><Link to="/products/budget-management">Budget Management</Link>
                      </li>
                      <li>
                        <i className="fa fa-users"></i><Link to="/products/team-collaboration">Team Collaboration</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-section">
                    <h4>Ticketing & Registration</h4>
                    <ul>
                      <li>
                        <i className="fa fa-ticket"></i><Link to="/ticketing">Ticketing Overview</Link>
                      </li>
                      <li>
                        <i className="fa fa-globe"></i><Link to="/ticketing/online">Online Ticketing</Link>
                      </li>
                      <li>
                        <i className="fa fa-file-text"></i><Link to="/ticketing/registration">Registration Forms</Link>
                      </li>
                      <li>
                        <i className="fa fa-credit-card"></i><Link to="/ticketing/payment">Payment Process</Link>
                      </li>
                      <li>
                        <i className="fa fa-check-circle"></i><Link to="/ticketing/attendance">Attendance Tracking</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-section">
                    <h4>Venue & Logistics</h4>
                    <ul>
                      <li>
                        <i className="fa fa-building"></i><Link to="/products/venue-booking">Venue Booking</Link>
                      </li>
                      <li>
                        <i className="fa fa-truck"></i><Link to="/products/logistics-management">Logistics Management</Link>
                      </li>
                      <li>
                        <i className="fa fa-handshake-o"></i><Link to="/products/vendor-coordination">Vendor Coordination</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li><i className="fa fa-calendar"></i><Link to="/events">Events</Link></li>

            <li className="dropdown">
              <i className="fa fa-info-circle"></i><Link to="/about">About</Link>
              <div className="dropdown-menu">
                <div className="dropdown-inner">
                  <div className="dropdown-section">
                    <h4>Company</h4>
                    <ul>
                      <li><i className="fa fa-users"></i><Link to="/about/who-we-are">Who we are</Link></li>
                      <li><i className="fa fa-users"></i><Link to="/about/our-teams">Our teams</Link></li>
                      <li><i className="fa fa-envelope"></i><Link to="/contact">Contact us</Link></li>
                    </ul>
                  </div>
                  <div className="dropdown-section">
                    <h4>Recognition</h4>
                    <ul>
                      <li><i className="fa fa-trophy"></i><Link to="/about/awardsrecognition">Awards & Recognition</Link></li>
                      <li><i className="fa fa-shield"></i><Link to="/about/security-trust">Security & Trust</Link></li>
                      <li><i className="fa fa-newspaper-o"></i><Link to="/newsletter">Newsletter</Link></li>
                    </ul>
                  </div>
                  <div className="dropdown-section">
                    <h4>Careers</h4>
                    <ul>
                      <li><i className="fa fa-briefcase"></i><Link to="/careers/overview">Open jobs</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <div className="search-container">
            <button className="search-icon" onClick={toggleSearch}>
              <FaSearch />
            </button>
            {showSearch && (
              <div className="search-popup">
                <button className="search-close-btn" onClick={toggleSearch}>
                  <i className="fa fa-times"></i>
                </button>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input-popup"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchSubmit}
                />
              </div>
            )}
          </div>
          {user ? (
            <div className="profile-section">
              <button className="profile-btn" onClick={toggleProfileDropdown}>
                <i className="fa fa-user"></i> {user.name || user.username || 'Profile'}
              </button>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <Link to={dashboardLink} onClick={() => setShowProfileDropdown(false)}>{dashboardText}</Link>
                  <Link to={profileLink} onClick={() => setShowProfileDropdown(false)}>{profileText}</Link>
                  <div className='profile-dropdown-logout'>
                    <Link onClick={handleLogout}>Logout</Link>
                  </div>
                </div>
              )}
            </div>

          ) : (
            <>
              <Link to="/contact" className="btnsecondary">Contact Sales</Link>
              <Link to="/signup" className="btnprimary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
