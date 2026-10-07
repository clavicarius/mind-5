# Mind 5 – Roadmap und offene Entscheidungen

## Verbindlich entschieden

- Mind 5, Repository `mind-5`; backend-freie V1.
- Genau fünf Aufgaben je Tagesrunde, zehn Mechaniken, drei Altersgruppen und zwei Mechanik-Schwierigkeitsstufen.
- Sechs feste Schwierigkeitsprofile; die Engine wählt Mechaniken und Aufgaben.
- Höchstens zwei Aufgaben mit derselben Mechanik und mindestens drei verschiedene Mechaniken pro Runde.
- Regeln für offiziellen Tagesversuch, weitere Runden, Fehler, Überspringen, Hinweise, Tageswert, Rekorde, Streak, aktive Zeit und `Europe/Berlin` sind in der [Spiel- und Regelspezifikation](./GAMEPLAY_SPECIFICATION.md) festgehalten.
- Das gemeinsame Bewertungsmodell für Aufgaben- und Tagespunkte einschließlich Fehlern, Abschluss, Hinweisen und Rundung ist in der [Spiel- und Regelspezifikation](./GAMEPLAY_SPECIFICATION.md) festgelegt und mit drei Mechaniktypen durchgerechnet.
- Memory Logic ist die erste vollständig auszuarbeitende Referenzmechanik.

## Nächster fachlicher Arbeitsschritt

**Memory Logic finalisieren.** Das V1-Profil für Wortlogik sowie Zahlenfolge, Muster fortsetzen, Was passt nicht?, Drehen & Denken, Raster-Logik, Reihenfolge, Rechenlogik und Visueller Vergleich sind beschrieben. Memory Logic bleibt die Referenzmechanik.

1. Spielziel
2. Altersgruppen
3. leicht / anspruchsvoll
4. Aufgabengenerierung
5. Eingabe
6. Fehler
7. Undo / Neustart
8. Hinweise
9. Punkte
10. Lösung / Feedback
11. Validierung

Die V1-Profile für Wortlogik, Zahlenfolge, Muster fortsetzen, Was passt nicht?, Drehen & Denken, Raster-Logik, Reihenfolge, Rechenlogik und Visueller Vergleich sind vollständig spezifiziert. Memory Logic bleibt die Referenzmechanik und benötigt weiterhin die unter „Noch offene Entscheidungen“ aufgeführten Details.

## Priorisierte weitere Arbeit

Die Arbeitsweise bleibt schrittweise und entscheidungsorientiert: möglichst genau eine offene Entscheidung pro Schritt; verbindliche Festlegungen, offene Punkte und für V1 ausgeschlossene Themen getrennt halten. Technische Lösungen werden nicht vorweggenommen, solange die fachlichen Anforderungen offen sind.

| Priorität | Arbeitspaket | Ergebnis |
| ---: | --- | --- |
| 1 | Mechaniken | **Abgeschlossen** – alle zehn Mechanikprofile sind beschrieben; offene Details sind unter den jeweiligen Arbeitspaketen erfasst. |
| 2 | Gemeinsames Bewertungsmodell | **Abgeschlossen** – verbindliche Regeln und Beispiele stehen in der Spiel- und Regelspezifikation. |
| 3 | Memory Logic finalisieren | Erlaubte Themen/Begriffe, Satzlänge, Abstraktionsgrad und Ausschlüsse; Objekt-, Fakten- und Beziehungsmodell; Ableitungen und Fragearten; mindestens fünf Beispiele je Altersgruppe und Schwierigkeit; Aktionen, Zeit, Fehler, Punkte und Abbruch für jeden Zustand definieren. |
| 4 | Generierung und Validierung | **Abgeschlossen** – Strategie je Mechanik einschließlich Parameter, Lösbarkeit, Eindeutigkeit, Schwierigkeit, Redaktion und Fehlerbehandlung steht in der [Generierungs- und Validierungsstrategie](./GENERATION_VALIDATION.md). |
| 5 | Rundengenerierung | Gewichtung der Puzzlebereiche konkretisieren; Pflichtregeln und Schwierigkeitsverteilung bleiben vorrangig. |
| 6 | Content-Menge | Mindestzahlen, Wiederholung, inhaltliche Gleichheit und Verhalten bei erschöpftem Content bestimmen. |
| 7 | Persistenz | Zuerst Persistenzschema entwerfen, danach localStorage oder IndexedDB entscheiden. |
| 8 | Zeit und Tageswechsel | Zustandsmodell und Tests für aktive Zeit, Pause, Tabwechsel, Offline, Mitternacht, Gerätewechsel, Zeitquellen, Manipulation sowie offizielle/weitere/verwarfene Runde festlegen. |
| 9 | UI/UX | Gemeinsames Grundgerüst entwerfen, danach mechanikspezifische Oberflächen darauf aufbauen. |
| 10 | Barrierearmut | Parallel zur UI-Entwicklung berücksichtigen, nicht nachträglich ergänzen. |
| 11 | QA und Redaktion | Je Aufgabe Mechanik, Altersgruppe, Schwierigkeit, Lösung, Validierungsstatus, Version und Änderungsverlauf erfassen; technische und redaktionelle Prüfung kombinieren. |
| 12 | Internationalisierung | Technisch vorbereiten, ohne vollständige Mehrsprachigkeit in V1 umzusetzen. |
| 13 | Statistik | Langzeitstatistiken bewusst ausschließen; nur für Tagesrunde, Bestwert, Bestzeit, Streak und technische Persistenz erforderliche Daten speichern. |

## Noch offene Entscheidungen

- Detaillierte Inhalts- und Zustandsregeln der Memory Logic.
- Ob Rekorde einer Altersgruppe beim Wechsel gelöscht oder nur nicht wiederhergestellt/angezeigt werden.
- Rundengenerator-Gewichtung, Mindestumfang und Erschöpfungsregeln für Inhalte.
- Persistenzschema und darauf basierende Wahl zwischen localStorage und IndexedDB.
- Zeitquelle, Offline-Abgleich und Zustandsübergänge für Mitternacht und Zeitmanipulation im Detail.
- Konkrete technische Ausgestaltung des UI-Grundgerüsts und der Internationalisierungsvorbereitung.

## V1 ausdrücklich ausgeschlossen

Story, Social-/Sharing-System, Ranglisten, Accounts, Cloud-Synchronisierung, Langzeitstatistiken, Newsletter, Monetarisierung, Werbung und komplexe Backend-/CMS-Strukturen.

## Release-QA: V1-Ausschlüsse

Vor jeder V1-Veröffentlichung prüfen und abhaken, dass weder die Anwendung noch zugehörige Release-Inhalte ausgeschlossene Funktionen anbieten oder voraussetzen:

- [ ] Keine Story, Social-Funktionen, Sharing-Funktionen oder Ranglisten.
- [ ] Keine Accounts und keine Cloud-Synchronisierung.
- [ ] Keine Langzeitstatistiken.
- [ ] Kein Newsletter, keine Werbung und keine Monetarisierung.
- [ ] Kein komplexes Backend und kein CMS.

Werden solche Funktionen für die Veröffentlichung benötigt oder sichtbar, ist der V1-QA-Gate nicht bestanden; Umfang und Freigabe müssen zuerst geklärt werden.
