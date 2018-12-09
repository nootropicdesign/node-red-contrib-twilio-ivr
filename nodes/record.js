module.exports = function(RED) {
    function RecordNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		node.on('input', function(msg) {
			var global = node.context().global;
			msg.session = global.get("sessions")[msg.payload.CallSid];
            delete msg.session.recordingStatus;
            
			msg.payload.twiml += '<Record';
		    if (config.action.length > 0) {
		    	msg.payload.twiml += ' action="' + config.action + '"';
		    }
		    if (config.maxLength.length > 0) {
		    	msg.payload.twiml += ' maxLength="' + config.maxLength + '"';
		    }
		    if (config.timeout.length > 0) {
		    	msg.payload.twiml += ' timeout="' + config.timeout + '"';
		    }
	    	msg.payload.twiml += ' playBeep="' + config.beep + '"';
		    if (config.finishOnKey.length > 0) {
		    	msg.payload.twiml += ' finishOnKey="' + config.finishOnKey + '"';
		    }


		    if (config.recordingStatusCallback.length > 0) {
		    	msg.payload.twiml += ' recordingStatusCallback="' + config.recordingStatusCallback + '"';
		    }


			msg.payload.twiml += ' />';
			node.send(msg);
		});
    }
    RED.nodes.registerType("record",RecordNode);
}