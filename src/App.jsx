import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import IncomePage from './pages/IncomePage';
import ExpensesPage from './pages/ExpensesPage';
import TaxPage from './pages/TaxPage';
import SavingsPage from './pages/SavingsPage';
import InsightsPage from './pages/InsightsPage';
import ProfilePage from './pages/ProfilePage';
import { mockUser } from './data/mockData';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');

  // Redirect to dashboard if user is logged in and on landing/auth pages
  if (user && ['landing', 'signin', 'signup'].includes(currentPage)) {
    setCurrentPage('dashboard');
  }

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('signin');
    }
  };

  const handleSignInSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleSignUpSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleNavigateToSignIn = () => {
    setCurrentPage('signin');
  };

  const handleNavigateToSignUp = () => {
    setCurrentPage('signup');
  };

  const handleNavigateToLanding = () => {
    setCurrentPage('landing');
  };

  // Page component mapping
  const pages = {
    landing: <LandingPage onGetStarted={handleGetStarted} />,
    signin: <SignInPage
      onSignInSuccess={handleSignInSuccess}
      onNavigateToSignUp={handleNavigateToSignUp}
      onNavigateToLanding={handleNavigateToLanding}
    />,
    signup: <SignUpPage
      onSignUpSuccess={handleSignUpSuccess}
      onNavigateToSignIn={handleNavigateToSignIn}
      onNavigateToLanding={handleNavigateToLanding}
    />,
    dashboard: <Dashboard />,
    income: <IncomePage />,
    expenses: <ExpensesPage />,
    tax: <TaxPage />,
    savings: <SavingsPage />,
    insights: <InsightsPage />,
    profile: <ProfilePage />,
  };

  const authPages = ['landing', 'signin', 'signup'];
  const showHeader = !authPages.includes(currentPage);
  const showContainer = !authPages.includes(currentPage);

  return (
    <div className="min-h-screen">
      {/* Header - shown on all pages except landing and auth pages */}
      {showHeader && (
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}

      {/* Main Content */}
      <main className={showContainer ? 'container mx-auto px-4 sm:px-6 lg:px-8 py-8' : ''}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {pages[currentPage]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
