# Incidentplan – IT (Webbserver & Webbplats)

## 1. Syfte
Att snabbt identifiera, hantera och rapportera IT-incidenter som påverkar webbservern eller webbplatsen, för att minimera driftstopp, dataläckor och skador på projektets anseende.

## 2. Exempel på incidenter
- Webbplatsen är nere eller otillgänglig
- Intrångsförsök, misstänkt hackning
- Databasfel eller förlust av data
- DNS-problem
- Obehörig åtkomst till administrationsgränssnitt
- Certifikatfel / HTTPS-problem

## 3. Incidenthantering – steg för steg

| Steg | Åtgärd | Ansvarig |
|------|--------|----------|
| 1 | Upptäck incidenten (övervakning, larm eller rapport) | IT-support |
| 2 | Bekräfta att felet är verkligt (testa webbtjänst, loggar, ping, traceroute) | Drifttekniker |
| 3 | Isolera systemet (koppla bort nätverk, stäng åtkomst vid behov) | Systemadministratör |
| 4 | Informera ansvarig enligt kontaktväg | Den som upptäckte incidenten |
| 5 | Dokumentera händelsen (tid, IP, loggar, åtgärder) | IT-ansvarig |
| 6 | Återställ systemet (från backup / rensa infektioner) | Driftteam |
| 7 | Rapportera incident och lärdomar | Säkerhetsansvarig |

## 4. Kontaktväg vid IT-incident

| Prioritet | Funktion / Person | Kontaktväg | Ansvar |
|-----------|-----------------|------------|--------|
| 1 | Drift / system | Email: Jacob.erikssonw@gmail.com | Första tekniska åtgärd |
| 2 | Säkerhet | Email: Olvallronja@gmail.com | Analys, logggranskning |
| 3 | Utveckling | Email: Martin.paulsen@gmail.com | Webbapplikation och kod |
| 4 | Kommunikation | Email: Martin.paulsen@gmail.com | Information till användare / press |
| 5 | Ledning | Email: Olvallronja@gmail.com | Beslutsfattande och rapportering |
| 🚨 | Vid dataintrång → Meddela Datainspektionen (IMY) inom 72 timmar | imy@imy.se | (lagkrav enligt GDPR) |

## 5. Dokumentation av IT-incident
Minst följande ska dokumenteras:  
- Datum, tid och upptäcktssätt  
- Typ av incident (t.ex. DDoS, intrång, driftstopp)  
- Berörda system / domäner  
- Åtgärder som vidtagits  
- Kontaktade personer / funktioner  
- Resultat / status  
- Rekommendationer för framtiden  

## 6. Efterarbete & förbättring
- Genomgång av loggar och sårbarheter  
- Uppdatering av lösenord, certifikat och brandväggsregler  
- Återställning från backup om nödvändigt  
- Utvärdera och uppdatera rutiner och incidentplan  
- Rapportera lärdomar till teamet