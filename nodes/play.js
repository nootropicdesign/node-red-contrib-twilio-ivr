module.exports = function(RED) {

	function AudioBaseURLNode(config) {
        RED.nodes.createNode(this,config);
        this.url = config.url;
        this.name = config.name;
    }
    RED.nodes.registerType("audio-baseurl",AudioBaseURLNode);


    function PlayNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		this.baseUrl = RED.nodes.getNode(config.baseurl);
		if (this.baseUrl) {
            this.baseUrlString = this.baseUrl.url;
            if ((this.baseUrlString.length > 0) && (!this.baseUrlString.endsWith('/'))) {
            	this.baseUrlString += '/';
            }
        } else {
        	this.baseUrlString = "";
        }
		node.on('input', function(msg) {
			var twiml = '<Play>';
			twiml += this.baseUrlString;
			if (config.url.length > 0) {
				twiml += config.url;
			} else {
				if ((msg.payload.play) && (msg.payload.play.length > 0)) {
					twiml += msg.payload.play;
					delete msg.payload.play;
				} else {
			 		twiml += " ";
				}
			}
			twiml += '</Play>';
			msg.payload.twiml += twiml;
			node.send(msg);
	    });
    }
    RED.nodes.registerType("play",PlayNode);
}