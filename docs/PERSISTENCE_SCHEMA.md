# Mind 5 – Persistenzschema und Migrationen

Dieses Dokument definiert das logische Persistenzmodell für V1. Es legt weder
localStorage noch IndexedDB als Speicher fest. Der Zugriff erfolgt über eine
Speicherschnittstelle; die fachlichen Regeln bleiben unabhängig vom Backend.

## Grundsätze

- Gespeichert wird nur, was für Tagesrunde, offiziellen Versuch, Rekorde,
  Streak, Altersgruppe, Zeitbehandlung und technische Wiederherstellung nötig
  ist. Eine Statistik-Historie wird nicht geführt.
- Eine laufende Runde ist nach Schließen oder Neuladen nicht fortsetzbar. Der
  gespeicherte Zwischenstand dient nur der Behandlung eines Abbruchs und wird
  beim nächsten Start nach den [Spielregeln](./GAMEPLAY_SPECIFICATION.md)
  abgeschlossen oder verworfen.
- Tageskennungen sind Kalenderdaten im Format `YYYY-MM-DD` in `Europe/Berlin`.
  Zeitstempel sind UTC-Instants im ISO-8601-Format. Die beiden Darstellungen
  sind nicht austauschbar.
- Alle Werte werden beim Lesen validiert. Unbekannte optionale Felder dürfen
  ignoriert werden; ungültige oder widersprüchliche Pflichtwerte dürfen keine
  Rekorde, Wertungen oder Streaks erzeugen.

## Logisches V1-Modell

Ein persistenter Datensatz hat die folgende Struktur. `null` bedeutet, dass
noch kein entsprechender Wert vorliegt.

```json
{
  "schemaVersion": 1,
  "appVersion": "0.1.0",
  "selectedAgeGroup": "13-17",
  "activeRound": null,
  "pendingConfirmations": [],
  "currentDay": {
    "day": "2026-10-18",
    "officialAttempt": null
  },
  "recordsByAgeGroup": {
    "8-12": { "bestScore": null, "bestTime": null },
    "13-17": { "bestScore": null, "bestTime": null },
    "18+": { "bestScore": null, "bestTime": null }
  },
  "streak": { "count": 0, "lastCountedDay": null },
  "clock": {
    "source": "device",
    "lastTrustedInstant": null,
    "lastExternalSync": null,
    "integrity": "unverified"
  }
}
```

### Runde und offizieller Versuch

`activeRound` enthält nur dann einen Wert, wenn eine Runde gerade bearbeitet
wird:

```json
{
  "roundId": "stable-unique-id",
  "day": "2026-10-18",
  "kind": "official",
  "ageGroup": "13-17",
  "difficultyProfile": 3,
  "state": "in-progress",
  "startedAt": "2026-10-18T16:15:00Z",
  "activeTimeMs": 42000,
  "tasks": []
}
```

`kind` ist `official` oder `extra`; `state` ist `in-progress`, `paused` oder
`finished`. `finished` ist nur ein Übergangszustand beim Abschluss und wird
zusammen mit der Aktualisierung des Tageszustands aus `activeRound` entfernt.
Aufgaben enthalten die zur Abbruchwertung
nötigen Aufgabensnapshots einschließlich Inhalts-/Validierungsversion,
Validierungsstatus, Fortschritt, Fehler, verwendete Hinweise und endgültige
Aufgabenpunkte. Es werden keine Eingaben oder Zwischenergebnisse über die für
diesen Zweck nötigen Daten hinaus archiviert. `activeTimeMs` zählt ausschließlich
aktive Spielzeit. Monotone Laufzeitwerte werden nicht als Zeitquelle über einen
Neustart hinweg verwendet.

Der offizielle Versuch wird beim endgültigen Abschluss der ersten Aufgabe
angelegt. Sein Zustand ist `in-progress`, `completed` oder `abandoned`; er
enthält Altersgruppe, Start-/Endzeit, fünf Aufgabenpunkte (noch offene Aufgaben
als `null` bis zur Wertung) und den Tageswert, sobald diese feststehen. Auch ein
Abbruch nach Festlegung zählt als der eine offizielle Versuch des Tages. Ein
vor Abschluss der ersten Aufgabe verworfener Start verbraucht ihn nicht. Für
`extra`-Runden wird kein Tagesversuch angelegt.

### Wiederherstellung nach Schließen oder Neuladen

`activeRound` ist kein fortsetzbarer Spielstand. `paused` kennzeichnet nur eine
Pause während der laufenden Sitzung; nach Schließen oder Neuladen wird keine
Aufgabe erneut geöffnet. Beim nächsten Start dient ein vorhandener Lauf
ausschließlich zur einmaligen Abwicklung:

| Gespeicherter Lauf | Wiederherstellung |
| --- | --- |
| `extra` oder `official`, bevor die erste Aufgabe endgültig abgeschlossen wurde | `activeRound` verwerfen. Kein offizieller Versuch, Tagesergebnis, Streak oder Bestwert wird angelegt oder geändert. |
| `official` mit bereits angelegtem `officialAttempt` | Versuch als `abandoned` beenden, offene bzw. noch nicht endgültig gewertete Aufgaben auf null Punkte setzen, Tagesergebnis berechnen und den offiziellen Bestwert prüfen. Eine bereits gezählte Streak wird nicht erneut verändert. Die aktive Zeit ist ungültig und erzeugt keine Bestzeit. |
| `extra` nach Beginn | Lauf ohne Wertung verwerfen. Tagesergebnis, Streak und Bestwert bleiben unverändert; der Abbruch erzeugt keine Bestzeit. |

Nach jeder Abwicklung wird `activeRound` auf `null` gesetzt. Es werden weder
Eingaben noch Aufgabenfortschritt wiederhergestellt. `pendingConfirmations`
enthält bis zur Bestätigung die noch anzuzeigenden Hinweise
`discarded-round` (ein nicht-offizieller Lauf wurde verworfen) und/oder
`new-day` (die Tagesrunde des neuen Berliner Kalendertags beginnt). Bei der
Wiederherstellung gemäß erster und dritter Tabellenzeile wird
`discarded-round` hinzugefügt. Die Bestätigung entfernt jeweils den
zugehörigen Eintrag; vor einer neuen Runde müssen alle ausstehenden
Bestätigungen erledigt sein. So bleibt der Hinweis auch dann erhalten, wenn
die App direkt nach dem Wiederherstellen erneut geschlossen wird.

Die offizielle Abbruchwertung verwendet die endgültigen Punkte bereits
abgeschlossener Aufgaben unverändert. Eine offene Aufgabe und jede noch nicht
endgültig bestätigte Aufgabe zählen null; der Tageswert ist der gerundete
Mittelwert aus fünf Aufgabenwerten. Das Ergebnis wird auch bei null Punkten im
offiziellen Versuch gespeichert. Nur ein positives Ergebnis kann den
Bestwert der Altersgruppe verbessern; ein Abbruch kann nie eine Bestzeit
erzeugen. Eine abgeschlossene zusätzliche Runde ändert weder Tagesergebnis noch
Streak oder Bestwert; nur ihre gültige, vollständig gemessene Zeit kann eine
Bestzeit verbessern.

Es wird nur der Zustand des aktuellen Berliner Kalendertags gespeichert. Beim
Tageswechsel wird ein aktiver Lauf für den bisherigen Tag zuerst nach den
Wiederherstellungsregeln abgewickelt. Danach wird `currentDay` auf den neuen
Tag gesetzt und `new-day` zu `pendingConfirmations` hinzugefügt. Noch
ausstehende Bestätigungen bleiben dabei erhalten. Eine beendete zusätzliche
Runde ändert weder Tagesergebnis noch Streak oder Bestwert.

### Altersgruppenspezifische Rekorde und Streak

`recordsByAgeGroup` enthält pro Altersgruppe:

- `bestScore`: `{ "score": 87, "day": "2026-10-18", "at": "2026-10-18T17:00:00Z" }`
  oder `null`. Null-Punkte-Ergebnisse erzeugen keinen persönlichen Bestwert.
- `bestTime`: `{ "durationMs": 245000, "score": 87, "day": "2026-10-18", "at": "2026-10-18T17:00:00Z" }`
  oder `null`. Die Zeit wird nur aus einer gültigen Messung übernommen. Eine
  weitere Runde darf die Bestzeit, nicht jedoch den Bestwert verbessern.

Bestwert- und Bestzeitvergleich folgen ausschließlich den Regeln in der
[Spiel- und Regelspezifikation](./GAMEPLAY_SPECIFICATION.md). Ein Rekord wird
nicht durch einen Gleichstand ersetzt.

Der Streak ist global, nicht altersgruppenspezifisch. `lastCountedDay` ist der
Tag, an dem die erste Aufgabe des offiziellen Versuchs endgültig abgeschlossen
wurde. Der Streak wird dann gezählt, unabhängig vom Ergebnis dieser Aufgabe.
Die Zahl verpasster Tage wird anhand der Berliner Kalendertage ermittelt: null
verpasste Tage verlängern den Streak, genau ein verpasster Tag erlaubt die
Fortsetzung, mindestens zwei verpasste Tage setzen ihn vor dem nächsten Zählen zurück.
Altersgruppenwechsel setzt `count` auf `0` und `lastCountedDay` auf `null`;
Rekorde bleiben unverändert.

### Zeitquelle und Integrität

- `source` ist `external`, `offline-estimate` oder `device`. Eine externe
  Zeitquelle hat Vorrang. Offline wird der letzte vertrauenswürdige externe
  Zeitpunkt um die verstrichene lokale Zeit fortgeschrieben; ohne bekannten
  externen Zeitpunkt wird die Gerätezeit verwendet.
- `lastTrustedInstant` speichert den letzten abgeglichenen Zeitpunkt.
  `lastExternalSync` speichert den Zeitpunkt des letzten erfolgreichen
  Abgleichs oder ist `null`, wenn keiner stattgefunden hat.
- `integrity` ist `trusted`, `unverified` oder `suspected-manipulation`.
  Verdacht auf Manipulation sperrt gemäß Spielregeln Wertung und offiziellen
  Status und setzt den dort genannten Tageswert, Streak und Bestwert zurück.
  Unzuverlässige Zeitmessung darf keine Bestzeit erzeugen.
- Ein lokaler Browserdatensatz ist manipulierbar und stellt keinen
  Manipulationsschutz dar. Zeitangaben allein sind kein Beweis für einen
  gültigen Versuch.

## Altersgruppenwechsel

Die ausgewählte Altersgruppe wird sofort als `selectedAgeGroup` gespeichert.
Bei einem Wechsel:

1. Ein noch nicht offizieller, aktiver Lauf wird verworfen. Ein bereits
   festgelegter offizieller Lauf wird nach den Abbruchregeln beendet; offene
   Aufgaben zählen null und das Tagesergebnis wird berechnet.
2. Die aktuelle Tageswertung wird für die Anzeige zurückgesetzt und `streak`
   wird wie oben beschrieben geleert. Der Marker, dass der offizielle Versuch
   für diesen Tag bereits verbraucht ist, bleibt bestehen; der Versuch wird
   dadurch nicht erneut freigegeben.
3. Bestwert und Bestzeit werden **nicht** gelöscht oder umgeschrieben. Es
   werden nur die Rekorde der neu gewählten Altersgruppe angezeigt. Bei einer
   späteren Rückkehr erscheinen deren Rekorde wieder.
4. Die Runde verwendet unveränderlich die Altersgruppe, mit der sie begonnen
   wurde. Aufgaben, Punkte und Rekorde werden niemals nachträglich einer
   anderen Altersgruppe zugeordnet.

## Gerätewechsel

Der V1-Speicher ist an Browser und Gerät gebunden. Ein Wechsel auf ein anderes
Gerät überträgt weder `activeRound` noch Tageszustand, Bestwerte, Bestzeiten
oder Streak; es gibt keine Wiederherstellung oder Synchronisierung. Ein Lauf
auf dem ursprünglichen Gerät bleibt dort den Wiederherstellungsregeln
unterworfen. Geräteübergreifend fortgeschriebene oder anderweitig nicht
verlässlich gemessene Zeit ist ungültig und darf keine Bestzeit erzeugen.

## Versionierung und Migration

`schemaVersion` bezeichnet ausschließlich die Form und Bedeutung dieses
Persistenzdatensatzes. Änderungen an Aufgabeninhalten oder deren Prüfung
verwenden eigene Inhalts-/Validierungsversionen in den Aufgabensnapshots;
`appVersion` ist nur Diagnoseinformation und steuert keine Migration.

- Die erste veröffentlichte Form ist Schema **1**. Vor dem Schreiben wird der
  vollständige Datensatz gegen Version 1 validiert.
- Jede spätere Schemaänderung erhöht die Version um genau eins. Migrationen
  laufen in fester Reihenfolge (`n` nach `n+1`), sind deterministisch und
  idempotent. Nach jedem Schritt wird das Ergebnis validiert.
- Migrationen bewahren Altersgruppen-Rekorde und vorhandene Tagesregeln, soweit
  deren Bedeutung unverändert bleibt. Nicht verlustfrei übertragbare Werte
  werden nicht stillschweigend umgedeutet; die Migration muss sie ausdrücklich
  gemäß einer festgelegten Regel verwerfen oder als ungültig markieren.
- Der bisherige Datensatz bleibt erhalten, bis alle Migrationsschritte
  erfolgreich validiert und das neue Format atomar gespeichert sind. Bei
  Fehlern wird der Originaldatensatz nicht überschrieben; die Sitzung kann
  ohne Persistenz fortgesetzt werden.
- Bei einer unbekannten höheren `schemaVersion` wird nicht migriert und nichts
  geschrieben. Die vorhandenen Daten bleiben unangetastet, statt von einer
  älteren App-Version überschrieben zu werden.
- Fehlende oder beschädigte Daten dürfen keine Wertung oder Rekorde
  vortäuschen. Ein nicht mehr sicher interpretierbarer Zustand wird verworfen
  und als frischer, gültiger V1-Zustand gestartet; Rekorde werden nur erhalten,
  wenn sie einzeln validiert werden können.

## Speicherentscheidung und Zugriff

V1 verwendet `localStorage`. Der Datensatz umfasst nur wenige Kilobyte an
Einstellungen, aktuellem Tageszustand, Rekorden, Streak und Zeitmetadaten. Es
gibt weder große Binärdaten noch eine Statistik-Historie oder lokale
Aufgabenbibliothek. Ein einzelnes versioniertes JSON-Dokument ist dafür
ausreichend; IndexedDBs Transaktions- und API-Aufwand ist für diesen Umfang
nicht erforderlich.

Die Spiellogik greift ausschließlich über diesen asynchronen Vertrag auf den
Zustand zu:

```text
StateStore {
  read(): Promise<PersistedState | null>
  write(state: PersistedState): Promise<void>
  clear(): Promise<void>
}
```

Die V1-Implementierung liest und schreibt den vollständigen, validierten
Datensatz unter einem festen `localStorage`-Schlüssel. Die asynchrone
Schnittstelle entkoppelt Aufrufer von der synchronen Browser-API und lässt
einen späteren Wechsel etwa zu IndexedDB zu, ohne Spiellogik an die
Speichertechnik zu binden. Der Speichervertrag implementiert keine
Spielfachregeln. Schreibfehler werden weitergegeben und dürfen nicht als
erfolgreiches Speichern gemeldet werden; die Anwendung kann die Sitzung ohne
Persistenz fortsetzen und weist darauf hin, dass Fortschritte nicht dauerhaft
gespeichert werden konnten.

Der lokale Speicher ist geräte- und browsergebunden und kein Backend. V1 führt
weder Konten noch Übertragung oder Synchronisierung ein.

Tests müssen mindestens offizielle und verworfene Starts, Abbruch und
Tageswechsel, Altersgruppenwechsel mit erhaltenen Rekorden, ungültige Zeiten,
jeden Migrationsschritt, wiederholte Migration, beschädigte Daten sowie eine
unbekannte höhere Schema-Version abdecken.
