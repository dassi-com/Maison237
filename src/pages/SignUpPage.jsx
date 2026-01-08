import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Users,  Baby, Sparkles, Home } from 'lucide-react';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '', // 'parent' ou 'child'
    familyCode: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulation d'une requête API
    setTimeout(() => {
      // Simuler la création de compte réussie
      console.log('Compte créé:', formData);
      setIsSubmitting(false);
      
      // Rediriger vers le dashboard correspondant
      if (formData.role === 'parent') {
        navigate('/ParentDashboard');
      } else {
        navigate('/ChildDashboard');
      }
    }, 1500);
  };

  // Créer 10 étoiles pour l'arrière-plan
  const stars = Array.from({ length: 10 }, (_, i) => ({
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
              Rejoignez Mamaison237
            </span>
          </h1>
          <p className="text-rose-600/80">
            Créez votre compte familial
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
          {/* Nom */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="flex items-center gap-2 text-rose-700 font-medium mb-2">
              <User className="w-5 h-5 text-rose-500" />
              Nom complet
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 border-2 border-rose-100 rounded-xl focus:border-rose-300 focus:outline-none bg-rose-50/50 text-rose-800 placeholder-rose-400/60 transition-all duration-300"
              placeholder="Votre nom"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.3 }}
          >
            <label className="flex items-center gap-2 text-rose-700 font-medium mb-2">
              <Lock className="w-5 h-5 text-rose-500" />
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-4 border-2 border-rose-100 rounded-xl focus:border-rose-300 focus:outline-none bg-rose-50/50 text-rose-800 placeholder-rose-400/60 transition-all duration-300"
              placeholder="••••••••"
            />
          </motion.div>

          {/* Rôle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="flex items-center gap-2 text-rose-700 font-medium mb-3">
              <Users className="w-5 h-5 text-rose-500" />
              Je suis
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'parent' })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-300 ${
                  formData.role === 'parent'
                    ? 'border-rose-400 bg-gradient-to-br from-rose-100 to-pink-100 text-rose-700 shadow-md'
                    : 'border-rose-100 bg-rose-50/50 text-rose-600 hover:border-rose-200'
                }`}
              >
                <div className={`p-3 rounded-full ${
                  formData.role === 'parent' 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-rose-100 text-rose-500'
                }`}>
                  <Users className="w-6 h-6" />
                </div>
                <span className="font-semibold">Parent</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'child' })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-300 ${
                  formData.role === 'child'
                    ? 'border-orange-400 bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 shadow-md'
                    : 'border-orange-100 bg-orange-50/50 text-orange-600 hover:border-orange-200'
                }`}
              >
                <div className={`p-3 rounded-full ${
                  formData.role === 'child' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-orange-100 text-orange-500'
                }`}>
                  < Baby className="w-6 h-6" />
                </div>
                <span className="font-semibold">Enfant</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Code famille (optionnel) */}
          {formData.role === 'child' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label className="text-rose-700 font-medium mb-2 block">
                Code famille (optionnel)
              </label>
              <input
                type="text"
                value={formData.familyCode}
                onChange={(e) => setFormData({ ...formData, familyCode: e.target.value })}
                className="w-full p-4 border-2 border-rose-100 rounded-xl focus:border-rose-300 focus:outline-none bg-rose-50/50 text-rose-800 placeholder-rose-400/60"
                placeholder="Ex: FAMILY123"
              />
              <p className="text-rose-500/70 text-sm mt-2">
                Demandez ce code aux parents pour rejoindre votre famille
              </p>
            </motion.div>
          )}

          {/* Bouton d'inscription */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !formData.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              isSubmitting || !formData.role
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
                Création en cours...
              </>
            ) : (
              <>
                Créer mon compte
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

        {/* Lien vers connexion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 pt-6 border-t border-rose-100"
        >
          <p className="text-rose-600/80">
            Déjà un compte ?{' '}
            <button
              onClick={() => navigate('/signin')}
              className="text-rose-500 font-semibold hover:text-rose-600 transition-colors relative group"
            >
              <span className="relative">
                Se connecter
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
        {[...Array(6)].map((_, i) => (
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
    </div>
  );
}