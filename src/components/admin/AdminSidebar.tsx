import { LayoutDashboard, Gift, QrCode, Target, Users, BarChart3, Settings, ChevronRight } from 'lucide-react';
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

const menuItems = [
  { title: 'Dashboard', key: 'dashboard', icon: LayoutDashboard },
  { title: 'Drops', key: 'drops', icon: Gift },
  { title: 'QR Codes', key: 'qrcodes', icon: QrCode },
  { title: 'Missões', key: 'missions', icon: Target },
  { title: 'Influenciadores', key: 'influencers', icon: Users },
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

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="glass-sidebar border-r border-border/30">
        {/* Logo */}
        <div className={`px-4 py-5 border-b border-border/20 ${collapsed ? 'px-2' : ''}`}>
          <div className={`${collapsed ? 'text-center' : ''}`}>
            <span className="font-['Nunito'] font-black text-xl text-accent" style={{ fontWeight: 900 }}>
              {collapsed ? 'C' : 'CIMED'}
            </span>
            {!collapsed && <span className="font-['Nunito'] font-black text-xl text-foreground" style={{ fontWeight: 900 }}>GO</span>}
          </div>
          {!collapsed && <p className="text-[10px] text-muted-foreground/60 mt-0.5 tracking-widest uppercase">Admin Panel</p>}
        </div>

        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] text-muted-foreground/40 uppercase tracking-widest px-4 mb-1">
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
                      className={`cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'bg-accent text-accent-foreground font-bold shadow-sm active-glow-bar'
                          : 'text-muted-foreground/70 hover:bg-accent/10 hover:text-foreground'
                      }`}
                    >
                      <item.icon className={`mr-2 h-4 w-4 ${isActive ? 'text-accent-foreground' : ''}`} />
                      {!collapsed && <span className="flex-1 text-sm">{item.title}</span>}
                      {!collapsed && item.hasSubmenu && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
