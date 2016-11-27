var PatriciaTries = require('./structures/PatriciaTries');

var testArbreVide = new PatriciaTries('');

console.log("Le contenu de l'arbre avant l'insertion est "+testArbreVide.content);

console.log("L'insertion du mot Romane dans l'arbre ")
testArbreVide.insertion("Romane");

console.log("L'insertion du mot Romanes dans l'arbre ")
testArbreVide.insertion("Romanes");

console.log("L'insertion du mot Romanus dans l'arbre ")
testArbreVide.insertion("Romanus");

console.log("L'insertion du mot Romulus dans l'arbre ")
testArbreVide.insertion("Romulus");

console.log("L'insertion du mot Rubens dans l'arbre ")
testArbreVide.insertion("Rubens");

console.log("L'insertion du mot Ruber dans l'arbre ")
testArbreVide.insertion("Ruber");

console.log("L'insertion du mot Rubicon dans l'arbre ")
testArbreVide.insertion("Rubicon");

console.log("L'insertion du mot Rubicundus dans l'arbre ")
testArbreVide.insertion("Rubicundus");

console.log('Hauteur de l\'arbre est '+testArbreVide.hauteur());

testArbreVide.represent();
/*
console.log("Le contenu de l'arbre est "+testArbreVide.content+"\n");
console.log("Le contenu de sous arbre gauche de l'arbre est "+testArbreVide.getSousArbreGauche().content+"\n");
console.log("Le contenu de sous arbre gauche de sous arbre gauche de l'arbre est "+testArbreVide.getSousArbreGauche().getSousArbreGauche().content+"\n");
console.log("Le contenu de sous arbre gauche de sous arbre gauche de sous arbre gauche de l'arbre est "+testArbreVide.getSousArbreGauche().getSousArbreGauche().getSousArbreGauche().content+"\n");
*/
/*
	console.log("Le contenu de l'arbre après l'insertion est "+testArbreVide.content+
			"\nLe contenu de son sous arbre gauche après l'insertion est "+testArbreVide.getSousArbreGauche().content+
			"\nLe contenu de sous arbre gauche de son sous arbre gauche après l'insertion est "+testArbreVide.getSousArbreGauche().getSousArbreGauche().content+
			"\nLe contenu de sous arbre droit de son sous arbre gauche après l'insertion est "+testArbreVide.getSousArbreGauche().getSousArbreDroit().content+
			"\nLe contenu de son sous arbre droit après l'insertion est "+testArbreVide.getSousArbreDroit().content);
*/

//console.log('La comparaison entre les mots Romane et Salsa donne '+('Romane'.comparer('Salsa')));