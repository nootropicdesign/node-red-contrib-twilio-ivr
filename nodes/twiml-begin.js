module.exports = function(RED) {
    function TwimlBeginNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			// Get session and store on msg for convenience.
			var global = node.context().global;
			var sessions = global.get("sessions"); 
			if (sessions) {
				msg.session = sessions[msg.payload.CallSid];
			}
			if (msg.session) {
				msg.baseUrl = msg.session.baseUrl;
			}

			msg.payload.twiml =  '<?xml version="1.0" encoding="UTF-8"?>';
			msg.payload.twiml += '<Response>';
			node.send(msg);
		});
    }
    RED.nodes.registerType("twiml-begin",TwimlBeginNode);
}