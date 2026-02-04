import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind class merging
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// SafeIcon Component - handles all Lucide icons
const SafeIcon = ({ name, size = 24, className, color }) => {
  const iconMap = {
    'home': 'Home',
    'menu': 'Menu',
    'x': 'X',
    'phone': 'Phone',
    'mail': 'Mail',
    'map-pin': 'MapPin',
    'heart': 'Heart',
    'star': 'Star',
    'paw-print': 'PawPrint',
    'check-circle': 'CheckCircle',
    'chevron-right': 'ChevronRight',
    'arrow-right': 'ArrowRight',
    'calendar': 'Calendar',
    'award': 'Award',
    'shield-check': 'ShieldCheck',
    'sparkles': 'Sparkles',
    'send': 'Send',
    'message-circle': 'MessageCircle',
    'camera': 'Camera',
    'user': 'User',
    'clock': 'Clock',
    'zap': 'Zap',
    'gift': 'Gift'
  }

  const pascalName = iconMap[name] || 'HelpCircle'
  
  // Dynamic import simulation - in real app we'd use lazy loading
  // But for this inline component, we'll use a mapping approach
  const iconComponents = {
    'Home': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    'Menu': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
    'X': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    'Phone': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    'Mail': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    'MapPin': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    'Heart': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
    'Star': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    'PawPrint': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a2.5 2.5 0 0 1-5 0V15a5 5 0 0 1-5-5z"/><circle cx="4" cy="16" r="2"/></svg>,
    'CheckCircle': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    'ChevronRight': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="m9 18 6-6-6-6"/></svg>,
    'ArrowRight': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
    'Calendar': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
    'Award': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    'ShieldCheck': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>,
    'Sparkles': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
    'Send': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
    'MessageCircle': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>,
    'Camera': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
    'User': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    'Clock': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    'Zap': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    'Gift': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.5 2.5v5"/><path d="M16.5 8v-2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-2.5 2.5h-5"/></svg>,
    'HelpCircle': () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={color ? { color } : {}}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
  }

  const IconComponent = iconComponents[pascalName] || iconComponents['HelpCircle']
  return <IconComponent />;
}

// Web3Forms Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e, accessKey) => {
    e.preventDefault()
    setIsSubmitting(true);
    setIsError(false);
    const formData = new FormData(e.target);
    formData.append('access_key', accessKey);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json()
      
      if (data.success) {
        setIsSuccess(true);
        e.target.reset()
      } else {
        setIsError(true);
        setErrorMessage(data.message || 'Что-то пошло не так');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Ошибка сети. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const resetForm = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
  }
  
  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm };
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Scroll reveal component
const ScrollReveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (;
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Gallery Component with slider
const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
      caption: "Белоснежный японский шпиц"
    },
    {
      url: "https://images.unsplash.com/photo-1601972599720-36938d4e6963?w=800&q=80",
      caption: "Игривый щенок"
    },
    {
      url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54d?w=800&q=80",
      caption: "Прекрасная улыбка"
    },
    {
      url: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&q=80",
      caption: "Грациозная поза"
    }
  ]
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  return (;
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl shadow-2xl aspect-[4/3] bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={images[currentIndex].caption}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
        
        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <p className="text-white font-medium text-lg">{images[currentIndex].caption}</p>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Предыдущее фото"
      >
        <SafeIcon name="chevron-right" size={24} className="rotate-180" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Следующее фото"
      >
        <SafeIcon name="chevron-right" size={24} />
      </button>
      
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentIndex ? "bg-coral-500 w-8" : "bg-gray-300 hover:bg-gray-400"
            )}
            aria-label={`Перейти к фото ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Contact Form Component
const ContactForm = () => {
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler()
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY' // Replace with your Web3Forms Access Key from https://web3forms.com
  
  return (;
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
            className="space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Иван Иванов"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (999) 000-00-00"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
              <textarea
                name="message"
                placeholder="Расскажите о себе и какой щенок вам интересен..."
                rows="4"
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 transition-all resize-none"
              ></textarea>
            </div>
            
            {isError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {errorMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-coral-500 hover:bg-coral-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center gap-2 shadow-lg shadow-coral-500/30"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <SafeIcon name="send" size={20} />
                  Отправить сообщение
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="text-center py-12"
          >
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon name="check-circle" size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Сообщение отправлено!
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Спасибо за обращение! Мы свяжемся с вами в ближайшее время.
            </p>
            <button
              onClick={resetForm}
              className="text-coral-500 hover:text-coral-600 font-semibold transition-colors"
            >
              Отправить ещё одно сообщение
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main App Component
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }
  
  const features = [
    {
      icon: "shield-check",
      title: "Здоровые щенки",
      description: "Все щенки проходят ветеринарный контроль, привиты по возрасту, имеют ветпаспорт."
    },
    {
      icon: "award",
      title: "Родословная РКФ",
      description: "Чистокровные щенки с документами Российской кинологической федерации."
    },
    {
      icon: "heart",
      title: "Социализация",
      description: "Щенки растут в семье, приучены к пеленке, знают основные команды."
    },
    {
      icon: "gift",
      title: "Комплект для старта",
      description: "Каждый щенок уезжает с кормом, игрушками и памяткой по уходу."
    }
  ]
  
  const puppies = [
    {
      name: "Снежок",
      age: "2 месяца",
      gender: "Мальчик",
      price: "80 000 ₽",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80",
      tags: ["Привит", "С документами"]
    },
    {
      name: "Белла",
      age: "2.5 месяца",
      gender: "Девочка",
      price: "85 000 ₽",
      image: "https://images.unsplash.com/photo-1601972599720-36938d4e6963?w=600&q=80",
      tags: ["Привита", "Шоу-класс"]
    },
    {
      name: "Лаки",
      age: "3 месяца",
      gender: "Мальчик",
      price: "75 000 ₽",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54d?w=600&q=80",
      tags: ["Привит", "Отличный характер"]
    }
  ]

  return (;
    <div className="min-h-screen bg-cream-50 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-orange-100 shadow-sm">
        <nav className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 group">
              <div className="bg-coral-500 text-white p-2 rounded-xl group-hover:scale-110 transition-transform">
                <SafeIcon name="paw-print" size={24} />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-800 block leading-tight">White Fluffy</span>
                <span className="text-xs text-coral-500 font-medium">Питомник японских шпицев</span>
              </div>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-600 hover:text-coral-500 font-medium transition-colors">О породе</a>
              <a href="#puppies" onClick={(e) => scrollToSection(e, 'puppies')} className="text-gray-600 hover:text-coral-500 font-medium transition-colors">Щенки</a>
              <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-gray-600 hover:text-coral-500 font-medium transition-colors">Галерея</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-gray-600 hover:text-coral-500 font-medium transition-colors">Контакты</a>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+79990000000" className="flex items-center gap-2 text-gray-700 hover:text-coral-500 transition-colors">
                <SafeIcon name="phone" size={18} />
                <span className="font-semibold">+7 (999) 000-00-00</span>
              </a>
              <button 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-coral-500/30"
              >
                Написать
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? <SafeIcon name="x" size={24} /> : <SafeIcon name="menu" size={24} />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-orange-100"
              >
                <div className="flex flex-col gap-4 pt-4">
                  <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-700 font-medium py-2">О породе</a>
                  <a href="#puppies" onClick={(e) => scrollToSection(e, 'puppies')} className="text-gray-700 font-medium py-2">Щенки</a>
                  <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-gray-700 font-medium py-2">Галерея</a>
                  <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-gray-700 font-medium py-2">Контакты</a>
                  <a href="tel:+79990000000" className="flex items-center gap-2 text-coral-500 font-semibold py-2">
                    <SafeIcon name="phone" size={18} />
                    +7 (999) 000-00-00
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-cream-50 to-white"></div>
          <div className="absolute top-20 right-0 w-96 h-96 bg-coral-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-orange-100 mb-6">
                <SafeIcon name="sparkles" size={16} className="text-coral-500" />
                <span className="text-sm font-medium text-gray-700">Профессиональный питомник с 2015 года</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
                Японский шпиц — <span className="text-coral-500">идеальный компаньон</span> для вашей семьи
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
                Белоснежные пушистые комочки счастья. Воспитанные, здоровые щенки с отличной родословной ждут любящих хозяев.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={(e) => scrollToSection(e, 'puppies')}
                  className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-coral-500/30"
                >
                  Выбрать щенка
                  <SafeIcon name="arrow-right" size={20} />
                </button>
                <button 
                  onClick={(e) => scrollToSection(e, 'about')}
                  className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg transition-all border-2 border-gray-200 hover:border-coral-500 flex items-center justify-center gap-2"
                >
                  Узнать о породе
                </button>
              </div>
              
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 border-2 border-white flex items-center justify-center">
                      <SafeIcon name="user" size={16} className="text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map((i) => (
                      <SafeIcon key={i} name="star" size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600"><span className="font-bold text-gray-800">200+</span> счастливых владельцев</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80" 
                  alt="Японский шпиц" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-xl">
                    <SafeIcon name="check-circle" size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Здоровье</p>
                    <p className="font-bold text-gray-800">100% гарантия</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-coral-100 p-2 rounded-xl">
                    <SafeIcon name="heart" size={24} className="text-coral-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Щенков</p>
                    <p className="font-bold text-gray-800">Найдено дом</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Breed Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-coral-500 font-semibold mb-3 uppercase tracking-wider text-sm">О породе</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Почему японский шпиц — <span className="text-coral-500">лучший выбор</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Японский шпиц — удивительная порода, сочетающая в себе элегантность, ум и преданность. Эти собаки идеально подходят для жизни в квартире и станут настоящими членами вашей семьи.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-cream-50 p-6 rounded-2xl border border-orange-100 hover:border-coral-500/50 hover:shadow-xl transition-all group h-full">
                  <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <SafeIcon name={feature.icon} size={28} className="text-coral-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={0.4}>
            <div className="mt-16 bg-gradient-to-r from-coral-500 to-coral-600 rounded-3xl p-8 md:p-12 text-white text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Характеристики породы</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div>
                  <p className="text-coral-100 text-sm mb-1">Рост в холке</p>
                  <p className="text-2xl font-bold">30-38 см</p>
                </div>
                <div>
                  <p className="text-coral-100 text-sm mb-1">Вес</p>
                  <p className="text-2xl font-bold">5-10 кг</p>
                </div>
                <div>
                  <p className="text-coral-100 text-sm mb-1">Продолжительность жизни</p>
                  <p className="text-2xl font-bold">12-14 лет</p>
                </div>
                <div>
                  <p className="text-coral-100 text-sm mb-1">Шерсть</p>
                  <p className="text-2xl font-bold">Белоснежная</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Puppies Section */}
      <section id="puppies" className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-coral-500 font-semibold mb-3 uppercase tracking-wider text-sm">Доступны</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Щенки в <span className="text-coral-500">питомнике</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Каждый щенок уникален. Выберите своего маленького друга, который станет частью вашей семьи.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {puppies.map((puppy, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                  <div className="relative overflow-hidden aspect-square">
                    <img 
                      src={puppy.image} 
                      alt={puppy.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-bold text-coral-500">{puppy.price}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-800">{puppy.name}</h3>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <SafeIcon name="calendar" size={14} />
                        {puppy.age}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 flex items-center gap-2">
                      <SafeIcon name="user" size={16} className="text-coral-500" />
                      {puppy.gender}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {puppy.tags.map((tag, i) => (
                        <span key={i} className="bg-cream-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={(e) => scrollToSection(e, 'contact')}
                      className="w-full bg-gray-800 hover:bg-coral-500 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      Забронировать
                      <SafeIcon name="chevron-right" size={18} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-coral-500 font-semibold mb-3 uppercase tracking-wider text-sm">Фотогалерея</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Наши <span className="text-coral-500">пушистые звёзды</span>
              </h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Gallery />
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-cream-50 via-white to-orange-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div>
                <span className="inline-block text-coral-500 font-semibold mb-3 uppercase tracking-wider text-sm">Контакты</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                  Свяжитесь <span className="text-coral-500">с нами</span>
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Готовы стать счастливым владельцем японского шпица? Заполните форму или позвоните нам прямо сейчас!
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-coral-100 p-3 rounded-xl">
                      <SafeIcon name="phone" size={24} className="text-coral-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Телефон</p>
                      <a href="tel:+79990000000" className="text-lg font-semibold text-gray-800 hover:text-coral-500 transition-colors">+7 (999) 000-00-00</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-coral-100 p-3 rounded-xl">
                      <SafeIcon name="mail" size={24} className="text-coral-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <a href="mailto:info@whitefluffy.ru" className="text-lg font-semibold text-gray-800 hover:text-coral-500 transition-colors">info@whitefluffy.ru</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-coral-100 p-3 rounded-xl">
                      <SafeIcon name="map-pin" size={24} className="text-coral-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Адрес</p>
                      <p className="text-lg font-semibold text-gray-800">г. Москва, ул. Примерная, 123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-coral-100 p-3 rounded-xl">
                      <SafeIcon name="clock" size={24} className="text-coral-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Часы работы</p>
                      <p className="text-lg font-semibold text-gray-800">Ежедневно 9:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-orange-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Написать нам</h3>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 telegram-safe-bottom">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-coral-500 text-white p-2 rounded-xl">
                  <SafeIcon name="paw-print" size={20} />
                </div>
                <span className="text-xl font-bold">White Fluffy</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Профессиональный питомник японских шпицев. Мы заботимся о каждом щенке и помогаем найти им любящие семьи.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Навигация</h4>
              <ul className="space-y-2">
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-400 hover:text-coral-500 transition-colors">О породе</a></li>
                <li><a href="#puppies" onClick={(e) => scrollToSection(e, 'puppies')} className="text-gray-400 hover:text-coral-500 transition-colors">Щенки</a></li>
                <li><a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-gray-400 hover:text-coral-500 transition-colors">Галерея</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-gray-400 hover:text-coral-500 transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <SafeIcon name="phone" size={16} />
                  +7 (999) 000-00-00
                </li>
                <li className="flex items-center gap-2">
                  <SafeIcon name="mail" size={16} />
                  info@whitefluffy.ru
                </li>
                <li className="flex items-center gap-2">
                  <SafeIcon name="map-pin" size={16} />
                  г. Москва
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 White Fluffy. Все права защищены.</p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Сделано с <SafeIcon name="heart" size={14} className="text-coral-500 fill-coral-500" /> для шпицев
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;