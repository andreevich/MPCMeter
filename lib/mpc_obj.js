var MPC_obj = function(obj){ 
	this.name = 'mpc_obj';
	this.settings= {}
	this.func = obj.func
};
MPC_obj.prototype.getName = function(){
	return this.name
}
// Разбираем данные, предоставляемые MPC webserver
MPC_obj.prototype.parse = function(data){
	var obj = {}
	data.toString().split('\n').forEach(function(line){
		// отбираем параграфы, так как параметры только в них
		if (match=/\<p/.test(line)){
			var name2 = line.match(/id\=\"(\w+)\"/)[1]
			if (!obj.hasOwnProperty(name2))
				 obj[name2]=line.substring(line.indexOf('>')+1,line.lastIndexOf('<'))
		}
	})
	this.settings=obj;
}
// Возвращает прогресс просмотренного
MPC_obj.prototype.getProgress = function(){
	return (this.settings["position"]/this.settings["duration"]).toFixed(5)
}
// Возвращает прогресс для ШИМ (PWM) 	1,0 -> 255
MPC_obj.prototype.PWM = function(){
	return (this.getProgress()*255).toFixed(0)
}
// Возвращает вид данных для обработки в main.repeat()
MPC_obj.prototype.get = function(){
	var that = this
	switch(this.func){
		case 0	: return that.PWM(); break;
		case 1	: return that.getProgress(); break;
		case 2	: return this.settings; break;
		default	: return that.PWM(); break;
	}
}

module.exports = MPC_obj;