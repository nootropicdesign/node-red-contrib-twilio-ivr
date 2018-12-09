module.exports = function(RED) {
    function HangupNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			msg.payload.twiml += '<Hangup/>';
			node.send(msg);
	    });
    }
    RED.nodes.registerType("hangup",HangupNode);
}