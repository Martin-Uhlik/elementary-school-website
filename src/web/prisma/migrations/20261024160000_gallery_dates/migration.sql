-- Gallery dates that were part of the title move to date_text (seed/content.sql has the same fix).
-- Only rows still as seeded are changed, so edits made in /auth stay.

UPDATE galleries SET title = 'Vánoční dílničky', date_text = '13.12.2017' WHERE id = '20171213' AND title = 'Vánoční dílničky 13.12.17' AND date_text IS NULL;
UPDATE galleries SET title = 'Lyžařský kurz Karlov pod Pradědem', date_text = '23.-28.1.2016' WHERE id = '20160123-28' AND title = 'Lyžařský kurz Karlov pod Pradědem, 23-28.1.2016' AND date_text IS NULL;
UPDATE galleries SET title = 'Výlet Lešná 1.třída', date_text = '17.5.2012' WHERE id = '20120517s' AND title = 'Výlet Lešná 1.třída 17.5 2012' AND date_text IS NULL;
UPDATE galleries SET title = 'Výlet 8.B Rožnov p.R.', date_text = '10.-11.6.2010' WHERE id = '20100611' AND title = 'Výlet 8.B Rožnov p.R. 10-11.6.2010' AND date_text IS NULL;
UPDATE galleries SET title = 'Prostor školy', date_text = '11.10.2009' WHERE id = '20091011' AND title = 'Prostor školy 2009' AND date_text IS NULL;
UPDATE galleries SET title = 'Ples školy - video 480p', date_text = '30.4.2022' WHERE id = '2022-zs-video-69' AND title = 'Ples školy 30.4.2022 - video 480p' AND date_text IS NULL;
UPDATE galleries SET title = 'Ples školy - video 720p', date_text = '30.4.2022' WHERE id = '2022-zs-video-70' AND title = 'Ples školy 30.4.2022 - video 720p' AND date_text IS NULL;
UPDATE galleries SET title = 'Ples školy - video 1080p', date_text = '30.4.2022' WHERE id = '2022-zs-video-71' AND title = 'Ples školy 30.4.2022 - video 1080p' AND date_text IS NULL;
UPDATE galleries SET title = 'Školní ples - video', date_text = '23.2.2013' WHERE id = '2013-zs-video-234' AND title = 'Školní ples 23.2.2013 video' AND date_text IS NULL;
UPDATE galleries SET title = 'Na zahradě', date_text = '20.12.2015' WHERE id = '20151220' AND title = 'Na zahradě zima-2015' AND date_text IS NULL;
UPDATE galleries SET title = 'Na zahradě', date_text = '15.12.2015' WHERE id = '20151215' AND title = 'Na zahradě podzim-2015' AND date_text IS NULL;
UPDATE galleries SET title = 'Hry ve třídě', date_text = '26.11.2015' WHERE id = '20151126' AND title = 'Hry ve třídě říjen-2015' AND date_text IS NULL;
UPDATE galleries SET title = 'Hry ve třídě', date_text = '12.12.2014' WHERE id = '20141212' AND title = 'Hry ve třídě 2014' AND date_text IS NULL;
UPDATE galleries SET title = 'Vycházky dětí do okolí', date_text = '13.3.2013' WHERE id = '20130313' AND title = 'Vycházky dětí do okolí 10.2012-03.2013' AND date_text IS NULL;
UPDATE galleries SET title = 'Na zahradě', date_text = '15.5.2012' WHERE id = '20120515' AND title = 'Na zahradě 15.5.20112' AND date_text IS NULL;
UPDATE galleries SET title = 'Prohlídka prostor školky', date_text = '8.10.2009' WHERE id = '20091008' AND title = 'Prohlídka prostor školky 2009' AND date_text IS NULL;
UPDATE galleries SET title = 'Únor a březen', date_text = '31.3.2022' WHERE id = '20220331' AND title = 'Únor a březen 2022' AND date_text IS NULL;
UPDATE galleries SET title = 'Leden', date_text = '31.1.2022' WHERE id = '20220131' AND title = 'Leden 2022' AND date_text IS NULL;
UPDATE galleries SET title = 'Práce dětí', date_text = '1.-30.10.2010' WHERE id = '20101001-30' AND title = 'Práce dětí, říjen' AND date_text IS NULL;
UPDATE galleries SET title = 'Jsem malý, ale šikovný', date_text = 'listopad 2009' WHERE id = '20091100' AND title = 'Jsem malý, ale šikovný' AND date_text IS NULL;
UPDATE galleries SET title = 'Knihovna 6. třída' WHERE id = '20191115' AND title = 'Knihovna 6. třída -';
UPDATE galleries SET title = 'Útulek Hodonín' WHERE id = '20191113_02' AND title = 'Útulek Hodonín,';
UPDATE galleries SET title = '7. třída výlet Ostrava' WHERE id = '20170608' AND title = '7. třída výlet Ostrava -';
UPDATE galleries SET title = 'Projekt záložka, spolupráce se ZŠ Bratislava' WHERE id = '20141029' AND title = 'Projekt záložka, spolupráce se ZŠ Bratislava,';
UPDATE galleries SET title = '2. třída na zámku Milotice' WHERE id = '20140415' AND title = '2. třída na zámku Milotice,';
