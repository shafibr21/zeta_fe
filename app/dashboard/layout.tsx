"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  LayoutDashboard,
  Menu,
  X,
  BookOpen,
  ChevronRight,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Overview & Analytics",
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: Users,
      description: "User Management",
    },
    {
      name: "Posts",
      href: "/dashboard/posts",
      icon: BookOpen,
      description: "Blog Posts",
    },
  ];

  // Animation variants
  const sidebarVariants = {
    expanded: {
      width: 256, // 64 * 4 = w-64
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
    collapsed: {
      width: 64, // 16 * 4 = w-16
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
    mobile: {
      width: sidebarOpen ? 256 : 0,
      transition: {
        duration: 0.4,
        type: "spring" as const,
        stiffness: 120,
      },
    },
  };

  const logoVariants = {
    expanded: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
    collapsed: {
      opacity: 0,
      scale: 0.8,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const menuButtonVariants = {
    expanded: {
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        stiffness: 200,
      },
    },
    collapsed: {
      rotate: 180,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        stiffness: 200,
      },
    },
  };

  const navItemVariants = {
    expanded: {
      justifyContent: "flex-start",
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
    },
    collapsed: {
      justifyContent: "center",
      transition: {
        duration: 0.3,
      },
    },
  };

  const footerVariants = {
    expanded: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        delay: 0.3,
      },
    },
    collapsed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-950">
      {/* Sidebar */}
      <motion.aside
        className="relative z-50 flex flex-col bg-gray-900/80 backdrop-blur-sm border-r border-gray-800 overflow-hidden"
        variants={sidebarVariants}
        animate={isMobile ? "mobile" : sidebarOpen ? "expanded" : "collapsed"}
        style={{
          position: isMobile && sidebarOpen ? "fixed" : "relative",
          left: isMobile && sidebarOpen ? 0 : "auto",
          top: isMobile && sidebarOpen ? 0 : "auto",
          height: isMobile && sidebarOpen ? "100vh" : "auto",
          boxShadow:
            isMobile && sidebarOpen
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              : "none",
        }}
      >
        {/* Sidebar Header */}
        <div
          className={`flex items-center p-4 min-h-[72px] ${
            !sidebarOpen ? "justify-center" : ""
          }`}
        >
          {sidebarOpen && (
            <motion.div
              className="flex items-center space-x-3 flex-1"
              variants={logoVariants}
              animate={sidebarOpen ? "expanded" : "collapsed"}
            >
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <LayoutDashboard className="h-5 w-5 text-white" />
              </motion.div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    className="text-xl font-bold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    Dashboard
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
            variants={menuButtonVariants}
            animate={sidebarOpen ? "expanded" : "collapsed"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {sidebarOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link href={item.href} className="block">
                  <motion.div
                    className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
                      isActive
                        ? "bg-purple-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                    variants={navItemVariants}
                    animate={sidebarOpen ? "expanded" : "collapsed"}
                    whileHover={{
                      scale: 1.02,
                      x: 2,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"
                        layoutId="activeIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>

                    <AnimatePresence>
                      {sidebarOpen && (
                        <motion.div
                          className="ml-3 flex-1"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs opacity-70">
                                {item.description}
                              </div>
                            </div>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: 0.2,
                                  type: "spring",
                                  stiffness: 300,
                                }}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="p-4 border-t border-gray-800"
              variants={footerVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
            >
              <motion.div
                className="text-xs text-gray-500 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                © 2025 User Dashboard
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.main
        className="flex-1 overflow-hidden"
        animate={{
          marginLeft: isMobile ? 0 : 0, // Content doesn't need margin since sidebar is positioned properly
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <div className="h-full overflow-y-auto">{children}</div>
      </motion.main>
    </div>
  );
}
