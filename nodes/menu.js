module.exports = function(RED) {

    function randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        //The maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function createMenuItem(msg, node, voice, audioURL, item) {
        var twiml = "";

        if (item.prependFor) {
            if (voice == 'man') {
                // for man's voice, there are 3 recorded variations of 'for', which makes it sound more natural.
                var r = randomInt(1, 4); // for1.mp3 - for3.mp3
                twiml += '<Play>' + audioURL + 'for' + r + '.mp3</Play>';
            } else {
                twiml += '<Say voice="woman">For</Say>';
            }
        }
        if (item.op == 'play') {
            twiml += '<Play>' + audioURL + item.content + '</Play>';
        }
        if (item.op == 'say') {
            twiml += '<Say voice="' + voice + '">' + item.content + '</Say>';
        }
        if (item.key != 'none') {
          if (item.action == 'press') {
            if (voice == 'man') {
                // for man's voice, use pre-recorded "press N" files to sound more natural
                var numURL = audioURL + 'press' + item.key + '.mp3';
                twiml += '<Play>' + numURL + '</Play>';
            } else {
                var numPhrase = 'press ' + item.key;
                twiml += '<Say voice="woman">' + numPhrase + '</Say>';
            }
          } 
          if (item.action == 'pressOrSay') {
            twiml += '<Say voice="' + voice + '">press or say ' + item.key + '</Say>';
          }
        }
        if (item.speech != '') {
          twiml += '<Say voice="' + voice + '">';
          if (item.key != 'none') {
            twiml += 'or ';
          }
          twiml += 'say ' + item.speech + '</Say>';
        }

        if (!msg.session.menuMap) {
            msg.session.menuMap = {};
        }
        if (item.key != 'none') {
          msg.session.menuMap[item.key] = item;
        }
        if (item.speech != '') {
          msg.session.menuMap[item.speech] = item;
        }

        return twiml;
      }

    function createMenu(msg, node, voice, audioURL, items) {
        var twiml = "";
        for(var i=0;i<items.length;i++) {
            twiml += createMenuItem(msg, node, voice, audioURL, items[i]);
        }
        return twiml;
    }

    function MenuNode(config) {
        RED.nodes.createNode(this, config);
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
            if (config.sayName) {
                msg.payload.twiml += '<Say voice="' + config.voice + '">';
                msg.payload.twiml += config.name;
                msg.payload.twiml += '</Say>';
            }
            msg.payload.twiml += createMenu(msg, node, config.voice, this.baseUrlString, config.items);
            node.send(msg);
        });
    }
    RED.nodes.registerType("menu", MenuNode);
};
