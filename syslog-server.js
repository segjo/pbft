var request = require('request');
const SyslogServer = require("syslog-server");
const server = new SyslogServer();



server.on("message", (value) => {
    console.log(value.date);     // the date/time the message was received
    console.log(value.host);     // the IP address of the host that sent the message
    console.log(value.protocol); // the version of the IP protocol ("IPv4" or "IPv6")
    console.log(value.message);  // the syslog message
    
    
    var msg=value.date+" ("+value.host+"): "+value.message;
    request.post(
    	    'http://localhost:3000/transact',
    	    { form: { msg: msg } },
    	    function (error, response, body) {
    	        if (!error && response.statusCode == 200) {
    	            console.log(body);
    	        }
    	    }
    	);
    
});

server.start();



//Test mit
//echo "<14>sourcehost message text" | nc -v -u -w 0 192.168.1.68 514
//logger -n 192.168.1.68 dwadwadawawd -d