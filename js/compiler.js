const IF = 10;
const WHILE = 20;
const ITERATE = 30;
const JMP = 100;
const CALL = 110;
const VALUE = 280;
const RET = 500;
const EXIT = 600;

const FLIP = 301;
const GETCARD = 302;
const PUTCARD = 303;

const ISRED = 201;
const ISBLACK = 202;
const ISHEART = 203;
const ISCLUBS = 204;
const ISDIAMOND = 205;
const ISSPADES = 206;
const ISNOTRED = 207;
const ISNOTBLACK = 208;
const ISNOTHEART = 209;
const ISNOTCLUBS = 210;
const ISNOTDIAMOND = 211;
const ISNOTSPADES = 212;

const ISEMPTY = 250;
const ISNOTEMPTY = 251;

const LESSTHAN = 281;
const GREATERTHAN = 282;
const LESSOREQUAL = 283;
const GREATEROREQUAL = 284;
const EQUAL = 285;
const NOTEQUAL = 286;

var NEXTFUNCTION = -33;



//Deck Variables
const delayOperation = 100;
var deck = Deck();
var prefix = Deck.prefix;
var transform = prefix('transform');
var translate = Deck.translate;
var stop = false;
var myDecks = [];
var selectedDeck = 0;
var selectedCard;
var startXPosition = -350 ;
var startYPosition = 350;
var showXPosition = -250;
var showYPosition = 350;

//Compiler Variables
var palabras_reservadas=["program", "{", "}", "void", "if", "while", "iterate", "flip",
            "getCard", "putCard", "else", "isRed", "(", ")", "isBlack",
            "isHeart", "isClubs", "isDiamond", "isSpades", "isNotRed",
            "isNotBlack", "isNotHeart", "isNotClubs", "isNotDiamond",
            "isNotSpades", "<", ">", "<=", ">=", "==", "!=", "VALUE", "class"];
var tt = []; //Token tree generated at lexicografic
var tti = 0;
var lexic = {customFn:[],
            errors:[]};
var ci = []; //intermediate Code generated at sintactic
var cci = 0;
var ci_stack = [];
var st = [];  // sintactic tree
var ciie = 0; //codigo itermedio index execution
var cie_stack = []; //codigo intermedio execution Stack


//Compiler Methods
function mainCompiler(){
  if(!cm.getValue()) return;
  clean();

  lexicografic();

  sintactic();

  codeExecution();
}

//Initialize deck
function initDeck () {
  var startX = -20;
  var deltaX = 70;
  var startY = -300;
  var deltaY = 120;
  var row = 13;
  var col = 4;
  var colIndex = 1;
  var $container = document.getElementById('myTable')
  //selectedCard = undefined;
  deck.mount($container);
  deck.shuffle();
  deck.cards.forEach(function (card, i) {
    //Inicio Decks:
    //console.log(card);
    myDecks[i] = new subDeck();
    card.setSide('back');
    if((i % row) == 0) colIndex++;
    var relPosX = startX + (i% row)*deltaX;
    var relPosY = startY + (colIndex)*deltaY;
    //console.log("Position of DECK: " + i + " : " + relPosX + ", " + relPosY);
    //Define Posicion del Deck
    myDecks[i].setPosition(relPosX, relPosY);
    //Agrega al deck 0 la carta
    myDecks[0].push(card);
    card.animateTo({
        delay: 500 + i * 5, // wait 1 second + i * 2 ms
        duration: 1000,
		    ease: 'quartOut',
        x: startXPosition,
        y: startYPosition
    })
  });
  //console.log(myDecks[0].stack);
}


//Lexicografic
function lexicografic(){
  tt = cm.getValue();
  tt = tt.replaceAll("("," ( ").replaceAll(")"," ) ").replaceAll("}"," } ").replaceAll("{"," { ").replaceAll(/(?:\r\n|\r|\n|\t)/g," ").split(" ").clean("");
  console.log("TOKEN TREE GENERATED: ", tt);
  for (var i = 0; i < tt.length; i++) {
    //entra si todos son False
    if (!(palabras_reservadas.includes(tt[i]) || !pureString(tt[i]) || isNumber(tt[i]))) {
        lexic.errors.push(tt[i]);
        console.error("Invalid Token: " + tt[i] );
        continue;
    }

    if(!palabras_reservadas.includes(tt[i]) && !isNumber(tt[i]) && pureString(tt[i])){
        //Agregamelo a un arreglo de CUstomer Functions.
        lexic.customFn.push(tt[i]);
    }
  }

  obtainErrors();
}

function obtainErrors(){
  if(lexic.errors.length > 0){
    var errText = "";
    for (var i = 0; i < lexic.errors.length; i++) {
      errText = errText + lexic.errors[i] + "\n";
    }
    alert("Invalid Tokens detected: " + errText);
    throw new Error("Invalid Tokens detected: " + errText);
    return;
  }
}


//Sintactic
function sintactic(){
  if(verify("class")){
    program();
  }

}

function program(){
  console.log("Program");
  ci[0] = JMP;
  demand("class");
  demand("program");
  demand("{");
    functions();
    main_function();
    ci[cii] = EXIT;
  demand("}");
  console.log("ST: ", st);
  console.log("CI", ci);
  var imprime = "";
  for(var i = 0; i<ci.length; i++){
    imprime = imprime + "," + ci[i];
  }
  console.log("IMPRIME:", imprime);
  console.log("STAC", ci_stack);
  console.log("IDX_CI", cii);
  return;
}

function main_function () {
  console.log("main_function");
  if(verify("program")){
    demand("program");
    demand("(");
    demand(")");
    demand("{");
      ci[1] = cii;
      body();
    demand("}");
  }
}

function functions() {
  console.log("functions");
  if(verify("void")){
    function_();
    functions_alpha();
  };
  return;
}

function functions_alpha () {
  console.log("functions_alpha");
  if(verify("void")){
    function_();
    functions_alpha();
  };
  return;
}

function function_ () {
  console.log("function_");
  demand("void");
  if(palabras_reservadas.includes(tt[tti])){
    var msg = "Function is a reserverd keyword";
    alert(msg);
    throw new Erro(msg);
    //st.push(tt[tti]);// = cii;
  }

  ci[cii] = NEXTFUNCTION--;
  console.log("AGREGE A SINTACTIC TREE: ",tt[tti],  cii);
  st[tt[tti++]] = cii;
  cii++;

  name_of_function();
  demand("(");
  demand(")");
  demand("{");
  body();
  ci[cii++] = RET;
  demand("}")
 return;
}

function name_of_function () {
  console.log("name_of_function");
  if(verify("flip") || verify("getCard") || verify("putCard") ){
    official_function();
  }else{
    console.log("tt[tti]: ", tt[tti]);
    customer_function();
  }

}

function body () {
  console.log("Body");
  expression();
  body_alfa();
}

function body_alfa () {
  console.log("body_alfa");
  if(verify("while") || verify("if") || verify("iterate") ||
    verify("flip") || verify("getCard") || verify("putCard") ||
    !palabras_reservadas.includes(tt[tti])){
    expression();
    body_alfa();
  }
}

function expression () {
  console.log("Expression");
  if(verify("if")){
    if_expression();
  }
  else if(verify("while")){
    while_expression();
  }
  else if(verify("iterate")){
    iterate_expression();
  }
  else{
    call_function();
  }

}

  function official_function () {
      console.log("Official_function");
      if(verify("flip")){
        demand("flip");
        ci[cii++] = FLIP;
      }else if(verify("getCard")){
        demand("getCard");
        ci[cii++] = GETCARD;
        demand("(");
        number_of_deck();
        demand(")");
      }else if(verify("putCard")){
        demand("putCard");
        ci[cii++] = PUTCARD;
        demand("(");
        number_of_deck();
        demand(")");
      }
  }

function customer_function () {
  console.log("Customer_function");
  if(isCustomFunction()){
    ci[cii++] = CALL;
    ci[cii++] = st[tt[tti++]];
  }
}

function if_expression () {
  console.log("if_expression");
  demand("if");
  ci[cii++] = IF;
  demand("(");
  conditional();
  ci[cii++] = JMP;
  demand(")");
  demand("{");
  ci_stack.push(cii++);
  body();
  demand("}");
  ci[cii++]=JMP;
  ci[ci_stack.pop()]=cii+1;

  ci_stack.push(cii++);
  if(verify("else")){
    demand("else");
    demand("{");
    body();
    demand("}");
  }
  ci[ci_stack.pop()] = cii;

}

/*
function else_if () {
  console.log("else_if");
  demand("else");
  demand("{");
  ci[ci_stack.pop()] = cii+2;
  ci[cii++] = JMP;
  ci_stack.push(cii++);
  body();
  demand("}");
  ci[ci_stack.pop()] = cii;
}
*/

function while_expression () {
  console.log("while");
  demand("while");
  ci_stack.push(cii);
  ci[cii++] = WHILE;
  demand("(");
  conditional();
  demand(")");
  demand("{");
  ci[cii++] = JMP;
  ci_stack.push(cii++);
  body();
  demand("}");
  //ci[cii++] = JMP;
  //ci[cii++] = cii;
  ci[cii++] = JMP;
  ci[ci_stack.pop()] = cii +1;
  ci[cii++] = ci_stack.pop();
}

function iterate_expression () {
  console.log("iterate_expresfmaision");
  demand("iterate");
  ci_stack.push(cii);
  ci[cii++] = ITERATE;
  demand("(");
  number();
  demand(")");
  demand("{");
  ci[cii++] = JMP;
  ci_stack.push(cii++);
  body();
  demand("}");
  ci[cii++]=JMP;
  ci[ci_stack.pop()] = cii + 1;
  ci[cii++] = ci_stack.pop();

}

function call_function () {
  console.log("call_function");
  name_of_function();
}

function number_of_deck () {
  console.log("number_of_deck");
  if(!isNaN(parseInt(tt[tti]))){
    tt[tti] = parseInt(tt[tti]);
    ci[cii++] = tt[tti];
  }else{
    return;
  }

  if(Number.isInteger(tt[tti])){
    if(tt[tti] < 0 || tt[tti] > 52){
      var msg = "El token: " + tt[tti] + " No es un numero en el rango de 1 a 52";
      alert(msg);
      throw new Error(msg)
    }
  }else{
    var msg = "El token: " + tt[tti]+ " No es un numero";
    alert(msg);
      throw new Error(msg);
  }
  tti++;
}

function conditional () {
  console.log("Conditional");
  if(verify("isRed") || verify("isBlack") || verify("isHeart") || verify("isClubs") ||
  verify("isDiamond") || verify("isSpades") || verify("isNotRed") || verify("isNotBlack") ||
  verify("isNotHeart") || verify("isNotClubs") || verify("isNotDiamond") ||
  verify("isNotSpades") || verify("isEmpty") || verify("VALUE") || verify("isNotEmpty")){

    if(verify("isRed") || verify("isBlack") || verify("isHeart") || verify("isClubs") ||
    verify("isDiamond") || verify("isSpades") || verify("isNotRed") || verify("isNotBlack") ||
    verify("isNotHeart") || verify("isNotClubs") || verify("isNotDiamond") || verify("isNotSpades")){
      card_simple_condition();
    }
    else if(verify("VALUE")){
      card_composed_condition();
    }
    else if(verify("isEmpty") || verify("isNotEmpty")){
      deck_simple_condition();
    }
  }else{
    var msg = "No es un condicional valido";
    alert(msg);
    throw new Error(msg);
  }
}

function card_simple_condition () {
    console.log("card_simple_condition");
    switch (tt[tti]){
      case "isRed":
        ci[cii++] = ISRED;
        demand("isRed");
        break;
      case "isBlack":
        ci[cii++] = ISBLACK;
        demand("isBlack");
        break;
      case "isHeart":
        ci[cii++] = ISHEART;
        demand("isHeart");
        break;
      case "isClubs":
        ci[cii++] = ISCLUBS;
        demand("isClubs");
        break;
      case "isDiamond":
        ci[cii++] = ISDIAMOND;
        demand("isDiamond");
        break;
      case "isSpades":
        ci[cii++] = ISSPADES;
        demand("isSpades");
        break;
      case "isNotRed":
        ci[cii++] = ISNOTRED;
        demand("isNotRed");
        break;
      case "isNotBlack":
        ci[cii++] = ISNOTBLACK;
        demand("isNotBlack");
        break;
      case "isNotHeart":
        ci[cii++] = ISNOTHEART;
        demand("isNotHeart");
        break;
      case "isNotClubs":
        ci[cii++] = ISNOTCLUBS;
        demand("isNotClubs");
        break;
      case "isNotDiamond":
        ci[cii++] = ISNOTDIAMOND;
        demand("isNotDiamond");
        break;
      case "isNotSpades":
        ci[cii++] = ISNOTSPADES;
        demand("isNotSpades");
        break;
    }
  }

function card_composed_condition () {
  console.log("card_composed_condition");
  demand("VALUE");
  ci[cii++] = VALUE;
  operator();
  number();
}

function deck_simple_condition () {
  console.log("deck_simple_condition");
    if(verify("isEmpty") || verify("isNotEmpty") ){
      if(verify("isEmpty")){
        demand("isEmpty");
        demand("(");
        ci[cii++] = ISEMPTY;
        number_of_deck();
        demand(")");
      }
      if(verify("isNotEmpty")){
        demand("isNotEmpty");
        demand("(");
        ci[cii++] = ISNOTEMPTY;
        number_of_deck();
        demand(")");
      }
    }else{
      var msg = "No es una deck_simple_condition";
      alert(msg);
      throw new Error(msg);
    }
  }

  function number () {
    console.log("number");
    if(!isNaN(parseInt(tt[tti]))){
      tt[tti] = parseInt(tt[tti]);
      ci[cii++] = tt[tti];
    }else{
      return;
    }
    console.log("NUMBER CI: ", ci);
    if(Number.isInteger(tt[tti])){
      if(tt[tti] < 0 || tt[tti] > 13){
        var msg = "El token: " + tt[tti] + " No es un numero en el rango de 1 a 13";
        alert(msg);
        throw new Error(msg)
      }
    }else{
      var msg = "El token: " + tt[tti] + " No es un numero";
      alert(msg);
        throw new Error(msg);
    }
    tti++;
  }

  function operator () {
    console.log("operator");
      if(verify("<") || verify(">") || verify("<=") ||
        verify(">=")|| verify("==") || verify("!=")){
        switch(tt[tti]){
          case "<":
            ci[cii++] = LESSTHAN;
            demand("<");
            break;
          case ">":
            ci[cii++] = GREATERTHAN;
            demand(">");
            break;
          case "<=":
            ci[cii++] = LESSOREQUAL;
            demand("<=");
            break;
          case ">=":
            ci[cii++] = GREATEROREQUAL;
            demand(">=");
            break;
          case "==":
            ci[cii++] = EQUAL;
            demand("==");
            break;
          case "!=":
            ci[cii++] = NOTEQUAL;
            demand("!=");
            break;
        }
      }else{
        var msg =tt[tti] + " No es un OPERADOR";
        alert(msg);
        throw new Error(msg);
        //console.error(tt[tti] + " No es un OPERADOR");
      }
  }
//CI Execution
function codeExecution_ () {
  console.log("CodeExecution ");

  while(ci[ciie] != EXIT){
    //setTimeout(function(){console.log("me espere 1.5")}, 1500);
    if(ciie > 55) throw new Error("no mames");
    console.log("Index " + ciie + " : " + ci[ciie]);
    switch (ci[ciie]) {
      case IF:
        console.log("IF");
        //Evalua condicion
        evaluateExpression();
        break;
      case WHILE:
        console.log("WHILE");
        //Evalua condicion
        evaluateExpression();
        break;
      case ITERATE:
        console.log("ITERATE");
        var iterateCant = ci[ciie+1];
        console.log("Cant to ITERATE: ", iterateCant);
        ci[ciie+1]--;
        if(iterateCant == 0){
          //Salete
          ciie +=1;
          console.log("SALTE: ", ciie);
        }else{
          //Continua
          ciie +=3;
          console.log("CONTINUA: ", ciie);
        }
        console.log("Brinco a: ", ciie);
        //Evalua condicion
        //evaluateExpression();
        break;
      case JMP:
        console.log("JMP");
        ciie = ci[ciie+1]-1;
        break;
      case CALL:
        console.log("CALL");
        cie_stack.push(ciie+1);
        console.log("STACK: ", cie_stack);
        ciie = ci[ciie+1]-1;
        break;
      case RET:
        console.log("RET");
        ciie = cie_stack.pop();
        console.log("STACK: ", cie_stack);
        break;
      case EXIT:
        console.log("EXIT");
        break;
      case FLIP:
        console.log("FLIP");
        isCardSelected();
        //console.log("SELECTED CARD", selectedCard);
        selectedCard.flip();
        break;
      case GETCARD:
        console.log("GETCARD");
        selectedDeck = ci[ciie + 1];
        var ln = myDecks[selectedDeck].length();
        console.log("DECK " + selectedDeck + " LENGT: " + ln);
        var msg = "Cannot getCard from empty Deck";
        if(myDecks[selectedDeck].length() == 0) {
          alert(msg);
          throw new Error(msg);
        }
        var msg = "Cannot getCard before setting card to a deck";
        if(selectedCard != undefined) {
          alert(msg);
          throw new Error(msg);
        }
        selectedCard = myDecks[selectedDeck].pop();
        selectedCard.animateTo({
          delay: 500, // wait 1 second + i * 2 ms
          duration: 1000,
    		  ease: 'quartOut',
          x: showXPosition,
          y: showYPosition
        });
        //console.log("SelectedCard: ", selectedCard);
        ciie++;
        break;
      case PUTCARD:
        console.log("PUTCARD");
        isCardSelected();
        selectedDeck = ci[ciie + 1];
        myDecks[selectedDeck].push(selectedCard);
        selectedCard.animateTo({
            delay: 1000, // wait 1 second + i * 2 ms
            duration: 1500,
    		    ease: 'quartOut',
            x: myDecks[selectedDeck].getX(),// * window.innerWidth - window.innerWidth / 2,
            y: myDecks[selectedDeck].getY()// * window.innerHeight - window.innerHeight / 2
        })
        //console.log(selectedCard);
        selectedCard = undefined;
        ciie++;
        break;
    }
    ciie++;
  }
  console.log("MY DECKS: ", myDecks);
  return
}

///// TESTING RECURSIVE LOOP
function loop(){
	if(ci[ciie] == EXIT || stop || ciie >= ci.length) return;
  setTimeout(function(){
    console.log("Index " + ciie + " : " + ci[ciie]);
    switch (ci[ciie]) {
      case IF:
        console.log("IF");
        //Evalua condicion
        evaluateExpression();
        break;
      case WHILE:
        console.log("WHILE");
        //Evalua condicion
        evaluateExpression();
        break;
      case ITERATE:
        console.log("ITERATE");
        var iterateCant = ci[ciie+1];
        console.log("Cant to ITERATE: ", iterateCant);
        ci[ciie+1]--;
        if(iterateCant == 0){
          //Salete
          ciie +=1;
          console.log("SALTE: ", ciie);
        }else{
          //Continua
          ciie +=3;
          console.log("CONTINUA: ", ciie);
        }
        console.log("Brinco a: ", ciie);
        //Evalua condicion
        //evaluateExpression();
        break;
      case JMP:
        console.log("JMP");
        ciie = ci[ciie+1]-1;
        break;
      case CALL:
        console.log("CALL");
        cie_stack.push(ciie+1);
        //console.log("STACK: ", cie_stack);
        ciie = ci[ciie+1]-1;
        break;
      case RET:
        console.log("RET");
        ciie = cie_stack.pop();
        console.log("STACK: ", cie_stack);
        break;
      case EXIT:
        console.log("EXIT");
        break;
      case FLIP:
        console.log("FLIP");
        isCardSelected();
        //console.log("SELECTED CARD", selectedCard);
        selectedCard.flip();
        break;
      case GETCARD:
        console.log("GETCARD");
        selectedDeck = ci[ciie + 1];
        var ln = myDecks[selectedDeck].length();
        console.log("DECK " + selectedDeck + " LENGT: " + ln);
        var msg = "Cannot getCard from empty Deck";
        if(myDecks[selectedDeck].length() == 0) {
          alert(msg);
          throw new Error(msg);
        }
        var msg = "Cannot getCard before setting card to a deck";
        if(selectedCard != undefined) {
          alert(msg);
          throw new Error(msg);
        }
        selectedCard = myDecks[selectedDeck].pop();
        selectedCard.animateTo({
          delay: 100, // wait 1 second + i * 2 ms
          duration: 400,
    		  ease: 'quartOut',
          x: showXPosition,
          y: showYPosition
        });
        //console.log("SelectedCard: ", selectedCard);
        ciie++;
        break;
      case PUTCARD:
        console.log("PUTCARD");
        isCardSelected();
        selectedDeck = ci[ciie + 1];
        myDecks[selectedDeck].push(selectedCard);
        selectedCard.animateTo({
            delay: 100, // wait 1 second + i * 2 ms
            duration: 400,
    		    ease: 'quartOut',
            x: myDecks[selectedDeck].getX(),// * window.innerWidth - window.innerWidth / 2,
            y: myDecks[selectedDeck].getY()// * window.innerHeight - window.innerHeight / 2
        })
        selectedCard = undefined;
        ciie++;
        break;
    }
    ciie++;
    loop();
  },delayOperation)
}

function codeExecution(){
  //if(ciie > 55) throw new Error("no mames");
  console.log("Index " + ciie + " : " + ci[ciie]);
  loop();
}


////

function isCardSelected(){
  //Validaciòn para saber si el codigo tiene una "selectedCard" seleccionada.
  var msg = "You have not select any Card";
  console.log(selectedCard);
  if(selectedCard == undefined) {
    alert(msg);
    throw new Error(msg);
  }
  return;
}

function evaluateExpression () { //Return index where to jump
  console.log("CARD TO EVALUATE: ", selectedCard);
  //Obtain Type Expression
  if(ci[ciie+1] == ISEMPTY || ci[ciie+1] == ISNOTEMPTY){
    //Expression with parameter
    console.log("Expression Parameter");
    var evaluator = ci[ciie+1];
    var parameter = ci[ciie+2];
    ciie+=2;
    var res = resultExpParameter(evaluator, parameter);
    console.log("Resultado de Parametros: " ,res);
    if(res){
      ciie+=2;
    }

  }else if(ci[ciie+1] == VALUE){
    //VALUE CONDITION
    isCardSelected();
    console.log("Expression Operation");
    var operator = ci[ciie+2];
    var number = ci[ciie+3];
    ciie+=3;
    var res = resultExpOperation(operator, number);
    console.log("Resultado de OPERACION: " ,res);
    if(res){
      ciie+=2;
    }

  }else{
    // Expression without parameter
    isCardSelected();
    console.log("Expression no Parameter");
    var simpleCondition = ci[ciie+1];
    ciie+=1;
    var res = resultExpNoParameter(simpleCondition);
    console.log("Resultado Exp NO parameter: ",res);
    if(res){
      ciie+=2;
    }
  }
  console.log("INDEX OF JMP: ", ciie);
  return true;
}

function resultExpParameter (exp, deck) {
  if(exp == ISNOTEMPTY){
    if(myDecks[deck].length() == 0){
      return false;
    }else{
      return true;
    }
  }else if(exp == ISEMPTY){
    if(myDecks[deck].length() == 0){
      return true;
    }else{
      return false;
    }
  }
}

function resultExpOperation(op, n){
  switch (op) {
    case LESSTHAN:
      console.log("LESSTHAN");
      return selectedCard.rank < n;
      break;
    case GREATERTHAN:
      console.log("GREATERTHAN");
      return selectedCard.rank > n;
      break;
    case LESSOREQUAL:
      console.log("LESSOREQUAL");
      return selectedCard.rank <= n;
      break;
    case GREATEROREQUAL:
      console.log("GREATEROREQUAL");
      return selectedCard.rank >= n;
      break;
    case EQUAL:
      console.log("EQUAL");
      return selectedCard.rank == n;
      break;
    case NOTEQUAL:
      console.log("NOTEQUAL");
      return selectedCard.rank != n;
      break;
  }
}

function resultExpNoParameter (op) {
  //suit 0 == SPADES
  //suit 1 == HEARTS || RED
  //suit 2 == CLUBS
  //suit 3 == DIAMOND || RED
  console.log("SUIT: ", selectedCard.suit);
  switch (op) {
    case ISRED:
      console.log("ISRED");
      console.log("selectedCard.suit == 3 || selectedCard.suit == 1", selectedCard.suit == 3 || selectedCard.suit == 1);
      return selectedCard.suit == 3 || selectedCard.suit == 1;
      break;
    case ISBLACK:
      console.log("ISBLACK");
      return selectedCard.suit == 0 || selectedCard.suit == 2;
      break;
    case ISHEART:
      console.log("ISHEART");
      return selectedCard.suit == 1;
      break;
    case ISCLUBS:
      console.log("ISCLUBS");
      return selectedCard.suit == 2;
      break;
    case ISDIAMOND:
      console.log("ISDIAMOND");
      return selectedCard.suit == 3;
      break;
    case ISSPADES:
      console.log("ISSPADES");
      return selectedCard.suit == 0;
      break;
    case ISNOTRED:
      console.log("ISNOTRED");
      return selectedCard.suit == 0 || selectedCard.suit == 2;
      break;
    case ISNOTBLACK:
      console.log("ISNOTBLACK");
      return selectedCard.suit == 3 || selectedCard.suit == 1;
      break;
    case ISNOTHEART:
      console.log("ISNOTHEART");
      return selectedCard.suit != 1;
      break;
    case ISNOTCLUBS:
      console.log("ISNOTCLUBS");
      return selectedCard.suit != 2;
      break;
    case ISNOTDIAMOND:
      console.log("ISNOTDIAMOND");
      return selectedCard.suit != 3;
      break;
    case ISNOTSPADES:
      console.log("ISNOTSPADES");
      return selectedCard.suit != 0;
      break;
  }
}

//Demand Verify and helpers
function demand(token){
  console.log("Demand: ", token);
  if(!token) throw new Error('Empty Token encountered');
  if(tt[tti] != token){
    var message = 'Different Token expected. Token encountered: "' + tt[tti] + '" Token Expected: "' + token +'"';
    alert(message);
    throw new Error(message);
  }
  tti++;
  return;
}

function verify(token){
  console.log("Verify: ", token);
  return tt[tti] == token;
}

function stop_fn(){
  stop = true;
}

function continue_fn(){
  stop = false;
  loop();
}

function clean(){
  tt = [];
  tti = 0;
  cii = 2;
  ci = [];
  lexic = {customFn:[],
              errors:[]};
  st = [];
  ci_stack = [];
  NEXTFUNCTION = -33;
  ciie = 0;
  cie_stack = [];
  selectedDeck = 0;
  selectedCard = null;
  stop = false;
}

function pureString(data){
  //REVISA que contenga alugno de estos caracteres:  -!$#@%^&*_+|~ =`[]:";'<>?,./\ o que tenga una letra.
  var special = /[-!$#@%^&*+|~ =`\[\]:";'<>?,.\/\\]/.test(data);
  var number = /\d/.test(data);
  return special || number;
}

function isNumber(data) {
  //Revisa que sea un Número
  return /^\d+$/.test(data);
}

function isCustomFunction(){
  return !palabras_reservadas.includes(tt[tti]);//st[tt[tti]] != undefined;
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//Initial Script
initDeck();

function test(){
var startX = -20;
var deltaX = 70;
var startY = -300;
var deltaY = 120;
var row = 13;
var col = 4;
var colIndex = 1;
  deck.cards.forEach(function (card, i) {
    //card.setSide('back')
    if((i % row) == 0) colIndex++;
    var relPosX = startX + (i% row)*deltaX;
    var relPosY = startY + (colIndex)*deltaY;

    // explode
    card.animateTo({
        delay: 1000 + i * 2, // wait 1 second + i * 2 ms
        duration: 2000,
		    ease: 'quartOut',
        x: relPosX,// * window.innerWidth - window.innerWidth / 2,
        y: relPosY// * window.innerHeight - window.innerHeight / 2
    })
  })
};

//Code Mirror Varialbes
var cm = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
  lineNumbers: true,
  matchBrackets: true
});


function execute_ci_text(){
  if(!cm.getValue()) return;
  //Stop
  stop_fn();

  //Reset
  initDeck();

  //Data
  var arrayData = cm.getValue();
  ci = arrayData.replaceAll(" ","").replaceAll(/(?:\r\n|\r|\n)/g,",").replaceAll(/(?:\r\n|\r|\n|\t)/g,"").split(",");
  ciie = 0;
  for(var i = 0; i< ci.length; i++){
    ci[i] = parseInt(ci[i]);
  }

  console.log("CI: ", ci);
  //Initi Execution.
  stop = false;
  setTimeout(function(){codeExecution();},1000);

}

function loop2(){
  stop = false;
	if(ci[ciie] == EXIT || stop || ciie >= ci.length) return;
  setTimeout(function(){
    //console.log("Index " + ciie + " : " + ci[ciie]);
    switch (ci[ciie]) {
      case IF:
        console.log("IF");
        //Evalua condicion
        evaluateExpression();
        break;
      case WHILE:
        console.log("WHILE");
        //Evalua condicion
        evaluateExpression();
        break;
      case ITERATE:
        console.log("ITERATE");
        var iterateCant = ci[ciie+1];
        ci[ciie+1]--;
        if(iterateCant == 0){
          //Salete
          ciie +=1;
        }else{
          //Continua
          ciie +=3;
        }
        //Evalua condicion
        //evaluateExpression();
        break;
      case JMP:
        console.log("JMP");
        ciie = ci[ciie+1]-1;
        break;
      case CALL:
        console.log("CALL");
        cie_stack.push(ciie+1);
        //console.log("STACK: ", cie_stack);
        ciie = ci[ciie+1]-1;
        break;
      case RET:
        console.log("RET");
        ciie = cie_stack.pop();
        break;
      case EXIT:
        console.log("EXIT");
        break;
      case FLIP:
        console.log("FLIP");
        isCardSelected();
        selectedCard.flip();
        break;
      case GETCARD:
        console.log("GETCARD");
        selectedDeck = ci[ciie + 1];
        var ln = myDecks[selectedDeck].length();
        var msg = "Cannot getCard from empty Deck";
        if(myDecks[selectedDeck].length() == 0) {
          alert(msg);
          throw new Error(msg);
        }
        var msg = "Cannot getCard before setting card to a deck";
        if(selectedCard != undefined) {
          alert(msg);
          throw new Error(msg);
        }
        selectedCard = myDecks[selectedDeck].pop();
        selectedCard.animateTo({
          delay: 100, // wait 1 second + i * 2 ms
          duration: 400,
    		  ease: 'quartOut',
          x: showXPosition,
          y: showYPosition
        });
        //console.log("SelectedCard: ", selectedCard);
        ciie++;
        break;
      case PUTCARD:
        console.log("PUTCARD");
        isCardSelected();
        selectedDeck = ci[ciie + 1];
        myDecks[selectedDeck].push(selectedCard);
        selectedCard.animateTo({
            delay: 100, // wait 1 second + i * 2 ms
            duration: 400,
    		    ease: 'quartOut',
            x: myDecks[selectedDeck].getX(),// * window.innerWidth - window.innerWidth / 2,
            y: myDecks[selectedDeck].getY()// * window.innerHeight - window.innerHeight / 2
        })
        selectedCard = undefined;
        ciie++;
        break;
    }
    ciie++;
  },delayOperation)
}
