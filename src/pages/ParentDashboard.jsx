import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Users, PlusCircle, Calendar, 
  Clock, CheckCircle, AlertCircle, 
  Home, Sparkles, X, Target, Award,
  TrendingUp, BarChart3, Filter, ChevronDown,
  Activity, Star, Zap, Download, Eye, Edit,
  Menu, Settings, User, LogOut, List
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Composant Navbar Parent
function ParentNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo et nom */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg"
              >
                <Home className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Mamaison237
                </h1>
                <p className="text-xs text-blue-600/70 hidden sm:block">Gestion familiale</p>
              </div>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center gap-6">
               <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Accueil</span>
              </Link>
              
              <Link 
                to="/alltask" 
                className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-50 transition"
              >
                <List className="w-4 h-4" />
                <span>Toutes les Tâches</span>
              </Link>
              
            

              {/* Profil */}
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-800">Parent</p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
              </div>
            </div>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-blue-100"
            >
              <div className="px-4 py-3 space-y-1">
                <Link 
                  to="/parent-dashboard" 
                  className="flex items-center gap-3 p-3 rounded-lg text-blue-700 hover:bg-blue-50 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>Tableau de Bord</span>
                </Link>
                
                <Link 
                  to="/alltask" 
                  className="flex items-center gap-3 p-3 rounded-lg text-emerald-700 hover:bg-emerald-50 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <List className="w-5 h-5" />
                  <span>Toutes les Tâches</span>
                </Link>
                
                

                {/* Séparateur */}
                <div className="border-t border-gray-100 my-2"></div>

                {/* Profil mobile */}
                <div className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Parent Administrateur</p>
                    <p className="text-sm text-gray-500">Mamaison237</p>
                  </div>
                </div>

                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 font-medium">
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Footer mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-blue-100 z-40">
        <div className="grid grid-cols-3 h-16">
          <Link 
            to="/parent-dashboard" 
            className="flex flex-col items-center justify-center text-blue-600"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Accueil</span>
          </Link>
          
          <Link 
            to="/alltask" 
            className="flex flex-col items-center justify-center text-emerald-600"
          >
            <List className="w-5 h-5" />
            <span className="text-xs mt-1">Tâches</span>
          </Link>
          
          
          <button className="flex flex-col items-center justify-center text-gray-600">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profil</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default function ParentDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalPoints: 0,
    avgCompletion: 0,
    activeChildren: 0
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    points: 10,
    dueDate: '',
    priority: 'medium'
  });

  // Données simulées
  useEffect(() => {
    const simulatedMembers = [
      { 
        id: '1', 
        name: 'Papa', 
        role: 'parent', 
        avatar: '👨', 
        points: 150, 
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        tasks: 5
      },
      { 
        id: '2', 
        name: 'Maman', 
        role: 'parent', 
        avatar: '👩', 
        points: 120, 
        color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        tasks: 3
      },
      { 
        id: '3', 
        name: 'Lucas', 
        role: 'child', 
        avatar: '👦', 
        points: 85, 
        tasksCompleted: 12, 
        color: 'bg-gradient-to-r from-cyan-500 to-blue-500',
        status: 'active'
      },
      { 
        id: '4', 
        name: 'Emma', 
        role: 'child', 
        avatar: '👧', 
        points: 95, 
        tasksCompleted: 15, 
        color: 'bg-gradient-to-r from-teal-500 to-emerald-500',
        status: 'active'
      },
      { 
        id: '5', 
        name: 'Tom', 
        role: 'child', 
        avatar: '🧒', 
        points: 65, 
        tasksCompleted: 8, 
        color: 'bg-gradient-to-r from-sky-500 to-cyan-500',
        status: 'away'
      },
    ];
    setFamilyMembers(simulatedMembers);

    const simulatedNotifications = [
      {
        id: '1',
        type: 'task_completed',
        message: 'Lucas a terminé la tâche "Ranger sa chambre" +50 points',
        time: 'Il y a 2 heures',
        read: false,
        icon: '🎯',
        color: 'bg-emerald-100 border-emerald-200'
      },
      {
        id: '2',
        type: 'task_created',
        message: 'Nouvelle tâche créée: "Faire les devoirs" pour Emma',
        time: 'Il y a 5 heures',
        read: false,
        icon: '📝',
        color: 'bg-blue-100 border-blue-200'
      },
      {
        id: '3',
        type: 'reward_unlocked',
        message: 'Emma a débloqué le badge "Super organisé"',
        time: 'Hier, 15:30',
        read: true,
        icon: '🏆',
        color: 'bg-purple-100 border-purple-200'
      },
      {
        id: '4',
        type: 'reminder',
        message: 'Rappel: Tâches en attente pour Tom',
        time: 'Hier, 10:15',
        read: true,
        icon: '⏰',
        color: 'bg-amber-100 border-amber-200'
      },
      {
        id: '5',
        type: 'level_up',
        message: 'Lucas a atteint le niveau 3 !',
        time: 'Avant-hier',
        read: true,
        icon: '⭐',
        color: 'bg-cyan-100 border-cyan-200'
      },
    ];
    setNotifications(simulatedNotifications);

    const simulatedTasks = [
      {
        id: '1',
        title: 'Ranger la chambre',
        description: 'Ranger les jouets et faire le lit',
        status: 'completed',
        assignedTo: '3',
        assignedName: 'Lucas',
        createdBy: '1',
        points: 50,
        dueDate: '2024-02-15',
        createdAt: new Date('2024-02-10'),
        completedAt: new Date('2024-02-14'),
        priority: 'medium',
        category: 'maison',
        timeEstimate: '30 min'
      },
      {
        id: '2',
        title: 'Faire les courses',
        description: 'Acheter du lait, des œufs et du pain',
        status: 'pending',
        assignedTo: '2',
        assignedName: 'Maman',
        createdBy: '2',
        points: 30,
        dueDate: '2024-02-16',
        createdAt: new Date('2024-02-11'),
        priority: 'high',
        category: 'courses',
        timeEstimate: '1 heure'
      },
      {
        id: '3',
        title: 'Devoirs de mathématiques',
        description: 'Exercices de géométrie page 45-46',
        status: 'pending',
        assignedTo: '3',
        assignedName: 'Lucas',
        createdBy: '1',
        points: 25,
        dueDate: '2024-02-14',
        createdAt: new Date('2024-02-09'),
        priority: 'high',
        category: 'école',
        timeEstimate: '45 min'
      },
      {
        id: '4',
        title: 'Arroser les plantes',
        description: 'Plantes du salon et de la terrasse',
        status: 'completed',
        assignedTo: '4',
        assignedName: 'Emma',
        createdBy: '2',
        points: 15,
        dueDate: '2024-02-13',
        createdAt: new Date('2024-02-08'),
        completedAt: new Date('2024-02-13'),
        priority: 'low',
        category: 'jardin',
        timeEstimate: '15 min'
      },
      {
        id: '5',
        title: 'Préparer le dîner',
        description: 'Pizza maison avec salade',
        status: 'pending',
        assignedTo: '1',
        assignedName: 'Papa',
        createdBy: '2',
        points: 40,
        dueDate: '2024-02-15',
        createdAt: new Date('2024-02-12'),
        priority: 'medium',
        category: 'cuisine',
        timeEstimate: '1h30'
      },
      {
        id: '6',
        title: 'Sortir la poubelle',
        description: 'Trier les déchets et sortir les poubelles',
        status: 'pending',
        assignedTo: '5',
        assignedName: 'Tom',
        createdBy: '1',
        points: 20,
        dueDate: '2024-02-13',
        createdAt: new Date('2024-02-10'),
        priority: 'medium',
        category: 'maison',
        timeEstimate: '10 min'
      },
    ];
    
    setTasks(simulatedTasks);

    // Calculer les statistiques
    const total = simulatedTasks.length;
    const completed = simulatedTasks.filter(t => t.status === 'completed').length;
    const pending = simulatedTasks.filter(t => t.status === 'pending').length;
    const totalPoints = simulatedTasks
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + (t.points || 0), 0);
    const avgCompletion = total > 0 ? Math.round((completed / total) * 100) : 0;
    const activeChildren = simulatedMembers.filter(m => m.role === 'child' && m.status === 'active').length;

    setStats({
      totalTasks: total,
      completedTasks: completed,
      pendingTasks: pending,
      totalPoints: totalPoints,
      avgCompletion: avgCompletion,
      activeChildren: activeChildren
    });
  }, []);

  // Étoiles animées
  const stars = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 4,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  // Ajouter une nouvelle tâche
  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.assignedTo) return;

    const assignedMember = familyMembers.find(m => m.id === newTask.assignedTo);
    
    const newTaskObj = {
      id: `task-${Date.now()}`,
      ...newTask,
      assignedName: assignedMember?.name,
      status: 'pending',
      createdAt: new Date(),
      category: 'général',
      timeEstimate: '30 min'
    };

    setTasks([newTaskObj, ...tasks]);
    
    // Ajouter une notification
    setNotifications([
      {
        id: `notif-${Date.now()}`,
        type: 'task_created',
        message: `Nouvelle tâche: "${newTask.title}" pour ${assignedMember?.name}`,
        time: 'À l\'instant',
        read: false,
        icon: '📝',
        color: 'bg-blue-100 border-blue-200'
      },
      ...notifications
    ]);

    setShowAddTask(false);
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      points: 10,
      dueDate: '',
      priority: 'medium'
    });
  };

  // Tâches filtrées
  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 p-3 sm:p-4 md:p-6 lg:p-8 relative">
      {/* Intégration du ParentNavbar */}
      <ParentNavbar />
      
      {/* Espacement après la navbar */}
      <div className="pt-4"></div>
      
      {/* Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.2, 0], scale: [0, 1, 0], rotate: 360 }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="text-blue-300/30" size={star.size} />
          </motion.div>
        ))}
      </div>

      {/* Header Responsive (sans la partie logo qui est maintenant dans le navbar) */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6 lg:mb-8 relative z-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="mb-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  Tableau de Bord Parent
                </span>
              </h1>
              <p className="text-blue-600/80 text-xs sm:text-sm lg:text-base">
                Gestion complète des tâches familiales
              </p>
            </div>
          </div>

          {/* Actions header */}
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all border border-blue-100"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </motion.button>
              {notifications.filter(n => !n.read).length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg"
                >
                  {notifications.filter(n => !n.read).length}
                </motion.span>
              )}
            </div>

            {/* Bouton ajouter tâche */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddTask(true)}
              className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl flex items-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg text-xs sm:text-sm"
            >
              <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Nouvelle tâche</span>
              <span className="sm:hidden">Nouvelle</span>
            </motion.button>

            {/* Bouton rapport */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-blue-100 flex items-center gap-2 text-blue-600 text-xs sm:text-sm"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Rapport</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Statistiques - Ultra Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 relative z-10"
      >
        {[
          { 
            label: 'Tâches totales', 
            value: stats.totalTasks, 
            icon: <Target className="w-3 h-3 sm:w-4 sm:h-4" />, 
            color: 'from-blue-500 to-cyan-500',
            bg: 'bg-gradient-to-r from-blue-50 to-cyan-50'
          },
          { 
            label: 'Terminées', 
            value: stats.completedTasks, 
            icon: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />, 
            color: 'from-emerald-500 to-teal-500',
            bg: 'bg-gradient-to-r from-emerald-50 to-teal-50'
          },
          { 
            label: 'En attente', 
            value: stats.pendingTasks, 
            icon: <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />, 
            color: 'from-amber-500 to-yellow-500',
            bg: 'bg-gradient-to-r from-amber-50 to-yellow-50'
          },
          { 
            label: 'Points totaux', 
            value: stats.totalPoints, 
            icon: <Award className="w-3 h-3 sm:w-4 sm:h-4" />, 
            color: 'from-purple-500 to-pink-500',
            bg: 'bg-gradient-to-r from-purple-50 to-pink-50'
          },
          { 
            label: 'Progression', 
            value: `${stats.avgCompletion}%`, 
            icon: <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />, 
            color: 'from-cyan-500 to-blue-500',
            bg: 'bg-gradient-to-r from-cyan-50 to-blue-50'
          },
          { 
            label: 'Enfants actifs', 
            value: stats.activeChildren, 
            icon: <Users className="w-3 h-3 sm:w-4 sm:h-4" />, 
            color: 'from-teal-500 to-emerald-500',
            bg: 'bg-gradient-to-r from-teal-50 to-emerald-50'
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`${stat.bg} backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/50 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] sm:text-xs text-gray-600 mb-1">{stat.label}</div>
                <div className={`text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </div>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                <div className={`text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contenu principal - Ultra Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 relative z-10">
        {/* Membres de famille */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-blue-100 h-full">
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-blue-800">
                  Famille ({familyMembers.length})
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-blue-600">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-1"
                />
                {stats.activeChildren} actifs
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {familyMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className={`p-3 sm:p-4 rounded-xl border-2 ${member.color} border-opacity-30 bg-white/80 backdrop-blur-sm`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl ${member.color} text-white shadow-lg`}
                    >
                      {member.avatar}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-blue-800 text-sm sm:text-base truncate">{member.name}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${member.role === 'parent' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {member.role === 'parent' ? 'Parent' : 'Enfant'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs sm:text-sm">
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-500" />
                            <span className="text-amber-700 font-medium">{member.points} pts</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {member.status === 'active' && (
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                              <span className="text-xs text-emerald-700">Actif</span>
                            </div>
                          )}
                          {member.tasks && (
                            <div className="text-xs text-blue-600">
                              {member.tasks} tâches
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tâches principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-cyan-100 h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg shadow">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-cyan-800">
                    Toutes les tâches
                  </h2>
                  <p className="text-cyan-600/80 text-xs sm:text-sm">
                    {filteredTasks.length} tâche{filteredTasks.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'completed'].map((status) => (
                  <motion.button
                    key={status}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      filterStatus === status
                        ? status === 'all' ? 'bg-blue-100 text-blue-700' 
                          : status === 'pending' ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all' ? 'Toutes' : 
                     status === 'pending' ? 'En cours' : 'Terminées'}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 bg-white border border-cyan-200 rounded-lg text-cyan-600 text-xs sm:text-sm flex items-center gap-1"
                >
                  <Filter className="w-3 h-3" />
                  <span className="hidden sm:inline">Filtrer</span>
                </motion.button>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ scale: 1.005, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  className="p-3 sm:p-4 rounded-xl border border-gray-100 bg-white/50 hover:border-cyan-200 transition-all cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 sm:gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          task.priority === 'high' ? 'bg-red-100 text-red-600' :
                          task.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bold text-cyan-800 text-sm sm:text-base">{task.title}</h3>
                            <div className="flex gap-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                task.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-100 text-amber-700 border border-amber-200'
                              }`}>
                                {task.status === 'completed' ? '✓ Terminée' : '⏳ En cours'}
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700">
                                {task.category}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{task.description}</p>
                          
                          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                              <span className="text-blue-600 font-medium">{task.assignedName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-500" />
                              <span className="text-cyan-600">{task.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                              <span className="text-gray-600">{task.timeEstimate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-2">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {task.points} pts
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTask(task);
                          }}
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-cyan-100 text-cyan-600 rounded-lg hover:bg-cyan-200"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 mt-3 sm:mt-4 lg:mt-6"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-emerald-100">
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-emerald-800">
                    Activités récentes
                  </h2>
                  <p className="text-emerald-600/80 text-xs sm:text-sm">
                    Suivez les progrès de votre famille
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Tout marquer comme lu
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {notifications.slice(0, 6).map((notif, index) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`p-3 sm:p-4 rounded-xl border ${notif.color} cursor-pointer ${!notif.read ? 'ring-1 ring-emerald-200' : ''}`}
                  onClick={() => setNotifications(notifications.map(n => 
                    n.id === notif.id ? { ...n, read: true } : n
                  ))}
                >
                  <div className="flex gap-3">
                    <div className={`text-lg sm:text-xl ${!notif.read ? 'animate-bounce' : ''}`}>
                      {notif.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm sm:text-base mb-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-emerald-500 rounded-full"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal Ajouter tâche */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50"
            onClick={() => setShowAddTask(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-blue-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800">
                  Nouvelle tâche
                </h3>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Titre', type: 'text', value: newTask.title, onChange: (e) => setNewTask({...newTask, title: e.target.value}), placeholder: 'Ex: Ranger la chambre' },
                  { label: 'Description', type: 'textarea', value: newTask.description, onChange: (e) => setNewTask({...newTask, description: e.target.value}), placeholder: 'Description détaillée...' },
                  { label: 'Assigner à', type: 'select', value: newTask.assignedTo, onChange: (e) => setNewTask({...newTask, assignedTo: e.target.value}), options: familyMembers.filter(m => m.role === 'child'), placeholder: 'Sélectionner un enfant' },
                  { label: 'Points', type: 'number', value: newTask.points, onChange: (e) => setNewTask({...newTask, points: parseInt(e.target.value) || 0}) },
                  { label: 'Date limite', type: 'date', value: newTask.dueDate, onChange: (e) => setNewTask({...newTask, dueDate: e.target.value}) },
                  { label: 'Priorité', type: 'select', value: newTask.priority, onChange: (e) => setNewTask({...newTask, priority: e.target.value}), options: [{value: 'low', label: 'Basse'}, {value: 'medium', label: 'Moyenne'}, {value: 'high', label: 'Haute'}] },
                ].map((field, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <label className="block text-blue-700 font-medium mb-1 text-sm sm:text-base">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full p-3 border-2 border-blue-100 rounded-xl focus:border-blue-300 focus:outline-none bg-blue-50/50 text-blue-800 placeholder-blue-400/60 resize-none text-sm sm:text-base"
                        rows="3"
                        placeholder={field.placeholder}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full p-3 border-2 border-blue-100 rounded-xl focus:border-blue-300 focus:outline-none bg-blue-50/50 text-blue-800 text-sm sm:text-base"
                      >
                        <option value="">{field.placeholder || 'Sélectionner...'}</option>
                        {field.options?.map(opt => (
                          <option key={opt.value || opt.id} value={opt.value || opt.id}>
                            {opt.label || opt.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full p-3 border-2 border-blue-100 rounded-xl focus:border-blue-300 focus:outline-none bg-blue-50/50 text-blue-800 placeholder-blue-400/60 text-sm sm:text-base"
                        placeholder={field.placeholder}
                        min={field.type === 'number' ? 1 : undefined}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-2 sm:gap-3 mt-6 pt-6 border-t border-blue-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddTask}
                  disabled={!newTask.title.trim() || !newTask.assignedTo}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm sm:text-base ${
                    !newTask.title.trim() || !newTask.assignedTo
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg'
                  }`}
                >
                  Créer la tâche
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddTask(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition text-sm sm:text-base"
                >
                  Annuler
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}