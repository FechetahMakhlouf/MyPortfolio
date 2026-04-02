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
- Téléphone: +213 0666218828
- Email: makhlouffechetah65@gmail.com

FORMATION ACADÉMIQUE:
- 2025-2027: Master en Intelligence Artificielle (en cours) – Université de Bouira
- 2022-2025: Licence en Informatique, Systèmes d'Information – Université de Bouira
- 2022: Baccalauréat Sciences Expérimentales (mention Assez Bien)

CERTIFICATIONS:
- Complete Python Mastery (Code with Mosh)
- Complete SQL Mastery (Code with Mosh)
- Complete Git & GitHub Mastery (Code with Mosh)
- Google Gemini Certificate (Google for Education)
- Neural Networks and Deep Learning (Coursera – DeepLearning.AI / Andrew Ng)
- En cours : Deep Learning Specialization (Coursera) – cours suivants : CNNs, RNNs, Transformers, etc.

STAGE:
- Février–Mars 2025 : Stage pratique en systèmes informatiques chez SONATRACH – Station SBM (Beni Mansour)

PROJETS RÉALISÉS:
- Application médicale desktop pour SONATRACH
- Site web CFPA (gestion de centre de formation)
- Jadwal – application web de gestion du temps (planification automatique)
- Détecteur Chat / Non‑Chat (régression logistique, Streamlit, augmentation de données)

COMPÉTENCES TECHNIQUES:
- Langages : Python (avancé), JavaScript, HTML5/CSS3
- Frameworks : Django, Flask, Streamlit
- Bases de données : SQL, PostgreSQL
- Outils : Git, GitHub, VS Code
- Data Science / ML : Pandas, NumPy, Scikit‑learn, Matplotlib
- Deep Learning (en cours) : réseaux neuronaux, CNN, RNN
- Autres : algorithmes, structures de données, analyse de données

LANGUES:
- Français : Très bien (lu, écrit, parlé)
- Anglais : Très bien (lu, écrit, parlé)
- Arabe : Très bien
- Kabyle : Langue maternelle

SOFT SKILLS:
Adaptabilité, communication, travail en équipe, ponctualité, sérieux, autonomie.

LOISIRS:
Internet, littérature, nouvelles technologies, voyages, lecture.

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
