"use strict";
const { GoogleToken } = require('gtoken');
//keyFile: '../credentials/contactcenter-1f713-a2ed0e617515.json',
//scope: ['https://www.googleapis.com/auth/cloud-platform'] // or space-delimited string of scopes

class authServiceAccount {

constructor (keyFilePath, scopes) {
  //this.scopes = scopes.toString().replace(/\\/g, "");
  //this.scopes = JSON.stringify(scopes.toString().split(','));
  this.scopes = scopes;
  this.gtoken = new GoogleToken({keyFile: keyFilePath, scope: this.scopes});
}

init (callback) {
  this.gtoken.getToken(function(err, token) {
  if (err) {
    console.log(err);
    return;
  }
  callback(token);
});
}

/*refreshToken(node) {
  if (!this.start || (Date.now() - this.start) >= 1500000)
    authServiceAccount.refresh(node);
}*/
refreshToken(node) {
  if (this.gtoken.hasExpired())
    authServiceAccount.refresh(node);
}

static refresh(node) {
  var creds = node.credentials;
  var serviceauth = new authServiceAccount(creds.keyFilePath, creds.scopes);
  serviceauth.init(function (a) {
    node.context().flow.set("serviceauth", serviceauth);
    node.context().flow.set("token", a);
  });
  console.log("Refreshed service account Token");
}

}

module.exports = authServiceAccount;
