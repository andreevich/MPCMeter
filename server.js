var Main 	   = require('./lib/main.js'),
    SerialPort = require('serialport').SerialPort;
/* 
* В конструктор можно передать объект {mpc_uri:"",interval:"",PWM_PROGR:""}
* или создать с настройками из config.js	
* PWM_PROGR:
* 0 - PWM;
* 1 - долю прогресса
* 2 - obj
*/

var serialPort = new SerialPort("COM5", {
  baudrate: 57600
}, false);


var main = new Main(); 
 
// открываем порт
serialPort.open(function (error) {
	if ( error ) {
		console.log('failed to open: '+error);
   } else {
	console.log('open');
	//получил данные от arduino
	serialPort.on('data', function(data) {
		main.init(function(a){
			//послал в ответ прогресс фильма
			serialPort.write(a);
		});
	 });
	}
});
