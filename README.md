# projektmapp

 En egen api som med hj�lp av express och fs/body-parser moduler kan skriva och lagra recept i JSON fil
 
 / Redirectar till /getform som visar ett html forml�r d�r man 	 kan skicka in recept till json

/change/:id/:receptnamn/:rating - �ndrar ett recept via URL, beh�ver ID.

 /list f�r att se listan med recept

 /delete/:id f�r att ta bort recept fr�n listan

 /add/:receptnamn/:link/:rating f�r att l�gga till ett recept i listan