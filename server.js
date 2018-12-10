console.log("server online");

var express = require('express'); // Importerar express modul
var fs = require('fs'); // Importerar File System module som man använder för att läsa/skriva/ändra eller ta bort filer.
var app = express(); // Skapar en ny express instans och gör en variabel som vi kommer använda för att använda express
const bodyParser = require('body-parser'); // Importerar bodyparser som gör att vi kan hämta data som kommer från forms
app.listen(3000, listening); // Sätter vilken port den ska och gör en connection till den, och kör functionen listening som console loggar att den startat
function listening(){
  console.log("listening . . .");
}

app.set('view engine', 'pug'); // ställer in vilken template engine man ska använda
app.use(bodyParser.urlencoded({extended: true})); // Används för kunna göra URL till object


/** Hämtar nya variablar från URL och skriver in dom in det i json */
app.get('/change/:id/:receptnamn/:rating', function(req, res){

  var receptId = req.params.id; // hämtar id från url och sparar det
  var receptnamn = req.params.receptnamn; // hämtar receptnamn från url och sparar det
  var rating = parseInt(req.params.rating); // hämtar rating från url och sparar det, kör parseint för att få tillbaka siffra
 
  var rawdata = fs.readFileSync('list.json'); // läser in JSON
  var list = JSON.parse(rawdata); // Kör JSON.parse() för att göra datan till JS object


  /** Funktion för att hitta recept med samma id som url för att sedan skriva över nya informationen */
 function changeRecept(receptId){
    // Loopa igenom trailarna och hitta den som matchar ID
    for (var i = 0; i < list.recept.length; i++) {
      if(list.recept[i].id == receptId){
        //Ta bort objectet
        list.recept[i].rating = rating,
        list.recept[i].receptnamn = receptnamn;
    
       }
      }
    }
  
 changeRecept(receptId); 

  let data = JSON.stringify(list, null, 1); // Gör tillbaka JS object till JSON string
  fs.writeFileSync('list.json', data); // Skriver in i JSON fil

  res.send("Du har ändrat ett" + receptnamn + "recept. </br><a href='/list/'>Se lista </a>  "); // skriver ut på sidan att receptnamnet har blivit ändrat
});

/** Funktion för att skriva ut JSON filen / visa listan */
app.get('/list', function(req, res){
  var rawdata = fs.readFileSync('list.json');
  var list = JSON.parse(rawdata);
  res.send(list)
});

/** Funktion för att ta bort recept från listan */
app.get('/delete/:id', function(req, res){
  //Hämtar in ID från URL
  var receptId = req.params.id;

  var rawdata = fs.readFileSync('list.json');
  var list = JSON.parse(rawdata);

  // Funktionen för att ta bort recept
  var removeRecept = function(id){
    // Loopa igenom listan och ta bort om IDt från URL finns i listan
    for (var i = 0; i < list.recept.length; i++) {
      if(list.recept[i].id == id){
        //Ta bort objectet
        list.recept.splice(i,1);
      }
    }
  }
  
  removeRecept(receptId);

  let data = JSON.stringify(list, null, 1);
  fs.writeFileSync('list.json', data);

  res.send("Du har tagit bort från listan. </br><a href='/list/'>Se lista </a>  ");

});

/** Funktion för att lägga till recept i listan genom URL */

app.get('/add/:receptnamn/:link/:rating', function(req, res){ 

 /** hämta in variablarna från URL */
    var receptnamn = req.params.receptnamn;
    var link = req.params.link;
    var rating = req.params.rating;

    /** Hämta och gör om JSON till javascript object */
    var rawdata = fs.readFileSync('list.json');
    var lista = JSON.parse(rawdata);


  /** Pushar in de nya värderna in i listan och lägger till ett random ID med Math.Random() funktion */
    lista.recept.push({
      receptnamn:receptnamn,
      link:link,
      rating:parseInt(rating),
      id: Math.random().toString(36).substr(2, 16)
    });

    let data = JSON.stringify(lista, null, 1);
    fs.writeFileSync('list.json', data);
  
    res.send("Du har lagt till " + receptnamn + " i listan. </br><a href='/list/'>Se lista </a>  ");
  
  });
/** Redirectar första sidan till /getform */
  app.get('/', function(request, response){
    return response.redirect('getform')
 });
/** Funktion för att hämta formulär från PUG fil */
 app.get('/getform', function(request, response){
  return response.render('get_form')
});


/** Hämtar värderna från html formuläret i get_form.pug och lägger till det i json filen */
app.post('/addToList', function(req, res){
  
  /** Hämtar värden från formuläret och sparar dom som variablar */
  var name = req.body.name;
  var link = req.body.link;
  var rating = req.body.rating;

  var rawdata = fs.readFileSync('list.json');
  var list = JSON.parse(rawdata);

/** Pushar in dom i listan  */
  list.recept.push({  
    receptnamn:name,
    link:link,
    rating:parseInt(rating),
  });

  /** Gör om det från JS object till JSON o skriver in det*/
  let data = JSON.stringify(list, null, 1);
  fs.writeFileSync('list.json', data);
  res.send("Du har lagt till " + name + " i listan. </br><a href='/list/'>Se lista </a>  ");

});

