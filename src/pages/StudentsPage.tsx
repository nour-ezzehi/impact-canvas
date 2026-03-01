import { motion } from "framer-motion";
import AppNavbar from "@/components/AppNavbar";
import { allStudents } from "@/data/fakeData";
import ScoreRing from "@/components/ScoreRing";
import { useState } from "react";
import { Search, CheckCircle2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const StudentsPage = () => {
  const [search, setSearch] = useState("");
  const filtered = allStudents.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.club.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={item}>
            <h1 className="text-3xl font-display font-bold text-foreground">Explorer les Étudiants</h1>
            <div className="relative mt-4 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl" />
            </div>
          </motion.div>
          <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((student) => (
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
                  <div className="text-center">
                    <div className="text-lg font-display font-bold text-participation">{student.scores.participation}%</div>
                    <div className="text-xs text-muted-foreground">Part.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-display font-bold text-reliability">{student.scores.reliability}%</div>
                    <div className="text-xs text-muted-foreground">Fiab.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-display font-bold text-contribution">{student.scores.contribution}%</div>
                    <div className="text-xs text-muted-foreground">Cont.</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {student.badges.map((b) => (
                    <Badge key={b.id} className="bg-success/10 text-success border-0 gap-1 text-xs">
                      <CheckCircle2 className="w-2.5 h-2.5" /> {b.label}
                    </Badge>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full gap-1"><Eye className="w-3 h-3" /> Profil complet</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle className="font-display">{student.name}</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{student.role} · {student.club} · {student.university}</p>
                      <div className="flex justify-around">
                        <ScoreRing score={student.scores.participation} label="Participation" color="hsl(var(--participation))" size={90} />
                        <ScoreRing score={student.scores.reliability} label="Fiabilité" color="hsl(var(--reliability))" size={90} delay={0.1} />
                        <ScoreRing score={student.scores.contribution} label="Contribution" color="hsl(var(--contribution))" size={90} delay={0.2} />
                      </div>
                      {student.projects.map((p) => (
                        <div key={p.id} className="p-3 bg-muted/30 rounded-xl">
                          <div className="font-medium text-sm">{p.title}</div>
                          <div className="text-xs text-muted-foreground">{p.role} · {p.participants} participants</div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default StudentsPage;
