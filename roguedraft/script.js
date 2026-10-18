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
    name: 'Attack • Defense • Utility',
    badge: 'Balanced Triad',
    desc: 'The classical northern triad. The sword opens the breach, the shield anchors the frontline, and the elixir secures victory.',
    slots: [
      { type: 'attack', name: 'Attack', icon: '⚔️', desc: 'Swords, Axes & Lightning' },
      { type: 'defense', name: 'Defense', icon: '🛡️', desc: 'Shields, Walls & Helms' },
      { type: 'utility', name: 'Utility', icon: '🧪', desc: 'Potions, Grimoires & Relics' }
    ]
  },
  'AUD': {
    name: 'Attack • Utility • Defense',
    badge: 'Arcane Pressure',
    desc: 'Empower your resources immediately after the initial strike. Demands reflex speed to lock in defense at the end.',
    slots: [
      { type: 'attack', name: 'Attack', icon: '⚔️', desc: 'Swords, Axes & Lightning' },
      { type: 'utility', name: 'Utility', icon: '🧪', desc: 'Potions, Grimoires & Relics' },
      { type: 'defense', name: 'Defense', icon: '🛡️', desc: 'Shields, Walls & Helms' }
    ]
  },
  'DAU': {
    name: 'Defense • Attack • Utility',
    badge: 'Tactical Counter',
    desc: 'Prioritize defensive bulwarks to absorb incoming assaults before unleashing an alchemically supported counterattack.',
    slots: [
      { type: 'defense', name: 'Defense', icon: '🛡️', desc: 'Shields, Walls & Helms' },
      { type: 'attack', name: 'Attack', icon: '⚔️', desc: 'Swords, Axes & Lightning' },
      { type: 'utility', name: 'Utility', icon: '🧪', desc: 'Potions, Grimoires & Relics' }
    ]
  },
  'DUA': {
    name: 'Defense • Utility • Attack',
    badge: "Sage's Bastion",
    desc: 'The sturdiest defensive permutation. Absorb the initial surge, prepare arcane artifacts, and finish with a lethal strike.',
    slots: [
      { type: 'defense', name: 'Defense', icon: '🛡️', desc: 'Shields, Walls & Helms' },
      { type: 'utility', name: 'Utility', icon: '🧪', desc: 'Potions, Grimoires & Relics' },
      { type: 'attack', name: 'Attack', icon: '⚔️', desc: 'Swords, Axes & Lightning' }
    ]
  },
  'UAD': {
    name: 'Utility • Attack • Defense',
    badge: 'Offensive Chronomancy',
    desc: 'Manipulate time dilation and mana multipliers before unleashing your offensive forces and shielding your core.',
    slots: [
      { type: 'utility', name: 'Utility', icon: '🧪', desc: 'Potions, Grimoires & Relics' },
      { type: 'attack', name: 'Attack', icon: '⚔️', desc: 'Swords, Axes & Lightning' },
      { type: 'defense', name: 'Defense', icon: '🛡️', desc: 'Shields, Walls & Helms' }
    ]
  },
  'UDA': {
    name: 'Utility • Defense • Attack',
    badge: 'Inverted Runic Dance',
    desc: 'The most demanding high-tempo permutation: requires tempering aggressive instincts to craft the ideal board state.',
    slots: [
      { type: 'utility', name: 'Utility', icon: '🧪', desc: 'Potions, Grimoires & Relics' },
      { type: 'defense', name: 'Defense', icon: '🛡️', desc: 'Shields, Walls & Helms' },
      { type: 'attack', name: 'Attack', icon: '⚔️', desc: 'Swords, Axes & Lightning' }
    ]
  }
};

let currentMonolithSkin = 'gold'; // Default: Tier 3 Founder Gold
let currentMonolithPerm = 'ADU';

function updateMonolithImage() {
  const monolithImg = document.getElementById('monolithImg');
  if (!monolithImg) return;
  const permLower = currentMonolithPerm.toLowerCase();
  if (currentMonolithSkin === 'gold') {
    monolithImg.src = `/roguedraft/assets/monolith_oro_${permLower}.png`;
    monolithImg.alt = `Founder 24K Gold Runic Monolith Permutation [${currentMonolithPerm}]`;
  } else {
    monolithImg.src = `/roguedraft/assets/monolith_${permLower}.png`;
    monolithImg.alt = `Basalt Runic Monolith Permutation [${currentMonolithPerm}]`;
  }
}

function initMonolithPermutations() {
  const permItems = document.querySelectorAll('.permutation-item');
  const altarSlotsContainer = document.getElementById('altarSlotsContainer');
  const permDescTitle = document.getElementById('permDescTitle');
  const permDescText = document.getElementById('permDescText');
  const skinBtns = document.querySelectorAll('.skin-btn');

  // Skin switcher listeners (Gold Tier 3 vs Standard Basalt)
  skinBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skinBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMonolithSkin = btn.getAttribute('data-skin') || 'gold';
      updateMonolithImage();
    });
  });

  permItems.forEach(item => {
    item.addEventListener('click', () => {
      permItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const code = item.getAttribute('data-perm');
      currentMonolithPerm = code;
      updateMonolithImage();

      const data = PERMUTATIONS_DATA[code];
      if (!data) return;

      if (permDescTitle) permDescTitle.textContent = `[${code}] — ${data.name}`;
      if (permDescText) permDescText.textContent = data.desc;

      if (altarSlotsContainer) {
        altarSlotsContainer.innerHTML = '';
        data.slots.forEach((slot, index) => {
          const slotEl = document.createElement('div');
          slotEl.className = `altar-slot ${slot.type}-slot active`;
          slotEl.innerHTML = `
            <div class="altar-slot-icon">${slot.icon}</div>
            <div class="altar-slot-name">${slot.name}</div>
            <div class="altar-slot-desc">Slot #${index + 1}</div>
          `;
          altarSlotsContainer.appendChild(slotEl);
        });
      }
    });
  });

  // Initial call
  updateMonolithImage();
}

/* ==========================================================================
   3. THE COMPREHENSIVE GRIMOIRE CARD DATABASE (ALL 54 HIGH-RES CARDS)
   ========================================================================== */
const GRIMOIRE_CARDS = [
  // --- 13 ATTACK CARDS (Red Ruby) ---
  {
    id: 'laevateinn',
    norse: 'LAEVATEINN',
    name: 'Surtr's Greatsword',
    nameEn: 'Surtr\'s Volcanic Blade',
    category: 'attack',
    gem: 'ruby',
    pts: 100,
    art: '/roguedraft/assets/card_ataque_mandoble_surtr.jpg',
    lore: "The legendary greatsword forged in the fiery fissures of Muspelheim. Dropping onto the altar unleashes a rain of cinders that shatters fate itself.",
    tactics: "Place into the Attack slot during high-tempo runs to trigger x2 combo multipliers.",
    rarity: 'Common'
  },
  {
    id: 'heljarljar',
    norse: 'HELJARLJAR',
    name: 'Scythe of Helheim',
    nameEn: 'Scythe of Helheim',
    category: 'attack',
    gem: 'ruby',
    pts: 95,
    art: '/roguedraft/assets/card_ataque_guadana_hel.jpg',
    lore: "The soul-reaper blade of the Norse underworld queen. Its obsidian edge siphons vital energy from the shadows to fuel your score.",
    tactics: "Extremely agile in draft; its sleek silhouette makes it instantly identifiable on the central conveyor.",
    rarity: 'Common'
  },
  {
    id: 'runasverd',
    norse: 'RUNASVERD',
    name: 'Steel Runesword',
    nameEn: 'Steel Runesword',
    category: 'attack',
    gem: 'ruby',
    pts: 60,
    art: '/roguedraft/assets/card_ataque_espada.png',
    lore: "A blade tempered in glacial spring water with Algiz and Tiwaz runes etched along its keen edge.",
    tactics: "The cornerstone of any offensive drafting strategy. Highly reliable in all 6 permutations.",
    rarity: 'Common'
  },
  {
    id: 'vigox_blodug',
    norse: 'VIGOX BLODUG',
    name: 'Bloody Battleaxe',
    nameEn: 'Bloody Battleaxe',
    category: 'attack',
    gem: 'ruby',
    pts: 70,
    art: '/roguedraft/assets/card_ataque_hacha.png',
    lore: "A heavy siege axe wielded by berserker vanguards. The sheer weight of its cleaving edge cuts through hesitation.",
    tactics: "Provides a solid tactical read in early levels with steady conveyor speeds.",
    rarity: 'Common'
  },
  {
    id: 'elding_himins',
    norse: 'ELDING HIMINS',
    name: 'Heavenly Lightning',
    nameEn: 'Heavenly Lightning',
    category: 'attack',
    gem: 'ruby',
    pts: 85,
    art: '/roguedraft/assets/card_ataque_rayo.png',
    lore: "A blazing spark torn from the stormy skies of Asgard. Strikes with blinding, decisive velocity.",
    tactics: "Ideal for executing instant, lightning-fast flicks directly into the Attack slot without pausing.",
    rarity: 'Uncommon'
  },
  {
    id: 'fornkraftr',
    norse: 'FORNKRAFTR',
    name: 'Ancient Power',
    nameEn: 'Ancient Power',
    category: 'attack',
    gem: 'ruby',
    pts: 75,
    art: '/roguedraft/assets/card_ataque_poder_ancestral.png',
    lore: "The primordial strength of the stone giants who chiseled the very first fjords of Midgard.",
    tactics: "Stabilizes your score threshold in deeper procedural levels.",
    rarity: 'Common'
  },
  {
    id: 'bolvadr_knifr',
    norse: 'BOLVADR KNIFR',
    name: 'Cursed Blade',
    nameEn: 'Cursed Blade',
    category: 'attack',
    gem: 'ruby',
    pts: 80,
    art: '/roguedraft/assets/card_ataque_cuchilla_maldita.png',
    lore: "A ritual dagger steeped in dark seidr sorcery. It demands precise timing in exchange for devastating point surges.",
    tactics: "High risk, high reward. Verify that your monolith has an active Attack slot before releasing.",
    rarity: 'Uncommon'
  },
  {
    id: 'geirr_odins',
    norse: 'GEIRR ODINS',
    name: 'Odin's Spear (Gungnir)',
    nameEn: 'Odin\'s Spear Gungnir',
    category: 'attack',
    gem: 'ruby',
    pts: 110,
    art: '/roguedraft/assets/card_ataque_lanza_odin.png',
    lore: "The divine spear that never misses its target. Forged by the Sons of Ivaldi, it pulses with absolute authority.",
    tactics: "A high-value card granting +120 PTS. Prioritize grabbing it early from the draft flow.",
    rarity: 'Rare'
  },
  {
    id: 'hamarr_thors',
    norse: 'HAMARR THORS',
    name: 'Thor's Hammer (Mjölnir)',
    nameEn: 'Thor\'s Hammer Mjölnir',
    category: 'attack',
    gem: 'ruby',
    pts: 120,
    art: '/roguedraft/assets/card_ataque_martillo_thor.png',
    lore: "The crushing weapon of the God of Thunder. When slammed into the altar, thunderclaps shake the table and shatter doubts.",
    tactics: "High-point flagship card (+135 PTS). Synergizes exceptionally with active Frenzy multipliers.",
    rarity: 'Rare'
  },
  {
    id: 'alfbogi',
    norse: 'ALFBOGI',
    name: 'Elven Bow of Alfheim',
    nameEn: 'Elven Bow of Alfheim',
    category: 'attack',
    gem: 'ruby',
    pts: 65,
    art: '/roguedraft/assets/card_ataque_arco_elfico.png',
    lore: "Crafted from luminous petrified white bough and strung with celestial silk. Fires arrows of condensed starlight.",
    tactics: "High visual clarity; ideal for swift flick maneuvers into the designated slot.",
    rarity: 'Common'
  },
  {
    id: 'fenrisklaer',
    norse: 'FENRISKLAER',
    name: 'Fenrir's Claws',
    nameEn: 'Fenrir\'s Claws',
    category: 'attack',
    gem: 'ruby',
    pts: 90,
    art: '/roguedraft/assets/card_ataque_garras_fenrir.png',
    lore: "Fangs and claws of the unchained primordial wolf. Their feral hunger devours obstacles in the card stream.",
    tactics: "Fast drafting signature card. Gives high scoring value in aggressive runs.",
    rarity: 'Uncommon'
  },
  {
    id: 'fafniskylfa',
    norse: 'FAFNISKYLFA',
    name: 'Dragon-skull Mace',
    nameEn: 'Dragon-skull Mace',
    category: 'attack',
    gem: 'ruby',
    pts: 85,
    art: '/roguedraft/assets/card_ataque_maza_fafnir.jpg',
    lore: "A devastating war club carved from the petrified skull of the dragon Fáfnir, crowned in gilded greed and cursed scales.",
    tactics: "Generates high score momentum when chained in succession during Frenzy mode.",
    rarity: 'Uncommon'
  },
  {
    id: 'berserkslag',
    norse: 'BERSERKSLAG',
    name: 'Berserker Flail',
    nameEn: 'Berserker Flail',
    category: 'attack',
    gem: 'ruby',
    pts: 75,
    art: '/roguedraft/assets/card_ataque_mangual_berserker.jpg',
    lore: "Three spiked iron orbs linked by heavy volcanic chains, swung in uncontrollable battle delirium.",
    tactics: "Easily recognized by its heavy silhouette. Great for rapid clearing of incoming card queues.",
    rarity: 'Common'
  },

  // --- 13 DEFENSE CARDS (Blue Sapphire) ---
  {
    id: 'freyjuspegell',
    norse: 'FREYJUSPEGELL',
    name: 'Freyja's Mirror',
    nameEn: 'Freyja\'s Relic Mirror',
    category: 'defense',
    gem: 'sapphire',
    pts: 100,
    art: '/roguedraft/assets/card_defensa_espejo_freya.jpg',
    lore: "The sacred scrying glass of the goddess of love and seidr magic. Reflects hostile energies into harmonic light.",
    tactics: "Essential in defensive permutations [DAU] and [DUA] to anchor health early.",
    rarity: 'Common'
  },
  {
    id: 'niflkruna',
    norse: 'NIFLKRUNA',
    name: 'Glacial Crown of Niflheim',
    nameEn: 'Glacial Crown of Niflheim',
    category: 'defense',
    gem: 'sapphire',
    pts: 95,
    art: '/roguedraft/assets/card_defensa_corona_glacial.jpg',
    lore: "A royal diadem sculpted from eternal primordial rime. Emits a freezing aura that stabilizes the heart of the altar.",
    tactics: "Distinctive cold sapphire palette makes it a reliable target for reflex drafting.",
    rarity: 'Common'
  },
  {
    id: 'skjoldr_hlifar',
    norse: 'SKJOLDR HLIFAR',
    name: 'Shield of Protection',
    nameEn: 'Shield of Protection',
    category: 'defense',
    gem: 'sapphire',
    pts: 60,
    art: '/roguedraft/assets/card_defensa_escudo.png',
    lore: "Reinforced ashwood round shield bound with heavy iron hoops. Bears the protective Aegishjalmr ward.",
    tactics: "Standard defensive workhorse. Perfectly tuned for basic rhythm anchoring.",
    rarity: 'Common'
  },
  {
    id: 'isvegr',
    norse: 'ISVEGR',
    name: 'Glacial Wall',
    nameEn: 'Glacial Wall',
    category: 'defense',
    gem: 'sapphire',
    pts: 70,
    art: '/roguedraft/assets/card_defensa_hielo.png',
    lore: "A monolithic barrier of enchanted mountain ice that halts relentless onslaughts.",
    tactics: "High score yield (+80 PTS) for standard defense cards.",
    rarity: 'Common'
  },
  {
    id: 'hjalmr_valkyrju',
    norse: 'HJALMR VALKYRJU',
    name: 'Valkyrie Helm',
    nameEn: 'Valkyrie Helm',
    category: 'defense',
    gem: 'sapphire',
    pts: 85,
    art: '/roguedraft/assets/card_defensa_yelmo.png',
    lore: "The winged helm worn by the choosers of the slain as they descend over fiery battlefields.",
    tactics: "Offers great visual contrast against volcanic or darker background realms.",
    rarity: 'Uncommon'
  },
  {
    id: 'ljosskjoldr',
    norse: 'LJOSSKJOLDR',
    name: 'Divine Aegis',
    nameEn: 'Divine Aegis',
    category: 'defense',
    gem: 'sapphire',
    pts: 105,
    art: '/roguedraft/assets/card_defensa_aegis_divino.png',
    lore: "A radiant kite shield imbued with the dawn light of Valhalla. Protects against cognitive fatigue.",
    tactics: "Awards +115 PTS. Prioritize when entering levels with accelerated card queues.",
    rarity: 'Rare'
  },
  {
    id: 'brotin_brynja',
    norse: 'BROTIN BRYNJA',
    name: 'Fractured Armor',
    nameEn: 'Fractured Armor',
    category: 'defense',
    gem: 'sapphire',
    pts: 55,
    art: '/roguedraft/assets/card_defensa_armadura_fracturada.png',
    lore: "Battle-scarred mail forged of blackened meteoric steel, still holding firm against doom.",
    tactics: "Reliable intermediate point generator (+75 PTS) for routine drafting rhythms.",
    rarity: 'Common'
  },
  {
    id: 'drekaskjoldr',
    norse: 'DREKASKJOLDR',
    name: 'Dragon Shield',
    nameEn: 'Dragon Shield',
    category: 'defense',
    gem: 'sapphire',
    pts: 90,
    art: '/roguedraft/assets/card_defensa_escudo_dragon.png',
    lore: "Reinforced with iridescent scales plucked from slain serpents of the deep sea trenches.",
    tactics: "Offers instant recognition thanks to its crimson-and-azure reflective sheen.",
    rarity: 'Uncommon'
  },
  {
    id: 'nordurljosakapa',
    norse: 'NORDURLJOSAKAPA',
    name: 'Aurora Mantle',
    nameEn: 'Aurora Mantle',
    category: 'defense',
    gem: 'sapphire',
    pts: 80,
    art: '/roguedraft/assets/card_defensa_manto_aurora.png',
    lore: "A flowing cape woven from shimmering green and violet ribbons of the northern lights.",
    tactics: "Calms visual stress during intense card-clearing sequences.",
    rarity: 'Uncommon'
  },
  {
    id: 'steinmurr',
    norse: 'STEINMURR',
    name: 'Runic Stone Bastion',
    nameEn: 'Runic Stone Bastion',
    category: 'defense',
    gem: 'sapphire',
    pts: 75,
    art: '/roguedraft/assets/card_defensa_bastion_runico.png',
    lore: "A wall of ancient granite megaliths etched with defensive bindrunes by master stonemasons.",
    tactics: "Simple and immediate placement target in left-aligned defense permutations.",
    rarity: 'Common'
  },
  {
    id: 'jotunngloi',
    norse: 'JOTUNNGLOI',
    name: 'Giant's Gauntlet',
    nameEn: 'Giant\'s Gauntlet',
    category: 'defense',
    gem: 'sapphire',
    pts: 80,
    art: '/roguedraft/assets/card_defensa_guantelete_gigante.png',
    lore: "A colossal iron gauntlet worn by frost giants capable of crushing mountain peaks bare-handed.",
    tactics: "Grants +125 PTS. Maximize by validating during active Frenzy fever windows.",
    rarity: 'Rare'
  },
  {
    id: 'gleipnir',
    norse: 'GLEIPNIR',
    name: 'Gleipnir Cosmic Shackles',
    nameEn: 'Gleipnir Cosmic Shackles',
    category: 'defense',
    gem: 'sapphire',
    pts: 110,
    art: '/roguedraft/assets/card_defensa_grilletes_gleipnir.jpg',
    lore: "The silk-thin yet unbreakable fetter forged from mountain roots and the breath of fish to bind the wolf.",
    tactics: "A powerhouse defense card granting +95 PTS with flawless visual clarity.",
    rarity: 'Uncommon'
  },
  {
    id: 'vardsteinn',
    norse: 'VARDSTEINN',
    name: 'Wardstone Monolith',
    nameEn: 'Wardstone Monolith',
    category: 'defense',
    gem: 'sapphire',
    pts: 85,
    art: '/roguedraft/assets/card_defensa_obelisco_vardsteinn.jpg',
    lore: "A boundary runestone consecrated with elder blessings to ward off chaotic entities.",
    tactics: "Keeps defensive momentum steady when juggling difficult permutation transitions.",
    rarity: 'Common'
  },

  // --- 13 UTILITY CARDS (Emerald Green) ---
  {
    id: 'vegvisir',
    norse: 'VEGVISIR',
    name: 'Vegvísir Wayfinder Astrolabe',
    nameEn: 'Vegvísir Wayfinder Astrolabe',
    category: 'utility',
    gem: 'emerald',
    pts: 100,
    art: '/roguedraft/assets/card_utilidad_brujula_vegvisir.jpg',
    lore: "The sacred compass inscribed so that the traveler shall never lose their way in storm or foul weather.",
    tactics: "Key utility card with high clarity; place into Utility slot to maintain fluid combo progression.",
    rarity: 'Common'
  },
  {
    id: 'yggdrasilsfrae',
    norse: 'YGGDRASILSFRAE',
    name: 'World Tree Cosmic Seed',
    nameEn: 'World Tree Cosmic Seed',
    category: 'utility',
    gem: 'emerald',
    pts: 95,
    art: '/roguedraft/assets/card_utilidad_semilla_yggdrasil.jpg',
    lore: "A glowing golden pinecone fallen from the highest canopy of Yggdrasil, cradling worlds unborn.",
    tactics: "Top-tier utility card awarding +95 PTS with bright emerald luminance.",
    rarity: 'Common'
  },
  {
    id: 'tofradrykkr',
    norse: 'TOFRADRYKKR',
    name: 'Mana Potion',
    nameEn: 'Mana Potion',
    category: 'utility',
    gem: 'emerald',
    pts: 60,
    art: '/roguedraft/assets/card_utilidad_pocion.png',
    lore: "A luminous glass vial filled with distilled alchemical dew gathered from the roots of the World Tree.",
    tactics: "Standard utility cornerstone. Fast and easy to drop on the Green slot.",
    rarity: 'Common'
  },
  {
    id: 'galdrabok_odains',
    norse: 'GALDRABOK ODAINS',
    name: 'Forbidden Grimoire',
    nameEn: 'Forbidden Grimoire',
    category: 'utility',
    gem: 'emerald',
    pts: 90,
    art: '/roguedraft/assets/card_utilidad_grimorio.png',
    lore: "An ancient tome bound in dark hide, containing eldritch formulas from the well of Urðr.",
    tactics: "High-point utility asset (+90 PTS). Excellent for boosting round completion thresholds.",
    rarity: 'Uncommon'
  },
  {
    id: 'timaglas_alheims',
    norse: 'TIMAGLAS ALHEIMS',
    name: 'Cosmic Hourglass',
    nameEn: 'Cosmic Hourglass',
    category: 'utility',
    gem: 'emerald',
    pts: 85,
    art: '/roguedraft/assets/card_utilidad_tiempo.png',
    lore: "Contains glittering sands of expired stars. Grants the perception of dilated time amidst chaos.",
    tactics: "High value (+120 PTS). Grab immediately when it surfaces in the card stream.",
    rarity: 'Rare'
  },
  {
    id: 'lifselixir',
    norse: 'LIFSELIXIR',
    name: 'Life Elixir',
    nameEn: 'Life Elixir',
    category: 'utility',
    gem: 'emerald',
    pts: 80,
    art: '/roguedraft/assets/card_utilidad_elixir_vida.png',
    lore: "A sacred philter brewed by Idunn herself, capable of preserving youthful vitality through eternity.",
    tactics: "A soothing visual presence that anchors your utility drafting strategy.",
    rarity: 'Common'
  },
  {
    id: 'draugalas',
    norse: 'DRAUGALAS',
    name: 'Ghost Lock',
    nameEn: 'Ghost Lock',
    category: 'utility',
    gem: 'emerald',
    pts: 70,
    art: '/roguedraft/assets/card_utilidad_candado_espectral.png',
    lore: "A spectral padlock that binds restless spirits to the ethereal plane.",
    tactics: "Distinctive glowing spectral lock icon guarantees zero hesitation on identification.",
    rarity: 'Uncommon'
  },
  {
    id: 'gjallarhorn',
    norse: 'GJALLARHORN',
    name: 'Heimdall's Gjallarhorn',
    nameEn: 'Heimdall\'s Horn',
    category: 'utility',
    gem: 'emerald',
    pts: 105,
    art: '/roguedraft/assets/card_utilidad_cuerno_abundancia.png',
    lore: "The resounding horn that echoes throughout all nine realms to announce the final gathering.",
    tactics: "High prestige score (+130 PTS). Perfect for triggering high-tier blessing bonuses.",
    rarity: 'Rare'
  },
  {
    id: 'odinsauga',
    norse: 'ODINSAUGA',
    name: 'Eye of Odin Astrolabe',
    nameEn: 'Eye of Odin Astrolabe',
    category: 'utility',
    gem: 'emerald',
    pts: 95,
    art: '/roguedraft/assets/card_utilidad_ojo_odin.png',
    lore: "The eye pledged into Mímir's well in exchange for boundless cosmic omniscience.",
    tactics: "Monumental utility asset awarding +140 PTS. Match it with active combo streaks.",
    rarity: 'Rare'
  },
  {
    id: 'visdomsfjodr',
    norse: 'VISDOMSFJODR',
    name: 'Feather of Wisdom',
    nameEn: 'Feather of Wisdom',
    category: 'utility',
    gem: 'emerald',
    pts: 65,
    art: '/roguedraft/assets/card_utilidad_pluma_sabiduria.png',
    lore: "Plucked from the wing of Huginn as he returned from soaring across the expanse of Midgard.",
    tactics: "Fast recognition card. Keeps utility flow seamless in [UAD] and [UDA] layouts.",
    rarity: 'Common'
  },
  {
    id: 'draupnir',
    norse: 'DRAUPNIR',
    name: 'Draupnir Gold Ring',
    nameEn: 'Draupnir Gold Ring',
    category: 'utility',
    gem: 'emerald',
    pts: 100,
    art: '/roguedraft/assets/card_utilidad_anillo_draupnir.png',
    lore: "The miraculous gold arm-ring from which eight new identical rings drip every ninth night.",
    tactics: "Strong score booster (+85 PTS) that steadily compounds overall draft rank.",
    rarity: 'Uncommon'
  },
  {
    id: 'odrerir',
    norse: 'ODRERIR',
    name: 'Odrerir Mead Cauldron',
    nameEn: 'Odrerir Mead Cauldron',
    category: 'utility',
    gem: 'emerald',
    pts: 85,
    art: '/roguedraft/assets/card_utilidad_caldero_odrerir.jpg',
    lore: "The sacred primordial vat containing the mead of poetry, distilled from Kvasir's divine essence.",
    tactics: "Rich golden-emerald hues make it stand out instantly in cluttered drafts.",
    rarity: 'Uncommon'
  },
  {
    id: 'urlogavefr',
    norse: 'URLOGAVEFR',
    name: 'Loom of the Norns',
    nameEn: 'Loom of the Norns',
    category: 'utility',
    gem: 'emerald',
    pts: 90,
    art: '/roguedraft/assets/card_utilidad_telar_nornas.jpg',
    lore: "The ancient wooden loom upon which Urðr, Verðandi, and Skuld weave the fragile threads of mortal destinies.",
    tactics: "Smooth utility card with high tactile response on Ebony ASMR snap.",
    rarity: 'Common'
  },

  // --- 5 MYTHIC CARDS (Golden Amber) ---
  {
    id: 'brimsteinssprengja',
    norse: 'BRIMSTEINSSPRENGJA',
    name: 'Mythic Brimstone Bomb',
    nameEn: 'Mythic Brimstone Bomb',
    category: 'mythic',
    gem: 'mythic',
    pts: 200,
    art: '/roguedraft/assets/card_especial_bomba.png',
    lore: "A volatile volatile alchemical sphere packed with volatile sulfur and dark solar plasma. Dropping it on regular altar slots causes devastating failure.",
    tactics: "DO NOT PLACE ON MONOLITH! Swipe or flick quickly into the lateral discard zone to diffuse.",
    rarity: 'Mythic'
  },
  {
    id: 'stjornugersemi',
    norse: 'STJORNUGERSEMI',
    name: 'Astral Relic Joker',
    nameEn: 'Astral Relic Joker',
    category: 'mythic',
    gem: 'mythic',
    pts: 180,
    art: '/roguedraft/assets/card_especial_reliquia.jpg',
    lore: "A celestial octahedron forged from supernova crystal. Acts as a universal runic prism.",
    tactics: "Universal Wildcard! Can be placed into ANY slot (Attack, Defense, or Utility) to validate successfully.",
    rarity: 'Mythic'
  },
  {
    id: 'gullvettir',
    norse: 'GULLVETTIR',
    name: 'Treasure Goblin',
    nameEn: 'Loot Goblin',
    category: 'mythic',
    gem: 'mythic',
    pts: 250,
    art: '/roguedraft/assets/card_especial_goblin.jpg',
    lore: "A mischievous dwarven creature carrying a sack of glowing runes stolen from the forge of Brokkr.",
    tactics: "Catch quickly! Drag directly into the Right Mythic Niche to receive colossal bonus points (+250 PTS).",
    rarity: 'Mythic'
  },
  {
    id: 'afturganga',
    norse: 'AFTURGANGA',
    name: 'Astral Specter',
    nameEn: 'Astral Specter',
    category: 'mythic',
    gem: 'mythic',
    pts: 190,
    art: '/roguedraft/assets/card_especial_espectro.jpg',
    lore: "An ethereal apparition drifting between planes. Its phantasmal nature distorts mortal perception.",
    tactics: "Requires sharp visual timing. Swipe into the designated niche before it dissolves from the draft.",
    rarity: 'Mythic'
  },
  {
    id: 'timabrot',
    norse: 'TIMABROT',
    name: 'Time Shard',
    nameEn: 'Time Shard',
    category: 'mythic',
    gem: 'mythic',
    pts: 220,
    art: '/roguedraft/assets/card_especial_tiempo.jpg',
    lore: "A crystallized sliver of frozen time. Shimmers with all moments that ever were and will be.",
    tactics: "Awards substantial score bonuses and temporarily slows conveyor card advance.",
    rarity: 'Mythic'
  },

  // --- 10 SPECIAL CARDS (Arcane Amethyst) ---
  {
    id: 'frostheimr',
    norse: 'FROSTHEIMR',
    name: 'Absolute Zero',
    nameEn: 'Absolute Zero',
    category: 'special',
    gem: 'special',
    pts: 150,
    art: '/roguedraft/assets/card_especial_ceroabsoluto.png',
    lore: "Casts an eternal frost over the drafting conveyor, freezing incoming cards in place for 3 seconds.",
    tactics: "Flick into the Left Special Niche when overwhelmed to grant valuable breathing room.",
    rarity: 'Special'
  },
  {
    id: 'segulstal',
    norse: 'SEGULSTAL',
    name: 'Arcane Magnet',
    nameEn: 'Arcane Magnet',
    category: 'special',
    gem: 'special',
    pts: 140,
    art: '/roguedraft/assets/card_especial_iman.png',
    lore: "Emits a powerful magnetic pulse that attracts matching cards directly to corresponding altar slots.",
    tactics: "Triggers rapid automated auto-completion of pending wave thresholds.",
    rarity: 'Special'
  },
  {
    id: 'idustraumr',
    norse: 'IDUSTRAUMR',
    name: 'Cosmic Vortex',
    nameEn: 'Cosmic Vortex',
    category: 'special',
    gem: 'special',
    pts: 160,
    art: '/roguedraft/assets/card_especial_vortice.png',
    lore: "Opens a swirling singularity at the end of the track, safely consuming hazardous cards.",
    tactics: "Cleanses the card queue during frantic high-speed hazard spikes.",
    rarity: 'Special'
  },
  {
    id: 'speglavidd',
    norse: 'SPEGLAVIDD',
    name: 'Mirror Dimension',
    nameEn: 'Mirror Dimension',
    category: 'special',
    gem: 'special',
    pts: 130,
    art: '/roguedraft/assets/card_especial_espejo.png',
    lore: "Inverts the active layout of the monolith in mid-round, doubling point output for skilled tacticians.",
    tactics: "Activate only when you have full mental mastery over dynamic permutation shifts.",
    rarity: 'Special'
  },
  {
    id: 'thyngdarleysi',
    norse: 'THYNGDARLEYSI',
    name: 'Zero Gravity',
    nameEn: 'Zero Gravity',
    category: 'special',
    gem: 'special',
    pts: 135,
    art: '/roguedraft/assets/card_especial_antigravedad.png',
    lore: "Suspends gravity across the screen, causing cards to float gently with reduced falling velocity.",
    tactics: "Ideal counter against sudden acceleration spikes in advanced rounds.",
    rarity: 'Special'
  },
  {
    id: 'thokumyrkr',
    norse: 'THOKUMYRKR',
    name: 'Dark Fog',
    nameEn: 'Dark Fog',
    category: 'special',
    gem: 'special',
    pts: 140,
    art: '/roguedraft/assets/card_especial_niebla.png',
    lore: "Veils card faces in dark shadow, challenging players to rely purely on corner gemstone colors.",
    tactics: "The ultimate test of gemstone-reading reflexes: Ruby, Sapphire, Emerald.",
    rarity: 'Special'
  },
  {
    id: 'blekslettur',
    norse: 'BLEKSLETTUR',
    name: 'Ink Spill',
    nameEn: 'Ink Spill',
    category: 'special',
    gem: 'special',
    pts: 125,
    art: '/roguedraft/assets/card_especial_tinta.png',
    lore: "Alchemical ink obscures card center illustrations, requiring lightning-fast perimeter reading.",
    tactics: "Focus your eyes on the outer 4 rhombus gemstones for instant placement.",
    rarity: 'Special'
  },
  {
    id: 'heilog_hreinsun',
    norse: 'HEILOG HREINSUN',
    name: 'Sacred Purification',
    nameEn: 'Sacred Purification',
    category: 'special',
    gem: 'special',
    pts: 150,
    art: '/roguedraft/assets/card_especial_purificacion.png',
    lore: "A cleansing wave of holy light that removes all active curses, hazards, and penalties from the board.",
    tactics: "Save for catastrophic moments when lives are critically endangered.",
    rarity: 'Special'
  },
  {
    id: 'elding_aedis',
    norse: 'ELDING AEDIS',
    name: 'Frenzy Lightning',
    nameEn: 'Frenzy Lightning',
    category: 'special',
    gem: 'special',
    pts: 175,
    art: '/roguedraft/assets/card_especial_relampago.png',
    lore: "Electrifies the Frenzy meter, immediately triggering Fever Mode x3 regardless of card count.",
    tactics: "Use to rapidly burst through boss milestones and score targets.",
    rarity: 'Special'
  },
  {
    id: 'kambjon',
    norse: 'KAMBJON',
    name: 'Mystic Chameleon',
    nameEn: 'Mystic Chameleon',
    category: 'special',
    gem: 'special',
    pts: 145,
    art: '/roguedraft/assets/card_especial_camaleon.png',
    lore: "A shape-shifting arcane entity whose elemental affinity continuously cycles between Attack, Defense, and Utility.",
    tactics: "Read the live color shift and drop it into the currently matching altar slot.",
    rarity: 'Special'
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
              <img src="${card.art}" alt="${card.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
              <div class="card-art-fallback" style="display: none;">${getCategoryEmoji(card.category)}</div>
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
    modalVisual.innerHTML = `
      <div class="modal-card-img-wrapper">
        <img src="${card.art}" alt="${card.name}">
      </div>
    `;
  }

  if (modalTag) {
    modalTag.textContent = `${card.category.toUpperCase()} • ${card.gem.toUpperCase()}`;
    modalTag.className = `modal-card-tag badge-${card.category === 'attack' ? 'survival' : (card.category === 'defense' ? 'speed' : (card.category === 'mythic' ? 'featured' : 'global'))}`;
  }

  if (modalTitle) modalTitle.textContent = card.name;
  if (modalNorse) modalNorse.textContent = `« ${card.norse} » — ${card.name}`;
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
      t1PriceEl.textContent = '2.99';
      t2PriceEl.textContent = '4.99';
      t3PriceEl.textContent = '9.99';

      t1TagEl.style.display = 'none';
      t2TagEl.style.display = 'none';
      t3TagEl.style.display = 'none';
    } else if (current === '1') {
      t1PriceEl.textContent = 'OWNED';
      t2PriceEl.textContent = '2.00';
      t3PriceEl.textContent = '7.00';

      t1TagEl.style.display = 'inline-block';
      t1TagEl.textContent = '✓ Active on your account';

      t2TagEl.style.display = 'inline-block';
      t2TagEl.textContent = 'Save $2.99 USD!';

      t3TagEl.style.display = 'inline-block';
      t3TagEl.textContent = 'Save $2.99 USD!';
    } else if (current === '2') {
      t1PriceEl.textContent = 'INCLUDED';
      t2PriceEl.textContent = 'OWNED';
      t3PriceEl.textContent = '5.00';

      t1TagEl.style.display = 'inline-block';
      t1TagEl.textContent = '✓ Included';

      t2TagEl.style.display = 'inline-block';
      t2TagEl.textContent = '✓ Active on your account';

      t3TagEl.style.display = 'inline-block';
      t3TagEl.textContent = 'Save $4.99 USD!';
    } else if (current === '3') {
      t1PriceEl.textContent = 'INCLUDED';
      t2PriceEl.textContent = 'INCLUDED';
      t3PriceEl.textContent = 'OWNED';

      t1TagEl.style.display = 'inline-block';
      t1TagEl.textContent = '✓ Max Rank';
      t2TagEl.style.display = 'inline-block';
      t2TagEl.textContent = '✓ Max Rank';
      t3TagEl.style.display = 'inline-block';
      t3TagEl.textContent = '👑 Active Founder Status';
    }
  });
}

/* ==========================================================================
   7. INTERACTIVE ASMR AUDIO SOUNDBOARD
   ========================================================================== */
function initSoundboard() {
  const tabBtns = document.querySelectorAll('.sb-tab-btn');
  const padsGrid = document.getElementById('soundPadsGrid');

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
    { id: 'foil', name: 'Foil Velvet', sub: 'Default ASMR', freq: 440, type: 'sine', decay: 0.12 },
    { id: 'gravity', name: 'Gravitational Pulse', sub: 'Deep Sub-bass', freq: 160, type: 'triangle', decay: 0.25 },
    { id: 'linen', name: 'Runic Linen', sub: 'Silky Texture', freq: 520, type: 'sawtooth', decay: 0.08 },
    { id: 'quartz', name: 'Quartz Whisper', sub: 'Ethereal Shimmer', freq: 880, type: 'sine', decay: 0.15 },
    { id: 'spark', name: 'Astral Spark', sub: 'Cold Plasma Micro-burst', freq: 1100, type: 'sawtooth', decay: 0.06 },
    { id: 'thor', name: "Thor's Lightning", sub: 'Electrifying Crack', freq: 320, type: 'square', decay: 0.18 },
    { id: 'arpeggio', name: 'Celestial Arpeggio', sub: 'Harmonic Chime', freq: 660, type: 'sine', decay: 0.22 }
  ];

  const SNAP_SOUNDS = [
    { id: 'crystal', name: 'Crystal Arpeggio', sub: 'Pure Bell', freq: 980, type: 'sine', decay: 0.35 },
    { id: 'basalt', name: 'Basalt Forge', sub: 'Solid Stone Impact', freq: 120, type: 'triangle', decay: 0.28 },
    { id: 'click', name: 'Tactical Snap', sub: 'Default Physical', freq: 720, type: 'square', decay: 0.05 },
    { id: 'fanfare', name: 'Sovereign Fanfare', sub: 'Triumphal Chime', freq: 550, type: 'triangle', decay: 0.4 },
    { id: 'arcane_bell', name: 'Arcane Bell', sub: '432 Hz Sacred Bronze', freq: 820, type: 'sine', decay: 0.5 },
    { id: 'ebony', name: 'Ebony ASMR', sub: '100% Anti-fatigue Wood', freq: 280, type: 'sine', decay: 0.12 },
    { id: 'valhalla', name: 'Bells of Valhalla', sub: 'Mystic Carillon', freq: 1200, type: 'sine', decay: 0.6 }
  ];

  let currentTab = 'drag';

  function playSynthesizedSound(sound) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = sound.type || 'sine';
    osc.frequency.setValueAtTime(sound.freq, ctx.currentTime);

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
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}
