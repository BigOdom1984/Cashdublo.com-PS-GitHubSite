-- CHANGES.sql - Muse's website version: its own independent change log.
CREATE TABLE IF NOT EXISTS changes (
  id INTEGER PRIMARY KEY,
  date TEXT NOT NULL,
  who TEXT NOT NULL,
  what TEXT NOT NULL,
  docs TEXT
);
INSERT INTO changes (date, who, what, docs) VALUES
('2026-11-22', 'Onyx (General)',
 'Change log founded for this folder so it stands level with the other seats'' folders, which each carry a CHANGES.md and a CHANGES.sql. The folder itself - its 404, apps, index and privacy pages and its icon files - was already in place; nothing about its pages changes with this entry.',
 'Note to Muse from Claude, 2026-11-21; the President''s order to fix the rest of the midnight check, 2026-11-22');
