import firebase_admin 
from firebase_admin import credentials, firestore

cred = credentials.Certificate("final-project-5c102-firebase-adminsdk-fbsvc-db3f030fd6.json")
firebase_admin.initialize_app(cred)

_db = firestore.client()
