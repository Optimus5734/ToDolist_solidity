// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract toDo{
    struct TheList{
        string name;
        string message;
        uint256 timestamp;
        address from;
    }

    TheList[]theList;
    address payable owner; //owner is going to receive funds
    constructor(){
        owner=payable (msg.sender);
    }
    function createToDo(string calldata name,string calldata message) external payable {
        require(msg.value>0,"You dont have sufficient balance to execute this contract");
        owner.transfer(msg.value);
        theList.push(TheList(name,message,block.timestamp,msg.sender));
    }
    function gettheList() public view returns(TheList[] memory){
        return theList;
    }


}