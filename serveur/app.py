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
        "La clé API GEMINI_API_KEY n'est pas définie dans le fichier .env")

GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key={API_KEY}"

SYSTEM_CONTEXT = """Tu es un assistant professionnel pour Fechetah Makhlouf. Tu réponds de manière courtoise, précise et bien structurée.

Voici des informations sur FECHETAH Makhlouf (coordonnées, formation, compétences, loisirs, etc.) :

INFORMATIONS PERSONNELLES:
- Nom complet: FECHETAH Makhlouf
- Date de naissance: 10/02/2003 à M'chedallah
- Adresse: SAHARIDJ W BOUIRA
- Statut: Célibataire
- Nationalité: Algérien
- Téléphone: +213 0666218828
- Email: makhlouf.fechetah@univ-bouira.dz
- Taille: 1,91 m
- Poids: 78 kg

FORMATION ACADÉMIQUE:
- 2025-2026: 1ère année Master en Informatique à l'Université de Bouira
- 2025: Licence en Informatique, spécialisation Systèmes d'Information
- 2024-2025: 3ème année Licence en Informatique à l'Université de Bouira
- 2023-2024: 2ème année Licence en Informatique à l'Université de Bouira
- 2022-2023: 1ère année Licence en Informatique à l'Université de Bouira
- 2022: Diplôme de Lycée en Sciences Expérimentales (BELKACEMI ALI High School _ Saharidj)

STAGE:
- 25/02/2025 au 26/03/2025: Stage pratique à SONATRACH _ STATION SBM _ Beni Mansour

LANGUES:
- Français: Très bien parlé, lu et écrit
- Anglais: Très bien parlé, lu et écrit
- Arabe: Très bien parlé, lu et écrit
- Kabyle: Langue maternelle

COMPÉTENCES:
- Adaptabilité
- Compétences en communication
- Responsable et apprécie le travail en équipe
- Dynamique, actif, ponctuel, sérieux et disponible

LOISIRS:
Internet, littérature, lecture, nouvelles technologies, voyages

SKILLES:
HTML , CSS , JavaScript , Python , Django , Git & Github , SQL , Algorithms & Data Structures , Machine Learning , Data Analysis

Utilise ces informations UNIQUEMENT lorsque l'utilisateur pose une question explicite sur Makhlouf (son parcours, ses compétences, ses coordonnées, etc.).  
Pour toutes les autres questions (culture générale, aide technique, blagues, etc.), réponds de manière normale, polie et utile, comme le ferait n'importe quel assistant IA."""


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
        return jsonify({"error": f"Erreur API Gemini: {str(e)}"}), 500
    except KeyError as e:
        return jsonify({"error": f"Erreur de parsing: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Erreur interne: {str(e)}"}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
