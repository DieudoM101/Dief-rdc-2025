# DIEF-RDC

Développement Intégral de l'Enfant et de la Femme (DIEF-RDC)  
Site officiel de l'association dédiée à la promotion et la protection des droits humains en RD Congo.

## Fonctionnalités principales

- Présentation de l'association, de ses actions et de sa mission
- Galerie photos des activités
- Formulaire de contact (envoi d'email)
- Formulaire de don (envoi d'email)
- Informations de contact et liens vers les réseaux sociaux

## Structure du projet

```
/
├── index.html
├── apropos.html
├── action.html
├── don.html
├── contact.html
├── actualités.html
├── mentions.html
├── politique.html
├── style.css
├── dief.js
├── Images/
└── Server/
    ├── server.js
    └── .env
```

## Installation et lancement

1. **Cloner le dépôt**  
   Place tous les fichiers à la racine et dans le dossier `Server`.

2. **Installer les dépendances serveur**  
   Ouvre un terminal dans le dossier `Server` et lance :
   ```bash
   npm install express nodemailer cors dotenv
   ```

3. **Configurer les variables d'environnement**  
   Crée un fichier `.env` dans `Server/` avec :
   ```
   MAIL_USER=diefrdc036@gmail.com
   MAIL_PASS=ton_mot_de_passe_gmail
   PORT=3000
   ```
   Remplace `ton_mot_de_passe_gmail` par le mot de passe ou le mot de passe d'application Gmail.

4. **Lancer le serveur**  
   Toujours dans `Server/` :
   ```bash
   node server.js
   ```
   Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## Fonctionnement des formulaires

- **Contact** : Les messages envoyés via le formulaire de contact sont transmis à l'adresse `diefrdc036@gmail.com`.
- **Don** : Les informations de don sont également envoyées à cette adresse.

## Conseils de sécurité

- Ne partage jamais ton fichier `.env` publiquement.
- Utilise un mot de passe d'application Gmail si la double authentification est activée.

## Auteur

Développement : JakaDev  
Association : DIEF-RDC

---

&copy; 2025 DIEF-RDC. Tous droits réservés.