const authServiceAccount = require('./authServiceAccount.js');

module.exports = function(RED) {

    /*Login Node functionality*/
    function authSANode(config) {
        RED.nodes.createNode(this,config);

        this.on('input', function(msg) {
        	authServiceAccount.refresh(this);    // Authenticate session using provided credentials

            // Provide orchestrator object & token-refresh function to flow
            var serviceauth = this.context().flow.get("serviceauth");
            var token = this.context().flow.get("token");
            var node = this;
            this.context().flow.set('refreshToken', function() { serviceauth.refreshToken(node); });

            // Display connection status
            if (token) {
            	this.status({fill:"green",shape:"dot",text:"connected"});
            } else {
            	this.status({fill:"red",shape:"ring",text:"unsuccessful"});
            	this.error("Login Unsuccessful");
            }

            this.send({payload: token});  // Output status
        });
    }

    /*Store credentials*/
    RED.nodes.registerType("authSA", authSANode, {
    	credentials: {
         keyFilePath: {type: "text"},
    	   scopes: {type: "text"}
     }
    });
}
