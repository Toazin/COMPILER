

var input = ["class", "program", "{", "program", "(", ")", "{", "flip", "}", "}"];
var idx = 0;
var max = input.length;
var tokens = ["program", "{", "}", "void", "if", "while", "iterate", "flip", "getCard", 
            "putCard", "else", "isRed", "(", ")", "isBlack", "isHeart", "isClubs", "isDiamond", "isSpades", 
            "isNotRed", "isNotBlack", "isNotHeart", "isNotClubs", "isNotDiamond", "isNotSpades", "<", ">", 
            "<=", ">=", "==", "!=", "VALUE", "class", "isEmpty", "isNotEmpty"];
//Simbolos
//operadores
//Palabras reservadas
var textArray = [];

//<program> ::= "class" "program" "{" <functions> <main function> "}"
function program() {
  if ( exigir("class") ) {
	  if ( exigir("program") ) {
	    if ( exigir("{") ) {
  		  functions();
  		  main_function();
  		  if ( !exigir("}") ) {
		      alert("Error")
		    }
	    }
  	  else {
	      alert();
	    }
	  }
	  else {
	    alert();
	  }
  }
  else {
     alert();
  }
}


//<functions> ::= <function> <functions alpha> | LAMBDA
function functions(){
	if( verificar( "void")) {
		function_();
		functions_alpha();
	}
}

//<functions alpha>  ::= <function> <functions alpha> | LAMBDA
function functions_alpha() {
  if ( verificar( "void" ) ) {
	  function_();
	  functions_alpha();
  }
}


//<main function> ::= "program" "(" ")" "{" <body> "}"
function main_function(){
  if(exigir("program")){
    if(exigir("(")){
      if(exigir(")")){
        if(exigir("{")){
          body();
          if(!exigir("}")){
            //Error falta }
          }
        }else{
          //falta {
        }
      }else{
        //Falta )
      }
    }else{
      //Falta (
    }
    
  }else{
    //Falta "Program"
  }
}

//<function> := "void" <name function> "("   ")" "{" <body> "}"
function function_() { 
  if ( exigir( "void" ) ) {
	name_Of_Function();
	if ( exigir( "(" ) ) {
	  if ( exigir ( ")" ) ) {
	    if ( exigir ( "{"  ) ) {
	      body(); 
	      if ( !exigir( "}" ) ) {
		    alert();
		  }
		} else {
		  alert();
		}
	  } else {
	    alert();
	  }
	} else {
	  alert();
	}
  } else {
    alert();
  }
}

//<body> ::= <expression> <body alpha>

function body(){
  expression();
  body_alfa();
}

//<body alpha> ::= <expression> <body alpha> | LAMBDA
function body_alfa(){
  if(verificar("while") || verificar("if") || verificar("iterate") || 
    verificar("flip") || verificar("getCard") || verificar("putCard") || 
    isCustomFunction()){
    // tengo qe revisar que no este en el arbol
    //Este último revisa que sea una customer function: Validadndo que no sea una palabra reservada "while", "iterate", etc...
    expression();
    body_alfa();
  }
}

//Helper function that returns true if it's a customer function
function isCustomFunction(){
  return  palabras_reservadas.includes(textArray[idx]);
}

//<expression> ::= <call function> |
//  <if expression> |
//  <while expression> |
//  <iterate expression>
function expression(){
  if(verificar("if")){
    if_expression();
  }
  else if(verificar("while")){
    while_expression();
  }
  else if(verificar("iterate")){
    iterate_expression();
  }
  else{
    call_Function();
  }
}

//<call function> ::= <name of function>
function call_Function(){
  name_Of_Function();
}



//<name of function> ::= <official function> | <customer function>
function name_Of_Function(){
  if(verificar("flip") || verificar("getCard") || verificar("putCard") ){
    official_Function();
  }else{
    customer_Function();
  }
}

//<official function> ::=
//    "flip" |
//    "getCard" "(" <number of deck> ")" |
//    "putCard" "(" <number of deck> ")"

function official_Function(){
  if(verificar("flip") ){
    
  }
  if( exigir("getCard") || exigir("putCard")){
    if ( exigir( "(" ) ) {
      if(exigir( number() )){
	      if ( exigir ( ")" ) ) {
        }
      }
    }
  }
}
//<customer function> ::= is a string with only letters that was defined in a <function> previously. QUe no sea palabra reservada.
function customer_Function(){
  
    if(isCustomFunction()){
      idx++;
    }
  
}

//<number of deck> ::=  is a number between 0 to 52 ( inclusive )
function number_of_deck(){
  if(Number.isInteger(textArray[idx])){
    if(textArray[idx] < 0 || textArray[idx] > 52){
      //Error! no esta en el rango
    }
    idx++;
  }
}

//<if expression> ::= "if" "(" <conditional> ")" "{" <body> "}"  <elseif>
function if_expression(){
  if(exigir("if")){
    //codigointermedio[i++] = 10; --> Aumentar i++;
    if(exigir("(")){
      conditional();
      //codigointermedio[i] = 255;
      if(exigir(")")){
        //codigointermedio[i++] = 20;
        //stack.push(i++);
        //codigointermedio[i++] = x; --> a donde voy a brincar :O
        // Se agrega a un STACK para saber donde estamos ! y quitamos uno por uno por la ulima.
        if(exigir("{")){
          body();
          if(exigir("}")){
            if(verificar("else")){
              else_if();
            }
          }else{
            //NO tiene }
          }
        }else{
          //No tiene {
        }
      }else{
        //no tiene )
      }
    }else{
      //No tiene "("
    }
  }else{
    //No tiene un IF D:.. raro
  }
}

//<else expression> ::= "else" "{" <body> "}" | LAMBDA
function else_if(){
  if(verificar("else")){
    if(exigir("else")){
      if(exigir("{")){
        //codigointermedio[i++] = 20;
        //x = stack.pop()
        //codigointermedio[x] = i + 1;
        //stack.push(i++);
        body();
        if(!exigir("}")){
          
        }
        //codigointermedio[stack.pop()] = i;  --> ya esta en el body.. :O
      }else{
        //No tiene {
      }
    }else{
      //NO tiene else
    }
  }
}

//<while expression> ::= "while" "(" <conditional> ")" "{" <body> "}"
function while_expression(){
  if(exigir("while")){
    if(exigir("(")){
      conditional();
      if(exigir(")")){
        if(exigir("{")){
          body();
          if(exigir("}")){
            
          } else{
            //no tiene }
            }
        } else{
          //no tiene {
          }
      } else{
        //no tiene )
        }
    } else{
      //no tiene (
      }
  } else{
    //no tiene while
    }
}

//<iterate expression> ::= "iterate" "(" <number> ")" "{" <body> "}"
function iterate_expression(){
  if(exigir("iterate")){
    if(exigir("(")){
      number();
      if(exigir(")")){
        if(exigir("{")){
          
        }
        else{
          //ERROR, "{" expected.
        }
      }
      else{
        //ERROR, ")" expected.
      }
    }
    else{
      //ERROR, "(" expected.
    }
  }
  else{
    //ERROR, "iterate" expected.
  }
}

//<conditional> ::= <card simple condition> | <card composed condition> | <deck simple condition>
function conditional(){
  if(exigir("card_simple_condition") || exigir("card_composed_condition") || exigir("deck_simple_condition")){
    
  }
}

//<card simple condition> ::=
//  "isRed"
//  | "isBlack"
//  | "isHeart"
//  | "isClubs"
//  | "isDiamond"
//  | "isSpades"
//  | "isNotRed"
//  | "isNotBlack"
//  | "isNotHeart"
//  | "isNotClubs"
//  | "isNotDiamond"
//  | "isNotSpades"
function card_simple_condition(){
  if(!exigir("isRed") || !exigir("isBlack") || !exigir("isHeart") || !exigir("isClubs") || 
    !exigir("isDiamond") || !exigir("isSpades") || !exigir("isNotRed") || !exigir("isNotBlack") ||
    !exigir("isNotHeart") || !exigir("isNotClubs") || !exigir("isNotDiamond") || !exigir("isNotSpades")){
    //Error no es ninguna de las palabras reservadas para simple condition.
  }
}

//<card composed condition> ::= "VALUE" <operator> <number>
function card_composed_condition(){
  if(exigir("VALUE")){
    operator();
    number();
  }
  else{
    //ERROR, "VALUE" expected.
  }
}


//<number> ::= is a natural number between 1 - 13
function number(){
  //textArray[idx]''
  var idx = 0;
  if(Number.isInteger(textArray[idx])){
    if(textArray[idx] < 0 || textArray[idx] > 13){
      //Error! no esta en el rango
      alert();
    }
    idx++;
    return idx;
  }
}

//<operator> ::=
//    "<"
//    | ">"
//    | "<="
//    | ">="
//    | "=="
//    | "!="

function operator(){
  
  if(exigir("<") || exigir(">") || exigir("<=") || exigir(">=")|| exigir("==") || exigir("!=")){
      
  }
  else{
    alert("No es operador valido");
  }
}



//<deck simple condition> ::= isEmpty "(" <number of deck> ")" | isNotEmpty "(" <number of deck> ")"
function deck_simple_condition(){
  if(exigir("isEmpty")){
    if(exigir("(")){
      number_of_deck();
      if(!exigir(")")){
        //ERROR, ")" expected.
      }
    }
    else{
      //ERROR, "(" expected.
    }
  }
  else if(exigir("isNotEmpty")){
    if(exigir("(")){
      number_of_deck();
      if(!exigir(")")){
        //ERROR, ")" expected.
      }
    }
  }
  else{
    //ERROR, "isEmpty" or "isNotEmpty" expected.
  }
}


//Exigir
function exigir(token){
  /*
    if(index <= max){
        if(token === input[index]){
            index++;
            return true;
        }
        else{
            index++;
            return false;
        }
    }
    else{

    }*/
    var res = textArray[idx] == data;
    idx++;
    return res;
}

//Verificar
function verificar(data){
	//return input[index] == data; 	
	return textArray[idx] == data;
}  

/*
TOKENS

hacer arrelgo con estos!

checa 3 cosas
1. Que este en el arreglo
2. Que sea Numero
3. QUe sea un String de PUROS caracteres

class
program
{
}
void
(
)
if
while
iterate
flip
getCard
putCard
else
isRed
isBlack
isHeart
isClubs
isDiamond
isSpades
isNotRed
isNotBlack
isNotHeart
isNotClubs
isNotDiamond
isNotSpades

<
>
<=
>=
==
!=
VALUE */


/*
CODIGO INTERMEDIO
IF          --> 10
WHILE       --> 20
ITERATE     --> 30
JMP         --> 100
CALL         --> 110
VALUE       --> 280
RET         --> 500
EXIT         --> 600

official_function
flip          301
getCard       302
putCard       303

card_simple_condition
isRed         201
isBlack       202
isHeart       203
isClubs       204
isDiamond     205
isSpades      206
isNotRed      207
isNotBlack    208
isNotHeart    209
isNotClubs    210
isNotDiamond  211
isNotSpades   212


deck_simple_condition
isEmpty       250
isNotEmpty    251

operator
<             281
>             282
<=            283
>=            284
==            285
!=            286
*/    

