# Hotbildsanalys - Frontend

## OWASP Top 10 - Mest relevanta risker för frontend

### 1. XSS / Injection (A03)
**Problem:** All data från API & URL kan vara skadlig

**1. Hur och vart?**
- Formulärfält som sparas
- HTTP headers
- Query strings/URL
- Sökfunktioner
- API-data

**2. Vad händer/konsekvenser?**
- Angriparen lyckas få in och köra Javascript-kod i andra användares webbläsare
- Känslig användardata visas utan korrekt hantering

**3. Vad kan man göra/åtgärder/förebygga?**
- Escape/encode alltid vid output
- Implementera Content Security Policy (CSP)
- Säkra cookies
- Undvik skadliga API:er och HTTP headers
- React är skyddad mot det mesta
- Använd sanitizeText() - funktion som omvandlar `<script>` taggar till vanlig text med regex

---

### 2. Security Misconfiguration (A05)
**Problem:** Felaktiga headers (CSP, CORS)

**1. Hur och vart?**
- När man skickar data över/mellan domäner

**2. Vad händer/konsekvenser?**
- [Behöver kompletteras]

**3. Vad kan man göra/åtgärder/förebygga?**
- Säkra lösenordshantering
- Korrekt konfigurerade headers

---

### 3. Software & Data Integrity Failures (A08)
**Problem:** Beroenden/3:e-parts-skript kan manipuleras

**1. Hur och vart?**
- När system litar på kodpaket, uppdateringar eller data utan att försäkra sig om deras äkthet eller integritet

**2. Vad händer/konsekvenser?**
- Möjlighet att injicera komprometterad (compromised) kod
- Leverera skadliga uppdateringar

**3. Vad kan man göra/åtgärder/förebygga?**
- Pin-versions i POM.xml och package.json
  - Låser versionsnumren för alla beroenden/dependencies
  - Istället för att låta Maven/npm automatiskt hämta senaste versionen
- Undvik `latest` eller lösa ranges
  - Låt inte byggsystemet välja själv vilken version som ska användas
- Använd audit och CSP för att säkra leveranskedjan

---

## STRIDE-analys för inputs
*Tillämpa bara på inputs (de största attackytorna)*

### 1. Querystring
**STRIDE-hot:** Spoofing, Tampering, Information Disclosure

**1. Hur och vart?**
- Sökfunktioner
- Filter och filtrering på listor
- API-anrop
- Felmeddelanden
- Inloggningsparametrar

**2. Vad händer/konsekvenser?**
- Spoofing/tampering/info leak
- Användarinmatning som skickas till servern via adressfältet kan manipuleras

**3. Vad kan man göra/åtgärder/förebygga?**
- Escape/encode all output innan du visar data i HTML:en
- Sanitize HTML (funktionen vi skrev i koden)
- Aktivera Content Security Policy i headern
- Validera indata → bara tillåta bokstäver och siffror

---

### 2. API-svar
**STRIDE-hot:** Trust, Injection, DoS

**1. Hur och vart?**
- All data som kommer från backend API:er

**2. Vad händer/konsekvenser?**
- Manipulerad data eller flood från API-svar
- Få in skadlig/manipulerad kod i systemet
- Överbelastar ett system eller API så att det inte kan hantera användarens förfrågningar

**3. Vad kan man göra/åtgärder/förebygga?**
- **Rate limiting:** Begränsa hur många anrop en klient får göra per tidsenhet
- Timeout för API-anrop
- Maxgräns på request-storlekar
- Tidsgräns på databasfrågor
- Stoppa långa loopar eller oändliga processer

---

### 3. localStorage
**STRIDE-hot:** Trust, Elevation of Privilege (EOP)

**1. Hur och vart?**
- localStorage i webbläsaren

**2. Vad händer/konsekvenser?**
- Kan manipuleras av angripare
- Känslig information kan läsas av skadlig kod

**3. Vad kan man göra/åtgärder/förebygga?**
- Ingen känslig info i localStorage
- Använd säkra alternativ för känslig data (httpOnly cookies, sessionStorage med försiktighet)

---

## Trust Boundaries & Kontroller

### Trust Boundaries
```
Browser (användare + angripare) <-> Frontend-kod <-> Backend API
```

### Implementerade kontroller
- **CSP + escaping** mot XSS
- **Inputvalidering** av query strings
- **Ingen känslig data** i localStorage
- **Rate limiting** för API-anrop
- **Pin-versions** för dependencies
- **sanitizeText()** för HTML-sanering