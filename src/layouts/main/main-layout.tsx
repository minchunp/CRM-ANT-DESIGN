import { Button, Layout, Menu, Avatar, Dropdown, type MenuProps } from "antd";
import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { pathRoute } from "../../constants/path";
import { LayoutDashboard, Search, Settings, LogOut, User, ChevronRight, Sparkles, TextAlignJustify, ListTodo, CalendarRange } from "lucide-react";
import logo from "../../assets/vite.svg";
import { useAppContext } from "../../context/AppContext";
import { clearLS } from "../../utils/localStorage";
import { useGlobalMessage } from "../../context/MessageContext";
import ThemeToggle from "../../components/theme-toggle";
import "./styles/main-layout.style.css";

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
   children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
   const { reset, profile } = useAppContext();
   const message = useGlobalMessage();
   const location = useLocation();
   const [collapsed, setCollapsed] = useState(false);
   type MenuItem = Required<MenuProps>["items"][number];

   const handleLogout = () => {
      message.success("Logged out successfully");
      reset();
      clearLS();
   };

   const menuItems = useMemo(
      () => [
         {
            key: "dashboard",
            path: pathRoute.dashboard,
            label: <Link to={pathRoute.dashboard}>Dashboard</Link>,
            icon: <LayoutDashboard size={18} />,
         },
         {
            key: "todolist",
            path: pathRoute.todolist,
            label: <Link to={pathRoute.todolist}>To-Do List</Link>,
            icon: <ListTodo size={18} />,
         },
         {
            key: "calendar",
            path: pathRoute.calendar,
            label: <Link to={pathRoute.calendar}>Calendar</Link>,
            icon: <CalendarRange size={18} />,
         },
      ],
      []
   );

   const items = menuItems.map((item) => {
      const { path, ...rest } = item;
      console.log(path);

      return rest;
   }) as MenuItem[];

   const selectedKey = useMemo(() => {
      const currentPath = location.pathname;
      const foundItem = menuItems.find((item) => item.path === currentPath);

      return foundItem?.key || "dashboard";
   }, [location.pathname, menuItems]);

   const userMenuItems = [
      {
         key: "profile",
         icon: <User size={16} />,
         label: "Profile",
      },
      {
         key: "settings",
         icon: <Settings size={16} />,
         label: "Settings",
      },
      {
         type: "divider" as const,
      },
      {
         key: "logout",
         icon: <LogOut size={16} />,
         label: "Logout",
         danger: true,
         onClick: handleLogout,
      },
   ];

   return (
      <Layout className="h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>
         <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ opacity: "var(--mesh-opacity)" }}>
            <div
               className="absolute inset-0"
               style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--mesh-color) 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
               }}
            ></div>
         </div>

         {/* Sidebar - Fixed */}
         <Sider
            breakpoint="lg"
            width={280}
            collapsedWidth={80}
            className="border-r relative z-10 transition-all duration-300 ease-in-out overflow-hidden"
            style={{
               background: "var(--bg-sidebar)",
               backdropFilter: "blur(40px)",
               borderColor: "var(--border-primary)",
               boxShadow: "var(--shadow-sm)",
               willChange: "width",
               height: "100vh",
               position: "fixed",
               left: 0,
               top: 0,
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
         >
            <div className="h-full flex flex-col">
               {/* Logo Section */}
               <div
                  className="h-16 flex items-center px-6 gap-3 border-b transition-all duration-300 ease-out shrink-0"
                  style={{ borderColor: "var(--border-primary)" }}
               >
                  <div className="relative transition-all duration-300 ease-out" style={{ willChange: "transform" }}>
                     {!collapsed ? (
                        <div className="relative w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-[10px] flex items-center justify-center shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                           <img src={logo} alt="Logo" className="w-6 h-6 brightness-0 invert transition-transform duration-300" />
                        </div>
                     ) : (
                        <div className="relative w-9 h-9 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                           <img src={logo} alt="Logo" className="w-5 h-5 brightness-0 invert" />
                        </div>
                     )}
                  </div>
                  {!collapsed && (
                     <div className="flex flex-col opacity-0 animate-fadeIn" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                        <span className="text-base font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                           CRM To-Do List
                        </span>
                        <span className="text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>
                           Dashboard v2.0
                        </span>
                     </div>
                  )}
               </div>

               {/* Scrollable Content */}
               <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "thin" }}>
                  {/* Quick Stats Card */}
                  {!collapsed && (
                     <div className="px-4 pt-5 pb-3 opacity-0 animate-fadeIn" style={{ animationDelay: "150ms", animationFillMode: "forwards" }}>
                        <div
                           className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group"
                           style={{ willChange: "transform" }}
                        >
                           <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full"></div>
                           <div className="relative">
                              <div className="flex items-center gap-2 mb-3">
                                 <Sparkles size={14} className="opacity-90" />
                                 <span className="text-xs font-medium opacity-90 tracking-wide">OVERVIEW</span>
                              </div>
                              <div className="text-3xl font-semibold mb-1 tracking-tight">24</div>
                              <div className="text-xs opacity-80 font-medium">8 pending · 16 completed</div>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Menu */}
                  <div className="px-3 pt-2">
                     <Menu
                        className="border-none"
                        style={{
                           background: "transparent",
                           transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        items={items}
                     />
                  </div>

                  {/* Premium Card */}
                  {!collapsed && (
                     <div className="px-3 pb-4 mt-4 opacity-0 animate-fadeIn" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                        <div
                           className="rounded-2xl p-4 relative overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01] group border"
                           style={{
                              background: "var(--bg-card)",
                              backdropFilter: "blur(20px)",
                              borderColor: "var(--border-primary)",
                              willChange: "transform",
                           }}
                        >
                           <div className="absolute top-0 right-0 text-5xl opacity-5 select-none">✨</div>
                           <div className="relative">
                              <div className="text-sm font-semibold mb-1 tracking-tight" style={{ color: "var(--text-primary)" }}>
                                 Upgrade to Pro
                              </div>
                              <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                 Unlock premium features and unlimited access
                              </p>
                              <button
                                 className="w-full text-white text-xs font-semibold py-2.5 rounded-xl transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                                 style={{
                                    color: "var(--bg-primary)",
                                    background: "var(--text-primary)",
                                    willChange: "transform",
                                 }}
                              >
                                 Upgrade Now
                              </button>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </Sider>

         <Layout
            className="relative z-0"
            style={{
               background: "transparent",
               marginLeft: collapsed ? 80 : 280,
               transition: "margin-left 0.3s ease-in-out",
               height: "100vh",
               display: "flex",
               flexDirection: "column",
            }}
         >
            {/* Header - Fixed */}
            <Header
               className="border-b px-6 flex items-center justify-between h-16 transition-all duration-300 shrink-0"
               style={{
                  background: "var(--bg-header)",
                  backdropFilter: "blur(40px)",
                  borderColor: "var(--border-primary)",
                  boxShadow: "var(--shadow-sm)",
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
               }}
            >
               <div className="flex items-center gap-4">
                  <Button
                     type="text"
                     className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-95"
                     style={{
                        color: "var(--text-secondary)",
                        willChange: "transform",
                     }}
                     onClick={() => setCollapsed(!collapsed)}
                  >
                     <TextAlignJustify className="h-5 w-5" />
                  </Button>

                  {/* Breadcrumb */}
                  <div className="hidden md:flex items-center gap-2 text-sm">
                     <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
                        Dashboard
                     </span>
                     <ChevronRight size={14} style={{ color: "var(--text-tertiary)" }} />
                     <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                        Overview
                     </span>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  {/* Search Bar */}
                  <button
                     className="hidden md:flex items-center gap-3 border rounded-xl px-4 h-9 transition-all duration-200 group active:scale-[0.98]"
                     style={{
                        background: "var(--bg-card)",
                        borderColor: "var(--border-primary)",
                        willChange: "transform",
                     }}
                  >
                     <Search size={15} style={{ color: "var(--text-tertiary)" }} className="group-hover:opacity-80 transition-opacity duration-200" />
                     <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Search
                     </span>
                     <kbd
                        className="hidden lg:inline-flex border rounded-md px-2 py-0.5 text-xs font-semibold shadow-sm"
                        style={{
                           background: "var(--bg-card)",
                           borderColor: "var(--border-secondary)",
                           color: "var(--text-tertiary)",
                        }}
                     >
                        ⌘K
                     </kbd>
                  </button>

                  <ThemeToggle />

                  {/* User Dropdown */}
                  <Dropdown menu={{ items: userMenuItems }} trigger={["click"]} placement="bottomRight">
                     <div
                        className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-xl cursor-pointer transition-all duration-200 group active:scale-[0.98]"
                        style={{ willChange: "transform" }}
                     >
                        <div className="relative">
                           <Avatar
                              size={36}
                              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                              className="border-2 border-white shadow-sm transition-all duration-200 group-hover:shadow-md"
                           />
                           <div className="absolute bottom-3 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="hidden lg:flex flex-col">
                           <span className="text-sm font-semibold transition-colors duration-200" style={{ color: "var(--text-primary)" }}>
                              {profile?.name}
                           </span>
                           <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                              Administrator
                           </span>
                        </div>
                        <ChevronRight
                           size={14}
                           style={{ color: "var(--text-tertiary)" }}
                           className="hidden lg:block transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                     </div>
                  </Dropdown>
               </div>
            </Header>

            {/* Main Content - Scrollable */}
            <Content className="p-5 relative flex-1 overflow-y-auto">
               <div
                  className="rounded-3xl border p-8 min-h-full relative overflow-hidden transition-all duration-300"
                  style={{
                     background: "var(--bg-card)",
                     backdropFilter: "blur(40px)",
                     borderColor: "var(--border-primary)",
                     boxShadow: "var(--shadow-md)",
                     willChange: "transform",
                  }}
               >
                  <div
                     className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
                     style={{
                        background: "var(--gradient-overlay)",
                        opacity: 0.6,
                     }}
                  ></div>

                  <div className="relative">{children}</div>
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};

export default MainLayout;
