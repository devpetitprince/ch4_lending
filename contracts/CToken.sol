// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./ERC20Interfaces.sol";
import "./Controller.sol";

contract CToken is ERC20Interfaces {
    uint public totalBorrow; //total borrow amount
    mapping (address => uint) public accountBorrow;

    address public underlyingToken;
    Controller public controller;

    constructor (
        address _controller,
        address _underlying,
        string memory name_,
        string memory symbol_,
        uint8 decimal_
    ) {
        controller = Controller(_controller);
        underlyingToken = _underlying;

        _name = name_;
        _symbol = symbol_;
        _decimal = decimal_;
    }

    function getCash() public view returns (uint) {
        return IERC20(underlyingToken).balanceOf(address(this));
    } 

    function getExchangeRate() public view returns (uint) {
        // (underlyingToken balance + borrow amount) / totalSupply
        uint _totalSupply = totalSupply();
        if (_totalSupply == 0) return 1e18; // 1:1

        return (getCash() + totalBorrow) * 1e18 / _totalSupply;
    }

    function setController(address _controller) external {
        controller = Controller(_controller);
    }

    // underlyingToken -> cToken
    // Sender supplieds assets into the market and receives cTokens in exchange
    function mint(uint amount) external {
        require(controller.mintAllowed(address(this)), "!mintAllowed");

        uint exchangeRate = getExchangeRate();

        // TODO get mintAmount
        uint mintAmount = amount * 1e18 / exchangeRate;
        _mint(msg.sender, mintAmount);

    }
    
    // cToken -> underlyingToken
    // User redeems cTokens in exchange for the underlying asset
    function redeem(uint tokenAmount) external {
        // redeemAmount = cToken amount * exchangeRate
        uint exchangeRate = getExchangeRate();
        uint redeemAmount = tokenAmount * exchangeRate / 1e18;
        require(controller.redeemAllowed(address(this), msg.sender, tokenAmount), "!redeemAllwed");
        require(getCash() >= redeemAmount, "!Liquidity");

        _burn(msg.sender, tokenAmount);
        IERC20(underlyingToken).transfer(msg.sender, redeemAmount);
    }

    function redeemUnderlying(uint redeemAmount) external {
        // redeemAmount = cToken amount * exchangeRate
        // cToken amount = redeemAmount / exchangeRate

        uint exchangeRate = getExchangeRate();
        uint tokenAmount = redeemAmount * 1e18 / exchangeRate;

        require(controller.redeemAllowed(address(this),msg.sender, tokenAmount),"!redeemAllowed");

        _burn(msg.sender, tokenAmount);
        IERC20(underlyingToken).transfer(msg.sender, redeemAmount);
    }

    // Users borrow assets from the protocol to their own address
    function borrow(uint amount) external {
        require(controller.borrowAllowed(address(this), msg.sender, amount), "!borrowAllowed");
        require(getCash() >= amount, "Liquidity");
        
        // TODO update debt info
        totalBorrow += amount;
        accountBorrow[msg.sender] += amount;
        IERC20(underlyingToken).transfer(msg.sender, amount);
    }

    // Sender repays their own borrow
    function repay(uint amount) external {
        require(controller.repayAllowed(address(this)), "!repayAllowed");

        // TODO fix repayAmount
        // amount == uint.max -> repayAll
        uint repayAmount = amount == type(uint).max? accountBorrow[msg.sender]: amount;

        // TODO update debt info
        IERC20(underlyingToken).transferFrom(msg.sender, address(this), repayAmount);

        totalBorrow -= repayAmount;
        accountBorrow[msg.sender] -= repayAmount;
    }

    // Test purpose only - pour interest
    function pourInterest(uint amount) external {
        IERC20(underlyingToken).transferFrom(msg.sender, address(this), amount);
    }
}