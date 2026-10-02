import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'es' | 'en';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string | string[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  es: {
    // Nav
    'nav.infrastructure': 'Infraestructura',
    'nav.compute': 'Cómputo',
    'nav.heptagon': 'Heptágono',
    'nav.proof': 'Pruebas',
    'nav.access': 'Acceso',
    'nav.team': 'Equipo',
    'nav.dataRoom': 'Data Room',
    'nav.requestAccess': 'Solicitar acceso',

    // Footer
    'footer.tagline': 'Energía propia, cómputo propio, inteligencia soberana.',
    'footer.status': 'Sistema operativo',
    'footer.copyright': '© 2026 IGNUM Protocol · IGNUM Bajío Energy SAPI de CV',
    'footer.location': 'Parque Industrial Cuadritos, Celaya, Guanajuato, México',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',

    // Home
    'home.meta.title': 'IGNUM Protocol — Energía propia. Cómputo propio. Inteligencia soberana.',
    'home.hero.badge': 'Operativo · Cuadritos, MX',
    'home.hero.title': 'La cadena completa de inteligencia opera hoy en México.',
    'home.hero.subtitle': '7.3 MW a ~$0.05/kWh + inteligencia en producción continua.',
    'home.hero.power': '7.3 MW cogeneración',
    'home.hero.compute': 'H200/Blackwell en despliegue',
    'home.hero.latency': '<2 ms a Querétaro',
    'home.cta.access': 'Acceso institucional',
    'home.anchor.headline': 'IGNUM ya opera en México la cadena completa —energía propia, cómputo propio e inteligencia aplicada— y la prueba está en infraestructura activa y negocios reales, no en una promesa de capacidad futura.',
    'home.stack.title': 'Sovereign Stack',
    'home.stack.subtitle': 'Cinco capas. Hoy y siguiente paso.',
    'home.stack.today': 'Hoy',
    'home.stack.next': 'Siguiente',
    'home.stack.energy.title': '1. Energía',
    'home.stack.energy.today': 'Hoy: 7.3 MW operativos.',
    'home.stack.energy.next': 'Siguiente: escalar bajo demanda anclada.',
    'home.stack.silicon.title': '2. Silicio',
    'home.stack.silicon.today': 'Hoy: nodo RTX 5090 24/7; H200/Blackwell en despliegue.',
    'home.stack.silicon.next': 'Siguiente: hall alimentado directo de cogeneración.',
    'home.stack.models.title': '3. Modelos propios',
    'home.stack.models.today': 'Hoy: modelos locales en producción continua.',
    'home.stack.models.next': 'Siguiente: afinar sobre datos verificados de TrueAsset.',
    'home.stack.orchestration.title': '4. Orquestación',
    'home.stack.orchestration.today': 'Hoy: Heptágono 7 modelos + síntesis.',
    'home.stack.orchestration.next': 'Siguiente: capa de veredictos licenciable.',
    'home.stack.agents.title': '5. Agentes operando negocios',
    'home.stack.agents.today': 'Hoy: 6 agentes 24/7, KIDO.',
    'home.stack.agents.next': 'Siguiente: replicar el patrón en terceros.',
    'home.operating.title': 'Operando hoy',
    'home.operating.energy.title': 'Energía base propia',
    'home.operating.energy.value': '7.3 MW',
    'home.operating.energy.desc': 'Cogeneración operativa, gasoducto privado 25 km, subestación 20 MVA.',
    'home.operating.heptagon.title': 'Heptágono + agentes',
    'home.operating.heptagon.value': '6 agentes 24/7',
    'home.operating.heptagon.desc': '7 modelos frontera, síntesis cruzada, inferencia local y servicios frontera.',
    'home.operating.trueasset.title': 'TrueAsset',
    'home.operating.trueasset.value': '5,571 veredictos',
    'home.operating.trueasset.desc': '540+ activos bajo análisis verificable en trueasset.ai.',

    // Infrastructure
    'infra.title': 'Infraestructura industrial con energía base propia, verificable.',
    'infra.subtitle': '44 ha Celaya, gasoducto 25 km, 20 MVA, diseñado para escalar hacia 100 MW.',
    'infra.location.title': 'Ubicación',
    'infra.location.value': 'Parque Industrial Cuadritos, Celaya, Gto.',
    'infra.power.title': 'Energía',
    'infra.power.value': '7.3 MW cogeneración (carga plena 7.5 MW)',
    'infra.fuel.title': 'Combustible',
    'infra.fuel.value': 'Gasoducto privado 25 km',
    'infra.substation.title': 'Subestación',
    'infra.substation.value': '20 MVA (≈16 MW útiles)',
    'infra.water.title': 'Agua',
    'infra.water.value': '3 pozos de agua con derechos',
    'infra.land.title': 'Terreno',
    'infra.land.value': '44 ha',
    'infra.scale.title': 'Escala',
    'infra.scale.value': 'Diseñado para escalar hacia 100 MW',
    'infra.cost.title': 'Costo energético',
    'infra.cost.value': '~$0.05/kWh',
    'infra.latency.title': 'Latencias medidas',
    'infra.latency.qro': 'Querétaro',
    'infra.latency.qro.value': '<2 ms',
    'infra.latency.mex': 'Ciudad de México',
    'infra.latency.mex.value': '<8 ms',
    'infra.latency.dal': 'Dallas',
    'infra.latency.dal.value': '<28 ms',
    'infra.corridor.title': 'Corredor nearshoring',
    'infra.corridor.desc': 'Celaya–Querétaro–SLP: punto de conexión para carga de IA cerca de la frontera sur de EE. UU.',

    // Compute
    'compute.title': 'Cómputo propio bajo jurisdicción mexicana.',
    'compute.subtitle': 'H200 SXM5 + RTX 6000 Blackwell en despliegue; nodo RTX 5090 operando; custodia de datos bajo ley mexicana, MLAT.',
    'compute.deploying.title': 'En despliegue',
    'compute.deploying.h200': '4× NVIDIA H200 SXM5 141 GB',
    'compute.deploying.blackwell': '2× NVIDIA RTX 6000 Blackwell',
    'compute.live.title': 'Operando 24/7',
    'compute.live.5090': 'Nodo RTX 5090 con modelos locales',
    'compute.jurisdiction.title': 'Jurisdicción',
    'compute.jurisdiction.desc': 'Custodia de datos bajo ley mexicana. Cooperación internacional solo vía MLAT.',
    'compute.use.title': 'Casos de uso',
    'compute.use.colocation': 'Colocación de alta densidad',
    'compute.use.inference': 'Inferencia local y frontera',
    'compute.use.residency': 'Residencia de datos en México',
    'compute.use.finance': 'Financiamiento bajo contrato',

    // Heptagon
    'heptagon.title': 'Siete modelos frontera, una síntesis verificable.',
    'heptagon.subtitle': 'Orquestación + síntesis cruzada, 6 agentes 24/7, inferencia local y frontera.',
    'heptagon.pattern.title': 'Patrón de orquestación',
    'heptagon.pattern.desc': 'Heptágono convoca 7 inteligencias, genera veredictos individuales y una síntesis final. No es un único modelo; es una capa de verificación.',
    'heptagon.models.title': 'Modelos en convergencia',
    'heptagon.models.note': 'Combina modelos propios locales y servicios frontera externos.',
    'heptagon.agents.title': 'Agentes en producción',
    'heptagon.agents.desc': '6 agentes operan negocios reales 24/7: señales, vigilía, operaciones KIDO y más.',
    'heptagon.verdicts.title': 'Veredictos verificables',
    'heptagon.verdicts.desc': 'La salida no es una opinión: es un veredicto con rastro, reproducible y auditable.',

    // Proof
    'proof.title': 'Inteligencia aplicada a negocios reales.',
    'proof.subtitle': 'TrueAsset 5,571 veredictos/540+ activos · KIDO 4 centros, $49.5M MXN operado con esta inteligencia.',
    'proof.trueasset.title': 'TrueAsset',
    'proof.trueasset.desc': 'Red de veredictos verificables para activos digitales. 5,571 veredictos emitidos sobre 540+ activos.',
    'proof.trueasset.link': 'Ver en trueasset.ai →',
    'proof.kido.title': 'KIDO Kids Company',
    'proof.kido.desc': '4 centros operativos. $49.5M MXN administrados con agentes IGNUM: reservas, cierres, pagos, vigía.',
    'proof.kido.note': 'Caso de negocio real que consume inteligencia soberana todos los días.',
    'proof.cta': 'Solicitar acceso institucional',

    // Access
    'access.title': 'Acceso institucional.',
    'access.subtitle': 'Materiales de diligencia bajo NDA; capacidad en el corredor Bajío para entidades que requieren custodia de datos en México.',
    'access.form.name': 'Nombre completo *',
    'access.form.company': 'Empresa / Organización',
    'access.form.country': 'País *',
    'access.form.email': 'Email directo *',
    'access.form.use': '¿Para qué lo usarías? *',
    'access.form.submit': 'Enviar solicitud de acceso →',
    'access.form.note': 'Revisión en 48h. No todos son aceptados.',
    'access.sent.title': 'Solicitud recibida.',
    'access.sent.desc': 'Tu solicitud está en revisión. Si eres aceptado, recibirás instrucciones de acceso directamente.',
    'access.links.team': 'Equipo',
    'access.links.dataRoom': 'Data Room',

    // Team
    'team.title': 'La ejecución importa más que la tesis.',
    'team.subtitle': 'IGNUM combina infraestructura física, disciplina operativa y despliegue de capital por fases bajo un modelo de gobernanza pensado para escalar.',

    // DataRoom
    'dataRoom.title': 'Materiales de diligencia privados',
    'dataRoom.subtitle': 'Compartimos materiales detallados a través de un proceso controlado una vez confirmados el fit y la confidencialidad.',

    // Shared
    'shared.back': '← IGNUM Protocol',
    'shared.access': 'Solicitar acceso',
  },
  en: {
    // Nav
    'nav.infrastructure': 'Infrastructure',
    'nav.compute': 'Compute',
    'nav.heptagon': 'Heptagon',
    'nav.proof': 'Proof',
    'nav.access': 'Access',
    'nav.team': 'Team',
    'nav.dataRoom': 'Data Room',
    'nav.requestAccess': 'Request access',

    // Footer
    'footer.tagline': 'Own power. Own compute. Sovereign intelligence.',
    'footer.status': 'System online',
    'footer.copyright': '© 2026 IGNUM Protocol · IGNUM Bajío Energy SAPI de CV',
    'footer.location': 'Parque Industrial Cuadritos, Celaya, Guanajuato, México',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',

    // Home
    'home.meta.title': 'IGNUM Protocol — Own power. Own compute. Sovereign intelligence.',
    'home.hero.badge': 'Operational · Cuadritos, MX',
    'home.hero.title': 'The full intelligence chain operates in Mexico today.',
    'home.hero.subtitle': '7.3 MW at ~$0.05/kWh + intelligence in continuous production.',
    'home.hero.power': '7.3 MW cogeneration',
    'home.hero.compute': 'H200/Blackwell in deployment',
    'home.hero.latency': '<2 ms to Querétaro',
    'home.cta.access': 'Institutional access',
    'home.anchor.headline': 'IGNUM already operates the full chain in Mexico —own power, own compute, applied intelligence— and the proof is live infrastructure and real businesses, not a promise of future capacity.',
    'home.stack.title': 'Sovereign Stack',
    'home.stack.subtitle': 'Five layers. Today and next step.',
    'home.stack.today': 'Today',
    'home.stack.next': 'Next',
    'home.stack.energy.title': '1. Energy',
    'home.stack.energy.today': 'Today: 7.3 MW operational.',
    'home.stack.energy.next': 'Next: scale under anchored demand.',
    'home.stack.silicon.title': '2. Silicon',
    'home.stack.silicon.today': 'Today: RTX 5090 node 24/7; H200/Blackwell in deployment.',
    'home.stack.silicon.next': 'Next: hall fed directly by cogeneration.',
    'home.stack.models.title': '3. Own models',
    'home.stack.models.today': 'Today: local models in continuous production.',
    'home.stack.models.next': 'Next: fine-tune on verified TrueAsset data.',
    'home.stack.orchestration.title': '4. Orchestration',
    'home.stack.orchestration.today': 'Today: Heptagon 7 models + synthesis.',
    'home.stack.orchestration.next': 'Next: licensable verdict layer.',
    'home.stack.agents.title': '5. Agents running businesses',
    'home.stack.agents.today': 'Today: 6 agents 24/7, KIDO.',
    'home.stack.agents.next': 'Next: replicate the pattern in third parties.',
    'home.operating.title': 'Operating today',
    'home.operating.energy.title': 'Own baseload power',
    'home.operating.energy.value': '7.3 MW',
    'home.operating.energy.desc': 'Operational cogeneration, 25 km private gas pipeline, 20 MVA substation.',
    'home.operating.heptagon.title': 'Heptagon + agents',
    'home.operating.heptagon.value': '6 agents 24/7',
    'home.operating.heptagon.desc': '7 frontier models, cross-synthesis, local inference and frontier services.',
    'home.operating.trueasset.title': 'TrueAsset',
    'home.operating.trueasset.value': '5,571 verdicts',
    'home.operating.trueasset.desc': '540+ assets under verifiable analysis at trueasset.ai.',

    // Infrastructure
    'infra.title': 'Industrial infrastructure with verifiable private baseload power.',
    'infra.subtitle': '44 ha Celaya, 25 km gas pipeline, 20 MVA, designed to scale toward 100 MW.',
    'infra.location.title': 'Location',
    'infra.location.value': 'Parque Industrial Cuadritos, Celaya, Gto.',
    'infra.power.title': 'Power',
    'infra.power.value': '7.3 MW cogeneration (7.5 MW full load)',
    'infra.fuel.title': 'Fuel',
    'infra.fuel.value': '25 km private gas pipeline',
    'infra.substation.title': 'Substation',
    'infra.substation.value': '20 MVA (≈16 MW usable)',
    'infra.water.title': 'Water',
    'infra.water.value': '3 water wells with rights',
    'infra.land.title': 'Land',
    'infra.land.value': '44 ha',
    'infra.scale.title': 'Scale',
    'infra.scale.value': 'Designed to scale toward 100 MW',
    'infra.cost.title': 'Energy cost',
    'infra.cost.value': '~$0.05/kWh',
    'infra.latency.title': 'Measured latencies',
    'infra.latency.qro': 'Querétaro',
    'infra.latency.qro.value': '<2 ms',
    'infra.latency.mex': 'Mexico City',
    'infra.latency.mex.value': '<8 ms',
    'infra.latency.dal': 'Dallas',
    'infra.latency.dal.value': '<28 ms',
    'infra.corridor.title': 'Nearshoring corridor',
    'infra.corridor.desc': 'Celaya–Querétaro–SLP: connection point for AI load near the U.S. southern border.',

    // Compute
    'compute.title': 'Own compute under Mexican jurisdiction.',
    'compute.subtitle': 'H200 SXM5 + RTX 6000 Blackwell in deployment; RTX 5090 node operating; data custody under Mexican law, MLAT.',
    'compute.deploying.title': 'In deployment',
    'compute.deploying.h200': '4× NVIDIA H200 SXM5 141 GB',
    'compute.deploying.blackwell': '2× NVIDIA RTX 6000 Blackwell',
    'compute.live.title': 'Operating 24/7',
    'compute.live.5090': 'RTX 5090 node with local models',
    'compute.jurisdiction.title': 'Jurisdiction',
    'compute.jurisdiction.desc': 'Data custody under Mexican law. International cooperation only via MLAT.',
    'compute.use.title': 'Use cases',
    'compute.use.colocation': 'High-density colocation',
    'compute.use.inference': 'Local and frontier inference',
    'compute.use.residency': 'Data residency in Mexico',
    'compute.use.finance': 'Contract-backed financing',

    // Heptagon
    'heptagon.title': 'Seven frontier models, one verifiable synthesis.',
    'heptagon.subtitle': 'Orchestration + cross-synthesis, 6 agents 24/7, local and frontier inference.',
    'heptagon.pattern.title': 'Orchestration pattern',
    'heptagon.pattern.desc': 'Heptagon convenes 7 intelligences, generates individual verdicts, and a final synthesis. It is not a single model; it is a verification layer.',
    'heptagon.models.title': 'Models in convergence',
    'heptagon.models.note': 'Combines local own models and external frontier services.',
    'heptagon.agents.title': 'Agents in production',
    'heptagon.agents.desc': '6 agents run real businesses 24/7: signals, watch, KIDO operations, and more.',
    'heptagon.verdicts.title': 'Verifiable verdicts',
    'heptagon.verdicts.desc': 'The output is not an opinion: it is a verdict with trace, reproducible and auditable.',

    // Proof
    'proof.title': 'Applied intelligence in real businesses.',
    'proof.subtitle': 'TrueAsset 5,571 verdicts/540+ assets · KIDO 4 centers, $49.5M MXN operated with this intelligence.',
    'proof.trueasset.title': 'TrueAsset',
    'proof.trueasset.desc': 'Verifiable verdict network for digital assets. 5,571 verdicts emitted across 540+ assets.',
    'proof.trueasset.link': 'See trueasset.ai →',
    'proof.kido.title': 'KIDO Kids Company',
    'proof.kido.desc': '4 operating centers. $49.5M MXN managed with IGNUM agents: reservations, closings, payments, watch.',
    'proof.kido.note': 'Real business case consuming sovereign intelligence every day.',
    'proof.cta': 'Request institutional access',

    // Access
    'access.title': 'Institutional access.',
    'access.subtitle': 'Diligence materials under NDA; capacity in the Bajío corridor for entities requiring data custody in Mexico.',
    'access.form.name': 'Full name *',
    'access.form.company': 'Company / Organization',
    'access.form.country': 'Country *',
    'access.form.email': 'Direct email *',
    'access.form.use': 'What would you use it for? *',
    'access.form.submit': 'Send access request →',
    'access.form.note': 'Reviewed in 48h. Not everyone is accepted.',
    'access.sent.title': 'Request received.',
    'access.sent.desc': 'Your request is under review. If accepted, you will receive access instructions directly.',
    'access.links.team': 'Team',
    'access.links.dataRoom': 'Data Room',

    // Team
    'team.title': 'Execution matters more than thesis.',
    'team.subtitle': 'IGNUM combines physical infrastructure, operating discipline, and staged capital deployment under a governance model built to scale.',

    // DataRoom
    'dataRoom.title': 'Private diligence materials',
    'dataRoom.subtitle': 'We share detailed materials through a controlled process once fit and confidentiality are confirmed.',

    // Shared
    'shared.back': '← IGNUM Protocol',
    'shared.access': 'Request access',
  },
} as const;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');

  const t = (key: string): string | string[] => {
    const value = translations[lang][key as keyof typeof translations.es];
    return value ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}

export { translations };
