# Mind 5 – Persistenz in V1

## Entscheidung

V1 verwendet `localStorage` als lokalen Speicher. Das Persistenzschema enthält nur wenige Kilobyte an Einstellungen, aktuellem Tageszustand, Rekorden und Zeitmetadaten. Es gibt weder große Binärdaten noch eine Statistik-Historie oder eine lokale Aufgabenbibliothek. Ein einzelnes versioniertes Dokument lässt sich deshalb einfacher und ohne den zusätzlichen Transaktions- und asynchronen API-Aufwand von IndexedDB speichern.

Der Zugriff darauf bleibt hinter einem asynchronen Speichervertrag verborgen. So kann die Implementierung später auf IndexedDB oder einen anderen Speicher wechseln, ohne Spiellogik an die Speichertechnik zu koppeln. Ein Wechsel ist keine Zusage für Accounts oder Synchronisierung; beides ist nicht Teil von V1.

## Persistenzschema

Gespeichert wird ein vollständiger Zustand unter einem festen Schlüssel, beispielsweise `mind5.state`. Das Schema ist JSON-serialisierbar und wird bei jeder Änderung als Ganzes ersetzt:

```text
PersistedState {
  schemaVersion: 1,
  preferences: {
    ageGroup: "8-12" | "13-17" | "18+"
  },
  clock: {
    source: "external" | "device",
    trustedAt: ISO-8601-Instant | null,
    observedLocalAt: ISO-8601-Instant | null,
    validation: "valid" | "unverified" | "manipulated"
  },
  streak: {
    count: non-negative integer,
    lastCountedDay: "YYYY-MM-DD" | null
  },
  records: {
    "8-12" | "13-17" | "18+": {
      bestScore: null | { points: 1..100, recordedAt: ISO-8601-Instant },
      bestTime: null | {
        durationMs: non-negative integer,
        points: 0..100,
        recordedAt: ISO-8601-Instant
      }
    }
  },
  day: null | {
    date: "YYYY-MM-DD", // Europe/Berlin
    officialAttempt: {
      status: "available" | "in-progress" | "completed" | "aborted",
      startedAt: ISO-8601-Instant | null,
      finishedAt: ISO-8601-Instant | null,
      points: 0..100 | null,
      taskPoints: [0..100 | null, ...] // exactly five entries once started
    }
  },
  activeRound: null | {
    kind: "official-candidate" | "official" | "unscored",
    startedAt: ISO-8601-Instant
  }
}
```

`day` enthält ausschließlich den aktuellen Tag. Beim Tageswechsel wird der vorherige Tageszustand verworfen; für die Streak-Berechnung bleiben nur Zähler und letzter gezählter Tag erhalten. Bestwerte und Bestzeiten werden je Altersgruppe aufbewahrt. Das Speichern eines Bestwerts mit null Punkten ist nicht erforderlich, da null laut Spielregeln keinen persönlichen Bestwert bildet. Bestzeiten mit null Punkten bleiben zulässig.

`activeRound` ist nur ein Wiederherstellungsmarker, kein fortsetzbarer Spielstand. Aufgabeninhalte, Antworten und Eingaben werden nicht persistiert. Nach einem Neustart wird ein nicht-offizieller Kandidat verworfen und erfordert vor dem nächsten Start die vorgesehene Bestätigung. Eine offizielle Runde wird als Tagesabbruch abgeschlossen: noch offene Aufgaben zählen null, der Tageswert wird berechnet und die Zeit ist ungültig. Eine weitere Runde wird ohne Wertung beendet. Damit werden die Regeln zum Schließen der Anwendung eingehalten, ohne eine laufende Runde fortsetzen zu können.

Die Tageswerte enthalten höchstens fünf Einträge. Es werden keine vergangenen Tagesrunden, Aktivitätsverläufe oder sonstige Langzeitstatistiken gespeichert. Zeitpunkte werden als ISO-8601-Instant gespeichert; der angezeigte Tag und die Tageszeit werden in `Europe/Berlin` daraus abgeleitet.

## Speichervertrag

Die Spiellogik arbeitet ausschließlich mit einem abstrakten, asynchronen Vertrag:

```text
StateStore {
  read(): Promise<PersistedState | null>
  write(state: PersistedState): Promise<void>
  clear(): Promise<void>
}
```

Die V1-Implementierung liest und schreibt das ganze Dokument unter einem Schlüssel in `localStorage`. Sie verändert nicht selbstständig Spielfachregeln. `write` ersetzt einen vollständigen validierten Zustand; Spielzustandsübergang und Rekordberechnung bleiben Aufgabe der Domänenlogik. Die asynchrone Schnittstelle hält Aufrufer unabhängig von der synchronen localStorage-API und ermöglicht später eine transaktionale IndexedDB-Implementierung.

Beim Laden wird das Dokument auf Form, Wertebereiche und `schemaVersion` geprüft. Unterstützte ältere Versionen werden über geordnete, deterministische Migrationen in die aktuelle Version überführt und anschließend zurückgeschrieben. Unbekannte zukünftige Versionen oder ungültige Daten werden nicht teilweise übernommen: Der Zustand wird als nicht lesbar behandelt, ein sicherer Start ohne gespeicherte Daten ermöglicht und ein verständlicher Hinweis angezeigt. Ein fehlgeschlagener Schreibzugriff darf nicht als erfolgreich gespeichert gemeldet werden; die Anwendung zeigt einen Hinweis, dass lokale Fortschritte nicht dauerhaft gespeichert werden konnten.

Der Speicher ist geräte- und browserlokal. V1 bietet keine Konten, Übertragung, Synchronisierung oder Server-Schnittstelle. Das Leeren betrifft nur den lokalen Mind-5-Zustand und wird nur durch eine bewusste Nutzeraktion ausgelöst.
