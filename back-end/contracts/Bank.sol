// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

error Bank__NotEnoughFundsProvided();
error Bank__NotEnoughEthersOnTheSC();
error Bank__WithdrawFailed();

contract Bank {
    mapping(address => uint256) public balances;

    event EtherDeposited(address indexed depositor, uint256 amount);
    event EtherWithdrawn(address indexed withdrawer, uint256 amount);

    function sendEthers() external payable {
        if (msg.value < 1 wei) {
            revert Bank__NotEnoughFundsProvided();
        }
        balances[msg.sender] += msg.value;
        emit EtherDeposited(msg.sender, msg.value);
    }

    function withdraw(uint256 _amount) external {
        if (_amount > balances[msg.sender]) {
            revert Bank__NotEnoughEthersOnTheSC();
        }
        balances[msg.sender] -= _amount;
        (bool received, ) = msg.sender.call{ value: _amount }("");
        if (!received) {
            revert Bank__WithdrawFailed();
        }
        emit EtherWithdrawn(msg.sender, _amount);
    }

    function getBalanceOfUser(address _user) external view returns (uint256) {
        return balances[_user];
    }
}