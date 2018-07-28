var auth = require('./authServiceAccount.js');

var ga;
let authServiceAccount = new auth('/mnt/c/Users/mihai.dunareanu/Documents/credentials/contactcenter-1f713-a2ed0e617515.json', ['https://www.googleapis.com/auth/cloud-platform']);
authServiceAccount.init(function (a) {
  ga = a;
});
