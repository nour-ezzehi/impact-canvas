export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university: string;
  club: string;
  role: string;
  joinDate: string;
  scores: {
    participation: number;
    reliability: number;
    contribution: number;
  };
  projects: Project[];
  badges: Badge[];
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  club: string;
  role: string;
  budgetManaged: number;
  teamSize: number;
  participants: number;
  fundsRaised: number;
  partners: number;
  date: string;
  status: "completed" | "ongoing" | "upcoming";
  verified: boolean;
  description: string;
}

export interface Badge {
  id: string;
  label: string;
  type: "impact" | "leadership" | "innovation" | "collaboration";
  awardedBy: string;
  date: string;
}

export interface Club {
  id: string;
  name: string;
  university: string;
  members: number;
  projects: number;
  logo: string;
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type: "volunteering" | "project" | "mission" | "competition" | "leadership";
  company: string;
  description: string;
  deadline: string;
  spots: number;
  tags: string[];
}

export interface EnterpriseValidation {
  id: string;
  studentName: string;
  studentAvatar: string;
  event: string;
  club: string;
  status: "pending" | "validated" | "rejected";
  feedback?: string;
  date: string;
}

export const currentStudent: Student = {
  id: "s1",
  name: "Amira Benali",
  email: "etudiant@gmail.com",
  avatar: "",
  university: "Université Mohammed V",
  club: "Enactus UM5",
  role: "Présidente",
  joinDate: "2023-09",
  scores: { participation: 92, reliability: 89, contribution: 85 },
  projects: [
    {
      id: "p1", title: "Green Campus Initiative", club: "Enactus UM5", role: "Chef de projet",
      budgetManaged: 15000, teamSize: 12, participants: 350, fundsRaised: 8000, partners: 5,
      date: "2024-03", status: "completed", verified: true,
      description: "Programme de recyclage et sensibilisation environnementale sur le campus."
    },
    {
      id: "p2", title: "Hackathon Social Impact", club: "Enactus UM5", role: "Organisatrice",
      budgetManaged: 25000, teamSize: 8, participants: 120, fundsRaised: 12000, partners: 3,
      date: "2024-06", status: "completed", verified: true,
      description: "Hackathon de 48h axé sur l'innovation sociale et l'entrepreneuriat."
    },
    {
      id: "p3", title: "Women in Tech Summit", club: "Enactus UM5", role: "Coordinatrice",
      budgetManaged: 10000, teamSize: 6, participants: 200, fundsRaised: 5000, partners: 4,
      date: "2025-01", status: "ongoing", verified: false,
      description: "Conférence annuelle célébrant les femmes dans la technologie."
    },
  ],
  badges: [
    { id: "b1", label: "Impact Verified", type: "impact", awardedBy: "OCP Group", date: "2024-04" },
    { id: "b2", label: "Leadership Excellence", type: "leadership", awardedBy: "CGEM", date: "2024-07" },
    { id: "b3", label: "Innovation Award", type: "innovation", awardedBy: "StartupMaroc", date: "2024-09" },
  ],
  skills: ["Leadership", "Gestion de projet", "Communication", "Négociation", "Gestion budgétaire", "Travail d'équipe", "Prise de décision", "Résolution de problèmes"],
};

export const clubs: Club[] = [
  { id: "c1", name: "Enactus UM5", university: "Université Mohammed V", members: 45, projects: 12, logo: "🚀", description: "Entrepreneuriat social" },
  { id: "c2", name: "IEEE Student Branch", university: "EMI", members: 60, projects: 18, logo: "⚡", description: "Innovation technologique" },
  { id: "c3", name: "AIESEC Casablanca", university: "ENCG", members: 80, projects: 25, logo: "🌍", description: "Leadership & échanges" },
  { id: "c4", name: "JLM Consulting", university: "ISCAE", members: 35, projects: 8, logo: "💼", description: "Consulting junior" },
];

export const opportunities: Opportunity[] = [
  { id: "o1", title: "Mentor Startup Weekend", type: "volunteering", company: "Techstars", description: "Accompagner des équipes pendant 54h de création de startup.", deadline: "2025-04-15", spots: 10, tags: ["Mentoring", "Startup", "Innovation"] },
  { id: "o2", title: "Projet Smart City", type: "project", company: "OCP Group", description: "Développer une solution IoT pour la gestion urbaine intelligente.", deadline: "2025-05-01", spots: 5, tags: ["IoT", "Smart City", "Développement"] },
  { id: "o3", title: "Challenge RSE", type: "competition", company: "CGEM", description: "Concours d'innovation en responsabilité sociale des entreprises.", deadline: "2025-04-30", spots: 20, tags: ["RSE", "Innovation", "Impact"] },
  { id: "o4", title: "Campus Ambassador", type: "mission", company: "Microsoft", description: "Représenter Microsoft sur le campus et organiser des événements tech.", deadline: "2025-03-20", spots: 3, tags: ["Tech", "Événements", "Marketing"] },
  { id: "o5", title: "Programme Leadership Jeunes", type: "leadership", company: "USAID", description: "Formation intensive en leadership et management de projets.", deadline: "2025-06-01", spots: 15, tags: ["Leadership", "Formation", "Management"] },
];

export const pendingValidations: EnterpriseValidation[] = [
  { id: "v1", studentName: "Amira Benali", studentAvatar: "", event: "Green Campus Initiative", club: "Enactus UM5", status: "pending", date: "2024-03-15" },
  { id: "v2", studentName: "Youssef El Amrani", studentAvatar: "", event: "Hackathon IA", club: "IEEE Student Branch", status: "pending", date: "2024-05-20" },
  { id: "v3", studentName: "Sara Tazi", studentAvatar: "", event: "Forum Emploi", club: "AIESEC", status: "validated", feedback: "Excellente organisation et communication.", date: "2024-02-10" },
  { id: "v4", studentName: "Karim Idrissi", studentAvatar: "", event: "Workshop Design Thinking", club: "JLM Consulting", status: "validated", feedback: "Très professionnel et créatif.", date: "2024-04-08" },
  { id: "v5", studentName: "Fatima Zahra Ouali", studentAvatar: "", event: "Conférence FinTech", club: "ENCG Finance Club", status: "pending", date: "2024-06-12" },
];

export const allStudents: Student[] = [
  currentStudent,
  {
    id: "s2", name: "Youssef El Amrani", email: "youssef@gmail.com", avatar: "", university: "EMI",
    club: "IEEE Student Branch", role: "Vice-Président", joinDate: "2023-10",
    scores: { participation: 88, reliability: 94, contribution: 79 },
    projects: [
      { id: "p4", title: "Hackathon IA", club: "IEEE", role: "Organisateur", budgetManaged: 20000, teamSize: 10, participants: 200, fundsRaised: 15000, partners: 6, date: "2024-05", status: "completed", verified: true, description: "Hackathon Intelligence Artificielle" },
    ],
    badges: [{ id: "b4", label: "Impact Verified", type: "impact", awardedBy: "OCP Group", date: "2024-06" }],
    skills: ["IA", "Programmation", "Organisation", "Communication"],
  },
  {
    id: "s3", name: "Sara Tazi", email: "sara@gmail.com", avatar: "", university: "ENCG",
    club: "AIESEC Casablanca", role: "Responsable événements", joinDate: "2024-01",
    scores: { participation: 78, reliability: 82, contribution: 91 },
    projects: [
      { id: "p5", title: "Forum Emploi", club: "AIESEC", role: "Coordinatrice", budgetManaged: 30000, teamSize: 15, participants: 500, fundsRaised: 20000, partners: 8, date: "2024-02", status: "completed", verified: true, description: "Forum de recrutement inter-universitaire" },
    ],
    badges: [{ id: "b5", label: "Collaboration Star", type: "collaboration", awardedBy: "CGEM", date: "2024-03" }],
    skills: ["Événementiel", "Relations publiques", "Négociation"],
  },
];
