import { motion } from "framer-motion";
import { currentStudent, clubs } from "@/data/fakeData";
import { Link } from "react-router-dom";
import ScoreRing from "@/components/ScoreRing";
import AppNavbar from "@/components/AppNavbar";
import {
  Award, Briefcase, Users, DollarSign, Calendar, CheckCircle2, Clock,
  Star, TrendingUp, Target, Sparkles, ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const StudentDashboard = () => {
  const s = currentStudent;

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          {/* Header */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground text-3xl font-display font-bold">
              {s.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-display font-bold text-foreground">{s.name}</h1>
              <p className="text-muted-foreground">{s.role} · {s.club} · {s.university}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {s.badges.map((b) => (
                  <Badge key={b.id} className="gap-1 bg-success/10 text-success border-success/20 hover:bg-success/20">
                    <CheckCircle2 className="w-3 h-3" />
                    {b.label} — {b.awardedBy}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scores */}
          <motion.div variants={item} className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Profil de Collaboration
            </h2>
            <div className="flex flex-wrap justify-around gap-6">
              <ScoreRing score={s.scores.participation} label="Participation" color="hsl(var(--participation))" delay={0} />
              <ScoreRing score={s.scores.reliability} label="Fiabilité" color="hsl(var(--reliability))" delay={0.2} />
              <ScoreRing score={s.scores.contribution} label="Contribution" color="hsl(var(--contribution))" delay={0.4} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <ScoreDetail icon={Calendar} color="text-participation" label="Participation" desc="Présent à 92% du cycle de vie des projets" />
              <ScoreDetail icon={CheckCircle2} color="text-reliability" label="Fiabilité" desc="8/9 tâches livrées dans les délais" />
              <ScoreDetail icon={TrendingUp} color="text-contribution" label="Contribution" desc="Tâches critiques débloquant l'équipe" />
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Briefcase} label="Projets" value={s.projects.length.toString()} color="bg-primary/10 text-primary" />
            <StatCard icon={Users} label="Équipes dirigées" value="26" color="bg-accent/10 text-accent" />
            <StatCard icon={DollarSign} label="Budget géré" value="50K MAD" color="bg-success/10 text-success" />
            <StatCard icon={Star} label="Participants touchés" value="670" color="bg-warning/10 text-warning" />
          </motion.div>

          {/* Soft Skills */}
          <motion.div variants={item} className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Soft Skills Détectées
            </h2>
            <div className="flex flex-wrap gap-2">
              {s.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Clubs */}
          <motion.div variants={item}>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Mes Clubs
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {clubs.map((c) => (
                <Link key={c.id} to={`/clubs/${c.id}`}>
                  <motion.div whileHover={{ y: -4 }} className="glass-card rounded-2xl p-5 space-y-3 transition-shadow hover:shadow-xl cursor-pointer">
                    <div className="text-3xl">{c.logo}</div>
                    <h3 className="font-display font-semibold text-foreground">{c.name}</h3>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {c.members}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {c.projects} projets</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                      Voir le dashboard <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div variants={item}>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Projets & Événements
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {s.projects.map((p) => (
                <motion.div key={p.id} whileHover={{ y: -4 }} className="glass-card rounded-2xl p-5 space-y-3 transition-shadow hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <Badge variant={p.status === "completed" ? "default" : "secondary"} className={p.status === "completed" ? "bg-success/10 text-success border-0" : ""}>
                      {p.status === "completed" ? "Terminé" : p.status === "ongoing" ? "En cours" : "À venir"}
                    </Badge>
                    {p.verified && (
                      <span className="flex items-center gap-1 text-xs text-success font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Vérifié
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground"><Users className="w-3 h-3" /> {p.teamSize} membres</div>
                    <div className="flex items-center gap-1 text-muted-foreground"><Award className="w-3 h-3" /> {p.participants} participants</div>
                    <div className="flex items-center gap-1 text-muted-foreground"><DollarSign className="w-3 h-3" /> {p.budgetManaged.toLocaleString()} MAD</div>
                    <div className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> {p.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
  <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="text-2xl font-display font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  </div>
);

const ScoreDetail = ({ icon: Icon, color, label, desc }: { icon: any; color: string; label: string; desc: string }) => (
  <div className="bg-muted/30 rounded-xl p-4 flex items-start gap-3">
    <Icon className={`w-5 h-5 mt-0.5 ${color}`} />
    <div>
      <div className="font-medium text-foreground text-sm">{label}</div>
      <div className="text-xs text-muted-foreground mt-1">{desc}</div>
    </div>
  </div>
);

export default StudentDashboard;
