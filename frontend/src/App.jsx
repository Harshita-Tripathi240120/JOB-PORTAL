import React, { useState, useEffect } from 'react';
import { 
  Briefcase, User, FileText, CheckCircle, TrendingUp, Users, Building, 
  LogOut, PlusCircle, Search, Cpu, Shield, DollarSign, Menu, MapPin, 
  Clock, Filter, ChevronRight, Download, AlertCircle, CreditCard, BarChart2, 
  ArrowRight, Loader2, Mail, Lock
} from 'lucide-react';

// --- REAL BACKEND CONNECTIONS ---

const API_JAVA = "http://localhost:8080/api";
const API_PYTHON = "http://localhost:8000";

const JavaService = {
  login: async (credentials) => {
    try {
      // credentials can be { role: '...' } OR { email, password }
      const res = await fetch(`${API_JAVA}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Login failed");
      }
      return await res.json();
    } catch (err) {
      console.error("Java Backend Error:", err);
      // Fallback only if we really can't connect (for demo resilience)
      if (credentials.role && !credentials.email) {
         return { 
          name: "Offline Demo User", 
          role: credentials.role, 
          avatar: "OF",
          token: "offline-token"
        };
      }
      throw err; // Re-throw real errors
    }
  },
  register: async (userData) => {
    try {
      const res = await fetch(`${API_JAVA}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!res.ok) {
         const err = await res.json();
         throw new Error(err.error || "Registration failed");
      }
      
      // Auto-login after successful registration
      return await JavaService.login({ 
        email: userData.email, 
        password: userData.password 
      });

    } catch (err) {
      console.error("Registration Error:", err);
      return null;
    }
  },
  getJobs: async () => {
    try {
      const res = await fetch(`${API_JAVA}/jobs`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return await res.json();
    } catch (err) {
      console.error("Java Backend Error:", err);
      return []; 
    }
  },
  postJob: async (job) => {
    try {
      const res = await fetch(`${API_JAVA}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
      });
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  }
};

const PythonService = {
  analyzeResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch(`${API_PYTHON}/analyze-resume`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error("ML Service Error");
      return await res.json();
    } catch (err) {
      console.error("Python Backend Error:", err);
      alert("Could not connect to Python ML Service (Port 8000). Is it running?");
      return null;
    }
  }
};

// --- COMPONENTS ---

const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`bg-white rounded-lg border border-slate-200 shadow-sm ${noPadding ? '' : 'p-6'} ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[type] || colors.blue}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = 'primary', onClick, disabled, className = "" }) => {
  const variants = {
    primary: 'bg-blue-700 hover:bg-blue-800 text-white',
    secondary: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${variants[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// --- MAIN APP ---

export default function JobPortalApp() {
  const [currentView, setCurrentView] = useState('landing'); // landing, login, register, app
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Quick Login (Demo Buttons)
  const handleQuickLogin = async (role) => {
    const userData = await JavaService.login({ role });
    setUser(userData);
    setCurrentView('app');
  };

  // Full Form Login
  const handleFullLogin = async (email, password) => {
    try {
        const userData = await JavaService.login({ email, password });
        setUser(userData);
        setCurrentView('app');
    } catch (err) {
        alert("Login failed: " + err.message);
    }
  };

  // Registration
  const handleRegister = async (formData) => {
    const userData = await JavaService.register(formData);
    if (userData) {
      setUser(userData);
      setCurrentView('app');
    } else {
        alert("Registration failed! Email might already be in use.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  if (currentView === 'landing') return <LandingPage onNavigate={setCurrentView} />;
  if (currentView === 'login') return <AuthPage mode="login" onQuickLogin={handleQuickLogin} onFullLogin={handleFullLogin} onNavigate={setCurrentView} />;
  if (currentView === 'register') return <AuthPage mode="register" onRegister={handleRegister} onNavigate={setCurrentView} />;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="h-16 flex items-center px-6 bg-slate-950">
          <Briefcase className="h-6 w-6 text-blue-500 mr-2" />
          <span className="text-xl font-bold text-white">Enterprise<span className="text-blue-500">Hire</span></span>
        </div>
        <div className="p-4">
           {user.role === 'candidate' && <div className="text-xs font-bold text-slate-500 mb-4 tracking-wider uppercase">Candidate Menu</div>}
           {user.role === 'recruiter' && <div className="text-xs font-bold text-slate-500 mb-4 tracking-wider uppercase">Recruiter Menu</div>}
           
           <div className="space-y-1">
             <button className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md bg-blue-900/50 text-white">
               <BarChart2 className="mr-3 h-5 w-5 text-blue-400" /> Dashboard
             </button>
             {user.role === 'recruiter' && (
               <>
                 <button className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800">
                   <PlusCircle className="mr-3 h-5 w-5 text-slate-400" /> Post Job
                 </button>
                 <button className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800">
                   <Users className="mr-3 h-5 w-5 text-slate-400" /> Candidates
                 </button>
               </>
             )}
              {user.role === 'candidate' && (
               <>
                 <button className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800">
                   <Search className="mr-3 h-5 w-5 text-slate-400" /> Find Jobs
                 </button>
                 <button className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800">
                   <FileText className="mr-3 h-5 w-5 text-slate-400" /> My Applications
                 </button>
               </>
             )}
           </div>
        </div>
        <div className="absolute bottom-0 w-full p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
           <div className="flex items-center">
             <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2">
               {user.firstName ? user.firstName.charAt(0) : "U"}
             </div>
             <div className="text-sm font-medium text-white truncate w-24">{user.name}</div>
           </div>
           <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors"><LogOut className="h-5 w-5" /></button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm border-b border-slate-200 h-16 flex items-center justify-between px-6">
           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden"><Menu/></button>
           <div className="flex items-center text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Systems Online
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
           {user.role === 'candidate' ? <CandidateDashboard /> : <RecruiterDashboard />}
        </main>
      </div>
    </div>
  );
}

// --- DASHBOARDS ---

function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  const [uploadState, setUploadState] = useState('idle');
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    // FETCH JOBS FROM JAVA BACKEND
    JavaService.getJobs().then(data => setJobs(data));
  }, []);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadState('uploading');
    
    // CALL PYTHON ML SERVICE
    const result = await PythonService.analyzeResume(file);
    
    if (result) {
      setAiResult(result);
      setUploadState('done');
    } else {
      setUploadState('idle');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Available Jobs (From Java DB)</h2>
        {jobs.length === 0 && <p className="text-slate-500">Loading jobs from Backend...</p>}
        {jobs.map(job => (
          <Card key={job.id} className="hover:shadow-md transition-all border-l-4 border-l-blue-600">
             <div className="flex justify-between items-start">
                <div>
                   <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                   <div className="text-sm text-slate-500 mt-1">{job.company} • {job.location} • {job.salary}</div>
                   <div className="flex gap-2 mt-3">
                      {job.skills && job.skills.map(s => <Badge key={s} type="slate">{s}</Badge>)}
                   </div>
                </div>
                <Button size="sm">Apply</Button>
             </div>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <Card title="AI Resume Optimizer">
          <div className="flex items-center space-x-2 mb-4">
            <Cpu className="h-5 w-5 text-purple-600" />
            <h3 className="font-bold text-slate-800">AI Resume Scorer</h3>
          </div>
          
          {uploadState === 'idle' && (
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 relative">
              <input type="file" onChange={handleResumeUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">Upload Resume (PDF)</p>
            </div>
          )}

          {uploadState === 'uploading' && (
             <div className="py-8 text-center">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-2" />
                <p className="text-sm text-slate-600">Analyzing via Python ML...</p>
             </div>
          )}

          {uploadState === 'done' && aiResult && (
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
               <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-green-800">Match Score</span>
                  <span className="text-2xl font-bold text-green-700">{aiResult.score}/100</span>
               </div>
               <div className="text-xs text-green-700 mb-2">Role: {aiResult.recommendedRole}</div>
               <div className="flex flex-wrap gap-1">
                 {aiResult.extractedSkills.map(s => <Badge key={s} type="purple">{s}</Badge>)}
               </div>
               <Button onClick={() => setUploadState('idle')} variant="ghost" className="mt-4 w-full text-xs">Analyze Another</Button>
            </div>
          )}
        </Card>
        
        <Card>
          <h3 className="font-bold text-slate-800 mb-3">Application Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">TechCorp</span>
              <Badge type="green">Interview</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">DataAI Inc</span>
              <Badge type="slate">Pending</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function RecruiterDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Recruiter Dashboard</h2>
        <Button onClick={() => alert("Requires Java Post Job Endpoint")}>Post New Job</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
           <div className="text-3xl font-bold text-blue-600 mb-1">12</div>
           <div className="text-sm text-slate-500">Active Jobs</div>
        </Card>
        <Card className="text-center">
           <div className="text-3xl font-bold text-purple-600 mb-1">148</div>
           <div className="text-sm text-slate-500">Total Applicants</div>
        </Card>
        <Card className="text-center">
           <div className="text-3xl font-bold text-green-600 mb-1">8</div>
           <div className="text-sm text-slate-500">Interviews Today</div>
        </Card>
      </div>

      <Card>
        <h3 className="font-bold text-slate-800 mb-4">Recent Candidates</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Match Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">John Doe</td>
                <td className="px-4 py-3">Java Dev</td>
                <td className="px-4 py-3"><span className="text-green-600 font-bold">95%</span></td>
                <td className="px-4 py-3"><Badge type="purple">Interview</Badge></td>
                <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">View</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium">Alice Smith</td>
                <td className="px-4 py-3">Python ML</td>
                <td className="px-4 py-3"><span className="text-blue-600 font-bold">88%</span></td>
                <td className="px-4 py-3"><Badge type="slate">New</Badge></td>
                <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">View</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// --- AUTHENTICATION SCREENS ---

function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center">
       <div className="mb-8">
         <Briefcase className="h-16 w-16 text-blue-500 mx-auto mb-4" />
         <h1 className="text-5xl font-extrabold mb-6">Enterprise<span className="text-blue-500">Hire</span></h1>
         <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
           The enterprise-grade recruitment platform powered by machine learning. 
           Automate resume screening, streamline workflows, and find the perfect match instantly.
         </p>
       </div>
       <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
         <button onClick={() => onNavigate('login')} className="px-8 py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition w-full sm:w-auto">Log In</button>
         <button onClick={() => onNavigate('register')} className="px-8 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition w-full sm:w-auto">Create Account</button>
       </div>
       <p className="mt-8 text-sm text-slate-500">Powered by Java Spring Boot & Python FastAPI</p>
    </div>
  );
}

function AuthPage({ mode, onQuickLogin, onFullLogin, onRegister, onNavigate }) {
  const isRegister = mode === 'register';
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'candidate' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      onRegister(formData);
    } else {
      onFullLogin(formData.email, formData.password);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <button onClick={() => onNavigate('landing')} className="mb-6 text-slate-400 hover:text-slate-600 flex items-center text-sm">
          <ArrowRight className="h-4 w-4 mr-1 rotate-180" /> Back to Home
        </button>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="text-slate-500 mb-8 text-sm">
          {isRegister ? 'Join thousands of professionals finding their dream job.' : 'Enter your details to access your account.'}
        </p>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          {isRegister && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">First Name</label>
                <input name="firstName" required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jane" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Last Name</label>
                <input name="lastName" required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" onChange={handleChange} />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input type="email" name="email" required className="w-full pl-9 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="you@company.com" onChange={handleChange} />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input type="password" name="password" required className="w-full pl-9 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" onChange={handleChange} />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">I am a...</label>
              <select name="role" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white" onChange={handleChange} value={formData.role}>
                <option value="candidate">Job Seeker (Candidate)</option>
                <option value="recruiter">Hiring Manager (Recruiter)</option>
              </select>
            </div>
          )}

          <Button className="w-full py-2.5 text-base">{isRegister ? 'Sign Up' : 'Sign In'}</Button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center text-sm text-slate-500 mb-6">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={() => onNavigate(isRegister ? 'login' : 'register')} className="text-blue-600 font-bold hover:underline">
            {isRegister ? 'Log In' : 'Sign Up'}
          </button>
        </div>

        {/* Quick Demo Section (Only on Login) */}
        {!isRegister && (
          <div className="pt-6 border-t border-slate-100">
            <p className="text-xs text-center text-slate-400 uppercase font-bold tracking-wider mb-4">Or use Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => onQuickLogin('candidate')} className="p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-200 text-left transition-colors group">
                <div className="font-bold text-slate-900 text-sm group-hover:text-blue-700">Candidate</div>
                <div className="text-xs text-slate-500">Resume Parser</div>
              </button>
              <button onClick={() => onQuickLogin('recruiter')} className="p-3 border rounded-lg hover:bg-purple-50 hover:border-purple-200 text-left transition-colors group">
                <div className="font-bold text-slate-900 text-sm group-hover:text-purple-700">Recruiter</div>
                <div className="text-xs text-slate-500">Job Dashboard</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}