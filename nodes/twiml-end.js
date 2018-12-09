module.exports = function(RED) {
    function TwimlEndNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			msg.payload.twiml += '</Response>';
			msg.payload = msg.payload.twiml;
			if (msg.session) {
			    msg.session.lastRoute = msg.route;
			}
			node.send(msg);
	    });
    }
    RED.nodes.registerType("twiml-end",TwimlEndNode);
}