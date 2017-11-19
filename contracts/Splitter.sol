pragma solidity ^0.4.5;

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

        if (msg.value == 0) revert();

        if (msg.value % 2 != 0) revert();

        if (msg.sender == Alice) {
            if (!Bob.send(msg.value/2)) revert();
            if (!Carol.send(msg.value - msg.value/2)) revert();
        }else
          revert();
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
