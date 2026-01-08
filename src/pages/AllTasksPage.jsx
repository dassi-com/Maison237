import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, Search, Calendar, Clock, 
  User, CheckCircle, AlertCircle, 
   SortDesc, Home, Sparkles,
  ChevronLeft, ChevronRight, Grid, List
} from 'lucide-react';

export default function AllTasksPage() {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    assignedTo: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [familyMembers, setFamilyMembers] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'calendar'

  // Données simulées
  useEffect(() => {
    const simulatedMembers = [
      { id: '1', name: 'Papa', role: 'parent', color: 'bg-fuchsia-500' },
      { id: '2', name: 'Maman', role: 'parent', color: 'bg-pink-500' },
      { id: '3', name: 'Lucas', role: 'child', color: 'bg-rose-500' },
      { id: '4', name: 'Emma', role: 'child', color: 'bg-orange-500' },
    ];
    setFamilyMembers(simulatedMembers);

    const simulatedTasks = [
      {
        id: '1',
        title: 'Ranger la chambre',
        description: 'Ranger les jouets et faire le lit',
        status: 'completed',
        assignedTo: '3',
        createdBy: '1',
        points: 50,
        dueDate: '2024-02-15',
        createdAt: { toDate: () => new Date('2024-02-10') },
        completedAt: { toDate: () => new Date('2024-02-14') }
      },
      {
        id: '2',
        title: 'Faire les courses',
        description: 'Acheter du lait, des œufs et du pain',
        status: 'pending',
        assignedTo: '2',
        createdBy: '2',
        points: 30,
        dueDate: '2024-02-16',
        createdAt: { toDate: () => new Date('2024-02-11') }
      },
      {
        id: '3',
        title: 'Devoirs de mathématiques',
        description: 'Exercices de géométrie page 45-46',
        status: 'pending',
        assignedTo: '3',
        createdBy: '1',
        points: 25,
        dueDate: '2024-02-14',
        createdAt: { toDate: () => new Date('2024-02-09') }
      },
      {
        id: '4',
        title: 'Arroser les plantes',
        description: 'Plantes du salon et de la terrasse',
        status: 'completed',
        assignedTo: '4',
        createdBy: '2',
        points: 15,
        dueDate: '2024-02-13',
        createdAt: { toDate: () => new Date('2024-02-08') },
        completedAt: { toDate: () => new Date('2024-02-13') }
      },
      {
        id: '5',
        title: 'Préparer le dîner',
        description: 'Pizza maison avec salade',
        status: 'pending',
        assignedTo: '1',
        createdBy: '2',
        points: 40,
        dueDate: '2024-02-15',
        createdAt: { toDate: () => new Date('2024-02-12') }
      },
    ];
    
    setAllTasks(simulatedTasks);
    setFilteredTasks(simulatedTasks);
  }, []);

  // Navigation du calendrier
  const getMonthYear = () => {
    return currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Créer un tableau de jours
    const days = [];
    // Ajouter les jours du mois précédent pour compléter la première semaine
    const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Lundi = 0
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    // Ajouter les jours du mois en cours
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true });
    }
    
    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getTasksForDay = (day) => {
    if (!day) return [];
    return allTasks.filter(task => {
      const taskDate = task.createdAt?.toDate();
      return taskDate && 
        taskDate.getDate() === day &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear();
    });
  };

  // Filtres
  useEffect(() => {
    let result = [...allTasks];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        familyMembers.find(m => m.id === task.assignedTo)?.name.toLowerCase().includes(term)
      );
    }

    if (filters.status !== 'all') {
      result = result.filter(task => task.status === filters.status);
    }

    if (filters.assignedTo !== 'all') {
      result = result.filter(task => task.assignedTo === filters.assignedTo);
    }

    result.sort((a, b) => {
      let valueA, valueB;

      switch (filters.sortBy) {
        case 'points':
          valueA = a.points;
          valueB = b.points;
          break;
        case 'dueDate':
          valueA = a.dueDate || '9999-12-31';
          valueB = b.dueDate || '9999-12-31';
          break;
        default:
          valueA = a.createdAt?.toDate() || new Date(0);
          valueB = b.createdAt?.toDate() || new Date(0);
      }

      if (filters.sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setFilteredTasks(result);
  }, [allTasks, searchTerm, filters, familyMembers]);

  // Statistiques
  const stats = {
    total: allTasks.length,
    completed: allTasks.filter(t => t.status === 'completed').length,
    pending: allTasks.filter(t => t.status === 'pending').length,
    totalPoints: allTasks
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + (t.points || 0), 0)
  };

  const days = getDaysInMonth();
  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 via-pink-50/50 to-orange-50/50 p-4 md:p-6 lg:p-8 relative">
      
      {/* Étoiles animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 6,
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 2,
        })).map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.3, 0], scale: [0, 1, 0], rotate: 360 }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="text-fuchsia-300/20" size={star.size} />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="mb-6 lg:mb-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="p-2 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-lg">
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                <span className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Mamaison237
                </span>
              </h1>
            </motion.div>
            <p className="text-fuchsia-700/80 pl-11 sm:pl-14 text-sm sm:text-base">
              Toutes les tâches de la famille en un coup d'œil
            </p>
          </div>

          {/* Stats rapides - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:flex lg:flex-wrap lg:gap-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-sm border border-rose-100">
              <div className="text-xs sm:text-sm text-fuchsia-600">Total</div>
              <div className="text-xl sm:text-2xl font-bold text-fuchsia-800">{stats.total}</div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50/90 to-teal-50/90 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-sm border border-emerald-200">
              <div className="text-xs sm:text-sm text-emerald-700">Terminées</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-800">{stats.completed}</div>
            </div>
            <div className="bg-gradient-to-r from-amber-50/90 to-yellow-50/90 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-sm border border-amber-200">
              <div className="text-xs sm:text-sm text-amber-700">En attente</div>
              <div className="text-xl sm:text-2xl font-bold text-amber-800">{stats.pending}</div>
            </div>
            <div className="bg-gradient-to-r from-fuchsia-50/90 to-pink-50/90 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-sm border border-fuchsia-200">
              <div className="text-xs sm:text-sm text-fuchsia-700">Points</div>
              <div className="text-xl sm:text-2xl font-bold text-fuchsia-800">{stats.totalPoints}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Barre de recherche et filtres - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 mb-6 lg:mb-8 border border-rose-100 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Barre de recherche */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une tâche..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 text-sm sm:text-base border-2 border-rose-100 rounded-xl focus:border-fuchsia-300 focus:outline-none bg-rose-50/50 text-fuchsia-800 placeholder-fuchsia-400/60 transition-all duration-300"
              />
            </div>
          </div>

          {/* Filtre par statut */}
          <div>
            <label className="flex items-center gap-2 text-fuchsia-700 font-medium mb-2 text-sm sm:text-base">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-500" />
              Statut
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full p-3 text-sm sm:text-base border-2 border-rose-100 rounded-xl focus:border-fuchsia-300 focus:outline-none bg-rose-50/50 text-fuchsia-800"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="completed">Terminées</option>
            </select>
          </div>

          {/* Filtre par personne */}
          <div>
            <label className="flex items-center gap-2 text-fuchsia-700 font-medium mb-2 text-sm sm:text-base">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-500" />
              Assignée à
            </label>
            <select
              value={filters.assignedTo}
              onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}
              className="w-full p-3 text-sm sm:text-base border-2 border-rose-100 rounded-xl focus:border-fuchsia-300 focus:outline-none bg-rose-50/50 text-fuchsia-800"
            >
              <option value="all">Tout le monde</option>
              {familyMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.role === 'parent' ? 'Parent' : 'Enfant'})
                </option>
              ))}
            </select>
          </div>

          {/* Tri et vue */}
          <div>
            <label className="flex items-center gap-2 text-fuchsia-700 font-medium mb-2 text-sm sm:text-base">
              <SortDesc className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-500" />
              Trier & Vue
            </label>
            <div className="flex gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="flex-1 p-3 text-sm sm:text-base border-2 border-rose-100 rounded-xl focus:border-fuchsia-300 focus:outline-none bg-rose-50/50 text-fuchsia-800"
              >
                <option value="date">Date de création</option>
                <option value="dueDate">Date limite</option>
                <option value="points">Points</option>
              </select>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilters({
                    ...filters,
                    sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
                  })}
                  className="px-3 sm:px-4 py-3 bg-gradient-to-r from-fuchsia-100 to-pink-100 rounded-xl hover:from-fuchsia-200 hover:to-pink-200 transition-all text-fuchsia-700 border border-fuchsia-200 text-sm"
                >
                  {filters.sortOrder === 'asc' ? '↑' : '↓'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                  className={`px-3 sm:px-4 py-3 rounded-xl transition-all border text-sm ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white border-fuchsia-500'
                      : 'bg-white text-fuchsia-700 border-fuchsia-200'
                  }`}
                >
                  {viewMode === 'list' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vue Liste - Responsive */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-rose-100 relative z-10 mb-6 lg:mb-8"
          >
            {/* En-tête du tableau - Responsive */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 sm:p-6 border-b-2 bg-gradient-to-r from-fuchsia-50/50 to-pink-50/50 text-fuchsia-800 font-semibold text-sm sm:text-base">
              <div className="md:col-span-5 lg:col-span-4">Tâche</div>
              <div className="md:col-span-3 lg:col-span-2">Assignée à</div>
              <div className="md:col-span-2">Date</div>
              <div className="md:col-span-1">Statut</div>
              <div className="md:col-span-1 text-right">Points</div>
            </div>

            {/* Liste des tâches - Responsive */}
            <AnimatePresence>
              {filteredTasks.length === 0 ? (
                <div className="p-8 sm:p-12 text-center text-fuchsia-500">
                  <Filter className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg sm:text-xl font-semibold">Aucune tâche ne correspond aux filtres</p>
                  <p className="mt-2 text-fuchsia-600/70 text-sm sm:text-base">Essayez de modifier vos critères de recherche</p>
                </div>
              ) : (
                <div className="divide-y divide-rose-100/50">
                  {filteredTasks.map((task, index) => {
                    const assignee = familyMembers.find(m => m.id === task.assignedTo);
                    const creator = familyMembers.find(m => m.id === task.createdBy);

                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 sm:p-6 hover:bg-fuchsia-50/30 transition-colors"
                      >
                        {/* Mobile View */}
                        <div className="md:hidden space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                {task.status === 'completed' ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                                ) : (
                                  <AlertCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                                )}
                                <div>
                                  <h3 className="font-bold text-fuchsia-800 text-base">{task.title}</h3>
                                  <p className="text-fuchsia-600/80 text-sm mt-1 line-clamp-2">
                                    {task.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                                {task.points}
                              </div>
                              <div className="text-xs text-fuchsia-600/70">points</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                                assignee?.role === 'parent' 
                                  ? 'bg-gradient-to-r from-fuchsia-400 to-pink-400 text-white' 
                                  : 'bg-gradient-to-r from-rose-400 to-orange-400 text-white'
                              }`}>
                                <User className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-fuchsia-800">{assignee?.name || 'Non assigné'}</p>
                                <p className="text-xs text-fuchsia-600/70">
                                  {assignee?.role === 'parent' ? 'Parent' : 'Enfant'}
                                </p>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="w-3 h-3 text-fuchsia-400" />
                                <span className="text-xs text-fuchsia-700">
                                  {task.createdAt?.toDate().toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3 text-fuchsia-400" />
                                <span className="text-xs text-fuchsia-700">
                                  {task.createdAt?.toDate().toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              task.status === 'completed'
                                ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200'
                                : 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200'
                            }`}>
                              {task.status === 'completed' ? 'Terminée' : 'En attente'}
                            </span>
                            {task.dueDate && (
                              <span className="px-2 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded text-xs border border-amber-200">
                                Échéance: {task.dueDate}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Desktop View */}
                        <div className="hidden md:grid md:grid-cols-12 gap-4">
                          <div className="md:col-span-5 lg:col-span-4">
                            <div className="flex items-start gap-3">
                              {task.status === 'completed' ? (
                                <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                              )}
                              <div>
                                <h3 className="font-bold text-fuchsia-800">{task.title}</h3>
                                <p className="text-fuchsia-600/80 text-sm mt-1 line-clamp-2">
                                  {task.description}
                                </p>
                                <div className="text-xs text-fuchsia-500/70 mt-2">
                                  Créée par: {creator?.name || 'Inconnu'}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-3 lg:col-span-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                                assignee?.role === 'parent' 
                                  ? 'bg-gradient-to-r from-fuchsia-400 to-pink-400 text-white' 
                                  : 'bg-gradient-to-r from-rose-400 to-orange-400 text-white'
                              }`}>
                                <User className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-semibold text-fuchsia-800">{assignee?.name || 'Non assigné'}</p>
                                <p className="text-sm text-fuchsia-600/70">
                                  {assignee?.role === 'parent' ? 'Parent' : 'Enfant'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-fuchsia-400" />
                                <span className="text-sm text-fuchsia-700">
                                  {task.createdAt?.toDate().toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-fuchsia-400" />
                                <span className="text-sm text-fuchsia-700">
                                  {task.createdAt?.toDate().toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-1">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              task.status === 'completed'
                                ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200'
                                : 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200'
                            }`}>
                              {task.status === 'completed' ? 'Terminée' : 'En attente'}
                            </span>
                          </div>

                          <div className="md:col-span-1 text-right">
                            <div className="text-2xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                              {task.points}
                            </div>
                            <div className="text-sm text-fuchsia-600/70">points</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>

            {/* Pied de tableau */}
            <div className="p-4 sm:p-6 border-t-2 bg-gradient-to-r from-fuchsia-50/50 to-pink-50/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-fuchsia-700 text-sm sm:text-base">
                  Affichage de <span className="font-bold text-fuchsia-800">{filteredTasks.length}</span> tâches
                  {searchTerm && ` pour "${searchTerm}"`}
                </div>
                <div className="text-xs sm:text-sm text-fuchsia-600/70">
                  Dernière mise à jour: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10"
          >
            {/* Contrôles du calendrier */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border border-rose-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-fuchsia-800">
                  Calendrier des Tâches
                </h2>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevMonth}
                    className="p-2 rounded-lg bg-gradient-to-r from-fuchsia-100 to-pink-100 text-fuchsia-700 hover:from-fuchsia-200 hover:to-pink-200 transition-all border border-fuchsia-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <div className="flex-1 text-center">
                    <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                      {getMonthYear()}
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextMonth}
                    className="p-2 rounded-lg bg-gradient-to-r from-fuchsia-100 to-pink-100 text-fuchsia-700 hover:from-fuchsia-200 hover:to-pink-200 transition-all border border-fuchsia-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToToday}
                    className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-lg hover:from-fuchsia-600 hover:to-pink-600 transition-all text-sm sm:text-base"
                  >
                    Aujourd'hui
                  </motion.button>
                </div>
              </div>

              {/* Grille du calendrier */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100">
                {/* Jours de la semaine */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-fuchsia-700 font-semibold p-2 text-xs sm:text-sm"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Jours du mois */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {days.map(({ day, isCurrentMonth }, index) => {
                    const tasksForDay = day ? getTasksForDay(day) : [];
                    const isToday = day && 
                      new Date().getDate() === day &&
                      new Date().getMonth() === currentDate.getMonth() &&
                      new Date().getFullYear() === currentDate.getFullYear();

                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`min-h-16 sm:min-h-20 p-1 sm:p-2 rounded-lg border transition-all ${
                          !day ? 'border-transparent' :
                          !isCurrentMonth ? 'border-rose-50 bg-rose-50/30' :
                          isToday ? 'border-fuchsia-400 bg-gradient-to-br from-fuchsia-100 to-pink-100' :
                          tasksForDay.length > 0 ? 'border-fuchsia-300 bg-gradient-to-br from-fuchsia-50/80 to-pink-50/80' :
                          'border-rose-100 bg-white/80'
                        }`}
                      >
                        {day && (
                          <>
                            <div className="flex justify-between items-start">
                              <span className={`font-semibold text-xs sm:text-sm ${
                                !isCurrentMonth ? 'text-rose-400/70' :
                                isToday ? 'text-fuchsia-700' :
                                tasksForDay.length > 0 ? 'text-fuchsia-700' : 'text-fuchsia-500'
                              }`}>
                                {day}
                              </span>
                              {tasksForDay.length > 0 && (
                                <span className="text-xs bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                                  {tasksForDay.length}
                                </span>
                              )}
                            </div>
                            
                            {/* Mini indicateurs de tâches */}
                            {tasksForDay.slice(0, 2).map(task => (
                              <div
                                key={task.id}
                                className={`text-[10px] sm:text-xs mt-1 p-1 rounded truncate ${
                                  task.status === 'completed'
                                    ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200'
                                    : 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200'
                                }`}
                                title={task.title}
                              >
                                {task.title.substring(0, 8)}...
                              </div>
                            ))}
                            
                            {tasksForDay.length > 2 && (
                              <div className="text-[10px] sm:text-xs text-fuchsia-500/70 mt-1">
                                +{tasksForDay.length - 2} autres
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Légende */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500"></div>
                  <span className="text-xs sm:text-sm text-fuchsia-700">Aujourd'hui</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                  <span className="text-xs sm:text-sm text-fuchsia-700">Tâches terminées</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400"></div>
                  <span className="text-xs sm:text-sm text-fuchsia-700">Tâches en attente</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}