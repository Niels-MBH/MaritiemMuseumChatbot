/* ==========================================================================
   MARITIEM MUSEUM CHATBOT — STYLESHEET
   Kleuren zijn hieronder als CSS-variabelen gedefinieerd. Wil je later de
   huisstijl aanpassen? Pas dan alleen de waarden in ":root" aan — de rest
   van de stylesheet gebruikt overal deze variabelen.
   ========================================================================== */

:root {
  /* --- Projectkleuren --- */
  --donkerblauw: #003B65;
  --marineblauw: #002B49;
  --lichtblauw: #E8F2F8;
  --wit: #FFFFFF;
  --turquoise: #2CC9BE;
  --turquoise-donker: #1FA79D;

  /* --- Afgeleide kleuren voor tekst en randen --- */
  --tekst-donker: #16242d;
  --tekst-grijs: #56707d;
  --rand: rgba(0, 59, 101, 0.12);
  --schaduw: 0 4px 16px rgba(0, 43, 73, 0.10);

  /* --- Vormgeving --- */
  --radius-groot: 20px;
  --radius-klein: 12px;
  --focus-kleur: #1a7f78; /* iets donkerder dan turquoise, voor voldoende contrast bij focus-outline */
}

/* --------------------------------------------------------------------------
   RESET EN BASISOPMAAK
   -------------------------------------------------------------------------- */
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  background: var(--lichtblauw);
  color: var(--tekst-donker);
  font-size: 18px; /* basisgrootte iets groter dan standaard, voor leesbaarheid op afstand */
  line-height: 1.5;
}

/* Screen-reader-only: tekst blijft beschikbaar voor schermlezers, maar is visueel verborgen */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Zichtbare, duidelijke focus-indicator overal in de app (belangrijk voor
   toetsenbordgebruikers en de toegankelijkheidseisen uit de opdracht) */
a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 3px solid var(--focus-kleur);
  outline-offset: 3px;
}

/* --------------------------------------------------------------------------
   APP-LAYOUT
   -------------------------------------------------------------------------- */
.app {
  max-width: 900px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--wit);
  box-shadow: var(--schaduw);
}

/* --------------------------------------------------------------------------
   HEADER
   -------------------------------------------------------------------------- */
.app-header {
  flex: 0 0 auto;
  background: linear-gradient(135deg, var(--donkerblauw), var(--marineblauw));
  color: var(--wit);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.header-text h1 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.header-text .subtitle {
  margin: 4px 0 0;
  font-size: 1rem;
  color: var(--lichtblauw);
  font-weight: 400;
}

.new-chat-btn {
  background: rgba(255, 255, 255, 0.12);
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: var(--wit);
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: var(--radius-klein);
  cursor: pointer;
  min-height: 48px; /* voldoende groot voor touchscreens */
  transition: background 0.15s ease, transform 0.1s ease;
}

.new-chat-btn:hover {
  background: rgba(255, 255, 255, 0.22);
}

.new-chat-btn:active {
  transform: scale(0.97);
}

/* --------------------------------------------------------------------------
   CHATVENSTER
   -------------------------------------------------------------------------- */
.chat-container {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0; /* nodig zodat de scrollbare chat-window echt kan scrollen in flexbox */
}

.chat-window {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  scroll-behavior: smooth;
}

/* Elk bericht is een rij; met justify-content bepalen we links (bot) of rechts (bezoeker) */
.message-row {
  display: flex;
  width: 100%;
}

.message-row.bot {
  justify-content: flex-start;
}

.message-row.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 75%;
  padding: 14px 18px;
  border-radius: var(--radius-groot);
  font-size: 1.05rem;
  line-height: 1.55;
  white-space: pre-wrap;
  box-shadow: var(--schaduw);
}

/* Berichten van de bezoeker: donkerblauw, rechts uitgelijnd */
.message-row.user .message-bubble {
  background: var(--donkerblauw);
  color: var(--wit);
  border-bottom-right-radius: 6px;
}

/* Berichten van de chatbot: lichtblauw, links uitgelijnd */
.message-row.bot .message-bubble {
  background: var(--lichtblauw);
  color: var(--tekst-donker);
  border: 1px solid var(--rand);
  border-bottom-left-radius: 6px;
}

/* Vriendelijke foutmelding: opvallend maar niet alarmerend */
.message-row.bot .message-bubble.error {
  background: #fdecea;
  border-color: #f3b4ac;
  color: #7a2b22;
}

/* "Typt..."-indicator: drie stippen die zachtjes op en neer bewegen */
.typing-indicator {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  padding: 4px 2px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--turquoise-donker);
  animation: typing-bounce 1.2s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.15s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.3s; }

@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* --------------------------------------------------------------------------
   SUGGESTIEKNOPPEN
   -------------------------------------------------------------------------- */
.suggestions {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0 24px 20px;
}

.suggestion-btn {
  background: var(--wit);
  border: 2px solid var(--turquoise);
  color: var(--donkerblauw);
  font-size: 1rem;
  font-weight: 600;
  padding: 16px 14px;
  border-radius: var(--radius-klein);
  cursor: pointer;
  min-height: 56px; /* groot genoeg voor touchscreens */
  transition: background 0.15s ease, transform 0.1s ease;
}

.suggestion-btn:hover {
  background: var(--turquoise);
  color: var(--wit);
}

.suggestion-btn:active {
  transform: scale(0.97);
}

/* Verborgen staat, wordt via JavaScript in-/uitgeschakeld met deze class */
.suggestions.hidden {
  display: none;
}

/* --------------------------------------------------------------------------
   INVOERFORMULIER
   -------------------------------------------------------------------------- */
.chat-form {
  flex: 0 0 auto;
  display: flex;
  gap: 12px;
  padding: 18px 24px;
  background: var(--wit);
  border-top: 1px solid var(--rand);
}

#userInput {
  flex: 1 1 auto;
  font-size: 1.05rem;
  padding: 14px 18px;
  border: 2px solid var(--rand);
  border-radius: var(--radius-klein);
  min-height: 52px; /* groot genoeg voor touchscreens */
  font-family: inherit;
  color: var(--tekst-donker);
  background: var(--lichtblauw);
}

#userInput:focus {
  border-color: var(--turquoise);
}

#userInput::placeholder {
  color: var(--tekst-grijs);
}

.send-btn {
  flex: 0 0 auto;
  background: var(--turquoise);
  color: var(--marineblauw);
  font-size: 1.05rem;
  font-weight: 700;
  padding: 14px 28px;
  border: none;
  border-radius: var(--radius-klein);
  cursor: pointer;
  min-height: 52px;
  min-width: 120px; /* groot genoeg voor touchscreens */
  transition: background 0.15s ease, transform 0.1s ease;
}

.send-btn:hover {
  background: var(--turquoise-donker);
  color: var(--wit);
}

.send-btn:active {
  transform: scale(0.97);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: default;
  transform: none;
}

/* --------------------------------------------------------------------------
   RESPONSIVE WEERGAVE (telefoon / tablet)
   -------------------------------------------------------------------------- */
@media (max-width: 640px) {
  body {
    font-size: 17px;
  }

  .app {
    box-shadow: none;
  }

  .app-header {
    padding: 16px;
  }

  .header-text h1 {
    font-size: 1.35rem;
  }

  .chat-window {
    padding: 16px;
  }

  .suggestions {
    grid-template-columns: 1fr; /* op smalle schermen onder elkaar i.p.v. naast elkaar */
    padding: 0 16px 16px;
  }

  .chat-form {
    padding: 14px 16px;
    flex-wrap: wrap;
  }

  .send-btn {
    flex: 1 1 100%;
  }

  #userInput {
    flex: 1 1 100%;
  }
}

/* --------------------------------------------------------------------------
   GROOT SCHERM / MUSEUMZUIL (touchscreen)
   Op grote schermen maken we tekst en knoppen nog iets groter, zodat de
   interface prettig blijft op een touchscreen op enige afstand.
   -------------------------------------------------------------------------- */
@media (min-width: 1400px) {
  body {
    font-size: 20px;
  }

  .message-bubble {
    font-size: 1.15rem;
  }

  .suggestion-btn,
  .send-btn,
  #userInput,
  .new-chat-btn {
    min-height: 64px;
    font-size: 1.15rem;
  }
}

/* Respecteer de voorkeur van bezoekers die liever geen animaties zien */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
