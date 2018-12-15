module.exports = function(RED) {
    function DialNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			var global = node.context().global;
			msg.session = global.get("sessions")[msg.payload.CallSid];
            delete msg.session.recordingStatus;
            
			msg.payload.twiml += '<Dial';
		    if (config.action.length > 0) {
		    	msg.payload.twiml += ' action="' + config.action + '"';
		    }
	    	msg.payload.twiml += ' record="' + config.record + '"';

		    if (config.recordingStatusCallback.length > 0) {
		    	msg.payload.twiml += ' recordingStatusCallback="' + config.recordingStatusCallback + '"';
		    }
		    msg.payload.twiml += '>';
		    msg.payload.twiml += config.number;
			msg.payload.twiml += '</Dial>';
			node.send(msg);
		});
    }
    RED.nodes.registerType("dial",DialNode);
}