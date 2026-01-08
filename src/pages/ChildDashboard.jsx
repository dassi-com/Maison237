import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, Target,Home,X, Gift, Gamepad, Rocket, Medal, Crown,
  Menu, X as XIcon, List, Grid
} from 'lucide-react';

export default function ChildDashboard() {
  const [myTasks, setMyTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [totalPoints, setTotalPoints] = useState("");
  const [streak, setStreak] = useState("");
  const [level, setLevel] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'

  // Police enfantine
  useEffect(() => {
    // Charger une police Google Fonts enfantine
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Fredoka+One&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Données simulées
  useEffect(() => {
    const simulatedTasks = [
      {
        id: '1',
        title: 'Ranger la chambre',
        description: 'Ranger tous les jouets, faire le lit et ouvrir la fenêtre',
        status: 'completed',
        assignedTo: 'child1',
        createdBy: 'parent1',
        points: 0,
        dueDate: '2024-02-15',
        createdAt: new Date('2024-02-10'),
        completedAt: new Date('2024-02-14'),
        priority: 'medium',
        category: 'maison',
        emoji: '🧹'
      },
      {
        id: '2',
        title: 'Devoirs de maths',
        description: 'Exercices de géométrie page 45-46',
        status: 'pending',
        assignedTo: 'child1',
        createdBy: 'parent1',
        points: 0,
        dueDate: '2024-02-16',
        createdAt: new Date('2024-02-12'),
        priority: 'high',
        category: 'école',
        emoji: '📚'
      },
      {
        id: '3',
        title: 'Arroser les plantes',
        description: 'Plantes du salon et de la terrasse',
        status: 'pending',
        assignedTo: 'child1',
        createdBy: 'parent2',
        points: 0,
        dueDate: '2024-02-14',
        createdAt: new Date('2024-02-11'),
        priority: 'medium',
        category: 'jardin',
        emoji: '🌱'
      },
      {
        id: '4',
        title: 'Sortir la poubelle',
        description: 'Trier les déchets',
        status: 'pending',
        assignedTo: 'child1',
        createdBy: 'parent1',
        points: 0,
        dueDate: '2024-02-13',
        createdAt: new Date('2024-02-10'),
        priority: 'low',
        category: 'maison',
        emoji: '🗑️'
      },
      {
        id: '5',
        title: 'Préparer le sac de sport',
        description: 'T-shirt, short, chaussures, bouteille d eau',
        status: 'completed',
        assignedTo: 'child1',
        createdBy: 'parent2',
        points: 0,
        dueDate: '2024-02-12',
        createdAt: new Date('2024-02-09'),
        completedAt: new Date('2024-02-12'),
        priority: 'medium',
        category: 'sport',
        emoji: '🎒'
      },
    ];

    setMyTasks(simulatedTasks);

    const simulatedNotifications = [
      {
        id: '1',
        type: 'task_created',
        message: 'Nouvelle mission! "Devoirs de maths"',
        time: 'Il y a 2 heures',
        read: false,
        icon: '🎯'
      },
      {
        id: '2',
        type: 'reward',
        message: 'Bravo ! +50 points pour ta chambre 🏆',
        time: 'Hier, 18:30',
        read: false,
        icon: '🎁'
      },
      {
        id: '3',
        type: 'reminder',
        message: 'Mission "Arroser les plantes" aujourd\'hui ⏰',
        time: 'Hier, 10:15',
        read: true,
        icon: '⏰'
      },
    ];

    setNotifications(simulatedNotifications);
  }, []);

  // Terminer une tâche
  const completeTask = (taskId) => {
    const task = myTasks.find(t => t.id === taskId);
    if (!task || task.status === 'completed') return;

    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000);

    const newPoints = totalPoints + task.points;
    setTotalPoints(newPoints);
    setStreak(prev => prev + 1);

    if (newPoints >= level * 100) {
      setLevel(prev => prev + 1);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }

    setMyTasks(myTasks.map(t =>
      t.id === taskId
        ? { ...t, status: 'completed', completedAt: new Date() }
        : t
    ));

    setNotifications([
      {
        id: `complete-${Date.now()}`,
        type: 'reward',
        message: `Bravo ! +${task.points} points pour "${task.title}" 🎉`,
        time: 'À l\'instant',
        read: false,
        icon: '🎯'
      },
      ...notifications
    ]);
  };

  const pendingTasks = myTasks.filter(t => t.status === 'pending').length;
  const completedTasks = myTasks.filter(t => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-fuchsia-50 to-yellow-50 p-0 sm:p-2 md:p-4 lg:p-6 relative overflow-hidden" style={{ fontFamily: "'Comic Neue', cursive" }}>

      {/* Confettis */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl sm:text-2xl"
              style={{ left: `${Math.random() * 100}%`, top: '-10%' }}
              initial={{ y: 0, rotate: 0, opacity: 1 }}
              animate={{ y: '110vh', rotate: 360, opacity: 0, x: Math.sin(i) * 50 }}
              transition={{ duration: 1.5 + Math.random(), ease: "easeInOut" }}
            >
              {['🎉', '✨', '🎊', '🥳', '🌟'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Récompense niveau */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="absolute inset-0 bg-black/30" />
            <motion.div
              className="relative bg-gradient-to-r from-blue-400 via-fuchsia-400 to-yellow-400 p-1 rounded-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-center">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                  <Crown className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-yellow-500 mb-4" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  NIVEAU {level} !
                </h3>
                <p className="text-lg sm:text-xl text-gray-700 mb-4">
                  Tu es un champion ! 🏆
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar Responsive */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-lg"
              >
                <Gamepad className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-fuchsia-600 bg-clip-text text-transparent" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  Mamaison237
                </h1>
                <p className="text-xs text-blue-600/70 hidden sm:block">Pour les super héros !</p>
              </div>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Accueil</span>
              </Link>
              <Link to="/alltask" className="text-fuchsia-600 hover:text-fuchsia-800 font-medium flex items-center gap-2">
                <List className="w-4 h-4" />
                <span>Toutes les tâches</span>
              </Link>
              {/* <Link to="/rewards" className="text-yellow-600 hover:text-yellow-800 font-medium flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>Récompenses</span>
              </Link> */}
            </div>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-blue-100 text-blue-600"
            >
              {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              <div className="px-4 py-3 space-y-3">
                <Link to="/" className=" p-3 rounded-lg bg-blue-50 text-blue-700 font-medium flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <Home className="w-5 h-5" />
                  <span>Mon Tableau de Bord</span>
                </Link>
                <Link to="/all-tasks" className=" p-3 rounded-lg bg-fuchsia-50 text-fuchsia-700 font-medium flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <List className="w-5 h-5" />
                  <span>Voir Toutes les Tâches</span>
                </Link>
                <Link to="/rewards" className=" p-3 rounded-lg bg-yellow-50 text-yellow-700 font-medium flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <Gift className="w-5 h-5" />
                  <span>Mes Récompenses</span>
                </Link>
                <div className="pt-3 border-t border-blue-100">
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-fuchsia-400 flex items-center justify-center text-white">
                        <span className="font-bold">L</span>
                      </div>
                      <span className="font-medium text-gray-800">Lucas</span>
                    </div>
                    <button className="text-sm text-blue-600">Déconnexion</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Contenu principal avec padding adaptatif */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header enfant */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 lg:mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ fontFamily: "'Fredoka One', cursive" }}>
                <span className="bg-gradient-to-r from-blue-600 via-fuchsia-600 to-yellow-500 bg-clip-text text-transparent">
                  Bienvenue Lucas !
                </span>
              </h1>
              <p className="text-blue-600/80 text-sm sm:text-base lg:text-lg">
                Prêt pour de nouvelles aventures ? 🚀
              </p>
            </div>

            {/* Contrôles de vue */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-sm text-gray-600 hidden sm:block">Vue :</div>
              <div className="flex bg-white rounded-lg p-1 border border-blue-100">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Statistiques - Ultra Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-6"
        >
          {[
            {
              label: 'Mes Points',
              value: totalPoints,
              icon: '🏆',
              color: 'from-yellow-400 to-amber-400',
              bg: 'bg-gradient-to-r from-yellow-50 to-amber-50'
            },
            {
              label: 'À Faire',
              value: pendingTasks,
              icon: '🎯',
              color: 'from-blue-400 to-cyan-400',
              bg: 'bg-gradient-to-r from-blue-50 to-cyan-50'
            },
            {
              label: 'Terminées',
              value: completedTasks,
              icon: '✅',
              color: 'from-emerald-400 to-teal-400',
              bg: 'bg-gradient-to-r from-emerald-50 to-teal-50'
            },
            {
              label: 'Progression',
              value: `${myTasks.length > 0 ? Math.round((completedTasks / myTasks.length) * 100) : 0}%`,
              icon: '📈',
              color: 'from-fuchsia-400 to-pink-400',
              bg: 'bg-gradient-to-r from-fuchsia-50 to-pink-50'
            },
            {
              label: 'Série',
              value: `${streak} jours`,
              icon: '🔥',
              color: 'from-orange-400 to-red-400',
              bg: 'bg-gradient-to-r from-orange-50 to-red-50'
            },
            {
              label: 'Niveau',
              value: level,
              icon: '⭐',
              color: 'from-purple-400 to-violet-400',
              bg: 'bg-gradient-to-r from-purple-50 to-violet-50'
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className={`${stat.bg} rounded-xl p-3 border border-white/50 shadow-sm`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-2xl mb-1 animate-bounce">{stat.icon}</div>
                <div className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-600 mt-1">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Grille principale - Ultra Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Mes Missions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-blue-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-blue-800" style={{ fontFamily: "'Fredoka One', cursive" }}>
                      Mes Missions ({myTasks.length})
                    </h2>
                    <p className="text-blue-600/80 text-sm">Complète pour gagner des points !</p>
                  </div>
                </div>
                <div className="text-2xl animate-pulse">🚀</div>
              </div>

              {/* Vue selon le mode */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {myTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ y: -5 }}
                      className={`p-4 rounded-xl border-2 ${task.status === 'completed'
                        ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50'
                        : 'border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50'
                        }`}
                      onClick={() => {
                        setSelectedTask(task);
                        setShowTaskModal(true);
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-3xl">{task.emoji}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${task.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                            }`}>
                            {task.status === 'completed' ? '✅' : '⏳'}
                          </span>
                        </div>
                        <h3 className="font-bold text-blue-800 text-sm sm:text-base mb-2 line-clamp-1">{task.title}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 flex-grow">{task.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {task.points} pts
                          </div>
                          {task.status !== 'completed' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                completeTask(task.id);
                              }}
                              className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-lg font-bold"
                            >
                              TERMINER
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {myTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ x: 5 }}
                      className="p-4 rounded-xl border border-blue-100 bg-white/50 flex items-center gap-4"
                      onClick={() => {
                        setSelectedTask(task);
                        setShowTaskModal(true);
                      }}
                    >
                      <div className="text-2xl">{task.emoji}</div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-bold text-blue-800">{task.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-blue-600">{task.points} pts</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${task.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                              }`}>
                              {task.status === 'completed' ? '✅' : '⏳'}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-1">{task.description}</p>
                      </div>
                      {task.status !== 'completed' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            completeTask(task.id);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold text-sm"
                        >
                          ✓
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Section droite - Récompenses et Notifications */}
          <div className="space-y-4 sm:space-y-6">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-fuchsia-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-lg">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-fuchsia-800" style={{ fontFamily: "'Fredoka One', cursive" }}>
                    Mes Alertes
                  </h3>
                </div>
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>

              <div className="space-y-3 max-h-[200px] overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg ${!notif.read ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                  >
                    <div className="flex gap-3">
                      <div className="text-xl">{notif.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-yellow-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg">
                  <Medal className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-yellow-800" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  Mes Badges
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { icon: '🔥', label: 'Série', unlocked: streak >= 3 },
                  { icon: '⭐', label: 'Niveau', unlocked: level >= 2 },
                  { icon: '🏆', label: 'Points', unlocked: totalPoints >= 100 },
                  { icon: '✅', label: 'Productif', unlocked: completedTasks >= 3 },
                  { icon: '⚡', label: 'Rapide', unlocked: true },
                  { icon: '❤️', label: 'Gentil', unlocked: true },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`text-center p-2 sm:p-3 rounded-lg ${badge.unlocked ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200' : 'bg-gray-100 border-gray-200 opacity-40'}`}
                  >
                    <div className="text-xl sm:text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium">{badge.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Objectifs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-blue-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-blue-800" style={{ fontFamily: "'Fredoka One', cursive" }}>
                  Mes Objectifs
                </h3>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Atteindre 200 points</span>
                    <span className="font-bold text-blue-600">{totalPoints}/200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${Math.min((totalPoints / 200) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Série de 10 jours</span>
                    <span className="font-bold text-orange-600">{streak}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${Math.min((streak / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal mission - Responsive */}
      <AnimatePresence>
        {showTaskModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50"
            onClick={() => setShowTaskModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-blue-100"
              onClick={(e) => e.stopPropagation()}
              style={{ fontFamily: "'Comic Neue', cursive" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{selectedTask.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800" style={{ fontFamily: "'Fredoka One', cursive" }}>
                      {selectedTask.title}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${selectedTask.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {selectedTask.status === 'completed' ? '✅ Terminée' : '🎯 En cours'}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                        {selectedTask.points} pts
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Description</h4>
                  <p className="text-gray-600 bg-blue-50/50 p-3 rounded-lg">
                    {selectedTask.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-100">
                    <div className="text-sm text-blue-600 mb-1">Points</div>
                    <div className="text-2xl font-bold text-blue-700">{selectedTask.points}</div>
                  </div>
                  <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 p-3 rounded-lg border border-fuchsia-100">
                    <div className="text-sm text-fuchsia-600 mb-1">Date limite</div>
                    <div className="text-lg font-bold text-fuchsia-700">{selectedTask.dueDate}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-blue-100">
                {selectedTask.status !== 'completed' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      completeTask(selectedTask.id);
                      setShowTaskModal(false);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600"
                    style={{ fontFamily: "'Fredoka One', cursive" }}
                  >
                    TERMINER LA MISSION !
                  </motion.button>
                )}
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-blue-100 z-30">
        <div className="grid grid-cols-3 h-16">
          <Link to="/" className="flex flex-col items-center justify-center text-blue-600">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Accueil</span>
          </Link>
          <Link to="/all-tasks" className="flex flex-col items-center justify-center text-fuchsia-600">
            <List className="w-5 h-5" />
            <span className="text-xs mt-1">Tâches</span>
          </Link>
          <Link to="/rewards" className="flex flex-col items-center justify-center text-yellow-600">
            <Gift className="w-5 h-5" />
            <span className="text-xs mt-1">Récompenses</span>
          </Link>
        </div>
      </div>
    </div>
  );
}