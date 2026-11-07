-- The Mateřská škola tile on /foto-video gets its own photo (seed/content.sql has the same change).

UPDATE gallery_sections SET cover = '/data/images/materska-skola.webp' WHERE unit = 'ms';
