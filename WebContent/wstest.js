$(function(){
	if ("WebSocket" in window)
    {
//       alert("您的浏览器支持 WebSocket!");
       
       // 打开一个 web socket
//       var ws = new WebSocket("ws://10.40.24.88:9100");
//       var ws = new WebSocket("ws://echo.websocket.org");
//       
//       ws.onopen = function()
//       {
//          // Web Socket 已连接上，使用 send() 方法发送数据
////          ws.send("^XA ^FO100,200^BY8,3.0,240^BCR,,Y,N,N^FDWA1234567890^FS ^XZ");
//          alert("已连接...");
//       };
//        
//       ws.onmessage = function (evt) 
//       { 
//          var received_msg = evt.data;
//          alert("数据已接收...");
//       };
//       
//       ws.onerror = function(event){
//    	   alert("错误..."); 
//       };
//       
//       ws.onclose = function()
//       { 
//          // 关闭 websocket
//          alert("连接已关闭..."); 
//       };
//    }else
//       {
//          // 浏览器不支持 WebSocket
//          alert("您的浏览器不支持 WebSocket!");
//       };
//        Add In Git Hub Test
       var hostname = '10.40.24.189',
	       port = 8081,  
	       clientId = 'client-xxx',  
	       timeout = 5,  
	       keepAlive = 60,  
	       cleanSession = false,  
	       ssl = false,  
	       userName = 'cie',  
	       password = 'Golde',  
	       topic = 'NetworkPrint',
	       errTopic = "PRN_ERR";  
	   var client = new Paho.MQTT.Client(hostname, port, clientId);  
	   //建立客户端实例  
	   var options = {  
	       invocationContext: {  
	           host : hostname,  
	           port: port,  
	           path: client.path,  
	           clientId: clientId  
	       },  
	       timeout: timeout,  
	       keepAliveInterval: keepAlive,  
//	       cleanSession: cleanSession,  
//	       useSSL: ssl,  
	       userName: userName,  
	       password: password,  
	       onSuccess: onConnect,  
	       onFailure: function(e){  
	           console.log(e);  
	       }  
	   };  
	   
	   var json = '{"Task_ID":"1","Printer_Addr":"10.20.24.88","Printer_Port":9100,"ZPL":"^XA ^FO100,200^BY8,3.0,240^BCR,,Y,N,N^FDWA1234567890^FS ^XZ"}';
	      
	   function onConnect() {  
	       console.log("onConnected");
	       client.subscribe(topic);	       
	       client.subscribe(errTopic);	 
	   }
	   
	   client.onConnectionLost = onConnectionLost;   
	    
       client.onMessageArrived = onMessageArrived;  
        
       function onConnectionLost(responseObject) {  
           console.log(responseObject);
           if (responseObject.errorCode !== 0) {  
               console.log("onConnectionLost:"+responseObject.errorMessage);  
               console.log("连接已断开");  
           }  
       } 
       
       function onMessageArrived(message) {  
           console.log("收到消息:"+message.payloadString);  
       }  
       
       function send(){
    	   
       }
       
       client.connect(options);

    }
	
    $("#btn").click(function (){
//    	if(ws){
//	   	   ws.send("^XA ^FO100,200^BY8,3.0,240^BCR,,Y,N,N^FDWA1234567890^FS ^XZ");
////    	   	   ws.send(); 
//	      }
    	
    	if(client){
    		if(client.isConnected){
    		   message = new Paho.MQTT.Message(json);
		       message.destinationName = topic;
//    		       message.qos = 2;
		       client.send(message);
		       console.log("sent");
		       message2 = new Paho.MQTT.Message("test");
		       message2.destinationName = errTopic;
		       client.send(message);
		       console.log("sent2");
            }
    	}
    });
    
      
});


