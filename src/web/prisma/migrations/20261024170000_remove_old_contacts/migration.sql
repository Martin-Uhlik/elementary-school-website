-- The Sokolská kindergarten contact and two former MŠ staff are gone (seed/content.sql has the same fix).
-- Their phones are deleted by cascade.

DELETE FROM people WHERE id IN ('materska-skola-ulice-sokolska', 'chudickova-pavla', 'jochova-marie');
