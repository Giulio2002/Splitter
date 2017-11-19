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

  describe("Attacker verification", function() {

      var i;

      let bal = alice.balance;

      for (i = 0; i < 500; i+=13) {

          it("The contract shouldn't have trapped with msg.value " + i, function() {

              instance.split.sendTransaction({
                  from: alice,
                  value: i
              })
              .catch(function() {

                  return instance.contractBalance.call()

              })
              .then(function(balance) {
                  if (i % 2 == 0 || i == 0)
                      assert.equal(balance.toNumber(), 0, "The contract balance is 0 at " + i)
                  else

                    if(bal > alice.balance) assert(false,"The balance is assigned correctly")
              })
          });
      }
  });
});
