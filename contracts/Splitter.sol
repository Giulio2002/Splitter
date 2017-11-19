pragma solidity ^0.4.10;

contract Splitter {

    address Owner;
    address Alice;
    address Bob;
    address Carol;

    function Splitter(address _Alice, address _Bob, address _Carol) public payable {
        Owner = msg.sender;
        if (_Alice == address(0) || _Bob == address(0) || _Carol == address(0)) revert();
        if (_Alice == _Bob || _Bob == _Carol || _Carol == _Alice) revert();
        Alice = _Alice;
        Bob   = _Bob;
        Carol = _Carol;
    }

    function () payable public {
      revert();
    }

    function getAddresses() constant public returns (address ,address,address,address) {

      return (Owner,Alice,Bob,Carol);

    }

    function split() payable public {

        require (msg.value > 0);

        require(msg.value % 2 == 0);

        require(msg.sender == Alice);

        Bob.transfer(msg.value/2);

        Carol.transfer(msg.value/2);

    }

    function killMe() public {
        if (msg.sender == Owner) {
            suicide(Owner);
        } else {
            revert();
        }
    }

    function contractBalance() public returns(uint){

      return this.balance;
    }

}
