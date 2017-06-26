const IF = 10;
const WHILE = 20;
const ITERATE = 30;
//const ELSEIF = 40;
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



new Vue({
  el: '#app',
  data: {
    logDataLexico: 'Log data should be here...',
    logDataSintactico: 'Sintactic log here...',
    idx: 0,
    idx_ci: 0,
    ci: [],
    ci_stack: [],
    simbol_table: {},
    palabras_reservadas:["program", "{", "}", "void", "if", "while", "iterate", "flip", 
            "getCard", "putCard", "else", "isRed", "(", ")", "isBlack", 
            "isHeart", "isClubs", "isDiamond", "isSpades", "isNotRed", 
            "isNotBlack", "isNotHeart", "isNotClubs", "isNotDiamond", 
            "isNotSpades", "<", ">", "<=", ">=", "==", "!=", "VALUE", "class"],
    tokenTree: [],
    lexicograficObject: {
      lexicErrCount: 0,
      lexicErr: false,
      lexicErrArr: [],
      lexicCustomFunctions: []
    },
    decks: [],
    sintacticObject:{
      errCount:0,
      errArr:[]
    },
    inputText : ""
  },
  methods: {
    compiler () {
      //Main method that executes the compiler.
      if(!this.editor.getValue()) return;

      //First step: Lexicografico
      this.lexicografic();
      if(this.lexicograficObject.lexicErr){
        this.logDataLexico = "Invalid tokens: " + this.lexicograficObject.lexicErrArr;
      }else{
        this.logDataLexico = "OK";
      }
      //Second step: Sintactico
      if(!this.lexicograficObject.lexicErr){
        this.idx = 0;
        this.idx_ci = 2;
        this.ci = [];
        this.program();
        console.log("sintacticObject",this.sintacticObject);
      }
      //Final Step:
     // this.ci_execution();

    },
    evaluate_condition(condition){
      switch (condition) {
        case 201:
            console.log("isRed");
            break;
          case 202:
            console.log("isBlack");
            break;
          case 203:
            console.log("isHeart");
            break;
          case 204:
            console.log("isClubs");
            break;
          case 205:
            console.log("isDiamond");
            break;
          case 206:
            console.log("isSpades");
            break;
          case 207:
            console.log("isNotRed");
            break;
          case 208:
            console.log("isNotBlack");
            break;
          case 209:
            console.log("isNotHeart");
            break;
          case 210:
            console.log("isNotClubs");
            break;
          case 211:
            console.log("isNotDiamond");
            break;
          case 212:
            console.log("isNotSpades");
            break;
          case 250:
            console.log("isEmpty");
            break;
          case 251:
            console.log("isNotEmpty");
            break;
          case 281:
            console.log("Operation <");
            break;
          case 282:
            console.log("Operation >");
            break;
          case 283:
            console.log("Operation <=");
            break;
          case 284:
            console.log("Operation >=");
            break;
          case 285:
            console.log("Operation ==");
            break;
          case 286:
            console.log("Operation !=");
            break;
        
        default:
          // code
      }
    },
    ci_execution(){
      var ci_idx_exe = 0;
      while(this.ci[ci_idx_exe] != 600){
        switch (this.ci[ci_idx_exe]) {
          case 10:
            console.log("IF");
            break;
          case 20:
            console.log("WHILE");
            //Obtiene condición
            this.evaluate_condition(this.ci[ci_idx_exe + 1]);
            //valora condición con arreglo de decks

            break;
          case 30:
            console.log("ITERATE");
            break;
          case 100:
            console.log("JMP");
            break;
          case 110:
            console.log("110");
            break;
          case 280:
            console.log("VALUE");
            break;
          case 500:
            console.log("RET");
            break;
          case 600:
            console.log("EXIT");
            break;
          case 301:
            console.log("flip");
            break;
          case 302:
            console.log("getCard");
            break;
          case 303:
            console.log("putCard");
            break;
          case 201:
            console.log("isRed");
            break;
          case 202:
            console.log("isBlack");
            break;
          case 203:
            console.log("isHeart");
            break;
          case 204:
            console.log("isClubs");
            break;
          case 205:
            console.log("isDiamond");
            break;
          case 206:
            console.log("isSpades");
            break;
          case 207:
            console.log("isNotRed");
            break;
          case 208:
            console.log("isNotBlack");
            break;
          case 209:
            console.log("isNotHeart");
            break;
          case 210:
            console.log("isNotClubs");
            break;
          case 211:
            console.log("isNotDiamond");
            break;
          case 212:
            console.log("isNotSpades");
            break;
          case 250:
            console.log("isEmpty");
            break;
          case 251:
            console.log("isNotEmpty");
            break;
          case 281:
            console.log("Operation <");
            break;
          case 282:
            console.log("Operation >");
            break;
          case 283:
            console.log("Operation <=");
            break;
          case 284:
            console.log("Operation >=");
            break;
          case 285:
            console.log("Operation ==");
            break;
          case 286:
            console.log("Operation !=");
            break;
          default:
            console.log(this.ci[ci_idx_exe]);
        }
        ci_idx_exe++;
      }
      console.log("");
    },
    lexicografic() {
      this.lexicograficObject.lexicErrArr = [];
      this.inputText = this.editor.getValue();
      //console.log(this.inputText);
      this.tokenTree = this.inputText.replace(/(?:\r\n|\r|\n|\t)/g," ").split(" ");
      this.tokenTree.clean("");
      //console.log(this.tokenTree);
      this.lexicograficObject.lexicErr = false;
      console.log(this.tokenTree);
      
      for (var i = 0; i <= this.tokenTree.length - 1; i++) {
        /*
        console.log("PALABRA: " + this.tokenTree[i]);
        console.log("Contains Check: " + this.palabras_reservadas.includes(this.tokenTree[i]));
        console.log("Pure String check: " + pureString(this.tokenTree[i]));
        console.log("Number check: " + isNumber(this.tokenTree[i]));
        console.log("--------");
        */
        
        //entra si todos son False
        if (!(this.palabras_reservadas.includes(this.tokenTree[i]) || !pureString(this.tokenTree[i]) || isNumber(this.tokenTree[i]))) {
            this.lexicograficObject.lexicErrCount ++;
            this.lexicograficObject.lexicErr = true;
            this.lexicograficObject.lexicErrArr.push(this.tokenTree[i]);
            console.log("EL TOKEN: " + this.tokenTree[i] + " es invalido");
        }
        
        if(!this.palabras_reservadas.includes(this.tokenTree[i]) && !isNumber(this.tokenTree[i]) && pureString(this.tokenTree[i])){
            //Agregamelo a un arreglo de CUstomer Functions.
            this.lexicograficObject.lexicCustomFunctions.push(this.tokenTree[i]);
        }
        
      }
      
    },
    program(){
      console.log("Program");
      this.ci[0] = JMP;
      
      
      if (this.exigir("class")) {
          if (this.exigir("program")) {
              if (this.exigir("{")) {
                  this.functions();
                  this.main_function();
                  this.ci[this.idx_ci] = EXIT;
                  if (!this.exigir("}")) {
                      //this.logDataSintactico = "No tiene '}'"
                      console.error("No tiene '}'");
                      return;
                      //alert("No tiene '}'")
                  }
              } else {
                  //this.logDataSintactico = "No tiene '{'"
                  console.error("No tiene '{'");
                  return;
                  //alert("No tiene '{'");
              }
          } else {
              //this.logDataSintactico = "No tiene 'program'"
              console.error("No tiene 'program'");
              return;
              //alert("No tiene 'program'");
          }
      } else {
          this.logDataSintactico = "No tiene 'class'"
          console.error("No tiene 'class'");
          return;
          //alert("No tiene 'class'");
      }
      console.log("COOL");
      console.log("CI");
      console.log(this.ci);
      console.log("STAC");
      console.log(this.ci_stack);
      console.log("IDX_CI");
      console.log(this.idx_ci);
      console.log("SIMBOLOS");
      console.log(this.simbol_table);
      return;
    },
    functions(){
  	  console.log("Entre functions");
    	if(this.verificar("void")) {
    		this.function_()
    		this.functions_alpha();
    	}
    },
    functions_alpha(){
      console.log("Entre functions_alpha");
      if (this.verificar( "void" ) ) {
    	  this.function_()
    		this.functions_alpha();
      }
    },
     function_() { 
       console.log("Entre function_");
      if (this.exigir( "void")) {
        if(this.isCustomFunction()){
          this.ci[this.idx_ci++] = NEXTFUNCTION--;
          this.simbol_table[this.tokenTree[this.idx++]] = this.idx_ci;

        }
      	this.name_of_function();
      	if(this.exigir("(")){
            if(this.exigir(")")){
              if(this.exigir("{")){
                this.body();
                this.ci[this.idx_ci++] = RET;
                if(!this.exigir("}")){
                  console.log("falta escribir }");
                }
              }else{
                console.log("falta escribir {");
              }
            }else{
              console.log("falta escribir )");
            }
          }else{
            console.log("falta escribir (");
          }
      }else {
        //this.logDataSintactico = "No tiene 'void'"
        console.error("No tiene 'void'");
        return;
      }
      return;
    },
    name_of_function(){
      console.log("Entre name_of_function");
      if(this.verificar("flip") || this.verificar("getCard") || this.verificar("putCard") ){
        this.official_function();
      }else{
        this.customer_function();
      }
    },
    official_function(){
      console.log("Entre official_function");
      if(this.verificar("flip")){
        this.exigir("flip");
        this.ci[this.idx_ci++] = FLIP;
      }else if(this.verificar("getCard")){
        if(this.exigir("getCard")){
          this.ci[this.idx_ci++] = GETCARD;
          if (this.exigir("(") ) {
            this.number_of_deck();
        	  if ( !this.exigir (")") ) {
        	    console.error("No tiene ')'");
              return;
        	  }
        	}else{
        	  console.error("No tiene '('");
            return;
        	}  
        }
      }else if(this.verificar("putCard")){
        if(this.exigir("putCard")){
          this.ci[this.idx_ci++] = PUTCARD;
          if (this.exigir("(") ) {
            this.number_of_deck();
        	  if ( !this.exigir (")") ) {
        	    console.error("No tiene ')'");
              return;
        	  }
        	}else{
        	  console.error("No tiene '('");
            return;
        	}  
        }
      }

    },
    customer_function(){
      console.log("Entre customer_function");
      if(this.isCustomFunction()){
        this.ci[this.idx_ci++] = CALL;
        //this.call_stack[this.idx_call++] =  this.idx_ci + 1;
        this.ci[this.idx_ci++] = this.simbol_table[this.tokenTree[this.idx++]];
        /*
        this.simbol_table[this.tokenTree[this.idx++]] = this.idx_ci;
        //Jump
        this.ci[this.idx_ci++] = 100;
        //CI[]
        this.ci[this.idx_ci++] = this.idx_ci;
        */
        
        //this.ci[this.idx_ci++] = 500;
        //this.simbol_table[this.tokenTree[this.idx]].pos = this.idx_ci;
        //this.idx++;
        /*if(this.exigir("(")){
            if(this.exigir(")")){
              if(this.exigir("{")){
                this.body();
                if(!this.exigir("}")){
                  console.log("falta escribir }");
                }
              }else{
                console.log("falta escribir {");
              }
            }else{
              console.log("falta escribir )");
            }
          }else{
            console.log("falta escribir (");
          }*/
      }
      
    },
    isCustomFunction(){
      var res = !this.palabras_reservadas.includes(this.tokenTree[this.idx]);
      /*sif(this.simbol_table[this.tokenTree[this.idx]] != undefined){
        console.log(this.tokenTree[this.idx] + " NO EXISTE");
        var res =false;
      }else{
        console.log(this.tokenTree[this.idx] + " EXISTE");
        var res =true;
      }*/
      //var res = this.simbol_table.includes(this.tokenTree[this.idx]);
      //console.log(this.tokenTree[this.idx] + " CustomerFunction?: " + res);
      return  res;
    },
    main_function(){
      console.log("Entre main_function");
      if(this.verificar("program")){
        if(this.exigir("program")){
          if(this.exigir("(")){
            if(this.exigir(")")){
              if(this.exigir("{")){
                this.ci[1] = this.idx_ci;
                this.body();
                if(!this.exigir("}")){
                  console.log("falta escribir }");
                }
              }else{
                console.log("falta escribir {");
              }
            }else{
              console.log("falta escribir )");
            }
          }else{
            console.log("falta escribir (");
          }
          
        }else{
          console.log("No ingreso Program ");
        }
      }
    },
    body(){
      console.log("entre a body");
      this.expression();
      this.body_alfa();
    },
    body_alfa(){
      console.log("entre a body");
      if(this.verificar("while") || this.verificar("if") || this.verificar("iterate") || 
        this.verificar("flip") || this.verificar("getCard") || this.verificar("putCard") || 
        this.isCustomFunction()){
        // tengo qe revisar que no este en el arbol
        //Este último revisa que sea una customer function: Validadndo que no sea una palabra reservada "while", "iterate", etc...
        this.expression();
        this.body_alfa();
      }
    },
    expression(){
      console.log("entre a expression");
      if(this.verificar("if")){
        this.if_expression();
      }
      else if(this.verificar("while")){
        this.while_expression();
      }
      else if(this.verificar("iterate")){
        this.iterate_expression();
      }
      else{
        this.call_Function();
      }
    },
    if_expression(){
      if(this.exigir("if")){
        this.ci[this.idx_ci++] = IF;
        //codigointermedio[i++] = 10; --> Aumentar i++;
        if(this.exigir("(")){
          this.conditional();
          //codigointermedio[i] = 255;
          if(this.exigir(")")){
            //codigointermedio[i++] = 20;
            //stack.push(i++);
            //codigointermedio[i++] = x; --> a donde voy a brincar :O
            // Se agrega a un STACK para saber donde estamos ! y quitamos uno por uno por la ultima.
            if(this.exigir("{")){
              this.ci[this.idx_ci++] = JMP;
              this.ci_stack.push(this.idx_ci++);
              this.body();
              //this.ci[this.idx_ci++] = 300;
              if(this.exigir("}")){
                if(this.verificar("else")){
                  this.else_if();
                }else{
                  this.ci[this.ci_stack.pop()] = this.idx_ci;
                }
              }else{
                console.error("No tiene '}'");
                //NO tiene }
              }
            }else{
              console.error("No tiene '{'");
              //No tiene {
            }
          }else{
            console.error("No tiene ')'");
            //no tiene )
          }
        }else{
          console.error("No tiene '('");
          //No tiene "("
        }
      }else{
        console.error("No tiene 'if'");
        //No tiene un IF D:.. raro
      }
    },
    else_if(){
      if(this.verificar("else")){
        if(this.exigir("else")){
          if(this.exigir("{")){
            this.ci[this.ci_stack.pop()] = this.idx_ci + 2;
            this.ci[this.idx_ci++] = JMP;
            this.ci_stack.push(this.idx_ci++);
            //codigointermedio[i++] = 20;
            //x = stack.pop()
            //codigointermedio[x] = i + 1;
            //stack.push(i++);
            this.body();
            //this.ci[this.idx_ci++] = 300;
            if(!this.exigir("}")){
              console.error("No tiene '}'");
            }
            this.ci[this.ci_stack.pop()] = this.idx_ci;
            //codigointermedio[stack.pop()] = i;  --> ya esta en el body.. :O
          }else{
            console.error("No tiene '{'");
            //No tiene {
          }
        }else{
          console.error("No tiene 'else'");
          //NO tiene else
        }
      }
    },
    while_expression(){
      if(this.exigir("while")){
        this.ci_stack.push(this.idx_ci); //Aqui se guarda la Y
        this.ci[this.idx_ci++] = WHILE; //Inicio While
        if(this.exigir("(")){
          this.conditional();
          //this.ci[this.idx_ci++] = 200; //Numero para condicional
          if(this.exigir(")")){
            if(this.exigir("{")){
              this.ci[this.idx_ci++] = JMP; //JMP Nigga
              this.ci_stack.push(this.idx_ci++); //Guardo X
              this.body();
              //this.ci[this.idx_ci++] = 300; //wanaby body
              if(this.exigir("}")){
                this.ci[this.idx_ci++] = JMP; //JMP
                this.ci[this.ci_stack.pop()] = this.idx_ci + 1; //Brinca al inicio del While
                this.ci[this.idx_ci++] = this.ci_stack.pop();
              }else{
                //no tiene }
                console.error("No tiene '}'");
              }
            } else{
              //no tiene {
              console.error("No tiene '{'");
              }
          } else{
            //no tiene )
            console.error("No tiene ')'");
            }
        } else{
          //no tiene (
          console.error("No tiene '('");
          }
      } else{
        //no tiene while
        console.error("No tiene 'while'");
        }
    },
    iterate_expression(){
      if(this.exigir("iterate")){
        this.ci_stack.push(this.idx_ci); //Aqui se guarda la Y
        this.ci[this.idx_ci++] = ITERATE; //Inicio ITERATE
        if(this.exigir("(")){
          this.number();
          if(this.exigir(")")){
            if(this.exigir("{")){
              this.ci[this.idx_ci++] = JMP; //JMP Nigga
              this.ci_stack.push(this.idx_ci++); //Guardo X
              this.body();
              if(this.exigir("}")){
                this.ci[this.idx_ci++] = JMP; //JMP
                this.ci[this.ci_stack.pop()] = this.idx_ci + 1; //Brinca al inicio del While
                this.ci[this.idx_ci++] = this.ci_stack.pop();
                
              }else {
                console.error("No tiene '}'");
              }
            }
            else{
              console.error("No tiene '{'");
            }
          }
          else{
            console.error("No tiene ')'");
          }
        }
        else{
          console.error("No tiene '('");
        }
      }
      else{
        console.error("No tiene 'iterate'");
      }
    },
    call_Function(){
      console.log("entre Call Function");
      //agregar a la posición 
      /*
      this.simbol_table[this.tokenTree[this.idx]] = this.idx_ci++;
      this.ci[this.idx_ci] = this.simbol_table[this.tokenTree[this.idx]];
      this.idx++;
      this.idx_ci++
      */
      
      this.name_of_function();
    },
    conditional(){
      console.log("Entre conditional");
      if(this.verificar("isRed") || this.verificar("isBlack") || this.verificar("isHeart") || this.verificar("isClubs") || 
      this.verificar("isDiamond") || this.verificar("isSpades") || this.verificar("isNotRed") || this.verificar("isNotBlack") ||
      this.verificar("isNotHeart") || this.verificar("isNotClubs") || this.verificar("isNotDiamond") || 
      this.verificar("isNotSpades") || this.verificar("isEmpty") || this.verificar("VALUE") || this.verificar("isNotEmpty")){
        if(this.verificar("isRed") || this.verificar("isBlack") || this.verificar("isHeart") || this.verificar("isClubs") || 
        this.verificar("isDiamond") || this.verificar("isSpades") || this.verificar("isNotRed") || this.verificar("isNotBlack") ||
        this.verificar("isNotHeart") || this.verificar("isNotClubs") || this.verificar("isNotDiamond") || this.verificar("isNotSpades")){
          this.card_simple_condition();
        }
        else if(this.verificar("VALUE")){
          this.card_composed_condition();
        }
        else if(this.verificar("isEmpty") || this.verificar("isNotEmpty")){
          this.deck_simple_condition();
        }
      }else{
        console.error("No es un condicional valido");
      }
      
    },
    card_simple_condition(){
      switch (this.tokenTree[this.idx]){
        case "isRed":
          this.ci[this.idx_ci++] = ISRED;
          this.exigir("isRed");
          break;
        case "isBlack":
          this.ci[this.idx_ci++] = ISBLACK;
          this.exigir("isBlack");
          break;
        case "isHeart":
          this.ci[this.idx_ci++] = ISHEART;
          this.exigir("isHeart");
          break;
        case "isClubs":
          this.ci[this.idx_ci++] = ISCLUBS;
          this.exigir("isClubs");
          break;
        case "isDiamond":
          this.ci[this.idx_ci++] = ISDIAMOND;
          this.exigir("isDiamond");
          break;
        case "isSpades":
          this.ci[this.idx_ci++] = ISSPADES;
          this.exigir("isSpades");
          break;
        case "isNotRed":
          this.ci[this.idx_ci++] = ISNOTRED;
          this.exigir("isNotRed");
          break;
        case "isNotBlack":
          this.ci[this.idx_ci++] = 208;
          this.exigir("isNotBlack");
          break;
        case "isNotHeart":
          this.ci[this.idx_ci++] = 209;
          this.exigir("isNotHeart");
          break;
        case "isNotClubs":
          this.ci[this.idx_ci++] = 210;
          this.exigir("isNotClubs");
          break;
        case "isNotDiamond":
          this.ci[this.idx_ci++] = 211;
          this.exigir("isNotDiamond");
          break;
        case "isNotSpades":
          this.ci[this.idx_ci++] = 212;
          this.exigir("isNotSpades");
          break;
      }
    },
    card_composed_condition(){
      if(this.exigir("VALUE")){
        this.ci[this.idx_ci++] = VALUE; // VALUE
        this.operator();
        this.number();
      }
      else{
        console.error("no tiene 'VALUE'");
      }
    },
    deck_simple_condition(){
      if(this.verificar("isEmpty") || this.verificar("isNotEmpty") ){
        if(this.verificar("isEmpty")){
          if(this.exigir("isEmpty")){
            if(this.exigir("(")){
              this.ci[this.idx_ci++] = 250; // condition isEmpty
              this.number_of_deck();
              if(!this.exigir(")")){
                console.error("No tiene ')'");
              }
            }
            else{
              console.error("No tiene '('");
            }
          }
        }
        if(this.verificar("isNotEmpty")){
          if(this.exigir("isNotEmpty")){
            if(this.exigir("(")){
              this.ci[this.idx_ci++] = 251; // condition isNotEmpty
              this.number_of_deck();
              if(!this.exigir(")")){
                console.error("No tiene ')'");
              }
            }else{
              console.error("No tiene '('");
            }
          }
        }
      }else{
        console.error("No es una deck_simple_condition");
      }
    },
    operator(){
      if(this.verificar("<") || this.verificar(">") || this.verificar("<=") || 
        this.verificar(">=")|| this.verificar("==") || this.verificar("!=")){
        switch(this.tokenTree[this.idx]){
          case "<":
            this.ci[this.idx_ci++] = 281;
            this.exigir("<");
            break;
          case ">":
            this.ci[this.idx_ci++] = 282;
            this.exigir(">");
            break;
          case "<=":
            this.ci[this.idx_ci++] = 283;
            this.exigir("<=");
            break;
          case ">=":
            this.ci[this.idx_ci++] = 284;
            this.exigir(">=");
            break;
          case "==":
            this.ci[this.idx_ci++] = 285;
            this.exigir("==");
            break;
          case "!=":
            this.ci[this.idx_ci++] = 286;
            this.exigir("!=");
            break;
        }
      }else{
        console.error(this.tokenTree[this.idx] + " No es un OPERADOR");
      }

    },
    number(){
      console.log("Entre number");
      if(!isNaN(parseInt(this.tokenTree[this.idx]))){
        this.tokenTree[this.idx] = parseInt(this.tokenTree[this.idx]);
        this.ci[this.idx_ci++] = this.tokenTree[this.idx];
      }else{
        return;
      }
      
      if(Number.isInteger(this.tokenTree[this.idx])){
        if(this.tokenTree[this.idx] < 0 || this.tokenTree[this.idx] > 13){
          //Error! no esta en el rango
          console.error("El token: " + this.tokenTree[this.idx] + " No es un numero en el rango de 1 a 13");
        }
      }else{
          console.error("El token: " + this.tokenTree[this.idx] + " No es un numero");
      }
      this.idx++;
    },
    number_of_deck(){
      console.log("Entre number_of_deck");
      if(!isNaN(parseInt(this.tokenTree[this.idx]))){
        this.tokenTree[this.idx] = parseInt(this.tokenTree[this.idx]);
        this.ci[this.idx_ci++] = this.tokenTree[this.idx];
      }else{
        return;
      }
      if(Number.isInteger(this.tokenTree[this.idx])){
        if(this.tokenTree[this.idx] < 0 || this.tokenTree[this.idx] > 52){
          console.error("El token: " + this.tokenTree[this.idx] + " No es un numero en el rango de 1 a 52");
        }
      }else{
          console.error("El token: " + this.tokenTree[this.idx] + " No es un numero");
      }
      this.idx++;
    },
    exigir(data) {
      //console.log("Exigir: " + data + " posicion Actual: " + this.idx + " arreglo[" + this.idx + "]= " + this.tokenTree[this.idx]);
      var res = this.tokenTree[this.idx] == data;
      this.idx++;
      return res;
    },
    verificar(data){
      //console.log("Verifico: " + data + " posicion Actual: " + this.idx + " arreglo[" + this.idx + "]= " +this.tokenTree[this.idx]);
      return this.tokenTree[this.idx] == data;
    },
    teesstt(){
      console.log("Tests!");
      var from = {
        line: 1,
      };
      var to = {
        line: 2
      };
      this.editor.markText({line:1,ch:1},{line:1,ch:3},{readOnly:true});
      //console.log(this.editor.getValue());
    }
  },
  mounted(){
    console.log("Mounted");
      /*
      window.hey = CodeMirror.fromTextArea(document.getElementById("demotext"),{
        lineNumbers: true,
        mode: "text/html",
        matchBrackets: true
      });
      */
    this.editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      lineNumbers: true,
      mode: "text/html",
      matchBrackets: true,
      extraKeys: {"Enter": "newlineAndIndentContinueComment"}
    });
    
    this.editor.on('change', function(cm) {
      //Calback cuando se escribe algo.
      //scope.model.text = cm.getValue();
      //console.log(cm.getValue());
    });
  }
});

  function pureString(data){
      //REVISA que contenga alugno de estos caracteres:  -!$#@%^&*_+|~ =`[]:";'<>?,./\ o que tenga una letra.
      var special = /[-!$#@%^&*+|~ =`\[\]:";'<>?,.\/\\]/.test(data);
      //console.log("Simbol check: " + special);
      var number = /\d/.test(data);
      return special || number;
    }
    
    function isNumber(data) {
      //Revisa que sea un Número
      return /^\d+$/.test(data);
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
    
