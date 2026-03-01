import { motion } from "framer-motion";
import AppNavbar from "@/components/AppNavbar";
import { currentStudent } from "@/data/fakeData";
import { CheckCircle2, Users, DollarSign, Clock, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={item}>
            <h1 className="text-3xl font-display font-bold text-foreground">Mes Projets</h1>
            <p className="text-muted-foreground mt-1">Tous tes projets et événements documentés.</p>
          </motion.div>
          {currentStudent.projects.map((p) => (
            <motion.div key={p.id} variants={item} className="glass-card rounded-2xl p-6 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display font-semibold text-xl text-foreground">{p.title}</h3>
                <Badge variant={p.status === "completed" ? "default" : "secondary"} className={p.status === "completed" ? "bg-success/10 text-success border-0" : ""}>
                  {p.status === "completed" ? "Terminé" : p.status === "ongoing" ? "En cours" : "À venir"}
                </Badge>
                {p.verified && (
                  <Badge className="bg-success/10 text-success border-0 gap-1"><CheckCircle2 className="w-3 h-3" /> Vérifié</Badge>
                )}
              </div>
              <p className="text-muted-foreground">{p.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <MiniStat icon={Users} label="Équipe" value={`${p.teamSize} membres`} />
                <MiniStat icon={Award} label="Participants" value={p.participants.toString()} />
                <MiniStat icon={DollarSign} label="Budget" value={`${p.budgetManaged.toLocaleString()} MAD`} />
                <MiniStat icon={Clock} label="Date" value={p.date} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

const MiniStat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center gap-2">
    <Icon className="w-4 h-4 text-muted-foreground" />
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  </div>
);

export default ProjectsPage;
