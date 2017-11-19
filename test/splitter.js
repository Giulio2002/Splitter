var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function(accounts) {

    var owner = accounts[0];
    var alice = accounts[1];
    var bob = accounts[2];
    var carol = accounts[3];

    let instance;

    beforeEach("should deploy a new instance", function() {
        return Splitter.new(alice,bob,carol,{ from : owner })
            .then(_instance => instance = _instance);
    });
  describe("Accounts verification",function(){
  it("should assign the right account to the right variables", function() {

      return instance.getAddresses.call().then(function(members) {

      assert.equal(members.valueOf()[0],owner, "the owner haven't been assigned correctly");

      assert.equal(members.valueOf()[1],alice, "alice haven't been assigned correctly");

      assert.equal(members.valueOf()[2],bob, "bob haven't been assigned correctly");

      assert.equal(members.valueOf()[3],carol, "carol haven't been assigned correctly");

      });
    });

  });

  describe("Attacker verification",function(){
  var i;
  for(i = 0;i<500;i++){
  it("The contract shouldn't have trapped with msg.value " + i, function() {

      return instance.split.sendTransaction({from : alice, value : i}).then(function(members) {

        return instance.contractBalance.call()

      }).then(function(balance){

        assert.equal(balance,0,"The contract balance isn't 0 at " + i)
        })

      });
    }
  });
});
