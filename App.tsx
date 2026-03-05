
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { BlockRenderer } from './components/InteractiveBlocks';
import { TimelineResource } from './components/TimelineResource';
import { MODULES } from './data/courseContent';
import { Lesson } from './types';

const App: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState('lesson16'); 
  const [view, setView] = useState<'lesson' | 'timeline'>('lesson');
  const [activeTab, setActiveTab] = useState<'outline' | 'resources'>('outline');
  const [lesson, setLesson] = useState<Lesson | null>(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  // IMAGEN DEL ENCABEZADO PARA LA LÍNEA DE TIEMPO
  const TIMELINE_HEADER_IMAGE = "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/2942c565-be22-49e3-8b27-5bded2abf106_rw_1920.jpg?h=42b7640f2fd65b8e6a26fc23ea1fd109";

  useEffect(() => {
    const allLessons = MODULES.flatMap(m => m.lessons);
    const found = allLessons.find(l => l.id === activeLessonId);
    if (found) {
      setLesson(found);
      const mainElement = document.querySelector('main');
      if (mainElement) mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeLessonId]);

  const allLessons = MODULES.flatMap(m => m.lessons);
  const currentIdx = allLessons.findIndex(l => l.id === activeLessonId);
  const isLastLesson = currentIdx === allLessons.length - 1;

  const handleNext = () => {
    if (view === 'timeline') {
        setView('lesson');
        setActiveLessonId(allLessons[0].id);
        return;
    }
    if (isLastLesson) {
      setView('timeline');
    } else {
      setActiveLessonId(allLessons[currentIdx + 1].id);
    }
  };

  const handlePrev = () => {
    if (view === 'timeline') {
        setView('lesson');
        setActiveLessonId(allLessons[allLessons.length - 1].id);
        return;
    }
    if (currentIdx > 0) setActiveLessonId(allLessons[currentIdx - 1].id);
  };

  if (!lesson) return <div className="flex items-center justify-center h-screen"><i className="fas fa-spinner fa-spin text-4xl text-[#8B4513]"></i></div>;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      
      <div 
        className={`fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div 
        className={`fixed lg:relative inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out bg-white border-r overflow-hidden shadow-2xl lg:shadow-none ${
          isSidebarOpen ? 'w-80' : 'w-0 lg:w-0 -translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="w-80 h-full">
          <Sidebar 
            activeLessonId={activeLessonId} 
            onSelectLesson={(id) => {
              setActiveLessonId(id);
              setView('lesson');
              if (window.innerWidth < 1024) setIsSidebarOpen(false);
            }} 
            onOpenTimeline={() => {
                setView('timeline');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
            }}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            view={view}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      </div>

      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-6 left-6 z-50 bg-[#8B4513] text-white w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-2 border-white/20"
          aria-label="Abrir menú"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      )}

      <main className="flex-1 overflow-y-auto relative scroll-smooth bg-[#f8faff]">
        
        {/* Banner dinámico: Aquí es donde se coloca la imagen del encabezado */}
        <div className="relative h-[400px] md:h-[450px] w-full flex items-end">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url('${view === 'lesson' ? lesson.bannerImage : TIMELINE_HEADER_IMAGE}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/40 to-transparent"></div>
          </div>
          <div className="relative z-10 px-6 md:px-12 pb-12 text-white w-full max-w-7xl mx-auto">
            <div className={`transition-all duration-500 ${!isSidebarOpen && window.innerWidth >= 1024 ? 'pl-4' : 'pl-0'}`}>
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold mb-4 opacity-90 uppercase tracking-[0.2em]">
                <span className="hidden sm:inline">Latin Theological Seminary</span>
                <i className="fas fa-chevron-right text-[8px] md:text-[10px] hidden sm:inline opacity-50"></i>
                <span>Pentateuco</span>
                <i className="fas fa-chevron-right text-[8px] md:text-[10px] opacity-50"></i>
                <span>{view === 'lesson' ? 'Deuteronomio - Clase 8' : 'Línea de Tiempo'}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl leading-[1.1]">
                {view === 'lesson' ? lesson.title : 'Deuteronomio: La Última Instrucción'}
              </h1>
              <p className="text-lg md:text-2xl opacity-90 font-light max-w-2xl drop-shadow-lg italic">
                {view === 'lesson' ? lesson.subtitle : 'Visualiza la trayectoria temporal de los eventos'}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-16 -mt-10 relative z-20">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[600px] border border-gray-100">
            {view === 'lesson' ? (
              <div className="p-6 sm:p-10 md:p-16">
                {lesson.blocks.map((block, idx) => (
                  <BlockRenderer key={idx} block={block} />
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <TimelineResource />
              </div>
            )}

            {/* Navegación de pie de página */}
            <div className="px-6 sm:px-10 md:px-16 pb-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6 bg-gray-50/30">
              <button 
                onClick={handlePrev}
                disabled={currentIdx === 0 && view === 'lesson'}
                className={`w-full sm:w-auto font-bold transition-all flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 ${
                  currentIdx === 0 && view === 'lesson'
                    ? 'text-gray-300 border-gray-100 cursor-not-allowed' 
                    : 'text-[#8B4513] border-[#8B4513]/20 hover:bg-[#8B4513]/5 active:scale-95'
                }`}
              >
                 <i className="fas fa-arrow-left"></i> Anterior
              </button>
              
              <button 
                onClick={handleNext}
                className={`w-full sm:w-auto bg-gradient-to-r from-[#CD853F] to-[#8B4513] text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 hover:shadow-[#8B4513]/20 transition-all flex items-center justify-center gap-3 active:scale-95`}
              >
                {view === 'timeline' ? (
                  <>Reiniciar Curso <i className="fas fa-undo-alt"></i></>
                ) : isLastLesson ? (
                  <>Ver Línea de Tiempo <i className="fas fa-stream"></i></>
                ) : (
                  <>Siguiente Lección <i className="fas fa-arrow-right"></i></>
                )}
              </button>
            </div>
          </div>
        </div>

        <footer className="py-16 text-center text-gray-400 text-sm px-4">
          <div className="flex justify-center gap-6 mb-6 opacity-30">
            <i className="fas fa-bible text-2xl"></i>
            <i className="fas fa-dove text-2xl"></i>
            <i className="fas fa-scroll text-2xl"></i>
          </div>
          <p className="font-medium tracking-wide">© 2025 Latin Theological Seminary</p>
          <p className="text-[10px] mt-1 uppercase tracking-tighter">Pentateuco / Clase 8 / Deuteronomio</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
