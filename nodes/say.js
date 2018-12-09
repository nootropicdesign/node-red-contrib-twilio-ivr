module.exports = function(RED) {
    function SayNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			msg.payload.twiml += '<Say voice="' + config.voice + '">';
			if (config.phrase.length > 0) {
				msg.payload.twiml += config.phrase;
			} else {
				if ((msg.payload.say) && (msg.payload.say.length > 0)) {
					msg.payload.twiml += msg.payload.say;
					delete msg.payload.say;
				} else {
					msg.payload.twiml += " ";
				}
			}
			msg.payload.twiml += '</Say>';
			node.send(msg);
	    });
    }
    RED.nodes.registerType("say",SayNode);
}