import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  User, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Building, 
  LogOut, 
  PlusCircle, 
  Search, 
  Cpu,
  Shield,
  DollarSign,
  Menu,
  X,
  MapPin,
  Clock,
  Filter,
  ChevronRight,
  Download,
  AlertCircle,
  CreditCard,
  BarChart2,
  ArrowRight,
  Loader2,
  Github,
  Twitter,
  Linkedin,
  Heart
} from 'lucide-react';

// --- MOCK DATA ---

const MOCK_JOBS = [
  { id: 1, title: 'Senior Java Developer', company: 'TechCorp Global', location: 'New York, NY', salary: '$120k - $150k', type: 'Full-time', matchScore: 92, posted: '2 days ago', skills: ['Spring Boot', 'Microservices', 'Kafka'] },
  { id: 2, title: 'Data Scientist', company: 'AI Solutions', location: 'Remote', salary: '$130k - $160k', type: 'Contract', matchScore: 85, posted: '5 hours ago', skills: ['Python', 'TensorFlow', 'NLP'] },
  { id: 3, title: 'Frontend Engineer', company: 'Creative Web', location: 'Austin, TX', salary: '$90k - $120k', type: 'Full-time', matchScore: 64, posted: '1 week ago', skills: ['React', 'Tailwind', 'Figma'] },
  { id: 4, title: 'DevOps Engineer', company: 'CloudSystems', location: 'San Francisco, CA', salary: '$140k - $170k', type: 'Full-time', matchScore: 78, posted: '3 days ago', skills: ['AWS', 'Docker', 'Kubernetes'] },
];

const MOCK_CANDIDATES = [
  { id: 101, name: 'John Doe', role: 'Java Developer', score: 95, status: 'Shortlisted', experience: '5 years', location: 'New York', email: 'john.d@example.com', skills: ['Java', 'Spring Boot', 'Hibernate', 'AWS'] },
  { id: 102, name: 'Alice Smith', role: 'Java Developer', score: 88, status: 'Interview', experience: '3 years', location: 'Boston', email: 'alice.s@example.com', skills: ['Java', 'Microservices', 'SQL'] },
  { id: 103, name: 'Robert Chen', role: 'Java Developer', score: 72, status: 'Pending', experience: '2 years', location: 'Remote', email: 'r.chen@example.com', skills: ['Java', 'Spring', 'React'] },
  { id: 104, name: 'Emily Davis', role: 'Java Developer', score: 45, status: 'Rejected', experience: '1 year', location: 'Chicago', email: 'emily.d@example.com', skills: ['Java', 'HTML', 'CSS'] },
];

const PLANS = [
  { name: 'Standard', price: '$99/mo', active: true, features: ['5 Active Jobs', '100 Resume Parses', 'Basic Support'] },
  { name: 'Enterprise', price: '$499/mo', active: false, features: ['Unlimited Jobs', 'Unlimited Parsing', 'Dedicated Account Manager'] },
];

// --- COMPONENTS ---

const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`bg-white rounded-lg border border-slate-200 shadow-sm ${noPadding ? '' : 'p-6'} ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = 'blue', className = "" }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[type] || colors.blue} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = 'primary', onClick, className = "", icon: Icon, disabled = false }) => {
  const variants = {
    primary: 'bg-blue-700 hover:bg-blue-800 text-white shadow-sm',
    secondary: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};

const Footer = ({ className = "" }) => (
  <footer className={`bg-white border-t border-slate-200 mt-auto ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex justify-center md:justify-start space-x-6 md:order-2">
          <a href="#" className="text-slate-400 hover:text-slate-500">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-500">
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-500">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center md:text-left text-sm text-slate-500">
            &copy; {new Date().getFullYear()} EnterpriseHire Inc. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center md:justify-start space-x-4 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600 hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 hover:underline">Security</a>
            <a href="#" className="hover:text-slate-600 hover:underline">Status</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN APP ---

export default function JobPortalApp() {
  const [currentView, setCurrentView] = useState('landing'); // landing, login, app
  const [authMode, setAuthMode] = useState('login'); // login, register
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleNavigate = (view, mode = 'login') => {
    setCurrentView(view);
    setAuthMode(mode);
  };

  const handleLogin = (role) => {
    setIsLoggingIn(true);
    // Simulate API Network Delay for realism
    setTimeout(() => {
      setUser({
        name: role === 'admin' ? 'Admin User' : role === 'recruiter' ? 'Sarah Jenkins' : 'Michael Scott',
        role: role,
        company: role === 'recruiter' ? 'TechCorp Global' : undefined,
        avatar: role === 'recruiter' ? 'SJ' : 'MS'
      });
      setIsLoggingIn(false);
      setCurrentView('app');
    }, 1200);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  // View Routing
  if (currentView === 'landing') return <LandingPage onNavigate={handleNavigate} />;
  if (currentView === 'login') return <LoginPage mode={authMode} onLogin={handleLogin} onNavigate={handleNavigate} loading={isLoggingIn} />;

  // Authenticated App Layout (Safety check for user)
  if (!user && currentView === 'app') return <LoginPage mode="login" onLogin={handleLogin} onNavigate={handleNavigate} loading={false} />;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 flex flex-col`}>
        <div className="h-16 flex items-center px-6 bg-slate-950 shrink-0">
          <Briefcase className="h-6 w-6 text-blue-500 mr-2" />
          <span className="text-xl font-bold text-white tracking-tight">Enterprise<span className="text-blue-500">Hire</span></span>
        </div>
        
        <div className="p-4 space-y-1 flex-1 overflow-y-auto">
          <div className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Menu</div>
          {user.role === 'candidate' && <CandidateNav />}
          {user.role === 'recruiter' && <RecruiterNav />}
          {user.role === 'admin' && <AdminNav />}
        </div>

        <div className="w-full p-4 bg-slate-950 border-t border-slate-800 shrink-0">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-3">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user.role}</p>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-white ml-2">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-slate-500">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-end items-center space-x-4">
             <div className="hidden md:flex items-center text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">
               <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
               System Operational
             </div>
             <button className="relative p-1 rounded-full text-slate-400 hover:text-slate-500">
               <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
               <AlertCircle className="h-6 w-6" />
             </button>
          </div>
        </header>

        {/* Dashboard Content - Scrollable Area */}
        <main className="flex-1 overflow-y-auto flex flex-col">
           <div className="flex-1 p-4 sm:p-6 lg:p-8">
              {user.role === 'candidate' && <CandidateDashboard user={user} />}
              {user.role === 'recruiter' && <RecruiterDashboard user={user} />}
              {user.role === 'admin' && <AdminDashboard />}
           </div>
           
           {/* Authenticated View Footer */}
           <Footer className="bg-slate-50 border-t-slate-200 mt-0" />
        </main>
      </div>
    </div>
  );
}

// --- NAVIGATION COMPONENTS ---

function NavItem({ icon: Icon, label, active = false, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md group transition-colors ${
        active 
          ? 'bg-blue-900/50 text-white' 
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className={`mr-3 h-5 w-5 ${active ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
      {label}
    </button>
  );
}

const CandidateNav = () => {
  const [active, setActive] = useState('Dashboard');
  const items = [
    { label: 'Dashboard', icon: BarChart2 },
    { label: 'Job Search', icon: Search },
    { label: 'My Resume', icon: FileText },
    { label: 'Applications', icon: CheckCircle },
  ];
  return items.map(i => <NavItem key={i.label} {...i} active={active === i.label} onClick={() => setActive(i.label)} />);
};

const RecruiterNav = () => {
  const [active, setActive] = useState('Dashboard');
  const items = [
    { label: 'Dashboard', icon: BarChart2 },
    { label: 'Candidate Evaluation', icon: Users },
    { label: 'Post a Job', icon: PlusCircle },
    { label: 'Subscription', icon: CreditCard },
  ];
  return (
    <>
      {items.map(i => <NavItem key={i.label} {...i} active={active === i.label} onClick={() => {
        setActive(i.label);
        // Dispatch event for parent to switch view (in real app context/router)
        window.dispatchEvent(new CustomEvent('recruiter-nav', { detail: i.label }));
      }} />)}
    </>
  );
};

const AdminNav = () => {
  const [active, setActive] = useState('Dashboard');
  const items = [
    { label: 'Dashboard', icon: BarChart2 },
    { label: 'User Management', icon: Users },
    { label: 'System Health', icon: Shield },
  ];
  return items.map(i => <NavItem key={i.label} {...i} active={active === i.label} onClick={() => setActive(i.label)} />);
};

// --- LANDING & LOGIN ---

function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-slate-900">Enterprise<span className="text-blue-600">Hire</span></span>
          </div>
          <div className="flex items-center space-x-4">
             <button className="text-slate-600 hover:text-slate-900 font-medium hidden md:block">Solutions</button>
             <button className="text-slate-600 hover:text-slate-900 font-medium hidden md:block">Pricing</button>
             <Button variant="secondary" onClick={() => onNavigate('login', 'login')}>Log In</Button>
             <Button onClick={() => onNavigate('login', 'register')}>Get Started</Button>
          </div>
        </div>
      </nav>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Badge type="blue" className="mb-6">v2.0 Now Available with AI Scoring</Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Hire Smarter. <span className="text-blue-600">Apply Faster.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
            The enterprise-grade recruitment platform powered by machine learning. 
            Automate resume screening, streamline workflows, and find the perfect match instantly.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="h-12 px-8 text-lg" onClick={() => onNavigate('login', 'register')}>Start Hiring Now</Button>
            <Button variant="secondary" className="h-12 px-8 text-lg">View Demo</Button>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
             <FeatureCard icon={Cpu} title="AI Resume Matching" desc="Our Python ML service analyzes resumes and ranks candidates automatically." />
             <FeatureCard icon={Shield} title="Enterprise Security" desc="Role-based access control (RBAC) and JWT authentication standard." />
             <FeatureCard icon={TrendingUp} title="Analytics Dashboard" desc="Real-time insights into hiring pipelines and application status." />
          </div>
        </div>
      </div>
      
      {/* Landing Page Footer */}
      <Footer />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-left hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  );
}

function LoginPage({ mode, onLogin, onNavigate, loading }) {
  const isRegister = mode === 'register';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center cursor-pointer" onClick={() => onNavigate('landing')}>
          <Briefcase className="h-10 w-10 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          {isRegister ? 'Create your account' : 'Sign in to your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {isRegister ? 'Already have an account? ' : 'Or '}
          <button 
            onClick={() => onNavigate('login', isRegister ? 'login' : 'register')} 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isRegister ? 'Sign in' : 'start your 14-day free trial'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          <div className="space-y-6">
             {loading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-sm text-slate-500">Authenticating securely...</p>
                </div>
             ) : (
              <>
                {/* Mock Login Form Fields - Visual Only */}
                {!isRegister && (
                  <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Email address</label>
                        <input type="email" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="user@enterprise.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Password</label>
                        <input type="password" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="••••••••" />
                      </div>
                  </>
                )}

                {isRegister && (
                  <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700">First Name</label>
                          <input type="text" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm sm:text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700">Last Name</label>
                          <input type="text" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm sm:text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Work Email</label>
                        <input type="email" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm sm:text-sm" />
                      </div>
                  </>
                )}

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">{isRegister ? 'Select Role to Join' : 'Sign in with Demo Persona'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                   <button onClick={() => onLogin('candidate')} className="w-full inline-flex items-center justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-blue-400 group transition-all">
                     <div className="bg-blue-100 p-1.5 rounded-full mr-3 group-hover:bg-blue-200"><User className="h-4 w-4 text-blue-600" /></div>
                     Candidate Portal
                     {isRegister && <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />}
                   </button>
                   <button onClick={() => onLogin('recruiter')} className="w-full inline-flex items-center justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-purple-400 group transition-all">
                     <div className="bg-purple-100 p-1.5 rounded-full mr-3 group-hover:bg-purple-200"><Building className="h-4 w-4 text-purple-600" /></div>
                     Recruiter Platform
                     {isRegister && <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />}
                   </button>
                   <button onClick={() => onLogin('admin')} className="w-full inline-flex items-center justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 group transition-all">
                     <div className="bg-slate-100 p-1.5 rounded-full mr-3 group-hover:bg-slate-200"><Shield className="h-4 w-4 text-slate-600" /></div>
                     System Admin
                     {isRegister && <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />}
                   </button>
                </div>
              </>
             )}
          </div>
        </div>
      </div>
      
      {/* Login Page Footer (Simplified) */}
      <footer className="mt-auto py-6 text-center text-sm text-slate-500">
         &copy; {new Date().getFullYear()} EnterpriseHire Inc.
      </footer>
    </div>
  );
}

// --- RECRUITER DASHBOARD (COMPLEX) ---

function RecruiterDashboard({ user }) {
  const [view, setView] = useState('Dashboard');

  useEffect(() => {
    const handler = (e) => setView(e.detail);
    window.addEventListener('recruiter-nav', handler);
    return () => window.removeEventListener('recruiter-nav', handler);
  }, []);

  if (view === 'Candidate Evaluation') return <CandidateEvaluationView />;
  if (view === 'Post a Job') return <JobPostingForm setView={setView} />;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name}</h1>
          <p className="text-slate-500">Here's what's happening at {user.company} today.</p>
        </div>
        <Button onClick={() => setView('Post a Job')} icon={PlusCircle}>Post New Job</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatWidget title="Active Jobs" value="12" change="+2" type="neutral" icon={Briefcase} />
        <StatWidget title="Total Applicants" value="148" change="+24" type="positive" icon={Users} />
        <StatWidget title="Interviews" value="8" change="Today" type="highlight" icon={Clock} />
        <StatWidget title="Hired" value="3" change="This Month" type="positive" icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Card className="h-full" noPadding>
             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
               <h3 className="font-semibold text-slate-800">Recent Applications</h3>
               <button className="text-sm text-blue-600 font-medium hover:text-blue-800">View All</button>
             </div>
             <table className="min-w-full divide-y divide-slate-200">
               <thead className="bg-slate-50">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Match</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-slate-200">
                 {MOCK_CANDIDATES.slice(0,3).map((c) => (
                   <tr key={c.id}>
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{c.name}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{c.role}</td>
                     <td className="px-6 py-4 whitespace-nowrap">
                        <Badge type={c.score > 80 ? 'green' : 'amber'}>{c.score}%</Badge>
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{c.status}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </Card>
        </div>
        <div className="lg:col-span-1">
           <Card title="Subscription" className="h-full">
             <h3 className="font-semibold text-slate-800 mb-4">Current Plan</h3>
             <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
               <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-900">Standard Plan</span>
                  <span className="text-slate-500">$99/mo</span>
               </div>
               <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                 <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
               </div>
               <p className="text-xs text-slate-500">7/10 Job Posts Used</p>
             </div>
             <ul className="space-y-3 mb-6">
               <li className="flex items-center text-sm text-slate-600"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> API Access</li>
               <li className="flex items-center text-sm text-slate-600"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> AI Resume Scoring</li>
               <li className="flex items-center text-sm text-slate-600"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Email Support</li>
             </ul>
             <Button variant="secondary" className="w-full">Upgrade Plan</Button>
           </Card>
        </div>
      </div>
    </div>
  );
}

function CandidateEvaluationView() {
  const [selectedId, setSelectedId] = useState(101);
  const selectedCandidate = MOCK_CANDIDATES.find(c => c.id === selectedId);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
       <div className="mb-4 flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold text-slate-900">Candidate Evaluation</h2>
            <p className="text-sm text-slate-500">Job: Senior Java Developer (ID: #4092)</p>
         </div>
         <div className="flex space-x-2">
            <Button variant="secondary" icon={Filter}>Filter</Button>
            <Button variant="primary" icon={Download}>Export List</Button>
         </div>
       </div>

       <div className="flex-1 flex gap-6 overflow-hidden">
         {/* Left: List */}
         <div className="w-1/3 bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden shadow-sm">
             <div className="p-4 border-b border-slate-200 bg-slate-50">
               <input type="text" placeholder="Search candidates..." className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm" />
             </div>
             <div className="flex-1 overflow-y-auto">
               {MOCK_CANDIDATES.map(c => (
                 <div 
                   key={c.id} 
                   onClick={() => setSelectedId(c.id)}
                   className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${selectedId === c.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
                 >
                    <div className="flex justify-between items-start mb-1">
                       <h4 className={`font-semibold text-sm ${selectedId === c.id ? 'text-blue-900' : 'text-slate-900'}`}>{c.name}</h4>
                       <span className={`text-xs font-bold ${c.score > 80 ? 'text-green-600' : 'text-amber-600'}`}>{c.score}% Match</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{c.role} • {c.experience}</p>
                    <div className="flex flex-wrap gap-1">
                      {c.skills.slice(0,3).map(s => <span key={s} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{s}</span>)}
                    </div>
                 </div>
               ))}
             </div>
         </div>

         {/* Right: Details */}
         <div className="flex-1 bg-white border border-slate-200 rounded-lg overflow-y-auto shadow-sm p-6">
             {selectedCandidate && (
               <div className="space-y-6">
                 {/* Header */}
                 <div className="flex justify-between items-start">
                     <div className="flex items-center">
                        <div className="h-16 w-16 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-600 mr-4">
                          {selectedCandidate.name.charAt(0)}
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-slate-900">{selectedCandidate.name}</h2>
                           <div className="flex items-center text-slate-500 text-sm mt-1">
                              <MapPin className="h-4 w-4 mr-1" /> {selectedCandidate.location}
                              <span className="mx-2">•</span>
                              <Briefcase className="h-4 w-4 mr-1" /> {selectedCandidate.experience} Exp
                           </div>
                        </div>
                     </div>
                     <div className="flex space-x-2">
                        <Button variant="danger">Reject</Button>
                        <Button variant="secondary">Shortlist</Button>
                        <Button variant="primary">Schedule Interview</Button>
                     </div>
                 </div>

                 {/* AI Insights Box */}
                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5">
                     <div className="flex items-center mb-3">
                        <Cpu className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-bold text-blue-900">AI Analysis Report</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <p className="text-xs uppercase text-slate-500 font-semibold mb-1">Match Score</p>
                           <div className="flex items-end">
                              <span className="text-3xl font-bold text-blue-700">{selectedCandidate.score}/100</span>
                              <span className="text-sm text-slate-600 mb-1 ml-2">Strong Fit</span>
                           </div>
                        </div>
                        <div>
                           <p className="text-xs uppercase text-slate-500 font-semibold mb-1">Key Strengths</p>
                           <div className="flex flex-wrap gap-1">
                              <Badge type="green">Spring Boot Expert</Badge>
                              <Badge type="green">Long Tenure</Badge>
                              <Badge type="blue">Local Candidate</Badge>
                           </div>
                        </div>
                     </div>
                 </div>

                 {/* Resume Content Mock */}
                 <div>
                   <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Professional Summary</h3>
                   <p className="text-slate-600 text-sm leading-relaxed">
                     Experienced Java Developer with over {selectedCandidate.experience} of experience in building scalable microservices and distributed systems. 
                     Proven track record at top tier tech companies. Passionate about clean code and cloud native architectures.
                   </p>
                 </div>
                 
                 <div>
                   <h3 className="font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">Technical Skills</h3>
                   <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map(s => <Badge key={s} type="slate" className="px-3 py-1 text-sm">{s}</Badge>)}
                   </div>
                 </div>

                 <div className="h-32 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                     <FileText className="h-5 w-5 mr-2" /> Full Resume Preview PDF
                 </div>
               </div>
             )}
         </div>
       </div>
    </div>
  );
}

function JobPostingForm({ setView }) {
  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex items-center mb-6">
         <button onClick={() => setView('Dashboard')} className="text-slate-400 hover:text-slate-600 mr-4">
           <ChevronRight className="h-6 w-6 rotate-180" />
         </button>
         <h1 className="text-2xl font-bold text-slate-900">Create New Job Posting</h1>
       </div>

       <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Senior Backend Engineer" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <select className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                   <option>Remote</option>
                   <option>New York, NY</option>
                   <option>San Francisco, CA</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
                <select className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                   <option>Full-time</option>
                   <option>Contract</option>
                   <option>Internship</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Salary Range</label>
                <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. $120k - $150k" />
             </div>
         </div>

         <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
             <textarea rows={4} className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Describe the role and responsibilities..." />
         </div>

         <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Required Skills (Comma separated)</label>
             <input type="text" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Java, Spring Boot, AWS..." />
         </div>

         <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
             <Button variant="secondary" onClick={() => setView('Dashboard')}>Save Draft</Button>
             <Button>Publish Job</Button>
         </div>
       </div>
    </div>
  );
}

// --- CANDIDATE DASHBOARD ---

function CandidateDashboard({ user }) {
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, parsing, done

  const handleUpload = () => {
    setUploadState('uploading');
    setTimeout(() => setUploadState('parsing'), 1500);
    setTimeout(() => setUploadState('done'), 3500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Job Feed */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-bold text-slate-800">Recommended Jobs</h2>
           <div className="flex gap-2">
             <span className="text-sm text-slate-500 flex items-center"><MapPin className="h-4 w-4 mr-1"/> Remote</span>
           </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex gap-4 overflow-x-auto">
           <select className="text-sm border-none bg-slate-50 rounded-md px-3 py-1.5 focus:ring-0 text-slate-600 font-medium"><option>Experience</option></select>
           <select className="text-sm border-none bg-slate-50 rounded-md px-3 py-1.5 focus:ring-0 text-slate-600 font-medium"><option>Salary</option></select>
           <select className="text-sm border-none bg-slate-50 rounded-md px-3 py-1.5 focus:ring-0 text-slate-600 font-medium"><option>Tech Stack</option></select>
        </div>

        <div className="space-y-4">
          {MOCK_JOBS.map(job => (
            <Card key={job.id} className="hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-blue-600 cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <div className="flex items-center text-sm text-slate-500 mt-1 mb-2">
                    <Building className="h-4 w-4 mr-1"/> {job.company}
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4 mr-1"/> {job.location}
                    <span className="mx-2">•</span>
                    <span className="text-green-600 font-medium">{job.salary}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {job.skills.map(s => <Badge key={s} type="slate">{s}</Badge>)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="text-center">
                     <span className={`block text-xl font-bold ${job.matchScore > 80 ? 'text-green-600' : 'text-amber-500'}`}>{job.matchScore}%</span>
                     <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Match</span>
                  </div>
                  <Button size="sm">Apply</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column: Profile & AI Upload */}
      <div className="space-y-6">
        {/* Profile Completion */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
           <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold">Profile Strength</h3>
             <span className="text-blue-400 font-bold">85%</span>
           </div>
           <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
             <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
           </div>
           <p className="text-sm text-slate-300 mb-4">Add your certifications to reach 100%.</p>
           <Button variant="secondary" className="w-full text-xs">Update Profile</Button>
        </Card>

        {/* AI Resume Parser */}
        <Card title="AI Resume Optimizer">
          <div className="flex items-center space-x-2 mb-4">
            <Cpu className="h-5 w-5 text-purple-600" />
            <h3 className="font-bold text-slate-800">Smart Resume Sync</h3>
          </div>
          
          {uploadState === 'idle' && (
            <div 
              onClick={handleUpload}
              className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
            >
              <div className="bg-white p-3 rounded-full shadow-sm w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                 <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-slate-700">Click to upload Resume</p>
              <p className="text-xs text-slate-500 mt-1">PDF or DOCX (Max 5MB)</p>
            </div>
          )}

          {uploadState === 'uploading' && (
             <div className="py-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-sm text-slate-600">Uploading secure document...</p>
             </div>
          )}

          {uploadState === 'parsing' && (
             <div className="py-8 text-center">
                <div className="flex justify-center gap-1 mb-4">
                   <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100"></span>
                   <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200"></span>
                </div>
                <p className="text-sm font-semibold text-purple-700">AI Processing Engine</p>
                <p className="text-xs text-slate-500 mt-1">Extracting skills & entities...</p>
             </div>
          )}

          {uploadState === 'done' && (
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 animate-fade-in">
               <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-bold text-green-800">Analysis Complete</span>
               </div>
               <p className="text-sm text-green-700 mb-3">Your resume score increased by 12 points!</p>
               <Button className="w-full bg-green-600 hover:bg-green-700">View Report</Button>
            </div>
          )}
        </Card>

        {/* Application Status Widget */}
        <Card>
           <h3 className="font-bold text-slate-800 mb-4">Application Status</h3>
           <div className="space-y-4">
             <AppStatusRow company="TechCorp" role="Java Dev" status="Interview" date="Today" />
             <AppStatusRow company="AI Solutions" role="Data Sci" status="Pending" date="2d ago" />
             <AppStatusRow company="WebFlow" role="Frontend" status="Rejected" date="1w ago" />
           </div>
        </Card>
      </div>
    </div>
  );
}

function AppStatusRow({ company, role, status, date }) {
  const statusColors = {
    Interview: 'bg-purple-100 text-purple-700',
    Pending: 'bg-amber-100 text-amber-700',
    Rejected: 'bg-red-100 text-red-700',
    Shortlisted: 'bg-blue-100 text-blue-700'
  };

  return (
    <div className="flex items-center justify-between text-sm">
       <div>
         <p className="font-medium text-slate-900">{company}</p>
         <p className="text-xs text-slate-500">{role}</p>
       </div>
       <div className="text-right">
         <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusColors[status]}`}>{status}</span>
         <p className="text-[10px] text-slate-400 mt-0.5">{date}</p>
       </div>
    </div>
  );
}

// --- ADMIN DASHBOARD ---

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatWidget title="Total Revenue" value="$45.2k" change="+12%" type="positive" icon={DollarSign} />
        <StatWidget title="Total Users" value="2,543" change="+54" type="positive" icon={Users} />
        <StatWidget title="Jobs Posted" value="85" change="-2" type="negative" icon={Briefcase} />
        <StatWidget title="Server Health" value="99.9%" change="Stable" type="positive" icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Microservices Status">
          <h3 className="font-bold text-slate-800 mb-4">Infrastructure Health</h3>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 border border-slate-100 rounded bg-slate-50">
                <div className="flex items-center">
                   <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                   <span className="font-medium text-slate-700">Auth Service (Java/Spring)</span>
                </div>
                <span className="text-xs font-mono text-slate-500">23ms</span>
             </div>
             <div className="flex justify-between items-center p-3 border border-slate-100 rounded bg-slate-50">
                <div className="flex items-center">
                   <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                   <span className="font-medium text-slate-700">Core Job Service (Java)</span>
                </div>
                <span className="text-xs font-mono text-slate-500">45ms</span>
             </div>
             <div className="flex justify-between items-center p-3 border border-slate-100 rounded bg-slate-50">
                <div className="flex items-center">
                   <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3 animate-pulse"></div>
                   <span className="font-medium text-slate-700">ML Engine (Python/FastAPI)</span>
                </div>
                <span className="text-xs font-mono text-slate-500">High Load (120ms)</span>
             </div>
          </div>
        </Card>
        
        <Card>
          <h3 className="font-bold text-slate-800 mb-4">Recent Audit Logs</h3>
          <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex text-sm border-b border-slate-100 pb-2 last:border-0">
                  <span className="text-slate-400 font-mono text-xs mr-3">10:4{i} AM</span>
                  <span className="text-slate-700">User <span className="font-medium">admin_01</span> updated system config.</span>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// --- UTILS ---

function StatWidget({ title, value, change, type, icon: Icon }) {
  const colors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-slate-500',
    highlight: 'text-blue-600'
  };

  return (
    <Card>
      <div className="flex justify-between items-start mb-2">
         <div className="p-2 bg-slate-50 rounded-lg">
           <Icon className="h-5 w-5 text-slate-500" />
         </div>
         <span className={`text-xs font-bold ${colors[type]}`}>{change}</span>
      </div>
      <div className="mt-2">
         <h4 className="text-slate-500 text-xs font-medium uppercase tracking-wide">{title}</h4>
         <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </Card>
  );
}