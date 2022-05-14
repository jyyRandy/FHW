var game={
  
  data:null,RN:4,CN:4,
  score:0,
  state:1,
  RUNNING:1,
  GAMEOVER:0,
  times:0,


  zt:false,
  start(){
    this.state=this.RUNNING;
    this.score=0;
    
    this.data=[];
    
    for(var r=0;r<this.RN;r++){
      
      this.data[r]=[];
      
      for(var c=0;c<this.CN;c++){
        
        this.data[r][c]=0;
      }
    }
    this.randomNum();
    this.randomNum();
    this.updateView();
    
    
    document.onkeydown=function(e){
      
      switch(e.keyCode){
        case 37: //左移
          this.moveLeft();
          break;
        case 38: //上移
          this.moveUp();
          break;
        case 39: //右移
          this.moveRight();
          break;
        case 40: //下移
          this.moveDown();
      }
    }.bind(this);
  },
  moveLeft(){
    
    var before=String(this.data);
    
    for(var r=0;r<this.RN;r++){
      this.moveLeftInRow(r);
    }
    
    var after=String(this.data);
    if(before!=after){
      this.randomNum();
      if(this.isGameOver())
        this.state=0;
      this.updateView();
    }
  },
  isGameOver(){
    
	for(var r=0;r<this.RN;r++){
		for(var c=0;c<this.CN;c++){
			if(this.data[r][c]==0) return false;
			else 
				if(c<this.CN-1&&(this.data[r][c]==this.data[r][c+1])) return false;
				if(r<this.RN-1&&(this.data[r][c]==this.data[r+1][c])) return false;
		}
	}
	  return true;
  },
  moveLeftInRow(r){
    
    for(var c=0;c<this.CN-1;c++){
      
      var nextc=this.getNextInRow(r,c);
      
      if(nextc==-1) break;
      else
        
        if(this.data[r][c]==0){
          
          this.data[r][c]=this.data[r][nextc];
          
          this.data[r][nextc]=0;
          c--;
          times=0;
        }else if(
          this.data[r][c]==this.data[r][nextc]){
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
		      this.zt=true;
          this.data[r][nextc]=0;
          times=0;
        }else{
          times+=1;
        }
    }
  },
  getNextInRow(r,c){
    
    for(var i=c+1;i<this.CN;i++){
      if(this.data[r][i]!=0) return i;
    }
    return -1;
  },
  moveRight(){
    var before=String(this.data);
    
    for(var r=0;r<this.RN;r++){
      this.moveRightInRow(r);
    }
    var after=String(this.data);
    if(before!=after){
      this.randomNum();
	  if(this.isGameOver())
        this.state=0;
      this.updateView();
    }
  },
  moveRightInRow(r){
    
    for(var c=this.CN-1;c>0;c--){
      
      var prevc=this.getPrevInRow(r,c);
      
      if(prevc==-1) break;
      else{
        if(this.data[r][c]==0){
          
          this.data[r][c]=this.data[r][prevc];
          
          this.data[r][prevc]=0;
          c++;
          times=0;
        }else if(this.data[r][c]
                  ==this.data[r][prevc]){
        
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
		  this.zt=true;
          this.data[r][prevc]=0;
          times=0;
        }else{
          times+=1;
        }
      }
    }
  },
  getPrevInRow(r,c){
    
    for(var i=c-1;i>=0;i--){
      
      if(this.data[r][i]!=0) return i;
    }
    return -1;
  },
  moveUp:function(){
    
    var before=String(this.data);
    
    for(var c=0;c<this.CN;c++){
      
      this.moveUpInCol(c);
    }
    
    var after=String(this.data);
    
    if(before!=after){
      this.randomNum();
	  if(this.isGameOver())
        this.state=0;
      this.updateView();
    }
  },
  moveUpInCol:function(c){
      
    for(var r=0;r<this.RN-1;r++){
        
      var nextr=this.getNextInCol(r,c);
        
      if(nextr==-1) break;
      else{
          
        if(this.data[r][c]==0){
            
          this.data[r][c]=this.data[nextr][c];
            
          this.data[nextr][c]=0;
          r--;
          times=0;
        }else if(this.data[r][c]
                  ==this.data[nextr][c]){
          
          this.data[r][c]*=2;
          this.score+=this.data[r][c];
            
			this.zt=true;
          this.data[nextr][c]=0;
          times=0;
        }else{
          times+=1;
        }
      }
    }
  },
  getNextInCol:function(r,c){
      
    for(var i=r+1;i<this.RN;i++){
        
      if(this.data[i][c]!=0) return i;
    }
    return -1;
  },
  moveDown:function(){
    
    var before=String(this.data);
    
    for(var c=0;c<this.CN;c++){
      
      this.moveDownInCol(c);
    }
    
    var after=String(this.data);
    if(before!=after){
      this.randomNum();
	  if(this.isGameOver())
        this.state=0;
      this.updateView();
    }
  },
  moveDownInCol:function(c){
      
    for(var r=this.RN-1;r>0;r--){
        
      var prevr=this.getPrevInCol(r,c);
        
      if(prevr==-1) break;
      else{
          
        if(this.data[r][c]==0){
            
          this.data[r][c]=this.data[prevr][c];
            
          this.data[prevr][c]=0;
          r++;
          times=0;
        }else if(this.data[r][c]
                  ==this.data[prevr][c]){
          
            this.data[r][c]*=2;
            this.score+=this.data[r][c];
            
			      this.zt=true;
            this.data[prevr][c]=0;
            times=0;
        }else{
          times+=1;
        }
      }
    }
  },
  getPrevInCol:function(r,c){
      
    for(var i=r-1;i>=0;i--){
        
      if(this.data[i][c]!=0) return i;
    }
    return -1;
  },
  updateView(){
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        var n=this.data[r][c];
        var div=document.getElementById("c"+r+c);
        if(n!=0){
          div.innerHTML=n;
          div.className="cell n"+n;
        }else{
          div.innerHTML="";
          div.className="cell";
        }
      }
    }
    
    if(this.zt==true){
		var tScore=document.getElementById("tScore");
			tScore.style.display="block";
			tScore.className="zoomIn";
			this.zt=false;
		}else{
			var tScore=document.getElementById("tScore");
			tScore.style.display="none";
			tScore.className="";
	}
    document.getElementById("score")
            .innerHTML=this.score;
    var div=document.getElementById("gameOver");
    if(this.state==0){
      div.style.display="block";
      document.getElementById("final")
              .innerHTML=this.score;
    }else{
      div.style.display="none";
    }
  },
  randomNum(){
    while(true){
      
      var r=Math.floor(Math.random()*this.RN);
      
      var c=Math.floor(Math.random()*this.CN);
      
      if(this.data[r][c]==0){
        this.data[r][c]=Math.random()<0.5?2:4;
        break;
      }
    }
  },
}
game.start();

var btns=document.querySelectorAll("ul#skin>li>button");
for(var i=0;i<btns.length;i++){
	btns[i].onclick=change;
}
function change(){
	var bg=document.getElementById("bg_img");
	var p_score=document.getElementById("p_score");
	if(this.innerHTML=="中国"){
		bg.className="china_wind_img";
		this.className="china_wind_btn";
		p_score.className="china_wind_score";
		main.className="china_wind_main";
	}else if(this.innerHTML=="欧美"){
		bg.className="ea_wind_img";
		this.className="ea_wind_btn";
		p_score.className="ea_wind_score";
		main.className="ea_wind_main";
	}else if(this.innerHTML=="法国"){
		bg.className="f_wind_img";
		this.className="f_wind_btn";
		p_score.className="f_wind_score";
		main.className="f_wind_main";
	}else if(this.innerHTML=="日韩"){
		bg.className="jk_wind_img";
		this.className="jk_wind_btn";
		p_score.className="jk_wind_score";
		main.className="jk_wind_main";
	}
}
