import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError(
        "API GEMINI_API_KEY n'est pas définie dans le fichier .env")

GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key={API_KEY}"

SYSTEM_CONTEXT = """Tu es un assistant professionnel pour Fechetah Makhlouf. Tu réponds de manière courtoise, précise et bien structurée.

Voici des informations complètes sur FECHETAH Makhlouf :

INFORMATIONS PERSONNELLES:
- Nom complet: FECHETAH Makhlouf
- Date de naissance: 10/02/2003 à M'chedallah
- Adresse: SAHARIDJ W BOUIRA
- Statut: Célibataire
- Nationalité: Algérien
- Téléphone: +213 666 218 828
- Email: makhlouffechetah65@gmail.com

FORMATION ACADÉMIQUE:
- 2025-2027: Master en Informatique – Intelligence Artificielle (en cours) – Université de Bouira (Akli Mohand Oulhadj)
  - Master 1 (2025-2026) : moyenne annuelle 15,04/20 (S1 14,33 | S2 15,71), 60/60 crédits en session normale
  - Notes : Représentation des connaissances 16,00 ; Gestion de l'incertitude 16,20 ; Systèmes multi-agents 16,00 ; Deep Learning 14,85 ; Machine Learning 14,20 ; Analyse de données 15,10 ; Bases de données avancées 14,46 ; Vision par ordinateur 13,65 ; Cybercriminalité 18,00 ; Modélisation & Simulation 16,75 ; Virtualisation & Cloud 16,60 ; Gestion de projet IT 15,81
  - Master 2 (2026-2027) : actuellement inscrit
- 2022-2025: Licence en Informatique – Systèmes Informatiques – Université de Bouira
  - 180 crédits, moyenne générale 12,06/20 (L1 11,57 | L2 12,05 | L3 12,54), meilleur semestre S6 13,01
  - Toutes les années validées en session normale ; projet de fin d'études 17,00/20 ; IA 17,10 ; Bases de données 15,40
- 2022: Baccalauréat Sciences Expérimentales – Lycée Belkacemi Ali (mention Assez Bien, 12,94/20)

EXPÉRIENCE PROFESSIONNELLE:
- Fév–Avr 2025 (60 jours) : Stagiaire IT – Systèmes d'Information chez SONATRACH – Activité Transport par Canalisations (TRC), Station de Béni Mansour. Développement d'une application desktop de gestion des dossiers médicaux (Electron, SQLite, HTML, CSS, JavaScript).
- Mai 2026 – aujourd'hui : Auto-entrepreneur en micro-importation (ANAE – Algérie) : sourcing, achats et opérations commerciales.

CERTIFICATIONS:
- Neural Networks and Deep Learning – DeepLearning.AI / Coursera – mars 2026
- Complete Python Mastery – Code with Mosh – 5 janvier 2026
- The Ultimate Git Course – Code with Mosh – 9 janvier 2026
- Complete SQL Mastery – Code with Mosh – 12 janvier 2026
- Gemini Certified Student (University) – Google for Education – janvier 2026 à janvier 2029
- En cours : Deep Learning Specialization – DeepLearning.AI / Coursera

PROJETS RÉALISÉS:
- E-SCOOT DZ (en collaboration avec Omar Ferradj, non déployé) : plateforme e-commerce full-stack de trottinettes électriques en Algérie – front React/TypeScript, API Django REST ; catalogue, panier, favoris, comptes, paiement et commandes, avis, coupons, commande rapide pour campagnes réseaux sociaux ; assistant IA (Q&R produit, comparaison intelligente, recherche vectorielle) ; tableau de bord admin (produits, catégories, commandes, clients, leads, coupons, bannières, notifications, statistiques) ; PostgreSQL, Redis, Celery, Docker, JWT, EN/FR/AR (RTL)
- Application médicale desktop (Electron, SQLite) développée pendant le stage SONATRACH
- Site web CFPA (Django, SQL) : gestion d'un centre de formation professionnelle, projet collaboratif
- Jadwal (Python, PostgreSQL, JavaScript) : emplois du temps et tâches, génération automatique, comptes, détection de conflits, export, score de productivité, mode sombre
- Détecteur Chat / Non-Chat (Python, TensorFlow, Streamlit) : réseau de neurones avec augmentation de données

COMPÉTENCES TECHNIQUES:
- Programmation : Python, JavaScript, SQL, HTML5, CSS3, algorithmique et structures de données, POO
- Web & Backend : Django, Flask, Streamlit, développement full-stack
- IA & Data : IA, Machine Learning, Deep Learning, Vision par ordinateur, analyse de données, scikit-learn, TensorFlow
- Bases de données : SQLite, PostgreSQL, SQL, conception de bases de données, bases de données avancées
- Systèmes : systèmes d'exploitation, architecture des ordinateurs, réseaux, sécurité informatique, systèmes d'information, virtualisation & cloud
- Outils : Git, GitHub, Electron

LANGUES:
- Arabe : langue maternelle
- Tamazight : langue maternelle
- Français : B2 (en progression)
- Anglais : B1-B2 (en progression)

SPORTS & DÉVELOPPEMENT PERSONNEL:
- Kickboxing (4 ans), boxe (7 mois)
- Alimentation saine et équilibrée, évite le sucre, exercice physique régulier, routine quotidienne structurée
- Gestion du temps, constance, autodiscipline, développement personnel

QUALITÉS:
Discipline et constance, organisation et gestion du temps, motivation, persévérance, travail en équipe, adaptabilité, apprentissage continu.

LIENS:
- LinkedIn : linkedin.com/in/makhlouf-fechetah-2b1085332
- GitHub : github.com/FechetahMakhlouf
- Portfolio : fechetahmakhlouf.github.io/MyPortfolio/

Utilise ces informations UNIQUEMENT quand l'utilisateur pose une question explicite sur Makhlouf (parcours, compétences, projets, coordonnées, etc.).
Pour toute autre question (culture générale, aide technique, blagues, etc.), réponds de manière naturelle, polie et utile, comme un assistant IA classique."""


@app.route('/', methods=['POST'])
def chat():
    """
    Endpoint principal du chatbot.
    Reçoit un JSON avec 'message' (texte utilisateur) et éventuellement 'file' (image en base64).
    Retourne un JSON avec la réponse du bot.
    """
    try:

        data = request.get_json()
        user_message = data.get('message', '')

        file_data = data.get('file', {})

        full_message = SYSTEM_CONTEXT + "\n\nQuestion de l'utilisateur: " + user_message

        parts = [{"text": full_message}]
        if file_data and file_data.get('data'):
            parts.append({
                "inline_data": {
                    "mime_type": file_data['mime_type'],
                    "data": file_data['data']
                }
            })

        payload = {
            "contents": [{
                "parts": parts
            }]
        }

        response = requests.post(GEMINI_URL, json=payload)
        response.raise_for_status()

        result = response.json()

        bot_reply = result['candidates'][0]['content']['parts'][0]['text']

        bot_reply = bot_reply.replace('**', '')

        return jsonify({"reply": bot_reply})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Please write your message again"}), 500
    except KeyError as e:
        return jsonify({"error": f"Please write your message again"}), 500
    except Exception as e:
        return jsonify({"error": f"Please write your message again"}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
