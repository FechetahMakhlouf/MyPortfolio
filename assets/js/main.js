/*=============== TRANSLATIONS ===============*/
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.resume': 'Resume',
        'nav.contact': 'Contact',

        'home.greeting': "Hi, I'm a",
        'home.description': 'Master\'s student in Artificial Intelligence at the University of Bouira, Algeria. Python developer passionate about web development, data science, and AI technologies. Certified in Python Mastery with a solid foundation in full-stack development.',
        'home.cv': 'CV',
        'home.projects': 'Projects',

        'about.title': 'About Me',
        'about.description': 'I am a computer science student specializing in Information Systems and Artificial Intelligence. I have a strong foundation in programming with Python, web development, and databases, and I am continuously improving my skills through projects and certifications.',
        'about.contact': 'Contact Me',
        'about.skills': 'Skills',
        'about.algo': 'Algorithms & Data Structures',
        'about.data': 'Data Analysis',
        'about.certifications': 'Certifications',

        'cert.python': 'Complete Mastery Python',
        'cert.git': 'Complete Mastery Git & Github',
        'cert.sql': 'Complete Mastery SQL',
        'cert.gemini': 'Google Gemini Certificate',

        'project.view': 'View Project',
        'project1.title': 'Medical Desktop App',
        'project1.desc': 'SONATRACH Medical Management System.',
        'project2.title': 'CFPA website',
        'project2.desc': 'A comprehensive web application for managing a professional training center.',
        'project3.title': 'Jadwal - Time Management App',
        'project3.desc': 'A comprehensive web application for weekly schedule management with automatic planning generation.',

        'resume.title': 'My Resume',
        'resume.education': 'Education',
        'resume.experience': 'Experience',

        'edu1.title': "Master's Degree in Computer Science - Artificial Intelligence",
        'edu1.desc': "First year of Master's degree, specializing in Artificial Intelligence (in progress).",
        'edu2.title': "Bachelor's Degree in Computer Science - Computer Systems",
        'edu2.desc': 'Diploma obtained in June 2025.',
        'edu3.title': 'Baccalaureate in Experimental Sciences',
        'edu3.desc': 'Grade: Fairly Good (12.96).',

        'exp1.title': 'Practical Internship',
        'exp1.desc': 'Practical internship in Computer Systems at the national company SONATRACH.',

        'contact.title': 'Contact Me',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.message': 'Message',
        'contact.send': 'Send Message',
        'contact.location': 'Algeria, Bouira, Saharidj',
        'contact.success': 'Message sent successfully ✅',

        'footer.copy': '© 2026 All Rights Reserved | Makhlouf Fechetah',

        'typed.strings': ['AI Engineering Student', 'Python Developer', 'Web Developer'],
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.projects': 'Projets',
        'nav.resume': 'CV',
        'nav.contact': 'Contact',

        'home.greeting': "Bonjour, je suis",
        'home.description': "Étudiant en Master d'Intelligence Artificielle à l'Université de Bouira, Algérie. Développeur Python passionné par le développement web, la science des données et les technologies IA. Certifié en Python avec une solide base en développement full-stack.",
        'home.cv': 'CV',
        'home.projects': 'Projets',

        'about.title': 'À propos de moi',
        'about.description': "Je suis étudiant en informatique spécialisé en Systèmes d'Information et Intelligence Artificielle. J'ai de solides bases en programmation Python, développement web et bases de données, et j'améliore continuellement mes compétences à travers des projets et des certifications.",
        'about.contact': 'Me Contacter',
        'about.skills': 'Compétences',
        'about.algo': 'Algorithmes & Structures de Données',
        'about.data': 'Analyse de Données',
        'about.certifications': 'Certifications',

        'cert.python': 'Maîtrise Complète Python',
        'cert.git': 'Maîtrise Complète Git & Github',
        'cert.sql': 'Maîtrise Complète SQL',
        'cert.gemini': 'Certificat Google Gemini',

        'project.view': 'Voir le Projet',
        'project1.title': 'Application Médicale Desktop',
        'project1.desc': 'Système de Gestion Médicale SONATRACH.',
        'project2.title': 'Site Web CFPA',
        'project2.desc': "Une application web complète pour la gestion d'un centre de formation professionnelle.",
        'project3.title': 'Jadwal - Application de Gestion du Temps',
        'project3.desc': "Une application web complète pour la gestion d'emplois du temps hebdomadaires avec génération automatique de plannings.",

        'resume.title': 'Mon Curriculum Vitae',
        'resume.education': 'Formation',
        'resume.experience': 'Expérience',

        'edu1.title': "Master en Informatique - Intelligence Artificielle",
        'edu1.desc': "Première année de master, spécialité Intelligence Artificielle (en cours).",
        'edu2.title': "Licence en Informatique - Systèmes Informatiques",
        'edu2.desc': 'Diplôme obtenu en juin 2025.',
        'edu3.title': 'Baccalauréat en Sciences Expérimentales',
        'edu3.desc': 'Mention : Assez Bien (12.96).',

        'exp1.title': 'Stage Pratique',
        'exp1.desc': "Stage pratique en systèmes informatiques au sein de l'entreprise nationale SONATRACH.",

        'contact.title': 'Me Contacter',
        'contact.name': 'Nom',
        'contact.email': 'E-mail',
        'contact.message': 'Message',
        'contact.send': 'Envoyer le Message',
        'contact.location': 'Algérie, Bouira, Saharidj',
        'contact.success': 'Message envoyé avec succès ✅',

        'footer.copy': '© 2026 Tous droits réservés | Makhlouf Fechetah',

        'typed.strings': ["Étudiant en Ingénierie IA", "Développeur Python", "Développeur Web"],
    }
}

/*=============== LANGUAGE SYSTEM ===============*/
let currentLang = localStorage.getItem('selected-lang') || 'en'
let typedInstance = null

const applyTranslations = (lang) => {
    const t = translations[lang]
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n')
        if (t[key] !== undefined) {
            el.textContent = t[key]
        }
    })
    document.documentElement.lang = lang
}

const updateTyped = (lang) => {
    if (typedInstance) {
        typedInstance.destroy()
    }
    typedInstance = new Typed('#home-typed', {
        strings: translations[lang]['typed.strings'],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        cursorChar: '_',
    })
}

const setLang = (lang) => {
    currentLang = lang
    localStorage.setItem('selected-lang', lang)
    applyTranslations(lang)
    updateTyped(lang)

    // Sync ALL lang buttons across both switchers (desktop + mobile)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active-lang', btn.getAttribute('data-lang') === lang)
    })
}

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TYPED JS (init via setLang) ===============*/
// Typed is now initialised inside setLang()

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== CONTACT EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')
const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm('service_aehzd58', 'template_gphnkq4', '#contact-form', 'atIWWnt_-mYRrXXOz')
    contactMessage.textContent = translations[currentLang]['contact.success']
    setTimeout(() => {
        contactMessage.textContent = ''
    }, 5000)
    contactForm.reset()
}
contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
const scrollActive = () => {
    const scrollDown = window.scrollY
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
})
sr.reveal(`.home__content, .resume__content:nth-child(1), .footer__container`)
sr.reveal(`.home__data, .resume__content:nth-child(2)`, { delay: 300, origin: 'bottom' })
sr.reveal(`.about__content, .contact__content`, { origin: 'bottom' })
sr.reveal(`.about__image, .contact__form`, { delay: 300 })
sr.reveal(`.projects__card`, { interval: 100 })

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== LANGUAGE SWITCHER EVENTS ===============*/
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')))
})

/*=============== INIT LANGUAGE ON PAGE LOAD ===============*/
setLang(currentLang)

/*=============== PARTICLES.JS ===============*/
if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles-js', 'assets/particles.json', function () {
        console.log('Particles.js loaded');
    });
}

/*=============== VANILLA TILT ===============*/
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".projects__card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
    });
}