# ADHS Lernchallenge Webpage

Diese Webseite bietet:
- Kostenlose 5-Tage-Challenge
- Premium 30-Tage-Challenge mit Stripe-Zahlung
- Registrierung / Login
- Download der kostenlosen Checkliste nach E-Mail-Eingabe

## 🚀 Deployment

1. Lade alles auf GitHub hoch.
2. Gehe zu [Netlify](https://app.netlify.com/ ) und erstelle eine neue Site von Git.
3. Wähle dein Repo aus.
4. Setze die Umgebungsvariablen in Netlify → Settings → Environment.

## 🔌 Backend Functions

### `/functions/send-checklist.js`  
Sendet die `checkliste.pdf` an die eingegebene E-Mail.

### `/functions/create-checkout.js`  
Leitet zum Stripe Checkout weiter.

## 📁 Öffentliche Dateien

PDFs, Bilder usw. kommen in den `public/` Ordner.

## ✅ Fertig!

Deine Seite ist jetzt online!