import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { clubs, allStudents, currentStudent } from "@/data/fakeData";
import AppNavbar from "@/components/AppNavbar";
import { Badge } from "@/components/ui/badge";
import ScoreRing from "@/components/ScoreRing";
import {
  Users, Briefcase, ArrowLeft, Calendar, TrendingUp, CheckCircle2, Star
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ClubDashboard = () => {
  const { id } = useParams();
  const club = clubs.find((c) => c.id === id);

  // Get members for this club
  const members = allStudents.filter((s) => s.club === club?.name);
  // Aggregate projects from members
  const clubProjects = members.flatMap((m) => m.projects);

  if (!club) {
    return (
      <div className="min-h-screen bg-background">
        <AppNavbar />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Club introuvable</h1>
          <Link to="/dashboard" className="text-primary mt-4 inline-block hover:underline">← Retour</Link>
        </main>
      </div>
    );
  }

  const avgScores = {
    participation: members.length ? Math.round(members.reduce((a, m) => a + m.scores.participation, 0) / members.length) : 0,
    reliability: members.length ? Math.round(members.reduce((a, m) => a + m.scores.reliability, 0) / members.length) : 0,
    contribution: members.length ? Math.round(members.reduce((a, m) => a + m.scores.contribution, 0) / members.length) : 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          {/* Back */}
          <motion.div variants={item}>
            <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour au dashboard
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-4xl">
              {club.logo}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-display font-bold text-foreground">{club.name}</h1>
              <p className="text-muted-foreground">{club.university} · {club.description}</p>
              <div className="flex gap-4 mt-3">
                <Badge className="gap-1 bg-primary/10 text-primary border-primary/20">
                  <Users className="w-3 h-3" /> {club.members} membres
                </Badge>
                <Badge className="gap-1 bg-accent/10 text-accent border-accent/20">
                  <Briefcase className="w-3 h-3" /> {club.projects} projets
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Membres" value={club.members.toString()} color="bg-primary/10 text-primary" />
            <StatCard icon={Briefcase} label="Projets" value={club.projects.toString()} color="bg-accent/10 text-accent" />
            <StatCard icon={Star} label="Badges gagnés" value={members.reduce((a, m) => a + m.badges.length, 0).toString()} color="bg-warning/10 text-warning" />
            <StatCard icon={TrendingUp} label="Score moyen" value={Math.round((avgScores.participation + avgScores.reliability + avgScores.contribution) / 3).toString()} color="bg-success/10 text-success" />
          </motion.div>

          {/* Average Scores */}
          {members.length > 0 && (
            <motion.div variants={item} className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-display font-semibold text-foreground mb-6">Profil Moyen du Club</h2>
              <div className="flex flex-wrap justify-around gap-6">
                <ScoreRing score={avgScores.participation} label="Participation" color="hsl(var(--participation))" delay={0} />
                <ScoreRing score={avgScores.reliability} label="Fiabilité" color="hsl(var(--reliability))" delay={0.2} />
                <ScoreRing score={avgScores.contribution} label="Contribution" color="hsl(var(--contribution))" delay={0.4} />
              </div>
            </motion.div>
          )}

          {/* Members */}
          <motion.div variants={item}>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Membres
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => (
                <div key={m.id} className="glass-card rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-foreground">{m.name}</div>
                      <div className="text-sm text-muted-foreground">{m.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {m.badges.slice(0, 2).map((b) => (
                      <Badge key={b.id} className="text-xs bg-success/10 text-success border-success/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> {b.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
              {members.length === 0 && (
                <p className="text-muted-foreground col-span-full">Aucun membre trouvé dans les données.</p>
              )}
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div variants={item}>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" /> Projets du Club
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {clubProjects.map((p) => (
                <motion.div key={p.id} whileHover={{ y: -4 }} className="glass-card rounded-2xl p-5 space-y-3 transition-shadow hover:shadow-xl">
                  <Badge variant={p.status === "completed" ? "default" : "secondary"} className={p.status === "completed" ? "bg-success/10 text-success border-0" : ""}>
                    {p.status === "completed" ? "Terminé" : p.status === "ongoing" ? "En cours" : "À venir"}
                  </Badge>
                  <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground"><Users className="w-3 h-3" /> {p.teamSize} membres</div>
                    <div className="flex items-center gap-1 text-muted-foreground"><Calendar className="w-3 h-3" /> {p.date}</div>
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

export default ClubDashboard;
