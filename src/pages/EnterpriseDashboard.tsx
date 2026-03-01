import { useState } from "react";
import { motion } from "framer-motion";
import AppNavbar from "@/components/AppNavbar";
import { pendingValidations, allStudents } from "@/data/fakeData";
import ScoreRing from "@/components/ScoreRing";
import {
  CheckCircle2, XCircle, Clock, Users, Eye, Building2,
  MessageSquare, Award, Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const EnterpriseDashboard = () => {
  const [validations, setValidations] = useState(pendingValidations);
  const [search, setSearch] = useState("");

  const handleValidate = (id: string) => {
    setValidations((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, status: "validated" as const, feedback: "Expérience validée avec succès." } : v
      )
    );
  };

  const handleReject = (id: string) => {
    setValidations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "rejected" as const } : v))
    );
  };

  const pendingCount = validations.filter((v) => v.status === "pending").length;
  const validatedCount = validations.filter((v) => v.status === "validated").length;

  const filteredStudents = allStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.club.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          {/* Header */}
          <motion.div variants={item}>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              Espace Entreprise
            </h1>
            <p className="text-muted-foreground mt-1">Validez les expériences, consultez les profils étudiants.</p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox icon={Clock} label="En attente" value={pendingCount} color="bg-warning/10 text-warning" />
            <StatBox icon={CheckCircle2} label="Validées" value={validatedCount} color="bg-success/10 text-success" />
            <StatBox icon={Users} label="Étudiants" value={allStudents.length} color="bg-primary/10 text-primary" />
            <StatBox icon={Award} label="Badges émis" value={4} color="bg-accent/10 text-accent" />
          </motion.div>

          {/* Validations */}
          <motion.div variants={item}>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Demandes de Validation
            </h2>
            <div className="space-y-3">
              {validations.map((v) => (
                <motion.div
                  key={v.id}
                  layout
                  className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold">
                      {v.studentName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{v.studentName}</div>
                      <div className="text-sm text-muted-foreground">{v.event} · {v.club}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {v.status === "pending" ? (
                      <>
                        <Button size="sm" className="gap-1 gradient-primary border-0 text-primary-foreground" onClick={() => handleValidate(v.id)}>
                          <CheckCircle2 className="w-3 h-3" /> Valider
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1 text-destructive border-destructive/30" onClick={() => handleReject(v.id)}>
                          <XCircle className="w-3 h-3" /> Rejeter
                        </Button>
                      </>
                    ) : (
                      <Badge className={v.status === "validated" ? "bg-success/10 text-success border-0" : "bg-destructive/10 text-destructive border-0"}>
                        {v.status === "validated" ? "✓ Validée" : "✗ Rejetée"}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Student Profiles */}
          <motion.div variants={item}>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Profils Étudiants
            </h2>
            <div className="relative mb-4 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou club..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 rounded-xl"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student) => (
                <motion.div key={student.id} whileHover={{ y: -4 }} className="glass-card rounded-2xl p-5 space-y-4 transition-shadow hover:shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center text-accent-foreground font-display font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.role} · {student.club}</div>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <MiniScore value={student.scores.participation} label="Part." color="hsl(var(--participation))" />
                    <MiniScore value={student.scores.reliability} label="Fiab." color="hsl(var(--reliability))" />
                    <MiniScore value={student.scores.contribution} label="Cont." color="hsl(var(--contribution))" />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {student.skills.slice(0, 4).map((sk) => (
                      <span key={sk} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{sk}</span>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <Eye className="w-3 h-3" /> Voir le profil
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="font-display">{student.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">{student.role} · {student.club} · {student.university}</p>
                        <div className="flex justify-around">
                          <ScoreRing score={student.scores.participation} label="Participation" color="hsl(var(--participation))" size={90} />
                          <ScoreRing score={student.scores.reliability} label="Fiabilité" color="hsl(var(--reliability))" size={90} delay={0.1} />
                          <ScoreRing score={student.scores.contribution} label="Contribution" color="hsl(var(--contribution))" size={90} delay={0.2} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Projets</h4>
                          {student.projects.map((p) => (
                            <div key={p.id} className="p-3 bg-muted/30 rounded-xl mb-2">
                              <div className="font-medium text-sm">{p.title}</div>
                              <div className="text-xs text-muted-foreground">{p.role} · {p.participants} participants · {p.budgetManaged.toLocaleString()} MAD</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {student.badges.map((b) => (
                            <Badge key={b.id} className="bg-success/10 text-success border-0 gap-1">
                              <CheckCircle2 className="w-3 h-3" /> {b.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

const StatBox = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
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

const MiniScore = ({ value, label, color }: { value: number; label: string; color: string }) => (
  <div className="text-center">
    <div className="text-lg font-display font-bold" style={{ color }}>{value}%</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

export default EnterpriseDashboard;
