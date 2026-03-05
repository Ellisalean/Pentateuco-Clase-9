
import React, { useState, useEffect, useRef } from 'react';
import { ContentBlock, TimelineItem, FlipCardItem } from '../types';

export const BlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      const level = block.level || 2;
      const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
      
      const headingClasses: Record<number, string> = {
        2: "text-2xl md:text-3xl font-bold text-[#8B4513] border-b-2 border-[#CD853F] pb-2 mb-6 mt-8",
        3: "text-xl md:text-2xl font-semibold text-[#A0522D] mb-4 mt-6",
        4: "text-lg md:text-xl font-medium text-[#CD853F] mb-3"
      };
      
      return <Tag className={headingClasses[level]}>{block.text}</Tag>;

    case 'paragraph':
      return <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">{block.text}</p>;

    case 'timeline':
      return <Timeline items={block.timelineItems || []} />;

    case 'flipcards':
      return <FlipCardsGrid cards={block.flipCards || []} />;

    case 'wordGame':
      return <WordGameBlock words={block.items} />;

    case 'debate':
      return <DebateBlock postures={block.postures || []} />;

    case 'note':
      return (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
          <div className="flex items-center gap-2 text-amber-700 font-semibold mb-1">
            <i className="fas fa-lightbulb"></i> Nota importante
          </div>
          <p className="text-amber-900 italic text-sm md:text-base">{block.text}</p>
        </div>
      );

    case 'image':
      return (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white p-2">
          <img src={block.src} alt={block.alt} className="w-full h-auto rounded-xl object-cover" />
          {block.alt && <p className="text-xs text-gray-500 mt-2 text-center italic">{block.alt}</p>}
        </div>
      );

    case 'video':
      return (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg mb-8 bg-black">
          <iframe 
            className="absolute top-0 left-0 w-full h-full border-0"
            src={block.src} 
            allowFullScreen
          ></iframe>
        </div>
      );

    case 'accordion':
      return <Accordion items={block.items || []} />;

    case 'quiz':
      return <QuizBlock question={block.question!} options={block.options!} explanation={block.explanation} />;

    case 'slideshow':
      return <Slideshow items={block.items || []} />;

    case 'list':
      return (
        <ul className="list-none space-y-2 mb-6">
          {block.items?.map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <i className="fas fa-check-circle text-[#CD853F] mt-1 text-sm"></i>
              <span className="text-gray-700 text-sm md:text-base">{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div className="overflow-x-auto mb-8 shadow-sm rounded-lg border border-gray-100">
          <table className="w-full text-left border-collapse bg-white text-sm md:text-base">
            <thead className="bg-[#8B4513] text-white">
              <tr>
                {block.headers?.map((h, i) => <th key={i} className="px-4 md:px-6 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  {row.map((cell, j) => <td key={j} className="px-4 md:px-6 py-3">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
};

const WordGameBlock: React.FC<{ words?: { word: string, hint: string }[] }> = ({ words }) => {
  const defaultWords = [
    { word: "LEVITAS", hint: "Los guardianes del Tabernáculo y mediadores espirituales" },
    { word: "SERPIENTE DE BRONCE", hint: "El símbolo de sanidad por fe en el desierto" },
    { word: "MANÁ", hint: "El pan del cielo que Dios proveyó diariamente" },
    { word: "BALAAM", hint: "El profeta pagano que bendijo a Israel contra su voluntad" }
  ];

  const wordData = words || defaultWords;

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [shuffled, setShuffled] = useState<{char: string, originalIdx: number, used: boolean}[]>([]);
  const [placed, setPlaced] = useState<(string | null)[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'word_complete' | 'game_over' | 'victory'>('idle');
  const [timeLeft, setTimeLeft] = useState(120); // Aumentado a 120s por palabras más largas
  const timerRef = useRef<any>(null);

  const shuffle = (array: any[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const initWord = (idx: number) => {
    const word = wordData[idx].word.toUpperCase();
    const chars = word.split("").map((c, i) => ({ char: c, originalIdx: i, used: false }));
    const lettersToShuffle = chars.filter(c => c.char !== ' ' && c.char !== '-' && c.char !== 'Á' && c.char !== 'É' && c.char !== 'Í' && c.char !== 'Ó' && c.char !== 'Ú' ? true : true);
    
    // Simplificar caracteres para el juego (opcional, pero mejor mantenerlos)
    let shuffledLetters = shuffle(lettersToShuffle.filter(c => c.char !== ' '));
    
    setShuffled(shuffledLetters);
    setPlaced(word.split("").map(c => c === ' ' ? ' ' : null));
  };

  const startNextWord = () => {
    if (currentWordIdx + 1 < wordData.length) {
      const nextIdx = currentWordIdx + 1;
      setCurrentWordIdx(nextIdx);
      initWord(nextIdx);
      setGameState('playing');
    } else {
      setGameState('victory');
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const startGame = () => {
    setCurrentWordIdx(0);
    setTimeLeft(120);
    setGameState('playing');
    initWord(0);
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('game_over');
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLetterClick = (sIdx: number) => {
    if (gameState !== 'playing' || shuffled[sIdx].used) return;
    const charObj = shuffled[sIdx];
    const targetWord = wordData[currentWordIdx].word.toUpperCase();
    const nextEmptyIdx = placed.findIndex(p => p === null);
    
    if (nextEmptyIdx !== -1) {
      // Comparación ignorando tildes para facilitar el juego si es necesario, pero aquí usaremos exacta
      if (targetWord[nextEmptyIdx] === charObj.char) {
        const newPlaced = [...placed];
        newPlaced[nextEmptyIdx] = charObj.char;
        setPlaced(newPlaced);
        const newShuffled = [...shuffled];
        newShuffled[sIdx].used = true;
        setShuffled(newShuffled);
        if (newPlaced.every(p => p !== null)) {
          setTimeout(() => setGameState('word_complete'), 400);
        }
      } else {
        const el = document.getElementById(`shuffled-${sIdx}`);
        el?.classList.add('animate-shake');
        setTimeout(() => el?.classList.remove('animate-shake'), 400);
      }
    }
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="bg-[#8B4513]/5 border-2 border-[#8B4513]/20 rounded-[2.5rem] p-6 md:p-10 mb-12 shadow-inner relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <i className="fas fa-scroll text-[12rem]"></i>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="z-10">
          <h4 className="text-[#8B4513] font-bold text-xl flex items-center gap-2">
            <i className="fas fa-gamepad"></i> Pausa Interactiva: Conceptos de Deuteronomio
          </h4>
          <p className="text-gray-500 text-sm">Nivel {currentWordIdx + 1} de {wordData.length}</p>
        </div>
        <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 border-2 transition-all z-10 ${timeLeft < 15 ? 'bg-red-50 border-red-200 text-red-600 scale-110 animate-pulse' : 'bg-white border-[#CD853F]/20 text-[#CD853F]'}`}>
          <i className="fas fa-clock"></i>
          <span className="text-2xl font-mono font-bold">{timeLeft}s</span>
        </div>
      </div>

      {gameState !== 'idle' && gameState !== 'victory' && (
        <div className="mb-8 text-center bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-[#CD853F]/20 animate-fadeIn z-10 relative">
           <span className="text-[10px] font-bold text-[#CD853F] uppercase tracking-widest block mb-1">Pista:</span>
           <p className="text-[#8B4513] font-medium text-sm md:text-base italic">"{wordData[currentWordIdx].hint}"</p>
        </div>
      )}

      {gameState === 'idle' ? (
        <div className="text-center py-10 animate-fadeIn relative z-10">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 text-[#8B4513]">
            <i className="fas fa-play text-3xl ml-1"></i>
          </div>
          <p className="text-gray-600 mb-8 max-w-sm mx-auto">Ordena los términos clave del libro de Números. ¿Podrás identificarlos todos antes de que acabe el tiempo?</p>
          <button onClick={startGame} className="bg-[#8B4513] text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all">Iniciar Desafío</button>
        </div>
      ) : (
        <div className="space-y-12 py-4 relative z-10">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {placed.map((char, i) => (
              <div key={i} className={`w-8 h-10 md:w-12 md:h-14 rounded-lg border-b-4 flex items-center justify-center text-lg md:text-2xl font-black transition-all duration-300 ${char === ' ' ? 'border-transparent opacity-0 w-3 md:w-5' : char ? 'bg-white border-[#CD853F] text-[#8B4513] shadow-md scale-105 rotate-0' : 'bg-gray-100/50 border-gray-200 text-transparent'}`}>{char}</div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto">
            {shuffled.map((item, i) => (
              <button key={i} id={`shuffled-${i}`} disabled={item.used} onClick={() => handleLetterClick(i)} className={`w-10 h-10 md:w-14 md:h-14 rounded-xl font-bold text-base md:text-xl transition-all shadow-md active:scale-95 ${item.used ? 'opacity-0 scale-50 pointer-events-none' : 'bg-[#CD853F] text-white hover:bg-[#8B4513] hover:-translate-y-1'}`}>{item.char}</button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'word_complete' && (
        <div className="absolute inset-0 bg-[#8B4513]/90 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-[2rem] p-10 text-center shadow-2xl max-w-xs animate-scaleIn">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><i className="fas fa-check text-4xl"></i></div>
            <h5 className="text-2xl font-bold text-gray-800 mb-2">¡Correcto!</h5>
            <p className="text-gray-500 text-sm mb-6">{wordData[currentWordIdx].word}</p>
            <button onClick={startNextWord} className="w-full bg-[#8B4513] text-white py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-all">Siguiente <i className="fas fa-arrow-right ml-2"></i></button>
          </div>
        </div>
      )}
      
      {gameState === 'game_over' && (
        <div className="absolute inset-0 bg-red-900/90 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-[2rem] p-10 text-center shadow-2xl max-w-xs animate-scaleIn">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6"><i className="fas fa-hourglass-end text-3xl"></i></div>
            <h5 className="text-2xl font-bold text-gray-800 mb-2">¡Tiempo agotado!</h5>
            <button onClick={startGame} className="w-full bg-[#8B4513] text-white py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-all">Reintentar <i className="fas fa-undo ml-2"></i></button>
          </div>
        </div>
      )}

      {gameState === 'victory' && (
        <div className="absolute inset-0 bg-[#CD853F]/95 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-[2rem] p-10 text-center shadow-2xl max-w-md animate-scaleIn overflow-y-auto max-h-[90%] custom-scrollbar">
            <div className="w-24 h-24 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-amber-200"><i className="fas fa-trophy text-5xl"></i></div>
            <h5 className="text-3xl font-black text-[#8B4513] mb-2">¡MAESTRÍA LOGRADA!</h5>
            <p className="text-gray-600 mb-6">Has identificado todos los conceptos vitales de Números:</p>
            <div className="text-left space-y-3 mb-8">
              {wordData.map((d, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="font-bold text-[#8B4513] text-sm block">{d.word}</span>
                  <span className="text-xs text-gray-500 italic">{d.hint}</span>
                </div>
              ))}
            </div>
            <button onClick={startGame} className="w-full bg-[#8B4513] text-white py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-all">Jugar de nuevo <i className="fas fa-redo ml-2"></i></button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.4s ease-in-out; background-color: #ef4444 !important; }
        @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

const FlipCardsGrid: React.FC<{ cards: FlipCardItem[] }> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
      {cards.map((card, idx) => (
        <FlipCard key={idx} item={card} />
      ))}
    </div>
  );
};

const FlipCard: React.FC<{ item: FlipCardItem }> = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="relative h-[400px] w-full perspective-1000 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-[#CD853F]/20 rounded-[2.5rem] shadow-md flex flex-col items-center justify-center p-8 text-center group-hover:border-[#8B4513]/40 transition-colors">
          <div className="w-24 h-24 rounded-3xl bg-[#CD853F]/10 text-[#8B4513] flex items-center justify-center mb-6 shadow-inner transition-transform group-hover:scale-110"><i className={`fas ${item.icon} text-4xl`}></i></div>
          <h4 className="text-2xl font-bold text-[#8B4513] mb-1 uppercase tracking-tight">{item.frontTitle}</h4>
          <p className="text-gray-400 font-medium text-sm italic">{item.frontSubtitle}</p>
          <div className="mt-8 text-[10px] font-bold text-[#CD853F] uppercase tracking-[0.2em] opacity-60 animate-pulse">Haz clic para voltear</div>
        </div>
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#8B4513] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden text-white">
          <div className="flex-1 overflow-y-auto p-8 card-scroll">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-[#CD853F] font-bold text-[10px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10"><i className="fas fa-book-open"></i> {item.biblicalCitation}</div>
              <i className={`fas ${item.icon} opacity-20 text-3xl`}></i>
            </div>
            <h4 className="text-xl font-bold mb-4 border-b border-white/20 pb-3">{item.backTitle}</h4>
            <p className="text-sm opacity-90 leading-relaxed italic mb-4">"{item.backContent}"</p>
          </div>
          <div className="bg-black/30 p-8 border-t border-white/10">
            <div className="text-[10px] font-bold text-[#CD853F] uppercase tracking-widest mb-2 flex items-center gap-2"><i className="fas fa-cross text-[8px]"></i> Interpretación Evangélica</div>
            <p className="text-xs leading-relaxed text-white/90 font-light italic">{item.interpretation}</p>
          </div>
        </div>
      </div>
      <style>{` .perspective-1000 { perspective: 1000px; } .transform-style-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); } .card-scroll::-webkit-scrollbar { width: 4px; } .card-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); } .card-scroll::-webkit-scrollbar-thumb { background: rgba(205, 133, 63, 0.4); border-radius: 10px; } `}</style>
    </div>
  );
};

const Timeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  useEffect(() => { setExpandedIdx(null); }, [items]);
  
  return (
    <div className="relative py-12 px-2 md:px-10 mb-12 rounded-[3rem] bg-gray-50 border border-gray-100 shadow-inner overflow-hidden min-h-[600px]">
      {/* Fondo de Mapa Temático (Sutil) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-center bg-cover" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548345680-f5475ee5df82?auto=format&fit=crop&w=1600&q=80')" }}>
      </div>
      
      {/* Decoración de Brújula */}
      <div className="absolute top-4 right-8 opacity-10 text-[6rem] text-[#8B4513] pointer-events-none rotate-12">
        <i className="fas fa-compass"></i>
      </div>

      <div className="relative space-y-10 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-[#CD853F]/40 before:to-transparent">
        {items.map((item, idx) => (
          <div key={idx} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Punto de la línea de tiempo */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#8B4513] text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
              <i className="fas fa-map-marker-alt text-sm"></i>
            </div>
            
            {/* Tarjeta de Contenido */}
            <div 
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)} 
              className={`w-[calc(100%-4rem)] md:w-[45%] p-6 md:p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                expandedIdx === idx 
                  ? 'bg-white border-[#8B4513] shadow-[0_20px_50px_rgba(139,69,19,0.15)] scale-[1.03] z-20' 
                  : 'bg-white/80 border-white shadow-sm hover:border-[#CD853F]/30 hover:shadow-xl backdrop-blur-sm'
              }`}
            >
              <div className="flex items-center justify-between space-x-2 mb-4">
                <div className="px-4 py-1.5 bg-[#8B4513] text-white text-[10px] font-bold rounded-full uppercase tracking-[0.2em] shadow-sm">
                  {item.year}
                </div>
                <div className={`transition-transform duration-300 ${expandedIdx === idx ? 'text-[#8B4513]' : 'text-gray-300'}`}>
                  <i className={`fas ${expandedIdx === idx ? 'fa-minus-circle' : 'fa-plus-circle'} text-xl`}></i>
                </div>
              </div>
              
              <h4 className="text-[#A0522D] font-black text-xl md:text-2xl mb-3 leading-tight tracking-tight">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                {item.description}
              </p>
              
              {/* Contenido Expandido con Scroll Interno */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedIdx === idx ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-6 border-t border-gray-100 space-y-6 overflow-y-auto max-h-[400px] pr-3 custom-scrollbar">
                  {item.biblicalCitation && (
                    <div className="flex items-center gap-2 text-[#8B4513] font-bold text-sm tracking-wide bg-[#8B4513]/5 p-3 rounded-xl border border-[#8B4513]/10">
                      <i className="fas fa-book-open"></i> {item.biblicalCitation}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 text-sm md:text-base italic border-l-4 border-[#CD853F] pl-5 leading-loose font-light">
                      {item.detailedContent}
                    </p>
                  </div>
                  
                  {item.commentary && (
                    <div className="bg-amber-50/70 p-6 rounded-[2rem] border border-amber-100 shadow-inner">
                      <div className="text-[11px] font-black text-[#CD853F] uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                        <i className="fas fa-feather-pointed text-xs"></i> Análisis Teológico
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed italic">
                        "{item.commentary}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CD853F;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8B4513;
        }
      `}</style>
    </div>
  );
};

const DebateBlock: React.FC<{ postures: any[] }> = ({ postures }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => { setActiveId(null); }, [postures]);
  return (
    <div className="space-y-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {postures.map((p) => (
          <button key={p.id} onClick={() => setActiveId(p.id)} className={`p-6 rounded-2xl text-left transition-all border-2 ${activeId === p.id ? 'bg-[#8B4513] text-white border-[#8B4513] shadow-lg scale-[1.02]' : 'bg-white text-gray-700 border-gray-100 hover:border-[#CD853F]'}`}>
            <h4 className={`font-bold mb-2 ${activeId === p.id ? 'text-white' : 'text-[#8B4513]'}`}>{p.title}</h4>
            <p className="text-sm opacity-90">{p.summary}</p>
          </button>
        ))}
      </div>
      {activeId && <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm animate-fadeIn"><div className="flex items-center gap-2 text-[#CD853F] font-bold mb-3 uppercase tracking-widest text-xs"><i className="fas fa-scroll"></i> Argumento Detallado</div><p className="text-gray-700 leading-relaxed italic">{postures.find(p => p.id === activeId)?.fullArgument}</p></div>}
    </div>
  );
};

const Accordion: React.FC<{ items: any[] }> = ({ items }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  useEffect(() => { setOpenIdx(null); }, [items]);
  return (
    <div className="space-y-3 mb-8">
      {items.map((item, idx) => (
        <div key={idx} className="border rounded-xl overflow-hidden border-gray-100 shadow-sm">
          <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} className="w-full px-4 md:px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition"><span className="font-semibold text-gray-800 text-sm md:text-base text-left">{item.title}</span><i className={`fas fa-chevron-down text-[#CD853F] transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}></i></button>
          {openIdx === idx && <div className="px-4 md:px-6 py-4 bg-gray-50/50 text-gray-700 border-t border-gray-50 text-sm md:text-base animate-fadeIn">{item.content}</div>}
        </div>
      ))}
    </div>
  );
};

const QuizBlock: React.FC<{ question: string, options: any[], explanation?: string }> = ({ question, options, explanation }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  useEffect(() => { setSelected(null); setShowResult(false); }, [question]);
  return (
    <div className="bg-white border-2 border-dashed border-[#CD853F]/40 p-4 md:p-8 rounded-3xl mb-8 shadow-sm">
      <div className="flex items-center gap-2 text-[#CD853F] mb-4 font-bold text-xs uppercase tracking-widest"><i className="fas fa-question-circle"></i> Comprueba tu aprendizaje</div>
      <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-6">{question}</h4>
      <div className="space-y-3">
        {options.map((opt, idx) => (
          <button key={idx} onClick={() => !showResult && setSelected(idx)} className={`w-full p-4 rounded-xl text-left transition flex items-center gap-3 border ${selected === idx ? 'bg-[#8B4513] text-white border-[#8B4513]' : 'bg-gray-50 hover:bg-gray-100 border-transparent'} ${showResult && opt.isCorrect ? 'bg-green-600 text-white' : ''} ${showResult && selected === idx && !opt.isCorrect ? 'bg-red-600 text-white' : ''}`}><span className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold flex-shrink-0 ${selected === idx ? 'border-white' : 'border-gray-300'}`}>{String.fromCharCode(65 + idx)}</span><span className="text-sm md:text-base font-medium">{opt.text}</span></button>
        ))}
      </div>
      {!showResult ? <button onClick={() => selected !== null && setShowResult(true)} className="mt-6 bg-[#8B4513] text-white px-8 py-3 rounded-full font-bold hover:bg-[#A0522D] transition shadow-lg disabled:opacity-50" disabled={selected === null}>Verificar respuesta</button> : <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-[#CD853F]/20 animate-slideUp"><p className={`font-bold mb-2 ${options[selected!].isCorrect ? 'text-green-700' : 'text-red-700'}`}>{options[selected!].isCorrect ? '¡Excelente!' : 'Sigue intentándolo.'}</p><p className="text-gray-700 text-sm md:text-base leading-relaxed">{explanation}</p></div>}
    </div>
  );
};

const Slideshow: React.FC<{ items: any[] }> = ({ items }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => { setCurrent(0); }, [items]);
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl mb-8 group">
      <img src={items[current].image} alt="Slide" className="w-full h-72 md:h-96 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
        <p className="text-base md:text-xl font-medium drop-shadow-lg leading-relaxed">{items[current].caption}</p>
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">{items.map((_, i) => (<div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${current === i ? 'w-10 bg-[#CD853F]' : 'w-2 bg-white/40'}`}></div>))}</div>
          <div className="flex gap-4">
            <button onClick={() => setCurrent(prev => (prev === 0 ? items.length - 1 : prev - 1))} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-sm transition-all border border-white/10"><i className="fas fa-chevron-left"></i></button>
            <button onClick={() => setCurrent(prev => (prev === items.length - 1 ? 0 : prev + 1))} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-sm transition-all border border-white/10"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};
