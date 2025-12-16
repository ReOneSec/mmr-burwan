import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import FAQStructuredData from '../components/FAQStructuredData';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Security from '../components/Security';
import Services from '../components/Services';
import Appointment from '../components/Appointment';
import CTA from '../components/CTA';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Wait for auth to finish loading before checking
    if (!isLoading && isAuthenticated && user) {
      // Redirect authenticated users to their appropriate dashboard
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, isLoading, isAuthenticated, navigate]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If authenticated, don't render landing page (redirect will happen)
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Show landing page for unauthenticated users
  return (
    <>
      <SEO
        title="MMR Burwan | Muslim Marriage Registration | Nikah Registration West Bengal"
        description="Official Muslim marriage registration & nikah registration online for West Bengal, Murshidabad. Government approved qazi service. Apply nikah certificate, download marriage certificate. Serving Burwan, Berhampore, Farakka & 21 blocks. Same day registration available."
        keywords="MMR registration, MMR Burwan, Muslim marriage registration, nikah registration, Muslim marriage certificate, nikah certificate West Bengal, nikah registration Murshidabad, qazi registration, online nikah registration, digital marriage certificate, government qazi, Islamic marriage registration, nikah nama, marriage registration near me, MMR Berhampore, MMR Farakka, Muslim marriage registration online, nikah registration Burwan, Muslim marriage registration West Bengal, authorized qazi, government approved marriage registration"
        url="https://mmrburwan.com"
      />
      <StructuredData type="GovernmentService" />
      <FAQStructuredData />
      <Hero />
      <Features />
      <HowItWorks />
      <Services />
      <Security />
      <Appointment />
      <CTA />
    </>
  );
};

export default LandingPage;

