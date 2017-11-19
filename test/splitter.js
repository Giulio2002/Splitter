var Splitter = artifacts.require("./Splitter.sol");
import {
    default as Promise
} from 'bluebird';



if (typeof web3.eth.getBlockPromise !== "function") {
    Promise.promisifyAll(web3.eth, {
        suffix: "Promise"
    });
}


contract('Splitter', function(accounts) {

    var owner = accounts[0];
    var alice = accounts[1];
    var bob = accounts[2];
    var carol = accounts[3];

    let instance;

    beforeEach("should deploy a new instance", function() {
        return Splitter.new(alice, bob, carol, {
                from: owner
            })
            .then(_instance => instance = _instance);
    });
    describe("Accounts verification", function() {
        it("should assign the right account to the right variables", function() {

            return instance.getAddresses.call().then(function(members) {

                assert.equal(members.valueOf()[0], owner, "the owner haven't been assigned correctly");

                assert.equal(members.valueOf()[1], alice, "alice haven't been assigned correctly");

                assert.equal(members.valueOf()[2], bob, "bob haven't been assigned correctly");

                assert.equal(members.valueOf()[3], carol, "carol haven't been assigned correctly");

            });
        });

    });

    describe("Security Verification", function() {

        var i;

        let bal = alice.balance;

        for (i = 0; i < 500; i += 13) {

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

                        if (bal > alice.balance) assert(false, "The balance is assigned correctly")
                    })
            });
        }
    });
    describe("reevert tests", function() {


        it("The function should throw with msg.value: 0", function() {

            return instance.split({
                    from: alice,
                    value: 0
                })
                .then(function(txObj) {

                    assert(false, "split was supposed to throw but didn't.");

                }).catch(function(error) {
                    //console.log(error);
                    assert.isAtLeast(error.toString().indexOf("invalid opcode"), 0);
                    assert(true, "split should throw " + error);
                });
        });
        it("The function shouldn't have trapped with msg.value not divisible by two", function() {

            return instance.split({
                    from: alice,
                    value: 1
                })
                .then(function(txObj) {

                    assert(false, "split was supposed to throw but didn't.");

                }).catch(function(error) {
                  console.log(error);
                    assert.isAtLeast(error.toString().indexOf("invalid opcode"), 0);
                    assert(true, "split should throw " + error);
                });
        });

        it("The function shouldn't be called from someone who isn't alice", function() {

            return instance.split({
                    from: carol,
                    value: 2
                })
                .then(function(txObj) {

                    assert(false, "split was supposed to throw but didn't.");

                }).catch(function(error) {
                    assert.isAtLeast(error.toString().indexOf("invalid opcode"), 0);
                    //assert(true, "split should throw " + error);
                });
        });
    });

    describe("Payment Verifications", function() {
        it("The function should assign the correct amount of wei to bob", function() {
            let val = 100;
            let expectedBobBalance;


            return web3.eth.getBalancePromise(bob)
                .then(function(balance) {

                    expectedBobBalance = web3.toBigNumber(balance).add(val / 2);

                    return instance.split({
                        from: alice,
                        value: val
                    })
                })
                .then(function(txObj) {
                    return web3.eth.getBalancePromise(bob)
                })
                .then(function(balance) {


                    let newBobBalance = web3.toBigNumber(balance);
                    // console.log(expectedBobBalance);
                    // console.log(newBobBalance);
                    assert.equal(newBobBalance.toString(10), expectedBobBalance.toString(10), "bob hasn't received the correct amount of wei");

                })
        })
        it("The function should assign the correct amount of wei to carol", function() {
            let val = 100;
            let expectedCarolBalance;


            return web3.eth.getBalancePromise(carol)
                .then(function(balance) {

                    expectedCarolBalance = web3.toBigNumber(balance).add(val / 2);

                    return instance.split({
                        from: alice,
                        value: val
                    })
                })
                .then(function(txObj) {
                    return web3.eth.getBalancePromise(carol)
                })
                .then(function(balance) {


                    let newCarolBalance = web3.toBigNumber(balance);
                    // console.log(expectedCarolBalance);
                    // console.log(newCarolBalance);
                    assert.equal(newCarolBalance.toString(10), expectedCarolBalance.toString(10), "carol hasn't received the correct amount of wei");

                })
        })
    })
});
