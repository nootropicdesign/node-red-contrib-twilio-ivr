module.exports = function(RED) {
    function PauseNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			msg.payload.twiml += '<Pause length="' + config.seconds + '"/>';
			node.send(msg);
	    });
    }
    RED.nodes.registerType("pause",PauseNode);
}