import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Rocket, LogOut, LayoutDashboard, Users, Briefcase, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItemsStudent = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Projets", icon: Briefcase, path: "/projects" },
  { label: "Marketplace", icon: TrendingUp, path: "/marketplace" },
];

const navItemsEnterprise = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Étudiants", icon: Users, path: "/students" },
  { label: "Marketplace", icon: TrendingUp, path: "/marketplace" },
];

const navItemsClub = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Projets", icon: Briefcase, path: "/projects" },
  { label: "Marketplace", icon: TrendingUp, path: "/marketplace" },
];

const AppNavbar = () => {
  const { role, logout, email } = useAuth();
  const location = useLocation();
  const navItems = role === "student" ? navItemsStudent : role === "club" ? navItemsClub : navItemsEnterprise;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass-card border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Rocket className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">ImpactId</span>
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm text-muted-foreground">{email}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
            {role === "student" ? "Étudiant" : role === "club" ? "Club" : "Entreprise"}
          </span>
          <button
            onClick={logout}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default AppNavbar;
