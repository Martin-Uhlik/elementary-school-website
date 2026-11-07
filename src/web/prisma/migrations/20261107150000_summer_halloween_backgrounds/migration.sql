-- Two more seasonal backgrounds in the style of the others: summer holidays and Halloween
INSERT INTO "background_themes" ("id", "name", "src", "start_day", "start_month", "end_day", "end_month") VALUES
  (gen_random_uuid(), 'Léto', '/data/images/background_elements/summer.svg', 1, 7, 31, 8),
  (gen_random_uuid(), 'Halloween', '/data/images/background_elements/halloween.svg', 25, 10, 1, 11);
