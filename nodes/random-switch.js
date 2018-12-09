module.exports = function(RED) {
    function RandomSwitchNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			var n = config.outputs;
			var f = Math.random() * n;
			var r = Math.floor(f);
			// create outputs array to send message to output r
			var outputArray = [];
			for(var i=0;i<n;i++) {
			    if (i == r) {
			        outputArray.push(msg);
			    } else {
			        outputArray.push(null);
			    }
			}
			node.send(outputArray);
	    });
    }
    RED.nodes.registerType("random-switch",RandomSwitchNode);
}