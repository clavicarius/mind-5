# Memory Logic – Referenzprofil V1

## Ziel und Aufgabenaufbau

Die spielende Person merkt sich einzeln gezeigte Informationen und beantwortet anschließend Fragen ausschließlich anhand dieser Informationen. Die Engine legt vor Beginn der Merkphase alle Informationen, Fragen, Optionen und Lösungen fest; während einer Aufgabe wird nichts ergänzt oder verändert.

| Schwierigkeit | Informationen | Fragen | Antwortoptionen je Frage | Schlussfolgerung |
| --- | ---: | ---: | ---: | --- |
| Leicht | exakt 4 | exakt 3 | exakt 4 | Eine ausdrücklich gezeigte Information wiedererkennen |
| Anspruchsvoll | zufällig 6, 7 oder 8 | exakt 5 | zufällig 5 oder 6 | Informationen verknüpfen; mindestens eine Frage benötigt zwei Schlussfolgerungsschritte |

Jede Information wird genau einmal und einzeln gezeigt. Die Zahl anspruchsvoller Informationen und Antwortoptionen wird vor der Anzeige festgelegt. Fragen erscheinen einzeln und in festgelegter Reihenfolge. Die Antworten sind Auswahloptionen, kein Freitext. Eine leichte Frage hat genau eine richtige Antwort. Anspruchsvolle Fragen haben eine oder mehrere richtige Antworten; bei mehreren richtigen Antworten muss die Frage ausdrücklich „Wähle alle richtigen Antworten“ ankündigen und verwendet Mehrfachauswahl. Die Anzahl richtiger Antworten wird nie verraten.

## Inhalte und Sprache

Alle Inhalte müssen ohne Spezialwissen, kulturelle Annahmen oder Vorwissen außerhalb der Aufgabe verständlich sein. Namen und Kontexte sind vielfältig und frei von Stereotypen. Informationen enthalten keine Werturteile über Personen.

| Altersgruppe | Erlaubte Themen und Begriffe | Satzlänge und Abstraktion |
| --- | --- | --- |
| 8–12 | Alltag, Familie und Freundeskreis, Schule, Spiele, Tiere und Natur; vertraute Gegenstände, Farben, Orte und einfache Tätigkeiten | Ein kurzer Hauptsatz mit höchstens 10 Wörtern; konkrete, eindeutige Begriffe; keine Fachwörter |
| 13–17 | Alltag, Schule und Projekte, Hobbys, Medien, Sport, Natur und einfache öffentliche Situationen | Ein Hauptsatz mit höchstens 14 Wörtern; konkrete oder leicht abstrakte Begriffe; unbekannte Begriffe werden im Satz erklärt |
| 18+ | Alltag, Arbeit, Freizeit, Reisen, Kultur und allgemeine Sachverhalte | Ein Hauptsatz mit höchstens 18 Wörtern; alltägliche Abstraktionen erlaubt, aber keine Fachkenntnisse vorausgesetzt |

Für alle Altersgruppen sind Gewalt, Selbstverletzung, Sexualität, Suchtmittel, Diagnosen, sensible personenbezogene Daten, politische oder religiöse Überzeugungen, diskriminierende Inhalte, finanzielle Notlagen und belastende Krisen ausgeschlossen. Ebenfalls ausgeschlossen sind Wortspiele, Ironie, mehrdeutige Pronomen, ungenaue Mengen, unbestimmte Zeiträume und Tatsachen, die nur durch Weltwissen erschlossen werden könnten. Ein Satz enthält genau eine prüfbare Information. Verneinungen sind nur zulässig, wenn sie ausdrücklich und eindeutig formuliert sind; doppelte Verneinungen sind ausgeschlossen.

## Daten- und Beziehungsmodell

Jede Aufgabe speichert mindestens Altersgruppe, Schwierigkeit, Inhaltsversion, geordnete Informationsliste, strukturierte Fakten, geordnete Fragen, Optionen je Frage, richtige Option(en), Lösungserklärung und den erwarteten Lösungsweg. Objekte besitzen stabile, innerhalb der Aufgabe eindeutige Kennungen sowie eine sichtbare Bezeichnung und einen Typ. Namen, Gegenstände, Tiere, Orte und Ereignisse dürfen nur verwendet werden, wenn sie für Frage oder Ableitung gebraucht werden. Gleichlautende Bezeichnungen für verschiedene Objekte sind unzulässig.

Eine Information ist entweder:

1. **Einzelfakt:** ein Objekt hat genau ein benanntes Merkmal oder einen Wert, zum Beispiel `Mia — hat als Snack — Apfel`.
2. **Beziehung:** genau zwei Objekte stehen in einer benannten, gerichteten oder symmetrischen Beziehung, zum Beispiel `Mia — trägt — Rot` oder `Schlüssel A — öffnet — Fach 2`.

Jede Beziehung besitzt eine festgelegte Richtung und Bedeutung; Umkehrung, Reihenfolge oder Transitivität dürfen nicht stillschweigend angenommen werden. Transitiv geschlossen werden dürfen ausschließlich ausdrücklich typisierte und dafür freigegebene Beziehungen, etwa „ist älter als“ oder „liegt vor“. Eigenschaften wie Farbe, Besitz, Ort oder „mag“ sind nicht transitiv. Die Informationsliste enthält keine widersprüchlichen Werte, Kreisschlüsse, ungesicherten Kausalitäten oder zusätzlichen impliziten Beziehungen. Die sichtbaren Sätze müssen exakt dieselben Fakten ausdrücken wie die gespeicherten strukturierten Daten.

## Ableitungen und Fragen

Zulässige Fragearten sind:

- **Direkter Abruf:** einen gezeigten Einzelfakt oder eine gezeigte Beziehung wiedererkennen.
- **Eindeutige Umkehrung:** nach dem Subjekt oder Objekt einer gezeigten Beziehung fragen, wenn nur eine Antwort passt.
- **Verknüpfung:** zwei oder mehr gezeigte Informationen zu einer eindeutigen Antwort verbinden, etwa Objekt → Merkmal und Merkmal → Ort.
- **Freigegebener Schluss:** eine ausdrücklich als transitiv markierte Beziehung in höchstens zwei Zwischenschritten fortführen.
- **Mehrfachauswahl:** alle Objekte oder Aussagen auswählen, die eine klar benannte Bedingung erfüllen.

Leichte Aufgaben verwenden ausschließlich direkten Abruf und eindeutige Umkehrung; die Antwort steht ausdrücklich in einer einzelnen Information. Anspruchsvolle Aufgaben dürfen alle aufgeführten Arten verwenden. Mindestens eine ihrer fünf Fragen muss eine Verknüpfung oder einen freigegebenen Schluss mit mindestens zwei Informationen erfordern. Jede Antwort muss vollständig aus der Aufgabendatenmenge folgen. Fragen nach nicht gezeigten Details, unbegrenzte Schlussketten, externe Sachkenntnis, Mehrdeutigkeit und alternative plausible Lösungen sind ausgeschlossen. Jede falsche Option muss mit den gezeigten Informationen nachweislich falsch sein.

## Beispielaufgaben

Jede Tabellenzeile ist eine eigene Beispielaufgabe mit der für die Stufe vorgeschriebenen Anzahl von Informationen. „Frage → Lösung“ zeigt eine repräsentative Frage der Aufgabe; tatsächliche Aufgaben enthalten die oben festgelegte vollständige Fragenzahl.

### 8–12

#### Leicht

| Nr. | Vier gezeigte Informationen | Frage → Lösung |
| --- | --- | --- |
| 1 | Mia nimmt einen Apfel als Snack. Ben nimmt eine Birne als Snack. Lea nimmt Trauben als Snack. Tom nimmt eine Banane als Snack. | Was nimmt Mia als Snack? → Apfel |
| 2 | Fips ist ein brauner Hund. Minka ist eine graue Katze. Hoppel ist ein weißes Kaninchen. Pico ist ein grüner Wellensittich. | Welche Farbe hat Minka? → Grau |
| 3 | Das rote Heft liegt in Fach 1. Das blaue Heft liegt in Fach 2. Das grüne Heft liegt in Fach 3. Das gelbe Heft liegt in Fach 4. | In welchem Fach liegt das grüne Heft? → Fach 3 |
| 4 | Nia malt mit einem Pinsel. Ali baut mit Klötzen. Jo liest ein Buch. Sam puzzelt ein Bild. | Womit baut Ali? → Mit Klötzen |
| 5 | Der Bus fährt um neun Uhr ab. Der Zug fährt um zehn Uhr ab. Das Boot fährt um elf Uhr ab. Das Taxi fährt um zwölf Uhr ab. | Wann fährt das Boot ab? → Um elf Uhr |

#### Anspruchsvoll

| Nr. | Sechs gezeigte Informationen | Frage → Lösung |
| --- | --- | --- |
| 1 | Mia hat den blauen Schlüssel. Der blaue Schlüssel öffnet Fach 4. Ben hat den grünen Schlüssel. Der grüne Schlüssel öffnet Fach 2. Ava hat den roten Schlüssel. Der rote Schlüssel öffnet Fach 1. | Welches Fach öffnet Mias Schlüssel? → Fach 4 |
| 2 | Leo trägt eine Karte mit einem Stern. Eine Sternkarte gilt für Raum 3. Nia trägt eine Karte mit einem Mond. Eine Mondkarte gilt für Raum 1. Sam trägt eine Karte mit einer Sonne. Eine Sonnenkarte gilt für Raum 2. | Für welchen Raum gilt Leos Karte? → Raum 3 |
| 3 | Evas Haustier ist eine Katze. Die Katze schläft am Fenster. Noas Haustier ist ein Hund. Der Hund schläft im Körbchen. Lias Haustier ist ein Kaninchen. Das Kaninchen schläft im Stall. | Wo schläft Evas Haustier? → Am Fenster |
| 4 | Das rote Boot fährt zum Strand. Der Strand ist bei Insel 2. Das blaue Boot fährt zum Hafen. Der Hafen ist bei Insel 1. Das grüne Boot fährt zum Leuchtturm. Der Leuchtturm ist bei Insel 3. | Bei welcher Insel liegt das Ziel des roten Boots? → Insel 2 |
| 5 | Ben wählt das Dreieck. Das Dreieck liegt auf Karte 2. Mia wählt den Kreis. Der Kreis liegt auf Karte 1. Ali wählt den Stern. Der Stern liegt auf Karte 3. | Auf welcher Karte liegt Bens Form? → Karte 2 |

### 13–17

#### Leicht

| Nr. | Vier gezeigte Informationen | Frage → Lösung |
| --- | --- | --- |
| 1 | Der Film beginnt um 16 Uhr. Das Training beginnt um 17 Uhr. Die Probe beginnt um 18 Uhr. Das Treffen beginnt um 19 Uhr. | Wann beginnt die Probe? → Um 18 Uhr |
| 2 | Kims Projekt nutzt Papier. Dans Projekt nutzt Holz. Rias Projekt nutzt Stoff. Toms Projekt nutzt Ton. | Welches Material nutzt Rias Projekt? → Stoff |
| 3 | Folge A enthält fünf Bilder. Folge B enthält sieben Bilder. Folge C enthält neun Bilder. Folge D enthält elf Bilder. | Wie viele Bilder enthält Folge C? → Neun |
| 4 | Der blaue Ordner gehört zur Gruppe Nord. Der rote Ordner gehört zur Gruppe Süd. Der grüne Ordner gehört zur Gruppe Ost. Der gelbe Ordner gehört zur Gruppe West. | Zu welcher Gruppe gehört der rote Ordner? → Süd |
| 5 | Aras Team übt in Halle 1. Bos Team übt in Halle 2. Cems Team übt in Halle 3. Das Team von Dee übt in Halle 4. | In welcher Halle übt Bos Team? → Halle 2 |

#### Anspruchsvoll

| Nr. | Sechs gezeigte Informationen | Frage → Lösung |
| --- | --- | --- |
| 1 | Kims Datei trägt das Symbol Dreieck. Ein Dreieck führt zu Ordner Blau. Dans Datei trägt das Symbol Kreis. Ein Kreis führt zu Ordner Grün. Rias Datei trägt das Symbol Stern. Ein Stern führt zu Ordner Rot. | In welchem Ordner liegt Kims Datei? → Blau |
| 2 | Team A bucht Raum 1. Raum 1 hat einen Beamer. Team B bucht Raum 2. Raum 2 hat ein Whiteboard. Team C bucht Raum 3. Raum 3 hat Lautsprecher. | Welche Ausstattung hat Team B? → Whiteboard |
| 3 | Nuri wählt den Code 14. Code 14 öffnet Fach C. Jona wählt den Code 27. Code 27 öffnet Fach A. Esra wählt den Code 35. Code 35 öffnet Fach B. | Welches Fach öffnet Jonas Code? → Fach A |
| 4 | Die Playlist Blau enthält Titel 2. Titel 2 dauert drei Minuten. Die Playlist Grün enthält Titel 4. Titel 4 dauert fünf Minuten. Die Playlist Rot enthält Titel 6. Titel 6 dauert zwei Minuten. | Wie lange dauert ein Titel aus Playlist Grün? → Fünf Minuten |
| 5 | Miras Entwurf hat blaue Überschriften. Blaue Überschriften gehören zu Stil L. Leons Entwurf hat grüne Überschriften. Grüne Überschriften gehören zu Stil M. Soras Entwurf hat rote Überschriften. Rote Überschriften gehören zu Stil N. | Zu welchem Stil gehören Miras Überschriften? → Stil L |

### 18+

#### Leicht

| Nr. | Vier gezeigte Informationen | Frage → Lösung |
| --- | --- | --- |
| 1 | Der Bericht wird am Montag geprüft. Der Entwurf wird am Dienstag geprüft. Die Rechnung wird am Mittwoch geprüft. Der Vertrag wird am Donnerstag geprüft. | Wann wird die Rechnung geprüft? → Am Mittwoch |
| 2 | Paket A wiegt zwei Kilogramm. Paket B wiegt drei Kilogramm. Paket C wiegt vier Kilogramm. Paket D wiegt fünf Kilogramm. | Wie viel wiegt Paket B? → Drei Kilogramm |
| 3 | Der Termin mit Mara findet in Raum 1 statt. Der Termin mit Jo findet in Raum 2 statt. Der Termin mit Alex findet in Raum 3 statt. Der Termin mit Kim findet in Raum 4 statt. | In welchem Raum findet der Termin mit Alex statt? → Raum 3 |
| 4 | Der Zug nach Bonn fährt von Gleis 1. Der Zug nach Essen fährt von Gleis 2. Der Zug nach Ulm fährt von Gleis 3. Der Zug nach Kiel fährt von Gleis 4. | Von welchem Gleis fährt der Zug nach Essen? → Gleis 2 |
| 5 | Dokument A hat den Status Entwurf. Dokument B hat den Status Prüfung. Dokument C hat den Status Freigabe. Dokument D hat den Status Archiv. | Welchen Status hat Dokument C? → Freigabe |

#### Anspruchsvoll

| Nr. | Sechs gezeigte Informationen | Frage → Lösung |
| --- | --- | --- |
| 1 | Auftrag A gehört zu Kunde Nord. Kunde Nord nutzt Versandart Express. Auftrag B gehört zu Kunde Süd. Kunde Süd nutzt Versandart Standard. Auftrag C gehört zu Kunde West. Kunde West nutzt Versandart Abholung. | Welche Versandart gilt für Auftrag A? → Express |
| 2 | Akte L liegt in Schrank 2. Schrank 2 steht im Raum Blau. Akte M liegt in Schrank 3. Schrank 3 steht im Raum Grün. Akte N liegt in Schrank 4. Schrank 4 steht im Raum Rot. | In welchem Raum liegt Akte M? → Grün |
| 3 | Projekt K verwendet Verfahren Alpha. Alpha erzeugt Format CSV. Projekt L verwendet Verfahren Beta. Beta erzeugt Format JSON. Projekt M verwendet Verfahren Gamma. Gamma erzeugt Format XML. | Welches Format erzeugt Projekt L? → JSON |
| 4 | Route A führt über Station Ost. Station Ost liegt vor Station Mitte. Route B führt über Station West. Station West liegt nach Station Mitte. Route C führt über Station Nord. Station Nord liegt vor Station Mitte. | Welche Route führt über eine Station, die nach Mitte liegt? → Route B |
| 5 | Vorgang A wird von Team 1 bearbeitet. Team 1 nutzt Vorlage Blau. Vorgang B wird von Team 2 bearbeitet. Team 2 nutzt Vorlage Grün. Vorgang C wird von Team 3 bearbeitet. Team 3 nutzt Vorlage Rot. | Welche Vorlage nutzt das Team für Vorgang C? → Rot |

Die Beispiele veranschaulichen knappe Aufgabeninhalte. Vor Verwendung als redaktionell geprüfter Aufgabenbestand werden auch alle nicht gezeigten Fragen und Optionen jeder Aufgabe nach denselben Eindeutigkeitsregeln validiert.

## Zustände, Aktionen und Zeit

Die Merkphase und jede Frage sind eigene Zustände. Für jede Aktion gilt: Der Zustand wird erst nach der genannten Bestätigung gewechselt; Zurückspringen in bereits gezeigte Informationen oder abgeschlossene Fragen ist nicht möglich.

| Zustand | Zulässige Aktion und Übergang | Zeit |
| --- | --- | --- |
| Anleitung | „Start“ beginnt die Merkphase und startet die Informationsanzeige. | Noch keine Aufgabenzeit |
| Merkphase: Information ausstehend | „Weiter“ zeigt die nächste Information und aktualisiert den Fortschritt. Informationen können nicht zurückgerufen werden. | Von der aktiven Aufgabenzeit ausgenommen; kein eigenes Zeitlimit |
| Merkphase: letzte Information gezeigt | „Fragen starten“ bestätigt das Ende der Merkphase und zeigt Frage 1. | Merkphase bleibt ausgenommen |
| Frage offen | Eine oder mehrere Optionen auswählen, Auswahl ändern, einen verfügbaren Hinweis anfordern, die Frage überspringen, Aufgabe neu starten oder die Aufgabe abbrechen. „Antwort prüfen“ bestätigt die aktuelle Auswahl. | Aktive Aufgabenzeit läuft |
| Antwort bestätigt: richtig | Richtig-Feedback und Frageergebnis anzeigen; „Weiter“ öffnet die nächste offene Frage oder beendet die Aufgabe nach Frage 3 beziehungsweise 5. | Aktive Aufgabenzeit läuft bis zum endgültigen Abschluss |
| Antwort bestätigt: falsch | Falsch-Feedback ohne Lösung zeigen; Frage wird endgültig geschlossen und ein Fehler gezählt. „Weiter“ öffnet die nächste Frage. Beim dritten Fehler endet die Aufgabe automatisch. | Aktive Aufgabenzeit läuft |
| Frage übersprungen | Überspringen bestätigen; Frage wird endgültig geschlossen und erhält null Punkte. Es wird kein Fehler gezählt. | Aktive Aufgabenzeit läuft |
| Aufgabe beendet | Vollständige Fragenlösungen und Erklärungen zeigen; „Weiter“ bestätigt das Ende und übergibt die Wertung. | Aufgabe endet mit der Bestätigung |
| Neustart bestätigt | Dieselbe Aufgabe beginnt von vorn; verbrauchte Fehler, Hinweise, abgeschlossene Fragen und erzielte Teilpunkte bleiben erhalten. Bereits gezeigte Informationen werden erneut durchlaufen; abgeschlossene Fragen werden nicht wieder geöffnet. | Aktive Zeit läuft weiter; Merkphase bleibt ausgenommen |
| Abbruch bestätigt | Aufgabe beenden, vollständige Lösung zeigen und Aufgabe mit null Punkten abschließen. | Aufgabe endet mit der Bestätigung |

Die Merkphase hat kein Zeitlimit und zählt nicht zur aktiven Spielzeit. Fragephase, Rückmeldung und Bestätigungen zählen zur aktiven Zeit nach den gemeinsamen Spielregeln. Bei Pause oder Hintergrundwechsel gelten ebenfalls die gemeinsamen Pausenregeln. Ein Abbruch der offiziellen Runde macht die laufende Aufgabe zu einer offenen Aufgabe mit null Punkten; bereits endgültig abgeschlossene Aufgaben behalten ihre festgelegten Punkte.

## Fehler, Hinweise und Punkte

- Nur eine bestätigte falsche Antwort zählt als Fehler. Eine leere oder unvollständige Mehrfachauswahl kann nicht bestätigt werden und zählt nicht als Fehler.
- Eine falsche Frage ist abgeschlossen und kann nicht erneut beantwortet werden. Falsches Feedback verrät weder die richtige Option noch Teiltreffer.
- Ein bestätigtes Überspringen einer Frage gibt null Punkte für diese Frage, aber verbraucht keinen Fehler. „Aufgabe überspringen“ beendet die Aufgabe mit null Punkten.
- Nach dem dritten Fehler endet die gesamte Aufgabe automatisch mit null Punkten; offene Fragen erhalten ebenfalls null Punkte.
- „Lösung anzeigen“ nach Bestätigung beendet die Aufgabe mit null Punkten. Die vollständige Lösung wird nach jedem Aufgabenende einschließlich Überspringen, drittem Fehler und Abbruch angezeigt.
- Es gibt höchstens zwei Hinweise pro Aufgabe. Der erste Hinweis grenzt das relevante Themenfeld oder die Art der Verknüpfung ein, ohne eine Antwort zu nennen. Der zweite Hinweis zeigt eine dafür relevante Information erneut in neutraler Form, nennt aber nicht die Antwort. Hinweise sind nicht rücknehmbar und bleiben nach einem Neustart verbraucht.
- Für 8–12 und 13–17 ist der erste Hinweis kostenlos; für 18+ senkt er die erreichbare Höchstpunktzahl um 10. Der zweite Hinweis senkt sie für alle Altersgruppen um weitere 20. Die Höchstpunktzahl fällt nicht unter null.
- Jede Frage hat dasselbe Gewicht: ein Drittel bei drei Fragen, ein Fünftel bei fünf Fragen. Die Rohpunktzahl ist der Anteil richtiger Fragen an allen Fragen mal 100. Davon werden die anwendbaren Hinweisabzüge abgezogen; falsche, übersprungene und offene Fragen sind nicht richtig. Begrenzung, kaufmännische Rundung beim endgültigen Aufgabenabschluss und Tagesnormalisierung richten sich nach dem gemeinsamen Bewertungsmodell. Der dritte Fehler, das Überspringen der ganzen Aufgabe, „Lösung anzeigen“ und ein Abbruch setzen die Aufgabenpunktzahl unabhängig vom Zwischenstand auf null.

## Validierung

Vor der Anzeige prüft die Engine:

1. Anzahl der Informationen, Fragen und Optionen stimmt exakt mit Altersgruppe und Schwierigkeit überein.
2. Jede Information entspricht genau einem strukturierten Einzelfakt oder einer Beziehung; Objekte und Bezeichnungen sind eindeutig und Beziehungen korrekt gerichtet.
3. Altersangemessenheit, Wortgrenzen, erlaubte Themen und Ausschlüsse sind eingehalten.
4. Jede Frage und alle richtigen Antworten sind ausschließlich aus den gezeigten Informationen ableitbar; anspruchsvolle Aufgaben enthalten mindestens eine zulässige mehrschrittige Frage.
5. Jede Frage hat mindestens eine richtige Antwort; jede falsche Option ist falsch, Antwortmengen sind eindeutig und Auswahlhinweise stimmen mit der Zahl richtiger Antworten überein.
6. Die Lösungserklärung belegt den erwarteten Schluss und widerspricht weder Fakten noch Frage.

Ungültige Aufgaben werden verworfen und nicht angezeigt; die Engine versucht eine andere Aufgabe. Wenn keine gültige generierte Aufgabe verfügbar ist, wird eine redaktionell geprüfte Aufgabe verwendet. Auch handgebaute Aufgaben durchlaufen die automatisierten Prüfungen und zusätzlich eine redaktionelle Prüfung auf Verständlichkeit und Altersangemessenheit.
