var finMot = ' ';

/* Constructor */

function PatriciaTries(content,sousArbreGauche,sousArbreDroit)
{
	this.content = content;
	this.sousArbreGauche = sousArbreGauche;
	this.sousArbreDroit = sousArbreDroit;
}

/* Les primitives de base */

/* La fonction estVide permet de déterminer si l'arbre en question est vide ou pas */

PatriciaTries.prototype.estVide = function () {
	return (((this.content == undefined) ||
			 (this.content == '')
			) &&
			(this.estFeuille())
		   );
}

/* La fonction estFeuille permet de déterminer si c'est une feuille.
   Par définition une feuille est un noeud qui n'ont aucun des deux sous arbres
   La fonction retourne true si c'est une feuille et non sinon.
*/

PatriciaTries.prototype.estFeuille = function ()
{
	return ((this.sousArbreGauche == undefined) || (this.sousArbreGauche == null) && 
			(this.sousArbreDroit == undefined) || (this.sousArbreDroit == null));
}

/* estPrefixe peret de controler si le contenu du noeud est un préfixe du mot passé en paramètre 
   retourne true si le contenu du noeud est un préfixe du mot
            false sinon
*/

PatriciaTries.prototype.estPrefixe = function (mot)
{
	if (mot.indexOf(this.content) == 0)
		return true;
	else
		return false;
}

/* La fonction rechercher permet de recherche un mot dans un arbre.
   Elle retourne true si le mot existe dans l'arbre
                 false sinon
*/

PatriciaTries.prototype.rechercher = function (mot) {

	/* On contrôle d'abord si le mot est vide et aussi l'arbre est une feuille.
	   Pour regarder si le mot est vide on regarde si il est égal à ' '
	   parce que c'est le caratère choisi pour définir les fin des mots */
	if (this.estFeuille() && ((mot === finMot) || (mot === '')))
	{
		/* Si c'est le cas on retourne true */
		return true;
	}
	else
	{
		/* Si ce n'est pas le cas 
		   On contrôle si le mot est vide OU l'arbre est une feuille */
		if (this.estFeuille() || ((mot === '') || (mot === finMot))) 
		{
			/* Si c'est le cas on retourne false */
			return false;		
		}
		else
		{
			/* Si ce n'est pas le cas 
			   on contrôle si le contenu du noeud est un préfixe du mot passé en paramètre
			*/

			if (this.estPrefixe(mot))
			{
				/* Si le contenu du noeud est un préfixe du mot passé en paramètres
				   Alors on applique le même fonction pour les sous arbres de l'arbre en question 
				   On regarde d'abord pour le sous arbres gauches
				*/
				return this.getSousArbreGauche.rechercher(mot.substring(this.content.length,mot.length)) ||
					   this.getSousArbreDroit.rechercher(mot.substring(this.content.length,mot.length));
			}	
			else
			{
				/* Si ce n'est pas le cas on retourne false */
				return false;
				
			}
		}
		
	}
}

/* La fonction String.prototype.comparer permet de comparer deux mots et retourne l'index à partir de lequelle les deux mots sont différents
   Exemple : "romane".comparer("romanus") retourne 4 
   			 "romane".comparer("salsa") retourne -1 
*/

String.prototype.comparer = function (mot) {

	/* Pour pouvoir les comparer le plus facilement on les transforme sous forme de tableau */
	var ttable = this.split("");
	var mtable = mot.split("");

	/* On détermine la taille le plus petit entre ces deux tableaux */
	var minLength = Math.min(ttable.length,mtable.length);

	/* Le variable res est la variable qui sera retourné à la fin de la fonction */
	res = -1;

	/* On parrcourt les tableaux */
	for (var i=0;i<minLength;i++)
	{
		if (ttable[i] == mtable[i])
		{
			res = i
		}
		else
		{
			break;
		}	
	}
	return res;
}

/* 
	La fonction hauteur renvoie l'hauteur de l'arbre en question
 	Si c'est une feuille elle renvoie 1
 	Si c'est un arbre vide elle renvoie 0
*/

PatriciaTries.prototype.hauteur = function () 
 {
 	if (this.estFeuille() == true)
 	{
 		console.log("C'est une feuille\n");
 		return 1;
 	}
 	else
 	{
 		if (this.estVide() == true)
 		{
 			console.log("C'est un arbre vide");
 			return 0;
 		}
 		else
 		{
 			console.log("Ce n'est ni une feuille ni un arbre vide");
 			return (Math.max(this.getSousArbreGauche().hauteur(),this.getSousArbreDroit().hauteur())+1);
 		}
 	}
 }

/* La fonction insertion(mot) permet d'insérer un mot dans l'arbre en question */

PatriciaTries.prototype.insertion = function (mot) {
	console.log('Le mot à insérer est '+mot+'\n');
	/* On regarde d'abord si l'arbre en question est vide */
	if (this.estVide() == true)
	{
		/* Si il est vide alors on crée une feuille dont le contenu est le mot passé en paramètre */
		this.content = mot;
		this.sousArbreGauche = new PatriciaTries(finMot,
												 null,
												 null);
		this.sousArbreDroit = null;
	}
	else
	{
		/* 
			Si l'arbre n'est pas vide 
			On contrôle d'abord si le contenu du noeud est un préfixe du mot à ajouter
		*/
		if (this.estPrefixe(mot))
		{
			/* 
				Si le contenu du noeud actuel est un préfixe du mot à ajouter  
				On détermine d'abord le mot qui reste à ajouter (on enlève le préfixe)
 			*/
			var reste = mot.substring(this.content.length,mot.length);
			/* 
			   Et on insère le reste de manière suivante :
			   S'il y a un préfixe ou non différence entre le reste et le contenu un des sous arbres on l'insère au sous-arbre en question
			   S'il n'y a aucun point en commun on insère au sous-arbre dont l'hauteur est minimum
			*/
			if ((this.sousArbreGauche != null) && (this.sousArbreGauche.estVide() == false) && (this.sousArbreGauche.content.comparer(reste) != -1))
			{
				this.sousArbreGauche.insertion(reste);
			}
			else
			{
				if ((this.sousArbreDroit != null) && (this.sousArbreDroit.estVide() == false) && (this.sousArbreDroit.content.comparer(reste) != -1))
				{
					this.sousArbreDroit.insertion(reste);
				}
				else
				{
					if ((this.sousArbreGauche != null) && (this.sousArbreDroit != null) && (this.sousArbreGauche.hauteur() <= this.sousArbreDroit.hauteur()))
					{
						this.sousArbreGauche.insertion(reste);
					}
					else
					{
						if (this.sousArbreGauche == null)
						{
							this.sousArbreGauche = new PatriciaTries(reste,
																	 new PatriciaTries(finMot,null,null),
																	 null);
						}
						else
						{
							if (this.sousArbreDroit == null)
							{
								this.sousArbreDroit = new PatriciaTries(reste,
																	 new PatriciaTries(finMot,null,null),
																	 null);
							}
							else
							{
								this.sousArbreDroit.insertion(reste);
							}
						}
					}
				}
			}
			
		}
		else
		{
			/* 
				Si le contenu du noeud actul n'est pas un préfixe du mot à ajouter 
				Alors d'abord on compare le mot et le contenu du noeud à ajouter
			*/
			if (this.content.comparer(mot) != -1)
			{
				/*
					 Si le contenu du noeud actuel n'est pas complétement différent du mot à ajouter
					 Alors on coupe le contenu du noeud actuel par l'index donné par la fonction comparer et 
					 s'il s'agit d'une feuille on ajoute le reste du mot du cotenu au sous arbre gauche et le reste par le mot à ajouter à l'abre droit  	 
				*/
				var indexComp = this.content.comparer(mot);
				if (this.estFeuille() == true)
				{
					this.sousArbreGauche = new PatriciaTries(this.content.substring(indexComp+1,this.content.length),
															 new PatriciaTries(finMot,null,null),
															 null);
					this.sousArbreDroit = new PatriciaTries(mot.substring(indexComp+1,mot.length), 
															new PatriciaTries(finMot,null,null),
															null);
				}
				else
				{
					/* 
						S'il n'est pas une feuille alors on couple le contenu du noeud actuel par l'index en commun et on crée un nouveau arbre dont
						le contenu va être le reste du contenu actuel et les branches vont être les branches actuelles
					*/
					var newArbre = new PatriciaTries(this.content.substring(indexComp+1,this.content.length),
															 this.sousArbreGauche,
															 this.sousArbreDroit);
					this.sousArbreGauche = newArbre;
					this.sousArbreDroit = new PatriciaTries(mot.substring(indexComp+1,mot.length),
					 										new PatriciaTries(finMot,null,null),
															null); 
				}
				/* Dans tous les cas on remplace le contenu du noeud actuel par le mot en commun des deux mots */
				var newC = this.content.substring(0,indexComp+1);
				this.content = newC;
			}
			else
			{
				/*
					Si le contenu du noeud actuel est complétement différent du mot à ajouter
					Alors on crée un tout nouvel arbre avec le contenu vide et les branches sont
					l'arbre actuel et le mot en tant qu'une feuille
				*/
				var newArbre = new PatriciaTries('',
												this,
												new PatriciaTries(mot, 
																  new PatriciaTries(finMot,null,null),
															      null)
												);
			}			
		}
	}
	
}
/* Le fonction represent permet de représenter l'arbre sous forme des sorties en console */

PatriciaTries.prototype.represent = function () {
	if (this.estVide() == true)
	{
		console.log("Fin d'affichage\n");
	}
	else
	{
		console.log('Le contenu: '+this.content+"\n"); 
		if (this.estFeuille() == true)
		{
			console.log("Fin d'affichage\n");
		}
		else
		{
			console.log("L'arbre gauche : \n");
			this.getSousArbreGauche().represent();
			console.log("L'arbre droit : \n");
			this.getSousArbreDroit().represent();
		}
	}
}

/* Les getters */

/* La fonction getContent retourne l'attribut contenu de l'objet */
PatriciaTries.prototype.getContent = function () {
	return this.content;
}

/* La fonction getSousArbreGauche retourne le sous arbre gauche du noeud en question */
PatriciaTries.prototype.getSousArbreGauche = function () {
	return this.sousArbreGauche;
}

/* getSousArbreDroit retourne le sous arbre droit du noeud en question */
PatriciaTries.prototype.getSousArbreDroit = function () {
	return this.sousArbreDroit;
}



module.exports = PatriciaTries;