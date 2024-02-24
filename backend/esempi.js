/* 
Esempi di chiamate API CRUD:

1. Ottieni tutti gli utenti:
   Metodo: GET
   Endpoint: /api/users
   Esempio: http://localhost:3001/api/users

2. Ottieni un utente specifico per email:
   Metodo: GET
   Endpoint: /api/users/:email
   Esempio: http://localhost:3001/api/users/johndoe@giorgimi.edu.it

3. Aggiungi un nuovo utente:
   Metodo: POST
   Endpoint: /api/users
   Esempio: http://localhost:3001/api/users
   Corpo della richiesta: { "Email_utente": "newuser@giorgimi.edu.it", "Pw_utente": "password123", "Nome_utente": "Nuovo", "Cognome_utente": "Utente" }

4. Aggiorna un utente per email:
   Metodo: PUT
   Endpoint: /api/users/:email
   Esempio: http://localhost:3001/api/users/johndoe@giorgimi.edu.it
   Corpo della richiesta: { "Nome_utente": "NuovoNome" }

5. Elimina un utente per email:
   Metodo: DELETE
   Endpoint: /api/users/:email
   Esempio: http://localhost:3001/api/users/johndoe@giorgimi.edu.it
6. Registra un utente dal form di registrazione:
   Metodo: POST
   Endpoint: /api/register
   Esempio: http://localhost:3001/api/register
   Corpo della richiesta: { "Email_utente": "newuser@giorgimi.edu.it", "Pw_utente": "password123", "Nome_utente": "Nuovo", "Cognome_utente": "Utente" }

7. Verifica l'utente al login:
   Metodo: POST
   Endpoint: /api/login
   Esempio: http://localhost:3001/api/login
   Corpo della richiesta: { "Email_utente": "johndoe@giorgimi.edu.it", "Pw_utente": "password123" }

8. Cambia piu campi:
 
   Endpoin:/api/users/:email
   Metodo:PUT
   Corpo della richiesta:{
  "Nome_utente": "NuovoNome",
  "Cognome_utente": "NuovoCognome",
  "AltroCampo": "ValoreNuovo"
}
*/