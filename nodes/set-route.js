module.exports = function(RED) {
    function SetRouteNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			// Get session and store on msg for convenience.
			var global = node.context().global;
			msg.session = global.get("sessions")[msg.payload.CallSid];
			msg.session.nextRoute = config.route || msg.topic;

			node.send(msg);
		});
    }
    RED.nodes.registerType("set-route",SetRouteNode);
}