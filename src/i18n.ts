import { useEffect, useRef } from 'react';

export type Language = 'en' | 'es';

const translationStorageKey = 'marigold-language';
const supportedLanguages: Language[] = ['en', 'es'];

const translationDictionaries: Record<Language, Record<string, string>> = {
  en: {},
  es: {
  'Home': 'Inicio',
  'About Us': 'Sobre nosotros',
  'About us': 'Sobre nosotros',
  'Services': 'Servicios',
  'Medical Supplies': 'Suministros médicos',
  'Medical supplies': 'Suministros médicos',
  'Resources': 'Recursos',
  'Contact Us': 'Contacto',
  'Contact Pharmacy': 'Contactar a la farmacia',
  'Contact pharmacy': 'Contactar a la farmacia',
  'Marigold Pharmacy': 'Farmacia Marigold',
  'Pharmacy': 'Farmacia',
  'Welcome Page': 'Página de bienvenida',
  'Who We Are': 'Quiénes somos',
  'We Offer': 'Lo que ofrecemos',
  'Our Products': 'Nuestros productos',
  'Useful Links': 'Enlaces útiles',
  'Keep in Touch': 'Manténgase en contacto',
  'Call': 'Llame',
  'Personalized pharmacy care and free local delivery for Kissimmee.':
    'Atención farmacéutica personalizada y entrega local gratuita para Kissimmee.',
  'Personalized care in Kissimmee': 'Atención personalizada en Kissimmee',
  'Your Health.': 'Su salud.',
  'Our Priority.': 'Nuestra prioridad.',
  'Trusted neighborhood pharmacy providing personalized care, prescription services, medication management, free delivery, immunizations, and wellness support for the Kissimmee community.':
    'Una farmacia de vecindario confiable que ofrece atención personalizada, servicios de recetas, manejo de medicamentos, entrega gratuita, vacunas y apoyo de bienestar para la comunidad de Kissimmee.',
  'Personalized pharmacy care, refills, delivery, immunizations, and wellness support for Kissimmee.':
    'Atención farmacéutica personalizada, renovaciones, entrega, vacunas y apoyo de bienestar para Kissimmee.',
  'Refill prescription': 'Renovar receta',
  'Transfer prescription': 'Transferir receta',
  'Refill Prescription': 'Renovar receta',
  'Transfer Prescription': 'Transferir receta',
  'Free Delivery': 'Entrega gratuita',
  'Prescription Transfers': 'Transferencias de recetas',
  'Immunizations': 'Vacunas',
  'Health Mart Partner': 'Socio de Health Mart',
  'Auto RX': 'Auto RX',
  'Auto': 'Auto',
  'Rx': 'Rx',
  'Subscribe to': 'Suscribirse a',
  'Auto Rx Refills': 'Renovaciones Auto Rx',
  'Free Prescription': 'Receta gratuita',
  'Free': 'Gratis',
  'Refills': 'Renovaciones',
  'Prescription': 'Receta',
  'Refill': 'Renovar',
  'Delivery': 'Entrega',
  'Transfer': 'Transferir',
  'Click Here': 'Haga clic aquí',
  'How it works': 'Cómo funciona',
  'Getting pharmacy support should feel effortless.': 'Recibir apoyo de farmacia debe sentirse sencillo.',
  'Right away': 'De inmediato',
  'Send your prescription': 'Envíe su receta',
  'Ask your provider to send it to Marigold Pharmacy, or contact us and we can help guide the transfer.':
    'Pídale a su proveedor que la envíe a Marigold Pharmacy, o contáctenos y podemos ayudarle con la transferencia.',
  'Same day': 'El mismo día',
  'We prepare and coordinate': 'Preparamos y coordinamos',
  'Our team reviews the order, checks coverage when needed, and reaches out with pickup or delivery details.':
    'Nuestro equipo revisa el pedido, verifica la cobertura cuando sea necesario y se comunica con los detalles de recogida o entrega.',
  'Ongoing care': 'Atención continua',
  'Stay on track': 'Manténgase al día',
  'We help with refills, reminders, medication questions, and everyday follow-through so your routine stays steady.':
    'Le ayudamos con renovaciones, recordatorios, preguntas sobre medicamentos y seguimiento diario para que su rutina se mantenga estable.',
  'Pharmacy services': 'Servicios de farmacia',
  'Explore Marigold services': 'Explore los servicios de Marigold',
  'All the pharmacy support you see on the site, grouped for fast navigation.':
    'Todo el apoyo de farmacia del sitio, organizado para navegar más rápido.',
  'Prescription access': 'Acceso a recetas',
  'Refills, transfers, cost clarity, and medication access made easier.':
    'Renovaciones, transferencias, claridad de costos y acceso a medicamentos de forma más sencilla.',
  'Cost-conscious support for eligible low-cost medications.':
    'Apoyo enfocado en costos para medicamentos elegibles de bajo precio.',
  'Quick refill follow-through for recurring prescriptions.':
    'Seguimiento rápido para renovaciones recurrentes.',
  'Move your prescriptions into local Marigold care.':
    'Transfiera sus recetas al cuidado local de Marigold.',
  'Medication support': 'Apoyo con medicamentos',
  'Tools that keep long-term medication routines organized and easier to manage.':
    'Herramientas para mantener las rutinas de medicamentos organizadas y fáciles de manejar.',
  'Align maintenance refills into one monthly rhythm.':
    'Alinee renovaciones de mantenimiento en una rutina mensual.',
  'Medication review support for patients taking multiple medicines.':
    'Revisión de medicamentos para pacientes que toman varios medicamentos.',
  'Time-of-day packaging that simplifies daily routines.':
    'Empaque por horario que simplifica las rutinas diarias.',
  'Prevention & wellness': 'Prevención y bienestar',
  'Convenience, immunizations, screenings, and guidance for everyday wellness.':
    'Conveniencia, vacunas, evaluaciones y orientación para el bienestar diario.',
  'Seasonal and routine immunization support when available.':
    'Apoyo con vacunas de temporada y de rutina cuando estén disponibles.',
  'Screening touchpoints that encourage proactive care.':
    'Evaluaciones que fomentan el cuidado proactivo.',
  'Local delivery for prescriptions and everyday essentials.':
    'Entrega local de recetas y artículos esenciales diarios.',
  'Home & specialty care': 'Cuidado en casa y especializado',
  'Practical items and specialty support that help families manage care at home.':
    'Artículos prácticos y apoyo especializado para ayudar a las familias en casa.',
  'Home-health equipment and mobility support.':
    'Equipo de salud en casa y apoyo de movilidad.',
  'Over-the-counter essentials and budget-friendly items.':
    'Artículos sin receta y opciones económicas.',
  'Pricing clarity and insurance-billing support.':
    'Claridad de precios y apoyo con facturación de seguros.',
  'This is our pharmacy services section': 'Esta es nuestra sección de servicios de farmacia',
  "These are Marigold's core pharmacy services, shown here clearly so you can move quickly to the support you actually need.":
    'Estos son los servicios principales de farmacia de Marigold, presentados claramente para que pueda llegar rápido al apoyo que realmente necesita.',
  'Core pharmacy services': 'Servicios principales de farmacia',
  'Refills, delivery, transfers, and everyday medication support in one place.':
    'Renovaciones, entrega, transferencias y apoyo diario con medicamentos en un solo lugar.',
  '$4 Prescriptions': 'Recetas de $4',
  'Prescription Refill': 'Renovación de receta',
  'Non-Sterile Compounding': 'Preparación no estéril',
  'Free Prescription Delivery': 'Entrega gratuita de recetas',
  'HSA / FSA Accepted': 'Aceptamos HSA / FSA',
  'OTC and Herbal Supplements': 'Productos sin receta y suplementos herbales',
  'Special Order Pet Meds': 'Medicamentos especiales para mascotas',
  'Compounding': 'Preparación',
  '(Non-Sterile)': '(No estéril)',
  'Seasonal': 'Temporada',
  'Vaccinations': 'Vacunas',
  'Price': 'Precio',
  'Matching': 'Igualación',
  'Lower-cost generics and clearer pricing help.':
    'Genéricos de menor costo y ayuda con precios más claros.',
  'Line up refills into one easier monthly routine.':
    'Organice renovaciones en una rutina mensual más sencilla.',
  'Fast refill support before you run low.':
    'Apoyo rápido para renovar antes de quedarse sin medicamento.',
  'Seasonal vaccines and preventive care guidance.':
    'Vacunas de temporada y orientación de cuidado preventivo.',
  'Care made easy': 'Cuidado fácil',
  'Free local delivery': 'Entrega local gratis',
  'Around Kissimmee': 'En Kissimmee',
  'Refill support': 'Apoyo con renovaciones',
  'Fast follow-through': 'Seguimiento rápido',
  'Easy transfers': 'Transferencias fáciles',
  'We help coordinate': 'Ayudamos a coordinar',
  'Need help today?': '¿Necesita ayuda hoy?',
  'Call pharmacy': 'Llamar a la farmacia',
  'View all services': 'Ver todos los servicios',
  'View more': 'Ver más',
  'Show more': 'Mostrar más',
  'Show less': 'Mostrar menos',
  'Helpful resources': 'Recursos útiles',
  'Practical guides and trusted information': 'Guías prácticas e información confiable',
  'A few handpicked resources to help you make informed choices about medications, safety, and everyday health questions.':
    'Algunos recursos seleccionados para ayudarle a tomar decisiones informadas sobre medicamentos, seguridad y preguntas de salud diaria.',
  'Patient stories': 'Historias de pacientes',
  'What people appreciate about Marigold': 'Lo que las personas aprecian de Marigold',
  'A few simple notes on the kind of support we aim to provide every day.':
    'Algunas notas sencillas sobre el tipo de apoyo que buscamos brindar todos los días.',
  'FAQs': 'Preguntas frecuentes',
  'Frequently asked questions': 'Preguntas frecuentes',
  'A few quick answers to common questions about coverage, refills, delivery, and the way our pharmacy support works.':
    'Algunas respuestas rápidas a preguntas comunes sobre cobertura, renovaciones, entrega y cómo funciona nuestro apoyo de farmacia.',
  'Stay Healthy, Be Well.': 'Manténgase sano, siéntase bien.',
  'Are you looking for a pharmacy that cares about your health as much as you do? You have come to the right place.':
    '¿Busca una farmacia que se preocupe por su salud tanto como usted? Ha llegado al lugar correcto.',
  'At Marigold Pharmacy, quality pharmacy care means more than prompt prescriptions. It means the medications you need, guidance that is easy to understand, and the care and attention you deserve.':
    'En Marigold Pharmacy, una atención farmacéutica de calidad significa más que recetas rápidas. Significa los medicamentos que necesita, orientación fácil de entender y la atención que merece.',
  'Insurance accepted': 'Aceptamos seguros',
  'Insurance Accepted': 'Seguros aceptados',
  'We can help you figure out your coverage.': 'Podemos ayudarle a entender su cobertura.',
  'We accept most major plans. If something is unclear, we will help you review it. Paying out of pocket? Ask about lower-cost options, including our $4 prescription plan.':
    'Aceptamos la mayoría de los planes principales. Si algo no está claro, le ayudaremos a revisarlo. ¿Paga de su bolsillo? Pregunte por opciones de menor costo, incluido nuestro plan de recetas de $4.',
  'Bring your card or call us and we will help check what is covered.':
    'Traiga su tarjeta o llámenos y le ayudaremos a revisar qué está cubierto.',
  'Not sure where to start? We are happy to walk you through it.':
    '¿No sabe por dónde empezar? Con gusto le guiaremos paso a paso.',
  'View insurance information': 'Ver información de seguros',
  'Visit Marigold Pharmacy': 'Visite Marigold Pharmacy',
  'Come see us in Kissimmee.': 'Venga a visitarnos en Kissimmee.',
  'The contact section is designed for clarity first, then warmth and reassurance.':
    'La sección de contacto está diseñada primero para la claridad, y luego para ofrecer calidez y tranquilidad.',
  'Address': 'Dirección',
  'Phone': 'Teléfono',
  'Email': 'Correo electrónico',
  'Business Hours': 'Horario comercial',
  'Directions': 'Indicaciones',
  'Hours': 'Horario',
  "Call to confirm today's hours": 'Llame para confirmar el horario de hoy',
  'Get directions to the pharmacy': 'Cómo llegar a la farmacia',
  'Quick access from nearby neighborhoods in Kissimmee': 'Acceso rápido desde vecindarios cercanos en Kissimmee',
  'Need help now?': '¿Necesita ayuda ahora?',
  'Need help now? Call the pharmacy team for prescription questions, transfer help, or quick directions to the right service.':
    '¿Necesita ayuda ahora? Llame al equipo de farmacia para preguntas sobre recetas, ayuda con transferencias o indicaciones rápidas al servicio correcto.',
  'Map preview': 'Vista previa del mapa',
  'View the live map when you need it.': 'Vea el mapa en vivo cuando lo necesite.',
  'Keep the page fast, then open the live map only when you want a closer look.':
    'Mantenemos la página rápida; abra el mapa en vivo solo cuando quiera verlo con más detalle.',
  'Load live map': 'Cargar mapa en vivo',
  'Get directions': 'Cómo llegar',
  'About': 'Acerca de',
  'Our philosophy': 'Nuestra filosofía',
  'More “we are here for you.” Less “next in line.”': 'Más “estamos aquí para usted”. Menos “siguiente en la fila”.',
  'Our people': 'Nuestro equipo',
  'A team that treats every question like it matters.': 'Un equipo que trata cada pregunta como importante.',
  'Our pharmacy': 'Nuestra farmacia',
  'Marigold Pharmacy brings personalized prescription care, neighborhood delivery, medication coordination, and warm follow-through to families across Kissimmee.':
    'Marigold Pharmacy ofrece cuidado personalizado de recetas, entrega local, coordinación de medicamentos y seguimiento cálido a familias en Kissimmee.',
  'Health Mart affiliated': 'Afiliada a Health Mart',
  'Serving Kissimmee and nearby Osceola County neighborhoods.':
    'Sirviendo a Kissimmee y vecindarios cercanos del condado de Osceola.',
  '9:00 AM - 6:00 PM': '9:00 AM - 6:00 PM',
  'All Rights Reserved.': 'Todos los derechos reservados.',
  'Pharmacy care with a more modern rhythm.': 'Atención farmacéutica con un ritmo más moderno.',
  'We are a new kind of pharmacy': 'Somos una nueva clase de farmacia',
  'With love,': 'Con cariño,',
  'Visit our resources': 'Visite nuestros recursos',
  'How we do': 'Cómo lo hacemos',
  'Marigold is...': 'Marigold es...',
  'Simple pharmacy care shaped by warmth, clarity, and a steadier day-to-day experience.':
    'Atención farmacéutica sencilla, basada en calidez, claridad y una experiencia diaria más estable.',
  'Faster': 'Más rápido',
  'Kinder': 'Más amable',
  'Smarter': 'Más inteligente',
  'Better': 'Mejor',
  'Join Marigold': 'Únase a Marigold',
  'Your way to wellness.': 'Su camino al bienestar.',
  'Quality pharmacy care means more than prompt prescriptions. We help patients receive the medications, support, and attention they deserve.':
    'La atención farmacéutica de calidad significa más que recetas rápidas. Ayudamos a los pacientes a recibir los medicamentos, el apoyo y la atención que merecen.',
  'Service support that stays clear, practical, and personal.':
    'Apoyo de servicio que se mantiene claro, práctico y personal.',
  'What to expect': 'Qué esperar',
  'At a glance': 'De un vistazo',
  'Designed to make medication access and next steps feel easier to manage.':
    'Diseñado para que el acceso a medicamentos y los próximos pasos sean más fáciles de manejar.',
  'Helpful for patients who want clarity, quick follow-through, and neighborhood-level support.':
    'Útil para pacientes que desean claridad, seguimiento rápido y apoyo de vecindario.',
  'Our team can help you find the right next step quickly.':
    'Nuestro equipo puede ayudarle a encontrar rápidamente el siguiente paso adecuado.',
  'Call or message the pharmacy if you want help understanding whether this service is the right fit.':
    'Llame o envíe un mensaje a la farmacia si desea ayuda para saber si este servicio es adecuado para usted.',
  'What this service can support': 'Lo que este servicio puede apoyar',
  'Practical ways this service can help.': 'Formas prácticas en que este servicio puede ayudar.',
  'Related services': 'Servicios relacionados',
  'Continue exploring pharmacy support.': 'Siga explorando el apoyo de farmacia.',
  'All services': 'Todos los servicios',
  'Ask about this service': 'Preguntar sobre este servicio',
  'Start refill request': 'Iniciar solicitud de renovación',
  'Start transfer request': 'Iniciar solicitud de transferencia',
  'Quality products for a better life.': 'Productos de calidad para una vida mejor.',
  'We offer a range of supplies and equipment designed to support comfort, safety, and healthier routines at home.':
    'Ofrecemos una variedad de suministros y equipos diseñados para apoyar la comodidad, la seguridad y rutinas más saludables en casa.',
  'Medical supplies support': 'Apoyo de suministros médicos',
  'Supportive products for everyday care at home': 'Productos de apoyo para el cuidado diario en casa',
  'Products that help daily routines feel easier and safer': 'Productos que hacen que las rutinas diarias sean más fáciles y seguras',
  'Useful healthcare resources.': 'Recursos útiles de salud.',
  'Helpful links for medication education, safety, and consumer health information.':
    'Enlaces útiles para educación sobre medicamentos, seguridad e información de salud para consumidores.',
  'Quick links': 'Enlaces rápidos',
  'General reference links for medication safety, OTC guidance, and trusted consumer health information.':
    'Enlaces generales de referencia para seguridad de medicamentos, orientación sobre productos sin receta e información confiable de salud.',
  'Read guide': 'Leer guía',
  'Visit resource': 'Visitar recurso',
  'Learn more': 'Aprender más',
  'Explore all': 'Explorar todo',
  'Open tool': 'Abrir herramienta',
  'Prescription support': 'Apoyo de recetas',
  'Auto Rx refills': 'Renovaciones Auto Rx',
  'Subscribe to Auto Rx refills': 'Suscríbase a renovaciones Auto Rx',
  'Tell us which recurring prescriptions you want coordinated and our team will help set up a steadier refill rhythm.':
    'Díganos qué recetas recurrentes desea coordinar y nuestro equipo le ayudará a establecer una rutina de renovación más estable.',
  'Auto refill request': 'Solicitud de renovación automática',
  'Set up recurring refill support': 'Configure apoyo para renovaciones recurrentes',
  'Prescription details': 'Detalles de la receta',
  'Prescription Name': 'Nombre de la receta',
  'Preferred refill reminder': 'Recordatorio de renovación preferido',
  'Phone call': 'Llamada telefónica',
  'Text message': 'Mensaje de texto',
  'No reminder needed': 'No necesito recordatorio',
  'Notes for the pharmacy team': 'Notas para el equipo de farmacia',
  'Submit Auto Rx request': 'Enviar solicitud Auto Rx',
  'Refill request': 'Solicitud de renovación',
  'Refill your prescription': 'Renueve su receta',
  'Need a refill? Send us the details below and our team will prepare your medication for pickup or local delivery.':
    '¿Necesita una renovación? Envíenos los detalles abajo y nuestro equipo preparará su medicamento para recogida o entrega local.',
  '* Required information': '* Información requerida',
  'Who is this prescription for?': '¿Para quién es esta receta?',
  'Last Name': 'Apellido',
  'First Name': 'Nombre',
  'Phone Number': 'Número de teléfono',
  'RX refill numbers': 'Números de renovación RX',
  'Add over-the-counter items': 'Agregar artículos sin receta',
  'Optional: include a few additional items you want prepared with the refill.':
    'Opcional: incluya algunos artículos adicionales que desea preparar con la renovación.',
  'Name': 'Nombre',
  'Qty': 'Cantidad',
  'Pickup or delivery': 'Recogida o entrega',
  'Pickup': 'Recogida',
  'Notify me when ready': 'Notificarme cuando esté listo',
  'No, thanks': 'No, gracias',
  'Yes, via phone': 'Sí, por teléfono',
  'Submit refill request': 'Enviar solicitud de renovación',
  'Free prescription delivery': 'Entrega gratuita de recetas',
  'Request prescription delivery': 'Solicitar entrega de receta',
  'Share your delivery details and our pharmacy team will coordinate the next step for eligible prescriptions.':
    'Comparta los detalles de entrega y nuestro equipo coordinará el siguiente paso para recetas elegibles.',
  'Delivery request': 'Solicitud de entrega',
  'Delivery Address': 'Dirección de entrega',
  'Best delivery window': 'Mejor horario de entrega',
  'Morning': 'Mañana',
  'Afternoon': 'Tarde',
  'Any available time': 'Cualquier horario disponible',
  'Delivery notes': 'Notas de entrega',
  'Submit delivery request': 'Enviar solicitud de entrega',
  'Prescription transfer': 'Transferencia de receta',
  'Transfer request': 'Solicitud de transferencia',
  'Start a prescription transfer': 'Iniciar una transferencia de receta',
  'Ready to switch pharmacies? Share the details below and we can start the transfer process for you.':
    '¿Listo para cambiar de farmacia? Comparta los detalles abajo y podemos iniciar el proceso de transferencia por usted.',
  'Date of Birth': 'Fecha de nacimiento',
  'City': 'Ciudad',
  'State': 'Estado',
  'Zip / Postal Code': 'Código postal',
  'Pharmacy Name': 'Nombre de la farmacia',
  'Pharmacy Phone': 'Teléfono de la farmacia',
  'Prescription to be transferred': 'Receta que se transferirá',
  'Transfer all my prescriptions': 'Transferir todas mis recetas',
  'If you only want certain prescriptions moved, list them below.':
    'Si solo desea transferir ciertas recetas, escríbalas abajo.',
  'Medication name': 'Nombre del medicamento',
  'Prescription number from current pharmacy': 'Número de receta de la farmacia actual',
  'Submit transfer request': 'Enviar solicitud de transferencia',
  'Need help?': '¿Necesita ayuda?',
  'Local pharmacy help': 'Ayuda de farmacia local',
  'Reach a real pharmacy team when questions come up.': 'Comuníquese con un equipo real de farmacia cuando tenga preguntas.',
  'Please reach out if you have questions, prescription concerns, or need support from the pharmacy team.':
    'Comuníquese con nosotros si tiene preguntas, inquietudes sobre recetas o necesita apoyo del equipo de farmacia.',
  'Full name': 'Nombre completo',
  'Email address': 'Correo electrónico',
  'Enter your message here': 'Escriba su mensaje aquí',
  'Send message': 'Enviar mensaje',
  'Contact information': 'Información de contacto',
  'Business hours': 'Horario de atención',
  'Need immediate help with a refill, transfer, or delivery question?':
    '¿Necesita ayuda inmediata con una renovación, transferencia o pregunta de entrega?',
  'Home > Insurance Accepted': 'Inicio > Seguros aceptados',
  'Coverage support that feels clear, calm, and local.':
    'Apoyo de cobertura que se siente claro, tranquilo y local.',
  'Present your prescription card to our staff and we will help take care of the rest.':
    'Presente su tarjeta de recetas a nuestro personal y le ayudaremos con el resto.',
  'We accept most insurance plans for prescriptions.': 'Aceptamos la mayoría de los planes de seguro para recetas.',
  'Most major plans': 'La mayoría de los planes principales',
  '$4 plan': 'Plan de $4',
  'No insurance? Ask us about our $4 prescription plan.': '¿No tiene seguro? Pregunte por nuestro plan de recetas de $4.',
  'Send us a message': 'Envíenos un mensaje',
  'Navigate': 'Navegar',
  'Marigold Pharmacy. All Rights Reserved.': 'Marigold Pharmacy. Todos los derechos reservados.',
  'Accessibility settings': 'Configuración de accesibilidad',
  'Show accessibility widget': 'Mostrar widget de accesibilidad',
  'Show widget': 'Mostrar widget',
  'How UserWay Works': 'Cómo funciona UserWay',
  'Accessibility tools': 'Herramientas de accesibilidad',
  'Close accessibility settings': 'Cerrar configuración de accesibilidad',
  'Manage readability, motion, visibility, and widget controls without leaving the page.':
    'Controle legibilidad, movimiento, visibilidad y el widget sin salir de la página.',
  'Oversized Widget': 'Widget grande',
  'Contrast +': 'Contraste +',
  'Highlight Links': 'Resaltar enlaces',
  'Bigger Text': 'Texto más grande',
  'Text Spacing': 'Espaciado de texto',
  'Pause Animations': 'Pausar animaciones',
  'Hide Images': 'Ocultar imágenes',
  'Dyslexia Friendly': 'Apto para dislexia',
  'Cursor': 'Cursor',
  'Tooltips': 'Ayudas emergentes',
  'Line Height': 'Altura de línea',
  'Text Align': 'Alineación de texto',
  'Saturation': 'Saturación',
  'Move Widget': 'Mover widget',
  'Hide Widget': 'Ocultar widget',
  'Reset All Accessibility Settings': 'Restablecer toda la configuración de accesibilidad',
  'Open menu': 'Abrir menú',
  'Close menu': 'Cerrar menú',
  'Scroll to top': 'Volver arriba',
  'Page not found': 'Página no encontrada',
  "Sorry, we couldn't find the page you were looking for. It might have been moved or doesn't exist.":
    'Lo sentimos, no pudimos encontrar la página que buscaba. Puede haberse movido o no existir.',
  'Return to home': 'Volver al inicio',
  'Monday - Friday': 'Lunes - Viernes',
  'Saturday': 'Sábado',
  'Sunday': 'Domingo',
  'Closed': 'Cerrado',
  '$4 Prescription Plan': 'Plan de recetas de $4',
  'Medication Synchronization': 'Sincronización de medicamentos',
  'Seasonal Vaccinations': 'Vacunas de temporada',
  'CBD Oil and Other Herbals': 'Aceite de CBD y otros herbales',
  'Diabetes Specialty Care Center': 'Centro especializado en diabetes',
  'Durable Medical Equipment': 'Equipo médico duradero',
  'Health Screenings': 'Exámenes de salud',
  'Free Delivery Services': 'Servicios de entrega gratuita',
  'Free Consultations': 'Consultas gratuitas',
  'Generic and Brand Name Drugs': 'Medicamentos genéricos y de marca',
  'Medication Therapy Management': 'Manejo de terapia de medicamentos',
  'Multi-Dose Packaging': 'Empaque multidosis',
  'Next-Day Special Order': 'Pedido especial para el día siguiente',
  'OTC Drugs and Dollar Wise Items': 'Medicamentos sin receta y artículos económicos',
  'Price Matching and Insurance Billing': 'Igualación de precios y facturación de seguros',
  'Transfer Prescriptions': 'Transferir recetas',
  'Veterinary Drugs': 'Medicamentos veterinarios',
  'Affordability': 'Asequibilidad',
  'Adherence': 'Adherencia',
  'Prescription Support': 'Apoyo de recetas',
  'Preventive Care': 'Cuidado preventivo',
  'Wellness': 'Bienestar',
  'Custom Medications': 'Medicamentos personalizados',
  'Chronic Care': 'Cuidado crónico',
  'Convenience': 'Conveniencia',
  'Pharmacist Access': 'Acceso al farmacéutico',
  'Prescription Access': 'Acceso a recetas',
  'Clinical Support': 'Apoyo clínico',
  'Access': 'Acceso',
  'Everyday Essentials': 'Esenciales diarios',
  'Specialty Support': 'Apoyo especializado',
  'Bathroom Safety': 'Seguridad en el baño',
  'Diabetic Patients': 'Pacientes diabéticos',
  'Pain Management': 'Manejo del dolor',
  'Ambulatory Aids': 'Ayudas ambulatorias',
  'Everyday Health Needs': 'Necesidades diarias de salud',
  'And More': 'Y más',
  'A good fit for families combining pharmacy support with practical home-care essentials.':
    'Una buena opción para familias que combinan apoyo de farmacia con artículos prácticos de cuidado en casa.',
  'A good fit for patients who want their maintenance refills to feel less scattered.':
    'Una buena opción para pacientes que quieren que sus renovaciones de mantenimiento se sientan menos dispersas.',
  'A more personal pharmacy experience shaped around steady support, not rushed transactions.':
    'Una experiencia de farmacia más personal, basada en apoyo constante y no en trámites apresurados.',
  'A practical extension of neighborhood pharmacy care':
    'Una extensión práctica del cuidado de una farmacia de vecindario',
  'A simpler transfer process for patients moving prescriptions from another pharmacy.':
    'Un proceso de transferencia más sencillo para pacientes que trasladan recetas desde otra farmacia.',
  'A smooth starting point for ongoing Marigold care':
    'Un punto de inicio sencillo para recibir cuidado continuo de Marigold',
  'A smoother process for repeat monthly prescriptions':
    'Un proceso más fluido para recetas mensuales recurrentes',
  'A useful extension of neighborhood pharmacy care for households that include pets.':
    'Una extensión útil del cuidado de farmacia local para hogares con mascotas.',
  'A welcoming place to ask routine medication questions':
    'Un lugar acogedor para hacer preguntas habituales sobre medicamentos',
  'Absolutely. Our team can help move prescriptions into Marigold care so refills, delivery, and future support are easier to manage.':
    'Claro. Nuestro equipo puede ayudarle a transferir sus recetas a Marigold para que las renovaciones, la entrega y el apoyo futuro sean más fáciles de manejar.',
  'Accessibility icon': 'Icono de accesibilidad',
  'Add gate codes, preferred contact method, or delivery notes here':
    'Agregue códigos de acceso, método de contacto preferido o notas de entrega aquí',
  'Add timing, delivery, or medication notes here':
    'Agregue horarios, entrega o notas sobre medicamentos aquí',
  'Best for patients who want answers from a real local pharmacy team.':
    'Ideal para pacientes que desean respuestas de un equipo real de farmacia local.',
  'Best for patients who want simpler pricing conversations and help understanding lower-cost options.':
    'Ideal para pacientes que desean conversaciones de precio más sencillas y ayuda para entender opciones de menor costo.',
  'Budget-friendly prescription support for eligible commonly prescribed medications.':
    'Apoyo económico para recetas elegibles de medicamentos comúnmente recetados.',
  'Built around consistency, easier pickups, and better organization for ongoing care.':
    'Diseñado en torno a la constancia, recogidas más sencillas y mejor organización para el cuidado continuo.',
  'Built around local follow-through and keeping patients informed while orders are in process.':
    'Diseñado para dar seguimiento local y mantener a los pacientes informados mientras los pedidos están en proceso.',
  'Built for patients who want local, convenient preventive care support.':
    'Diseñado para pacientes que desean apoyo preventivo local y conveniente.',
  'Call the pharmacy team and we will help you get to the right next step quickly.':
    'Llame al equipo de farmacia y le ayudaremos a llegar rápidamente al siguiente paso adecuado.',
  'Can I ask questions about over-the-counter products?':
    '¿Puedo hacer preguntas sobre productos sin receta?',
  'Can you help with medication synchronization?':
    '¿Pueden ayudar con la sincronización de medicamentos?',
  'Can you transfer prescriptions from another pharmacy?':
    '¿Pueden transferir recetas desde otra farmacia?',
  'Clear coverage support for Marigold Pharmacy patients with straightforward insurance guidance and a more personal neighborhood feel.':
    'Apoyo claro de cobertura para pacientes de Marigold Pharmacy, con orientación de seguros sencilla y una atención local más personal.',
  'Clear communication around timing and next steps':
    'Comunicación clara sobre los tiempos y los próximos pasos',
  'Clear insurance and pricing support to help you understand your options.':
    'Apoyo claro sobre seguros y precios para ayudarle a entender sus opciones.',
  'Clear pickup and refill expectations':
    'Expectativas claras de recogida y renovación',
  'Clear product information for common over-the-counter wellness needs.':
    'Información clara de productos para necesidades comunes de bienestar sin receta.',
  'Clearer conversations around routine prescription options':
    'Conversaciones más claras sobre opciones habituales de recetas',
  'Clearer payment conversations before checkout':
    'Conversaciones de pago más claras antes de finalizar la compra',
  'Clearer pricing conversations and low-cost prescription support for eligible medications.':
    'Conversaciones de precio más claras y apoyo de recetas de bajo costo para medicamentos elegibles.',
  'Common home-care and mobility-related equipment support':
    'Apoyo para equipo común de cuidado en casa y movilidad',
  'Consumer health': 'Salud del consumidor',
  'Convenience and affordability': 'Conveniencia y asequibilidad',
  'Convenient access to common self-care and household health items':
    'Acceso conveniente a artículos comunes de autocuidado y salud del hogar',
  'Convenient seasonal and routine immunization support based on eligibility and availability.':
    'Apoyo conveniente para vacunas de temporada y de rutina según elegibilidad y disponibilidad.',
  'Coordination around diabetic supplies and medication pickups':
    'Coordinación de suministros para diabetes y recogida de medicamentos',
  'Cost-conscious options for eligible low-cost medications':
    'Opciones conscientes del costo para medicamentos elegibles de bajo precio',
  'Custom non-sterile medication support.': 'Apoyo para medicamentos personalizados no estériles.',
  'Customized medication preparation support for selected strengths, dosage forms, or ingredients.':
    'Apoyo para preparación personalizada de medicamentos en ciertas concentraciones, formas o ingredientes.',
  'Delivery has been dependable, and the reminders help us stay organized when life gets busy. It feels personal every time.':
    'La entrega ha sido confiable y los recordatorios nos ayudan a mantenernos organizados cuando la vida se complica. Siempre se siente personal.',
  'Delivery, consultations, equipment, and payment support for everyday care.':
    'Entrega, consultas, equipo y apoyo de pago para el cuidado diario.',
  'Designed for patients who want quick refill follow-through with neighborhood pharmacy care.':
    'Diseñado para pacientes que desean seguimiento rápido de renovaciones con cuidado de farmacia local.',
  'Designed to keep medication access easier when a pharmacy trip is hard to fit in.':
    'Diseñado para facilitar el acceso a medicamentos cuando una visita a la farmacia es difícil de coordinar.',
  'Diabetes supply and medication support.': 'Apoyo con suministros para diabetes y medicamentos.',
  'Do you accept insurance?': '¿Aceptan seguros?',
  'Do you offer free delivery?': '¿Ofrecen entrega gratuita?',
  'Do you provide vaccinations and screenings?': '¿Ofrecen vacunas y evaluaciones?',
  'Easy access to pharmacist guidance.': 'Acceso fácil a orientación farmacéutica.',
  'Easy access to the pharmacy team for general medication and service questions.':
    'Acceso fácil al equipo de farmacia para preguntas generales sobre medicamentos y servicios.',
  'Eligible HSA and FSA payment support.': 'Apoyo para pagos elegibles con HSA y FSA.',
  'Enter address here': 'Escriba la dirección aquí',
  'Enter city here': 'Escriba la ciudad aquí',
  'Enter date of birth here': 'Escriba la fecha de nacimiento aquí',
  'Enter delivery address here': 'Escriba la dirección de entrega aquí',
  'Enter first name here': 'Escriba el nombre aquí',
  'Enter last name here': 'Escriba el apellido aquí',
  'Enter medication name here': 'Escriba el nombre del medicamento aquí',
  'Enter name here': 'Escriba el nombre aquí',
  'Enter pharmacy name here': 'Escriba el nombre de la farmacia aquí',
  'Enter pharmacy phone here': 'Escriba el teléfono de la farmacia aquí',
  'Enter phone number here': 'Escriba el número de teléfono aquí',
  'Enter prescription number here': 'Escriba el número de receta aquí',
  'Enter quantity here': 'Escriba la cantidad aquí',
  'Enter RX number here': 'Escriba el número RX aquí',
  'Enter RX refill number here': 'Escriba el número de renovación RX aquí',
  'Enter zip or postal code here': 'Escriba el código postal aquí',
  'Especially useful for patients on multiple long-term medications':
    'Especialmente útil para pacientes que toman varios medicamentos a largo plazo',
  'Everyday diabetic care supplies and routine support items that help patients stay organized with testing and ongoing self-care.':
    'Suministros diarios para el cuidado de la diabetes y artículos de apoyo que ayudan a los pacientes a organizar sus pruebas y autocuidado continuo.',
  'Fast refill support for existing prescriptions before medication runs low.':
    'Apoyo rápido para renovar recetas existentes antes de que se termine el medicamento.',
  'Fast special-order coordination.': 'Coordinación rápida de pedidos especiales.',
  'Fast special-order support for selected medications and pharmacy products.':
    'Apoyo rápido para pedidos especiales de ciertos medicamentos y productos de farmacia.',
  'Federal medication guidance, safety information, labeling help, and consumer drug education.':
    'Orientación federal sobre medicamentos, información de seguridad, ayuda con etiquetas y educación sobre medicamentos para consumidores.',
  'Flexible spending support for eligible prescription, OTC, and health-related purchases.':
    'Apoyo de gastos flexibles para compras elegibles de recetas, productos sin receta y artículos relacionados con la salud.',
  'Focused on access, clarity, and making prescription choices easier to understand.':
    'Enfocado en acceso, claridad y en hacer que las opciones de recetas sean más fáciles de entender.',
  'Focused on practical guidance and safer product conversations at the pharmacy counter.':
    'Enfocado en orientación práctica y conversaciones más seguras sobre productos en el mostrador de la farmacia.',
  'Free local prescription delivery for patients, caregivers, and busy households.':
    'Entrega local gratuita de recetas para pacientes, cuidadores y hogares ocupados.',
  'Friendly guidance when insurance does not fit the need':
    'Orientación amable cuando el seguro no se ajusta a la necesidad',
  'Friendly pharmacist interacting with a patient':
    'Farmacéutico amable atendiendo a un paciente',
  'From routine home-health needs to practical mobility and diabetic support items, our team helps patients find products that make daily care more manageable.':
    'Desde necesidades rutinarias de salud en casa hasta artículos prácticos de movilidad y apoyo para diabetes, nuestro equipo ayuda a los pacientes a encontrar productos que facilitan el cuidado diario.',
  'General pharmacy guidance and patient support conversations':
    'Orientación general de farmacia y conversaciones de apoyo al paciente',
  'Generic and brand-name medication access.': 'Acceso a medicamentos genéricos y de marca.',
  'Health insurance': 'Seguro médico',
  'Help resolving timing questions before medications run out':
    'Ayuda para resolver dudas de tiempo antes de que se terminen los medicamentos',
  'Help understanding product categories and next steps':
    'Ayuda para entender categorías de productos y próximos pasos',
  'Helpful for families managing recurring pharmacy costs':
    'Útil para familias que manejan costos recurrentes de farmacia',
  'Helpful for families, caregivers, and adults staying current on recommendations':
    'Útil para familias, cuidadores y adultos que desean mantenerse al día con las recomendaciones',
  'Helpful for patients balancing cost, familiarity, and continuity':
    'Útil para pacientes que equilibran costo, familiaridad y continuidad',
  'Helpful for patients switching to local service or delivery support':
    'Útil para pacientes que cambian a servicio local o apoyo de entrega',
  'Helpful for patients with transportation, schedule, or caregiving challenges':
    'Útil para pacientes con dificultades de transporte, horario o cuidado',
  'Helpful for pet owners balancing both family and pet medications':
    'Útil para dueños de mascotas que coordinan medicamentos de la familia y de sus mascotas',
  'Helpful in some cases involving allergies, swallowing difficulty, or pediatric needs':
    'Útil en algunos casos de alergias, dificultad para tragar o necesidades pediátricas',
  'Helpful products that support safer daily routines in the bathroom, including stability, comfort, and easier movement at home.':
    'Productos útiles que apoyan rutinas diarias más seguras en el baño, incluida estabilidad, comodidad y movimiento más fácil en casa.',
  'Helps patients avoid calling multiple locations to check availability':
    'Ayuda a los pacientes a evitar llamar a varios lugares para revisar disponibilidad',
  'Helps surface timing, duplication, or adherence questions':
    'Ayuda a identificar preguntas sobre horarios, duplicación o adherencia',
  'Home-health equipment support for comfort, mobility, and safer day-to-day care at home.':
    'Apoyo con equipo de salud en casa para comodidad, movilidad y cuidado diario más seguro.',
  'HSA and FSA payment support for eligible pharmacy purchases.':
    'Apoyo de pago con HSA y FSA para compras elegibles de farmacia.',
  'HSA and FSA support for eligible purchases': 'Apoyo con HSA y FSA para compras elegibles',
  'Ideal for new patients who want a more responsive neighborhood pharmacy experience.':
    'Ideal para pacientes nuevos que desean una experiencia de farmacia local más atenta.',
  'If you are looking for a specific supply or equipment category, our pharmacy team can help guide you to the right next step.':
    'Si busca una categoría específica de suministros o equipo, nuestro equipo de farmacia puede orientarle al siguiente paso adecuado.',
  'If you have questions about the insurance plans we accept or about your coverage, please stop by our pharmacy or send us a message.':
    'Si tiene preguntas sobre los planes de seguro que aceptamos o sobre su cobertura, visite nuestra farmacia o envíenos un mensaje.',
  'Institute for Safe Medication Practices': 'Institute for Safe Medication Practices',
  'Kissimmee family': 'Familia de Kissimmee',
  'Line up ongoing prescriptions into one easier monthly refill rhythm.':
    'Organice recetas continuas en un ritmo mensual de renovación más sencillo.',
  'Local communication when timing and pickup details matter':
    'Comunicación local cuando los tiempos y detalles de recogida importan',
  'Local delivery coordination for prescriptions and essentials to reduce missed pickups.':
    'Coordinación de entrega local de recetas y artículos esenciales para reducir recogidas perdidas.',
  'Local parent': 'Padre o madre local',
  'Look up medications, verify details, or identify a pill with a trusted index.':
    'Busque medicamentos, verifique detalles o identifique una pastilla con un índice confiable.',
  'Marigold Pharmacy accepts most insurance plans as payment for your prescriptions. You only need to present your prescription card to our staff, and we\'ll take care of the rest.':
    'Marigold Pharmacy acepta la mayoría de los planes de seguro como pago para sus recetas. Solo necesita presentar su tarjeta de recetas a nuestro personal y nosotros nos encargaremos del resto.',
  'Marigold Pharmacy brings together the clarity of a modern care experience and the personal attention of a neighborhood pharmacy that still believes service should feel human.':
    'Marigold Pharmacy une la claridad de una experiencia de cuidado moderna con la atención personal de una farmacia de vecindario que aún cree que el servicio debe sentirse humano.',
  'Marigold Pharmacy care team': 'Equipo de cuidado de Marigold Pharmacy',
  'Marigold Pharmacy is built by people who genuinely enjoy helping patients feel more confident about medications, refills, insurance questions, and everyday health routines.':
    'Marigold Pharmacy está formada por personas que disfrutan genuinamente ayudar a los pacientes a sentirse más seguros sobre medicamentos, renovaciones, preguntas de seguro y rutinas diarias de salud.',
  'Marigold Pharmacy map': 'Mapa de Marigold Pharmacy',
  'Medication access support across common generic and brand-name prescriptions.':
    'Apoyo de acceso a medicamentos para recetas comunes genéricas y de marca.',
  'Medication alignment, refill planning, and organized pharmacist support for long-term routines.':
    'Alineación de medicamentos, planificación de renovaciones y apoyo farmacéutico organizado para rutinas a largo plazo.',
  'Medication bottles prepared for automatic refills':
    'Frascos de medicamentos preparados para renovaciones automáticas',
  'Medication list review and organization support':
    'Revisión de lista de medicamentos y apoyo de organización',
  'Medication safety and consumer drug guidance':
    'Seguridad de medicamentos y orientación para consumidores',
  'Medication safety and error prevention':
    'Seguridad de medicamentos y prevención de errores',
  'Medication safety education and practical prevention resources for patients and caregivers.':
    'Educación sobre seguridad de medicamentos y recursos prácticos de prevención para pacientes y cuidadores.',
  'Medication synchronization and follow-through have made a real difference for our household. Everything feels easier to manage.':
    'La sincronización de medicamentos y el seguimiento han hecho una gran diferencia en nuestro hogar. Todo se siente más fácil de manejar.',
  'Medication-aware questions to bring to the counter':
    'Preguntas informadas sobre medicamentos para llevar al mostrador',
  'Medicine in a light-protected bottle': 'Medicamento en un frasco protegido de la luz',
  'Mobility-support products designed to help patients move more confidently and safely throughout their day.':
    'Productos de apoyo de movilidad diseñados para ayudar a los pacientes a moverse con más confianza y seguridad durante el día.',
  'Modern pharmacy setup with essential medications':
    'Farmacia moderna con medicamentos esenciales',
  'Neighborhood patient': 'Paciente del vecindario',
  'Of course. We are happy to talk through everyday health products and help you choose a practical option for your needs.':
    'Por supuesto. Con gusto hablamos sobre productos de salud diarios y le ayudamos a elegir una opción práctica para sus necesidades.',
  'Often works well alongside synchronization for more organized routines.':
    'A menudo funciona bien junto con la sincronización para rutinas más organizadas.',
  'One planned refill date for eligible ongoing prescriptions':
    'Una fecha planificada de renovación para recetas continuas elegibles',
  'One-on-one pharmacist access for questions about services, routines, and next steps.':
    'Acceso individual a un farmacéutico para preguntas sobre servicios, rutinas y próximos pasos.',
  'Ongoing communication when timing changes are needed':
    'Comunicación continua cuando se necesitan cambios de horario',
  'Open accessibility menu': 'Abrir menú de accesibilidad',
  'Organization help for recurring care routines':
    'Ayuda de organización para rutinas de cuidado recurrentes',
  'Organized systems that help reduce missed details, refill stress, and avoidable confusion.':
    'Sistemas organizados que ayudan a reducir detalles omitidos, estrés por renovaciones y confusión evitable.',
  'OTC and herbal supplement guidance.': 'Orientación sobre productos sin receta y suplementos herbales.',
  'Our goal is to ensure that you can get the needed supplies that best complement your health care regimen. We make this possible by offering a wide range of medical supplies and equipment designed to not just meet your health needs but to also help you achieve an improved quality of life.':
    'Nuestro objetivo es asegurarnos de que pueda obtener los suministros necesarios que mejor complementen su régimen de salud. Lo hacemos posible ofreciendo una amplia variedad de suministros y equipo médico diseñados no solo para cubrir sus necesidades de salud, sino también para ayudarle a lograr una mejor calidad de vida.',
  'Our supplies selection is centered on practical support, safer movement, and everyday home care needs.':
    'Nuestra selección de suministros se centra en apoyo práctico, movimiento más seguro y necesidades diarias de cuidado en casa.',
  'Over-the-counter and herbal supplement guidance for everyday wellness needs.':
    'Orientación sobre productos sin receta y suplementos herbales para necesidades diarias de bienestar.',
  'Over-the-counter product information': 'Información de productos sin receta',
  'Patient-friendly help for OTC medicines, storage, and everyday safe use.':
    'Ayuda amigable para pacientes sobre medicamentos sin receta, almacenamiento y uso diario seguro.',
  'Patient-friendly safe-use tips for common medicines, OTC products, storage, and daily routines.':
    'Consejos amigables para pacientes sobre uso seguro de medicamentos comunes, productos sin receta, almacenamiento y rutinas diarias.',
  'Patient-specific non-sterile compounding support when standard options are not the right fit.':
    'Apoyo de preparación no estéril personalizada cuando las opciones estándar no son adecuadas.',
  'Personal medication reviews that help patients understand their medication routine.':
    'Revisiones personales de medicamentos que ayudan a los pacientes a entender su rutina.',
  'Pet medication support with practical coordination for veterinary prescriptions.':
    'Apoyo para medicamentos de mascotas con coordinación práctica de recetas veterinarias.',
  'Pharmacy coordination around patient-specific prescriptions':
    'Coordinación de farmacia para recetas específicas del paciente',
  'Pharmacy team helping a patient transfer prescriptions':
    'Equipo de farmacia ayudando a un paciente a transferir recetas',
  'Pharmacy team members collaborating': 'Miembros del equipo de farmacia colaborando',
  'Pharmacy team ready to help patients': 'Equipo de farmacia listo para ayudar a pacientes',
  'Pharmacy team reviewing insurance and prescription coverage':
    'Equipo de farmacia revisando seguro y cobertura de recetas',
  'Pharmacy-to-pharmacy transfer coordination':
    'Coordinación de transferencia de farmacia a farmacia',
  'Pill lookup and drug information': 'Búsqueda de pastillas e información de medicamentos',
  'Please select': 'Seleccione una opción',
  'Practical home-health items and routine wellness essentials chosen around real household needs and convenience.':
    'Artículos prácticos de salud en casa y esenciales de bienestar elegidos según necesidades reales del hogar y conveniencia.',
  'Practical pharmacy support for diabetes medication routines and supply coordination.':
    'Apoyo práctico de farmacia para rutinas de medicamentos para diabetes y coordinación de suministros.',
  'Practical product guidance for common OTC items and selected herbal supplements.':
    'Orientación práctica de productos para artículos comunes sin receta y ciertos suplementos herbales.',
  'Practical safety resources for patients and caregivers to help prevent mistakes.':
    'Recursos prácticos de seguridad para pacientes y cuidadores que ayudan a prevenir errores.',
  'Prescription delivery coordination': 'Coordinación de entrega de recetas',
  'Prescription support across common generic and brand-name medication needs.':
    'Apoyo de recetas para necesidades comunes de medicamentos genéricos y de marca.',
  'Prescription transfer support for patients moving medications into local Marigold care.':
    'Apoyo de transferencia de recetas para pacientes que trasladan sus medicamentos al cuidado local de Marigold.',
  'Preventive care reminders and scheduling support':
    'Recordatorios de cuidado preventivo y apoyo de programación',
  'Preventive, OTC, diabetes, and pet-medication support.':
    'Apoyo preventivo, productos sin receta, diabetes y medicamentos para mascotas.',
  'Quick refill follow-through, simpler coordination, and fewer unnecessary return trips.':
    'Seguimiento rápido de renovaciones, coordinación más sencilla y menos viajes innecesarios.',
  'Real conversations with a team that listens first and treats patients with warmth.':
    'Conversaciones reales con un equipo que escucha primero y trata a los pacientes con calidez.',
  'Refill coordination, pharmacist communication, and steady support for recurring medication needs.':
    'Coordinación de renovaciones, comunicación con el farmacéutico y apoyo constante para necesidades recurrentes de medicamentos.',
  'Refill request intake and readiness support':
    'Recepción de solicitudes de renovación y apoyo de preparación',
  'RX Number': 'Número RX',
  'Caregiver': 'Cuidador',
  'Guide': 'Guía',
  'Marigold': 'Marigold',
  'Marigold Pharmacy.': 'Marigold Pharmacy.',
  'Marigold Pharmacy accepts most insurance plans as payment for your prescriptions. You only need to present your prescription card to our staff, and we&apos;ll take care of the rest.':
    'Marigold Pharmacy acepta la mayoría de los planes de seguro como pago para sus recetas. Solo necesita presentar su tarjeta de recetas a nuestro personal y nosotros nos encargaremos del resto.',
  'Resource': 'Recurso',
  'Safe Medication': 'Uso seguro de medicamentos',
  'Safe medicine practices for everyday routines':
    'Prácticas seguras de medicamentos para rutinas diarias',
  'Scroll testimonials left': 'Desplazar testimonios a la izquierda',
  'Scroll testimonials right': 'Desplazar testimonios a la derecha',
  'Seasonal vaccine access when offered onsite':
    'Acceso a vacunas de temporada cuando se ofrecen en la farmacia',
  'Select comfort and pain-support essentials for patients managing soreness, recovery routines, and day-to-day mobility needs.':
    'Artículos esenciales de comodidad y apoyo para el dolor para pacientes que manejan molestias, recuperación y necesidades diarias de movilidad.',
  'Selected home-use health equipment support for safer, more manageable routines.':
    'Apoyo con equipo de salud seleccionado para uso en casa y rutinas más seguras y manejables.',
  'Special-order coordination when selected medications or products are not routinely stocked.':
    'Coordinación de pedidos especiales cuando ciertos medicamentos o productos no están disponibles habitualmente.',
  'Special-order medication coordination for household pet prescription needs.':
    'Coordinación de medicamentos por pedido especial para recetas de mascotas del hogar.',
  'Special-order support for pet medications.': 'Apoyo de pedidos especiales para medicamentos de mascotas.',
  'Start delivery request': 'Iniciar solicitud de entrega',
  'Support comparing brand and generic availability':
    'Apoyo para comparar disponibilidad de marca y genéricos',
  'Support for medication routines, diabetic supplies, and clearer day-to-day coordination.':
    'Apoyo para rutinas de medicamentos, suministros para diabetes y coordinación diaria más clara.',
  'Support for selected veterinary prescription needs':
    'Apoyo para ciertas necesidades de recetas veterinarias',
  'Support when a patient needs a customized strength or dosage form':
    'Apoyo cuando un paciente necesita una concentración o forma de dosis personalizada',
  'Supports continuity when pickups are difficult':
    'Apoya la continuidad cuando las recogidas son difíciles',
  'Supports everyday wellness without overcomplicating the visit':
    'Apoya el bienestar diario sin complicar la visita',
  'Switch language to Spanish': 'Cambiar idioma a español',
  'Technology matters to us only when it makes care better: clearer communication, smoother coordination, and a more dependable pharmacy experience from start to finish.':
    'La tecnología nos importa solo cuando mejora el cuidado: comunicación más clara, coordinación más fluida y una experiencia de farmacia más confiable de principio a fin.',
  'That is why we center every interaction around listening well, explaining clearly, and following through with the kind of care families remember.':
    'Por eso centramos cada interacción en escuchar bien, explicar con claridad y dar seguimiento con el tipo de cuidado que las familias recuerdan.',
  'They helped us understand our coverage and made delivery feel simple. It is the kind of pharmacy support families remember.':
    'Nos ayudaron a entender nuestra cobertura e hicieron que la entrega se sintiera sencilla. Es el tipo de apoyo de farmacia que las familias recuerdan.',
  'They took the time to explain our options without rushing us, and that made a stressful prescription issue feel much easier.':
    'Se tomaron el tiempo de explicarnos las opciones sin apresurarnos, y eso hizo que un problema estresante de receta se sintiera mucho más fácil.',
  'Toolkit': 'Herramientas',
  'Trusted federal guidance on prescription use, labels, and safe habits at home.':
    'Orientación federal confiable sobre uso de recetas, etiquetas y hábitos seguros en casa.',
  'U.S. Food and Drug Administration': 'Administración de Alimentos y Medicamentos de EE. UU.',
  'Useful before starting a transfer, packaging, or sync plan':
    'Útil antes de iniciar una transferencia, empaque o plan de sincronización',
  'Useful for caregivers planning safer routines at home':
    'Útil para cuidadores que planifican rutinas más seguras en casa',
  'Useful for caregivers, busy households, and long-term routines':
    'Útil para cuidadores, hogares ocupados y rutinas a largo plazo',
  'Useful for patients managing multiple diabetes-related items each month':
    'Útil para pacientes que manejan varios artículos relacionados con diabetes cada mes',
  'Useful for patients who want to make eligible health dollars easier to use.':
    'Útil para pacientes que desean usar con más facilidad sus fondos de salud elegibles.',
  'Useful when a prescriber determines a customized non-sterile preparation is appropriate.':
    'Útil cuando un prescriptor determina que una preparación no estéril personalizada es adecuada.',
  'Useful when a product is not part of standard daily stock':
    'Útil cuando un producto no forma parte del inventario diario estándar',
  'Vaccination planning, family scheduling support, and preventive care conversations.':
    'Planificación de vacunas, apoyo para horarios familiares y conversaciones de cuidado preventivo.',
  'We believe pharmacy support should feel thoughtful, warm, and easy to understand. Patients should not have to brace themselves for rushed conversations or unclear next steps.':
    'Creemos que el apoyo de farmacia debe sentirse considerado, cálido y fácil de entender. Los pacientes no deberían prepararse para conversaciones apresuradas o próximos pasos poco claros.',
  'We help patients stay steady with prescriptions, refills, wellness questions, and everyday pharmacy support without making the process feel cold or complicated.':
    'Ayudamos a los pacientes a mantenerse constantes con recetas, renovaciones, preguntas de bienestar y apoyo diario de farmacia sin hacer que el proceso se sienta frío o complicado.',
  'We support seasonal vaccinations and health screening touchpoints when available, helping patients keep prevention part of the routine.':
    'Apoyamos vacunas de temporada y evaluaciones de salud cuando están disponibles, ayudando a los pacientes a mantener la prevención como parte de la rutina.',
  'We use practical systems that help us stay organized, responsive, and ready, so patients spend less time chasing refills and more time feeling supported.':
    'Usamos sistemas prácticos que nos ayudan a mantenernos organizados, atentos y preparados, para que los pacientes pasen menos tiempo persiguiendo renovaciones y más tiempo sintiéndose apoyados.',
  'We want every conversation to feel steady and personal, whether you are picking up for yourself, caring for a parent, or coordinating for the whole household.':
    'Queremos que cada conversación se sienta estable y personal, ya sea que recoja para usted, cuide a un padre o coordine para todo el hogar.',
  'We work with most insurance plans for common prescription needs.':
    'Trabajamos con la mayoría de los planes de seguro para necesidades comunes de recetas.',
  'Wellness and specialty care': 'Bienestar y cuidado especializado',
  'Yes. Free local delivery is available for many patients, making it easier to stay on track when you cannot make it to the pharmacy.':
    'Sí. La entrega local gratuita está disponible para muchos pacientes, facilitando mantenerse al día cuando no puede ir a la farmacia.',
  'Yes. Medication synchronization can align ongoing refills into one rhythm, which makes monthly medication management more manageable.':
    'Sí. La sincronización de medicamentos puede alinear renovaciones continuas en un solo ritmo, lo que hace que el manejo mensual sea más manejable.',
  'Yes. We accept most insurance plans and help patients understand coverage in a straightforward way so pickup feels less stressful.':
    'Sí. Aceptamos la mayoría de los planes de seguro y ayudamos a los pacientes a entender la cobertura de forma clara para que la recogida sea menos estresante.',
  'Item 1 Name': 'Artículo 1 nombre',
  'Item 2 Name': 'Artículo 2 nombre',
  'Item 3 Name': 'Artículo 3 nombre',
  'Item 4 Name': 'Artículo 4 nombre',
  'Item 5 Name': 'Artículo 5 nombre',
  'Item 1 Qty': 'Artículo 1 cantidad',
  'Item 2 Qty': 'Artículo 2 cantidad',
  'Item 3 Qty': 'Artículo 3 cantidad',
  'Item 4 Qty': 'Artículo 4 cantidad',
  'Item 5 Qty': 'Artículo 5 cantidad',
  'Rx1 Med Name': 'Rx1 nombre del medicamento',
  'Rx2 Med Name': 'Rx2 nombre del medicamento',
  'Rx3 Med Name': 'Rx3 nombre del medicamento',
  'Rx4 Med Name': 'Rx4 nombre del medicamento',
  'Rx5 Med Name': 'Rx5 nombre del medicamento',
  'Rx1 Number': 'Rx1 número',
  'Rx2 Number': 'Rx2 número',
  'Rx3 Number': 'Rx3 número',
  'Rx4 Number': 'Rx4 número',
  'Rx5 Number': 'Rx5 número',
  'RX refill number 1': 'Número de renovación RX 1',
  'RX refill number 2': 'Número de renovación RX 2',
  'RX refill number 3': 'Número de renovación RX 3',
  'RX refill number 4': 'Número de renovación RX 4',
  },
};

const wordTranslations: Record<string, string> = {
  a: 'un',
  about: 'sobre',
  accepted: 'aceptado',
  access: 'acceso',
  accessible: 'accesible',
  accessibility: 'accesibilidad',
  account: 'cuenta',
  action: 'acción',
  add: 'agregar',
  additional: 'adicionales',
  address: 'dirección',
  adherence: 'adherencia',
  administer: 'administrar',
  adults: 'adultos',
  affordable: 'asequible',
  after: 'después',
  all: 'todos',
  align: 'alinear',
  alignment: 'alineación',
  and: 'y',
  answers: 'respuestas',
  applicable: 'aplicable',
  appointment: 'cita',
  approach: 'enfoque',
  appropriate: 'adecuado',
  are: 'son',
  arranged: 'organizado',
  around: 'alrededor de',
  ask: 'pregunte',
  attention: 'atención',
  available: 'disponible',
  avoid: 'evitar',
  balancing: 'equilibrando',
  based: 'basado',
  be: 'estar',
  before: 'antes',
  better: 'mejor',
  billing: 'facturación',
  brand: 'marca',
  bring: 'traiga',
  budget: 'presupuesto',
  building: 'creando',
  built: 'creado',
  busy: 'ocupados',
  call: 'llame',
  can: 'puede',
  care: 'atención',
  caregiver: 'cuidador',
  caregivers: 'cuidadores',
  card: 'tarjeta',
  categories: 'categorías',
  category: 'categoría',
  cbd: 'CBD',
  center: 'centro',
  certain: 'ciertas',
  challenges: 'dificultades',
  check: 'revisar',
  choose: 'elegir',
  choices: 'opciones',
  city: 'ciudad',
  clarity: 'claridad',
  clear: 'claro',
  clearer: 'más claras',
  clinical: 'clínico',
  cold: 'frío',
  common: 'comunes',
  communication: 'comunicación',
  community: 'comunidad',
  comparing: 'comparando',
  complements: 'complementa',
  complicated: 'complicado',
  compounding: 'preparación',
  concern: 'inquietud',
  concerns: 'inquietudes',
  confident: 'confiados',
  confusion: 'confusión',
  connect: 'conectar',
  consistency: 'constancia',
  consultations: 'consultas',
  contact: 'contacto',
  continuity: 'continuidad',
  control: 'control',
  coordination: 'coordinación',
  cost: 'costo',
  coverage: 'cobertura',
  covered: 'cubierto',
  created: 'creado',
  crowded: 'llenos',
  current: 'actual',
  custom: 'personalizado',
  customized: 'personalizada',
  daily: 'diarias',
  date: 'fecha',
  day: 'día',
  delivery: 'entrega',
  dependable: 'confiable',
  deserve: 'merecen',
  designed: 'diseñado',
  details: 'detalles',
  diabetic: 'diabéticos',
  diagnosis: 'diagnóstico',
  different: 'diferente',
  difficult: 'difíciles',
  directions: 'indicaciones',
  disease: 'enfermedad',
  dosage: 'dosis',
  drug: 'medicamento',
  drugs: 'medicamentos',
  easier: 'más fácil',
  easy: 'fácil',
  education: 'educación',
  eligible: 'elegibles',
  emergency: 'emergencia',
  encourage: 'fomentan',
  encourages: 'fomenta',
  equipment: 'equipo',
  essentials: 'esenciales',
  every: 'cada',
  everyday: 'diario',
  experience: 'experiencia',
  explain: 'explicar',
  explains: 'explica',
  explaining: 'explicando',
  explore: 'explorar',
  extension: 'extensión',
  families: 'familias',
  family: 'familia',
  fast: 'rápido',
  faster: 'más rápido',
  feel: 'sentirse',
  feels: 'se siente',
  fewer: 'menos',
  find: 'encontrar',
  fit: 'adecuado',
  focused: 'enfocado',
  follow: 'seguimiento',
  following: 'siguiendo',
  for: 'para',
  form: 'forma',
  free: 'gratis',
  friendly: 'amable',
  from: 'de',
  fulfillment: 'cumplimiento',
  future: 'futuro',
  general: 'general',
  generic: 'genéricos',
  get: 'obtener',
  getting: 'obtener',
  goals: 'metas',
  guidance: 'orientación',
  guide: 'guía',
  habits: 'hábitos',
  happy: 'encantados',
  health: 'salud',
  healthier: 'más saludables',
  help: 'ayuda',
  helpful: 'útil',
  helps: 'ayuda',
  herbal: 'herbal',
  herbals: 'herbales',
  home: 'casa',
  household: 'hogar',
  households: 'hogares',
  how: 'cómo',
  immunization: 'inmunización',
  immunizations: 'vacunas',
  improves: 'mejora',
  including: 'incluyendo',
  informed: 'informadas',
  information: 'información',
  ingredient: 'ingrediente',
  insurance: 'seguro',
  interaction: 'interacción',
  items: 'artículos',
  kind: 'tipo',
  labels: 'etiquetas',
  less: 'menos',
  line: 'línea',
  links: 'enlaces',
  list: 'lista',
  listening: 'escuchando',
  local: 'local',
  locations: 'ubicaciones',
  long: 'largo',
  lookup: 'búsqueda',
  lower: 'menor',
  maintenance: 'mantenimiento',
  major: 'principales',
  make: 'hacer',
  makes: 'hace',
  making: 'haciendo',
  manageable: 'manejable',
  manage: 'manejar',
  managing: 'manejando',
  many: 'muchos',
  mart: 'Mart',
  materials: 'materiales',
  may: 'puede',
  medication: 'medicamento',
  medications: 'medicamentos',
  medicine: 'medicina',
  medicines: 'medicinas',
  monthly: 'mensual',
  more: 'más',
  most: 'mayoría',
  move: 'mover',
  moved: 'transferidas',
  multiple: 'múltiples',
  name: 'nombre',
  navigating: 'navegar',
  need: 'necesita',
  needed: 'necesarios',
  needs: 'necesidades',
  neighborhood: 'vecindario',
  new: 'nuevo',
  next: 'siguiente',
  no: 'no',
  not: 'no',
  number: 'número',
  of: 'de',
  offer: 'ofrecer',
  offered: 'ofrecido',
  office: 'oficina',
  oil: 'aceite',
  on: 'en',
  one: 'uno',
  ongoing: 'continuo',
  onsite: 'en sitio',
  open: 'abrir',
  option: 'opción',
  options: 'opciones',
  or: 'o',
  order: 'pedido',
  organization: 'organización',
  organized: 'organizado',
  our: 'nuestro',
  out: 'fuera',
  over: 'sobre',
  oversight: 'supervisión',
  packaging: 'empaque',
  parent: 'padre',
  part: 'parte',
  patient: 'paciente',
  patients: 'pacientes',
  paying: 'pagando',
  payment: 'pago',
  personal: 'personal',
  personalized: 'personalizada',
  pet: 'mascota',
  pets: 'mascotas',
  pharmacy: 'farmacia',
  pharmacist: 'farmacéutico',
  phone: 'teléfono',
  pickup: 'recogida',
  pickups: 'recogidas',
  pill: 'pastilla',
  plan: 'plan',
  planned: 'planificada',
  planning: 'planificación',
  plans: 'planes',
  please: 'por favor',
  possible: 'posible',
  practical: 'práctico',
  practices: 'prácticas',
  prepare: 'preparar',
  prepared: 'preparados',
  present: 'presente',
  prescription: 'receta',
  prescriptions: 'recetas',
  prevention: 'prevención',
  preventive: 'preventivo',
  pricing: 'precios',
  process: 'proceso',
  product: 'producto',
  products: 'productos',
  prompt: 'rápidas',
  provide: 'brindar',
  provider: 'proveedor',
  questions: 'preguntas',
  quick: 'rápido',
  quickly: 'rápidamente',
  read: 'leer',
  readiness: 'preparación',
  ready: 'listo',
  real: 'real',
  receive: 'recibir',
  recurring: 'recurrentes',
  reduce: 'reducir',
  refill: 'renovación',
  refills: 'renovaciones',
  regimen: 'régimen',
  reliable: 'confiable',
  reminders: 'recordatorios',
  repeat: 'repetidas',
  request: 'solicitud',
  resources: 'recursos',
  rest: 'resto',
  review: 'revisión',
  reviews: 'revisa',
  rhythm: 'ritmo',
  right: 'adecuado',
  routine: 'rutina',
  routines: 'rutinas',
  rushed: 'apresuradas',
  safe: 'seguro',
  safer: 'más seguro',
  safety: 'seguridad',
  same: 'mismo',
  scheduling: 'programación',
  screening: 'evaluación',
  screenings: 'exámenes',
  selected: 'seleccionados',
  selection: 'selección',
  send: 'enviar',
  service: 'servicio',
  services: 'servicios',
  setup: 'configuración',
  share: 'comparta',
  shelf: 'estante',
  shelves: 'estantes',
  simpler: 'más simple',
  simplifies: 'simplifica',
  simplify: 'simplificar',
  smooth: 'fluido',
  smoother: 'más fluido',
  so: 'para que',
  specific: 'específico',
  spend: 'pasen',
  stability: 'estabilidad',
  standard: 'estándar',
  start: 'iniciar',
  starting: 'comenzando',
  status: 'estado',
  stay: 'mantenerse',
  steady: 'estable',
  stock: 'inventario',
  storage: 'almacenamiento',
  straightforward: 'sencilla',
  strength: 'concentración',
  stressful: 'estresante',
  support: 'apoyo',
  supportive: 'de apoyo',
  supports: 'apoya',
  switching: 'cambiando',
  synchronization: 'sincronización',
  take: 'tomar',
  taking: 'tomando',
  team: 'equipo',
  technology: 'tecnología',
  than: 'que',
  that: 'que',
  the: 'el',
  their: 'sus',
  them: 'ellos',
  therapy: 'terapia',
  they: 'ellos',
  thoughtful: 'considerado',
  through: 'a través de',
  time: 'tiempo',
  timing: 'tiempo',
  to: 'a',
  today: 'hoy',
  tool: 'herramienta',
  touchpoints: 'puntos de contacto',
  transfer: 'transferir',
  transfers: 'transferencias',
  transportation: 'transporte',
  treats: 'trata',
  trusted: 'confiable',
  understand: 'entender',
  understanding: 'comprensión',
  unnecessary: 'innecesarios',
  use: 'uso',
  useful: 'útil',
  usual: 'habitual',
  vaccine: 'vacuna',
  vaccinations: 'vacunas',
  value: 'valora',
  veterinary: 'veterinarios',
  view: 'ver',
  visibility: 'visibilidad',
  visit: 'visitar',
  want: 'quieren',
  warm: 'cálido',
  warmth: 'calidez',
  way: 'manera',
  we: 'nosotros',
  well: 'bien',
  wellness: 'bienestar',
  when: 'cuando',
  where: 'dónde',
  whether: 'si',
  who: 'quién',
  with: 'con',
  without: 'sin',
  work: 'trabajar',
  works: 'funciona',
  yes: 'sí',
  you: 'usted',
  your: 'su',
  zip: 'código postal',
};

const translatableAttributes = ['aria-label', 'title', 'placeholder', 'alt', 'data-a11y-tooltip'] as const;

type TranslatableAttribute = (typeof translatableAttributes)[number];

function normalize(value: string) {
  return value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function phraseKey(value: string) {
  return normalize(value).replace(/\u2019/g, "'").replace(/today's/g, "today's");
}

function applyCapitalization(source: string, translated: string) {
  if (source.length > 1 && source === source.toUpperCase()) {
    return translated.toUpperCase();
  }

  if (source[0] === source[0].toUpperCase()) {
    return `${translated.charAt(0).toUpperCase()}${translated.slice(1)}`;
  }

  return translated;
}

function translateWord(word: string) {
  const key = word.toLowerCase().replace(/\u2019/g, "'");
  const translated = wordTranslations[key];

  if (!translated) {
    return word;
  }

  return applyCapitalization(word, translated);
}

function translateFallback(value: string) {
  const words = value.match(/[A-Za-z][A-Za-z'\u2019-]*/g) ?? [];

  if (words.length === 0 || words.length > 3) {
    return value;
  }

  let hasMissingTranslation = false;
  const translated = value.replace(/[A-Za-z][A-Za-z'\u2019-]*/g, (word) => {
    const key = word.toLowerCase().replace(/\u2019/g, "'");

    if (!wordTranslations[key]) {
      hasMissingTranslation = true;
      return word;
    }

    return translateWord(word);
  });

  return hasMissingTranslation ? value : translated;
}

export function translateTextValue(value: string, language: Language) {
  if (language === 'en' || !/[A-Za-z]/.test(value)) {
    return value;
  }

  const leadingWhitespace = value.match(/^\s*/)?.[0] ?? '';
  const trailingWhitespace = value.match(/\s*$/)?.[0] ?? '';
  const trimmed = normalize(value);
  const key = phraseKey(trimmed);
  const dictionary = translationDictionaries[language];
  const direct = dictionary[key] ?? dictionary[trimmed];

  return `${leadingWhitespace}${direct ?? translateFallback(trimmed)}${trailingWhitespace}`;
}

function isKnownRenderedValue(value: string, original: string) {
  return supportedLanguages.some((candidateLanguage) => value === translateTextValue(original, candidateLanguage));
}

function shouldSkipNode(node: Node) {
  const element = node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;

  if (!element) {
    return true;
  }

  return Boolean(element.closest('[data-no-translate="true"], svg, script, style, code, pre'));
}

export function useSiteTranslation(language: Language) {
  const textOriginalsRef = useRef(new WeakMap<Text, string>());
  const attributeOriginalsRef = useRef(new WeakMap<Element, Partial<Record<TranslatableAttribute, string>>>());

  useEffect(() => {
    document.documentElement.lang = language === 'es' ? 'es' : 'en';
    window.localStorage.setItem(translationStorageKey, language);
  }, [language]);

  useEffect(() => {
    const root = document.getElementById('root');
    const textOriginals = textOriginalsRef.current;
    const attributeOriginals = attributeOriginalsRef.current;
    let isApplying = false;
    let isDisposed = false;
    let queuedFrame: number | undefined;

    if (!root) {
      return undefined;
    }

    const translateTextNode = (node: Text) => {
      if (shouldSkipNode(node)) {
        return;
      }

      const currentValue = node.nodeValue ?? '';
      const existingOriginal = textOriginals.get(node);

      if (!existingOriginal) {
        textOriginals.set(node, currentValue);
      } else if (!isKnownRenderedValue(currentValue, existingOriginal)) {
        textOriginals.set(node, currentValue);
      }

      const original = textOriginals.get(node) ?? '';
      const translated = translateTextValue(original, language);

      if (node.nodeValue !== translated) {
        node.nodeValue = translated;
      }
    };

    const translateElementAttributes = (element: Element) => {
      if (shouldSkipNode(element)) {
        return;
      }

      let originals = attributeOriginals.get(element);

      translatableAttributes.forEach((attribute) => {
        const currentValue = element.getAttribute(attribute);

        if (!currentValue) {
          return;
        }

        if (!originals) {
          originals = {};
          attributeOriginals.set(element, originals);
        }

        if (!originals[attribute]) {
          originals[attribute] = currentValue;
        } else {
          const original = originals[attribute] ?? currentValue;

          if (!isKnownRenderedValue(currentValue, original)) {
            originals[attribute] = currentValue;
          }
        }

        const translated = translateTextValue(originals[attribute] ?? currentValue, language);

        if (element.getAttribute(attribute) !== translated) {
          element.setAttribute(attribute, translated);
        }
      });
    };

    const applyTranslations = () => {
      if (isDisposed) {
        return;
      }

      isApplying = true;

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
      let current: Node | null = walker.currentNode;

      while (current) {
        if (current.nodeType === Node.TEXT_NODE) {
          translateTextNode(current as Text);
        } else if (current.nodeType === Node.ELEMENT_NODE) {
          translateElementAttributes(current as Element);
        }

        current = walker.nextNode();
      }

      window.requestAnimationFrame(() => {
        if (!isDisposed) {
          isApplying = false;
        }
      });
    };

    const queueTranslations = () => {
      if (queuedFrame !== undefined) {
        return;
      }

      queuedFrame = window.requestAnimationFrame(() => {
        queuedFrame = undefined;
        applyTranslations();
      });
    };

    applyTranslations();

    const observer = new MutationObserver(() => {
      if (isApplying) {
        return;
      }

      queueTranslations();
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: [...translatableAttributes],
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => {
      isDisposed = true;

      if (queuedFrame !== undefined) {
        window.cancelAnimationFrame(queuedFrame);
      }

      observer.disconnect();
    };
  }, [language]);
}

export function getStoredLanguage(): Language {
  return window.localStorage.getItem(translationStorageKey) === 'es' ? 'es' : 'en';
}
