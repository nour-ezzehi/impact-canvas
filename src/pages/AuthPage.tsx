import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      signup(email, password, name);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary-foreground"
              style={{
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3,
              }}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-primary-foreground max-w-lg"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Rocket className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight">ImpactId</h1>
          </div>
          <p className="text-2xl font-display font-semibold mb-4 leading-tight">
            Transforme ton engagement associatif en expérience professionnelle mesurable.
          </p>
          <p className="text-lg opacity-80 leading-relaxed">
            Documente tes projets, mesure ton impact et obtiens des badges vérifiés par les entreprises partenaires.
          </p>
          <div className="mt-10 flex gap-6">
            {[
              { value: "500+", label: "Étudiants" },
              { value: "80+", label: "Clubs" },
              { value: "150+", label: "Projets" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-display font-bold">{stat.value}</div>
                <div className="text-sm opacity-70">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">ImpactId</h1>
          </div>

          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            {isLogin ? "Bon retour ! 👋" : "Créer un compte 🚀"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isLogin
              ? "Connecte-toi pour accéder à ton profil."
              : "Rejoins la communauté ImpactId."}
          </p>

          <div className="mb-6 p-3 rounded-lg bg-muted/60 border border-border text-sm text-muted-foreground">
            <strong>Demo :</strong> <code className="text-primary">etudiant@gmail.com</code> → Dashboard étudiant.
            Tout autre email → Dashboard entreprise.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 rounded-xl"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 h-12 rounded-xl"
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold gradient-primary border-0 text-primary-foreground hover:opacity-90 transition-opacity">
              {isLogin ? "Se connecter" : "Créer mon compte"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-primary font-semibold hover:underline"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
