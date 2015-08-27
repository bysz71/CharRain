/*-------------------------------------------------
CharRain project
Generate a canvas based 'The Matrix' movie liked
character rain effect on your website.
Usage: simply new it with the parameter 'container'
which is the dom you want to append this canvas in.
This canvas element inheritents the size of the
'container' element.
-------------------------------------------------*/
var CharRain = (function(){
  function CharRain(container){
    var that = this;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = container.offsetWidth;
    this.canvas.height = container.offsetHeight;
    this.canvas.style.position = 'absolute';
    container.appendChild(this.canvas);

    this.switch = 0;

    this.charcode = [];
    for(var i = 0x20; i < 0x80; i++)
      this.charcode.push(String.fromCharCode(i));
    // for(var i = 0x3040; i < 0x3090; i++)
    //   this.charcode.push(String.fromCharCode(i));
    // for(var i = 0x30a0; i < 0x30f0; i++)
    //   this.charcode.push(String.fromCharCode(i));
    // console.debug(this.charcode.length);

    this.chars = Array(256);
    for(var i = 0; i < this.chars.length; i++)
      this.chars[i] = Math.floor(Math.random()*this.canvas.height);

    $(this.canvas).ready(function(){
      that.draw();
    });

    $(this.canvas).click(function(){
      that.switch = 1 - that.switch;
      if(that.switch == 0)
        that.draw();
      else
        clearInterval(that.interval);
    })
  }

  CharRain.prototype.draw = function(){
    var that = this;
    this.interval = setInterval(function(){
      that.ctx.fillStyle='rgba(255,255,255,0.08)';
      that.ctx.fillRect(0,0,that.canvas.width,that.canvas.height);
      that.ctx.fillStyle='#333333';
      for(var i = 0; i < that.chars.length; i++){
        char = that.charcode[Math.floor(Math.random()*(that.charcode.length-1))];
        x = i * 12;
        that.ctx.fillText(char, x, that.chars[i]);
        if(that.chars[i] > that.canvas.height + Math.random() * 10000)
          that.chars[i] = 0;
        else
          that.chars[i] += 12;
      }
    },33);
  }
  return CharRain;
})();
