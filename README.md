# projektmapp

 En egen api som med hjälp av express och fs/body-parser moduler kan skriva och lagra recept i JSON fil
 
 / Redirectar till /getform som visar ett html formlär där man 	 kan skicka in recept till json

/change/:id/:receptnamn/:rating - Ändrar ett recept via URL, behöver ID.

 /list för att se listan med recept

 /delete/:id för att ta bort recept från listan

 /add/:receptnamn/:link/:rating för att lägga till ett recept i listan