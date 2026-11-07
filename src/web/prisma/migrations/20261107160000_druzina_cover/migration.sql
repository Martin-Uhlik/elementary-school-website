-- The Družina tile on /foto-video gets its own classroom photo (seed/content.sql has the same change).

UPDATE gallery_sections SET cover = '/data/images/druzina.webp' WHERE unit = 'druzina';
