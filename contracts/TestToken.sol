// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./ERC20Interfaces.sol";

contract TestToken is ERC20Interfaces {
    address public owner;
    address public minter;

    modifier onlyMinter() {
        require((minter != address(0) && msg.sender == minter) || msg.sender == owner, "!onlyMinter");
        _;
    }

    constructor (string memory name_, string memory symbol_) {
        owner = msg.sender;
        _name = name_;
        _symbol = symbol_;
        _decimal = 18;
    }

    function setMinter(address _minter) external {
        require(msg.sender == owner, "!onlyOwner");
        minter = _minter;
    }

    function mint(address to, uint amount) external onlyMinter {
        _mint(to, amount);
    }

    function burn(address to, uint amount) external onlyMinter {
        _burn(to, amount);
    }
}