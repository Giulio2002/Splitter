pragma solidity ^0.4.5;

contract Splitter {

    address private Owner;
    address private Alice;
    address private Bob;
    address private Carol;

    function Splitter(address _Alice, address _Bob, address _Carol) public payable {
        Owner = msg.sender;
        if (_Alice == address(0) || _Bob == address(0) || _Carol == address(0)) throw;
        if (_Alice == _Bob || _Bob == _Carol || _Carol == _Alice) throw;
        Alice = Alice;
        Bob   = Bob;
        Carol = Carol;
    }

    function () payable public {}

    function getAddress(bytes8 addressOwner) constant returns (address) {
        if (addressOwner == 'Owner') {
            return Owner;
        }
        if (addressOwner == 'Alice') {
            return Alice;
        }
        if (addressOwner == 'Bob') {
            return Bob;
        }
        if (addressOwner == 'Carol') {
            return Carol;
        } else {
            throw;
        }
    }

    function split() payable public {
        if (msg.value == 0) throw;
        if (msg.sender == Alice) {
            if (!Bob.send(msg.value/2)) throw;
            if (!pCarol.send(msg.value - msg.value/2)) throw;
        }else
          throw;
    }

    function killMe() public {
        if (msg.sender == Owner) {
            suicide(Owner);
        } else {
            throw;
        }
    }

}
