import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Accessibility,
  AlignLeft,
  ArrowRight,
  ArrowUp,
  ArrowLeftRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Contrast,
  EyeOff,
  ExternalLink,
  Languages,
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
  Truck,
  Type,
  X,
} from 'lucide-react';
import { getStoredLanguage, useSiteTranslation } from './i18n';
import { translateTextValue } from './i18n';
import type { Language } from './i18n';

type BaseRoutePath =
  | '/'
  | '/about-us'
  | '/services'
  | '/medical-supplies'
  | '/resources'
  | '/insurance-accepted'
  | '/contact-us'
  | '/auto-rx-refills'
  | '/free-prescription-delivery'
  | '/refill-prescription'
  | '/transfer-prescription';

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

const homeHeroImage =
  '/assets/hero-doctor-pharmacy.png';

const heroQuickActions = [
  {
    top: 'Subscribe to',
    bottom: 'Auto Rx Refills',
    icon: Clock3,
    route: '/auto-rx-refills',
    cardClass: 'border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(236,250,247,0.92))] text-[var(--charcoal)] shadow-[0_18px_42px_rgba(15,72,68,0.18)]',
    iconClass: 'bg-[#0f766e] text-white shadow-[0_10px_22px_rgba(15,118,110,0.22)]',
    bottomClass: 'text-[var(--teal)]',
  },
  {
    top: 'Prescription',
    bottom: 'Refill',
    icon: RotateCcw,
    route: '/refill-prescription',
    cardClass: 'border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,248,225,0.94))] text-[var(--charcoal)] shadow-[0_18px_42px_rgba(160,104,0,0.16)]',
    iconClass: 'bg-[var(--gold)] text-[var(--charcoal)] shadow-[0_10px_22px_rgba(244,180,0,0.24)]',
    bottomClass: 'text-[#9a6500]',
  },
  {
    top: 'Free Prescription',
    bottom: 'Delivery',
    icon: Truck,
    route: '/free-prescription-delivery',
    cardClass: 'border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,238,232,0.94))] text-[var(--charcoal)] shadow-[0_18px_42px_rgba(189,88,54,0.15)]',
    iconClass: 'bg-[#ef8b68] text-[#2b1711] shadow-[0_10px_22px_rgba(239,139,104,0.24)]',
    bottomClass: 'text-[#b75535]',
  },
  {
    top: 'Transfer',
    bottom: 'Prescription',
    icon: ArrowLeftRight,
    route: '/transfer-prescription',
    cardClass: 'border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(231,241,250,0.94))] text-[var(--charcoal)] shadow-[0_18px_42px_rgba(18,63,103,0.16)]',
    iconClass: 'bg-[#123f67] text-white shadow-[0_10px_22px_rgba(18,63,103,0.24)]',
    bottomClass: 'text-[#123f67]',
  },
] as const;

const homeServiceHighlights = [
  {
    top: 'Transfer',
    bottom: 'Prescription',
    route: '/transfer-prescription',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1400&q=80',
    category: 'Prescription Support',
    description: 'A simpler transfer process for patients moving prescriptions from another pharmacy.',
  },
  {
    top: 'Prescription',
    bottom: 'Refill',
    route: '/refill-prescription',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
    category: 'Prescription Support',
    description: 'Fast refill support for existing prescriptions before medication runs low.',
  },
  {
    top: 'Compounding',
    bottom: '(Non-Sterile)',
    route: '/services/non-sterile-compounding',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80',
    category: 'Custom Medications',
    description: 'Patient-specific non-sterile compounding support when standard options are not the right fit.',
  },
  {
    top: 'Seasonal',
    bottom: 'Vaccinations',
    route: '/services/seasonal-vaccinations',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1400&q=80',
    category: 'Preventive Care',
    description: 'Convenient seasonal and routine immunization support based on eligibility and availability.',
  },
  {
    top: 'Price',
    bottom: 'Matching',
    route: '/insurance-accepted',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1600&q=80',
    category: 'Affordability',
    description: 'Clear insurance and pricing support to help you understand your options.',
  },
] as const;

const navItems: NavItem[] = [
  { path: '/', label: 'Home', subtitle: 'Welcome Page' },
  { path: '/about-us', label: 'About Us', subtitle: 'Who We Are' },
  { path: '/services', label: 'Services', subtitle: 'We Offer' },
  { path: '/medical-supplies', label: 'Medical Supplies', subtitle: 'Our Products' },
  { path: '/resources', label: 'Resources', subtitle: 'Useful Links' },
  { path: '/contact-us', label: 'Contact Us', subtitle: 'Keep in Touch' },
];

const usStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
] as const;

const serviceCards: ServiceCard[] = [
  {
    slug: '4-prescriptions',
    category: 'Affordability',
    intro: 'Budget-friendly prescription support for eligible commonly prescribed medications.',
    title: '$4 Prescriptions',
    description: 'Clearer pricing conversations and low-cost prescription support for eligible medications.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Cost-conscious options for eligible low-cost medications',
      'Clear pickup and refill expectations',
      'Friendly guidance when insurance does not fit the need',
    ],
    supportNote: 'Best for patients who want simpler pricing conversations and help understanding lower-cost options.',
  },
  {
    slug: 'medication-synchronization',
    category: 'Adherence',
    intro: 'Line up ongoing prescriptions into one easier monthly refill rhythm.',
    title: 'Medication Synchronization',
    description: 'Medication alignment, refill planning, and organized pharmacist support for long-term routines.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=80',
    details: [
      'One planned refill date for eligible ongoing prescriptions',
      'Ongoing communication when timing changes are needed',
      'Useful for caregivers, busy households, and long-term routines',
    ],
    supportNote: 'A good fit for patients who want their maintenance refills to feel less scattered.',
  },
  {
    slug: 'prescription-refill',
    category: 'Prescription Support',
    intro: 'Fast refill support for existing prescriptions before medication runs low.',
    title: 'Prescription Refill',
    description: 'Refill coordination, pharmacist communication, and steady support for recurring medication needs.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Refill request intake and readiness support',
      'Help resolving timing questions before medications run out',
      'A smoother process for repeat monthly prescriptions',
    ],
    supportNote: 'Designed for patients who want quick refill follow-through with neighborhood pharmacy care.',
  },
  {
    slug: 'non-sterile-compounding',
    category: 'Custom Medications',
    intro: 'Patient-specific non-sterile compounding support when standard options are not the right fit.',
    title: 'Non-Sterile Compounding',
    description: 'Customized medication preparation support for selected strengths, dosage forms, or ingredients.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Support when a patient needs a customized strength or dosage form',
      'Helpful in some cases involving allergies, swallowing difficulty, or pediatric needs',
      'Pharmacy coordination around patient-specific prescriptions',
    ],
    supportNote: 'Useful when a prescriber determines a customized non-sterile preparation is appropriate.',
  },
  {
    slug: 'diabetes-specialty-care-center',
    category: 'Chronic Care',
    intro: 'Practical pharmacy support for diabetes medication routines and supply coordination.',
    title: 'Diabetes Specialty Care Center',
    description: 'Support for medication routines, diabetic supplies, and clearer day-to-day coordination.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Coordination around diabetic supplies and medication pickups',
      'Organization help for recurring care routines',
      'Useful for patients managing multiple diabetes-related items each month',
    ],
    supportNote: 'Built around consistency, easier pickups, and better organization for ongoing care.',
  },
  {
    slug: 'durable-medical-equipment',
    category: 'Medical Supplies',
    intro: 'Selected home-use health equipment support for safer, more manageable routines.',
    title: 'Durable Medical Equipment',
    description: 'Home-health equipment support for comfort, mobility, and safer day-to-day care at home.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Common home-care and mobility-related equipment support',
      'Help understanding product categories and next steps',
      'Useful for caregivers planning safer routines at home',
    ],
    supportNote: 'A good fit for families combining pharmacy support with practical home-care essentials.',
  },
  {
    slug: 'free-prescription-delivery',
    category: 'Convenience',
    intro: 'Free local prescription delivery for patients, caregivers, and busy households.',
    title: 'Free Prescription Delivery',
    description: 'Local delivery coordination for prescriptions and essentials to reduce missed pickups.',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Helpful for patients with transportation, schedule, or caregiving challenges',
      'Supports continuity when pickups are difficult',
      'A practical extension of neighborhood pharmacy care',
    ],
    supportNote: 'Designed to keep medication access easier when a pharmacy trip is hard to fit in.',
  },
  {
    slug: 'free-consultations',
    category: 'Pharmacist Access',
    intro: 'Easy access to the pharmacy team for general medication and service questions.',
    title: 'Free Consultations',
    description: 'One-on-one pharmacist access for questions about services, routines, and next steps.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80',
    details: [
      'General pharmacy guidance and patient support conversations',
      'A welcoming place to ask routine medication questions',
      'Useful before starting a transfer, packaging, or sync plan',
    ],
    supportNote: 'Best for patients who want answers from a real local pharmacy team.',
  },
  {
    slug: 'generic-and-brand-name-drugs',
    category: 'Prescription Access',
    intro: 'Prescription support across common generic and brand-name medication needs.',
    title: 'Generic and Brand Name Drugs',
    description: 'Medication access support across common generic and brand-name prescriptions.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Support comparing brand and generic availability',
      'Clearer conversations around routine prescription options',
      'Helpful for patients balancing cost, familiarity, and continuity',
    ],
    supportNote: 'Focused on access, clarity, and making prescription choices easier to understand.',
  },
  {
    slug: 'medication-therapy-management',
    category: 'Clinical Support',
    intro: 'Medication review support for patients taking multiple medicines.',
    title: 'Medication Therapy Management',
    description: 'Personal medication reviews that help patients understand their medication routine.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Medication list review and organization support',
      'Helps surface timing, duplication, or adherence questions',
      'Especially useful for patients on multiple long-term medications',
    ],
    supportNote: 'Often works well alongside synchronization for more organized routines.',
  },
  {
    slug: 'next-day-special-order',
    category: 'Access',
    intro: 'Special-order coordination when selected medications or products are not routinely stocked.',
    title: 'Next-Day Special Order',
    description: 'Fast special-order support for selected medications and pharmacy products.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Useful when a product is not part of standard daily stock',
      'Clear communication around timing and next steps',
      'Helps patients avoid calling multiple locations to check availability',
    ],
    supportNote: 'Built around local follow-through and keeping patients informed while orders are in process.',
  },
  {
    slug: 'otc-and-herbal-supplements',
    category: 'Everyday Essentials',
    intro: 'Over-the-counter and herbal supplement guidance for everyday wellness needs.',
    title: 'OTC and Herbal Supplements',
    description: 'Practical product guidance for common OTC items and selected herbal supplements.',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Convenient access to common self-care and household health items',
      'Medication-aware questions to bring to the counter',
      'Supports everyday wellness without overcomplicating the visit',
    ],
    supportNote: 'Focused on practical guidance and safer product conversations at the pharmacy counter.',
  },
  {
    slug: 'hsa-fsa-accepted',
    category: 'Affordability',
    intro: 'HSA and FSA payment support for eligible pharmacy purchases.',
    title: 'HSA / FSA Accepted',
    description: 'Flexible spending support for eligible prescription, OTC, and health-related purchases.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
    details: [
      'HSA and FSA support for eligible purchases',
      'Clearer payment conversations before checkout',
      'Helpful for families managing recurring pharmacy costs',
    ],
    supportNote: 'Useful for patients who want to make eligible health dollars easier to use.',
  },
  {
    slug: 'seasonal-vaccinations',
    category: 'Preventive Care',
    intro: 'Convenient seasonal and routine immunization support based on eligibility and availability.',
    title: 'Seasonal Vaccinations',
    description: 'Vaccination planning, family scheduling support, and preventive care conversations.',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Seasonal vaccine access when offered onsite',
      'Preventive care reminders and scheduling support',
      'Helpful for families, caregivers, and adults staying current on recommendations',
    ],
    supportNote: 'Built for patients who want local, convenient preventive care support.',
  },
  {
    slug: 'transfer-prescriptions',
    category: 'Prescription Support',
    intro: 'Prescription transfer support for patients moving medications into local Marigold care.',
    title: 'Transfer Prescriptions',
    description: 'A simpler transfer process for patients moving prescriptions from another pharmacy.',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Pharmacy-to-pharmacy transfer coordination',
      'Helpful for patients switching to local service or delivery support',
      'A smooth starting point for ongoing Marigold care',
    ],
    supportNote: 'Ideal for new patients who want a more responsive neighborhood pharmacy experience.',
  },
  {
    slug: 'special-order-pet-meds',
    category: 'Specialty Support',
    intro: 'Special-order medication coordination for household pet prescription needs.',
    title: 'Special Order Pet Meds',
    description: 'Pet medication support with practical coordination for veterinary prescriptions.',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1400&q=80',
    details: [
      'Support for selected veterinary prescription needs',
      'Helpful for pet owners balancing both family and pet medications',
      'Local communication when timing and pickup details matter',
    ],
    supportNote: 'A useful extension of neighborhood pharmacy care for households that include pets.',
  },
];

/*
const legacyServiceCards: ServiceCard[] = [
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

*/

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
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1400&q=80',
  },
  {
    category: 'Guide',
    title: 'Safe Medication',
    description: 'Patient-friendly safe-use tips for common medicines, OTC products, storage, and daily routines.',
    href: 'https://www.safemedication.com',
    cta: 'Visit resource',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=1400&q=80',
  },
  {
    category: 'Resource',
    title: 'Institute for Safe Medication Practices',
    description: 'Medication safety education and practical prevention resources for patients and caregivers.',
    href: 'https://www.ismp.org',
    cta: 'Learn more',
    image: 'https://images.unsplash.com/photo-1580281657527-47f249e8f6d5?auto=format&fit=crop&w=1400&q=80',
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
      { slug: '4-prescriptions', note: 'Cost-conscious support for eligible low-cost medications.', glyph: 'billing' },
      { slug: 'prescription-refill', note: 'Quick refill follow-through for recurring prescriptions.', glyph: 'pill' },
      { slug: 'transfer-prescriptions', note: 'Move your prescriptions into local Marigold care.', glyph: 'delivery' },
      { slug: 'generic-and-brand-name-drugs', note: 'Generic and brand-name medication access.', glyph: 'pill' },
    ],
  },
  {
    title: 'Medication support',
    description: 'Tools that keep long-term medication routines organized and easier to manage.',
    items: [
      { slug: 'medication-synchronization', note: 'Align maintenance refills into one monthly rhythm.', glyph: 'sync' },
      { slug: 'non-sterile-compounding', note: 'Custom non-sterile medication support.', glyph: 'flask' },
      { slug: 'medication-therapy-management', note: 'Medication review support for patients taking multiple medicines.', glyph: 'clipboard' },
      { slug: 'next-day-special-order', note: 'Fast special-order coordination.', glyph: 'package' },
    ],
  },
  {
    title: 'Convenience and affordability',
    description: 'Delivery, consultations, equipment, and payment support for everyday care.',
    items: [
      { slug: 'free-prescription-delivery', note: 'Local delivery for prescriptions and everyday essentials.', glyph: 'delivery' },
      { slug: 'free-consultations', note: 'Easy access to pharmacist guidance.', glyph: 'chat' },
      { slug: 'hsa-fsa-accepted', note: 'Eligible HSA and FSA payment support.', glyph: 'billing' },
      { slug: 'durable-medical-equipment', note: 'Home-health equipment and mobility support.', glyph: 'shield' },
    ],
  },
  {
    title: 'Wellness and specialty care',
    description: 'Preventive, OTC, diabetes, and pet-medication support.',
    items: [
      { slug: 'diabetes-specialty-care-center', note: 'Diabetes supply and medication support.', glyph: 'heart' },
      { slug: 'otc-and-herbal-supplements', note: 'OTC and herbal supplement guidance.', glyph: 'leaf' },
      { slug: 'seasonal-vaccinations', note: 'Seasonal and routine immunization support when available.', glyph: 'syringe' },
      { slug: 'special-order-pet-meds', note: 'Special-order support for pet medications.', glyph: 'paw' },
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
      'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1600&q=80',
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
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80',
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

  if (path === '/refill-prescription') {
    return '/refill-prescription';
  }

  if (path === '/auto-rx-refills') {
    return '/auto-rx-refills';
  }

  if (path === '/free-prescription-delivery') {
    return '/free-prescription-delivery';
  }

  if (path === '/transfer-prescription') {
    return '/transfer-prescription';
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

function BrandLockup({ dark = false, compact = false, language = 'en' }: { dark?: boolean; compact?: boolean; language?: Language }) {
  const prefersReducedMotion = useReducedMotion();
  const t = (text: string) => translateTextValue(text, language);

  return (
    <motion.div
      data-no-translate="true"
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
          {t('Pharmacy')}
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

function App() {
  const [route, setRoute] = useState<RoutePath>(() => getCurrentRoute(window.location.pathname));
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const isSplashVisible = false;
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(defaultAccessibilitySettings);
  const [accessibilityWidgetSide, setAccessibilityWidgetSide] = useState<'left' | 'right'>('right');
  const [isAccessibilityWidgetHidden, setIsAccessibilityWidgetHidden] = useState(false);

  useSiteTranslation(language);

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [route]);

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
      className={`min-h-screen overflow-x-hidden bg-[var(--cream)] text-[var(--charcoal)] ${accessibilitySettings.oversizedWidget ? 'accessibility-oversized-widget' : ''}`}
    >
      <div
        className={`${
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
        } ${accessibilitySettings.biggerText ? 'accessibility-bigger-text' : ''}`}
      >
        <SplashScreen open={isSplashVisible} />
        <SiteHeader
          route={route}
          language={language}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMenu={() => setIsMobileMenuOpen((value) => !value)}
          onToggleLanguage={() => setLanguage((current) => (current === 'en' ? 'es' : 'en'))}
          onNavigate={navigate}
        />
        <div aria-hidden="true" className="h-[7.4rem] sm:h-[6.5rem]" />

        <div key={language} className="contents">
          {route === '/' ? <HomePage onNavigate={navigate} language={language} /> : null}
          {route === '/about-us' ? <AboutPage onNavigate={navigate} /> : null}
          {route === '/services' ? <ServicesPage onNavigate={navigate} /> : null}
          {currentService ? <ServiceDetailPage service={currentService} onNavigate={navigate} /> : null}
          {route === '/medical-supplies' ? <MedicalSuppliesPage /> : null}
          {route === '/resources' ? <ResourcesPage /> : null}
          {route === '/insurance-accepted' ? <InsuranceAcceptedPage onNavigate={navigate} /> : null}
          {route === '/auto-rx-refills' ? <AutoRxRefillsPage /> : null}
          {route === '/free-prescription-delivery' ? <FreePrescriptionDeliveryPage /> : null}
          {route === '/refill-prescription' ? <RefillPrescriptionPage /> : null}
          {route === '/transfer-prescription' ? <TransferPrescriptionPage /> : null}
          {route === '/contact-us' ? <ContactPage /> : null}
          {!['/', '/about-us', '/services', '/medical-supplies', '/resources', '/insurance-accepted', '/contact-us', '/auto-rx-refills', '/free-prescription-delivery', '/refill-prescription', '/transfer-prescription'].includes(route) && !currentService ? <NotFoundPage onNavigate={navigate} /> : null}
        </div>

        <Footer route={route} language={language} onNavigate={navigate} />
      </div>

      <AccessibilityWidget
        isOpen={isAccessibilityOpen}
        settings={accessibilitySettings}
        side={accessibilityWidgetSide}
        isHidden={isAccessibilityWidgetHidden}
        isVisible={route !== '/' || isScrollVisible}
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
        onReset={() => {
          setAccessibilitySettings(defaultAccessibilitySettings);
          setIsAccessibilityOpen(false);
        }}
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
  language,
  isMobileMenuOpen,
  onToggleMenu,
  onToggleLanguage,
  onNavigate,
}: {
  route: RoutePath;
  language: Language;
  isMobileMenuOpen: boolean;
  onToggleMenu: () => void;
  onToggleLanguage: () => void;
  onNavigate: (path: RoutePath) => void;
}) {
  const isHeroHeaderRoute = route === '/' || route === '/about-us';
  const [closeDropdown, setCloseDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const t = (text: string) => translateTextValue(text, language);

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
        <div className="mx-auto flex max-w-[1440px] flex-col flex-wrap items-center justify-center gap-1 px-3 py-1.5 text-center sm:flex-row sm:gap-2 sm:px-6 sm:py-2">
          <p className="text-[0.61rem] font-medium leading-[1.35] sm:leading-none sm:text-[0.72rem] lg:text-[0.84rem]">
            {t('Personalized pharmacy care and free local delivery for Kissimmee.')}
          </p>
          <span className="hidden h-4 w-px bg-[rgba(26,65,85,0.35)] sm:block" aria-hidden="true" />
          <a
            href={`tel:${phoneNumber.replace(/-/g, '')}`}
            className="inline-flex items-center justify-center gap-1 text-[0.65rem] font-semibold leading-none transition hover:opacity-80 sm:text-[0.72rem] lg:text-[0.84rem]"
          >
            <Phone size={12} />
            {t('Call')} {phoneNumber}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <button type="button" onClick={() => handleNavigate('/')} className="shrink-0">
          <BrandLockup dark={isHeroHeaderRoute} language={language} />
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
                    {t(item.label)}
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
                            {t('Explore Marigold services')}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[var(--slate)]">
                            {t('All the pharmacy support you see on the site, grouped for fast navigation.')}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleNavigate('/services')}
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--charcoal)] shadow-[0_14px_30px_rgba(244,180,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffd04d]"
                        >
                          {t('View all services')}
                          <ArrowRight size={15} />
                        </button>
                      </div>

                      <div className="grid gap-0 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
                        {serviceMenuGroups.map((group) => (
                          <div key={group.title} className="border-r border-slate-100 p-4 last:border-r-0">
                            <div className="px-2 pb-4">
                              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--charcoal)]">{t(group.title)}</p>
                              <p className="mt-2 text-sm leading-6 text-[var(--slate)]">{t(group.description)}</p>
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
                                      <span className="block text-sm font-semibold leading-5 text-[var(--charcoal)]">{t(card.title)}</span>
                                      <span className="mt-1 block text-xs leading-5 text-[var(--slate)]">{t(entry.note)}</span>
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
                {t(item.label)}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          data-no-translate="true"
          aria-label={language === 'en' ? 'Switch language to Spanish' : 'Cambiar idioma a inglés'}
          onClick={onToggleLanguage}
          className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[0.72rem] font-bold shadow-[0_14px_28px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 sm:h-11 sm:gap-2 sm:px-4 sm:text-sm ${
            isHeroHeaderRoute
              ? 'border-[#ffe08a]/70 bg-[var(--gold)] text-[var(--charcoal)] hover:bg-[#ffd04d]'
              : 'border-[rgba(15,118,110,0.18)] bg-[var(--teal)] text-white hover:bg-[#0b645e]'
          }`}
        >
          <Languages size={17} />
          <span>{language === 'en' ? 'EN' : 'ES'}</span>
          <ArrowLeftRight size={14} aria-hidden="true" />
          <span>{language === 'en' ? 'ES' : 'EN'}</span>
        </button>

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

      <AnimatePresence initial={false}>
        {isMobileMenuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full border-t border-[rgba(15,118,110,0.1)] bg-[#f7f4eb] px-4 py-4 shadow-[0_20px_40px_rgba(15,23,42,0.15)] sm:px-6 lg:hidden"
          >
            <div className="space-y-3">
              {navItems.map((item, index) => {
                const isActive = route === item.path || (route.startsWith('/services/') && item.path === '/services');
                const isContactItem = item.path === '/contact-us';

                return (
                  <motion.button
                    key={item.path}
                    type="button"
                    onClick={() => handleNavigate(item.path)}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className={`block w-full rounded-[1.2rem] px-4 py-3 text-center font-heading text-[1.1rem] font-medium tracking-[-0.01em] transition-colors ${
                      isContactItem
                        ? 'text-[var(--gold)]'
                        : isActive
                          ? 'text-[var(--teal)]'
                          : 'text-[var(--charcoal)]'
                    }`}
                  >
                    {t(item.label)}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

    </header>
  );
}

function HomePage({
  onNavigate,
  language,
}: {
  onNavigate: (path: RoutePath) => void;
  language: Language;
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(-1);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [isContactMapLoaded, setIsContactMapLoaded] = useState(true);
  const testimonialsTrackRef = useRef<HTMLDivElement | null>(null);
  const t = (text: string) => translateTextValue(text, language);

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
  const isSpanish = language === 'es';
  const heroTitleClass = isSpanish
    ? 'font-ui text-[2.25rem] font-bold leading-[1] tracking-normal text-white sm:text-[2.85rem] lg:text-[3.45rem] xl:text-[3.85rem]'
    : 'font-ui text-[clamp(2.45rem,4.3vw,4.45rem)] font-bold leading-[0.98] tracking-[-0.035em] text-white sm:text-[clamp(2.85rem,4.7vw,4.45rem)]';
  const heroLineClass = isSpanish ? 'block max-w-[11ch] text-balance' : 'block whitespace-nowrap';
  const quickActionTopClass = isSpanish ? 'text-[14px] sm:text-[15px] lg:text-[16px]' : 'text-[15px] sm:text-[16px] lg:text-[17px]';
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
      <section className="relative flex min-h-[calc(100svh-7.4rem)] items-center overflow-hidden bg-[#eef8f5] text-white sm:min-h-[calc(100svh-6.5rem)]">
        <img
          src={homeHeroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[84%_45%] sm:object-[78%_48%] lg:object-[72%_52%]"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,45,40,0.58)_0%,rgba(8,59,53,0.36)_42%,rgba(8,59,53,0.12)_72%,rgba(8,59,53,0.02)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,17,0.18)_0%,rgba(4,18,17,0.02)_44%,rgba(4,18,17,0.24)_100%)]" />
        <HomeHeroBackdrop />
        <div className="grid min-h-[calc(100svh-7.4rem)] w-full items-center px-4 py-12 sm:min-h-[calc(100svh-6.5rem)] sm:px-8 sm:py-14 lg:px-[clamp(2rem,5vw,6rem)] lg:py-16">
          <div className="relative z-10 flex max-w-[34rem] flex-col justify-center self-center pt-8 text-left sm:pt-12 lg:pt-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#fff5cc]">{t('Personalized care in Kissimmee')}</p>
            <h1 className={heroTitleClass}>
              <span className={`mt-5 ${heroLineClass}`}>{t('Your Health.')}</span>
              <span className={`${heroLineClass} text-[rgba(255,245,216,0.98)]`}>{t('Our Priority.')}</span>
            </h1>
            <p className="mt-7 max-w-[31rem] text-[1rem] leading-8 text-white/82 sm:text-[1.08rem]">
              {t(
                'Personalized pharmacy care, refills, delivery, immunizations, and wellness support for Kissimmee.',
              )}
            </p>
            <div className="mt-10 grid w-full max-w-[460px] grid-cols-2 justify-start gap-3 sm:mt-12 sm:gap-4">
              {heroQuickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.bottom}
                    type="button"
                    onClick={() => onNavigate(item.route)}
                    className={`group relative flex min-h-[96px] items-center gap-3 overflow-hidden rounded-[1rem] border px-4 py-4 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.18)] ${item.cardClass}`}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-current opacity-20" />
                    <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}>
                      <Icon size={19} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0">
                      <div className={`${quickActionTopClass} whitespace-nowrap font-semibold leading-tight`}>{t(item.top)}</div>
                      <div className={`mt-0.5 whitespace-nowrap text-[14px] font-semibold leading-tight sm:text-[15px] ${item.bottomClass}`}>{t(item.bottom)}</div>
                    </div>
                  </button>
                );
              })}
            </div>

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

      <section className="section-pad relative overflow-hidden min-h-[42vh]">
        <div className="pointer-events-none absolute left-[-2rem] top-[-2rem] z-0 h-[16rem] w-[16rem] opacity-100 transform rotate-[25deg]">
          <CircularTabletShape className="h-full w-full text-[var(--gold)] drop-shadow-[0_20px_40px_rgba(244,180,0,0.3)]" />
        </div>
        <div className="container-shell relative z-10">
          <div className="mb-5 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">{t('Pharmacy services')}</p>
            <h2 className="text-3xl font-bold text-[var(--charcoal)] sm:text-4xl">
              {t('Core pharmacy services')}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--slate)]">
              {t('Refills, delivery, transfers, and everyday medication support in one place.')}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {homeServiceHighlights.map((card) => {
              return (
                <button
                  key={`${card.top}-${card.bottom}`}
                  type="button"
                  onClick={() => onNavigate(card.route)}
                  className="group relative min-h-[18rem] overflow-hidden rounded-[1.6rem] bg-[#0c1c25] text-left shadow-[0_22px_48px_rgba(15,118,110,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(15,118,110,0.12)]"
                >
                  <img
                    src={card.image}
                    alt={t(`${card.top} ${card.bottom}`)}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/58 to-black/24" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">{t(card.category)}</p>
                    <h3 className="mt-3 font-heading text-[clamp(1.8rem,3vw,2.55rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                      <span className="block">{t(card.top)}</span>
                      <span className="block">{t(card.bottom)}</span>
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/84 opacity-0 translate-y-2 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {t(card.description)}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-white/92">{t('Click Here')} &gt;</span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white transition group-hover:-translate-y-0.5">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
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
              <div className="w-full border-l border-[rgba(15,118,110,0.12)] pl-6 sm:pl-8">
                <div className="inline-flex rounded-full border border-[rgba(244,180,0,0.16)] bg-[rgba(244,180,0,0.08)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--charcoal)]">
                  Insurance accepted
                </div>
                <h3 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--charcoal)]">
                  We can help you figure out your coverage.
                </h3>
                <p className="mt-4 max-w-[34rem] text-base leading-8 text-[var(--slate)]">
                  We accept most major plans. If something is unclear, we will help you review it. Paying out of pocket?
                  Ask about lower-cost options, including our $4 prescription plan.
                </p>

                <div className="mt-7 space-y-4 border-t border-[rgba(15,118,110,0.12)] pt-6">
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
  return (
    <section className="section-pad pt-10 sm:pt-8 lg:pt-10 relative overflow-hidden min-h-[50vh]">
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
          {serviceCards.map((card) => (
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
  const primaryActionRoute =
    service.slug === 'prescription-refill'
      ? '/refill-prescription'
      : service.slug === 'transfer-prescriptions'
        ? '/transfer-prescription'
        : service.slug === 'free-prescription-delivery'
          ? '/free-prescription-delivery'
          : service.slug === 'medication-synchronization'
            ? '/auto-rx-refills'
            : '/contact-us';
  const primaryActionLabel =
    service.slug === 'prescription-refill'
      ? 'Start refill request'
      : service.slug === 'transfer-prescriptions'
        ? 'Start transfer request'
        : service.slug === 'free-prescription-delivery'
          ? 'Start delivery request'
          : service.slug === 'medication-synchronization'
            ? 'Start Auto Rx request'
            : 'Ask about this service';
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
                <button type="button" onClick={() => onNavigate(primaryActionRoute)} className="btn-primary">
                  {primaryActionLabel}
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
    item: { category: string; title: string; description: string; href: string; cta: string; image?: string },
    index: number,
    size: 'feature' | 'compact' = 'feature',
  ) => {
    const theme = resourceCardThemes[index % resourceCardThemes.length];
    const Icon = theme.Icon;
    const hasImage = Boolean(item.image);

    return (
      <a
        key={item.title}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={`group relative min-h-[13.5rem] overflow-hidden rounded-[1.8rem] border shadow-[0_22px_48px_rgba(15,118,110,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_54px_rgba(15,118,110,0.16)] ${
          hasImage ? 'border-white/12 bg-[#0c1c25] text-white' : theme.shell
        }`}
      >
        {hasImage ? (
          <>
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,14,19,0.16),rgba(5,14,19,0.84))]" />
          </>
        ) : (
          <>
            <div className={`pointer-events-none absolute inset-0 ${theme.accent}`} />
            <div className="pointer-events-none absolute bottom-5 right-5 h-24 w-24 rounded-full border border-white/18 bg-white/8 blur-[1px]" />
          </>
        )}

        <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <p className={`inline-flex rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${
              hasImage ? 'bg-white/14 text-white backdrop-blur-md' : theme.eyebrow
            }`}>
              {item.category}
            </p>
            <span className={`inline-flex h-12 w-12 items-center justify-center rounded-[1rem] ${
              hasImage ? 'bg-white/14 text-white backdrop-blur-md' : theme.iconWrap
            }`}>
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
            <p className={`mt-1.5 max-w-xl text-sm leading-6 sm:text-[15px] ${hasImage ? 'text-white/84' : theme.body}`}>{item.description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className={`text-sm font-semibold ${hasImage ? 'text-white' : theme.cta}`}>{item.cta}</span>
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition group-hover:-translate-y-0.5 ${
              hasImage ? 'text-white' : theme.cta
            }`}>
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

function AutoRxRefillsPage() {
  return (
    <ContentPageShell title="" eyebrow="" intro="" hideShapes>
      <div className="space-y-8">
        <div className="relative left-1/2 right-1/2 -mt-10 w-screen -translate-x-1/2 overflow-hidden border-y border-[rgba(15,118,110,0.1)] bg-[#0c1c25] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.42)] sm:-mt-8 lg:-mt-10">
          <div className="relative min-h-[20rem] sm:min-h-[23rem]">
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600&q=80"
              alt="Medication bottles prepared for automatic refills"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,24,0.12),rgba(7,25,24,0.72))]" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-center sm:p-9">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">Auto Rx refills</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Subscribe to Auto Rx refills
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/86 sm:text-base">
                Tell us which recurring prescriptions you want coordinated and our team will help set up a steadier refill rhythm.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-[1.9rem] border border-[rgba(15,118,110,0.1)] bg-white p-7 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-[rgba(244,180,0,0.18)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--charcoal)]">
                Auto refill request
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--charcoal)] sm:text-4xl">
                Set up recurring refill support
              </h2>
            </div>
            <p className="text-sm font-medium text-[var(--slate)]">* Required information</p>
          </div>

          <form className="mt-8 space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput label="First Name" placeholder="Enter first name here" required />
              <FormInput label="Last Name" placeholder="Enter last name here" required />
              <FormInput label="Phone Number" placeholder="Enter phone number here" required />
              <FormInput label="Date of Birth" placeholder="Enter date of birth here" type="date" required />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">Prescription details</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormInput label="Prescription Name" placeholder="Enter medication name here" required />
                <FormInput label="RX Number" placeholder="Enter RX number here" />
                <FormSelect label="Preferred refill reminder" options={['Phone call', 'Text message', 'No reminder needed']} />
                <FormSelect label="Pickup or delivery" required options={['Pickup', 'Delivery']} />
              </div>
            </div>

            <div>
              <FormLabel label="Notes for the pharmacy team" />
              <textarea
                rows={5}
                placeholder="Add timing, delivery, or medication notes here"
                className="w-full rounded-[22px] border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.02)] px-4 py-3 text-sm text-[var(--charcoal)] outline-none transition-colors placeholder:text-[var(--slate)]/70 focus:border-[var(--teal)]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary">
                Submit Auto Rx request
              </button>
              <a
                href={`tel:${phoneNumber.replace(/-/g, '')}`}
                className="inline-flex items-center justify-center rounded-full border border-[rgba(15,118,110,0.18)] px-6 py-3.5 text-sm font-semibold text-[var(--teal)] transition hover:-translate-y-0.5 hover:border-[var(--teal)]"
              >
                Call {phoneNumber}
              </a>
            </div>
          </form>
        </div>
      </div>
    </ContentPageShell>
  );
}

function RefillPrescriptionPage() {
  const refillNumbers = ['01', '02', '03', '04'] as const;
  const otcRows = [1, 2, 3, 4, 5] as const;

  return (
    <ContentPageShell
      title=""
      eyebrow=""
      intro=""
      hideShapes
    >
      <div className="space-y-8">
        <div className="relative left-1/2 right-1/2 -mt-10 w-screen -translate-x-1/2 overflow-hidden border-y border-[rgba(15,118,110,0.1)] bg-[#0c1c25] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.42)] sm:-mt-8 lg:-mt-10">
          <div className="relative min-h-[20rem] sm:min-h-[23rem]">
            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80"
              alt="Medicine in a light-protected bottle"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,24,0.12),rgba(7,25,24,0.72))]" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-center sm:p-9">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">Prescription support</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Refill Prescription
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/86 sm:text-base">
                Need a refill? Send us the details below and our team will prepare your medication for pickup or local delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-[1.9rem] border border-[rgba(15,118,110,0.1)] bg-white p-7 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-[rgba(244,180,0,0.18)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--charcoal)]">
                Refill request
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--charcoal)] sm:text-4xl">
                Refill your prescription
              </h2>
            </div>
            <p className="text-sm font-medium text-[var(--slate)]">* Required information</p>
          </div>

          <form className="mt-8 space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">Who is this prescription for?</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormInput label="Last Name" placeholder="Enter last name here" required />
                <FormInput label="First Name" placeholder="Enter first name here" required />
              </div>
              <div className="mt-4 max-w-xl">
                <FormInput label="Phone Number" placeholder="Enter phone number here" required />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">RX refill numbers</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {refillNumbers.map((number, index) => (
                  <div key={number} className="rounded-[1.4rem] border border-[rgba(15,118,110,0.1)] bg-[rgba(15,118,110,0.02)] p-3">
                    <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--teal)] text-xs font-semibold tracking-[0.18em] text-white">
                      {number}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter RX refill number here"
                      className="w-full rounded-[16px] border border-[rgba(15,118,110,0.12)] bg-white px-4 py-3 text-sm text-[var(--charcoal)] outline-none transition-colors placeholder:text-[var(--slate)]/70 focus:border-[var(--teal)]"
                      aria-label={`RX refill number ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">Add over-the-counter items</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--slate)]">Optional: include a few additional items you want prepared with the refill.</p>
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-[1.6rem] border border-[rgba(15,118,110,0.1)]">
                <div className="hidden grid-cols-[1.4fr_0.8fr] gap-4 bg-[rgba(15,118,110,0.06)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--teal)] sm:grid">
                  <p>Name</p>
                  <p>Qty</p>
                </div>
                <div className="divide-y divide-[rgba(15,118,110,0.08)] bg-white">
                  {otcRows.map((row) => (
                    <div key={row} className="grid gap-4 px-4 py-4 sm:grid-cols-[1.4fr_0.8fr] sm:px-5">
                      <FormInput label={`Item ${row} Name`} placeholder="Enter name here" />
                      <FormInput label={`Item ${row} Qty`} placeholder="Enter quantity here" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <FormLabel label="Pickup or delivery" required />
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Pickup', 'Delivery'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 rounded-[18px] border border-[rgba(15,118,110,0.12)] bg-[rgba(15,118,110,0.02)] px-4 py-3 text-sm text-[var(--charcoal)]"
                    >
                      <input type="radio" name="pickup-or-delivery" className="accent-[var(--teal)]" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="max-w-xl">
                <FormSelect
                  label="Notify me when ready"
                  options={['No, thanks', 'Yes, via phone']}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary">
                Submit refill request
              </button>
              <a
                href={`tel:${phoneNumber.replace(/-/g, '')}`}
                className="inline-flex items-center justify-center rounded-full border border-[rgba(15,118,110,0.18)] px-6 py-3.5 text-sm font-semibold text-[var(--teal)] transition hover:-translate-y-0.5 hover:border-[var(--teal)]"
              >
                Call {phoneNumber}
              </a>
            </div>
          </form>
        </div>
      </div>
    </ContentPageShell>
  );
}

function FreePrescriptionDeliveryPage() {
  return (
    <ContentPageShell title="" eyebrow="" intro="" hideShapes>
      <div className="space-y-8">
        <div className="relative left-1/2 right-1/2 -mt-10 w-screen -translate-x-1/2 overflow-hidden border-y border-[rgba(15,118,110,0.1)] bg-[#0c1c25] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.42)] sm:-mt-8 lg:-mt-10">
          <div className="relative min-h-[20rem] sm:min-h-[23rem]">
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80"
              alt="Prescription delivery coordination"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,24,0.12),rgba(7,25,24,0.72))]" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-center sm:p-9">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">Free prescription delivery</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Request prescription delivery
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/86 sm:text-base">
                Share your delivery details and our pharmacy team will coordinate the next step for eligible prescriptions.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-[1.9rem] border border-[rgba(15,118,110,0.1)] bg-white p-7 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-[rgba(244,180,0,0.18)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--charcoal)]">
                Delivery request
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--charcoal)] sm:text-4xl">
                Free prescription delivery
              </h2>
            </div>
            <p className="text-sm font-medium text-[var(--slate)]">* Required information</p>
          </div>

          <form className="mt-8 space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput label="First Name" placeholder="Enter first name here" required />
              <FormInput label="Last Name" placeholder="Enter last name here" required />
              <FormInput label="Phone Number" placeholder="Enter phone number here" required />
              <FormInput label="RX Number" placeholder="Enter RX number here" />
              <div className="sm:col-span-2">
                <FormInput label="Delivery Address" placeholder="Enter delivery address here" required />
              </div>
              <FormInput label="City" placeholder="Enter city here" required />
              <FormSelect label="State" required options={usStates} />
              <FormInput label="Zip / Postal Code" placeholder="Enter zip or postal code here" required />
              <FormSelect label="Best delivery window" options={['Morning', 'Afternoon', 'Any available time']} />
            </div>

            <div>
              <FormLabel label="Delivery notes" />
              <textarea
                rows={5}
                placeholder="Add gate codes, preferred contact method, or delivery notes here"
                className="w-full rounded-[22px] border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.02)] px-4 py-3 text-sm text-[var(--charcoal)] outline-none transition-colors placeholder:text-[var(--slate)]/70 focus:border-[var(--teal)]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary">
                Submit delivery request
              </button>
              <a
                href={`tel:${phoneNumber.replace(/-/g, '')}`}
                className="inline-flex items-center justify-center rounded-full border border-[rgba(15,118,110,0.18)] px-6 py-3.5 text-sm font-semibold text-[var(--teal)] transition hover:-translate-y-0.5 hover:border-[var(--teal)]"
              >
                Call {phoneNumber}
              </a>
            </div>
          </form>
        </div>
      </div>
    </ContentPageShell>
  );
}

function TransferPrescriptionPage() {
  const transferRows = [1, 2, 3, 4, 5] as const;

  return (
    <ContentPageShell
      title=""
      eyebrow=""
      intro=""
      hideShapes
    >
      <div className="space-y-8">
        <div className="relative left-1/2 right-1/2 -mt-10 w-screen -translate-x-1/2 overflow-hidden border-y border-[rgba(15,118,110,0.1)] bg-[#0c1c25] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.42)] sm:-mt-8 lg:-mt-10">
          <div className="relative min-h-[20rem] sm:min-h-[23rem]">
            <img
              src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1600&q=80"
              alt="Pharmacy team helping a patient transfer prescriptions"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,24,0.12),rgba(7,25,24,0.72))]" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-center sm:p-9">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">Prescription transfer</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Transfer Prescription
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/86 sm:text-base">
                Ready to switch pharmacies? Share the details below and we can start the transfer process for you.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-[1.9rem] border border-[rgba(15,118,110,0.1)] bg-white p-7 shadow-[0_22px_48px_rgba(15,118,110,0.08)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-[rgba(244,180,0,0.18)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--charcoal)]">
                Transfer request
              </div>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--charcoal)] sm:text-4xl">
                Start a prescription transfer
              </h2>
            </div>
            <p className="text-sm font-medium text-[var(--slate)]">* Required information</p>
          </div>

          <form className="mt-8 space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput label="First Name" placeholder="Enter first name here" required />
              <FormInput label="Last Name" placeholder="Enter last name here" required />
              <FormInput label="Date of Birth" placeholder="Enter date of birth here" type="date" required />
              <FormInput label="Phone Number" placeholder="Enter phone number here" required />
              <div className="sm:col-span-2 sm:max-w-3xl">
                <FormInput label="Address" placeholder="Enter address here" required />
              </div>
              <FormInput label="City" placeholder="Enter city here" required />
              <FormSelect label="State" required options={usStates} />
              <FormInput label="Zip / Postal Code" placeholder="Enter zip or postal code here" required />
              <FormInput label="Pharmacy Name" placeholder="Enter pharmacy name here" required />
              <FormInput label="Pharmacy Phone" placeholder="Enter pharmacy phone here" required />
            </div>

            <div className="rounded-[1.7rem] border border-[rgba(15,118,110,0.1)] bg-[rgba(15,118,110,0.02)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">Prescription to be transferred</p>
              <div className="mt-4 flex items-start gap-3 rounded-[1rem] bg-white px-4 py-4 text-sm leading-7 text-[var(--charcoal)] shadow-[0_12px_26px_rgba(15,118,110,0.06)]">
                <input type="checkbox" className="mt-1 accent-[var(--teal)]" />
                <p>Transfer all my prescriptions</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--slate)]">
                If you only want certain prescriptions moved, list them below.
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.6rem] border border-[rgba(15,118,110,0.1)]">
              <div className="hidden grid-cols-[1fr_1fr] gap-4 bg-[rgba(15,118,110,0.06)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--teal)] sm:grid">
                <p>Medication name</p>
                <p>Prescription number from current pharmacy</p>
              </div>
              <div className="divide-y divide-[rgba(15,118,110,0.08)] bg-white">
                {transferRows.map((row) => (
                  <div key={row} className="grid gap-4 px-4 py-4 sm:grid-cols-2 sm:px-5">
                    <FormInput label={`Rx${row} Med Name`} placeholder="Enter medication name here" />
                    <FormInput label={`Rx${row} Number`} placeholder="Enter prescription number here" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary">
                Submit transfer request
              </button>
              <a
                href={`tel:${phoneNumber.replace(/-/g, '')}`}
                className="inline-flex items-center justify-center rounded-full border border-[rgba(15,118,110,0.18)] px-6 py-3.5 text-sm font-semibold text-[var(--teal)] transition hover:-translate-y-0.5 hover:border-[var(--teal)]"
              >
                Call {phoneNumber}
              </a>
            </div>
          </form>
        </div>
      </div>
    </ContentPageShell>
  );
}

function ContactPage() {
  return (
    <ContentPageShell
      title=""
      eyebrow=""
      intro=""
      hideShapes
    >
      <div className="space-y-8">
        <div className="relative left-1/2 right-1/2 -mt-10 w-screen -translate-x-1/2 overflow-hidden border-y border-[rgba(15,118,110,0.1)] bg-[#0c1c25] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.42)] sm:-mt-8 lg:-mt-10">
          <div className="relative min-h-[20rem] sm:min-h-[23rem]">
            <img
              src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1600&q=80"
              alt="Pharmacy team ready to help patients"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,25,24,0.12),rgba(7,25,24,0.72))]" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-center sm:p-9">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">Local pharmacy help</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Reach a real pharmacy team when questions come up.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/86 sm:text-base">
                Please reach out if you have questions, prescription concerns, or need support from the pharmacy team.
              </p>
            </div>
          </div>
        </div>

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

          <div className="space-y-5">
            <ContactInfoCard compact />
          </div>
        </div>
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
        {eyebrow || title || intro ? (
          <div className="max-w-[52rem] space-y-4">
            {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
            {title ? (
              <h1 className={`font-heading text-[clamp(2.15rem,4vw,3.4rem)] font-semibold leading-[1] tracking-[-0.04em] text-[var(--charcoal)] ${titleClassName}`}>
                {title}
              </h1>
            ) : null}
            {intro ? <p className="text-lg leading-8 text-[var(--slate)]">{intro}</p> : null}
          </div>
        ) : null}
        <div className={eyebrow || title || intro ? 'mt-6' : ''}>{children}</div>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex max-w-full items-center justify-center rounded-full bg-[rgba(15,118,110,0.08)] px-3 py-2 text-center text-[0.64rem] font-semibold uppercase leading-[1.35] tracking-[0.16em] text-[var(--teal)] sm:px-4 sm:text-[0.72rem] sm:tracking-[0.24em]">
      {children}
    </div>
  );
}

function FormLabel({
  label,
  required = false,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">
      {label}
      {required ? <span className="ml-1 text-[#d9822b]">*</span> : null}
    </label>
  );
}

function FormInput({
  label,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FormLabel label={label} required={required} />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-[18px] border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.02)] px-4 py-3 text-sm text-[var(--charcoal)] outline-none transition-colors placeholder:text-[var(--slate)]/70 focus:border-[var(--teal)]"
      />
    </div>
  );
}

function FormSelect({
  label,
  required = false,
  options,
}: {
  label: string;
  required?: boolean;
  options: readonly string[];
}) {
  return (
    <div>
      <FormLabel label={label} required={required} />
      <select className="w-full rounded-[18px] border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.02)] px-4 py-3 text-sm text-[var(--charcoal)] outline-none transition-colors focus:border-[var(--teal)]">
        <option value="">Please select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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
  language,
  onNavigate,
}: {
  route: RoutePath;
  language: Language;
  onNavigate: (path: RoutePath) => void;
}) {
  const t = (text: string) => translateTextValue(text, language);

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
                <BrandLockup dark compact language={language} />
              </div>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/82">
                {t(
                  'Marigold Pharmacy brings personalized prescription care, neighborhood delivery, medication coordination, and warm follow-through to families across Kissimmee.',
                )}
              </p>
              <div className="mt-5 inline-flex flex-col items-start gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  {t('Health Mart affiliated')}
                </p>
                <img
                  src="/assets/health-mart-affiliated.png"
                  alt="Health Mart affiliated"
                  className="block h-auto w-[11.5rem] max-w-full sm:w-[12.75rem]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="min-w-0 space-y-6 lg:pl-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center text-white">
                  <MapPin size={22} />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{t('Address')}</p>
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
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{t('Phone')}</p>
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
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{t('Email')}</p>
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{t('Business Hours')}</p>
              <div className="mt-3 space-y-2 text-sm leading-7 text-white/84">
                {hours.map(([day, value]) => (
                  <div key={day} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-medium text-white">{t(day)}</span>
                    <span className="whitespace-nowrap">{t(value)}</span>
                  </div>
                ))}
                <p className="pt-2 text-sm text-white/72">{t('Serving Kissimmee and nearby Osceola County neighborhoods.')}</p>
              </div>
            </div>

            <div className="min-w-0 lg:pl-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">{t('Navigate')}</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-white/84">
                {navItems.filter(item => item.path !== '/contact-us').map((item) => (
                  <li key={item.path}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.path)}
                      className={`transition hover:text-white ${route === item.path ? 'text-white' : 'text-white/84'}`}
                    >
                      {t(item.label)}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact-us')}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--charcoal)] shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:bg-[#f7f7f7]"
                >
                  {t('Contact Pharmacy')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div className="flex justify-center text-center">
            <p className="text-sm font-medium text-white/76">
              © {new Date().getFullYear()} Marigold Pharmacy. {t('All Rights Reserved.')}
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
          className={`fixed top-1/2 z-[80] inline-flex h-[4.25rem] w-[4.25rem] -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[var(--gold)] text-[var(--charcoal)] shadow-[0_18px_34px_rgba(244,180,0,0.34)] transition hover:scale-105 ${
            side === 'right' ? 'right-2' : 'left-2'
          }`}
        >
          <Accessibility size={24} />
        </button>
      ) : null}

      <button
        type="button"
        aria-label="Open accessibility menu"
        aria-expanded={isOpen}
        onClick={onToggleOpen}
        className={`accessibility-launcher fixed top-1/2 z-[80] -translate-y-1/2 ${launcherSideClass} ${isHidden ? 'hidden' : ''}`}
      >
        <div className="accessibility-launcher-icon" aria-hidden="true">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            className="text-[var(--gold)]"
          >
            <title>Accessibility icon</title>
            <g clipPath="url(#accessibility-launcher-clip)">
              <path
                d="M30 4.42857C44.1227 4.42857 55.5714 15.8773 55.5714 30C55.5714 44.1227 44.1227 55.5714 30 55.5714C15.8773 55.5714 4.42857 44.1227 4.42857 30C4.42857 15.8773 15.8773 4.42857 30 4.42857ZM30 6.42857C16.9819 6.42857 6.42857 16.9819 6.42857 30C6.42857 43.0181 16.9819 53.5714 30 53.5714C43.0181 53.5714 53.5714 43.0181 53.5714 30C53.5714 16.9819 43.0181 6.42857 30 6.42857ZM40.5936 24.6361C40.8208 24.6942 41.0323 24.8028 41.2129 24.9537C41.3927 25.1041 41.5373 25.2927 41.6362 25.506C41.7349 25.7185 41.7857 25.9505 41.7857 26.1965C41.778 26.578 41.6395 26.9452 41.3936 27.2353C41.1464 27.5268 40.8059 27.7221 40.4376 27.7857C38.1922 28.2018 35.9244 28.4828 33.6481 28.6271C33.5049 28.6367 33.3651 28.6759 33.2369 28.7424C33.1082 28.8091 32.994 28.9019 32.9012 29.0154C32.8079 29.1294 32.7383 29.2618 32.6967 29.4044C32.6759 29.4759 32.6623 29.5493 32.6557 29.6152L32.6511 29.7072L32.6599 29.8496L32.8523 31.5976C33.0926 33.7484 33.5345 35.8702 34.1701 37.9296L34.4174 38.6989L34.6846 39.4673L35.9271 42.8464C35.9992 43.0441 36.0318 43.2542 36.023 43.4646C36.0141 43.6751 35.964 43.8817 35.8755 44.0727C35.7867 44.2639 35.6611 44.4355 35.5059 44.5773C35.3502 44.7196 35.1677 44.829 34.99 44.8912C34.8134 44.9616 34.6253 44.9985 34.4204 45C34.1148 44.9943 33.8175 44.8987 33.5651 44.7253C33.4239 44.6283 33.2998 44.5091 33.189 44.3581L33.0827 44.196L33.0074 44.0456L32.6902 43.3563C31.8321 41.4806 31.0485 39.6428 30.3336 37.8221L30.0025 36.9627L29.5751 38.0696C29.3404 38.6637 29.0998 39.2561 28.8537 39.8465L28.4802 40.7305L27.9044 42.0505L27.3109 43.3601L27.0273 43.9426C26.881 44.3389 26.585 44.6608 26.2035 44.837C25.8203 45.0139 25.3832 45.0288 24.9892 44.8784C24.5966 44.7286 24.2796 44.4272 24.1073 44.0414C23.9886 43.7757 23.9447 43.4837 23.9834 43.1769L24.0166 42.9911L24.0668 42.8262L25.3079 39.4507C26.0439 37.4198 26.5852 35.3222 26.9239 33.1917L27.0415 32.3912L27.1413 31.5772L27.3403 29.8382C27.3582 29.6889 27.346 29.5376 27.3045 29.3935C27.2631 29.2497 27.1935 29.1162 27.1 29.0012C27.007 28.8867 26.8923 28.7929 26.7631 28.7253C26.6343 28.658 26.4937 28.6182 26.3535 28.6083C24.0561 28.4627 21.7692 28.1774 19.507 27.7543C19.3016 27.7166 19.1058 27.6379 18.9308 27.5231C18.7564 27.4085 18.6063 27.2602 18.489 27.0868C18.3721 26.9139 18.2902 26.7195 18.2479 26.5149C18.2055 26.3104 18.2035 26.0993 18.2404 25.902C18.2758 25.6952 18.3515 25.4975 18.4633 25.3202C18.5754 25.1425 18.7216 24.9892 18.8933 24.869C19.0655 24.7486 19.26 24.6643 19.4652 24.6211C19.6707 24.5779 19.8826 24.5768 20.0823 24.6167C26.6344 25.8478 33.3529 25.8478 39.898 24.618C40.1283 24.5717 40.366 24.5779 40.5936 24.6361ZM32.8056 16.183C34.352 17.7552 34.352 20.3006 32.8056 21.8729C31.2543 23.4501 28.7353 23.4501 27.184 21.8729C25.6376 20.3007 25.6376 17.7552 27.184 16.183C28.7353 14.6057 31.2543 14.6057 32.8056 16.183Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="accessibility-launcher-clip">
                <rect width="60" height="60" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
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
