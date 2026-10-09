# Mind 5 – Roadmap und offene Entscheidungen

## Verbindlich entschieden

- Mind 5, Repository `mind-5`; backend-freie V1.
- Genau fünf Aufgaben je Tagesrunde, zehn Mechaniken, drei Altersgruppen und zwei Mechanik-Schwierigkeitsstufen.
- Sechs feste Schwierigkeitsprofile; die Engine wählt Mechaniken und Aufgaben.
- Höchstens zwei Aufgaben mit derselben Mechanik und mindestens drei verschiedene Mechaniken pro Runde.
- Regeln für offiziellen Tagesversuch, weitere Runden, Fehler, Überspringen, Hinweise, Tageswert, Rekorde, Streak, aktive Zeit und `Europe/Berlin` sind in der [Spiel- und Regelspezifikation](./GAMEPLAY_SPECIFICATION.md) festgehalten.
- Bestwert und Bestzeit bleiben pro Altersgruppe erhalten und werden bei einem späteren Wechsel zurück zu dieser Altersgruppe wieder angezeigt; Tageswertung und Streak werden beim Altersgruppenwechsel zurückgesetzt.
- Das gemeinsame Bewertungsmodell für Aufgaben- und Tagespunkte einschließlich Fehlern, Abschluss, Hinweisen und Rundung ist in der [Spiel- und Regelspezifikation](./GAMEPLAY_SPECIFICATION.md) festgelegt und mit drei Mechaniktypen durchgerechnet.
- Memory Logic ist als Referenzmechanik vollständig spezifiziert; Details stehen im [Referenzprofil](./profiles/memory-logic.md).

## Abgeschlossene fachliche Grundlage

Alle zehn V1-Mechanikprofile, das gemeinsame Bewertungsmodell sowie die Generierungs- und Validierungsstrategie sind dokumentiert. Memory Logic ist die Referenzmechanik; die gemeinsamen Spielregeln und das Profil legen auch Überspringen, Fehler, Hinweise, Punkte, Rundung und Feedback fest.

## Priorisierte weitere Arbeit

Die Arbeitsweise bleibt schrittweise und entscheidungsorientiert: möglichst genau eine offene Entscheidung pro Schritt; verbindliche Festlegungen, offene Punkte und für V1 ausgeschlossene Themen getrennt halten. Technische Lösungen werden nicht vorweggenommen, solange die fachlichen Anforderungen offen sind.

| Priorität | Arbeitspaket | Ergebnis |
| ---: | --- | --- |
| 1 | Mechaniken | **Abgeschlossen** – alle zehn Mechanikprofile sind beschrieben; offene Details sind unter den jeweiligen Arbeitspaketen erfasst. |
| 2 | Gemeinsames Bewertungsmodell | **Abgeschlossen** – verbindliche Regeln und Beispiele stehen in der Spiel- und Regelspezifikation. |
| 3 | Memory Logic als Referenzprofil | **Abgeschlossen** – Inhalte, Zustände, Beispiele, Fehler, Punkte und Validierung stehen im [Referenzprofil](./profiles/memory-logic.md). |
| 4 | Generierung und Validierung | **Abgeschlossen** – Strategie je Mechanik einschließlich Parameter, Lösbarkeit, Eindeutigkeit, Schwierigkeit, Redaktion und Fehlerbehandlung steht in der [Generierungs- und Validierungsstrategie](./GENERATION_VALIDATION.md). |
| 5 | Rundengenerierung | Gewichtung der Puzzlebereiche konkretisieren; Pflichtregeln und Schwierigkeitsverteilung bleiben vorrangig. |
| 6 | Content-Menge | Mindestumfang, Wiederholungsregeln und inhaltliche Gleichheit des Aufgabenbestands festlegen; das Verhalten bei erschöpftem Inhalt steht in der [Generierungs- und Validierungsstrategie](./GENERATION_VALIDATION.md). |
| 7 | Persistenz | Zuerst Persistenzschema entwerfen, danach localStorage oder IndexedDB entscheiden. |
| 8 | Zeit und Tageswechsel | Zustandsmodell und Tests für aktive Zeit, Pause, Tabwechsel, Offline, Mitternacht, Gerätewechsel, Zeitquellen, Manipulation sowie offizielle/weitere/verwarfene Runde festlegen. |
| 9 | UI/UX | Gemeinsames Grundgerüst entwerfen, danach mechanikspezifische Oberflächen darauf aufbauen. |
| 10 | Barrierearmut | Parallel zur UI-Entwicklung berücksichtigen, nicht nachträglich ergänzen. |
| 11 | QA und Redaktion | Je Aufgabe Mechanik, Altersgruppe, Schwierigkeit, Lösung, Validierungsstatus, Version und Änderungsverlauf erfassen; technische und redaktionelle Prüfung kombinieren. |
| 12 | Internationalisierung | Technisch vorbereiten, ohne vollständige Mehrsprachigkeit in V1 umzusetzen. |
| 13 | Statistik | Langzeitstatistiken bewusst ausschließen; nur für Tagesrunde, Bestwert, Bestzeit, Streak und technische Persistenz erforderliche Daten speichern. |

## Noch offene Entscheidungen

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
