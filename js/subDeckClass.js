
var subDeck = function() {
    this.stack = [];
    this.position = {x:0,y:0};
    this.push = function(card){
      this.topCard = card;
      this.stack.push(card);
    }
    this.pop = function(){
      if(this.stack.length == 0) return;
      this.topCard = this.stack.shift();
      return this.topCard;
    }
    this.getTopCard = function(){
      if(this.topCard) return this.topCard;
    }
    this.setPosition = function(x,y){
      this.position.x = x;
      this.position.y = y;
    }
    this.length = function(){
        return this.stack.length;
    }
    this.getX = function(){
      return this.position.x;
    }
    this.getY = function(){
      return this.position.y;
    }
}

