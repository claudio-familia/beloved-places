CREATE TABLE IF NOT EXISTS place 
(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, address TEXT, location TEXT, like INT);
INSERT or IGNORE INTO place VALUES (1, 'Time square', '', 'New Yorkm USA', '', 0);
INSERT or IGNORE INTO place VALUES (2, 'Mount Fuji', '', 'Tokyo, Japan', '', 1);
INSERT or IGNORE INTO place VALUES (3, 'Niagara falls', '', 'Toronto, Canada', '', 0);
 