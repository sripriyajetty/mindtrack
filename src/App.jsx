import React, { useState, useEffect } from 'react';
import { Edit3, Calendar, BarChart3, User, Menu, X, Plus, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState(4);
  const [selectedTags, setSelectedTags] = useState(['Good so far']);
  const [journalEntry, setJournalEntry] = useState('I ate ice cream today. Good Mood all they way');
  const [currentView, setCurrentView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState(null);

  // Mock data for past week with more realistic entries
  const [weeklyMoods, setWeeklyMoods] = useState([
    { 
      day: 'Sun', 
      mood: 4, 
      emoji: '😊', 
      label: 'Excited', 
      color: 'bg-purple-400',
      entry: "Had a great day today! Felt really productive and energetic. Accomplished most of my goals and spent quality time with friends.",
      date: 'March 3, 2025'
    },
    { 
      day: 'Mon', 
      mood: 4, 
      emoji: '🤠', 
      label: 'Confident', 
      color: 'bg-orange-400',
      entry: "Tried something new today. Feeling excited about upcoming projects. The weather was perfect for a long walk in the park.",
      date: 'March 4, 2025'
    },
    { 
      day: 'Tue', 
      mood: 3, 
      emoji: '😐', 
      label: 'Neutral', 
      color: 'bg-yellow-400',
      entry: "Quiet day at home. Sometimes it's nice to just relax and recharge. Read a good book and enjoyed some peaceful moments.",
      date: 'March 5, 2025'
    },
    { 
      day: 'Wed', 
      mood: 1, 
      emoji: '😠', 
      label: 'Angry', 
      color: 'bg-red-400',
      entry: "Had a frustrating day at work. Things didn't go as planned and I felt misunderstood by my colleagues.",
      date: 'March 6, 2025'
    },
    { 
      day: 'Thu', 
      mood: 4, 
      emoji: '😊', 
      label: 'Happy', 
      color: 'bg-purple-400',
      entry: "Recovered from yesterday's bad mood. Had a great therapy session and dinner with family.",
      date: 'March 7, 2025'
    },
    { 
      day: 'Fri', 
      mood: 2, 
      emoji: '😰', 
      label: 'Anxious', 
      color: 'bg-blue-400',
      entry: "Felt overwhelmed with deadlines. Need to work on my time management and stress coping mechanisms.",
      date: 'March 8, 2025'
    },
    { 
      day: 'Sat', 
      mood: 2, 
      emoji: '😨', 
      label: 'Stressed', 
      color: 'bg-green-400',
      entry: "Too much social interaction this week. Need some alone time to recharge my batteries.",
      date: 'March 9, 2025'
    }
  ]);

  const moods = [
    { emoji: '😢', label: 'Very Sad', color: 'bg-blue-200 text-blue-800' },
    { emoji: '😠', label: 'Angry', color: 'bg-red-200 text-red-800' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-200 text-gray-800' },
    { emoji: '🙂', label: 'Good', color: 'bg-green-200 text-green-800' },
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-200 text-yellow-800' }
  ];

  const [moodTags, setMoodTags] = useState([
    { text: 'Good so far', color: 'bg-blue-200 text-blue-800' },
    { text: 'Happy', color: 'bg-green-200 text-green-800' },
    { text: 'very mad', color: 'bg-red-200 text-red-800' },
    { text: 'Bored af', color: 'bg-purple-200 text-purple-800' }
  ]);

  // Add a new mood entry
  const addMoodEntry = () => {
    const newEntry = {
      day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      mood: currentMood,
      emoji: moods[currentMood].emoji,
      label: moods[currentMood].label,
      color: ['bg-blue-400', 'bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400'][currentMood],
      entry: journalEntry,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      tags: [...selectedTags]
    };
    
    setWeeklyMoods(prev => [newEntry, ...prev.slice(0, 6)]);
    setJournalEntry('');
    setSelectedTags([]);
    setCurrentMood(3); // Reset to neutral
  };

  // Toggle mood tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Add a new custom tag
  const addNewTag = () => {
    if (newTagInput.trim() && !moodTags.some(tag => tag.text === newTagInput.trim())) {
      const colors = [
        'bg-blue-200 text-blue-800',
        'bg-green-200 text-green-800',
        'bg-red-200 text-red-800',
        'bg-purple-200 text-purple-800',
        'bg-yellow-200 text-yellow-800',
        'bg-pink-200 text-pink-800',
        'bg-indigo-200 text-indigo-800'
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setMoodTags(prev => [...prev, { text: newTagInput.trim(), color: randomColor }]);
      setSelectedTags(prev => [...prev, newTagInput.trim()]);
    }
    setNewTagInput('');
    setShowTagInput(false);
  };

  // Navigation button component
  const NavButton = ({ active, children, onClick, icon: Icon }) => (
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center px-3 py-2 sm:px-6 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
        active 
          ? 'bg-white text-blue-600 shadow-md' 
          : 'text-white hover:bg-white/20'
      }`}
    >
      {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
      {children}
    </motion.button>
  );

  // Mobile menu component
  const MobileMenu = () => (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-64 bg-blue-600 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white text-lg font-bold">Menu</h2>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="space-y-4">
                <button 
                  onClick={() => {setCurrentView('home'); setMobileMenuOpen(false);}}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentView === 'home' ? 'bg-white text-blue-600' : 'text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center mr-3">🏠</span>
                    Home
                  </div>
                </button>
                <button 
                  onClick={() => {setCurrentView('analytics'); setMobileMenuOpen(false);}}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentView === 'analytics' ? 'bg-white text-blue-600' : 'text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-3" />
                    Analytics
                  </div>
                </button>
                <button 
                  onClick={() => {setCurrentView('journal'); setMobileMenuOpen(false);}}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentView === 'journal' ? 'bg-white text-blue-600' : 'text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center">
                    <Edit3 className="w-5 h-5 mr-3" />
                    Journal
                  </div>
                </button>
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Analytics View
  if (currentView === 'analytics') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
        <MobileMenu />
        
        {/* Header */}
        <div className="bg-blue-500/90 backdrop-blur-sm px-4 sm:px-6 py-4 shadow-lg sticky top-0 z-40">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg"
              >
                <span className="text-lg sm:text-xl">📊</span>
              </motion.div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Mood Analytics</h1>
            </div>
            
            <nav className="hidden md:flex space-x-2 lg:space-x-4">
              <NavButton onClick={() => setCurrentView('home')} icon={null}>Home</NavButton>
              <NavButton active icon={BarChart3}>Analytics</NavButton>
              <NavButton onClick={() => setCurrentView('journal')} icon={Edit3}>Journal</NavButton>
            </nav>
            
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <button 
                className="md:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Content */}
        <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center sm:text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Your Mood Analytics</h2>
            <p className="text-blue-100">Track your emotional journey over time</p>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-gray-800">Weekly Mood Overview</h3>
            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {weeklyMoods.map((day, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">{day.day}</div>
                  <div className="text-xl sm:text-2xl mb-2 hover:scale-110 transition-transform cursor-pointer">{day.emoji}</div>
                  <div className="text-xs text-gray-500 px-1">{day.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-gray-800">Mood Distribution</h3>
            <div className="space-y-4">
              {moods.map((mood, index) => {
                const count = weeklyMoods.filter(day => day.mood === index).length;
                const percentage = (count / weeklyMoods.length) * 100;
                return (
                  <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                    <span className="text-lg sm:text-xl flex-shrink-0">{mood.emoji}</span>
                    <span className="w-16 sm:w-20 text-xs sm:text-sm font-medium text-gray-700">{mood.label}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full ${mood.color.split(' ')[0]}`}
                      ></motion.div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 font-bold w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-gray-800">Tag Frequency</h3>
            <div className="flex flex-wrap gap-2">
              {moodTags.map((tag, index) => {
                const count = weeklyMoods.filter(day => 
                  day.tags && day.tags.includes(tag.text)
                ).length;
                return count > 0 ? (
                  <div 
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${tag.color} flex items-center`}
                  >
                    <span>{tag.text}</span>
                    <span className="ml-1 bg-white/30 px-1 rounded-full">{count}</span>
                  </div>
                ) : null;
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Journal View
  if (currentView === 'journal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
        <MobileMenu />
        
        {/* Header */}
        <div className="bg-blue-500/90 backdrop-blur-sm px-4 sm:px-6 py-4 shadow-lg sticky top-0 z-40">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg"
              >
                <span className="text-lg sm:text-xl">📝</span>
              </motion.div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Mood Journal</h1>
            </div>
            
            <nav className="hidden md:flex space-x-2 lg:space-x-4">
              <NavButton onClick={() => setCurrentView('home')} icon={null}>Home</NavButton>
              <NavButton onClick={() => setCurrentView('analytics')} icon={BarChart3}>Analytics</NavButton>
              <NavButton active icon={Edit3}>Journal</NavButton>
            </nav>
            
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <button 
                className="md:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Journal Content */}
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center sm:text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Your Journal Entries</h2>
            <p className="text-blue-100">Reflect on your daily experiences</p>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Today's Entry</h3>
              <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="w-full h-32 sm:h-40 p-3 sm:p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
              placeholder="Write about your day..."
            />
            <div className="mt-4 flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag, index) => {
                  const tagData = moodTags.find(t => t.text === tag);
                  return tagData ? (
                    <span 
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs ${tagData.color}`}
                    >
                      {tag}
                    </span>
                  ) : null;
                })}
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addMoodEntry}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
              >
                Save Entry
              </motion.button>
            </div>
          </motion.div>
          
          {weeklyMoods.map((day, index) => (
            <motion.div 
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + (index * 0.05) }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">{day.day}'s Entry</h3>
                  <p className="text-xs text-gray-500">{day.date}</p>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-lg sm:text-xl">{day.emoji}</span>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">{day.label}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {day.tags && day.tags.map((tag, tagIndex) => {
                  const tagData = moodTags.find(t => t.text === tag);
                  return tagData ? (
                    <span 
                      key={tagIndex}
                      className={`px-2 py-1 rounded-full text-xs ${tagData.color}`}
                    >
                      {tag}
                    </span>
                  ) : null;
                })}
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {day.entry}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Home View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      <MobileMenu />
      
      {/* Header */}
      <div className="bg-blue-500/90 backdrop-blur-sm px-4 sm:px-6 py-4 shadow-lg sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <span className="text-lg sm:text-xl">
              <img 
                src="/iconn.png" 
                alt="Mood Tracker logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg shadow-lg"
              />
            </span>

            <h1 className="text-lg sm:text-xl font-bold text-white">Mind Track</h1>
          </div>
          
          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            <NavButton active icon={null}>Home</NavButton>
            <NavButton onClick={() => setCurrentView('analytics')} icon={BarChart3}>Analytics</NavButton>
            <NavButton onClick={() => setCurrentView('journal')} icon={Edit3}>Journal</NavButton>
          </nav>
          
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </motion.div>
            <button 
              className="md:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Mood Selection */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
            How are you feeling today?
          </h2>
          
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
            {moods.map((mood, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentMood(index)}
                className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl lg:text-3xl transition-all duration-300 flex-shrink-0 ${
                  currentMood === index 
                    ? 'bg-yellow-400 shadow-2xl scale-110 ring-4 ring-yellow-300/50' 
                    : 'bg-white/20 hover:bg-white/30 shadow-lg'
                }`}
              >
                {mood.emoji}
              </motion.button>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <p className="text-white/80 text-sm sm:text-base">
              Currently feeling: <span className="font-bold text-yellow-300">{moods[currentMood].label}</span>
            </p>
          </div>
        </motion.div>

        {/* Mood Tags */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Mood Tags</h3>
          
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
            {moodTags.map((tag, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTag(tag.text)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shadow-lg ${
                  selectedTags.includes(tag.text)
                    ? tag.color + ' shadow-md ring-2 ring-white/30'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {tag.text}
              </motion.button>
            ))}
          </div>
          
          {showTagInput ? (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex gap-2 mt-2"
            >
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                className="flex-1 bg-white/20 text-white placeholder-white/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Add custom tag..."
                onKeyDown={(e) => e.key === 'Enter' && addNewTag()}
              />
              <button
                onClick={addNewTag}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
              >
                <Check size={16} />
              </button>
            </motion.div>
          ) : (
            <button
              onClick={() => setShowTagInput(true)}
              className="flex items-center text-white/80 hover:text-white text-sm mt-2 transition-colors"
            >
              <Plus size={16} className="mr-1" />
              Add custom tag
            </button>
          )}
        </motion.div>

        {/* Today's Journal */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Today's Journal</h3>
            <Edit3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          
          <div className="bg-yellow-100/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-inner">
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="w-full bg-transparent resize-none text-gray-800 placeholder-gray-500 focus:outline-none text-sm sm:text-base leading-relaxed"
              rows="4"
              placeholder="Write about your day..."
            />
          </div>
          
          <div className="mt-4 flex justify-end">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addMoodEntry}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
            >
              Save Today's Mood
            </motion.button>
          </div>
        </motion.div>

        {/* Past Week */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Your Past Week</h3>
            <div className="flex space-x-2">
              <BarChart3 
                className="w-5 h-5 sm:w-6 sm:h-6 text-white cursor-pointer hover:text-yellow-300 transition-colors"
                onClick={() => setCurrentView('analytics')}
              />
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
            {weeklyMoods.map((day, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`${day.color} rounded-xl p-3 sm:p-4 text-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="font-bold mb-2 text-sm sm:text-base">{day.day}</div>
                <div className="text-2xl sm:text-3xl mb-2">{day.emoji}</div>
                <div className="text-xs sm:text-sm opacity-90 mb-3">{day.label}</div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentView('journal');
                    setExpandedEntry(index);
                  }}
                  className="w-full bg-black/20 hover:bg-black/30 text-white text-xs py-2 px-2 sm:px-3 rounded-lg transition-all duration-200 backdrop-blur-sm"
                >
                  View Journal
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodTracker;