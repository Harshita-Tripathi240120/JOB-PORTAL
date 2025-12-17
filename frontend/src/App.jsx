import React, { useState, useEffect } from 'react';
import { 
  Search, Menu, X, Bell, ChevronRight, MapPin, Calendar, 
  Clock, Users, Award, BookOpen, Briefcase, Code, 
  Target, Zap, Filter, BarChart2, PlusCircle, 
  Heart, Building, TrendingUp, Star, MessageCircle,
  Mail, Lock, User, ArrowRight, Loader, CheckCircle
} from 'lucide-react';

// --- MOCK DATA ---

const CATEGORIES = [
  { id: 'hackathons', name: 'Hackathons', icon: Code, color: 'bg-orange-100 text-orange-600' },
  { id: 'challenges', name: 'Case Challenges', icon: Target, color: 'bg-blue-100 text-blue-600' },
  { id: 'quizzes', name: 'Quizzes', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
  { id: 'internships', name: 'Internships', icon: Briefcase, color: 'bg-green-100 text-green-600' },
  { id: 'jobs', name: 'Full-time Jobs', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
];

const OPPORTUNITIES = [
  {
    id: 1,
    title: "TechSprint Hackathon 2025",
    organizer: "Google Developers Group",
    logo: "G",
    category: "Hackathon",
    mode: "Online",
    daysLeft: 5,
    registrations: 1240,
    tags: ["Coding", "AI/ML", "Global"],
    prize: "$10,000 Prize Pool",
    banner: "bg-gradient-to-r from-blue-600 to-indigo-700"
  },
  {
    id: 2,
    title: "Strategy Master: Case Study",
    organizer: "McKinsey & Company",
    logo: "M",
    category: "Case Challenge",
    mode: "Online",
    daysLeft: 12,
    registrations: 4500,
    tags: ["Strategy", "Business", "MBA"],
    prize: "PPO Opportunity",
    banner: "bg-gradient-to-r from-emerald-600 to-teal-700"
  },
  {
    id: 3,
    title: "Frontend Engineering Intern",
    organizer: "Airbnb",
    logo: "A",
    category: "Internship",
    mode: "Remote",
    daysLeft: 2,
    registrations: 890,
    tags: ["React", "UI/UX", "Paid"],
    prize: "$5,000 / month",
    banner: "bg-gradient-to-r from-rose-500 to-pink-600"
  },
  {
    id: 4,
    title: "National Coding Cup",
    organizer: "CodeChef",
    logo: "C",
    category: "Hackathon",
    mode: "Online",
    daysLeft: 20,
    registrations: 12000,
    tags: ["Competitive Coding", "C++", "Java"],
    prize: "MacBooks & Swags",
    banner: "bg-gradient-to-r from-slate-700 to-slate-900"
  },
  {
    id: 5,
    title: "Product Design Associate",
    organizer: "Spotify",
    logo: "S",
    category: "Job",
    mode: "Hybrid",
    daysLeft: 15,
    registrations: 2100,
    tags: ["Figma", "UX Research"],
    prize: "$120k / year",
    banner: "bg-gradient-to-r from-green-500 to-emerald-600"
  },
];

const MENTORS = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Software Engineer",
    company: "Google",
    topics: ["System Design", "Career Growth", "React"],
    rating: 4.9,
    reviews: 120,
    image: "bg-indigo-100 text-indigo-700"
  },
  {
    id: 2,
    name: "David Miller",
    role: "Product Manager",
    company: "Netflix",
    topics: ["Product Strategy", "Interview Prep", "Leadership"],
    rating: 4.8,
    reviews: 85,
    image: "bg-red-100 text-red-700"
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Data Scientist",
    company: "Amazon",
    topics: ["Machine Learning", "Python", "Data Viz"],
    rating: 5.0,
    reviews: 42,
    image: "bg-yellow-100 text-yellow-700"
  },
];

// --- SHARED COMPONENTS ---

const Badge = ({ children, className = "bg-slate-100 text-slate-600" }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const Button = ({ children, variant = 'primary', className = "", onClick, icon: Icon, type = "button", disabled }) => {
  const baseStyle = "inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  return (
    <button onClick={onClick} type={type} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

// --- LAYOUT COMPONENTS ---

const Navbar = ({ view, setView, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Explore' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'mentorship', label: 'Mentorship' },
  ];

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={() => setView('home')}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Unstop<span className="text-indigo-600">Clone</span></span>
            </div>
            <div className="hidden md:flex ml-8 space-x-6">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    view === item.id ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Auth */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-2 w-64 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400 text-slate-700"
              />
            </div>

            {user ? (
              <div className="flex items-center space-x-3 relative">
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="relative">
                  <button 
                    className="flex items-center cursor-pointer focus:outline-none"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                      {user.name.charAt(0)}
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                       <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setView(user.role === 'organizer' ? 'org-dash' : 'user-dash');
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        Dashboard
                      </button>
                      <button 
                        onClick={() => { onLogout(); setIsProfileOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={() => setView('login')} className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Login</button>
                <Button onClick={() => setView('register')} className="hidden md:flex">Host Event</Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-lg absolute w-full z-40">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm"
          />
          <div className="space-y-2">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => { setView(item.id); setIsMenuOpen(false); }} 
                className={`block w-full text-left py-2 font-medium ${view === item.id ? 'text-indigo-600' : 'text-slate-600'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {!user && (
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <Button variant="secondary" onClick={() => { setView('login'); setIsMenuOpen(false); }} className="w-full">Login</Button>
              <Button onClick={() => { setView('register'); setIsMenuOpen(false); }} className="w-full">Host Event</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

// --- SCREEN: AUTH PAGE (New Implementation) ---

const AuthPage = ({ mode = 'login', onAuthSuccess, setView }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'participant' // 'participant' or 'organizer'
  });
  
  const [error, setError] = useState('');

  // Switch between Login/Register
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ name: '', email: '', password: '', role: 'participant' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }
    if (!isLogin && !formData.name) {
      setError('Name is required for registration');
      setIsLoading(false);
      return;
    }

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      // Mock Success
      const userData = {
        name: isLogin ? 'Demo User' : formData.name,
        email: formData.email,
        role: formData.role
      };
      onAuthSuccess(userData);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Brand/Visual */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/30">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {isLogin ? "Welcome Back!" : "Join the Community"}
            </h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              {isLogin 
                ? "Access your dashboard, track your applications, and continue your journey to success." 
                : "Unlock thousands of hackathons, jobs, and mentorship opportunities. Start your career journey today."}
            </p>
          </div>
          
          <div className="relative z-10 mt-12">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-${i * 100 + 200}`}></div>
              ))}
            </div>
            <p className="text-sm font-medium text-indigo-100">Join 50,000+ others getting hired.</p>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-blue-500/20 blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{isLogin ? 'Sign In' : 'Create Account'}</h3>
          <p className="text-slate-500 mb-8">
            {isLogin ? "Don't have an account yet? " : "Already have an account? "}
            <button onClick={toggleMode} className="text-indigo-600 font-bold hover:underline">
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Register Only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Role Selection (Register Only) */}
            {!isLogin && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-3">I want to:</label>
                <div className="flex space-x-4">
                  <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.role === 'participant' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-transparent bg-white text-slate-500 hover:bg-slate-100'}`}>
                    <input 
                      type="radio" 
                      name="role" 
                      value="participant" 
                      checked={formData.role === 'participant'}
                      onChange={() => setFormData({...formData, role: 'participant'})}
                      className="hidden" 
                    />
                    <span className="font-semibold text-sm">Participate</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.role === 'organizer' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-transparent bg-white text-slate-500 hover:bg-slate-100'}`}>
                    <input 
                      type="radio" 
                      name="role" 
                      value="organizer" 
                      checked={formData.role === 'organizer'}
                      onChange={() => setFormData({...formData, role: 'organizer'})}
                      className="hidden" 
                    />
                    <span className="font-semibold text-sm">Host Events</span>
                  </label>
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg flex items-center">
                <span className="mr-2">⚠️</span> {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full py-3 text-base mt-2" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center"><Loader className="w-4 h-4 mr-2 animate-spin" /> Processing...</span>
              ) : (
                <span className="flex items-center">{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4 ml-2" /></span>
              )}
            </Button>
          </form>

          {isLogin && (
             <div className="mt-4 text-center">
               <button className="text-sm text-slate-500 hover:text-indigo-600">Forgot your password?</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: LANDING PAGE ---

const LandingPage = ({ setView }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-indigo-50 text-indigo-700 mb-6 px-4 py-1.5 text-sm border border-indigo-100">
              🚀 The #1 Platform for Students & Pros
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Career Potential</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              Participate in hackathons, quizzes, and competitions. Find your dream job or internship and showcase your skills to the world.
            </p>
            
            {/* Search Bar Widget */}
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
              <div className="flex-1 flex items-center px-4 h-12 bg-slate-50 rounded-xl">
                <Search className="w-5 h-5 text-slate-400 mr-3" />
                <input type="text" placeholder="What are you looking for?" className="bg-transparent w-full outline-none text-sm text-slate-700" />
              </div>
              <Button onClick={() => setView('explore')} className="h-12 rounded-xl px-8 text-base">Explore</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Explore Categories</h2>
              <p className="text-slate-500 mt-1">Find opportunities that match your skills.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => setView(cat.id === 'hackathons' ? 'hackathons' : cat.id === 'jobs' || cat.id === 'internships' ? 'jobs' : 'explore')}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group text-center"
              >
                <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-slate-900">{cat.name}</h3>
                <p className="text-xs text-slate-400 mt-1">250+ Opportunities</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Featured Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OPPORTUNITIES.slice(0, 4).map((opp) => (
              <div 
                key={opp.id} 
                onClick={() => setView('details')}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col"
              >
                <div className={`h-32 ${opp.banner} relative`}>
                  <div className="absolute -bottom-6 left-4 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center font-bold text-lg">
                      {opp.logo}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {opp.daysLeft} days left
                  </div>
                </div>
                <div className="pt-10 px-5 pb-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{opp.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{opp.organizer}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {opp.tags.slice(0, 2).map(t => <Badge key={t} className="bg-indigo-50 text-indigo-700">{t}</Badge>)}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-700 flex items-center">
                      <Users className="w-3 h-3 mr-1 text-slate-400" /> {opp.registrations} Reg.
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                      {opp.mode}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- SCREEN: LISTING PAGE ---

const ListingPage = ({ setView, type }) => {
  const getFilteredOpportunities = () => {
    if (type === 'hackathons') {
      return OPPORTUNITIES.filter(o => o.category === 'Hackathon' || o.category === 'Case Challenge');
    }
    if (type === 'jobs') {
      return OPPORTUNITIES.filter(o => o.category === 'Job' || o.category === 'Internship');
    }
    return OPPORTUNITIES;
  };

  const filteredData = getFilteredOpportunities();
  const pageTitle = type === 'hackathons' ? 'Hackathons & Challenges' : type === 'jobs' ? 'Jobs & Internships' : 'Explore Opportunities';

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 flex items-center">
                  <Filter className="w-4 h-4 mr-2" /> Filters
                </h3>
                <button className="text-xs text-indigo-600 font-medium">Reset</button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {(type === 'hackathons' ? ['Hackathons', 'Case Challenges', 'Quizzes'] : 
                      type === 'jobs' ? ['Jobs', 'Internships'] : 
                      ['Hackathons', 'Jobs', 'Internships', 'Quizzes']).map(c => (
                      <label key={c} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" defaultChecked />
                        <span className="text-sm text-slate-600">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Mode</h4>
                  <div className="space-y-2">
                    {['Online', 'Offline', 'Hybrid'].map(m => (
                      <label key={m} className="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" name="mode" className="text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                        <span className="text-sm text-slate-600">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Listings Feed */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-slate-900">{pageTitle} <span className="text-slate-400 text-lg font-normal">({filteredData.length})</span></h1>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <span>Sort by:</span>
                <select className="border-none bg-transparent font-semibold text-indigo-600 focus:ring-0 cursor-pointer">
                  <option>Popular</option>
                  <option>Newest</option>
                  <option>Ending Soon</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredData.length > 0 ? filteredData.map((opp) => (
                <div key={opp.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 group">
                  <div className={`w-full md:w-48 h-32 rounded-lg ${opp.banner} flex-shrink-0 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-indigo-50 text-indigo-700 uppercase tracking-wider text-[10px]">{opp.category}</Badge>
                          <span className="text-xs text-slate-400">• {opp.mode}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{opp.title}</h3>
                        <p className="text-sm text-slate-500 font-medium">{opp.organizer}</p>
                      </div>
                      <button className="text-slate-400 hover:text-red-500 transition-colors"><Heart className="w-5 h-5" /></button>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center"><Award className="w-4 h-4 mr-1.5 text-orange-500" /> {opp.prize}</div>
                      <div className="flex items-center"><Users className="w-4 h-4 mr-1.5 text-blue-500" /> {opp.registrations} Registered</div>
                      <div className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 text-purple-500" /> {opp.daysLeft} days left</div>
                    </div>
                  </div>
                  <div className="flex md:flex-col justify-between items-end md:justify-center gap-2 mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                    <Button onClick={() => setView('details')} className="w-full">View Details</Button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                   <div className="text-slate-400 mb-2">No opportunities found in this category.</div>
                   <Button variant="ghost" onClick={() => setView('explore')}>View All</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: MENTORSHIP PAGE ---

const MentorshipPage = ({ setView }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Banner */}
      <div className="bg-indigo-900 text-white py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Mentor</h1>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-8">Connect with industry experts from top companies to accelerate your career growth.</p>
            
            <div className="max-w-xl mx-auto bg-white rounded-full p-2 flex">
               <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-slate-400 mr-2" />
                  <input type="text" placeholder="Search by role, company, or skill..." className="w-full outline-none text-slate-700" />
               </div>
               <Button className="rounded-full">Search</Button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Filters */}
        <div className="flex gap-4 overflow-x-auto pb-6">
           {['All Mentors', 'Software Engineering', 'Product Management', 'Data Science', 'Design'].map((filter, i) => (
             <button key={filter} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${i === 0 ? 'bg-white text-indigo-600 shadow-md' : 'bg-white/50 text-slate-600 hover:bg-white'}`}>
                {filter}
             </button>
           ))}
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
           {MENTORS.map((mentor) => (
             <div key={mentor.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full mb-4 flex items-center justify-center text-2xl font-bold ${mentor.image}`}>
                   {mentor.name.charAt(0)}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{mentor.name}</h3>
                <p className="text-indigo-600 font-medium text-sm mb-1">{mentor.role}</p>
                <p className="text-slate-500 text-xs mb-4 flex items-center">
                   <Building className="w-3 h-3 mr-1" /> {mentor.company}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                   {mentor.topics.map(topic => (
                      <span key={topic} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] rounded border border-slate-100 uppercase tracking-wide">
                        {topic}
                      </span>
                   ))}
                </div>

                <div className="mt-auto w-full pt-4 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center text-slate-700 font-bold text-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" /> {mentor.rating}
                      <span className="text-slate-400 font-normal ml-1">({mentor.reviews})</span>
                   </div>
                   <button className="text-indigo-600 p-2 hover:bg-indigo-50 rounded-full">
                      <MessageCircle className="w-5 h-5" />
                   </button>
                </div>
                <Button className="w-full mt-4" variant="outline">View Profile</Button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: DETAILS PAGE ---

const DetailsPage = ({ setView }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="bg-white min-h-screen">
      {/* Sticky Top Banner */}
      <div className="h-64 bg-gradient-to-r from-blue-900 to-indigo-900 relative">
        <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent h-32"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 pb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-24 h-24 bg-white rounded-xl shadow-md p-2 -mt-16 md:mt-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-indigo-600">G</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="bg-orange-100 text-orange-700">Hackathon</Badge>
              <Badge className="bg-green-100 text-green-700">Online</Badge>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">TechSprint Hackathon 2025</h1>
            <p className="text-slate-500 font-medium flex items-center">
              <Building className="w-4 h-4 mr-1.5" /> Google Developers Group
              <span className="mx-2">•</span>
              <MapPin className="w-4 h-4 mr-1.5" /> Global
            </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
            <Button className="w-full py-3 text-base">Register Now</Button>
            <div className="text-center text-xs text-slate-500 font-medium">Deadline: 24 Dec 2025</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 border-b border-slate-200 overflow-x-auto">
          <div className="flex space-x-8 min-w-max">
            {['Overview', 'Timeline', 'Prizes', 'Rules'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-4 text-sm font-semibold transition-all border-b-2 ${
                  activeTab === tab.toLowerCase() 
                    ? 'text-indigo-600 border-indigo-600' 
                    : 'text-slate-500 border-transparent hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <section className="animate-fade-in">
                <h3 className="text-xl font-bold text-slate-900 mb-4">About the Opportunity</h3>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p className="mb-4">
                    Join us for the biggest global hackathon of 2025! TechSprint brings together the brightest minds
                    in AI, Blockchain, and Cloud Computing. Whether you are a student or a professional, this is your
                    chance to showcase your skills and win big.
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>48 Hours non-stop coding experience</li>
                    <li>Mentorship from Google Engineers</li>
                    <li>Global networking opportunities with 10k+ participants</li>
                  </ul>
                </div>
              </section>
            )}

            {activeTab === 'timeline' && (
              <section className="animate-fade-in">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Timeline</h3>
                <div className="space-y-6 relative pl-4 border-l-2 border-slate-200 ml-3">
                  {[
                    { title: "Registration Starts", date: "01 Dec 2025", status: "completed" },
                    { title: "Registration Ends", date: "24 Dec 2025", status: "active" },
                    { title: "Hackathon Begins", date: "01 Jan 2026", status: "upcoming" },
                    { title: "Result Declaration", date: "05 Jan 2026", status: "upcoming" }
                  ].map((item, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                        item.status === 'completed' ? 'bg-indigo-600 border-indigo-600' :
                        item.status === 'active' ? 'bg-white border-indigo-600 ring-4 ring-indigo-100' :
                        'bg-white border-slate-300'
                      }`}></div>
                      <h4 className={`font-bold ${item.status === 'upcoming' ? 'text-slate-500' : 'text-slate-900'}`}>{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'prizes' && (
               <section className="animate-fade-in">
                 <h3 className="text-xl font-bold text-slate-900 mb-6">Prizes & Rewards</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 p-6 rounded-xl">
                      <div className="flex items-center mb-3">
                         <Award className="w-8 h-8 text-yellow-600 mr-3" />
                         <h4 className="text-lg font-bold text-yellow-800">1st Prize</h4>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 mb-2">$5,000 Cash</p>
                      <p className="text-sm text-slate-600">Plus MacBook Pro and Internship Opportunity</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                      <div className="flex items-center mb-3">
                         <Award className="w-8 h-8 text-slate-400 mr-3" />
                         <h4 className="text-lg font-bold text-slate-700">2nd Prize</h4>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 mb-2">$3,000 Cash</p>
                      <p className="text-sm text-slate-600">Plus iPad Air and Swag Kit</p>
                    </div>
                 </div>
               </section>
            )}

            {activeTab === 'rules' && (
              <section className="animate-fade-in">
                 <h3 className="text-xl font-bold text-slate-900 mb-4">Rules & Regulations</h3>
                 <ul className="space-y-4 text-slate-600 list-decimal pl-5">
                   <li>All code must be written during the event. Pre-written code is not allowed.</li>
                   <li>Teams can have up to 4 members. Cross-college teams are allowed.</li>
                 </ul>
              </section>
            )}

          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4">Eligibility & Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Team Size</span>
                  <span className="font-semibold text-slate-900">1 - 4 Members</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Registration Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Eligibility</span>
                  <span className="font-semibold text-slate-900">Students & Professionals</span>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2">Prize Pool</h4>
              <div className="text-3xl font-extrabold text-indigo-600 mb-1">$10,000</div>
              <p className="text-sm text-indigo-700">Includes Cash, Swags, and Cloud Credits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: USER DASHBOARD ---

// --- UPDATED USER DASHBOARD COMPONENT ---

const UserDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock Data for specific tabs
  const MY_REGISTRATIONS = [
    {
      id: 1,
      title: "TechSprint Hackathon 2025",
      organizer: "Google Developers Group",
      status: "Round 1 Cleared",
      date: "24 Dec 2025",
      logo: "G",
      statusColor: "text-green-600 bg-green-50 border-green-200"
    },
    {
      id: 2,
      title: "Strategy Master: Case Study",
      organizer: "McKinsey & Company",
      status: "Registered",
      date: "12 Jan 2026",
      logo: "M",
      statusColor: "text-blue-600 bg-blue-50 border-blue-200"
    }
  ];

  const MY_CERTIFICATES = [
    { id: 1, title: "Intro to Python", issuer: "CodeChef", date: "Aug 2024" },
    { id: 2, title: "UI/UX Fundamentals", issuer: "Google", date: "Oct 2024" },
  ];

  // --- SUB-COMPONENTS FOR TABS ---

  const DashboardHome = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Registered', val: '12', color: 'bg-blue-100 text-blue-600' },
          { label: 'Completed', val: '8', color: 'bg-green-100 text-green-600' },
          { label: 'Wins', val: '2', color: 'bg-yellow-100 text-yellow-600' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stat.val}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <BarChart2 className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Upcoming Deadlines</h3>
          <button className="text-sm text-indigo-600 font-medium">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {OPPORTUNITIES.slice(0, 3).map(opp => (
            <div key={opp.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center font-bold text-slate-600">{opp.logo}</div>
                <div>
                  <h4 className="font-bold text-slate-900">{opp.title}</h4>
                  <p className="text-xs text-slate-500">{opp.organizer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Deadline</div>
                  <div className="text-sm font-bold text-red-500">{opp.daysLeft} Days left</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MyRegistrations = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">My Registrations</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {MY_REGISTRATIONS.map((reg) => (
          <div key={reg.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 text-lg border border-indigo-100">
                {reg.logo}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{reg.title}</h4>
                <p className="text-sm text-slate-500">{reg.organizer}</p>
                <div className="flex items-center mt-1 text-xs text-slate-400">
                  <Calendar className="w-3 h-3 mr-1" /> {reg.date}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${reg.statusColor}`}>
                {reg.status}
              </span>
              <Button variant="outline" className="text-xs py-2 px-3 h-8">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Certificates = () => (
    <div className="space-y-6 animate-fade-in">
      <h3 className="font-bold text-xl text-slate-900">My Certificates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MY_CERTIFICATES.map((cert) => (
          <div key={cert.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">{cert.title}</h4>
            <p className="text-sm text-slate-500 mb-6">Issued by {cert.issuer} • {cert.date}</p>
            <Button variant="outline" className="w-full mt-auto group-hover:bg-indigo-50 group-hover:border-indigo-200">
              Download Certificate
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const Profile = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-in">
      <h3 className="font-bold text-xl text-slate-900 mb-6">Edit Profile</h3>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input type="text" defaultValue={user.name} className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input type="email" defaultValue={user.email} disabled className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm bg-slate-50 text-slate-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input type="tel" placeholder="+1 234 567 890" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">College / University</label>
            <input type="text" placeholder="e.g. Stanford University" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
          <textarea rows="4" placeholder="Tell us about yourself..." className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </form>
    </div>
  );

  // --- RENDER ---

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardHome />;
      case 'registrations': return <MyRegistrations />;
      case 'certificates': return <Certificates />;
      case 'profile': return <Profile />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl border-2 border-indigo-50">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-900 truncate">{user.name}</h3>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
                { id: 'registrations', label: 'My Registrations', icon: BookOpen },
                { id: 'certificates', label: 'Certificates', icon: Award },
                { id: 'profile', label: 'Profile', icon: User }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className={`w-4 h-4 mr-3 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 min-h-[500px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// --- SCREEN: ORGANIZER DASHBOARD ---

// --- UPDATED ORGANIZER DASHBOARD COMPONENT ---

const OrganizerDashboard = ({ user }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hackathon',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Welcome, {user.name}</h1>
          <Button icon={PlusCircle}>Create Opportunity</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm text-slate-500 font-medium mb-1">Total Impressions</div>
            <div className="text-2xl font-bold text-slate-900">124.5k</div>
            <div className="text-xs text-green-600 mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +12% this week</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-sm text-slate-500 font-medium mb-1">Total Registrations</div>
            <div className="text-2xl font-bold text-slate-900">4,200</div>
            <div className="text-xs text-green-600 mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +5% this week</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-500 font-medium mb-1">Active Events</div>
              <div className="text-2xl font-bold text-slate-900">3</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-500 font-medium mb-1">Pending Approval</div>
              <div className="text-2xl font-bold text-slate-900">1</div>
          </div>
        </div>

        {/* Create Event Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center space-x-4 mb-8 border-b border-slate-100 pb-4">
            <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">1</span>
            <span className="font-semibold text-slate-900">Basic Details</span>
            <div className="w-12 h-0.5 bg-slate-200"></div>
            <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">2</span>
            <span className="font-medium text-slate-500">Registration</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Opportunity Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="e.g. Annual Coding Hackathon" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none bg-white"
              >
                <option>Hackathon</option>
                <option>Quiz</option>
                <option>Job</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm h-32 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Describe your event..."
              ></textarea>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <Button variant="secondary">Save Draft</Button>
            <Button onClick={() => alert("Proceeding to next step!")}>Next Step</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">UnstopClone</span>
        </div>
        <p className="text-sm text-slate-400">Connecting talent with opportunities globally.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Platform</h4>
        <ul className="space-y-2 text-sm">
          <li className="cursor-pointer hover:text-white">Browse Opportunities</li>
          <li className="cursor-pointer hover:text-white">Practice Coding</li>
          <li className="cursor-pointer hover:text-white">Host Events</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Resources</h4>
        <ul className="space-y-2 text-sm">
          <li className="cursor-pointer hover:text-white">Blog</li>
          <li className="cursor-pointer hover:text-white">Case Studies</li>
          <li className="cursor-pointer hover:text-white">Help Center</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Get the App</h4>
        <div className="flex space-x-2">
          <button className="w-32 h-10 bg-slate-800 rounded flex items-center justify-center text-xs hover:bg-slate-700 transition">App Store</button>
          <button className="w-32 h-10 bg-slate-800 rounded flex items-center justify-center text-xs hover:bg-slate-700 transition">Google Play</button>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [view, setView] = useState('home'); 
  // Views: home, explore, hackathons, jobs, mentorship, details, user-dash, org-dash, login, register

  const [user, setUser] = useState(null);   

  // Called when AuthPage successfully submits
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setView(userData.role === 'organizer' ? 'org-dash' : 'user-dash');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen flex flex-col">
      <Navbar view={view} setView={setView} user={user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        {view === 'home' && <LandingPage setView={setView} />}
        
        {/* Listings */}
        {view === 'explore' && <ListingPage setView={setView} type="explore" />}
        {view === 'hackathons' && <ListingPage setView={setView} type="hackathons" />}
        {view === 'jobs' && <ListingPage setView={setView} type="jobs" />}
        {view === 'mentorship' && <MentorshipPage setView={setView} />}
        
        {/* Details */}
        {view === 'details' && <DetailsPage setView={setView} />}
        
        {/* Auth Views */}
        {view === 'login' && <AuthPage mode="login" onAuthSuccess={handleAuthSuccess} setView={setView} />}
        {view === 'register' && <AuthPage mode="register" onAuthSuccess={handleAuthSuccess} setView={setView} />}

        {/* Dashboards (Protected Logic) */}
        {view === 'user-dash' && (user ? <UserDashboard user={user} /> : <AuthPage mode="login" onAuthSuccess={handleAuthSuccess} setView={setView} />)}
        {view === 'org-dash' && (user ? <OrganizerDashboard user={user} /> : <AuthPage mode="login" onAuthSuccess={handleAuthSuccess} setView={setView} />)}
      </main>

      <Footer />
    </div>
  );
}