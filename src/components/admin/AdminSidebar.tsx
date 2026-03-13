import { LayoutDashboard, Gift, QrCode, Target, Users, BarChart3, Settings, ChevronRight, Sun, Moon, UserCircle, Megaphone } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';

const menuItems = [
  { title: 'Dashboard', key: 'dashboard', icon: LayoutDashboard },
  { title: 'Campanha Nacional', key: 'campanha', icon: Megaphone, highlight: true },
  { title: 'Drops', key: 'drops', icon: Gift },
  { title: 'QR Codes', key: 'qrcodes', icon: QrCode },
  { title: 'Missões', key: 'missions', icon: Target },
  { title: 'Influenciadores', key: 'influencers', icon: Users },
  { title: 'Perfis', key: 'profiles', icon: UserCircle },
  { title: 'Analytics', key: 'analytics', icon: BarChart3, hasSubmenu: true },
  { title: 'Configurações', key: 'settings', icon: Settings },
];

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebar border-r-[3px] border-sidebar-border">
        {/* Logo */}
        <div className={`px-4 py-5 border-b-[3px] border-sidebar-border ${collapsed ? 'px-2' : ''}`}>
          <div className={`${collapsed ? 'text-center' : ''}`}>
            <span className="font-nunito font-black text-xl text-accent">
              {collapsed ? 'C' : 'CIMED'}
            </span>
            {!collapsed && <span className="font-nunito font-black text-xl text-sidebar-foreground"> GO</span>}
          </div>
          {!collapsed && <p className="text-[10px] text-muted-foreground mt-0.5 tracking-widest uppercase font-bold">Admin Panel</p>}
        </div>

        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] text-muted-foreground uppercase tracking-widest px-4 mb-1 font-bold">
              Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.key)}
                      className={`cursor-pointer transition-all duration-150 rounded-none ${
                        isActive
                          ? 'bg-accent text-accent-foreground font-black border-l-[3px] border-accent-foreground'
                          : item.highlight
                          ? 'text-accent font-black hover:bg-accent/10 border-l-[3px] border-accent'
                          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground font-bold'
                      }`}
                    >
                      <item.icon className={`mr-2 h-4 w-4 ${isActive ? 'text-accent-foreground' : item.highlight ? 'text-accent' : ''}`} />
                      {!collapsed && (
                        <span className="flex-1 text-sm uppercase tracking-wider flex items-center gap-1.5">
                          {item.title}
                          {item.highlight && !isActive && (
                            <span className="text-[7px] bg-accent text-accent-foreground px-1 py-0 font-black leading-tight">NOVO</span>
                          )}
                        </span>
                      )}
                      {!collapsed && item.hasSubmenu && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Theme toggle at bottom */}
        <div className="mt-auto px-3 py-4 border-t-[3px] border-sidebar-border">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`flex items-center gap-2 w-full px-3 py-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all ${collapsed ? 'justify-center px-0' : ''}`}
          >
            {isDark ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
            {!collapsed && <span>{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
