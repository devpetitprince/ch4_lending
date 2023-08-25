// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./interfaces/IERC20.sol";
import "./CToken.sol";
import "./TestToken.sol";
// import "hardhat/console.sol";

contract Controller {
    struct Market {
        bool isListed;
        uint collateralFactor;
        mapping(address => bool) accountMembership;
    }

    CToken[] public allMarkets;

    mapping(address => Market) public markets;
    mapping(address => CToken[]) public accountAssets;
    mapping(address => uint) public tokenPrices; // for tutorial

    // TODO stableCoin

    constructor () {}

    // View
    function marketLength() external view returns (uint) {
        return allMarkets.length;
    }

    function getAccountMembership(address cToken, address account) external view returns (bool) {
        return markets[cToken].accountMembership[account];
    }

    // Settings
    // Market 정보 등록
    function supportMarket(address cToken) external {
        // TODO implement
    }

    // 담보 목록에 추가
    function enterMarket(address cToken) external {
        // TODO implement
    }

    // 담보 목록에서 제거
    function exitMarket(address cToken) external {
        Market storage market = markets[cToken];

        // TODO borrowAmount == 0
        
        // TODO already exited
        
        // TODO set membership false

        // TODO remove from accountAssets
    }

    function setPrice(address underlyingToken, uint price) external {
        tokenPrices[underlyingToken] = price;
    }

    // TODO stableCoin
    function setStableCoin(address _stableCoin) external {}

    // Checks
    // Mint 가능한 상태인지 체크
    function mintAllowed(address cToken) external view returns (bool) {
        // TODO check listed

        return true;
    }

    // Redeem 가능한 상태인지 체크
    function redeemAllowed(address cToken, address redeemer, uint redeemAmount) external view returns (bool) {
        // TODO check listed
        
        // TODO check membership

        // TODO liquidity check

        return true;
    }

    // Borrow 가능한 상태인지 체크
    function borrowAllowed(address cToken, address borrower, uint borrowAmount) external view returns (bool) {
        // TODO check listed

        // TODO check membership

        // TODO liquidity check

        return true;
    }

    // Repay 가능한 상태인지 체크
    function repayAllowed(address cToken) external view returns (bool) {
        // TODO check listed

        return true;
    }


    // User가 redeem, borrow 했을 때 (대출 가능한 유동성 가치, 부족한 총 담보 가치)
    function checkAccountliquidity(address account, address cToken, uint redeemAmount, uint borrowAmount) public view returns (uint liquidity, uint shortfall) {
        uint sumCollateral;
        uint sumBorrow;

        // For each user's asset
        CToken[] memory assets = accountAssets[account];
        for (uint i=0; i<assets.length; i++) {
            CToken asset = assets[i];

            // TODO get account's info
            uint cTokenBalance;
            uint borrowBalance;

            // TODO get cToken exchangeRate
            uint exchangeRate;

            // TODO get underlyingToken price
            uint tokenPrice;

            // pre-compute conversion factor
            uint tokensToDenom = ((markets[address(asset)].collateralFactor * exchangeRate) * tokenPrice) / 1e36;

            // TODO sumCollateral += tokensToDenom * cTokenBalance
            sumCollateral;

            // TODO sumBorrow += tokenPrice * borrowBalance
            sumBorrow;
            if (address(asset) == cToken) {
                // TODO check redeem effect
                sumBorrow;
                
                // TODO check borrow effect
                sumBorrow;
            }
        }
        
        // TODO add stableCoin effect

        // check account liquidity
        if (sumCollateral > sumBorrow) {
            return (sumCollateral - sumBorrow , 0);
        } else {
            return (0, sumBorrow - sumCollateral);
        }
    }

    function borrowStable(uint amount) external {
        // TODO borrow stableCoin
    }

    function repayStable(uint amount) external {
        // TODO repay stableCoin
    }
}