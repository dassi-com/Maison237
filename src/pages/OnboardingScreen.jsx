import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, CheckCircle, Star, Sparkles } from 'lucide-react';

export default function OnboardingScreen() {
  const navigate = useNavigate();

  const features = [
    { icon: Home, text: 'Gérez les tâches familiales' },
    { icon: CheckCircle, text: 'Suivez les progrès en temps réel' },
    { icon: Star, text: 'Gagnez des récompenses' },
  ];

  // Créer 20 étoiles pour l'arrière-plan
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 12 + 8, // Taille entre 8px et 20px
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2, // Durée entre 2s et 5s
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-orange-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Étoiles animées en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Star 
              className="text-yellow-400/40" 
              size={star.size}
            />
          </motion.div>
        ))}
        
        {/* Quelques étoiles scintillantes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          >
            <Sparkles className="text-pink-300/50" size={16} />
          </motion.div>
        ))}
      </div>

      {/* Logo/Animation avec effet brillant */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="mb-8 relative"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-rose-400 via-pink-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl relative">
          {/* Effet de brillance */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: [-150, 150],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <Home className="w-16 h-16 text-white relative z-10" />
        </div>
      </motion.div>

      {/* Titre avec animation de couleur */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Mamaison237
          </span>
        </h1>
        <motion.span
          className="text-2xl block mt-2 font-semibold"
          animate={{
            color: ['#dc2626', '#db2777', '#ea580c', '#16a34a'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Organisation familiale simplifiée
        </motion.span>
      </motion.div>

      {/* Liste des fonctionnalités avec couleurs variées */}
      <div className="space-y-4 mb-12 max-w-md relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`flex items-center gap-4 p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
              index === 0 
                ? 'bg-gradient-to-r from-rose-100 to-pink-100 border-l-4 border-rose-400' 
                : index === 1 
                ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-l-4 border-amber-400'
                : 'bg-gradient-to-r from-emerald-100 to-teal-100 border-l-4 border-emerald-400'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              index === 0 ? 'bg-rose-500' 
              : index === 1 ? 'bg-amber-500' 
              : 'bg-emerald-500'
            }`}>
              <feature.icon className="w-5 h-5 text-white" />
            </div>
            <span className={`text-lg font-medium ${
              index === 0 ? 'text-rose-800' 
              : index === 1 ? 'text-amber-800' 
              : 'text-emerald-800'
            }`}>
              {feature.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bouton Commencer avec animation festive */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ 
          scale: 1.05,
          background: "linear-gradient(45deg, #ec4899, #f97316, #eab308, #22c55e)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/signup')}
        className="px-12 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 hover:from-rose-600 hover:via-pink-600 hover:to-orange-600 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
      >
        {/* Effet de brillance sur le bouton */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        <span className="relative flex items-center gap-2">
          Commencer 
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🎉
          </motion.span>
        </span>
      </motion.button>

      {/* Lien de connexion avec animation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-rose-700/80 mt-8 text-center relative z-10"
      >
        Déjà un compte ?{' '}
        <motion.button
          onClick={() => navigate('/signin')}
          className="text-emerald-600 underline font-semibold relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative">
            Se connecter
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </span>
        </motion.button>
      </motion.p>

      {/* Animation de confettis au survol du bouton */}
      <style >{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}