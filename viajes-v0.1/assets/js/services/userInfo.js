app.service('userInfo',['$rootScope','$http','$cookieStore', function($rootScope,$http,$cookieStore	) {

    this.init = function(){
        this.cookieName = 'mte.funcionarios.comparador';
        //$cookieStore.put(this.cookieName,false);
        this.listeners = [];
        this.getFuncionarios();
    }
    /*this.getCCTs = function(type){
        type = type || 'selected';
        var ccts = [];
        this.funcionarios[type].forEach(function(school){
            ccts.push(school.cct);
        });
        return ccts;
    }*/
    this.getFuncionarios = function(){
        this.funcionarios = $cookieStore.get(this.cookieName) || {visited:[],selected:[]};
        return this.funcionarios;
    }
    this.toggleFuncionario = function(funcionario){
    	this.addFuncionario(funcionario,this.funcionarios.selected,true);
    	$cookieStore.put(this.cookieName,this.funcionarios);
        this.emit('userInfo.funcionariosChange');
    }
    this.visitFuncionario = function(funcionario){
    	this.addFuncionario(funcionario,this.funcionarios.visited,false);
    	$cookieStore.put(this.cookieName,this.funcionarios);
        this.emit('userInfo.funcionariosChange');
    }
    this.isSelected = function(funcionario){
    	return this.indexOf(funcionario,this.funcionarios.selected) >= 0;
    }
    this.hasSelected = function(){
    	return this.funcionarios.selected.length > 0;
    }
    this.addFuncionario = function(funcionario,array,toggle){
    	var index = this.indexOf(funcionario,array);
    	if(index < 0){
    		array.push({
    			id : funcionario.id,
    			nombre: funcionario.nombre_completo,
    		});
    	}else if(toggle)	
    		array.splice(index,1);
    	return array;
    }
    this.addListener = function(scope){
        this.listeners.push(scope);
    }
    this.indexOf = function(funcionario,array){
    	for(var i=0;i<array.length;i++){
    		if(array[i].id == funcionario.id) return i;
    	}
    	return -1;
    }
    this.emit = function(event,data){
        this.listeners.forEach(function(listener){
            //console.log('emmiting '+event);
            listener.$emit(event,data);
        });
    }
    this.init();    
    
}]);
