import { motion } from "framer-motion";
import AppNavbar from "@/components/AppNavbar";
import { opportunities } from "@/data/fakeData";
import { Calendar, Users, Tag, ArrowRight, Sparkles, Rocket, Heart, Lightbulb, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const typeConfig: Record<string, { icon: any; color: string; label: string }> = {
  volunteering: { icon: Heart, color: "bg-success/10 text-success", label: "Volontariat" },
  project: { icon: Rocket, color: "bg-primary/10 text-primary", label: "Projet" },
  mission: { icon: Sparkles, color: "bg-accent/10 text-accent", label: "Mission" },
  competition: { icon: Lightbulb, color: "bg-warning/10 text-warning", label: "Concours" },
  leadership: { icon: Award, color: "bg-participation/10 text-participation", label: "Leadership" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const MarketplacePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={item}>
            <h1 className="text-3xl font-display font-bold text-foreground">Marketplace d'Opportunités</h1>
            <p className="text-muted-foreground mt-1">Découvre des opportunités de volontariat, projets, missions et concours.</p>
          </motion.div>

          <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opp) => {
              const tc = typeConfig[opp.type];
              const Icon = tc.icon;
              return (
                <motion.div
                  key={opp.id}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-5 space-y-4 transition-shadow hover:shadow-xl flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <Badge className={`${tc.color} border-0 gap-1`}>
                      <Icon className="w-3 h-3" />
                      {tc.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {opp.deadline}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg">{opp.title}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{opp.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {opp.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-3.5 h-3.5" /> {opp.spots} places
                    </div>
                    <Button size="sm" className="gap-1 gradient-primary border-0 text-primary-foreground">
                      Postuler <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">par {opp.company}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default MarketplacePage;
