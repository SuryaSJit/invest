pragma solidity ^0.8.0;

import "./Token.sol";


contract Planner {
    Token public token;
   

    constructor(Token _token) public {
        
        token = _token;
       
    }


    struct user{
        uint user_amount;
        uint total_amount;
        uint invested_time;
        uint releasing_time;
                

    }
    mapping(address => user) public investor;

    function rateOfInterest(uint _amount , uint _duration) public  {

        uint interest;
        uint total_interest;
        uint duration = _duration;
        uint amount = _amount;

        if(duration == 3 ){
            interest = amount/100;
        }
        else if(duration == 6){
            interest = (amount*2)/100;
        }
        else if(duration == 9){
            interest = (amount*3)/100;
        }
        else{
            interest = (amount*4)/100;
        }

        total_interest = interest*duration;

        investor[msg.sender].user_amount=amount;

        investor[msg.sender].total_amount=amount+total_interest;

        token.transferFrom(msg.sender, address(this), amount);

        investor[msg.sender].invested_time=block.timestamp;

        investor[msg.sender].releasing_time=(block.timestamp)+(2592000*duration);
        
    }

    function withdrawl() external {

        require(investor[msg.sender].total_amount != 0, "You have not invested");
        require(investor[msg.sender].releasing_time<block.timestamp,"You are under maturity period!!");
        token.transfer(msg.sender,investor[msg.sender].total_amount);


    }
    

}