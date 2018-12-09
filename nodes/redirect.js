module.exports = function(RED) {
    function RedirectNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			var url = config.url;
			if (url == "") {
			    url = msg.topic;
			}
			msg.payload.twiml += '<Redirect method="' + config.method + '">' + url + '</Redirect>';
			node.send(msg);
	    });
    }
    RED.nodes.registerType("redirect",RedirectNode);
}
