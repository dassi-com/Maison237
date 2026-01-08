import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Home, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulation d'une connexion réussie
    setTimeout(() => {
      console.log('Connexion réussie:', formData);
      setIsSubmitting(false);
      
      // Simuler un rôle et rediriger
      const simulatedRole = Math.random() > 0.5 ? 'parent' : 'child';
      navigate(simulatedRole === 'parent' ? '/ParentDashboard' : '/ChildDashboard');
    }, 1500);
  };

  // Créer 8 étoiles pour l'arrière-plan
  const stars = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 6,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
      
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
              opacity: [0, 0.4, 0],
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
            <Sparkles className="text-amber-300/20" size={star.size} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-md w-full border border-rose-100 relative z-10"
      >
        {/* En-tête avec logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-300 via-pink-300 to-orange-300 rounded-full mb-4 shadow-lg">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Bienvenue sur Mamaison237
            </span>
          </h1>
          <p className="text-rose-600/80">
            Accédez à votre espace familial
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rose-50 text-rose-700 p-4 rounded-xl mb-6 border border-rose-200"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
              {error}
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="flex items-center gap-2 text-rose-700 font-medium mb-2">
              <Mail className="w-5 h-5 text-rose-500" />
              Adresse email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 border-2 border-rose-100 rounded-xl focus:border-rose-300 focus:outline-none bg-rose-50/50 text-rose-800 placeholder-rose-400/60 transition-all duration-300"
              placeholder="votre@email.com"
            />
          </motion.div>

          {/* Mot de passe */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-2">
              <label className="flex items-center gap-2 text-rose-700 font-medium">
                <Lock className="w-5 h-5 text-rose-500" />
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-rose-500 hover:text-rose-600 text-sm flex items-center gap-1"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span>Masquer</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Voir</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-4 border-2 border-rose-100 rounded-xl focus:border-rose-300 focus:outline-none bg-rose-50/50 text-rose-800 placeholder-rose-400/60 transition-all duration-300 pr-12"
                placeholder="••••••••"
              />
            </div>
          </motion.div>

          {/* Lien mot de passe oublié */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-right"
          >
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-rose-500 hover:text-rose-600 text-sm font-medium transition-colors"
            >
              Mot de passe oublié ?
            </button>
          </motion.div>

          {/* Bouton de connexion */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              isSubmitting
                ? 'bg-gradient-to-r from-rose-200 to-pink-200 text-rose-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 hover:from-rose-500 hover:via-pink-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Connexion en cours...
              </>
            ) : (
              <>
                Se connecter
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </>
            )}
          </motion.button>
        </form>

        {/* Séparateur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center my-8"
        >
          <div className="flex-1 h-px bg-rose-100"></div>
          <span className="px-4 text-rose-500/70 text-sm">Ou</span>
          <div className="flex-1 h-px bg-rose-100"></div>
        </motion.div>



        {/* Lien vers inscription */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 pt-6 border-t border-rose-100"
        >
          <p className="text-rose-600/80">
            Pas encore de compte ?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-rose-500 font-semibold hover:text-rose-600 transition-colors relative group"
            >
              <span className="relative">
                S inscrire maintenant
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300"
                />
              </span>
            </button>
          </p>
        </motion.div>
      </motion.div>

      {/* Points lumineux en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(251, 113, 133, 0.08) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 5,
              delay: i * 0.8,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Animation de famille en bas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-6xl"
      >
        👨‍👩‍👧‍👦
      </motion.div>
    </div>
  );
}