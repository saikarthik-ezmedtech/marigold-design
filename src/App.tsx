import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Accessibility,
  AlignLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Contrast,
  EyeOff,
  ExternalLink,
  MousePointer2,
  Mail,
  MapPin,
  Menu,
  Pause,
  Phone,
  Pilcrow,
  RotateCcw,
  ShieldCheck,
  Shrink,
  Sparkles,
  Type,
  X,
} from 'lucide-react';

type BaseRoutePath =
  | '/'
  | '/about-us'
  | '/services'
  | '/medical-supplies'
  | '/resources'
  | '/insurance-accepted'
  | '/contact-us';

type RoutePath = BaseRoutePath | `/services/${string}`;

type NavItem = {
  path: BaseRoutePath;
  label: string;
  subtitle: string;
};

type ServiceCard = {
  slug: string;
  title: string;
  description: string;
  image: string;
  intro: string;
  details: string[];
  supportNote: string;
  category: string;
};

type SupplyItem = {
  title: string;
  description: string;
  image: string;
};

const navItems: NavItem[] = [
  { path: '/', label: 'Home', subtitle: 'Welcome Page' },
  { path: '/about-us', label: 'About Us', subtitle: 'Who We Are' },
  { path: '/services', label: 'Services', subtitle: 'We Offer' },
  { path: '/medical-supplies', label: 'Medical Supplies', subtitle: 'Our Products' },
  { path: '/resources', label: 'Resources', subtitle: 'Useful Links' },
  { path: '/contact-us', label: 'Contact Us', subtitle: 'Keep in Touch' },
];

const serviceCards: ServiceCard[] = [
  {
    slug: '4-prescription-plan',
    category: 'Affordability',
    intro:
      'Budget-friendly prescription support for commonly prescribed generic medications when eligible options are available.',
    title: '$4 Prescription Plan',
    description:
      'Affordable prescription planning, medication review, and practical pharmacist support that helps day-to-day care stay on track.',
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Cost-conscious options for eligible low-cost medications',
      'Clear pickup and refill expectations',
      'Friendly guidance when insurance does not fit the need',
    ],
    supportNote:
      'Best for patients who want simpler pricing conversations and help understanding lower-cost options.',
  },
  {
    slug: 'medication-synchronization',
    category: 'Adherence',
    intro:
      'A coordinated refill rhythm that helps patients line up ongoing prescriptions for fewer pharmacy trips and easier monthly planning.',
    title: 'Medication Synchronization',
    description:
      'Medication alignment, refill planning, and organized pharmacist support that reduces the stress of managing multiple medicines.',
    image:
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=80',
    details: [
      'One planned refill date for eligible ongoing prescriptions',
      'Ongoing communication when timing changes are needed',
      'Useful for caregivers, busy households, and long-term routines',
    ],
    supportNote:
      'Health Mart materials describe medication synchronization as a way to align maintenance medications and create a more organized monthly process.',
  },
  {
    slug: 'pharmacy-refill-prescription',
    category: 'Prescription Support',
    intro:
      'Fast refill support for existing prescriptions, with local follow-through when patients need status updates or help navigating timing.',
    title: 'Refill Prescription',
    description:
      'Refill coordination, pharmacist communication, and steady support for ongoing prescriptions and recurring medication needs.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Refill request intake and readiness support',
      'Help resolving timing questions before medications run out',
      'A smoother process for repeat monthly prescriptions',
    ],
    supportNote:
      'Designed for patients who want quick refill follow-through without losing the personal connection of a neighborhood pharmacy.',
  },
  {
    slug: 'seasonal-vaccinations',
    category: 'Preventive Care',
    intro:
      'Convenient access to pharmacist-administered seasonal and routine immunization support based on eligibility and availability.',
    title: 'Seasonal Vaccinations',
    description:
      'Vaccination planning, family scheduling support, and community-centered preventive care for patients across age groups.',
    image:
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Seasonal vaccine access when offered onsite',
      'Preventive care reminders and scheduling support',
      'Helpful for families, caregivers, and adults staying current on recommendations',
    ],
    supportNote:
      'CDC adult vaccine guidance informs how we frame preventive vaccination support and seasonal care conversations.',
  },
  {
    slug: 'cbd-oil-and-other-herbals',
    category: 'Wellness',
    intro:
      'Thoughtful over-the-counter wellness support for patients who want to ask informed questions about CBD products and herbal options.',
    title: 'CBD Oil and Other Herbals',
    description:
      'General guidance on selected wellness products, product categories, and safe medication-aware questions to bring to the counter.',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Product selection support based on goals and preferences',
      'Counseling on medication interaction questions to raise with a clinician',
      'A calmer approach to choosing from crowded supplement shelves',
    ],
    supportNote:
      'Focused on education and informed product selection rather than making disease-treatment claims.',
  },
  {
    slug: 'compounding',
    category: 'Custom Medications',
    intro:
      'Patient-specific compounding support for situations where a standard dosage form, flavor, strength, or ingredient setup may not be the right fit.',
    title: 'Compounding',
    description:
      'Customized medication preparation support for patients who need a different strength, dosage form, or ingredient approach.',
    image:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Support when a patient needs a customized strength or dosage form',
      'Helpful in some cases involving allergies, swallowing difficulty, or pediatric needs',
      'Pharmacy coordination around patient-specific prescriptions',
    ],
    supportNote:
      'FDA consumer guidance explains that compounding may be appropriate when a patient cannot be treated with an FDA-approved medication in its usual form.',
  },
  {
    slug: 'diabetes-specialty-care-center',
    category: 'Chronic Care',
    intro:
      'Practical pharmacy support for diabetes routines, including medication organization, testing supply coordination, and everyday adherence questions.',
    title: 'Diabetes Specialty Care Center',
    description:
      'Support for medication routines, diabetic supplies, and clearer day-to-day coordination for patients managing diabetes.',
    image:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Coordination around diabetic supplies and medication pickups',
      'Organization help for recurring care routines',
      'Useful for patients managing multiple diabetes-related items each month',
    ],
    supportNote:
      'Built around consistency, easier pickups, and better organization for ongoing care.',
  },
  {
    slug: 'durable-medical-equipment',
    category: 'Medical Supplies',
    intro:
      'Access support for selected home-use health equipment that can make recovery, mobility, and routine care more manageable.',
    title: 'Durable Medical Equipment',
    description:
      'Home-health equipment support for comfort, mobility, and safer day-to-day care at home.',
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Common home-care and mobility-related equipment support',
      'Help understanding product categories and next steps',
      'Useful for caregivers planning safer routines at home',
    ],
    supportNote:
      'A good fit for patients and families looking to combine pharmacy support with practical home-care essentials.',
  },
  {
    slug: 'health-screenings',
    category: 'Preventive Care',
    intro:
      'Community-focused health screening support that can encourage earlier conversations, routine monitoring, and more informed follow-up.',
    title: 'Health Screenings',
    description:
      'Accessible screening support that helps patients stay aware of important wellness markers and preventive follow-up needs.',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Convenient screening opportunities when available',
      'Encourages proactive wellness conversations',
      'Useful for patients building steadier preventive routines',
    ],
    supportNote:
      'Screening services are framed as supportive wellness touchpoints, not substitutes for diagnosis or emergency care.',
  },
  {
    slug: 'pharmacy-free-delivery-services',
    category: 'Convenience',
    intro:
      'Neighborhood delivery that makes it easier for patients, caregivers, and busy households to stay on time with their medications.',
    title: 'Free Delivery Services',
    description:
      'Local delivery coordination for prescriptions and essentials, designed to reduce missed pickups and simplify care routines.',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Helpful for patients with transportation, schedule, or caregiving challenges',
      'Supports continuity when pickups are difficult',
      'A practical extension of neighborhood pharmacy care',
    ],
    supportNote:
      'Many Health Mart community pharmacies position delivery as a convenience service that improves ongoing medication access.',
  },
  {
    slug: 'pharmacy-contact-us',
    category: 'Pharmacist Access',
    intro:
      'Easy access to the pharmacy team for general medication questions, service guidance, and everyday pharmacy support.',
    title: 'Free Consultations',
    description:
      'One-on-one pharmacist access for questions about services, routines, medication organization, and next steps.',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80',
    details: [
      'General pharmacy guidance and patient support conversations',
      'A welcoming place to ask routine medication questions',
      'Useful before starting a transfer, packaging, or sync plan',
    ],
    supportNote:
      'Best for patients who value a local pharmacy relationship and want answers from a real team, not a call center.',
  },
  {
    slug: 'generic-and-brand-name-drugs',
    category: 'Prescription Access',
    intro:
      'Prescription fulfillment support across both brand-name and generic medication needs, with clear communication around availability and options.',
    title: 'Generic and Brand Name Drugs',
    description:
      'Medication access support across common generic and brand-name prescriptions with local pharmacist guidance.',
    image:
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Support comparing brand and generic availability',
      'Clearer conversations around routine prescription options',
      'Helpful for patients balancing cost, familiarity, and continuity',
    ],
    supportNote:
      'Focused on access, clarity, and making prescription choices easier to understand.',
  },
  {
    slug: 'medication-therapy-management',
    category: 'Clinical Support',
    intro:
      'Medication therapy management support for patients who take multiple medicines and want a clearer, safer view of how their regimen fits together.',
    title: 'Medication Therapy Management',
    description:
      'Personal medication reviews that help patients understand what they take, how it fits together, and what questions to ask next.',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Medication list review and organization support',
      'Helps surface timing, duplication, or adherence questions',
      'Especially useful for patients on multiple long-term medications',
    ],
    supportNote:
      'Often works well alongside medication synchronization and multi-dose packaging for more organized routines.',
  },
  {
    slug: 'multi-dose-packaging',
    category: 'Adherence',
    intro:
      'Organized packaging that groups medications by date and time to make everyday routines easier for patients and caregivers.',
    title: 'Multi-Dose Packaging',
    description:
      'Time-of-day packaging support that simplifies medication organization and helps reduce confusion at home.',
    image:
      'https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Helpful for patients taking multiple medications at different times',
      'Supports caregiver oversight and daily routine consistency',
      'Pairs naturally with synchronization for smoother monthly care',
    ],
    supportNote:
      'A strong option for families who want clearer medication organization without building their own sorting system.',
  },
  {
    slug: 'next-day-special-order',
    category: 'Access',
    intro:
      'Special-order coordination for medications or products that may not be stocked routinely but can often be arranged quickly.',
    title: 'Next-Day Special Order',
    description:
      'Fast special-order support for selected medications and pharmacy products when local shelf availability is limited.',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Useful when a product is not part of standard daily stock',
      'Clear communication around timing and next steps',
      'Helps patients avoid calling multiple locations to check availability',
    ],
    supportNote:
      'Built around local follow-through and keeping patients informed while the order is in process.',
  },
  {
    slug: 'otc-drugs-and-1-dollar-dollar-wise-items',
    category: 'Everyday Essentials',
    intro:
      'A practical front-of-store selection of over-the-counter health products and budget-friendly everyday items.',
    title: 'OTC Drugs and Dollar Wise Items',
    description:
      'Affordable over-the-counter products and everyday essentials chosen for real household needs.',
    image:
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Convenient access to common self-care and household health items',
      'Helpful for quick add-on purchases alongside prescriptions',
      'Supports everyday wellness without overcomplicating the visit',
    ],
    supportNote:
      'A neighborhood-pharmacy convenience layer that complements prescription care.',
  },
  {
    slug: 'price-matching-or-insurance-billing',
    category: 'Affordability',
    intro:
      'Support for insurance billing and pricing questions so patients can better understand what they are paying for and why.',
    title: 'Price Matching and Insurance Billing',
    description:
      'Practical help with prescription pricing, billing coordination, and cost-related pharmacy questions.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Insurance-billing support for covered prescriptions when applicable',
      'Pricing clarity before pickup whenever possible',
      'Useful for patients comparing options and managing recurring costs',
    ],
    supportNote:
      'Created for households that need clearer pharmacy cost conversations, not surprises at the counter.',
  },
  {
    slug: 'pharmacy-transfer-prescription',
    category: 'Prescription Support',
    intro:
      'Prescription transfer support for patients who want to move their medications to a more personal, more reliable neighborhood pharmacy.',
    title: 'Transfer Prescriptions',
    description:
      'A simpler transfer process for patients moving prescriptions from another pharmacy into a more local care experience.',
    image:
      'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Pharmacy-to-pharmacy transfer coordination',
      'Helpful for patients switching to local service or delivery support',
      'A smooth starting point for ongoing Marigold care',
    ],
    supportNote:
      'Ideal for new patients who want their pharmacy experience to feel more responsive and community-centered.',
  },
  {
    slug: 'veterinary-drugs',
    category: 'Specialty Support',
    intro:
      'Medication coordination support for pets when prescriptions and pharmacy follow-through matter just as much at home.',
    title: 'Veterinary Drugs',
    description:
      'Pet medication support with practical coordination for families managing veterinary prescriptions.',
    image:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Support for selected veterinary prescription needs',
      'Helpful for pet owners balancing both family and pet medications',
      'Local communication when timing and pickup details matter',
    ],
    supportNote:
      'A useful extension of neighborhood pharmacy care for households that include pets.',
  },
];

const supplyItems: SupplyItem[] = [
  {
    title: 'Bathroom Safety',
    description:
      'Helpful products that support safer daily routines in the bathroom, including stability, comfort, and easier movement at home.',
    image:
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Diabetic Patients',
    description:
      'Everyday diabetic care supplies and routine support items that help patients stay organized with testing and ongoing self-care.',
    image:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Pain Management',
    description:
      'Select comfort and pain-support essentials for patients managing soreness, recovery routines, and day-to-day mobility needs.',
    image:
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Ambulatory Aids',
    description:
      'Mobility-support products designed to help patients move more confidently and safely throughout their day.',
    image:
      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Everyday Health Needs',
    description:
      'Practical home-health items and routine wellness essentials chosen around real household needs and convenience.',
    image:
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'And More',
    description:
      'If you are looking for a specific supply or equipment category, our pharmacy team can help guide you to the right next step.',
    image:
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=80',
  },
];

const resourceLinks = [
  {
    category: 'Guide',
    title: 'U.S. Food and Drug Administration',
    description: 'Federal medication guidance, safety information, labeling help, and consumer drug education.',
    href: 'https://www.fda.gov',
    cta: 'Read guide',
  },
  {
    category: 'Guide',
    title: 'Safe Medication',
    description: 'Patient-friendly safe-use tips for common medicines, OTC products, storage, and daily routines.',
    href: 'https://www.safemedication.com',
    cta: 'Visit resource',
  },
  {
    category: 'Resource',
    title: 'Institute for Safe Medication Practices',
    description: 'Medication safety education and practical prevention resources for patients and caregivers.',
    href: 'https://www.ismp.org',
    cta: 'Learn more',
  },
];

type ServiceMenuGlyphKey =
  | 'pill'
  | 'sync'
  | 'delivery'
  | 'syringe'
  | 'flask'
  | 'clipboard'
  | 'package'
  | 'shield'
  | 'billing'
  | 'leaf'
  | 'heart'
  | 'scan'
  | 'basket'
  | 'chat'
  | 'paw';

type ServiceMenuItem = {
  slug: string;
  note: string;
  glyph: ServiceMenuGlyphKey;
};

type ServiceMenuGroup = {
  title: string;
  description: string;
  items: ServiceMenuItem[];
};

const serviceMenuGroups: ServiceMenuGroup[] = [
  {
    title: 'Prescription access',
    description: 'Refills, transfers, cost clarity, and medication access made easier.',
    items: [
      { slug: '4-prescription-plan', note: 'Cost-conscious support for eligible low-cost medications.', glyph: 'billing' },
      { slug: 'pharmacy-refill-prescription', note: 'Quick refill follow-through for recurring prescriptions.', glyph: 'pill' },
      { slug: 'pharmacy-transfer-prescription', note: 'Move your prescriptions into local Marigold care.', glyph: 'delivery' },
    ],
  },
  {
    title: 'Medication support',
    description: 'Tools that keep long-term medication routines organized and easier to manage.',
    items: [
      { slug: 'medication-synchronization', note: 'Align maintenance refills into one monthly rhythm.', glyph: 'sync' },
      { slug: 'medication-therapy-management', note: 'Medication review support for patients taking multiple medicines.', glyph: 'clipboard' },
      { slug: 'multi-dose-packaging', note: 'Time-of-day packaging that simplifies daily routines.', glyph: 'package' },
    ],
  },
  {
    title: 'Prevention & wellness',
    description: 'Convenience, immunizations, screenings, and guidance for everyday wellness.',
    items: [
      { slug: 'seasonal-vaccinations', note: 'Seasonal and routine immunization support when available.', glyph: 'syringe' },
      { slug: 'health-screenings', note: 'Screening touchpoints that encourage proactive care.', glyph: 'scan' },
      { slug: 'pharmacy-free-delivery-services', note: 'Local delivery for prescriptions and everyday essentials.', glyph: 'delivery' },
    ],
  },
  {
    title: 'Home & specialty care',
    description: 'Practical items and specialty support that help families manage care at home.',
    items: [
      { slug: 'durable-medical-equipment', note: 'Home-health equipment and mobility support.', glyph: 'shield' },
      { slug: 'otc-drugs-and-1-dollar-dollar-wise-items', note: 'Over-the-counter essentials and budget-friendly items.', glyph: 'basket' },
      { slug: 'price-matching-or-insurance-billing', note: 'Pricing clarity and insurance-billing support.', glyph: 'billing' },
    ],
  },
];

const resourceHighlights = [
  {
    category: 'Guide',
    title: 'Medication safety and consumer drug guidance',
    description: 'Trusted federal guidance on prescription use, labels, and safe habits at home.',
    href: 'https://www.fda.gov/drugs',
    image:
      'https://images.unsplash.com/photo-1580281657527-47f249e8fca0?auto=format&fit=crop&w=1600&q=80',
    cta: 'Read guide',
  },
  {
    category: 'Guide',
    title: 'Safe medicine practices for everyday routines',
    description: 'Patient-friendly help for OTC medicines, storage, and everyday safe use.',
    href: 'https://www.safemedication.com',
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    cta: 'Visit resource',
  },
  {
    category: 'Consumer health',
    title: 'Over-the-counter product information',
    description: 'Clear product information for common over-the-counter wellness needs.',
    href: 'https://www.chpa.org',
    image:
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80',
    cta: 'Explore all',
  },
  {
    category: 'Toolkit',
    title: 'Pill lookup and drug information',
    description: 'Look up medications, verify details, or identify a pill with a trusted index.',
    href: 'https://www.rxlist.com',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    cta: 'Open tool',
  },
  {
    category: 'Resource',
    title: 'Medication safety and error prevention',
    description: 'Practical safety resources for patients and caregivers to help prevent mistakes.',
    href: 'https://www.ismp.org',
    image:
      'https://images.unsplash.com/photo-1576765607924-3f7b8e0d90ad?auto=format&fit=crop&w=1200&q=80',
    cta: 'Learn more',
  },
];

const homeFaqs = [
  {
    question: 'Do you accept insurance?',
    answer:
      'Yes. We accept most insurance plans and help patients understand coverage in a straightforward way so pickup feels less stressful.',
  },
  {
    question: 'Can you transfer prescriptions from another pharmacy?',
    answer:
      'Absolutely. Our team can help move prescriptions into Marigold care so refills, delivery, and future support are easier to manage.',
  },
  {
    question: 'Do you offer free delivery?',
    answer:
      'Yes. Free local delivery is available for many patients, making it easier to stay on track when you cannot make it to the pharmacy.',
  },
  {
    question: 'Can you help with medication synchronization?',
    answer:
      'Yes. Medication synchronization can align ongoing refills into one rhythm, which makes monthly medication management more manageable.',
  },
  {
    question: 'Do you provide vaccinations and screenings?',
    answer:
      'We support seasonal vaccinations and health screening touchpoints when available, helping patients keep prevention part of the routine.',
  },
  {
    question: 'Can I ask questions about over-the-counter products?',
    answer:
      'Of course. We are happy to talk through everyday health products and help you choose a practical option for your needs.',
  },
];

const homeTestimonials = [
  {
    quote:
      'They helped us understand our coverage and made delivery feel simple. It is the kind of pharmacy support families remember.',
    label: 'Neighborhood patient',
  },
  {
    quote:
      'Medication synchronization and follow-through have made a real difference for our household. Everything feels easier to manage.',
    label: 'Kissimmee family',
  },
  {
    quote:
      'They took the time to explain our options without rushing us, and that made a stressful prescription issue feel much easier.',
    label: 'Caregiver',
  },
  {
    quote:
      'Delivery has been dependable, and the reminders help us stay organized when life gets busy. It feels personal every time.',
    label: 'Local parent',
  },
];

const hours = [
  ['Monday - Friday', '9:00 AM - 6:00 PM'],
  ['Saturday', 'Closed'],
  ['Sunday', 'Closed'],
];

const phoneNumber = '407-201-4640';
const emailAddress = 'hello@marigoldpharmacy.com';
const streetAddress = '4792 Marigold Ave';
const cityAddress = 'Kissimmee, FL 34758';

type AccessibilitySettings = {
  oversizedWidget: boolean;
  highContrast: boolean;
  highlightLinks: boolean;
  biggerText: boolean;
  textSpacing: boolean;
  pauseAnimations: boolean;
  hideImages: boolean;
  dyslexiaFriendly: boolean;
  bigCursor: boolean;
  tooltips: boolean;
  lineHeight: boolean;
  textAlign: boolean;
  lowSaturation: boolean;
};

const defaultAccessibilitySettings: AccessibilitySettings = {
  oversizedWidget: false,
  highContrast: false,
  highlightLinks: false,
  biggerText: false,
  textSpacing: false,
  pauseAnimations: false,
  hideImages: false,
  dyslexiaFriendly: false,
  bigCursor: false,
  tooltips: false,
  lineHeight: false,
  textAlign: false,
  lowSaturation: false,
};

function getCurrentRoute(pathname: string): RoutePath {
  const path = pathname.replace(/\/+$/, '') || '/';
  const knownPaths = navItems.map((item) => item.path);
  if (knownPaths.includes(path as BaseRoutePath)) {
    return path as BaseRoutePath;
  }

  if (path === '/insurance-accepted') {
    return '/insurance-accepted';
  }

  if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '');
    if (serviceCards.some((item) => item.slug === slug)) {
      return `/services/${slug}`;
    }
  }

  return '/';
}

function getCurrentService(route: RoutePath) {
  if (!route.startsWith('/services/')) {
    return null;
  }

  const slug = route.replace('/services/', '');
  return serviceCards.find((item) => item.slug === slug) ?? null;
}

function getServiceMenuCard(slug: string) {
  return serviceCards.find((item) => item.slug === slug) ?? null;
}

function BrandLockup({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`inline-flex items-center ${compact ? 'gap-1.5' : 'gap-3.5'} text-left will-change-transform`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -6, scale: 0.98 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'left center' }}
    >
      <img
        src="/assets/marigold-brand.png"
        alt="Marigold Pharmacy"
        className="h-15 w-15 shrink-0 object-contain sm:h-[4.4rem] sm:w-[4.4rem]"
      />
      <span className="leading-none">
        <span
          className={`block font-heading text-[1.72rem] font-extrabold tracking-[-0.055em] sm:text-[1.92rem] ${
            dark ? 'text-white' : 'text-[var(--teal)]'
          }`}
        >
          Marigold
        </span>
        <span
          className={`mt-1 block font-ui text-[0.76rem] font-semibold uppercase tracking-[0.3em] sm:text-[0.8rem] ${
            dark ? 'text-white/72' : 'text-[var(--green)]'
          }`}
        >
          Pharmacy
        </span>
      </span>
    </motion.div>
  );
}

function SplashScreen({ open }: { open: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const petals = [
    { rotate: -66, x: 0, y: -160, delay: 0.1 },
    { rotate: -20, x: 110, y: -110, delay: 0.14 },
    { rotate: 22, x: 160, y: 0, delay: 0.18 },
    { rotate: 68, x: 110, y: 110, delay: 0.22 },
    { rotate: 114, x: 0, y: 160, delay: 0.26 },
    { rotate: 160, x: -110, y: 110, delay: 0.3 },
    { rotate: 202, x: -160, y: 0, delay: 0.34 },
    { rotate: 248, x: -110, y: -110, delay: 0.38 },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="marigold-splash"
          className="fixed inset-0 z-[220] overflow-hidden bg-[linear-gradient(135deg,#256f68_0%,#2f8179_50%,#338880_100%)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.15 : 0.5, ease: 'easeOut' } }}
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,180,0,0.18),transparent_18%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_20%)]" />
          </div>

          <motion.div
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8, y: 18 }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: [0.82, 1.08, 1],
                    y: 0,
                  }
            }
            transition={{
              duration: prefersReducedMotion ? 0.01 : 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="relative flex items-center justify-center"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotate: [0, -4, 4, 0],
                    }
              }
              transition={{
                duration: prefersReducedMotion ? 0.01 : 1.8,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="absolute inset-[-3rem] rounded-full bg-[radial-gradient(circle,rgba(244,180,0,0.22),transparent_72%)] blur-2xl"
                animate={prefersReducedMotion ? undefined : { scale: [0.92, 1.04, 0.98] }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 2.2, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
              />
              {petals.map((petal, index) => (
                <motion.div
                  key={index}
                  className="absolute left-1/2 top-1/2 h-24 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#ffd44d,#f4b400)] shadow-[0_18px_30px_rgba(244,180,0,0.2)]"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${petal.rotate}deg) translateY(${petal.y}px)`,
                    opacity: 0.96,
                  }}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.18 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 0.96, scale: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.65,
                    delay: prefersReducedMotion ? 0 : petal.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
              <img
                src="/assets/marigold-brand.png"
                alt="Marigold Pharmacy"
                className="relative h-56 w-56 object-contain drop-shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:h-72 sm:w-72 lg:h-[24rem] lg:w-[24rem]"
              />
            </motion.div>

            <motion.p
              className="mt-6 font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.05em] text-white"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              Marigold Pharmacy
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ServiceMenuIcon({ glyph }: { glyph: ServiceMenuGlyphKey }) {
  switch (glyph) {
    case 'pill':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M8.6 4.2a5.7 5.7 0 0 0-4 9.7l5.5 5.5a5.7 5.7 0 0 0 8.1-8.1L12.7 5.8A5.7 5.7 0 0 0 8.6 4.2Z"
            fill="currentColor"
            opacity="0.22"
          />
          <path d="M9 6.2 17.8 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'sync':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M6 8.2A8 8 0 0 1 18 7.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path d="M18.3 4.6v3.3h-3.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path
            d="M18 15.8A8 8 0 0 1 6 16.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path d="M5.7 19.4v-3.3H9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'delivery':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M4 8.3h9.4c1.2 0 2.3.7 2.8 1.8l1.3 2.9H20a1.8 1.8 0 0 1 1.8 1.8v2.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 8.3v7.9h2.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8.1" cy="18.2" r="1.7" fill="currentColor" opacity="0.22" />
          <circle cx="17.8" cy="18.2" r="1.7" fill="currentColor" opacity="0.22" />
        </svg>
      );
    case 'syringe':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M7.2 16.8 16.7 7.3M13.8 6.1l4.1 4.1M6 18l1.4 1.4m0 0 1.7-1.7m-1.7 1.7-1.2 1.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15.9 4.7 19.3 8.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M10.7 13.2 12.8 15.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'flask':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M9.1 3.5h5.8M10.7 3.5v4.7L5.8 18a2 2 0 0 0 1.8 2.9h8.8a2 2 0 0 0 1.8-2.9l-4.9-9.8V3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8.2 15.1h7.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.3" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <rect x="6.4" y="4.7" width="11.2" height="16.2" rx="2.2" fill="currentColor" opacity="0.22" />
          <path
            d="M9 4.6h6m-3.3-1.6h.6a1.7 1.7 0 0 1 1.7 1.7V6H7.7V4.7A1.7 1.7 0 0 1 9.4 3h.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8.4 10.2h7.2M8.4 13.4h7.2M8.4 16.6H13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'package':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M4.8 8.2 12 4l7.2 4.2-7.2 4.2L4.8 8.2Z"
            fill="currentColor"
            opacity="0.22"
          />
          <path
            d="M4.8 8.2v7.8L12 20l7.2-4V8.2M12 12.4v7.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M12 3.6 19 6.2v5.4c0 4.2-2.7 7.4-7 8.8-4.3-1.4-7-4.6-7-8.8V6.2L12 3.6Z"
            fill="currentColor"
            opacity="0.22"
          />
          <path d="M12 7.1v9.4M7.8 11.8h8.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'billing':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path d="M6.4 4.2h8.8l2.4 2.4v13.2H6.4z" fill="currentColor" opacity="0.22" />
          <path d="M14.8 4.2v2.4h2.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.1 10.1h5.8M9.1 13h5.8M9.1 15.9h3.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M18.7 5.3C12.1 4.4 7.4 7.8 6 12.2c-1.1 3.5.4 6.1 3.7 6.1 4.8 0 8.9-4.6 9-13Z"
            fill="currentColor"
            opacity="0.22"
          />
          <path d="M7.7 16.4c2.3-3.8 5.3-6.4 9.1-7.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M12 20.2c-5.2-3.6-8.2-6.8-8.2-10.2a4.7 4.7 0 0 1 8.2-3.1A4.7 4.7 0 0 1 20.2 10c0 3.4-3 6.6-8.2 10.2Z"
            fill="currentColor"
            opacity="0.22"
          />
          <path d="M7.1 11.8h2.7l1.1-2.1 1.3 4 1-1.9h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'scan':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <circle cx="12" cy="12" r="7.3" fill="currentColor" opacity="0.18" />
          <path d="M8.4 12h7.2M12 8.4v7.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'basket':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M6.1 10h11.8l-1 8a1.8 1.8 0 0 1-1.8 1.6H8.9A1.8 1.8 0 0 1 7.1 18l-1-8Z"
            fill="currentColor"
            opacity="0.22"
          />
          <path d="M9 10a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M8.2 13.4h7.6M8.2 16h4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'chat':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M5.7 6.7h12.6a2 2 0 0 1 2 2v5.2a2 2 0 0 1-2 2H11l-4.3 3v-3H5.7a2 2 0 0 1-2-2V8.7a2 2 0 0 1 2-2Z"
            fill="currentColor"
            opacity="0.22"
          />
          <path d="M8.2 10.5h7.6M8.2 13.5h4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'paw':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <circle cx="8.1" cy="8.3" r="1.3" fill="currentColor" />
          <circle cx="11.1" cy="6.7" r="1.2" fill="currentColor" />
          <circle cx="14.1" cy="8.3" r="1.3" fill="currentColor" />
          <circle cx="12" cy="11.9" r="1.35" fill="currentColor" />
          <path
            d="M12 14.1c-2.5 0-4.6 1.8-4.6 3.9 0 1.4 1.1 2.3 2.4 2.3 1.1 0 1.8-.5 2.2-1.2.4.7 1.1 1.2 2.2 1.2 1.3 0 2.4-.9 2.4-2.3 0-2.1-2.1-3.9-4.6-3.9Z"
            fill="currentColor"
            opacity="0.22"
          />
        </svg>
      );
    default:
      return null;
  }
}

function SmoothCursor({ disabled }: { disabled: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const currentRef = useRef({ x: 0, y: 0 });
  const trailCurrentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled || prefersReducedMotion) {
      setIsActive(false);
      setIsVisible(false);
      document.body.classList.remove('smooth-cursor-active');
      return;
    }

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateCapability = () => {
      const enabled = mediaQuery.matches;
      setIsActive(enabled);
      setIsVisible(false);
      document.body.classList.toggle('smooth-cursor-active', enabled);
    };

    updateCapability();
    mediaQuery.addEventListener('change', updateCapability);

    return () => {
      mediaQuery.removeEventListener('change', updateCapability);
      document.body.classList.remove('smooth-cursor-active');
    };
  }, [disabled, prefersReducedMotion]);

  useEffect(() => {
    if (!isActive) {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.22;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.22;
      trailCurrentRef.current.x += (targetRef.current.x - trailCurrentRef.current.x) * 0.14;
      trailCurrentRef.current.y += (targetRef.current.y - trailCurrentRef.current.y) * 0.14;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailCurrentRef.current.x}px, ${trailCurrentRef.current.y}px, 0)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
        return;
      }

      const nextPoint = { x: event.clientX, y: event.clientY };

      if (!isVisible) {
        currentRef.current = nextPoint;
        trailCurrentRef.current = nextPoint;
      }

      targetRef.current = nextPoint;
      setIsVisible(true);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    frameRef.current = window.requestAnimationFrame(animate);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, [isActive, isVisible]);

  if (!isActive) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[210] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div ref={trailRef} className="smooth-cursor-trail" />
      <div ref={cursorRef} className="smooth-cursor-core" />
    </div>
  );
}

function App() {
  const [route, setRoute] = useState<RoutePath>(() => getCurrentRoute(window.location.pathname));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const isSplashVisible = false;
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(defaultAccessibilitySettings);
  const [accessibilityWidgetSide, setAccessibilityWidgetSide] = useState<'left' | 'right'>('right');
  const [isAccessibilityWidgetHidden, setIsAccessibilityWidgetHidden] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute(window.location.pathname));
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const selector = 'main a, main button, main input, main textarea, main select, main [role="button"]';
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!accessibilitySettings.tooltips) {
      nodes.forEach((node) => node.removeAttribute('data-a11y-tooltip'));
      return;
    }

    nodes.forEach((node) => {
      const label =
        node.getAttribute('aria-label') ||
        node.getAttribute('title') ||
        node.textContent?.replace(/\s+/g, ' ').trim() ||
        '';

      if (label) {
        node.setAttribute('data-a11y-tooltip', label.slice(0, 80));
      }
    });

    return () => {
      nodes.forEach((node) => node.removeAttribute('data-a11y-tooltip'));
    };
  }, [accessibilitySettings.tooltips]);

  const navigate = (path: RoutePath) => {
    if (path === route) {
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState({}, '', path);
    setRoute(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentService = getCurrentService(route);

  return (
    <main
      className={`min-h-screen overflow-x-hidden bg-[var(--cream)] text-[var(--charcoal)] ${
        accessibilitySettings.oversizedWidget ? 'accessibility-oversized-widget' : ''
      } ${accessibilitySettings.biggerText ? 'accessibility-bigger-text' : ''} ${
        accessibilitySettings.highContrast ? 'accessibility-high-contrast' : ''
      } ${accessibilitySettings.highlightLinks ? 'accessibility-highlight-links' : ''} ${
        accessibilitySettings.textSpacing ? 'accessibility-text-spacing' : ''
      } ${accessibilitySettings.pauseAnimations ? 'accessibility-pause-motion' : ''} ${
        accessibilitySettings.hideImages ? 'accessibility-hide-images' : ''
      } ${accessibilitySettings.dyslexiaFriendly ? 'accessibility-dyslexia-friendly' : ''} ${
        accessibilitySettings.bigCursor ? 'accessibility-big-cursor' : ''
      } ${accessibilitySettings.tooltips ? 'accessibility-tooltips' : ''} ${
        accessibilitySettings.lineHeight ? 'accessibility-line-height' : ''
      } ${accessibilitySettings.textAlign ? 'accessibility-text-align' : ''} ${
        accessibilitySettings.lowSaturation ? 'accessibility-low-saturation' : ''
      }`}
    >
      <SplashScreen open={isSplashVisible} />
      <SmoothCursor disabled={accessibilitySettings.bigCursor || accessibilitySettings.pauseAnimations} />

      <SiteHeader
        route={route}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMenu={() => setIsMobileMenuOpen((value) => !value)}
        onNavigate={navigate}
      />
      <div aria-hidden="true" className="h-[5.6rem] sm:h-[6.1rem]" />

      {route === '/' ? <HomePage onNavigate={navigate} /> : null}
      {route === '/about-us' ? <AboutPage onNavigate={navigate} /> : null}
      {route === '/services' ? <ServicesPage onNavigate={navigate} /> : null}
      {currentService ? <ServiceDetailPage service={currentService} onNavigate={navigate} /> : null}
      {route === '/medical-supplies' ? <MedicalSuppliesPage /> : null}
      {route === '/resources' ? <ResourcesPage /> : null}
      {route === '/insurance-accepted' ? <InsuranceAcceptedPage onNavigate={navigate} /> : null}
      {route === '/contact-us' ? <ContactPage /> : null}
      {!['/', '/about-us', '/services', '/medical-supplies', '/resources', '/insurance-accepted', '/contact-us'].includes(route) && !currentService ? <NotFoundPage onNavigate={navigate} /> : null}

      <Footer route={route} onNavigate={navigate} />

      <AccessibilityWidget
        isOpen={isAccessibilityOpen}
        settings={accessibilitySettings}
        side={accessibilityWidgetSide}
        isHidden={isAccessibilityWidgetHidden}
        isVisible={!(route === '/' && !isScrollVisible)}
        onToggleOpen={() => setIsAccessibilityOpen((value) => !value)}
        onToggleSetting={(key) =>
          setAccessibilitySettings((current) => ({
            ...current,
            [key]: !current[key],
          }))
        }
        onMoveWidget={() => setAccessibilityWidgetSide((value) => (value === 'right' ? 'left' : 'right'))}
        onToggleHidden={() => {
          setIsAccessibilityWidgetHidden((value) => !value);
          setIsAccessibilityOpen(false);
        }}
        onReset={() => setAccessibilitySettings(defaultAccessibilitySettings)}
      />

      {isScrollVisible ? (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-4 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-[var(--teal)] text-white shadow-[0_18px_34px_rgba(15,118,110,0.32)] transition hover:-translate-y-0.5 hover:bg-[#0b655f] sm:right-6"
        >
          <ArrowUp size={18} />
        </button>
      ) : null}
    </main>
  );
}

function SiteHeader({
  route,
  isMobileMenuOpen,
  onToggleMenu,
  onNavigate,
}: {
  route: RoutePath;
  isMobileMenuOpen: boolean;
  onToggleMenu: () => void;
  onNavigate: (path: RoutePath) => void;
}) {
  const isHeroHeaderRoute = route === '/' || route === '/about-us';
  const [closeDropdown, setCloseDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (path: RoutePath | string) => {
    setCloseDropdown(true);
    onNavigate(path as RoutePath);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300 ${
        isHeroHeaderRoute
          ? `text-white ${isScrolled ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(31,111,104,0.96)] shadow-[0_10px_30px_rgba(15,23,42,0.12)]' : 'border-transparent bg-[rgba(31,111,104,0.96)] shadow-none'}`
          : `border-[rgba(15,118,110,0.08)] bg-[rgba(247,244,235,0.92)] text-[var(--charcoal)] ${isScrolled ? 'shadow-[0_10px_30px_rgba(15,23,42,0.08)]' : 'shadow-[0_10px_30px_rgba(15,23,42,0.04)]'}`
      }`}
    >
      <div className="bg-[var(--gold)] text-[var(--charcoal)]">
        <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-1.5 text-center sm:px-6 sm:py-2">
          <p className="text-[0.62rem] font-medium leading-[1.3] sm:leading-none sm:text-[0.72rem] lg:text-[0.84rem]">
            Proudly serving Kissimmee with personalized pharmacy care and free local delivery.
          </p>
          <span className="hidden h-4 w-px bg-[rgba(26,65,85,0.35)] sm:block" aria-hidden="true" />
          <a
            href={`tel:${phoneNumber.replace(/-/g, '')}`}
            className="inline-flex items-center justify-center gap-1 whitespace-nowrap text-[0.65rem] font-semibold leading-none transition hover:opacity-80 sm:text-[0.72rem] lg:text-[0.84rem]"
          >
            <Phone size={12} />
            Call {phoneNumber}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <button type="button" onClick={() => handleNavigate('/')} className="shrink-0">
          <BrandLockup dark={isHeroHeaderRoute} />
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive = route === item.path || (route.startsWith('/services/') && item.path === '/services');
            const isContactItem = item.path === '/contact-us';

            if (item.path === '/services') {
              return (
                <div key={item.path} className="group relative" onPointerLeave={() => setCloseDropdown(false)}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.path)}
                    className={`inline-flex items-center gap-1 border-b-2 px-5 py-3 text-center font-heading text-[1rem] font-semibold tracking-[-0.01em] transition-colors ${
                      isActive
                        ? isHeroHeaderRoute
                          ? 'border-[var(--gold)] text-white'
                          : 'border-[var(--gold)] text-[var(--charcoal)]'
                        : isHeroHeaderRoute
                          ? 'border-transparent text-white hover:text-white/88'
                          : 'border-transparent text-[var(--charcoal)] hover:text-[var(--teal)]'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 group-hover:rotate-180 ${
                        isHeroHeaderRoute ? 'text-white/78' : isActive ? 'text-[var(--teal)]' : 'text-[var(--teal)]/72'
                      }`}
                    />
                  </button>

                  <div className={`absolute left-1/2 top-full z-50 w-[min(94vw,72rem)] -translate-x-1/2 pt-4 transition duration-200 ${closeDropdown ? 'pointer-events-none invisible opacity-0' : 'pointer-events-none invisible opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100'}`}>
                    <div className="max-h-[min(82vh,46rem)] overflow-y-auto overflow-hidden rounded-[2rem] border border-slate-200 bg-white text-left shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
                      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
                        <div>
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--teal)]">
                            Explore Marigold services
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[var(--slate)]">
                            All the pharmacy support you see on the site, grouped for fast navigation.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNavigate('/services')}
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--charcoal)] shadow-[0_14px_30px_rgba(244,180,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffd04d]"
                        >
                          View all services
                          <ArrowRight size={15} />
                        </button>
                      </div>

                      <div className="grid gap-0 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
                        {serviceMenuGroups.map((group) => (
                          <div key={group.title} className="border-r border-slate-100 p-4 last:border-r-0">
                            <div className="px-2 pb-4">
                              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--charcoal)]">{group.title}</p>
                              <p className="mt-2 text-sm leading-6 text-[var(--slate)]">{group.description}</p>
                            </div>

                            <div className="space-y-1">
                              {group.items.map((entry) => {
                                const card = getServiceMenuCard(entry.slug);

                                if (!card) {
                                  return null;
                                }

                                return (
                                  <button
                                    key={entry.slug}
                                    type="button"
                                    onClick={() => handleNavigate(`/services/${entry.slug}`)}
                                    className="flex w-full items-start gap-3 rounded-[1.1rem] px-3 py-3 text-left transition hover:bg-[rgba(15,118,110,0.04)]"
                                  >
                                    <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center text-[var(--teal)]">
                                      <ServiceMenuIcon glyph={entry.glyph} />
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block text-sm font-semibold leading-5 text-[var(--charcoal)]">{card.title}</span>
                                      <span className="mt-1 block text-xs leading-5 text-[var(--slate)]">{entry.note}</span>
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavigate(item.path)}
                className={`border-b-2 px-5 py-3 text-center font-heading text-[1rem] font-semibold tracking-[-0.01em] transition-colors ${
                  isContactItem
                    ? isActive
                      ? isHeroHeaderRoute
                        ? 'border-[var(--gold)] text-white'
                        : 'border-[var(--gold)] text-[var(--charcoal)]'
                      : isHeroHeaderRoute
                        ? 'border-transparent text-white hover:text-white/88'
                        : 'border-transparent text-[var(--charcoal)] hover:text-[var(--teal)]'
                    : isActive
                      ? isHeroHeaderRoute
                        ? 'border-[var(--gold)] text-white'
                        : 'border-[var(--gold)] text-[var(--charcoal)]'
                      : isHeroHeaderRoute
                        ? 'border-transparent text-white hover:text-white/88'
                        : 'border-transparent text-[var(--charcoal)] hover:text-[var(--teal)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_8px_16px_rgba(0,0,0,0.08)] lg:hidden ${
            isHeroHeaderRoute ? 'border-white/18 bg-white/10 text-white backdrop-blur-md' : 'border-slate-200 bg-white text-[var(--teal)]'
          }`}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="absolute inset-x-0 top-full border-t border-[rgba(15,118,110,0.1)] bg-[#f7f4eb] px-4 py-4 sm:px-6 lg:hidden shadow-[0_20px_40px_rgba(15,23,42,0.15)]">
          <div className="space-y-3">
            {navItems.map((item) => {
              const isActive = route === item.path || (route.startsWith('/services/') && item.path === '/services');
              const isContactItem = item.path === '/contact-us';

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavigate(item.path)}
                  className={`block w-full px-4 py-3 text-center font-heading text-[1.1rem] font-medium tracking-[-0.01em] ${
                    isContactItem
                      ? 'text-[var(--gold)]'
                      : isActive
                        ? 'text-[var(--teal)]'
                        : 'text-[var(--charcoal)]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

    </header>
  );
}

function HomePage({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(-1);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [isContactMapLoaded, setIsContactMapLoaded] = useState(true);
  const testimonialsTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = testimonialsTrackRef.current;
    if (!track) return;

    let scrollInterval: ReturnType<typeof setInterval>;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 20) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }, 3000);
    };

    startAutoScroll();

    const stopAutoScroll = () => clearInterval(scrollInterval);
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);

    return () => {
      clearInterval(scrollInterval);
      track.removeEventListener('mouseenter', stopAutoScroll);
      track.removeEventListener('mouseleave', startAutoScroll);
    };
  }, []);

  const visibleFaqs = showAllFaqs ? homeFaqs : homeFaqs.slice(0, 4);
  const featuredResources = resourceHighlights.slice(0, 3);
  const featuredResourceThemes = [
    {
      shell: 'bg-[#f6f2eb] text-[var(--charcoal)] border-[rgba(15,118,110,0.08)]',
      eyebrow: 'text-[var(--teal)] bg-white/80',
      body: 'text-[var(--slate)]',
      cta: 'text-[var(--teal)]',
      iconWrap: 'bg-[rgba(15,118,110,0.1)] text-[var(--teal)]',
      accent: 'bg-[radial-gradient(circle_at_100%_100%,rgba(244,180,0,0.28),transparent_42%)]',
      Icon: ShieldCheck,
    },
    {
      shell: 'bg-[#f58f6e] text-[var(--charcoal)] border-[rgba(245,143,110,0.22)]',
      eyebrow: 'text-[var(--charcoal)] bg-white/24',
      body: 'text-[rgba(31,41,55,0.82)]',
      cta: 'text-[var(--charcoal)]',
      iconWrap: 'bg-white/72 text-[#d76f4b]',
      accent: 'bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.22),transparent_38%)]',
      Icon: Sparkles,
    },
    {
      shell: 'bg-[#165860] text-white border-[rgba(22,88,96,0.3)]',
      eyebrow: 'text-white bg-white/12',
      body: 'text-white/82',
      cta: 'text-white',
      iconWrap: 'bg-white/14 text-white',
      accent: 'bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.14),transparent_38%)]',
      Icon: ExternalLink,
    },
  ] as const;

  const scrollTestimonials = (direction: number) => {
    const track = testimonialsTrackRef.current;
    if (!track) {
      return;
    }

    track.scrollBy({
      left: direction * Math.max(track.clientWidth * 0.82, 320),
      behavior: 'smooth',
    });
  };

  return (
    <>
      <section className="relative flex min-h-[88svh] items-center overflow-hidden bg-[#1f6f68] text-white">
        <HomeHeroBackdrop />
        <div className="mx-auto grid min-h-[88svh] max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:px-8 lg:py-20">
          <div className="relative z-10 flex max-w-[39rem] flex-col justify-center self-center lg:pl-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#fff5cc]">Personalized care in Kissimmee</p>
            <h1 className="font-ui text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.92] tracking-[-0.08em] text-white">
              <span className="mt-5 block whitespace-nowrap">Your Health.</span>
              <span className="block whitespace-nowrap text-[rgba(255,245,216,0.98)]">Our Priority.</span>
            </h1>
            <p className="mt-8 max-w-[35rem] text-[1.08rem] leading-8 text-white/80 sm:text-[1.18rem]">
              Trusted neighborhood pharmacy providing personalized care, prescription services, medication management,
              free delivery, immunizations, and wellness support for the Kissimmee community.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate('/contact-us')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-[var(--charcoal)] shadow-[0_18px_40px_rgba(244,180,0,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#ffd04d]"
              >
                Refill prescription
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/12 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(10,51,47,0.22)] ring-1 ring-white/24 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/18"
              >
                Transfer prescription
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/72">
              {['Free Delivery', 'Prescription Transfers', 'Immunizations', 'Health Mart Partner'].map((item) => (
                <div key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#f4c94b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[28rem] sm:min-h-[33rem] lg:min-h-[40rem] lg:translate-x-[70px]">
            <HomeHeroArtwork />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#fffaf2] py-14 sm:py-16 lg:py-18">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--teal)]">How it works</p>
            <h2 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.7rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-[var(--charcoal)]">
              Getting pharmacy support should feel effortless.
            </h2>
          </div>

          <div className="mt-8 grid gap-6 border-t border-[rgba(15,118,110,0.12)] pt-6 md:grid-cols-3">
            {[
              {
                moment: 'Right away',
                title: 'Send your prescription',
                body: 'Ask your provider to send it to Marigold Pharmacy, or contact us and we can help guide the transfer.',
                icon: (
                  <div className="relative h-20 w-16 rounded-[1.6rem] bg-[#123f67] shadow-[inset_0_0_0_1px_rgba(255,250,242,0.08)]">
                    <div className="absolute left-1/2 top-3 h-2 w-8 -translate-x-1/2 rounded-full bg-[#f7efe1]" />
                    <div className="absolute bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border-2 border-[#f7d55b] bg-[#fff4dc]" />
                    <div className="absolute bottom-7 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#ef6b4a]" />
                  </div>
                ),
              },
              {
                moment: 'Same day',
                title: 'We prepare and coordinate',
                body: 'Our team reviews the order, checks coverage when needed, and reaches out with pickup or delivery details.',
                icon: (
                  <div className="relative h-20 w-20 rounded-[2rem] bg-[#e3d6ca]">
                    <div className="absolute inset-x-3 top-4 h-11 rounded-[1.2rem] bg-[#f8f0e5] shadow-[0_8px_18px_rgba(15,23,42,0.06)]" />
                    <div className="absolute left-1/2 top-8 h-1.5 w-9 -translate-x-1/2 rounded-full bg-[#123f67]" />
                    <div className="absolute left-1/2 top-[2.8rem] h-1.5 w-6 -translate-x-1/2 rounded-full bg-[#123f67]" />
                    <div className="absolute -top-1 left-1/2 h-5 w-9 -translate-x-1/2 rounded-b-[1rem] border-[3px] border-[#a67b71] border-t-0" />
                  </div>
                ),
              },
              {
                moment: 'Ongoing care',
                title: 'Stay on track',
                body: 'We help with refills, reminders, medication questions, and everyday follow-through so your routine stays steady.',
                icon: (
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[rgba(239,73,49,0.12)]" />
                    <svg viewBox="0 0 54 51" className="h-14 w-14 fill-[#ef4931]" aria-hidden="true">
                      <path d="M29.3647 50.3883C29.5753 50.2751 29.7763 50.1448 29.9654 49.9988L30.3303 49.7113C30.3479 49.6998 30.3629 49.6875 30.3771 49.6761C30.7804 49.3762 31.1653 49.0527 31.5299 48.7071L40.0367 40.2392L46.8175 33.4904C56.1847 24.1695 55.8755 11.1028 48.8633 4.2177C46.5171 1.91123 43.3158 -0.247508 38.6039 0.0250821C31.1394 0.452433 27.0008 6.5479 27.0008 6.5479C27.0008 6.5479 22.8605 0.452433 15.396 0.0233235C10.685 -0.249267 7.4837 1.91123 5.13836 4.2177C-1.87559 11.1028 -2.18477 24.1695 7.18071 33.4904L13.9632 40.2436L22.4674 48.7115C22.5027 48.7466 22.5443 48.7818 22.5884 48.8258C22.8561 49.0755 23.2359 49.3885 23.6714 49.7139C23.6776 49.7209 23.6864 49.7227 23.6917 49.7297L24.0424 49.9988C24.2333 50.1421 24.4338 50.2714 24.6396 50.3857C25.3577 50.7855 26.1661 50.9969 26.9888 51C27.8116 51.003 28.6216 50.7977 29.3427 50.4033C29.3515 50.3963 29.3603 50.3945 29.3692 50.3857L29.3647 50.3883Z" />
                    </svg>
                  </div>
                ),
              },
            ].map((item) => (
              <article key={item.title} className="px-1 py-2 sm:px-2">
                <div className="grid gap-4 sm:block">
                  <div className="flex items-start justify-between gap-4 sm:block">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <p className="pt-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--teal)] sm:pt-5">
                      {item.moment}
                    </p>
                  </div>
                  <h3 className="pt-0 font-heading text-[clamp(1.65rem,2.6vw,2.15rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--charcoal)] sm:pt-2">
                    {item.title}
                  </h3>
                  <p className="pt-3 text-sm leading-7 text-[var(--slate)] sm:text-[15px]">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden min-h-[50vh]">
        <div className="pointer-events-none absolute left-[-2rem] top-[-2rem] z-0 h-[16rem] w-[16rem] opacity-100 transform rotate-[25deg]">
          <CircularTabletShape className="h-full w-full text-[var(--gold)] drop-shadow-[0_20px_40px_rgba(244,180,0,0.3)]" />
        </div>
        <div className="container-shell relative z-10">
          <div className="mb-5 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">Pharmacy services</p>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--charcoal)] sm:text-5xl">
              This is our pharmacy services section
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--slate)]">
              These are Marigold&apos;s core pharmacy services, shown here clearly so you can move quickly to the support you
              actually need.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {serviceCards.slice(0, 4).map((card) => (
              <button
                key={card.slug}
                type="button"
                onClick={() => onNavigate(`/services/${card.slug}`)}
                className="group relative flex min-h-[18.75rem] flex-col overflow-hidden rounded-[1.6rem] bg-[#0c1c25] text-left shadow-[0_22px_48px_rgba(15,118,110,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(15,118,110,0.12)]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/60 to-black/24" />
                <div className="relative z-10 flex min-h-[18.75rem] flex-1 flex-col justify-end p-5 sm:p-6">
                  <h3 className="font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/86 opacity-0 translate-y-2 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {card.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white/92">View more</span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white transition group-hover:-translate-y-0.5">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-[var(--charcoal)] shadow-[0_18px_40px_rgba(244,180,0,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#ffd04d]"
            >
              View all services
            </button>
          </div>
        </div>
      </section>



      <section className="section-pad relative overflow-hidden bg-[#FEF9F0] pt-0">
        <svg
          baseProfile="tiny"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 310.838 796"
          className="pointer-events-none absolute left-[-3.75rem] top-1/2 h-[20rem] w-auto -translate-y-1/2 rotate-[44deg] fill-[var(--gold)] opacity-95 sm:left-[-4.5rem] sm:h-[25rem] lg:left-[-5.5rem] lg:h-[31rem]"
          aria-hidden="true"
        >
          <path d="M310.838 211.822C310.833 52.822 233.088 0 155.418 0 77.75 0 0 52.826 0 211.838V378.56h310.838V211.823zM0 584.16C0 743.173 77.747 796 155.42 796c77.67 0 155.418-52.828 155.418-211.838V417.447H0V584.16z"></path>
        </svg>
        <div className="container-shell relative z-10">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="inline-flex rounded-full bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--teal)] shadow-[0_12px_26px_rgba(15,118,110,0.08)]">
              Helpful resources
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--charcoal)] sm:text-4xl">
              Practical guides and trusted information
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--slate)]">
              A few handpicked resources to help you make informed choices about medications, safety, and everyday health
              questions.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredResources.map((item, index) => {
              const theme = featuredResourceThemes[index % featuredResourceThemes.length];
              const Icon = theme.Icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative min-h-[20rem] overflow-hidden rounded-[1.8rem] border shadow-[0_22px_48px_rgba(15,118,110,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_54px_rgba(15,118,110,0.16)] ${theme.shell}`}
                >
                  <div className={`pointer-events-none absolute inset-0 ${theme.accent}`} />
                  <div className="pointer-events-none absolute bottom-5 right-5 h-24 w-24 rounded-full border border-white/18 bg-white/8 blur-[1px]" />
                  <div className="relative z-10 flex min-h-[20rem] flex-col justify-between p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`inline-flex rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${theme.eyebrow}`}>
                        {item.category}
                      </div>
                      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-[1rem] ${theme.iconWrap}`}>
                        <Icon size={22} />
                      </span>
                    </div>
                    <div className="mt-8">
                      <h3 className="font-heading text-2xl leading-tight tracking-[-0.04em]">
                        {item.title}
                      </h3>
                      <p className={`mt-4 text-sm leading-7 ${theme.body}`}>{item.description}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-3">
                      <span className={`text-sm font-semibold ${theme.cta}`}>{item.cta}</span>
                      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition group-hover:-translate-y-0.5 ${theme.cta}`}>
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#297B75] pt-8 sm:pt-10 lg:pt-12">
        <div className="container-shell">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-8 text-center">
              <div className="inline-flex rounded-full bg-[rgba(244,180,0,0.18)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white">
                Patient stories
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                What people appreciate about Marigold
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80">
                A few simple notes on the kind of support we aim to provide every day.
              </p>
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label="Scroll testimonials left"
                onClick={() => scrollTestimonials(-1)}
                className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-[var(--gold)] text-[var(--charcoal)] shadow-[0_14px_30px_rgba(15,118,110,0.18)] transition hover:bg-[#ffd04d] md:inline-flex"
              >
                <ArrowRight size={18} className="rotate-180" />
              </button>

              <div
                ref={testimonialsTrackRef}
                className="flex snap-x snap-mandatory justify-start gap-4 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-14 scroll-smooth"
              >
                {homeTestimonials.map((item) => (
                  <article
                    key={item.quote}
                    className="min-w-[19rem] snap-start rounded-[1.5rem] border border-[rgba(255,255,255,0.16)] bg-white p-6 shadow-[0_18px_40px_rgba(15,118,110,0.08)] sm:min-w-[22rem] lg:min-w-[24rem]"
                  >
                    <div className="mb-5 flex items-center gap-1 text-[var(--gold)]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg key={index} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
                          <path d="m10 1.8 2.6 5.2 5.7.8-4.1 4 1 5.7-5.2-2.7-5.2 2.7 1-5.7-4.1-4 5.7-.8L10 1.8Z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-base leading-8 text-[var(--charcoal)]">“{item.quote}”</p>
                    <p className="mt-5 text-base font-semibold text-[var(--teal)]">{item.label}</p>
                  </article>
                ))}
              </div>

              <button
                type="button"
                aria-label="Scroll testimonials right"
                onClick={() => scrollTestimonials(1)}
                className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-[var(--gold)] text-[var(--charcoal)] shadow-[0_14px_30px_rgba(15,118,110,0.18)] transition hover:bg-[#ffd04d] md:inline-flex"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden pt-0 pb-10 sm:pb-12 lg:pb-14 md:min-h-[38rem]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 z-0 hidden h-[12rem] w-[12rem] rotate-[45deg] md:block lg:h-[20rem] lg:w-[20rem]"
        >
          <CircularTabletShape className="h-full w-full text-[var(--gold)] opacity-90 drop-shadow-[0_15px_30px_rgba(244,180,0,0.15)]" />
        </div>
        
        <div className="container-shell relative z-10 flex items-center">
          <div className="mx-auto flex w-full max-w-4xl flex-col justify-center py-16 md:min-h-[38rem] md:py-20">
            <div className="text-center">
              <SectionEyebrow>FAQs</SectionEyebrow>
            </div>
            <h2 className="mt-4 text-center text-3xl font-semibold tracking-[-0.04em] text-[var(--charcoal)] sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-[var(--slate)]">
              A few quick answers to common questions about coverage, refills, delivery, and the way our pharmacy support
              works.
            </p>

            <div className="mt-8">
              {visibleFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div key={faq.question} className={`border-b border-[rgba(15,118,110,0.14)] ${index === 0 ? 'border-t' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className={`flex w-full items-center justify-between gap-5 px-1 py-5 text-left transition ${
                        isOpen ? 'text-[var(--teal)]' : 'text-[var(--charcoal)]'
                      }`}
                    >
                      <span className="max-w-3xl text-lg font-medium leading-8 sm:text-[1.4rem]">{faq.question}</span>
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(15,118,110,0.12)] bg-white text-[var(--teal)] transition ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        <ChevronDown size={17} />
                      </span>
                    </button>
                    {isOpen ? <div className="pb-5 pr-14 text-base leading-8 text-[var(--slate)]">{faq.answer}</div> : null}
                  </div>
                );
              })}
            </div>

            {homeFaqs.length > 4 ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllFaqs((value) => !value)}
                  className="inline-flex items-center gap-2 font-semibold text-[var(--teal)]"
                >
                  {showAllFaqs ? 'Show less' : 'Show more'}
                  <ArrowRight size={15} className={showAllFaqs ? 'rotate-180 transition' : 'transition'} />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden pt-10 sm:pt-12 lg:pt-14">
        <div className="pointer-events-none absolute left-[-3rem] sm:left-[-1rem] top-[5%] h-[22rem] w-[9rem] opacity-100 transform -rotate-[10deg]">
          <svg viewBox="0 0 310.838 796" aria-hidden="true" className="h-full w-full fill-[#F28C38] drop-shadow-[0_20px_40px_rgba(242,140,56,0.3)]">
            <path d="M310.838 211.822C310.833 52.822 233.088 0 155.418 0 77.75 0 0 52.826 0 211.838V378.56h310.838V211.823zM0 584.16C0 743.173 77.747 796 155.42 796c77.67 0 155.418-52.828 155.418-211.838V417.447H0V584.16z" />
          </svg>
        </div>
        <div className="container-shell mb-14 sm:mb-16 relative z-10">
          <div className="grid gap-10 overflow-hidden rounded-bl-[2.5rem] rounded-tr-[2.5rem] bg-[#f7f4eb] p-8 sm:p-10 lg:grid-cols-[1.12fr_0.88fr] lg:p-14">
            <div className="space-y-8">
              <div className="overflow-hidden rounded-[2rem] bg-[#0c1c25] shadow-[0_24px_50px_rgba(15,23,42,0.2)]">
                <div className="relative min-h-[18rem] sm:min-h-[22rem]">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80"
                    alt="Marigold Pharmacy care team"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,24,0.06),rgba(7,25,24,0.58))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/74">Marigold Pharmacy</p>
                    <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                      Stay Healthy, Be Well.
                    </h2>
                  </div>
                </div>
              </div>

              <div className="max-w-3xl space-y-4">
                <p className="text-base leading-8 text-[var(--slate)] sm:text-lg sm:leading-9">
                  Are you looking for a pharmacy that cares about your health as much as you do? You have come to the right
                  place.
                </p>
                <p className="text-base leading-8 text-[var(--slate)] sm:text-lg sm:leading-9">
                  At Marigold Pharmacy, quality pharmacy care means more than prompt prescriptions. It means the medications
                  you need, guidance that is easy to understand, and the care and attention you deserve.
                </p>
              </div>
            </div>

            <div className="flex items-center lg:pl-4">
              <div className="relative w-full overflow-hidden rounded-[2.2rem] border border-[rgba(15,118,110,0.08)] bg-[linear-gradient(145deg,#fffaf1_0%,#ffffff_68%)] p-6 shadow-[0_24px_55px_rgba(15,23,42,0.1)] sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#f4c44c_0%,#ef8b2c_52%,rgba(15,118,110,0.24)_100%)]" />
                <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-[rgba(244,196,76,0.12)] blur-2xl" />
                <div className="inline-flex rounded-full border border-[rgba(244,180,0,0.16)] bg-[rgba(244,180,0,0.14)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--charcoal)]">
                  Insurance accepted
                </div>
                <h3 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--charcoal)]">
                  We can help you figure out your coverage.
                </h3>
                <p className="mt-4 max-w-[34rem] text-base leading-8 text-[var(--slate)]">
                  We accept most major plans. If something is unclear, we will help you review it. Paying out of pocket?
                  Ask about lower-cost options, including our $4 prescription plan.
                </p>

                <div className="mt-7 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(15,118,110,0.08)] text-[var(--teal)]">
                      <CheckCircle2 size={15} />
                    </span>
                    <p className="text-sm leading-7 text-[var(--slate)]">
                      Bring your card or call us and we will help check what is covered.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(15,118,110,0.08)] text-[var(--teal)]">
                      <CheckCircle2 size={15} />
                    </span>
                    <p className="text-sm leading-7 text-[var(--slate)]">
                      Not sure where to start? We are happy to walk you through it.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('/insurance-accepted')}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-[var(--charcoal)] shadow-[0_18px_40px_rgba(244,180,0,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#ffd04d]"
                  >
                    View insurance information
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-pad scroll-mt-28 sm:scroll-mt-32 pt-0">
        <div className="container-shell">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <SectionEyebrow>Visit Marigold Pharmacy</SectionEyebrow>
            <h2 className="mt-4 font-heading text-4xl font-bold tracking-[-0.055em] text-[var(--charcoal)] sm:text-5xl">
              Come see us in Kissimmee.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--slate)]">
              The contact section is designed for clarity first, then warmth and reassurance.
            </p>
          </div>

          <div className="grid items-stretch gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <div className="flex h-full flex-col justify-between space-y-10 rounded-[32px] bg-white p-8 shadow-[0_22px_55px_rgba(15,118,110,0.08)] sm:p-10">
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--teal)]">Address</p>
                  <p className="mt-3 text-[clamp(1.9rem,2.4vw,2.35rem)] font-heading font-bold tracking-[-0.04em] text-[var(--charcoal)]">
                    {streetAddress}
                    <span className="block">{cityAddress}</span>
                  </p>
                </div>

                <div className="space-y-1 text-lg leading-8 text-[var(--slate)]">
                  <p>
                    <span className="font-semibold text-[var(--charcoal)]">Phone</span>{' '}
                    <a className="text-[var(--teal)] transition-colors hover:opacity-80" href={`tel:${phoneNumber.replace(/-/g, '')}`}>
                      {phoneNumber}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--charcoal)]">Directions</span>{' '}
                    <a
                      className="text-[var(--teal)] transition-colors hover:opacity-80"
                      href={`https://www.google.com/maps/dir//${encodeURIComponent(`${streetAddress}, ${cityAddress}, USA`)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get directions to the pharmacy
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--charcoal)]">Hours</span> Call to confirm today’s hours
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-t border-[rgba(15,118,110,0.12)] pt-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {hours.map(([day, value]) => (
                    <div key={day} className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">{day}</p>
                      <p className="text-sm text-[var(--charcoal)]">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--slate)]">
                  <MapPin size={16} className="text-[var(--gold)]" />
                  <span>Quick access from nearby neighborhoods in Kissimmee</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button type="button" onClick={() => onNavigate('/contact-us')} className="btn-primary inline-flex">
                    Contact Pharmacy
                  </button>
                  <p className="text-sm leading-6 text-[var(--slate)]">
                    Need help now? Call the pharmacy team for prescription questions, transfer help, or quick directions to the
                    right service.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-full overflow-hidden rounded-[32px] border border-[rgba(15,118,110,0.12)] bg-white shadow-[0_22px_55px_rgba(15,118,110,0.08)]">
              <div className="relative h-full min-h-[420px]">
                {isContactMapLoaded ? (
                  <iframe
                    title="Marigold Pharmacy map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${streetAddress}, ${cityAddress}, USA`)}&z=15&output=embed`}
                    className="h-full min-h-[420px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="relative flex h-full min-h-[420px] flex-col justify-between bg-[linear-gradient(180deg,#eef7f5_0%,#e8f1ef_100%)] p-8 sm:p-10">
                    <div className="pointer-events-none absolute inset-0 opacity-80">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(15,118,110,0.08)_24%,rgba(15,118,110,0.08)_25%,transparent_25%,transparent_49%,rgba(15,118,110,0.08)_49%,rgba(15,118,110,0.08)_50%,transparent_50%,transparent_74%,rgba(15,118,110,0.08)_74%,rgba(15,118,110,0.08)_75%,transparent_75%),linear-gradient(transparent_24%,rgba(15,118,110,0.08)_24%,rgba(15,118,110,0.08)_25%,transparent_25%,transparent_49%,rgba(15,118,110,0.08)_49%,rgba(15,118,110,0.08)_50%,transparent_50%,transparent_74%,rgba(15,118,110,0.08)_74%,rgba(15,118,110,0.08)_75%,transparent_75%)] bg-[length:120px_120px]" />
                    </div>

                    <div className="relative z-10">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">Map preview</p>
                      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--charcoal)]">
                        View the live map when you need it.
                      </h3>
                      <p className="mt-4 max-w-md text-base leading-8 text-[var(--slate)]">
                        Keep the page fast, then open the live map only when you want a closer look.
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-center">
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_rgba(15,118,110,0.12)]">
                        <MapPin size={34} className="text-[var(--teal)]" />
                        <div className="absolute inset-[-12px] rounded-full border border-[rgba(15,118,110,0.16)]" />
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => setIsContactMapLoaded(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-[var(--charcoal)] shadow-[0_18px_40px_rgba(244,180,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffd04d]"
                      >
                        Load live map
                        <ArrowRight size={15} />
                      </button>
                      <a
                        href={`https://www.google.com/maps/dir//${encodeURIComponent(`${streetAddress}, ${cityAddress}, USA`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,118,110,0.14)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--teal)] transition hover:-translate-y-0.5"
                      >
                        Get directions
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  const prefersReducedMotion = useReducedMotion();
  const storySections = [
    {
      eyebrow: 'Our philosophy',
      title: 'More “we are here for you.” Less “next in line.”',
      description: [
        'We believe pharmacy support should feel thoughtful, warm, and easy to understand. Patients should not have to brace themselves for rushed conversations or unclear next steps.',
        'That is why we center every interaction around listening well, explaining clearly, and following through with the kind of care families remember.',
      ],
      image:
        'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1600',
      alt: 'Friendly pharmacist interacting with a patient',
      accent: '',
      reverse: false,
      panelClass: 'bg-[linear-gradient(135deg,#fff8e8_0%,#ffffff_100%)]',
      eyebrowClass: 'text-[var(--gold)]',
      titleClass: 'text-[var(--teal)]',
      bodyClass: 'text-[var(--slate)]',
      buttonClass: 'bg-[var(--gold)] text-[var(--charcoal)] hover:bg-[#ffd04d]',
    },
    {
      eyebrow: 'Our people',
      title: 'A team that treats every question like it matters.',
      description: [
        'Marigold Pharmacy is built by people who genuinely enjoy helping patients feel more confident about medications, refills, insurance questions, and everyday health routines.',
        'We want every conversation to feel steady and personal, whether you are picking up for yourself, caring for a parent, or coordinating for the whole household.',
      ],
      image:
        'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1600',
      alt: 'Pharmacy team members collaborating',
      accent: '',
      reverse: true,
      panelClass: 'bg-[linear-gradient(135deg,#f6efe5_0%,#ffffff_100%)]',
      eyebrowClass: 'text-[var(--teal)]',
      titleClass: 'text-[#d9822b]',
      bodyClass: 'text-[var(--slate)]',
    },
    {
      eyebrow: 'Our pharmacy',
      title: 'Pharmacy care with a more modern rhythm.',
      description: [
        'We use practical systems that help us stay organized, responsive, and ready, so patients spend less time chasing refills and more time feeling supported.',
        'Technology matters to us only when it makes care better: clearer communication, smoother coordination, and a more dependable pharmacy experience from start to finish.',
      ],
      image:
        'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600',
      alt: 'Modern pharmacy setup with essential medications',
      accent: '',
      reverse: false,
      panelClass: 'bg-[linear-gradient(135deg,#eefaf8_0%,#ffffff_100%)]',
      eyebrowClass: 'text-[var(--green)]',
      titleClass: 'text-[var(--green)]',
      bodyClass: 'text-[var(--slate)]',
    },
  ] as const;

  const values = [
    {
      title: 'Faster',
      description: 'Quick refill follow-through, simpler coordination, and fewer unnecessary return trips.',
    },
    {
      title: 'Kinder',
      description: 'Real conversations with a team that listens first and treats patients with warmth.',
    },
    {
      title: 'Smarter',
      description: 'Organized systems that help reduce missed details, refill stress, and avoidable confusion.',
    },
    {
      title: 'Better',
      description: 'A more personal pharmacy experience shaped around steady support, not rushed transactions.',
    },
  ] as const;

  return (
    <section className="-mt-px pt-0">
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#1f6f68]">
        <div className="relative px-7 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="absolute left-[-2rem] top-[1.5rem] h-[16rem] w-[24rem] opacity-40 sm:left-0 sm:h-[28rem] sm:w-[46rem] sm:opacity-100 lg:h-[32rem] lg:w-[54rem]">
            <CircularTabletShape className="h-full w-full text-[#ef7d32]" />
          </div>
          <motion.div
            aria-hidden="true"
            className="absolute bottom-[-1rem] right-[-1rem] h-[7rem] w-[7rem] text-[#f2c230] sm:bottom-[-2.25rem] sm:right-[-1.5rem] sm:h-[11rem] sm:w-[11rem] lg:bottom-[-2.75rem] lg:right-[-1.75rem] lg:h-[13rem] lg:w-[13rem]"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            initial={prefersReducedMotion ? undefined : { rotate: 18 }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: 34,
                    ease: 'linear',
                    repeat: Number.POSITIVE_INFINITY,
                  }
            }
          >
            <svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" role="none" focusable="false" aria-hidden="true" viewBox="0 0 332.886 338" className="h-full w-full fill-current">
              <path d="M323.353 202.724L114.725 8.067A29.978 29.978 0 0 0 85.5 1.31a29.993 29.993 0 0 0-20.463 21.932L.77 301.247a29.995 29.995 0 0 0 8.764 28.686 29.978 29.978 0 0 0 29.225 6.756l272.89-83.348a30 30 0 0 0 20.464-21.934 30.003 30.003 0 0 0-8.762-28.686z" />
            </svg>
          </motion.div>

          <div className="relative z-10 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div />
            <div className="max-w-xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#fff5cc]">About us</p>
              <h2 className="mt-5 font-ui text-[clamp(2.6rem,4.4vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                We are a new kind of pharmacy
              </h2>
              <div className="mt-8 space-y-5 text-base leading-8 text-white/84 sm:text-lg">
                <p>
                  Marigold Pharmacy brings together the clarity of a modern care experience and the personal attention of a
                  neighborhood pharmacy that still believes service should feel human.
                </p>
                <p>
                  We help patients stay steady with prescriptions, refills, wellness questions, and everyday pharmacy support
                  without making the process feel cold or complicated.
                </p>
                <p>
                  With love,
                  <br />
                  Marigold Pharmacy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 space-y-0 overflow-hidden bg-white">
        {storySections.map((section) => (
          <div
            key={section.eyebrow}
            className={`grid lg:min-h-[26rem] ${
              section.eyebrow === 'Our people'
                ? 'lg:grid-cols-[0.4fr_0.6fr]'
                : 'lg:grid-cols-[0.4fr_0.6fr]'
            } ${
              section.reverse ? 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1' : ''
            }`}
          >
            <div className="relative min-h-[16rem] overflow-hidden sm:min-h-[18rem] lg:min-h-full">
              <img
                src={section.image}
                alt={section.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {section.accent && <div className={`absolute inset-0 bg-gradient-to-r ${section.accent}`} />}
            </div>

            <div className={`flex items-center px-7 py-10 sm:px-9 sm:py-11 lg:px-8 lg:py-12 ${section.panelClass}`}>
              <div className="max-w-none lg:max-w-[42rem]">
                <p className={`font-heading text-[11px] font-semibold uppercase tracking-[0.18em] ${section.eyebrowClass}`}>{section.eyebrow}</p>
                <h3 className={`mt-5 font-ui text-[41px] font-semibold leading-[1.02] tracking-[-0.04em] ${section.titleClass}`}>
                  {section.title}
                </h3>
                <div className={`mt-6 space-y-4 text-[16px] leading-8 ${section.bodyClass}`}>
                  {section.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.eyebrow === 'Our philosophy' ? (
                  <button
                    type="button"
                    onClick={() => onNavigate('/resources')}
                    className={`mt-8 inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] transition ${section.buttonClass}`}
                  >
                    Visit our resources
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#f4ede3] px-7 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">How we do</p>
            <h3 className="mt-5 font-ui text-[40px] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--charcoal)] sm:text-[48px]">
              Marigold is...
            </h3>
            <p className="mt-5 max-w-xl text-[16px] leading-8 text-[var(--slate)]">
              Simple pharmacy care shaped by warmth, clarity, and a steadier day-to-day experience.
            </p>
          </div>

          <div className="mt-10 grid overflow-hidden border-t border-[rgba(15,118,110,0.16)] md:grid-cols-2 md:border-l">
            {values.map((value, index) => (
              <article
                key={value.title}
                className={`flex min-h-[14rem] flex-col justify-start border-b border-[rgba(15,118,110,0.16)] py-8 md:px-8 md:py-10 ${
                  index % 2 === 0 ? 'md:border-r' : ''
                }`}
              >
                <h4 className="font-ui text-[42px] font-semibold leading-none tracking-[-0.05em] text-[var(--teal)] sm:text-[52px]">
                  {value.title}
                </h4>
                <p className="mt-7 max-w-[27rem] text-[15px] leading-8 text-[var(--charcoal)] sm:text-[16px]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-10">
          <button
            type="button"
            onClick={() => onNavigate('/contact-us')}
            className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--charcoal)] shadow-[0_18px_40px_rgba(244,180,0,0.24)] transition hover:-translate-y-0.5 hover:bg-[#ffd04d]"
          >
            Join Marigold
          </button>
        </div>
      </div>
    </section>
  );
}

function ServicesPage({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  const initialVisibleCount = 6;
  const revealRowCount = 3;
  const [visibleServiceCount, setVisibleServiceCount] = useState(initialVisibleCount);
  const visibleServices = serviceCards.slice(0, visibleServiceCount);
  const hasMoreServices = visibleServiceCount < serviceCards.length;

  return (
    <section className="section-pad pt-6 sm:pt-8 lg:pt-10 relative overflow-hidden min-h-[50vh]">
      <div className="page-shell relative z-10">
        <div className="overflow-hidden rounded-[34px] bg-transparent shadow-none">
          <div className="relative isolate px-4 pt-0 pb-5 sm:px-6 sm:pt-0 sm:pb-6 lg:px-8 lg:pt-0 lg:pb-8">
            <div className="relative z-10 flex min-h-[11rem] max-w-4xl items-start lg:min-h-[13rem]">
              <div className="max-w-3xl pt-0 pb-2">
                <p className="inline-flex rounded-full bg-[rgba(15,118,110,0.08)] px-5 py-2.5 text-[0.95rem] font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">
                  Services
                </p>
                <h1 className="mt-4 font-heading text-[clamp(2.5rem,5vw,4.3rem)] font-bold leading-[0.94] tracking-[-0.06em] text-[var(--charcoal)]">
                  Your way to wellness.
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--slate)] sm:text-xl">
                  Quality pharmacy care means more than prompt prescriptions. We help patients receive the medications,
                  support, and attention they deserve.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleServices.map((card) => (
            <button
              key={card.slug}
              type="button"
              onClick={() => onNavigate(`/services/${card.slug}`)}
              className="group relative flex min-h-[18.75rem] flex-col overflow-hidden rounded-[1.6rem] bg-[#0c1c25] text-left shadow-[0_22px_48px_rgba(15,118,110,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(15,118,110,0.12)]"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/60 to-black/24" />
              <div className="relative z-10 flex min-h-[18.75rem] flex-1 flex-col justify-end p-5 sm:p-6">
                <h3 className="font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/86 opacity-0 translate-y-2 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {card.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-white/92">View more</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white transition group-hover:-translate-y-0.5">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {serviceCards.length > initialVisibleCount ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisibleServiceCount((count) =>
                  hasMoreServices ? Math.min(count + revealRowCount, serviceCards.length) : initialVisibleCount,
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-semibold text-[var(--charcoal)] shadow-[0_18px_40px_rgba(244,180,0,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#ffd04d]"
            >
              {hasMoreServices ? 'View more' : 'Show less'}
              <ArrowRight size={15} className={hasMoreServices ? 'transition' : 'rotate-180 transition'} />
            </button>
          </div>
        ) : null}

      </div>
    </section>
  );
}

function ServiceDetailPage({
  service,
  onNavigate,
}: {
  service: ServiceCard;
  onNavigate: (path: RoutePath) => void;
}) {
  const relatedServices = serviceCards.filter((item) => item.slug !== service.slug).slice(0, 3);
  const supportThemes = [
    'bg-[#f6efe5] border-[rgba(15,118,110,0.08)]',
    'bg-[#e9f4f2] border-[rgba(15,118,110,0.08)]',
    'bg-[#f7efe1] border-[rgba(244,180,0,0.16)]',
  ] as const;

  return (
    <ContentPageShell eyebrow="Services" title={service.title} intro={service.intro}>
      <div className="space-y-10">
        <div className="overflow-hidden rounded-[2.2rem] border border-[rgba(15,118,110,0.08)] bg-[#0c1c25] shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
          <div className="relative min-h-[24rem] sm:min-h-[28rem]">
            <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,19,0.16),rgba(5,14,19,0.78))]" />
            <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-32 w-32 rounded-full bg-[rgba(244,180,0,0.16)] blur-3xl" />

            <div className="relative z-10 grid min-h-[24rem] gap-8 p-7 sm:min-h-[28rem] sm:p-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-2xl self-end">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">{service.category}</p>
                <h2 className="mt-3 font-heading text-[clamp(2.4rem,4.4vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                  {service.title}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
                  {service.description}
                </p>
              </div>

              <div className="self-end rounded-[1.8rem] border border-white/14 bg-white/10 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.14)] backdrop-blur-md">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#fff0b8]">What to expect</p>
                <div className="mt-4 space-y-3">
                  {service.details.slice(0, 3).map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-7 text-white/88">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/14 text-[#f6d05c]">
                        <CheckCircle2 size={15} />
                      </span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(15,118,110,0.1)] bg-white p-8 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-10">
            <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-[rgba(244,180,0,0.12)] blur-2xl" />
            <div className="relative z-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">{service.category}</p>
              <h3 className="mt-5 font-heading text-[clamp(2rem,3vw,3rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--charcoal)]">
                Service support that stays clear, practical, and personal.
              </h3>
              <div className="mt-6 space-y-5 text-lg leading-8 text-[var(--slate)]">
                <p>{service.supportNote}</p>
                <p>{service.description}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => onNavigate('/contact-us')} className="btn-primary">
                  Ask about this service
                </button>
                <button type="button" onClick={() => onNavigate('/services')} className="btn-secondary">
                  View all services
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-[2rem] border border-[rgba(15,118,110,0.1)] bg-[linear-gradient(145deg,#fffaf1_0%,#ffffff_70%)] p-6 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">At a glance</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--slate)]">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(15,118,110,0.08)] text-[var(--teal)]">
                    <CheckCircle2 size={15} />
                  </span>
                  <p>Designed to make medication access and next steps feel easier to manage.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(15,118,110,0.08)] text-[var(--teal)]">
                    <CheckCircle2 size={15} />
                  </span>
                  <p>Helpful for patients who want clarity, quick follow-through, and neighborhood-level support.</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(15,118,110,0.08)] bg-[#165860] p-6 text-white shadow-[0_24px_55px_rgba(15,23,42,0.16)] sm:p-7">
              <div className="pointer-events-none absolute right-[-1.5rem] top-[-1.5rem] h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/74">Need help now?</p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white">
                Our team can help you find the right next step quickly.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/84">
                Call or message the pharmacy if you want help understanding whether this service is the right fit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => onNavigate('/contact-us')} className="btn-primary-dark">
                  Contact pharmacy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[rgba(15,118,110,0.1)] bg-[linear-gradient(145deg,#fffdf9_0%,#f7efe1_100%)] p-6 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">What this service can support</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.045em] text-[var(--charcoal)]">
              Practical ways this service can help.
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {service.details.map((item, index) => (
            <div
              key={item}
              className={`rounded-[1.45rem] border p-5 text-left shadow-[0_14px_28px_rgba(15,118,110,0.06)] ${supportThemes[index % supportThemes.length]}`}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/84 text-[var(--teal)] shadow-[0_10px_18px_rgba(15,118,110,0.08)]">
                <CheckCircle2 size={18} />
              </span>
              <p className="mt-4 text-base leading-8 text-[var(--charcoal)]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-[rgba(15,118,110,0.1)] bg-white p-6 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">Related services</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.045em] text-[var(--charcoal)]">
              Continue exploring pharmacy support.
            </h2>
          </div>
          <button type="button" onClick={() => onNavigate('/services')} className="font-semibold text-[var(--teal)]">
            All services
          </button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {relatedServices.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => onNavigate(`/services/${item.slug}`)}
              className="group relative min-h-[18rem] overflow-hidden rounded-[1.6rem] bg-[#0c1c25] text-left shadow-[0_22px_48px_rgba(15,118,110,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(15,118,110,0.12)]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/58 to-black/24" />
              <div className="relative z-10 flex min-h-[18rem] flex-col justify-end p-5 sm:p-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">{item.category}</p>
                <h3 className="mt-3 font-heading text-[clamp(1.6rem,2.4vw,2.15rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/84 opacity-0 translate-y-2 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-white/92">View more</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white transition group-hover:-translate-y-0.5">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ContentPageShell>
  );
}

function MedicalSuppliesPage() {
  return (
    <ContentPageShell
      title="Quality products for a better life."
      eyebrow="Medical Supplies"
      intro="We offer a range of supplies and equipment designed to support comfort, safety, and healthier routines at home."
      hideShapes
    >
      <div className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
          <div className="rounded-[1.9rem] border border-[rgba(15,118,110,0.1)] bg-white p-8 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-10">
            <div className="rounded-[1.7rem] bg-[linear-gradient(135deg,#fff,rgba(15,118,110,0.05))] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--teal)]">Medical supplies support</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-[var(--charcoal)]">
                Supportive products for everyday care at home
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--slate)]">
                From routine home-health needs to practical mobility and diabetic support items, our team helps patients find
                products that make daily care more manageable.
              </p>
            </div>

            <p className="mt-8 text-lg leading-8 text-[var(--slate)]">
              Our goal is to ensure that you can get the needed supplies that best complement your health care regimen. We make
              this possible by offering a wide range of medical supplies and equipment designed to not just meet your health
              needs but to also help you achieve an improved quality of life.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.9rem] border border-[rgba(15,118,110,0.08)] bg-[#0c1c25] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.42)]">
            <div className="relative min-h-[32rem] sm:min-h-[36rem]">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80"
                alt="Medical supplies support"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: 'center 38%' }}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/18" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <div className="max-w-xl">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">Medical supplies</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                    Products that help daily routines feel easier and safer
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/88 sm:text-base">
                    Our supplies selection is centered on practical support, safer movement, and everyday home care needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {supplyItems.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-[1.6rem] border border-[rgba(15,118,110,0.1)] bg-white shadow-[0_18px_40px_rgba(15,118,110,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,118,110,0.1)]"
            >
              <div className="relative aspect-[1.45/1] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-7 text-[var(--slate)]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </ContentPageShell>
  );
}

function ResourcesPage() {
  const initialQuickLinkCount = 3;
  const [showAllQuickLinks, setShowAllQuickLinks] = useState(false);
  const visibleQuickLinks = showAllQuickLinks ? resourceLinks : resourceLinks.slice(0, initialQuickLinkCount);
  const hasHiddenQuickLinks = resourceLinks.length > initialQuickLinkCount;

  const resourceCardThemes = [
    {
      shell: 'bg-[#f6f2eb] text-[var(--charcoal)] border-[rgba(15,118,110,0.08)]',
      eyebrow: 'text-[var(--teal)] bg-white/80',
      body: 'text-[var(--slate)]',
      cta: 'text-[var(--teal)]',
      iconWrap: 'bg-[rgba(15,118,110,0.1)] text-[var(--teal)]',
      accent: 'bg-[radial-gradient(circle_at_100%_100%,rgba(244,180,0,0.28),transparent_42%)]',
      Icon: ShieldCheck,
    },
    {
      shell: 'bg-[#f58f6e] text-[var(--charcoal)] border-[rgba(245,143,110,0.22)]',
      eyebrow: 'text-[var(--charcoal)] bg-white/24',
      body: 'text-[rgba(31,41,55,0.82)]',
      cta: 'text-[var(--charcoal)]',
      iconWrap: 'bg-white/72 text-[#d76f4b]',
      accent: 'bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.22),transparent_38%)]',
      Icon: Sparkles,
    },
    {
      shell: 'bg-[#165860] text-white border-[rgba(22,88,96,0.3)]',
      eyebrow: 'text-white bg-white/12',
      body: 'text-white/82',
      cta: 'text-white',
      iconWrap: 'bg-white/14 text-white',
      accent: 'bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.14),transparent_38%)]',
      Icon: ExternalLink,
    },
    {
      shell: 'bg-[#f7efe1] text-[var(--charcoal)] border-[rgba(15,118,110,0.08)]',
      eyebrow: 'text-[var(--charcoal)] bg-white/82',
      body: 'text-[var(--slate)]',
      cta: 'text-[var(--teal)]',
      iconWrap: 'bg-[rgba(244,180,0,0.14)] text-[var(--charcoal)]',
      accent: 'bg-[radial-gradient(circle_at_100%_100%,rgba(15,118,110,0.14),transparent_42%)]',
      Icon: CheckCircle2,
    },
    {
      shell: 'bg-[#e9f4f2] text-[var(--charcoal)] border-[rgba(15,118,110,0.08)]',
      eyebrow: 'text-[var(--teal)] bg-white/84',
      body: 'text-[var(--slate)]',
      cta: 'text-[var(--teal)]',
      iconWrap: 'bg-white text-[var(--teal)]',
      accent: 'bg-[radial-gradient(circle_at_100%_100%,rgba(15,118,110,0.16),transparent_38%)]',
      Icon: ChevronRight,
    },
  ] as const;

  const renderResourceCard = (
    item: { category: string; title: string; description: string; href: string; cta: string },
    index: number,
    size: 'feature' | 'compact' = 'feature',
  ) => {
    const theme = resourceCardThemes[index % resourceCardThemes.length];
    const Icon = theme.Icon;

    return (
      <a
        key={item.title}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={`group relative min-h-[11.75rem] overflow-hidden rounded-[1.8rem] border shadow-[0_22px_48px_rgba(15,118,110,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_54px_rgba(15,118,110,0.16)] ${theme.shell}`}
      >
        <div className={`pointer-events-none absolute inset-0 ${theme.accent}`} />
        <div className="pointer-events-none absolute bottom-5 right-5 h-24 w-24 rounded-full border border-white/18 bg-white/8 blur-[1px]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <p className={`inline-flex rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${theme.eyebrow}`}>
              {item.category}
            </p>
            <span className={`inline-flex h-12 w-12 items-center justify-center rounded-[1rem] ${theme.iconWrap}`}>
              <Icon size={22} />
            </span>
          </div>

          <div className="mt-4 max-w-xl">
            <h3
              className={`font-heading font-bold leading-[1.08] tracking-[-0.05em] ${
                size === 'feature' ? 'text-[clamp(1.9rem,2.6vw,2.35rem)]' : 'text-[clamp(1.9rem,2.6vw,2.35rem)]'
              }`}
            >
              {item.title}
            </h3>
            <p className={`mt-1.5 max-w-xl text-sm leading-6 sm:text-[15px] ${theme.body}`}>{item.description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className={`text-sm font-semibold ${theme.cta}`}>{item.cta}</span>
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition group-hover:-translate-y-0.5 ${theme.cta}`}>
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </a>
    );
  };

  return (
    <ContentPageShell
      title="Useful healthcare resources."
      eyebrow="Resources"
      intro="Helpful links for medication education, safety, and consumer health information."
      titleClassName="text-[clamp(2.2rem,4vw,3.6rem)]"
      hideShapes
    >
      <div className="space-y-12">
        <div>
          <div className="grid gap-6 lg:grid-cols-3">
            {resourceHighlights.map((item, index) => renderResourceCard(item, index))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">Quick links</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--slate)]">
            General reference links for medication safety, OTC guidance, and trusted consumer health information.
          </p>

          <div className="mt-5 grid gap-6 lg:grid-cols-3">
            {visibleQuickLinks.map((item, index) => renderResourceCard(item, index + 1, 'compact'))}
          </div>

          {hasHiddenQuickLinks ? (
            <div className="mt-6 flex justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => setShowAllQuickLinks((value) => !value)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--charcoal)] shadow-[0_18px_40px_rgba(244,180,0,0.24)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#ffd04d]"
              >
                {showAllQuickLinks ? 'Show less' : 'View more'}
                <ArrowRight size={15} className={showAllQuickLinks ? 'rotate-180 transition' : 'transition'} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </ContentPageShell>
  );
}

function ContactPage() {
  return (
    <ContentPageShell
      title="Need help?"
      eyebrow="Contact Us"
      intro="Please reach out if you have questions, prescription concerns, or need support from the pharmacy team."
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[34px] border border-[rgba(15,118,110,0.1)] bg-white p-8 shadow-[0_22px_48px_rgba(15,118,110,0.08)]">
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Full name"
              className="rounded-[18px] border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.02)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--teal)]"
            />
            <input
              type="email"
              placeholder="Email address"
              className="rounded-[18px] border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.02)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--teal)]"
            />
            <textarea
              placeholder="Enter your message here"
              rows={8}
              className="rounded-[22px] border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.02)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--teal)]"
            />
            <button type="button" className="btn-primary w-auto self-start px-5 py-3">
              Send message
            </button>
          </div>
        </div>

        <ContactInfoCard compact />
      </div>
    </ContentPageShell>
  );
}

function InsuranceAcceptedPage({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  return (
    <ContentPageShell
      title="Insurance Accepted"
      eyebrow="Home > Insurance Accepted"
      intro="Broadway-inspired coverage support, adapted for Marigold Pharmacy with clear insurance guidance and a more personal neighborhood feel."
    >
      <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="h-full overflow-hidden rounded-[1.9rem] border border-[rgba(15,118,110,0.1)] bg-[#0c1c25] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.42)]">
          <div className="relative h-full min-h-[26rem] sm:min-h-[30rem]">
            <img
              src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1600&q=80"
              alt="Pharmacy team reviewing insurance and prescription coverage"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,24,0.08),rgba(7,25,24,0.62))]" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <div className="max-w-xl">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">Health insurance</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Coverage support that feels clear, calm, and local.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/88 sm:text-base">
                  Present your prescription card to our staff and we will help take care of the rest.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.9rem] border border-[rgba(15,118,110,0.1)] bg-white p-7 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-8">
          <div className="inline-flex rounded-full bg-[rgba(244,180,0,0.18)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--charcoal)]">
            Insurance accepted
          </div>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--charcoal)] sm:text-4xl">
            We accept most insurance plans for prescriptions.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-[var(--slate)]">
            <p>
              Broadway Pharmacy accepts most insurance plans as payment for your prescriptions. You only need to present your
              prescription card to our staff, and we&apos;ll take care of the rest.
            </p>
            <p>
              If you have questions about the insurance plans we accept or about your coverage, please stop by our pharmacy or
              send us a message.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.4rem] bg-[rgba(15,118,110,0.04)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">Most major plans</p>
              <p className="mt-2 text-sm leading-7 text-[var(--slate)]">We work with most insurance plans for common prescription needs.</p>
            </div>
            <div className="rounded-[1.4rem] bg-[rgba(15,118,110,0.04)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">$4 plan</p>
              <p className="mt-2 text-sm leading-7 text-[var(--slate)]">No insurance? Ask us about our $4 prescription plan.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/contact-us')}
              className="btn-primary inline-flex"
            >
              Send us a message
            </button>
            <a
              href={`tel:${phoneNumber.replace(/-/g, '')}`}
              className="inline-flex items-center justify-center rounded-full border border-[rgba(15,118,110,0.18)] px-6 py-3.5 text-sm font-semibold text-[var(--teal)] transition hover:-translate-y-0.5 hover:border-[var(--teal)]"
            >
              Call {phoneNumber}
            </a>
          </div>
        </div>
      </div>

    </ContentPageShell>
  );
}

function ContentPageShell({
  eyebrow,
  title,
  intro,
  titleClassName = '',
  hideShapes = false,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  titleClassName?: string;
  hideShapes?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="section-pad pt-6 sm:pt-8 lg:pt-10 relative overflow-hidden min-h-[50vh]">
      {!hideShapes && title.length % 3 === 0 && (
        <>
          <div className="pointer-events-none absolute left-[-2rem] sm:left-[2%] top-[-5%] h-[18rem] w-[7rem] opacity-100 transform -rotate-[15deg]">
            <svg viewBox="0 0 310.838 796" aria-hidden="true" className="h-full w-full fill-[var(--teal)] drop-shadow-[0_20px_40px_rgba(15,118,110,0.3)]">
              <path d="M310.838 211.822C310.833 52.822 233.088 0 155.418 0 77.75 0 0 52.826 0 211.838V378.56h310.838V211.823zM0 584.16C0 743.173 77.747 796 155.42 796c77.67 0 155.418-52.828 155.418-211.838V417.447H0V584.16z" />
            </svg>
          </div>
          <div className="pointer-events-none absolute right-[-1rem] sm:right-[5%] bottom-[5%] h-[12rem] w-[12rem] opacity-100 transform rotate-[25deg] drop-shadow-[0_20px_40px_rgba(244,180,0,0.25)]">
            <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full text-[var(--gold)]">
              <g stroke="currentColor" strokeWidth="8" fill="none">
                {[0, 30, 60, 90, 120, 150].map(angle => (
                  <ellipse key={angle} cx="200" cy="200" rx="160" ry="50" transform={`rotate(${angle} 200 200)`} />
                ))}
                <circle cx="200" cy="200" r="60" />
              </g>
            </svg>
          </div>
          <div className="pointer-events-none absolute right-[15%] top-[10%] h-[10rem] w-[10rem] opacity-100 transform rotate-12">
            <CircularTabletShape className="h-full w-full text-[#F28C38] drop-shadow-[0_15px_30px_rgba(242,140,56,0.3)]" />
          </div>
        </>
      )}
      {!hideShapes && title.length % 3 === 1 && (
        <>
          <div className="pointer-events-none absolute left-[-1rem] sm:left-[5%] bottom-[10%] h-[12rem] w-[12rem] opacity-100 transform -rotate-[15deg] drop-shadow-[0_20px_40px_rgba(242,140,56,0.25)]">
            <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full text-[#F28C38]">
              <g stroke="currentColor" strokeWidth="8" fill="none">
                {[0, 30, 60, 90, 120, 150].map(angle => (
                  <ellipse key={angle} cx="200" cy="200" rx="160" ry="50" transform={`rotate(${angle} 200 200)`} />
                ))}
                <circle cx="200" cy="200" r="60" />
              </g>
            </svg>
          </div>
        </>
      )}
      {!hideShapes && title.length % 3 === 2 && (
        <>
          <div className="pointer-events-none absolute right-[5%] bottom-[5%] h-[18rem] w-[7rem] opacity-100 transform rotate-[-15deg]">
            <svg viewBox="0 0 310.838 796" aria-hidden="true" className="h-full w-full fill-[#F28C38] drop-shadow-[0_20px_40px_rgba(242,140,56,0.3)]">
              <path d="M310.838 211.822C310.833 52.822 233.088 0 155.418 0 77.75 0 0 52.826 0 211.838V378.56h310.838V211.823zM0 584.16C0 743.173 77.747 796 155.42 796c77.67 0 155.418-52.828 155.418-211.838V417.447H0V584.16z" />
            </svg>
          </div>
          <div className="pointer-events-none absolute left-[5%] top-[10%] h-[12rem] w-[12rem] opacity-100 transform rotate-[10deg] drop-shadow-[0_20px_40px_rgba(15,118,110,0.25)]">
            <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full text-[var(--teal)]">
              <g stroke="currentColor" strokeWidth="8" fill="none">
                {[0, 30, 60, 90, 120, 150].map(angle => (
                  <ellipse key={angle} cx="200" cy="200" rx="160" ry="50" transform={`rotate(${angle} 200 200)`} />
                ))}
                <circle cx="200" cy="200" r="60" />
              </g>
            </svg>
          </div>
          <div className="pointer-events-none absolute right-[15%] top-[5%] h-[10rem] w-[10rem] opacity-100 transform rotate-[15deg]">
            <CircularTabletShape className="h-full w-full text-[var(--gold)] drop-shadow-[0_15px_30px_rgba(244,180,0,0.3)]" />
          </div>
        </>
      )}
      <div className="page-shell relative z-10">
        <div className="max-w-[52rem] space-y-4">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h1 className={`font-heading text-[clamp(2.15rem,4vw,3.4rem)] font-semibold leading-[1] tracking-[-0.04em] text-[var(--charcoal)] ${titleClassName}`}>
            {title}
          </h1>
          <p className="text-lg leading-8 text-[var(--slate)]">{intro}</p>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex rounded-full bg-[rgba(15,118,110,0.08)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--teal)]">
      {children}
    </div>
  );
}

function ContactInfoCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-[34px] border border-[rgba(15,118,110,0.1)] bg-white p-8 shadow-[0_22px_48px_rgba(15,118,110,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--teal)]">Contact information</p>
      <div className="mt-6 space-y-5 text-[var(--slate)]">
        <div className="flex items-start gap-3">
          <MapPin size={18} className="mt-1 text-[var(--gold)]" />
          <div>
            <p className="font-semibold text-[var(--charcoal)]">{streetAddress}</p>
            <p>{cityAddress}</p>
            <p className="mt-1 text-sm">Serving Kissimmee and nearby Osceola County neighborhoods.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone size={18} className="mt-1 text-[var(--gold)]" />
          <div>
            <p className="font-semibold text-[var(--charcoal)]">Phone</p>
            <a href={`tel:${phoneNumber.replace(/-/g, '')}`} className="text-[var(--teal)]">
              {phoneNumber}
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail size={18} className="mt-1 text-[var(--gold)]" />
          <div>
            <p className="font-semibold text-[var(--charcoal)]">Email</p>
            <a href={`mailto:${emailAddress}`} className="text-[var(--teal)]">
              {emailAddress}
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock3 size={18} className="mt-1 text-[var(--gold)]" />
          <div>
            <p className="font-semibold text-[var(--charcoal)]">Business hours</p>
            <div className="mt-1 space-y-1 text-sm">
              {hours.map(([day, value]) => (
                <p key={day}>
                  {day}: {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!compact ? (
        <div className="mt-8 rounded-[24px] bg-[rgba(15,118,110,0.04)] p-5">
          <p className="font-medium text-[var(--charcoal)]">
            Need immediate help with a refill, transfer, or delivery question?
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--slate)]">
            Call the pharmacy team and we will help you get to the right next step quickly.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Footer({
  route,
  onNavigate,
}: {
  route: RoutePath;
  onNavigate: (path: RoutePath) => void;
}) {
  return (
    <footer className="relative overflow-hidden bg-[#0d3d3a] pb-12 pt-16 text-white">
      <div className="pointer-events-none absolute bottom-[-6rem] right-[-6rem] hidden h-[20rem] w-[20rem] rotate-12 lg:block">
        <CircularTabletShape className="h-full w-full text-[#F28C38] opacity-95 drop-shadow-[0_24px_60px_rgba(242,140,56,0.16)]" />
      </div>
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/16 pb-10">
          <div className="grid w-full gap-8 px-1 py-2 sm:px-2 lg:grid-cols-[0.95fr_1fr_1fr_1fr] lg:gap-12">
            <div className="min-w-0 xl:pr-4">
              <div className="origin-left scale-[1.15] sm:scale-[1.3]">
                <BrandLockup dark compact />
              </div>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/82">
                Marigold Pharmacy brings personalized prescription care, neighborhood delivery, medication coordination,
                and warm follow-through to families across Kissimmee.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/92">
                <ShieldCheck size={14} className="text-[var(--gold)]" />
                Health Mart affiliated
              </div>
            </div>

            <div className="min-w-0 space-y-6 lg:pl-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center text-white">
                  <MapPin size={22} />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Address</p>
                  <p className="mt-3 text-sm leading-7 text-white/84">
                    {streetAddress}
                    <br />
                    {cityAddress}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center text-white">
                  <Phone size={21} />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Phone</p>
                  <a
                    href={`tel:${phoneNumber.replace(/-/g, '')}`}
                    className="mt-3 block text-sm leading-7 text-white/84 transition hover:text-white"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center text-white">
                  <Mail size={22} />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Email</p>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="mt-3 block text-sm leading-7 text-white/84 transition hover:text-white"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:pl-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Business Hours</p>
              <div className="mt-3 space-y-2 text-sm leading-7 text-white/84">
                {hours.map(([day, value]) => (
                  <div key={day} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-medium text-white">{day}</span>
                    <span className="whitespace-nowrap">{value}</span>
                  </div>
                ))}
                <p className="pt-2 text-sm text-white/72">Serving Kissimmee and nearby Osceola County neighborhoods.</p>
              </div>
            </div>

            <div className="min-w-0 lg:pl-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Navigate</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-white/84">
                {navItems.filter(item => item.path !== '/contact-us').map((item) => (
                  <li key={item.path}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.path)}
                      className={`transition hover:text-white ${route === item.path ? 'text-white' : 'text-white/84'}`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <button type="button" onClick={() => onNavigate('/contact-us')} className="btn-primary-dark">
                  Contact Pharmacy
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div className="flex justify-center text-center">
            <p className="text-sm font-medium text-white/76">
              © {new Date().getFullYear()} Marigold Pharmacy. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AccessibilityWidget({
  isOpen,
  settings,
  side,
  isHidden,
  isVisible = true,
  onToggleOpen,
  onToggleSetting,
  onMoveWidget,
  onToggleHidden,
  onReset,
}: {
  isOpen: boolean;
  settings: AccessibilitySettings;
  side: 'left' | 'right';
  isHidden: boolean;
  isVisible?: boolean;
  onToggleOpen: () => void;
  onToggleSetting: (key: keyof AccessibilitySettings) => void;
  onMoveWidget: () => void;
  onToggleHidden: () => void;
  onReset: () => void;
}) {
  const options = [
    { key: 'oversizedWidget' as const, label: 'Oversized Widget', icon: Accessibility },
    { key: 'highContrast' as const, label: 'Contrast +', icon: Contrast },
    { key: 'highlightLinks' as const, label: 'Highlight Links', icon: ExternalLink },
    { key: 'biggerText' as const, label: 'Bigger Text', icon: Type },
    { key: 'textSpacing' as const, label: 'Text Spacing', icon: Pilcrow },
    { key: 'pauseAnimations' as const, label: 'Pause Animations', icon: Pause },
    { key: 'hideImages' as const, label: 'Hide Images', icon: EyeOff },
    { key: 'dyslexiaFriendly' as const, label: 'Dyslexia Friendly', icon: Sparkles },
    { key: 'bigCursor' as const, label: 'Cursor', icon: MousePointer2 },
    { key: 'tooltips' as const, label: 'Tooltips', icon: Sparkles },
    { key: 'lineHeight' as const, label: 'Line Height', icon: AlignLeft },
    { key: 'textAlign' as const, label: 'Text Align', icon: AlignLeft },
    { key: 'lowSaturation' as const, label: 'Saturation', icon: Shrink },
  ];

  const launcherSideClass = side === 'right' ? 'right-4 sm:right-6' : 'left-4 sm:left-6';
  const panelSideClass = side === 'right' ? 'right-4 sm:right-24' : 'left-4 sm:left-24';

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {isHidden ? (
        <button
          type="button"
          aria-label="Show accessibility widget"
          onClick={onToggleHidden}
          className={`fixed top-1/2 z-[80] inline-flex h-14 items-center gap-2 rounded-full bg-[var(--gold)] px-4 text-sm font-semibold text-[var(--charcoal)] shadow-[0_18px_34px_rgba(244,180,0,0.34)] ${
            side === 'right' ? 'right-2 -translate-y-1/2' : 'left-2 -translate-y-1/2'
          }`}
        >
          <Accessibility size={18} />
          Show widget
        </button>
      ) : null}

      <button
        type="button"
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
        onClick={onToggleOpen}
        className={`fixed top-1/2 z-[80] inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[var(--gold)] text-[var(--charcoal)] shadow-[0_18px_34px_rgba(244,180,0,0.34)] transition hover:scale-105 ${launcherSideClass} ${
          isHidden ? 'hidden' : ''
        }`}
      >
        <Accessibility size={28} />
      </button>

      {isOpen ? (
        <div
          className={`fixed top-1/2 z-[81] w-[min(26rem,calc(100vw-2rem))] max-h-[85vh] overflow-y-auto sm:max-h-[min(46rem,calc(100vh-4rem))] -translate-y-1/2 rounded-[2rem] border border-[rgba(15,118,110,0.14)] bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.2)] ${panelSideClass}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">How UserWay Works</p>
              <h3 className="mt-2 font-heading text-2xl font-bold tracking-[-0.04em] text-[var(--charcoal)]">
                Accessibility tools
              </h3>
            </div>
            <button
              type="button"
              aria-label="Close accessibility settings"
              onClick={onToggleOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(15,118,110,0.08)] text-[var(--teal)]"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mt-3 text-sm leading-6 text-[var(--slate)]">
            Manage readability, motion, visibility, and widget controls without leaving the page.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {options.map((option) => {
              const Icon = option.icon;
              const isActive = settings[option.key];

              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onToggleSetting(option.key)}
                  className={`flex items-center justify-between rounded-[1.25rem] border px-4 py-3 text-left transition ${
                    isActive
                      ? 'border-[var(--teal)] bg-[rgba(15,118,110,0.08)]'
                      : 'border-[rgba(15,118,110,0.1)] bg-[rgba(15,118,110,0.02)]'
                  }`}
                >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--teal)] shadow-[0_10px_20px_rgba(15,118,110,0.08)]">
                        <Icon size={18} />
                    </span>
                    <span className="text-sm font-semibold text-[var(--charcoal)]">{option.label}</span>
                  </span>
                  <span
                    className={`h-3 w-3 rounded-full ${
                      isActive ? 'bg-[var(--gold)] shadow-[0_0_0_6px_rgba(244,180,0,0.14)]' : 'bg-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onMoveWidget}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.04)] px-5 py-3 text-sm font-semibold text-[var(--teal)]"
            >
              <RotateCcw size={16} />
              Move Widget
            </button>
            <button
              type="button"
              onClick={onToggleHidden}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.04)] px-5 py-3 text-sm font-semibold text-[var(--teal)]"
            >
              <EyeOff size={16} />
              Hide Widget
            </button>
          </div>

          <button type="button" onClick={onReset} className="mt-4 w-full rounded-full bg-[var(--teal)] px-5 py-3 text-sm font-semibold text-white">
            Reset All Accessibility Settings
          </button>
        </div>
      ) : null}
    </>
  );
}

function HomeHeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-fade-soft absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(244,180,0,0.1),transparent_50%)]" />
    </div>
  );
}

function HomeHeroArtwork() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    setPointer({ x, y });
  };

  const handleLeave = () => {
    setPointer({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative h-full min-h-[28rem] overflow-visible sm:min-h-[33rem] lg:min-h-[40rem]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="absolute right-[8%] top-[8%] h-[23rem] w-[23rem] opacity-[0.03] sm:h-[28rem] sm:w-[28rem] lg:right-[7%] lg:top-[6%] lg:h-[35rem] lg:w-[35rem]"
        style={{ transform: `translate(${pointer.x * -1.5}px, ${pointer.y * 1.5}px)` }}
      >
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <g stroke="white" strokeWidth="6" fill="none">
            {[0, 30, 60, 90, 120, 150].map(angle => (
              <ellipse key={angle} cx="200" cy="200" rx="160" ry="50" transform={`rotate(${angle} 200 200)`} />
            ))}
            <circle cx="200" cy="200" r="60" />
          </g>
        </svg>
      </div>

      <div
        className="absolute right-[10%] top-[11%] h-[18.75rem] w-[18.75rem] sm:h-[23.25rem] sm:w-[23.25rem] lg:right-[8%] lg:top-[10%] lg:h-[29.9rem] lg:w-[29.9rem]"
        style={{ transform: `translate(${pointer.x * -4}px, ${pointer.y * 5}px) scale(0.9)` }}
      >
        <CircularTabletShape className="h-full w-full text-[#F28C38] drop-shadow-[0_30px_70px_rgba(242,140,56,0.16)]" />
      </div>

      <div
        className="absolute right-[10.5%] top-[18.5%] h-[18.7rem] w-[7.15rem] sm:h-[23.1rem] sm:w-[8.25rem] lg:right-[8.8%] lg:top-[15.5%] lg:h-[28.6rem] lg:w-[9.9rem]"
        style={{ transform: `translate(${pointer.x * -2}px, ${pointer.y * 6}px) rotate(14deg) scale(1.15)` }}
      >
        <svg viewBox="0 0 310.838 796" aria-hidden="true" className="h-full w-full fill-[var(--gold)] drop-shadow-[0_36px_80px_rgba(244,180,0,0.18)]">
          <path d="M310.838 211.822C310.833 52.822 233.088 0 155.418 0 77.75 0 0 52.826 0 211.838V378.56h310.838V211.823zM0 584.16C0 743.173 77.747 796 155.42 796c77.67 0 155.418-52.828 155.418-211.838V417.447H0V584.16z" />
        </svg>
      </div>

    </div>
  );
}

function CircularTabletShape({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 496 496" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M113.309 129.465C172.394 62.3347 274.158 49.1549 349.619 101.988C425.045 154.796 447.476 254.928 404.611 333.414L113.309 129.465ZM381.944 365.788C322.859 432.918 221.095 446.098 145.669 393.29C70.2074 340.457 47.8119 240.35 90.6414 161.839L381.944 365.788Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NotFoundPage({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  return (
    <section className="section-pad pt-20 sm:pt-24 lg:pt-32 min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[10%] left-[10%] h-[15rem] w-[15rem] opacity-20 transform -rotate-12">
        <CircularTabletShape className="h-full w-full text-[var(--gold)]" />
      </div>
      <div className="absolute bottom-[10%] right-[10%] h-[20rem] w-[8rem] opacity-20 transform rotate-12">
        <svg viewBox="0 0 310.838 796" aria-hidden="true" className="h-full w-full fill-[var(--teal)]">
          <path d="M310.838 211.822C310.833 52.822 233.088 0 155.418 0 77.75 0 0 52.826 0 211.838V378.56h310.838V211.823zM0 584.16C0 743.173 77.747 796 155.42 796c77.67 0 155.418-52.828 155.418-211.838V417.447H0V584.16z" />
        </svg>
      </div>

      <div className="page-shell relative z-10 text-center flex flex-col items-center">
        <h1 className="font-ui text-[clamp(6rem,15vw,10rem)] font-bold leading-none tracking-tighter text-[var(--teal)] drop-shadow-sm">
          404
        </h1>
        <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-semibold text-[var(--charcoal)]">
          Page not found
        </h2>
        <p className="mt-4 max-w-lg text-lg leading-8 text-[var(--slate)]">
          Sorry, we couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-8 py-4 text-sm font-semibold text-[var(--charcoal)] shadow-[0_18px_40px_rgba(244,180,0,0.28)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#ffd04d]"
        >
          Return to home
        </button>
      </div>
    </section>
  );
}

export default App;
