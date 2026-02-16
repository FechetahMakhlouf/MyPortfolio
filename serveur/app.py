import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

# Initialiser l'application Flask
app = Flask(__name__)

# Activer CORS pour permettre les requêtes depuis votre frontend
# En production, vous pouvez restreindre aux seuls domaines autorisés
CORS(app)

# Récupérer la clé API depuis les variables d'environnement
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError(
        "La clé API GEMINI_API_KEY n'est pas définie dans le fichier .env")

# URL de l'API Gemini (assurez-vous d'utiliser le bon modèle)
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key={API_KEY}"

# Contexte système (les informations personnelles de Makhlouf)
# Vous pouvez le conserver ici pour ne pas l'exposer dans le frontend
SYSTEM_CONTEXT = """Tu es un assistant pour makhlouf utile et généraliste.  
Voici des informations sur FECHETAH Makhlouf (coordonnées, formation, compétences, loisirs, etc.) :

INFORMATIONS PERSONNELLES:
- Nom complet: FECHETAH Makhlouf
- Date de naissance: 10/02/2003 à M'chedallah
- Adresse: SAHARIDJ W BOUIRA
- Statut: Célibataire (Single)
- Nationalité: Algérien
- Téléphone: +213 0666218828
- Email: makhlouf.fechetah@univ-bouira.dz

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


@app.route('/chat', methods=['POST'])
def chat():
    """
    Endpoint principal du chatbot.
    Reçoit un JSON avec 'message' (texte utilisateur) et éventuellement 'file' (image en base64).
    Retourne un JSON avec la réponse du bot.
    """
    try:
        # Récupérer les données envoyées par le frontend
        data = request.get_json()
        user_message = data.get('message', '')
        # Dictionnaire avec 'data' (base64) et 'mime_type'
        file_data = data.get('file', {})

        # Construire le message complet pour Gemini : contexte + question
        full_message = SYSTEM_CONTEXT + "\n\nQuestion de l'utilisateur: " + user_message

        # Préparer les "parts" (texte + éventuellement image)
        parts = [{"text": full_message}]
        if file_data and file_data.get('data'):
            parts.append({
                "inline_data": {
                    "mime_type": file_data['mime_type'],
                    "data": file_data['data']
                }
            })

        # Corps de la requête pour l'API Gemini
        payload = {
            "contents": [{
                "parts": parts
            }]
        }

        # Appel à l'API Gemini
        response = requests.post(GEMINI_URL, json=payload)
        response.raise_for_status()  # Lève une exception si erreur HTTP

        # Analyser la réponse JSON de Gemini
        result = response.json()
        # Extraire le texte de la réponse (attention à la structure exacte)
        bot_reply = result['candidates'][0]['content']['parts'][0]['text']

        # Optionnel : nettoyer la réponse (ex: supprimer les ** pour le gras)
        # ou utiliser une regex plus sophistiquée
        bot_reply = bot_reply.replace('**', '')

        # Retourner la réponse au frontend
        return jsonify({"reply": bot_reply})

    except requests.exceptions.RequestException as e:
        # Erreur lors de l'appel à l'API Gemini
        return jsonify({"error": f"Erreur API Gemini: {str(e)}"}), 500
    except KeyError as e:
        # Erreur dans la structure de la réponse (parsing)
        return jsonify({"error": f"Erreur de parsing: {str(e)}"}), 500
    except Exception as e:
        # Autre erreur inattendue
        return jsonify({"error": f"Erreur interne: {str(e)}"}), 500


if __name__ == '__main__':
    # Lancer le serveur en mode développement
    # host='0.0.0.0' permet d'accepter les connexions depuis l'extérieur (si besoin)
    # port=5000 est le port par défaut
    app.run(debug=True, host='0.0.0.0', port=5000)
