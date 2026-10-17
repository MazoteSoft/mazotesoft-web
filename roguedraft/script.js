/**
 * ROGUE DRAFT — Arcane Roguelike Norse Card Game
 * Official Web Landing Page Controller & Card Compendium Data
 * (c) 2026 MazoteSoft
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMonolithPermutations();
  initGrimoire();
  initCardModal();
  initUpgradeCalculator();
  initSoundboard();
  initFaqAccordion();
});

/* ==========================================================================
   1. NAVBAR & SCROLL EFFECTS
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.textContent = isOpen ? '✕' : '☰';
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }
}

/* ==========================================================================
   2. MONOLITH 3D PERMUTATIONS VISUALIZER
   ========================================================================== */
const PERMUTATIONS_DATA = {
  'ADU': {
    name: 'Ataque • Defensa • Utilidad',
    badge: 'Equilibrado / Rítmico',
    desc: 'La tríada clásica del norte. La espada abre el camino, el escudo sostiene la línea y el elixir nutre la victoria.',
    slots: [
      { type: 'attack', name: 'Ataque', icon: '⚔️', desc: 'Espadas, Hachas y Relámpagos' },
      { type: 'defense', name: 'Defensa', icon: '🛡️', desc: 'Escudos, Muros y Yelmos' },
      { type: 'utility', name: 'Utilidad', icon: '🧪', desc: 'Pociones, Grimorios y Relojes' }
    ]
  },
  'AUD': {
    name: 'Ataque • Utilidad • Defensa',
    badge: 'Presión Arcana',
    desc: 'Potencia tus recursos inmediatamente tras el golpe inicial. Requiere velocidad refleja para consolidar la guardia al final.',
    slots: [
      { type: 'attack', name: 'Ataque', icon: '⚔️', desc: 'Espadas, Hachas y Relámpagos' },
      { type: 'utility', name: 'Utilidad', icon: '🧪', desc: 'Pociones, Grimorios y Relojes' },
      { type: 'defense', name: 'Defensa', icon: '🛡️', desc: 'Escudos, Muros y Yelmos' }
    ]
  },
  'DAU': {
    name: 'Defensa • Ataque • Utilidad',
    badge: 'Contragolpe Táctico',
    desc: 'Prioriza la muralla para neutralizar la agresión enemiga antes de desatar la réplica ofensiva con soporte alquímico.',
    slots: [
      { type: 'defense', name: 'Defensa', icon: '🛡️', desc: 'Escudos, Muros y Yelmos' },
      { type: 'attack', name: 'Ataque', icon: '⚔️', desc: 'Espadas, Hachas y Relámpagos' },
      { type: 'utility', name: 'Utilidad', icon: '🧪', desc: 'Pociones, Grimorios y Relojes' }
    ]
  },
  'DUA': {
    name: 'Defensa • Utilidad • Ataque',
    badge: 'Bastión del Sabio',
    desc: 'La configuración defensiva más sólida. Absorbe el impacto, prepara los artilugios arcanos y culmina con el remate letal.',
    slots: [
      { type: 'defense', name: 'Defensa', icon: '🛡️', desc: 'Escudos, Muros y Yelmos' },
      { type: 'utility', name: 'Utilidad', icon: '🧪', desc: 'Pociones, Grimorios y Relojes' },
      { type: 'attack', name: 'Ataque', icon: '⚔️', desc: 'Espadas, Hachas y Relámpagos' }
    ]
  },
  'UAD': {
    name: 'Utilidad • Ataque • Defensa',
    badge: 'Estrategia de Cronomante',
    desc: 'Manipula el tiempo y los multiplicadores de maná antes de desencadenar la ofensiva y proteger tu núcleo.',
    slots: [
      { type: 'utility', name: 'Utilidad', icon: '🧪', desc: 'Pociones, Grimorios y Relojes' },
      { type: 'attack', name: 'Ataque', icon: '⚔️', desc: 'Espadas, Hachas y Relámpagos' },
      { type: 'defense', name: 'Defensa', icon: '🛡️', desc: 'Escudos, Muros y Yelmos' }
    ]
  },
  'UDA': {
    name: 'Utilidad • Defensa • Ataque',
    badge: 'Danza de Runas',
    desc: 'La permutación más exigente a alta velocidad: exige al jugador desacelerar el instinto agresivo para preparar la mesa perfecta.',
    slots: [
      { type: 'utility', name: 'Utilidad', icon: '🧪', desc: 'Pociones, Grimorios y Relojes' },
      { type: 'defense', name: 'Defensa', icon: '🛡️', desc: 'Escudos, Muros y Yelmos' },
      { type: 'attack', name: 'Ataque', icon: '⚔️', desc: 'Espadas, Hachas y Relámpagos' }
    ]
  }
};

function initMonolithPermutations() {
  const permItems = document.querySelectorAll('.permutation-item');
  const altarSlotsContainer = document.getElementById('altarSlotsContainer');
  const permDescTitle = document.getElementById('permDescTitle');
  const permDescText = document.getElementById('permDescText');

  permItems.forEach(item => {
    item.addEventListener('click', () => {
      permItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const code = item.getAttribute('data-perm');
      const data = PERMUTATIONS_DATA[code];
      if (!data) return;

      if (permDescTitle) permDescTitle.textContent = `${code} — ${data.name}`;
      if (permDescText) permDescText.textContent = data.desc;

      if (altarSlotsContainer) {
        altarSlotsContainer.innerHTML = '';
        data.slots.forEach((slot, index) => {
          const slotEl = document.createElement('div');
          slotEl.className = `altar-slot ${slot.type}-slot active`;
          slotEl.innerHTML = `
            <div class="altar-slot-icon">${slot.icon}</div>
            <div class="altar-slot-name">${slot.name}</div>
            <div class="altar-slot-desc">Ranura #${index + 1}</div>
          `;
          altarSlotsContainer.appendChild(slotEl);
        });
      }
    });
  });
}

/* ==========================================================================
   3. THE COMPREHENSIVE GRIMOIRE CARD DATABASE
   ========================================================================== */
const GRIMOIRE_CARDS = [
  // --- 13 ATTACK CARDS (Red Ruby) ---
  {
    id: 'laevateinn',
    norse: 'LAEVATEINN',
    name: 'Mandoble de Surtr',
    nameEn: 'Surtr\'s Volcanic Blade',
    category: 'attack',
    gem: 'ruby',
    pts: 100,
    art: 'assets/card_surtr.jpg',
    lore: 'El mandoble legendario forjado en las grietas ardientes de Muspelheim. Al caer sobre el altar, desata una lluvia de ascuas que pulveriza la resistencia del destino.',
    tactics: 'Coloca en la ranura de Ataque en momentos de ritmo alto para activar bonificaciones de combo x2.',
    rarity: 'Común'
  },
  {
    id: 'heljarljar',
    norse: 'HELJARLJAR',
    name: 'Guadaña de Helheim',
    nameEn: 'Scythe of Helheim',
    category: 'attack',
    gem: 'ruby',
    pts: 95,
    art: 'assets/card_hel.jpg',
    lore: 'Segadora de almas de la reina del inframundo nórdico. Su filo de obsidiana drena la energía vital de las sombras para alimentar tu puntuación.',
    tactics: 'Especialmente veloz en el draft; su silueta esbelta facilita su identificación rápida en el carril central.',
    rarity: 'Común'
  },
  {
    id: 'runasverd',
    norse: 'RUNASVERD',
    name: 'Espada de Acero Rúnico',
    nameEn: 'Steel Runesword',
    category: 'attack',
    gem: 'ruby',
    pts: 60,
    art: '',
    lore: 'Espada templada en agua de manantial glacial con runas Algiz y Tiwaz incrustadas a lo largo de su hoja.',
    tactics: 'La piedra angular de todo mazo de ataque básico. Fácil de validar en cualquier permutación.',
    rarity: 'Común'
  },
  {
    id: 'vigox_blodug',
    norse: 'VIGOX BLODUG',
    name: 'Hacha de Guerra Sangrienta',
    nameEn: 'Bloody Battleaxe',
    category: 'attack',
    gem: 'ruby',
    pts: 70,
    art: '',
    lore: 'Pesada hacha de asedio empuñada por los invasores berserkers. El peso de su filo corta la indecisión.',
    tactics: 'Otorga una lectura táctica sólida en niveles con velocidad moderada.',
    rarity: 'Común'
  },
  {
    id: 'elding_himins',
    norse: 'ELDING HIMINS',
    name: 'Rayo Celestial',
    nameEn: 'Heavenly Lightning',
    category: 'attack',
    gem: 'ruby',
    pts: 85,
    art: '',
    lore: 'Un destello arrancado del cielo de Asgard. Golpea con la velocidad fulminante del rayo.',
    tactics: 'Ideal para ejecutar swipes rápidos hacia la ranura de ataque sin dudar.',
    rarity: 'Poco Común'
  },
  {
    id: 'fornkraftr',
    norse: 'FORNKRAFTR',
    name: 'Poder Ancestral',
    nameEn: 'Ancient Power',
    category: 'attack',
    gem: 'ruby',
    pts: 75,
    art: '',
    lore: 'La fuerza primordial de los gigantes de roca que modelaron los primeros fiordos de Midgard.',
    tactics: 'Estabiliza el medidor de daño en rondas avanzadas de draft.',
    rarity: 'Común'
  },
  {
    id: 'bolvadr_knifr',
    norse: 'BOLVADR KNIFR',
    name: 'Cuchilla Maldita',
    nameEn: 'Cursed Blade',
    category: 'attack',
    gem: 'ruby',
    pts: 80,
    art: '',
    lore: 'Daga envenenada con hiel de dragón. Aquellos que la empuñan sienten el pulso oscuro del Ragnarök.',
    tactics: 'Su rápida respuesta al arrastre recompensa a los jugadores de reflejos afilados.',
    rarity: 'Común'
  },
  {
    id: 'geirr_odins',
    norse: 'GEIRR ODINS',
    name: 'Lanza de Odín (Gungnir)',
    nameEn: 'Odin\'s Spear Gungnir',
    category: 'attack',
    gem: 'ruby',
    pts: 110,
    art: '',
    lore: 'La lanza que jamás yerra el blanco, tallada en la madera sagrada de Yggdrasil por los enanos hijos de Ivaldi.',
    tactics: 'Tiene un imán de validación natural muy tolerante en la zona de ataque.',
    rarity: 'Rara'
  },
  {
    id: 'hamarr_thors',
    norse: 'HAMARR THORS',
    name: 'Martillo del Trueno (Mjölnir)',
    nameEn: 'Thor\'s Hammer Mjölnir',
    category: 'attack',
    gem: 'ruby',
    pts: 120,
    art: '',
    lore: 'El arma más temida por los Jötunn. Su impacto resuena a través de los nueve reinos con un trueno destructor.',
    tactics: 'Produce un feedback háptico ASMR extra denso al caer sobre el monolito.',
    rarity: 'Rara'
  },
  {
    id: 'alfbogi',
    norse: 'ALFBOGI',
    name: 'Arco Élfico de Alfheim',
    nameEn: 'Elven Bow of Alfheim',
    category: 'attack',
    gem: 'ruby',
    pts: 65,
    art: '',
    lore: 'Arco flexible trenzado con pelo de corcel lunar y madera de tejo bendecida por los elfos de la luz.',
    tactics: 'Gran precisión para drafts de ritmo acelerado.',
    rarity: 'Común'
  },
  {
    id: 'fenrisklaer',
    norse: 'FENRISKLAER',
    name: 'Garras de Fenrir',
    nameEn: 'Fenrir\'s Claws',
    category: 'attack',
    gem: 'ruby',
    pts: 90,
    art: '',
    lore: 'Filosas como esquirlas de hielo negro, capaces de desgarrar las cadenas cósmicas que apresan al gran lobo.',
    tactics: 'Aumenta el multiplicador de puntos si se coloca en menos de 0.8 segundos.',
    rarity: 'Poco Común'
  },
  {
    id: 'fafniskylfa',
    norse: 'FAFNISKYLFA',
    name: 'Maza de Cráneo de Dragón',
    nameEn: 'Dragon-skull Mace',
    category: 'attack',
    gem: 'ruby',
    pts: 85,
    art: '',
    lore: 'Forjada con los colmillos y el hueso petrificado de Fafnir. Desprende un vapor tóxico y dorado.',
    tactics: 'Excelente peso visual para evitar confusiones con cartas de defensa.',
    rarity: 'Poco Común'
  },
  {
    id: 'berserkslag',
    norse: 'BERSERKSLAG',
    name: 'Mangual del Berserker',
    nameEn: 'Berserker Flail',
    category: 'attack',
    gem: 'ruby',
    pts: 75,
    art: '',
    lore: 'Tres bolas de hierro con púas unidas por cadenas de sangre. Despierta la furia ciega de los guerreros del oso.',
    tactics: 'Recompensa series de colocaciones continuas sin pausas intermedias.',
    rarity: 'Común'
  },

  // --- 13 DEFENSE CARDS (Blue Sapphire) ---
  {
    id: 'freyjuspegell',
    norse: 'FREYJUSPEGELL',
    name: 'Espejo Reliquia de Freyja',
    nameEn: 'Freyja\'s Relic Mirror',
    category: 'defense',
    gem: 'sapphire',
    pts: 100,
    art: 'assets/card_freya.jpg',
    lore: 'Superficie de plata celestial que refleja las lágrimas de ámbar de la diosa del amor y la guerra, disipando la agresión.',
    tactics: 'Coloca en la ranura central o lateral de defensa para salvaguardar tu racha de vidas.',
    rarity: 'Rara'
  },
  {
    id: 'niflkruna',
    norse: 'NIFLKRUNA',
    name: 'Corona Glacial de Niflheim',
    nameEn: 'Glacial Crown of Niflheim',
    category: 'defense',
    gem: 'sapphire',
    pts: 95,
    art: 'assets/card_corona.jpg',
    lore: 'Diarrea de escarcha eterna tallada de los glaciares originarios del cosmos nórdico. Congela los errores con serenidad.',
    tactics: 'Su tono azul cobalto profundo la hace inconfundible incluso durante la Niebla Oscura.',
    rarity: 'Común'
  },
  {
    id: 'skjoldr_hlifar',
    norse: 'SKJOLDR HLIFAR',
    name: 'Escudo Protector',
    nameEn: 'Shield of Protection',
    category: 'defense',
    gem: 'sapphire',
    pts: 60,
    art: '',
    lore: 'Roble macizo revestido de piel de buey y un gran umbo de hierro pulido para frenar cualquier embate.',
    tactics: 'La base de tu defensa en las primeras rondas del Ascenso Rúnico.',
    rarity: 'Común'
  },
  {
    id: 'isvegr',
    norse: 'ISVEGR',
    name: 'Muralla Glacial',
    nameEn: 'Glacial Wall',
    category: 'defense',
    gem: 'sapphire',
    pts: 70,
    art: '',
    lore: 'Bloque monumental de hielo indestructible que detiene flechas ardientes y alientos de dragón.',
    tactics: 'Excelente estabilidad y visibilidad en altares permutados.',
    rarity: 'Común'
  },
  {
    id: 'hjalmr_valkyrju',
    norse: 'HJALMR VALKYRJU',
    name: 'Yelmo de Valquiria',
    nameEn: 'Valkyrie Helm',
    category: 'defense',
    gem: 'sapphire',
    pts: 85,
    art: '',
    lore: 'Adornado con alas de cisne plateadas, bendecido para guiar a los espíritus heroicos hacia el descanso eterno.',
    tactics: 'Otorga una lectura táctica nítida cuando el reloj de arena apremia.',
    rarity: 'Poco Común'
  },
  {
    id: 'ljosskjoldr',
    norse: 'LJOSSKJOLDR',
    name: 'Aegis Divino',
    nameEn: 'Divine Aegis',
    category: 'defense',
    gem: 'sapphire',
    pts: 105,
    art: '',
    lore: 'Escudo incandescente de luz solar bendecido por Baldur. Ciega a los demonios que pretenden alterar tu draft.',
    tactics: 'Puntaje de defensa superior para escalar la tabla de clasificación mundial.',
    rarity: 'Rara'
  },
  {
    id: 'brotin_brynja',
    norse: 'BROTIN BRYNJA',
    name: 'Armadura Fracturada',
    nameEn: 'Fractured Armor',
    category: 'defense',
    gem: 'sapphire',
    pts: 55,
    art: '',
    lore: 'Cota de malla curtida por mil batallas; aunque agrietada, aún contiene el coraje indestructible de su portador.',
    tactics: 'Aparece frecuentemente; no la dejes expirar en la cinta de descarte.',
    rarity: 'Común'
  },
  {
    id: 'drekaskjoldr',
    norse: 'DREKASKJOLDR',
    name: 'Escudo de Dragón',
    nameEn: 'Dragon Shield',
    category: 'defense',
    gem: 'sapphire',
    pts: 90,
    art: '',
    lore: 'Escamas carmesí y azules ensambladas con remaches de bronce de Nidavellir, resistentes al calor del tártaro.',
    tactics: 'Combina estéticamente con el monolito rúnico en permutaciones DUA y DAU.',
    rarity: 'Poco Común'
  },
  {
    id: 'nordurljosakapa',
    norse: 'NORDURLJOSAKAPA',
    name: 'Manto de la Aurora',
    nameEn: 'Aurora Mantle',
    category: 'defense',
    gem: 'sapphire',
    pts: 80,
    art: '',
    lore: 'Tejido etéreo con los destellos verdes y violetas de la aurora boreal que cruza el cielo ártico.',
    tactics: 'Mitiga el estrés visual en pantallas OLED gracias a su tono fluido.',
    rarity: 'Común'
  },
  {
    id: 'steinmurr',
    norse: 'STEINMURR',
    name: 'Bastión de Piedra Rúnica',
    nameEn: 'Runic Stone Bastion',
    category: 'defense',
    gem: 'sapphire',
    pts: 75,
    art: '',
    lore: 'Menhir vertical grabado con encantamientos de protección que anclan el alma al suelo sagrado.',
    tactics: 'Su masa volumétrica ayuda a fijar el drag and drop sin titubeos.',
    rarity: 'Común'
  },
  {
    id: 'jotunngloi',
    norse: 'JOTUNNGLOI',
    name: 'Guantelete del Gigante',
    nameEn: 'Giant\'s Gauntlet',
    category: 'defense',
    gem: 'sapphire',
    pts: 80,
    art: '',
    lore: 'Guantelete de placas de hierro colosal que permite detener el filo de espadas legendarias a mano limpia.',
    tactics: 'Seguridad máxima contra penalizaciones de tiempo.',
    rarity: 'Común'
  },
  {
    id: 'gleipnir',
    norse: 'GLEIPNIR',
    name: 'Grilletes Cósmicos de Gleipnir',
    nameEn: 'Gleipnir Cosmic Shackles',
    category: 'defense',
    gem: 'sapphire',
    pts: 110,
    art: '',
    lore: 'Seda mágica suave como el viento pero más resistente que el acero, hecha con el suspiro de los peces y las raíces de la montaña.',
    tactics: 'Inmoviliza las cartas erráticas cuando el ritmo se descontrola.',
    rarity: 'Rara'
  },
  {
    id: 'vardsteinn',
    norse: 'VARDSTEINN',
    name: 'Monolito Rúnico de Guarda',
    nameEn: 'Wardstone Monolith',
    category: 'defense',
    gem: 'sapphire',
    pts: 85,
    art: '',
    lore: 'Centinela de basalto que erige una cúpula protectora invisible sobre los tres altares.',
    tactics: 'Perfecto para coordinar la posición de la ranura de defensa en permutaciones cruzadas.',
    rarity: 'Poco Común'
  },

  // --- 13 UTILITY CARDS (Emerald Green) ---
  {
    id: 'vegvisir',
    norse: 'VEGVISIR',
    name: 'Astrolabio Navegante Vegvísir',
    nameEn: 'Vegvísir Wayfinder Astrolabe',
    category: 'utility',
    gem: 'emerald',
    pts: 100,
    art: 'assets/card_vegvisir.jpg',
    lore: 'El símbolo sagrado que garantiza que el portador nunca perderá su rumbo a través de las tormentas ni en mares desconocidos.',
    tactics: 'Orienta tu vista hacia el altar de utilidad incluso bajo efectos de Dimensión Espejo.',
    rarity: 'Rara'
  },
  {
    id: 'yggdrasilsfrae',
    norse: 'YGGDRASILSFRAE',
    name: 'Semilla Cósmica de Yggdrasil',
    nameEn: 'World Tree Cosmic Seed',
    category: 'utility',
    gem: 'emerald',
    pts: 95,
    art: 'assets/card_yggdrasil.jpg',
    lore: 'Un brote que late con la savia del Fresno del Mundo. Conecta las raíces arcanas de los nueve reinos.',
    tactics: 'Concede un bono acumulativo de puntos de utilidad al encadenar drafts perfectos.',
    rarity: 'Común'
  },
  {
    id: 'tofradrykkr',
    norse: 'TOFRADRYKKR',
    name: 'Poción de Maná',
    nameEn: 'Mana Potion',
    category: 'utility',
    gem: 'emerald',
    pts: 60,
    art: '',
    lore: 'Frasco de cristal con infusión de hierbas silvestres de Vanaheim que revitaliza el flujo mágico del archimago.',
    tactics: 'Carta de utilidad estándar; colócala sin demora para mantener la cadencia.',
    rarity: 'Común'
  },
  {
    id: 'galdrabok_odains',
    norse: 'GALDRABOK ODAINS',
    name: 'Grimorio Prohibido',
    nameEn: 'Forbidden Grimoire',
    category: 'utility',
    gem: 'emerald',
    pts: 90,
    art: '',
    lore: 'Manuscrito encuadernado en cuero oscuro con cánticos rúnicos de transmutación y videncia temporal.',
    tactics: 'Multiplica la puntuación general al validar tres cartas consecutivas.',
    rarity: 'Poco Común'
  },
  {
    id: 'timaglas_alheims',
    norse: 'TIMAGLAS ALHEIMS',
    name: 'Reloj Cósmico',
    nameEn: 'Cosmic Hourglass',
    category: 'utility',
    gem: 'emerald',
    pts: 85,
    art: '',
    lore: 'Su arena está compuesta de polvo de estrellas fugaces. Controla la caída inexorable de los segundos.',
    tactics: 'Excelente para recuperar serenidad mental en rondas de alta velocidad.',
    rarity: 'Poco Común'
  },
  {
    id: 'lifselixir',
    norse: 'LIFSELIXIR',
    name: 'Elixir de Vida',
    nameEn: 'Life Elixir',
    category: 'utility',
    gem: 'emerald',
    pts: 80,
    art: '',
    lore: 'Extracto dorado destilado de las manzanas de Idunn que otorga juventud perpetua a los dioses aesir.',
    tactics: 'Vital para alcanzar puntuaciones récord en partidas de larga duración.',
    rarity: 'Común'
  },
  {
    id: 'draugalas',
    norse: 'DRAUGALAS',
    name: 'Candado Espectral',
    nameEn: 'Ghost Lock',
    category: 'utility',
    gem: 'emerald',
    pts: 70,
    art: '',
    lore: 'Cerradura forjada en el reino de los muertos que sella las fugas de energía espiritual.',
    tactics: 'Evita penalizaciones imprevistas cuando una carta roza la zona de descarte.',
    rarity: 'Común'
  },
  {
    id: 'gjallarhorn',
    norse: 'GJALLARHORN',
    name: 'Cuerno de Heimdall',
    nameEn: 'Heimdall\'s Horn',
    category: 'utility',
    gem: 'emerald',
    pts: 105,
    art: '',
    lore: 'Su eco atraviesa los nueve mundos anunciando los eventos que cambian el curso del destino.',
    tactics: 'Gran bonificación de puntos al sonar en el monolito inferior.',
    rarity: 'Rara'
  },
  {
    id: 'odinsauga',
    norse: 'ODINSAUGA',
    name: 'Ojo de Odín — Astrolabio',
    nameEn: 'Eye of Odin Astrolabe',
    category: 'utility',
    gem: 'emerald',
    pts: 95,
    art: '',
    lore: 'El ojo entregado en la fuente de Mímir a cambio de la sabiduría omnisciente de todo lo que fue y será.',
    tactics: 'Permite anticipar mentalmente la siguiente carta en la cola de spawn.',
    rarity: 'Poco Común'
  },
  {
    id: 'visdomsfjodr',
    norse: 'VISDOMSFJODR',
    name: 'Pluma de Sabiduría',
    nameEn: 'Feather of Wisdom',
    category: 'utility',
    gem: 'emerald',
    pts: 65,
    art: '',
    lore: 'Pluma caída de las alas de Hugin o Munin mientras sobrevolaban los confines del abismo de Ginnungagap.',
    tactics: 'Ligera y precisa para swipes directos.',
    rarity: 'Común'
  },
  {
    id: 'draupnir',
    norse: 'DRAUPNIR',
    name: 'Anillo Draupnir',
    nameEn: 'Draupnir Gold Ring',
    category: 'utility',
    gem: 'emerald',
    pts: 100,
    art: '',
    lore: 'El anillo de oro del que brotan ocho anillos iguales cada novena noche, símbolo de infinita prosperidad.',
    tactics: 'Aumenta el rendimiento de maná y puntos en series de draft prolongadas.',
    rarity: 'Rara'
  },
  {
    id: 'odrerir',
    norse: 'ODRERIR',
    name: 'El Gran Caldero de Sabiduría',
    nameEn: 'Odrerir Mead Cauldron',
    category: 'utility',
    gem: 'emerald',
    pts: 85,
    art: '',
    lore: 'Contenedor del hidromiel poético que inspira a bardos y hechiceros a pronunciar cánticos arcanos.',
    tactics: 'Facilita la transición fluida hacia el altar de utilidad.',
    rarity: 'Poco Común'
  },
  {
    id: 'urlogavefr',
    norse: 'URLOGAVEFR',
    name: 'El Telar de las Nornas',
    nameEn: 'Loom of the Norns',
    category: 'utility',
    gem: 'emerald',
    pts: 90,
    art: '',
    lore: 'Urðr, Verðandi y Skuld entrelazan los hilos de la vida y el destino mortal bajo las ramas del fresno.',
    tactics: 'Permite reordenar mentalmente el flujo de cartas durante aceleraciones drásticas.',
    rarity: 'Poco Común'
  },

  // --- 5 MYTHIC CARDS (Golden Amber) ---
  {
    id: 'brimsteinssprengja',
    norse: 'BRIMSTEINSSPRENGJA',
    name: 'Bomba Alquímica Mítica',
    nameEn: 'Mythic Brimstone Bomb',
    category: 'mythic',
    gem: 'mythic',
    pts: 200,
    art: 'assets/card_bomba.png',
    lore: '¡PELIGRO LETAL! Un artefacto inestable cargado de azufre ígneo. Si toca el monolito o expira en el carril, explota y cuesta 1 vida de inmediato.',
    tactics: '¡DESLIZA HACIA AFUERA! Lanza esta carta hacia los nichos laterales o fuera de la pantalla antes de que la mecha se consuma.',
    rarity: 'Mítica'
  },
  {
    id: 'stjornugersemi',
    norse: 'STJORNUGERSEMI',
    name: 'Reliquia Astral Mítica',
    nameEn: 'Astral Relic Joker',
    category: 'mythic',
    gem: 'mythic',
    pts: 180,
    art: '',
    lore: 'El comodín definitivo creado por las estrellas fugaces de Asgard. Encaja armónicamente en cualquiera de las tres ranuras del monolito.',
    tactics: 'Úsala en la ranura que más te convenga para rescatar un combo en apuros.',
    rarity: 'Mítica'
  },
  {
    id: 'gullvettir',
    norse: 'GULLVETTIR',
    name: 'Duende del Botín Mítico',
    nameEn: 'Loot Goblin',
    category: 'mythic',
    gem: 'mythic',
    pts: 250,
    art: '',
    lore: 'Criatura escurridiza que corretea por el tablero cargada con lingotes dorados robados de la forja de los enanos.',
    tactics: 'Atrápala rápidamente hacia el Nicho Derecho Mítico para reclamar una lluvia de puntos extra.',
    rarity: 'Mítica'
  },
  {
    id: 'afturganga',
    norse: 'AFTURGANGA',
    name: 'Espectro Astral Mítico',
    nameEn: 'Astral Specter',
    category: 'mythic',
    gem: 'mythic',
    pts: 190,
    art: '',
    lore: 'Aparición luminosa que sobrevuela el tablero otorgando inmunidad temporal a las penalizaciones de descarte.',
    tactics: 'Ubícala en el Nicho Derecho para activar el aura de protección espectral.',
    rarity: 'Mítica'
  },
  {
    id: 'timabrot',
    norse: 'TIMABROT',
    name: 'Fragmento del Tiempo Mítico',
    nameEn: 'Time Shard',
    category: 'mythic',
    gem: 'mythic',
    pts: 220,
    art: '',
    lore: 'Una esquirla suspendida del fluir cósmico que ralentiza drásticamente la caída de cartas sin afectar tus movimientos.',
    tactics: 'Indispensable en niveles superiores al 20 para reorganizar el draft con calma.',
    rarity: 'Mítica'
  },

  // --- 10 SPECIAL CARDS (Arcane Amethyst) ---
  {
    id: 'frostheimr',
    norse: 'FROSTHEIMR',
    name: 'Cero Absoluto',
    nameEn: 'Absolute Zero',
    category: 'special',
    gem: 'special',
    pts: 150,
    art: 'assets/card_cero.png',
    lore: 'Desata una tormenta de hielo primordial que congela instantáneamente todas las cartas y temporizadores de la pantalla.',
    tactics: 'Arrastra al Nicho Izquierdo Especial para ganar 4 segundos de pausa absoluta.',
    rarity: 'Especial'
  },
  {
    id: 'segulstal',
    norse: 'SEGULSTAL',
    name: 'Imán Arcano',
    nameEn: 'Arcane Magnet',
    category: 'special',
    gem: 'special',
    pts: 140,
    art: 'assets/card_iman.png',
    lore: 'Polariza el flujo magnético de las runas, guiando suavemente las cartas hacia sus respectivas zonas correctas.',
    tactics: 'Actívala en el Nicho Izquierdo para facilitar drafts relámpago con cero errores.',
    rarity: 'Especial'
  },
  {
    id: 'idustraumr',
    norse: 'IDUSTRAUMR',
    name: 'Vórtice Cósmico',
    nameEn: 'Cosmic Vortex',
    category: 'special',
    gem: 'special',
    pts: 160,
    art: 'assets/card_vortice.png',
    lore: 'Abre un portal interdimensional que absorbe las cartas acumuladas en la cinta y recompensa puntos instantáneos.',
    tactics: 'Despeja el tablero saturado en un solo movimiento hacia el Nicho Izquierdo.',
    rarity: 'Especial'
  },
  {
    id: 'speglavidd',
    norse: 'SPEGLAVIDD',
    name: 'Dimensión Espejo',
    nameEn: 'Mirror Dimension',
    category: 'special',
    gem: 'special',
    pts: 130,
    art: '',
    lore: 'Muta instantáneamente el orden de las tres ranuras del monolito, obligando al archimago a reajustar su mente.',
    tactics: 'Efecto de doble filo; aprende a leer el nuevo orden de altares en menos de medio segundo.',
    rarity: 'Especial'
  },
  {
    id: 'thyngdarleysi',
    norse: 'THYNGDARLEYSI',
    name: 'Antigravedad',
    nameEn: 'Zero Gravity',
    category: 'special',
    gem: 'special',
    pts: 135,
    art: '',
    lore: 'Invierte las leyes del peso de Midgard. Las cartas flotan hacia arriba en lugar de descender hacia el descarte.',
    tactics: 'Te otorga valiosos segundos de respiro al retrasar la expiración en la zona inferior.',
    rarity: 'Especial'
  },
  {
    id: 'thokumyrkr',
    norse: 'THOKUMYRKR',
    name: 'Niebla Oscura',
    nameEn: 'Dark Fog',
    category: 'special',
    gem: 'special',
    pts: 140,
    art: '',
    lore: 'Una densa bruma espectral cubre el centro del tablero reduciendo las ilustraciones a siluetas de sombras.',
    tactics: '¡Confía en las 4 gemas romboédricas angulares! Sus colores continúan brillando a través de la niebla.',
    rarity: 'Especial'
  },
  {
    id: 'blekslettur',
    norse: 'BLEKSLETTUR',
    name: 'Tinta Derramada',
    nameEn: 'Ink Spill',
    category: 'special',
    gem: 'special',
    pts: 125,
    art: '',
    lore: 'Gotas de tinta mística manchan transitoriamente fragmentos del cristal y del monolito.',
    tactics: 'Toca o barre con el dedo la pantalla para limpiar las manchas más rápido.',
    rarity: 'Especial'
  },
  {
    id: 'heilog_hreinsun',
    norse: 'HEILOG HREINSUN',
    name: 'Purificación Sagrada',
    nameEn: 'Sacred Purification',
    category: 'special',
    gem: 'special',
    pts: 150,
    art: '',
    lore: 'Un resplandor de pureza divina que disipa inmediatamente niebla, tinta derramada o efectos alteradores.',
    tactics: 'Guarda esta carta para librarte de combinaciones de afijos complejas.',
    rarity: 'Especial'
  },
  {
    id: 'elding_aedis',
    norse: 'ELDING AEDIS',
    name: 'Relámpago de Frenesí',
    nameEn: 'Frenzy Lightning',
    category: 'special',
    gem: 'special',
    pts: 175,
    art: '',
    lore: 'Carga el monolito con electricidad rúnica dorada, activando el Frenesí x3 y protección de vidas temporal.',
    tactics: 'Aprovecha los segundos de frenesí para drafter al máximo ritmo sin temor a perder corazones.',
    rarity: 'Especial'
  },
  {
    id: 'kambjon',
    norse: 'KAMBJON',
    name: 'Camaleón Místico',
    nameEn: 'Mystic Chameleon',
    category: 'special',
    gem: 'special',
    pts: 145,
    art: '',
    lore: 'Criatura astral que transmuta continuamente de color y tipo cada 1.5 segundos (Rojo -> Azul -> Verde).',
    tactics: 'Sincroniza tu swipe en el momento exacto en que coincide con la ranura que deseas completar.',
    rarity: 'Especial'
  }
];

/* ==========================================================================
   4. GRIMOIRE FILTERING & RENDERING
   ========================================================================== */
function initGrimoire() {
  const grimoireGrid = document.getElementById('grimoireGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('grimoireSearch');

  let currentCategory = 'all';
  let currentSearch = '';

  // Update category counts in buttons
  updateCategoryCounts();

  function renderCards() {
    if (!grimoireGrid) return;

    const filtered = GRIMOIRE_CARDS.filter(card => {
      const matchesCat = (currentCategory === 'all') || (card.category === currentCategory);
      const matchesSearch = !currentSearch ||
        card.norse.toLowerCase().includes(currentSearch) ||
        card.name.toLowerCase().includes(currentSearch) ||
        card.nameEn.toLowerCase().includes(currentSearch) ||
        card.lore.toLowerCase().includes(currentSearch);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      grimoireGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔮</div>
          <h4 style="font-size: 1.2rem; color: #fff; margin-bottom: 6px;">No se encontraron cartas</h4>
          <p>Intenta con otro término de búsqueda o selecciona otra categoría.</p>
        </div>
      `;
      return;
    }

    grimoireGrid.innerHTML = filtered.map(card => {
      const artHtml = card.art ?
        `<img src="${card.art}" alt="${card.name}" loading="lazy">` :
        `<div class="card-art-fallback">${getCategoryEmoji(card.category)}</div>`;

      return `
        <div class="arcane-card category-${card.category}" data-card-id="${card.id}">
          <div class="card-inner-frame">
            <!-- 4 Corner Rhombus Gemstones -->
            <div class="card-gem gem-tl gem-${card.gem}"></div>
            <div class="card-gem gem-tr gem-${card.gem}"></div>
            <div class="card-gem gem-bl gem-${card.gem}"></div>
            <div class="card-gem gem-br gem-${card.gem}"></div>

            <!-- Top Type Tag -->
            <div class="card-top-tag">${card.category.toUpperCase()}</div>

            <!-- Artwork Box -->
            <div class="card-art-box">
              ${artHtml}
            </div>

            <!-- Standardized Bottom Plaque -->
            <div class="card-plaque">
              <div class="card-plaque-name">${card.norse}</div>
              <div class="card-plaque-sub">${card.name}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    grimoireGrid.querySelectorAll('.arcane-card').forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        const id = cardEl.getAttribute('data-card-id');
        openCardModal(id);
      });
    });
  }

  function updateCategoryCounts() {
    filterBtns.forEach(btn => {
      const cat = btn.getAttribute('data-category');
      const countEl = btn.querySelector('.filter-count');
      if (countEl) {
        if (cat === 'all') {
          countEl.textContent = GRIMOIRE_CARDS.length;
        } else {
          const count = GRIMOIRE_CARDS.filter(c => c.category === cat).length;
          countEl.textContent = count;
        }
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderCards();
    });
  }

  // Initial render
  renderCards();
}

function getCategoryEmoji(category) {
  switch (category) {
    case 'attack': return '⚔️';
    case 'defense': return '🛡️';
    case 'utility': return '🧪';
    case 'mythic': return '👑';
    case 'special': return '⭐';
    default: return '🃏';
  }
}

/* ==========================================================================
   5. CARD INSPECTOR MODAL
   ========================================================================== */
function initCardModal() {
  const modalBackdrop = document.getElementById('cardModalBackdrop');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn && modalBackdrop) {
    closeBtn.addEventListener('click', closeCardModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeCardModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeCardModal();
      }
    });
  }
}

function openCardModal(cardId) {
  const card = GRIMOIRE_CARDS.find(c => c.id === cardId);
  if (!card) return;

  const modalBackdrop = document.getElementById('cardModalBackdrop');
  const modalVisual = document.getElementById('modalCardVisual');
  const modalTag = document.getElementById('modalCardTag');
  const modalTitle = document.getElementById('modalCardTitle');
  const modalNorse = document.getElementById('modalCardNorse');
  const modalPts = document.getElementById('modalCardPts');
  const modalRarity = document.getElementById('modalCardRarity');
  const modalLore = document.getElementById('modalCardLore');
  const modalTactics = document.getElementById('modalCardTactics');

  if (modalVisual) {
    modalVisual.innerHTML = card.art ?
      `<img src="${card.art}" alt="${card.name}">` :
      `<div class="card-art-fallback" style="height: 100%; font-size: 4rem;">${getCategoryEmoji(card.category)}</div>`;
  }

  if (modalTag) {
    modalTag.textContent = `${card.category.toUpperCase()} • ${card.gem.toUpperCase()}`;
    modalTag.className = `modal-card-tag badge-${card.category === 'attack' ? 'survival' : (card.category === 'defense' ? 'speed' : (card.category === 'mythic' ? 'featured' : 'global'))}`;
  }

  if (modalTitle) modalTitle.textContent = card.name;
  if (modalNorse) modalNorse.textContent = `« ${card.norse} » — ${card.nameEn}`;
  if (modalPts) modalPts.textContent = `+${card.pts} PTS`;
  if (modalRarity) modalRarity.textContent = card.rarity;
  if (modalLore) modalLore.textContent = `"${card.lore}"`;
  if (modalTactics) modalTactics.textContent = card.tactics;

  if (modalBackdrop) modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCardModal() {
  const modalBackdrop = document.getElementById('cardModalBackdrop');
  if (modalBackdrop) modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

/* ==========================================================================
   6. PRORATED UPGRADE CALCULATOR
   ========================================================================== */
const TIER_PRICING = {
  tier0: { name: 'Tier 0 (Gratuito)', price: 0.00 },
  tier1: { name: 'Tier 1 (Iniciado)', price: 2.99 },
  tier2: { name: 'Tier 2 (Campeón)', price: 4.99 },
  tier3: { name: 'Tier 3 (Fundador)', price: 9.99 }
};

function initUpgradeCalculator() {
  const calcSelect = document.getElementById('upgradeCalcSelect');
  if (!calcSelect) return;

  const t1PriceEl = document.getElementById('t1PriceDisplay');
  const t2PriceEl = document.getElementById('t2PriceDisplay');
  const t3PriceEl = document.getElementById('t3PriceDisplay');

  const t1TagEl = document.getElementById('t1ProratedTag');
  const t2TagEl = document.getElementById('t2ProratedTag');
  const t3TagEl = document.getElementById('t3ProratedTag');

  calcSelect.addEventListener('change', () => {
    const current = calcSelect.value;

    if (current === '0') {
      // Free: Regular full prices
      t1PriceEl.textContent = '2.99';
      t2PriceEl.textContent = '4.99';
      t3PriceEl.textContent = '9.99';

      t1TagEl.style.display = 'none';
      t2TagEl.style.display = 'none';
      t3TagEl.style.display = 'none';
    } else if (current === '1') {
      // Owns Tier 1 ($2.99)
      t1PriceEl.textContent = 'ADQUIRIDO';
      t2PriceEl.textContent = '2.00'; // 4.99 - 2.99 = 2.00
      t3PriceEl.textContent = '7.00'; // 9.99 - 2.99 = 7.00

      t1TagEl.style.display = 'inline-block';
      t1TagEl.textContent = '✓ Activo en tu cuenta';

      t2TagEl.style.display = 'inline-block';
      t2TagEl.textContent = '¡Ahorras $2.99 USD!';

      t3TagEl.style.display = 'inline-block';
      t3TagEl.textContent = '¡Ahorras $2.99 USD!';
    } else if (current === '2') {
      // Owns Tier 2 ($4.99)
      t1PriceEl.textContent = 'INCLUIDO';
      t2PriceEl.textContent = 'ADQUIRIDO';
      t3PriceEl.textContent = '5.00'; // 9.99 - 4.99 = 5.00

      t1TagEl.style.display = 'inline-block';
      t1TagEl.textContent = '✓ Incluido';

      t2TagEl.style.display = 'inline-block';
      t2TagEl.textContent = '✓ Activo en tu cuenta';

      t3TagEl.style.display = 'inline-block';
      t3TagEl.textContent = '¡Ahorras $4.99 USD!';
    } else if (current === '3') {
      // Owns Founder
      t1PriceEl.textContent = 'INCLUIDO';
      t2PriceEl.textContent = 'INCLUIDO';
      t3PriceEl.textContent = 'ADQUIRIDO';

      t1TagEl.style.display = 'inline-block';
      t1TagEl.textContent = '✓ Rango Máximo';
      t2TagEl.style.display = 'inline-block';
      t2TagEl.textContent = '✓ Rango Máximo';
      t3TagEl.style.display = 'inline-block';
      t3TagEl.textContent = '👑 Estatus Fundador Activo';
    }
  });
}

/* ==========================================================================
   7. INTERACTIVE ASMR AUDIO SOUNDBOARD (WEB AUDIO SYNTHESIS)
   ========================================================================== */
function initSoundboard() {
  const tabBtns = document.querySelectorAll('.sb-tab-btn');
  const padsGrid = document.getElementById('soundPadsGrid');

  // Web Audio Context for zero-latency, realistic tactile ASMR synthesis
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const DRAG_SOUNDS = [
    { id: 'foil', name: 'Terciopelo Foil', sub: 'Por Defecto', freq: 440, type: 'sine', decay: 0.12 },
    { id: 'gravity', name: 'Pulso Gravitatorio', sub: 'Grave Resonante', freq: 160, type: 'triangle', decay: 0.25 },
    { id: 'linen', name: 'Lino Rúnico', sub: 'Textura Sedosa', freq: 520, type: 'sawtooth', decay: 0.08 },
    { id: 'quartz', name: 'Susurro de Cuarzo', sub: 'Brillo Etéreo', freq: 880, type: 'sine', decay: 0.15 },
    { id: 'spark', name: 'Chispazo Astral', sub: 'Micro-chispa', freq: 1100, type: 'sawtooth', decay: 0.06 },
    { id: 'thor', name: 'Relámpago de Thor', sub: 'Descarga Electrizante', freq: 320, type: 'square', decay: 0.18 },
    { id: 'arpeggio', name: 'Arpegio Celestial', sub: 'Armonía Nórdica', freq: 660, type: 'sine', decay: 0.22 }
  ];

  const SNAP_SOUNDS = [
    { id: 'crystal', name: 'Arpegio de Cristal', sub: 'Campana Pura', freq: 980, type: 'sine', decay: 0.35 },
    { id: 'basalt', name: 'Forja de Basalto', sub: 'Impacto Pétreo', freq: 120, type: 'triangle', decay: 0.28 },
    { id: 'click', name: 'Chasquido Táctico', sub: 'Por Defecto', freq: 720, type: 'square', decay: 0.05 },
    { id: 'fanfare', name: 'Fanfarria Soberana', sub: 'Acorde Triunfal', freq: 550, type: 'triangle', decay: 0.4 },
    { id: 'arcane_bell', name: 'Campana Arcana', sub: 'Reverberación', freq: 820, type: 'sine', decay: 0.5 },
    { id: 'ebony', name: 'Ébano ASMR', sub: 'Madera 100% Anti-fatiga', freq: 280, type: 'sine', decay: 0.12 },
    { id: 'valhalla', name: 'Campanas Valhalla', sub: 'Carillón Místico', freq: 1200, type: 'sine', decay: 0.6 }
  ];

  let currentTab = 'drag';

  function playSynthesizedSound(sound) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = sound.type || 'sine';
    osc.frequency.setValueAtTime(sound.freq, ctx.currentTime);

    // Subtle pitch dip for tactile wood/click feel
    if (sound.id === 'ebony' || sound.id === 'click' || sound.id === 'basalt') {
      osc.frequency.exponentialRampToValueAtTime(sound.freq * 0.4, ctx.currentTime + sound.decay);
    }

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + sound.decay);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + sound.decay);
  }

  function renderSoundPads() {
    if (!padsGrid) return;
    const sounds = currentTab === 'drag' ? DRAG_SOUNDS : SNAP_SOUNDS;

    padsGrid.innerHTML = sounds.map((s, idx) => `
      <div class="sound-pad" data-index="${idx}">
        <div class="sound-pad-icon">${currentTab === 'drag' ? '🎴' : '✨'}</div>
        <div class="sound-pad-name">${s.name}</div>
        <div class="sound-pad-sub">${s.sub}</div>
      </div>
    `).join('');

    padsGrid.querySelectorAll('.sound-pad').forEach(pad => {
      pad.addEventListener('click', () => {
        const idx = parseInt(pad.getAttribute('data-index'), 10);
        const sound = sounds[idx];

        pad.classList.add('playing');
        playSynthesizedSound(sound);
        setTimeout(() => pad.classList.remove('playing'), 250);
      });
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.getAttribute('data-tab');
      renderSoundPads();
    });
  });

  renderSoundPads();
}

/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all others
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}
