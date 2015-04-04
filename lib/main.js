var http    = require('http'),
	config  = require('../config/config.json'),
	MPC_obj = require('./mpc_obj.js')

var main = function(obj){
	//Если не передали аргумент, то загружаю из config.js
	obj = typeof obj == "undefined" ? {} : obj
	this.mpc_uri  = obj.mpc_uri || config.mpc_uri;
	this.interval = obj.interval || config.interval;
	this.PWM_PROGR = obj.PWM_PROGR || ""; 
	
	/*
	* Инициируем объект для работы с MPC webserver и передаём то, что хотим получить в 
	* цикле функцией get()
	*/
	this.mpc_obj = new MPC_obj({func:this.PWM_PROGR});
};
main.prototype.get = function(){
	var that = this

	return new Promise(function(done){
		http.get(that.mpc_uri, function(res) {
		  res.on('data', function (chunk) {
			that.mpc_obj.parse(chunk)
			done(that.mpc_obj.get());
		  });
		}).on('error', function(e) {
			done(e.message);
		});
	})
}

//callback-promise-лапша
main.prototype.init = function(func){
	this.get().then(
		function(a){
			func(a.toString())
		}
	)
}

// Таймер
main.prototype.repeat = function(func){
	var that = this;
	var timer = setInterval(function(){
		that.init(function(a){
			func(a)	
		});
	},that.interval)
}

module.exports = main;