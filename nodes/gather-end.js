module.exports = function(RED) {
    function GatherEndNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			msg.payload.twiml += '</Gather>';
			msg.payload.twiml += '<Redirect method="POST">' + msg.session.baseUrl + '/router</Redirect>';
			node.send(msg);
	    });
    }
    RED.nodes.registerType("gather-end",GatherEndNode);
}