'use client';

import { ReactNode, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Settings, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  Gift,
  LogOut,
  Users,
  Loader2,
  FileText,
  MessageSquare,
  Tag,
  Scale,
  PanelLeftClose,
  PanelLeft,
  Palmtree,
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  superadminOnly?: boolean;
  writerAllowed?: boolean;
  roles?: string[];
}

const navItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/addons', label: 'Add-ons', icon: Gift },
  { href: '/admin/promo-codes', label: 'Promo Codes', icon: Tag },
  { href: '/admin/blog', label: 'Blog', icon: FileText, writerAllowed: true },
  { href: '/admin/contacts', label: 'Contacts', icon: MessageSquare },
  { href: '/admin/legal', label: 'Legal Content', icon: Scale },
  { href: '/admin/users', label: 'Users', icon: Users, superadminOnly: true },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, adminUser, loading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Skip auth check for login page
  const isLoginPage = pathname === '/admin/login';

  // Set mounted state on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // All useEffect hooks must be at the top, before any conditional returns
  useEffect(() => {
    if (!loading && !isLoginPage && !adminUser) {
      router.push('/admin/login');
    }
  }, [loading, adminUser, isLoginPage, router]);

  // Writer role redirect - must be before any returns
  useEffect(() => {
    if (!loading && adminUser?.role === 'writer' && !pathname.startsWith('/admin/blog')) {
      router.push('/admin/blog');
    }
  }, [loading, adminUser?.role, pathname, router]);

  const handleSignOut = async () => {
    await signOut();
  };

  const filteredNavItems = navItems.filter(item => {
    const userRole = adminUser?.role;
    
    // Writers can only access blog
    if (userRole === 'writer') {
      return item.writerAllowed === true;
    }
    
    // Superadmin-only items
    if (item.superadminOnly && userRole !== 'superadmin') {
      return false;
    }
    
    return true;
  });

  // Show loading state only if there's no cached admin user or not yet mounted
  if (!mounted || (loading && !isLoginPage && !adminUser)) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // For login page, just render children without the layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not authenticated and not loading, don't render anything (redirect will happen)
  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 transform transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Decorative palm tree */}
        {!sidebarCollapsed && (
          <div className="absolute top-32 right-2 opacity-10 pointer-events-none">
            <Palmtree className="w-20 h-20 text-emerald-400" />
          </div>
        )}
        
        {/* Logo */}
        <div className="flex items-center justify-center h-20 px-3 border-b border-white/10 relative">
          <Link href="/admin" className="flex items-center justify-center gap-3 w-full">
            {sidebarCollapsed ? (
              <div className="w-10 h-10 rounded-full bg-emerald-400/20 border-2 border-emerald-400/40 flex items-center justify-center">
                <span className="font-heading text-lg font-bold text-emerald-400">BB</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-400/20 border-2 border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-xl font-bold text-emerald-400">BB</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-lg font-bold text-white leading-tight">Banana Beach</span>
                  <span className="text-xs text-emerald-400/80 tracking-wider">KOH HEY • PHUKET</span>
                </div>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className={`p-4 space-y-1 ${sidebarCollapsed ? 'px-2' : ''}`}>
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  sidebarCollapsed ? 'justify-center px-2' : ''
                } ${
                  isActive
                    ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-emerald-400' : ''}`} />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle Button - Desktop only */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`hidden lg:flex w-full items-center gap-3 px-4 py-3 text-white/70 hover:bg-emerald-400/10 hover:text-emerald-400 rounded-xl transition-colors ${
              sidebarCollapsed ? 'justify-center px-2' : ''
            }`}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <PanelLeft className="w-5 h-5" />
            ) : (
              <>
                <PanelLeftClose className="w-5 h-5" />
                <span className="font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-8 border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 lg:ml-0" />
          
          {/* User Menu with Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-800">
                  {adminUser?.full_name || adminUser?.email?.split('@')[0] || 'Admin'}
                </p>
                <p className="text-xs text-emerald-600 capitalize font-medium">{adminUser?.role || 'Admin'}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-400/30">
                <span className="text-white font-bold text-sm">
                  {adminUser?.full_name?.[0]?.toUpperCase() || adminUser?.email?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 sm:hidden bg-slate-50">
                  <p className="text-sm font-medium text-slate-800">
                    {adminUser?.full_name || adminUser?.email?.split('@')[0] || 'Admin'}
                  </p>
                  <p className="text-xs text-emerald-600 capitalize font-medium">{adminUser?.role || 'Admin'}</p>
                </div>
                <Link
                  href="/"
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Palmtree className="w-4 h-4" />
                  <span className="font-medium">View Website</span>
                </Link>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
