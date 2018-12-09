module.exports = function(RED) {
    function GatherBeginNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			// Get session and store on msg for convenience.
			var global = node.context().global;
			msg.session = global.get("sessions")[msg.payload.CallSid];

			if (!msg.payload.twiml) msg.payload.twiml = "";
		    msg.payload.twiml += '<Gather action="' + config.action + '" input="' + config.input + '" timeout="' + config.timeout + '"';
		    if (config.numDigits.length > 0) {
		    	msg.payload.twiml += ' numDigits="' + config.numDigits + '"';
		    }
		    if (config.speechHints.length > 0) {
		    	msg.payload.twiml += ' hints="' + config.speechHints + '"';
		    }
		    if (config.speechTimeout.length > 0) {
		    	msg.payload.twiml += ' speechTimeout="' + config.speechTimeout + '"';
		    }
		    msg.payload.twiml += '>';
		    msg.session.menuMap = {}; // clear menu map

			node.send(msg);
		});
    }
    RED.nodes.registerType("gather-begin",GatherBeginNode);
}