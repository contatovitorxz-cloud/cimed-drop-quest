import { LayoutDashboard, Gift, QrCode, Target, Users, BarChart3, Settings } from 'lucide-react';
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
import cimedLogo from '@/assets/cimed-logo.svg';

const menuItems = [
  { title: 'Dashboard', key: 'dashboard', icon: LayoutDashboard },
  { title: 'Drops', key: 'drops', icon: Gift },
  { title: 'QR Codes', key: 'qrcodes', icon: QrCode },
  { title: 'Missões', key: 'missions', icon: Target },
  { title: 'Influenciadores', key: 'influencers', icon: Users },
  { title: 'Analytics', key: 'analytics', icon: BarChart3 },
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
      <SidebarContent>
        <div className={`px-4 py-5 border-b border-sidebar-border ${collapsed ? 'px-2' : ''}`}>
          <img src={cimedLogo} alt="Cimed GO" className={`${collapsed ? 'w-8 mx-auto' : 'h-7'}`} />
          {!collapsed && <p className="text-[10px] text-sidebar-foreground/60 mt-1 tracking-widest uppercase">Admin Panel</p>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.key)}
                    className={`cursor-pointer ${activeSection === item.key ? 'bg-sidebar-accent text-accent font-medium' : 'hover:bg-sidebar-accent/50'}`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
