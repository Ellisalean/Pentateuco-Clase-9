import React, { useState, useRef, useEffect } from 'react';

export const TIMELINE_EVENTS = [
  {
    id: 1,
    date: "1445 a.C.",
    title: "Salida de Horeb y Jueces",
    description: "Dios ordena avanzar desde el Sinaí. Moisés establece líderes (jueces) para organizar al pueblo.",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/94e2183c-f5bb-4e22-a9fa-f8989157b430_rw_1920.jpg?h=a1d814568af0ef8f43b27103d0685e65"
  },
  {
    id: 2,
    date: "1445 a.C.",
    title: "La Rebelión de Cades-barnea",
    description: "12 espías exploran Canaán. El miedo provoca una rebelión y Dios decreta 40 años de vagar por el desierto.",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/e28b3219-2647-4cbe-93d0-880bf7b49e11_rw_1920.jpg?h=90eb9f80be26d2e5e76d28621406037c"
  },
  {
    id: 3,
    date: "1445 – 1407 a.C.",
    title: "Los 38 años de silencio",
    description: "La generación del Éxodo perece en el desierto mientras una nueva generación surge.",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/015631a6-ad94-4409-99e1-3d9f51938ae2_rw_1920.jpg?h=fdde7ded77e62fff2ea73058d218794f"
  },
  {
    id: 4,
    date: "1406 a.C. (Inicios)",
    title: "Victorias en Transjordania",
    description: "Derrota de los reyes Sejón y Og. Las tribus de Rubén, Gad y media de Manasés reciben sus tierras al este del Jordán.",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/7e385752-9cdc-4f01-a4d9-9fae629ab20a_rw_1920.jpg?h=365f26f0a794c2206685737d3de88f7d"
  },
  {
    id: 5,
    date: "Día 1, Mes 11",
    title: "El Primer Sermón",
    description: "Moisés recuerda la fidelidad de Dios y advierte contra la idolatría. Todo ocurre en el Mes 11 del Año 40 (Enero/Febrero de 1406 a.C.).",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/de67de38-cfa1-48bc-936b-b55c659379f8_rw_1920.jpg?h=19615d3882dca935913d783ae2cd27d9"
  },
  {
    id: 6,
    date: "Mes 11",
    title: "El Segundo Sermón (La Ley)",
    description: "Moisés entrega los Diez Mandamientos y el Código Deuteronómico. Se establecen las Ciudades de Refugio.",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/2942c565-be22-49e3-8b27-5bded2abf106_rw_1920.jpg?h=42b7640f2fd65b8e6a26fc23ea1fd109"
  },
  {
    id: 7,
    date: "Mes 11",
    title: "El Tercer Sermón (El Pacto)",
    description: "El pueblo renueva su alianza con Dios. Moisés presenta el desafío: \"Vida o Muerte, Bendición o Maldición\".",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/94e2183c-f5bb-4e22-a9fa-f8989157b430_rw_1920.jpg?h=a1d814568af0ef8f43b27103d0685e65"
  },
  {
    id: 8,
    date: "Finales del Mes 11",
    title: "El Traspaso de Mando",
    description: "Josué es comisionado ante todo Israel. Moisés escribe la Ley y el Cántico profético.",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/e28b3219-2647-4cbe-93d0-880bf7b49e11_rw_1920.jpg?h=90eb9f80be26d2e5e76d28621406037c"
  },
  {
    id: 9,
    date: "Finales del Mes 11",
    title: "Muerte de Moisés",
    description: "A los 120 años, Moisés sube al Monte Nebo, ve la Tierra Prometida y muere. Dios lo sepulta en secreto.",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/015631a6-ad94-4409-99e1-3d9f51938ae2_rw_1920.jpg?h=fdde7ded77e62fff2ea73058d218794f"
  },
  {
    id: 10,
    date: "Mes 12 (Año 40)",
    title: "Luto Nacional",
    description: "30 días de llanto por Moisés en los campos de Moab.",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/7e385752-9cdc-4f01-a4d9-9fae629ab20a_rw_1920.jpg?h=365f26f0a794c2206685737d3de88f7d"
  },
  {
    id: 11,
    date: "Día 10, Mes 1 (Año 41)",
    title: "El Cruce",
    description: "Bajo el mando de Josué, Israel cruza el Jordán para conquistar la Promesa (1405 a.C.).",
    image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/de67de38-cfa1-48bc-936b-b55c659379f8_rw_1920.jpg?h=19615d3882dca935913d783ae2cd27d9"
  }
];

export const TimelineResource: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (currentIndex < TIMELINE_EVENTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentEvent = TIMELINE_EVENTS[currentIndex];

  useEffect(() => {
    if (timelineRef.current) {
      const activeElement = timelineRef.current.children[currentIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col h-full min-h-[700px] bg-[#f8f9fa] rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-gray-200">
      
      {/* Context Header */}
      <div className="bg-white px-8 py-6 border-b border-gray-200 flex flex-col md:flex-row gap-6 justify-between items-center z-10 relative shadow-sm">
        <div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Deuteronomio: La Última Instrucción de Moisés</h3>
          <p className="text-sm text-gray-600 max-w-2xl">Moisés mira hacia atrás para enseñar a la nueva generación a no repetir los errores de sus padres.</p>
        </div>
        <div className="flex flex-col gap-2 text-xs font-medium text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-[#8B4513]"></i> <span><strong className="text-gray-700">Contexto Geográfico:</strong> Llanuras de Moab, al este del Jordán.</span></div>
          <div className="flex items-center gap-2"><i className="fas fa-clock text-[#8B4513]"></i> <span><strong className="text-gray-700">Contexto Temporal:</strong> Año 40 tras el Éxodo (aprox. 1406 a.C.).</span></div>
        </div>
      </div>

      {/* Top Section: Content */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Left/Right Navigation Arrows */}
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-gray-800 transition-all hover:scale-110 active:scale-95 ${currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-80 hover:opacity-100'}`}
        >
          <i className="fas fa-chevron-left text-3xl md:text-5xl drop-shadow-md"></i>
        </button>

        <button 
          onClick={handleNext}
          disabled={currentIndex === TIMELINE_EVENTS.length - 1}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-gray-800 transition-all hover:scale-110 active:scale-95 ${currentIndex === TIMELINE_EVENTS.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-80 hover:opacity-100'}`}
        >
          <i className="fas fa-chevron-right text-3xl md:text-5xl drop-shadow-md"></i>
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-200 flex items-center justify-center overflow-hidden p-8 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-50"></div>
          <img 
            src={currentEvent.image} 
            alt={currentEvent.title}
            className="relative z-10 max-h-full max-w-full object-contain shadow-2xl transition-all duration-500"
          />
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          <div className="absolute top-6 right-6 text-xs text-gray-400 font-bold uppercase tracking-widest">
            {currentIndex + 1} / {TIMELINE_EVENTS.length}
          </div>
          
          <div className="mb-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              {currentEvent.date}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {currentEvent.title}
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-serif">
            {currentEvent.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Timeline Navigation */}
      <div className="h-48 bg-gray-100 border-t border-gray-200 relative shadow-inner z-40">
        
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2"></div>
        
        {/* Scrollable Container */}
        <div 
          ref={timelineRef}
          className="h-full flex items-center overflow-x-auto px-[50%] hide-scrollbar snap-x snap-mandatory scroll-smooth relative"
          style={{ paddingLeft: '50%', paddingRight: '50%' }}
        >
          {TIMELINE_EVENTS.map((event, index) => {
            const isActive = index === currentIndex;
            const isPast = index < currentIndex;

            return (
              <div 
                key={event.id}
                onClick={() => setCurrentIndex(index)}
                className="relative flex flex-col items-center justify-center min-w-[160px] cursor-pointer group snap-center"
              >
                {/* Node */}
                <div className="relative flex items-center justify-center z-10 h-10 w-full">
                    {/* Connecting line fill for past events */}
                    {isPast && (
                        <div className="absolute left-0 right-1/2 h-0.5 bg-gray-800 top-1/2 -translate-y-1/2 -z-10"></div>
                    )}
                    {(isPast || isActive) && index > 0 && (
                        <div className="absolute left-[-50%] right-1/2 h-0.5 bg-gray-800 top-1/2 -translate-y-1/2 -z-10"></div>
                    )}

                    <div className={`w-4 h-4 rounded-sm rotate-45 transition-all duration-300 bg-white border-2 ${
                    isActive 
                        ? 'border-gray-900 scale-150 shadow-md bg-gray-900' 
                        : isPast 
                        ? 'border-gray-800 bg-gray-800' 
                        : 'border-gray-400 group-hover:border-gray-600 group-hover:scale-125'
                    }`}>
                    </div>
                </div>

                {/* Content Box */}
                <div className={`absolute transition-all duration-300 flex flex-col items-center ${
                    index % 2 === 0 ? 'bottom-full mb-2' : 'top-full mt-2'
                }`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap mb-1 ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                        {event.date}
                    </span>
                    <div className={`text-xs font-medium text-center px-3 py-2 rounded border max-w-[140px] line-clamp-2 shadow-sm transition-all ${
                        isActive 
                        ? 'bg-white border-gray-900 text-gray-900 shadow-md' 
                        : 'bg-gray-50 border-gray-200 text-gray-500 group-hover:border-gray-400 group-hover:text-gray-700'
                    }`}>
                        {event.title}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
