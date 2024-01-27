
class Voice { // class 的特性
  constructor () {// 构造器 new实例时执行
    this.DOM = null;// this创建属性
    this.createElement();
    console.log('构造器+++');
  }
  createElement () {
    this.DOM = document.createElement('audio');
  }
  playAudio (name) {
    this.DOM.src = require(`@sky/rafaelDesign/static/audio/${name}`);
    this.DOM.play();
    // this.DOM.pause(); 暂停
    console.log('audio+++', this.DOM);
  }
}

const voice = new Voice();// new实例
export default voice;
