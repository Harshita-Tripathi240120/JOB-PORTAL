import React, { useState, useEffect } from 'react';
import { 
  Search, Menu, X, Bell, User, ChevronRight, MapPin, Calendar, 
  Clock, DollarSign, Users, Award, BookOpen, Briefcase, Code, 
  Target, Zap, Filter, CheckCircle, BarChart2, PlusCircle, 
  FileText, Settings, LogOut, ChevronDown, Share2, Heart
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
];

// --- SHARED COMPONENTS ---

const Badge = ({ children, className = "bg-slate-100 text-slate-600" }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const Button = ({ children, variant = 'primary', className = "", onClick, icon: Icon }) => {
  const baseStyle = "inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

// --- LAYOUT COMPONENTS ---

const Navbar = ({ view, setView, user, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              {['Explore', 'Hackathons', 'Jobs', 'Mentorship'].map((item) => (
                <button 
                  key={item}
                  onClick={() => setView('explore')}
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {item}
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
                placeholder="Search opportunities..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400 text-slate-700"
              />
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => setView(user.role === 'organizer' ? 'org-dash' : 'user-dash')}
                >
                  <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={() => onLogin('participant')} className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">Login</button>
                <Button onClick={() => onLogin('organizer')} className="hidden md:flex">Host Event</Button>
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
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-lg absolute w-full">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm"
          />
          <div className="space-y-2">
            {['Explore', 'Hackathons', 'Jobs', 'Mentorship'].map(item => (
              <button key={item} onClick={() => { setView('explore'); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-medium text-slate-600">
                {item}
              </button>
            ))}
          </div>
          {!user && (
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <Button variant="secondary" onClick={() => onLogin('participant')} className="w-full">Login</Button>
              <Button onClick={() => onLogin('organizer')} className="w-full">Host Event</Button>
            </div>
          )}
        </div>
      )}
    </nav>
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
          <li>Browse Opportunities</li>
          <li>Practice Coding</li>
          <li>Host Events</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Resources</h4>
        <ul className="space-y-2 text-sm">
          <li>Blog</li>
          <li>Case Studies</li>
          <li>Help Center</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Get the App</h4>
        <div className="flex space-x-2">
          <div className="w-32 h-10 bg-slate-800 rounded flex items-center justify-center text-xs">App Store</div>
          <div className="w-32 h-10 bg-slate-800 rounded flex items-center justify-center text-xs">Google Play</div>
        </div>
      </div>
    </div>
  </footer>
);

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
              <div className="hidden md:flex items-center px-4 h-12 bg-slate-50 rounded-xl border-l border-white">
                <Filter className="w-4 h-4 text-slate-400 mr-2" />
                <select className="bg-transparent outline-none text-sm text-slate-600 cursor-pointer">
                  <option>All Categories</option>
                  <option>Hackathons</option>
                  <option>Jobs</option>
                </select>
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
            <button className="text-indigo-600 font-semibold text-sm hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => setView('explore')}
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
            {OPPORTUNITIES.map((opp) => (
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

const ListingPage = ({ setView }) => {
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
                    {['Hackathons', 'Case Challenges', 'Quizzes', 'Jobs', 'Internships'].map(c => (
                      <label key={c} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
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
              <h1 className="text-2xl font-bold text-slate-900">All Opportunities <span className="text-slate-400 text-lg font-normal">(128)</span></h1>
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
              {OPPORTUNITIES.map((opp) => (
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
              ))}
            </div>
          </div>
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
            {['Overview', 'Timeline', 'Prizes', 'Rules', 'FAQs'].map((tab) => (
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
            {/* Overview Content */}
            <section className="animate-fade-in">
              <h3 className="text-xl font-bold text-slate-900 mb-4">About the Opportunity</h3>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                  Join us for the biggest global hackathon of 2025! TechSprint brings together the brightest minds
                  in AI, Blockchain, and Cloud Computing. Whether you are a student or a professional, this is your
                  chance to showcase your skills and win big.
                </p>
                <ul className="mt-4 space-y-2 list-disc pl-5">
                  <li>48 Hours non-stop coding</li>
                  <li>Mentorship from Google Engineers</li>
                  <li>Global networking opportunities</li>
                </ul>
              </div>
            </section>

            {/* Timeline */}
            <section className="border-t border-slate-100 pt-8">
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
          </div>

          {/* Right Sidebar Info */}
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

const UserDashboard = () => (
  <div className="min-h-screen bg-slate-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">S</div>
            <div>
              <h3 className="font-bold text-slate-900">Student Name</h3>
              <p className="text-xs text-slate-500">student@example.com</p>
            </div>
          </div>
          <nav className="space-y-1">
            {['Dashboard', 'My Registrations', 'Certificates', 'Profile'].map((item, idx) => (
              <button 
                key={item}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${idx === 0 ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <div className="w-2 h-2 rounded-full mr-3 bg-current opacity-60"></div>
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
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
    </div>
  </div>
);

// --- SCREEN: ORGANIZER DASHBOARD ---

const OrganizerDashboard = () => (
  <div className="min-h-screen bg-slate-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Organizer Dashboard</h1>
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
        </div>
      </div>

      {/* Create Event Form (Mock) */}
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
            <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Annual Coding Hackathon" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none bg-white">
              <option>Hackathon</option>
              <option>Quiz</option>
              <option>Job</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm h-32 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Describe your event..."></textarea>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <Button variant="secondary">Save Draft</Button>
          <Button>Next Step</Button>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [view, setView] = useState('home'); // home, explore, details, user-dash, org-dash
  const [user, setUser] = useState(null);   // null, { role: 'participant' | 'organizer', name: '...' }

  const handleLogin = (role) => {
    setUser({ 
      role, 
      name: role === 'organizer' ? 'TechCorp Inc.' : 'John Doe' 
    });
    setView(role === 'organizer' ? 'org-dash' : 'user-dash');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen flex flex-col">
      <Navbar view={view} setView={setView} user={user} onLogin={handleLogin} onLogout={handleLogout} />
      
      <main className="flex-grow">
        {view === 'home' && <LandingPage setView={setView} />}
        {view === 'explore' && <ListingPage setView={setView} />}
        {view === 'details' && <DetailsPage setView={setView} />}
        {view === 'user-dash' && <UserDashboard />}
        {view === 'org-dash' && <OrganizerDashboard />}
      </main>

      <Footer />
    </div>
  );
}