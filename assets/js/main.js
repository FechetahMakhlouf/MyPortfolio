/*=============== TRANSLATIONS ===============*/
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.resume': 'Resume',
        'nav.contact': 'Contact',

        'home.available': 'Currently working : not available at the moment',
        'home.greeting': "Hi, I'm a",
        'home.description': "Master's student in Artificial Intelligence at the University of Bouira, Algeria. Python developer with a strong passion for web development, data science, and AI.",
        'home.stats.projects': 'Projects',
        'home.stats.certs': 'Certifications',
        'home.cv': 'Download CV',
        'home.projects': 'View Projects',

        'about.subtitle': 'Get to know me',
        'about.title': 'About Me',
        'about.whoami': 'Who am I?',
        'about.mission': 'My Mission',
        'about.missionText': "I love turning ideas into code and continuously improving through real-world projects. Currently pursuing the Deep Learning Specialisation to master CNNs, RNNs, and Transformers.",
        'about.description': "I'm a computer science student specialising in Information Systems and Artificial Intelligence. I've built a solid foundation in Python, web development, databases, and machine learning.",
        'about.skills': 'Technical Skills',
        'about.certifications': 'Certifications',
        'cert.download': 'Download',

        'cert.coursera': 'Neural Networks & Deep Learning',
        'cert.python': 'Complete Python Mastery',
        'cert.git': 'Complete Git & GitHub',
        'cert.sql': 'Complete SQL Mastery',
        'cert.gemini': 'Google Gemini Certificate',

        'projects.subtitle': 'My recent work',
        'project.code': 'Code',
        'project.demo': 'Demo',
        'project.live': 'Live',

        'project1.title': 'Medical Desktop App',
        'project1.desc': 'SONATRACH Medical Management System - Complete desktop application for managing medical records.',
        'project2.title': 'CFPA Website',
        'project2.collab': 'Collaboration with',
        'project2.desc': 'A comprehensive web application for managing a professional training center with student management. (Collaboration with Omar Ferradj)',
        'project3.title': 'Jadwal - Time Management',
        'project3.desc': 'Weekly schedule management with automatic planning generation and task tracking.',
        'project4.title': 'Cat vs Non-Cat Detector',
        'project4.desc': 'Neural Network classifier to detect cats in images with data augmentation pipeline.',

        'resume.subtitle': 'My journey',
        'resume.title': 'Resume',
        'resume.education': 'Education',
        'resume.experience': 'Experience',
        'resume.quickStats': 'Quick Stats',
        'resume.codes': 'Lines of Code',
        'resume.commits': 'Git Commits',

        'edu1.title': "Master's in AI",
        'edu1.desc': 'Specializing in Artificial Intelligence (in progress).',
        'edu2.title': "Bachelor's in CS",
        'edu2.desc': 'Computer Systems - Diploma obtained in June 2025.',
        'edu3.title': 'Baccalaureate',
        'edu3.desc': 'Experimental Sciences.',

        'exp1.title': 'Practical Internship',
        'exp1.desc': 'Practical internship in Computer Systems at the national company SONATRACH.',

        'contact.subtitle': 'Get in touch',
        'contact.title': 'Contact Me',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Phone',
        'contact.locationTitle': 'Location',
        'contact.location': 'Algeria, Bouira, Saharidj',
        'contact.timezone': 'GMT+1',
        'contact.send': 'Send Email',
        'contact.call': 'Call Now',
        'contact.follow': 'Follow Me',
        'contact.formTitle': 'Send a Message',
        'contact.formDesc': "I'll get back to you as soon as possible!",
        'contact.name': 'Your Name',
        'contact.email': 'Your Email',
        'contact.message': 'Your Message',
        'contact.sendBtn': 'Send Message',
        'contact.success': 'Message sent successfully! ✅',

        'footer.tagline': 'Building the future with code and AI',
        'footer.quickLinks': 'Quick Links',
        'footer.follow': 'Follow Me',
        'footer.copy': '© 2025 All Rights Reserved | Makhlouf Fechetah',

        'typed.strings': ['AI Engineering Student', 'Python Developer', 'Web Developer'],
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.about': 'Àpropos',
        'nav.projects': 'Projets',
        'nav.resume': 'CV',
        'nav.contact': 'Contact',

        'home.available': 'Occupé : pas disponible pour le moment',
        'home.greeting': "Bonjour, je suis",
        'home.description': "Étudiant en Master d'Intelligence Artificielle à l'Université de Bouira, Algérie. Développeur Python passionné par le développement web, la science des données et l'IA.",
        'home.stats.projects': 'Projets',
        'home.stats.certs': 'Certifications',
        'home.cv': 'Télécharger CV',
        'home.projects': 'Voir Projets',

        'about.subtitle': 'Faites ma connaissance',
        'about.title': 'À propos de moi',
        'about.whoami': 'Qui suis-je?',
        'about.mission': 'Ma Mission',
        'about.missionText': "J'aime transformer les idées en code et m'améliorer continuellement grâce à des projets concrets. Actuellement en spécialisation Deep Learning pour maîtriser les CNN, RNN et Transformers.",
        'about.description': "Je suis étudiant en informatique, spécialisé dans les Systèmes d'Information et l'Intelligence Artificielle. J'ai acquis de solides bases en Python, développement web, bases de données et apprentissage automatique.",
        'about.skills': 'Compétences Techniques',
        'about.certifications': 'Certifications',
        'cert.download': 'Télécharger',

        'cert.coursera': 'Réseaux de Neurones & Deep Learning',
        'cert.python': 'Maîtrise Complète Python',
        'cert.git': 'Maîtrise Complète Git & GitHub',
        'cert.sql': 'Maîtrise Complète SQL',
        'cert.gemini': 'Certificat Google Gemini',

        'projects.subtitle': 'Mes travaux récents',
        'project.code': 'Code',
        'project.demo': 'Démo',
        'project.live': 'Live',

        'project1.title': 'Application Médicale Desktop',
        'project1.desc': "Système de Gestion Médicale SONATRACH - Application desktop complète pour la gestion des dossiers médicaux.",
        'project2.title': 'Site Web CFPA',
        'project2.collab': 'Collaboration avec',
        'project2.desc': "Une application web complète pour la gestion d'un centre de formation professionnelle. (Collaboration avec Omar Ferradj)",
        'project3.title': 'Jadwal - Gestion du Temps',
        'project3.desc': "Gestion d'emplois du temps hebdomadaires avec génération automatique de plannings.",
        'project4.title': 'Détecteur Chat / Non-Chat',
        'project4.desc': "Classificateur réseau de neurones pour détecter les chats dans des images.",

        'resume.subtitle': 'Mon parcours',
        'resume.title': 'Curriculum Vitae',
        'resume.education': 'Formation',
        'resume.experience': 'Expérience',
        'resume.quickStats': 'Statistiques',
        'resume.codes': 'Lignes de Code',
        'resume.commits': 'Commits Git',

        'edu1.title': "Master en IA",
        'edu1.desc': "Spécialisation en Intelligence Artificielle (en cours).",
        'edu2.title': "Licence en Info",
        'edu2.desc': 'Systèmes Informatiques - Diplôme obtenu en juin 2025.',
        'edu3.title': 'Baccalauréat',
        'edu3.desc': 'Sciences Expérimentales.',

        'exp1.title': 'Stage Pratique',
        'exp1.desc': "Stage pratique en systèmes informatiques au sein de l'entreprise nationale SONATRACH.",

        'contact.subtitle': 'Contactez-moi',
        'contact.title': 'Me Contacter',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Téléphone',
        'contact.locationTitle': 'Localisation',
        'contact.location': 'Algérie, Bouira, Saharidj',
        'contact.timezone': 'GMT+1',
        'contact.send': 'Envoyer Email',
        'contact.call': 'Appeler',
        'contact.follow': 'Suivez-moi',
        'contact.formTitle': 'Envoyer un Message',
        'contact.formDesc': "Je vous répondrai dès que possible!",
        'contact.name': 'Votre Nom',
        'contact.email': 'Votre Email',
        'contact.message': 'Votre Message',
        'contact.sendBtn': 'Envoyer le Message',
        'contact.success': 'Message envoyé avec succès! ✅',

        'footer.tagline': "Construire l'avenir avec le code et l'IA",
        'footer.quickLinks': 'Liens Rapides',
        'footer.follow': 'Suivez-moi',
        'footer.copy': '© 2025 Tous droits réservés | Makhlouf Fechetah',

        'typed.strings': ["Étudiant en Ingénierie IA", "Développeur Python", "Développeur Web"],
    }
};

/*=============== LANGUAGE SYSTEM ===============*/
let currentLang = localStorage.getItem('selected-lang') || 'en';
let typedInstance = null;

const applyTranslations = (lang) => {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });
    document.documentElement.lang = lang;
};

const updateTyped = (lang) => {
    if (typedInstance) {
        typedInstance.destroy();
    }
    typedInstance = new Typed('#home-typed', {
        strings: translations[lang]['typed.strings'],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        cursorChar: '_',
    });
};

const setLang = (lang) => {
    currentLang = lang;
    localStorage.setItem('selected-lang', lang);
    applyTranslations(lang);
    updateTyped(lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active-lang', btn.getAttribute('data-lang') === lang);
    });
};

/*=============== MOBILE MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
    });
}

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
    });
});

/*=============== HEADER SHADOW ===============*/
const header = document.getElementById('header');
const shadowHeader = () => {
    if (window.scrollY >= 50) {
        header.classList.add('shadow-header');
    } else {
        header.classList.remove('shadow-header');
    }
};
window.addEventListener('scroll', shadowHeader);

/*=============== SCROLL UP ===============*/
const scrollUp = document.getElementById('scroll-up');
const showScrollUp = () => {
    if (window.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
};
window.addEventListener('scroll', showScrollUp);

/*=============== ACTIVE LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');
const scrollActive = () => {
    const scrollY = window.scrollY;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active-link');
        } else {
            link?.classList.remove('active-link');
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form submission
        contactMessage.textContent = translations[currentLang]['contact.success'];
        contactMessage.style.color = 'var(--first-color)';

        setTimeout(() => {
            contactMessage.textContent = '';
        }, 5000);

        contactForm.reset();
    });
}

/*=============== THEME TOGGLE (LIGHT/DARK) ===============*/
const themeButton = document.getElementById('theme-button');
const lightThemeClass = 'light-theme';
const iconTheme = 'ri-sun-line'; // icône pour le mode clair (soleil)

// Vérifier le thème sauvegardé
const selectedTheme = localStorage.getItem('selected-theme');
if (selectedTheme === 'light') {
    document.body.classList.add(lightThemeClass);
    themeButton.classList.add(iconTheme);
    themeButton.classList.remove('ri-moon-line');
} else {
    document.body.classList.remove(lightThemeClass);
    themeButton.classList.remove(iconTheme);
    themeButton.classList.add('ri-moon-line');
}

// Basculer le thème au clic
if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(lightThemeClass);

        if (document.body.classList.contains(lightThemeClass)) {
            themeButton.classList.add(iconTheme);
            themeButton.classList.remove('ri-moon-line');
            localStorage.setItem('selected-theme', 'light');
        } else {
            themeButton.classList.remove(iconTheme);
            themeButton.classList.add('ri-moon-line');
            localStorage.setItem('selected-theme', 'dark');
        }
    });
}
/*=============== LANGUAGE SWITCHER ===============*/
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
});

/*=============== SCROLL REVEAL ===============*/
const initScrollReveal = () => {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '40px',
        duration: 1000,
        delay: 100,
        reset: false,
    });

    sr.reveal('.home__content, .section-header', { delay: 100 });
    sr.reveal('.home__data', { delay: 200, origin: 'bottom' });
    sr.reveal('.about__card, .skill-category', { interval: 100, origin: 'left' });
    sr.reveal('.certification__card', { interval: 100, origin: 'bottom' });
    sr.reveal('.project__card', { interval: 150, origin: 'bottom' });
    sr.reveal('.timeline-item', { interval: 100, origin: 'left' });
    sr.reveal('.contact__card', { interval: 100, origin: 'right' });
    sr.reveal('.contact__form', { delay: 200, origin: 'bottom' });
};

/*=============== PARTICLES.JS ===============*/
const initParticles = () => {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: '#00b8b8' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00b8b8',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.8 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
};

/*=============== VANILLA TILT ===============*/
const initVanillaTilt = () => {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 8,
            speed: 400,
            glare: false,
            scale: 1.02,
        });
    }
};

/*=============== SMOOTH SCROLL ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*=============== INITIALIZATION ===============*/
document.addEventListener('DOMContentLoaded', () => {
    setLang(currentLang);
    initScrollReveal();
    initParticles();
    initVanillaTilt();
});
