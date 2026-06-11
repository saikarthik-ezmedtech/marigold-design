import { useEffect, useRef } from 'react';

export type Language = 'en' | 'es';

const translationStorageKey = 'marigold-language';

const phraseTranslations: Record<string, string> = {
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
  return value.replace(/[A-Za-z][A-Za-z'\u2019-]*/g, (word) => translateWord(word));
}

export function translateTextValue(value: string, language: Language) {
  if (language === 'en' || !/[A-Za-z]/.test(value)) {
    return value;
  }

  const leadingWhitespace = value.match(/^\s*/)?.[0] ?? '';
  const trailingWhitespace = value.match(/\s*$/)?.[0] ?? '';
  const trimmed = normalize(value);
  const key = phraseKey(trimmed);
  const direct = phraseTranslations[key] ?? phraseTranslations[trimmed];

  return `${leadingWhitespace}${direct ?? translateFallback(trimmed)}${trailingWhitespace}`;
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
      } else {
        const previousTranslated = translateTextValue(existingOriginal, language);

        if (currentValue !== existingOriginal && currentValue !== previousTranslated) {
          textOriginals.set(node, currentValue);
        }
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
          const previousTranslated = translateTextValue(originals[attribute] ?? currentValue, language);

          if (currentValue !== originals[attribute] && currentValue !== previousTranslated) {
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
        isApplying = false;
      });
    };

    applyTranslations();

    const observer = new MutationObserver(() => {
      if (isApplying) {
        return;
      }

      window.requestAnimationFrame(applyTranslations);
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: [...translatableAttributes],
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [language]);
}

export function getStoredLanguage(): Language {
  return window.localStorage.getItem(translationStorageKey) === 'es' ? 'es' : 'en';
}
