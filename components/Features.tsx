import React from 'react';
import { Globe, Clock, ShieldCheck, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Remote Access",
    desc: "Apply for registration from anywhere, anytime without queuing."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Fast Processing",
    desc: "Digital verification speeds up the process to under 24 hours."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Secure Data",
    desc: "End-to-end encryption ensures your privacy is never compromised."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Paperless",
    desc: "Eco-friendly digital certificates accessible on your mobile."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white relative overflow-hidden">
       {/* Soft blobs background */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-rose-50 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-10 right-10 w-40 sm:w-64 h-40 sm:h-64 bg-gold-50 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-70 animate-blob" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-3 sm:mb-4">Modernizing Tradition</h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-2">We've streamlined the official Nikah registration process to be respectful, efficient, and accessible.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/50 backdrop-blur-sm border border-rose-100 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl hover:bg-white hover:border-gold-200 hover:shadow-xl hover:shadow-gold-100/50 transition-all duration-300 hover:-translate-y-2 cursor-default"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-rose-50 text-gold-600 flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                <div className="w-5 h-5 sm:w-6 sm:h-6">{feature.icon}</div>
              </div>
              <h3 className="font-serif text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;