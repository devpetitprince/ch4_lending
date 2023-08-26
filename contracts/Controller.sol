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

    TestToken public stableCoin;
    mapping(address => uint) public borrowStableBalance;

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
        require(!markets[cToken].isListed, "already listed!");

        markets[cToken].isListed = true;
        markets[cToken].collateralFactor = 0.6e18;

        for (uint i=0; i<allMarkets.length; i++) {
            require(allMarkets[i] != CToken(cToken), "market already added!");
        }
        allMarkets.push(CToken(cToken));
    }

    // 담보 목록에 추가
    function enterMarket(address cToken) external {
        require(markets[cToken].isListed, "not listed");
        Market storage market = markets[cToken];
        
        if (market.accountMembership[msg.sender]) return;   // already entered
        
        market.accountMembership[msg.sender] = true;
        accountAssets[msg.sender].push(CToken(cToken));
    }

    // 담보 목록에서 제거
    function exitMarket(address cToken) external {
        Market storage market = markets[cToken];

        uint borrowAmount = CToken(cToken).accountBorrow(msg.sender);
        require(borrowAmount == 0, "non-zero borrow amount");
        
        if (!market.accountMembership[msg.sender]) return;  // already exited
        
        market.accountMembership[msg.sender] = false;

        // remove from accountAssets
        CToken[] memory userAssetList = accountAssets[msg.sender];
        uint assetIndex = userAssetList.length;
        for (uint i = 0; i < userAssetList.length; i++) {
            if (userAssetList[i] == CToken(cToken)) {
                assetIndex = i;
                break;
            }
        }
        
        require(assetIndex < userAssetList.length, "cannot find market");
        
        CToken[] storage userAssetListStored = accountAssets[msg.sender];
        userAssetListStored[assetIndex] = userAssetListStored[userAssetListStored.length - 1];
        userAssetListStored.pop();
    }

    function setPrice(address underlyingToken, uint price) external {
        tokenPrices[underlyingToken] = price;
    }

    function setStableCoin(address _stableCoin) external {
        stableCoin = TestToken(_stableCoin);
    }

    // Checks
    // Mint 가능한 상태인지 체크
    function mintAllowed(address cToken) external view returns (bool) {
        return markets[cToken].isListed;
    }

    // Redeem 가능한 상태인지 체크
    function redeemAllowed(address cToken, address redeemer, uint redeemAmount) external view returns (bool) {
        if (!markets[cToken].isListed) return false;

        if(!markets[cToken].accountMembership[redeemer]) return false;

        // liquidity check
        (, uint shortfall) = checkAccountliquidity(redeemer, cToken, redeemAmount, 0);
        if (shortfall > 0) return false;


        return true;
    }

    // Borrow 가능한 상태인지 체크
    function borrowAllowed(address cToken, address borrower, uint borrowAmount) external view returns (bool) {
        if (!markets[cToken].isListed) return false;

        // Compund에서는 enterMarket을 자동으로 해주지만 여기선 생략
        if(!markets[cToken].accountMembership[borrower]) return false;

        // BorrowCap check 생략

        // BorrowAmount만큼 대출할 수 있는지 유동성 검사
        (, uint shortfall) = checkAccountliquidity(borrower, cToken, 0, borrowAmount);
        if (shortfall > 0) return false;

        return true;
    }

    // Repay 가능한 상태인지 체크
    function repayAllowed(address cToken) external view returns (bool) {
        return markets[cToken].isListed;
    }


    // User가 redeem, borrow 했을 때 (대출 가능한 유동성 가치, 부족한 총 담보 가치)
    function checkAccountliquidity(address account, address cToken, uint redeemAmount, uint borrowAmount) public view returns (uint liquidity, uint shortfall) {
        uint sumCollateral;
        uint sumBorrow;

        // For each user's asset
        CToken[] memory assets = accountAssets[account];
        for (uint i=0; i<assets.length; i++) {
            CToken asset = assets[i];

            // get account's info
            uint cTokenBalance = asset.balanceOf(account);
            uint borrowBalance = asset.accountBorrow(account);

            // get cToken exchangeRate
            uint exchangeRate = asset.getExchangeRate();

            // get underlyingToken price
            uint tokenPrice = tokenPrices[asset.underlyingToken()];

            // pre-compute conversion factor
            uint tokensToDenom = ((markets[address(asset)].collateralFactor * exchangeRate) * tokenPrice) / 1e36;

            // sumCollateral += tokensToDenom * cTokenBalance
            sumCollateral = sumCollateral + (tokensToDenom * cTokenBalance / 1e18);

            // sumBorrow += tokenPrice * borrowBalance
            sumBorrow = sumBorrow + (tokenPrice * borrowBalance / 1e18);
            if (address(asset) == cToken) {
                // check redeem effect
                sumBorrow = sumBorrow + (tokensToDenom * redeemAmount / 1e18);
                
                // check borrow effect
                sumBorrow = sumBorrow + (tokenPrice * borrowAmount / 1e18);
            }
        }
        
        // add stableCoin borrow (assume stableCoin as $1)
        sumBorrow += borrowStableBalance[account];

        // check account liquidity
        if (sumCollateral > sumBorrow) {
            return (sumCollateral - sumBorrow , 0);
        } else {
            return (0, sumBorrow - sumCollateral);
        }
    }

    function borrowStable(uint amount) external {
        (uint liquidity, ) = checkAccountliquidity(msg.sender, address(0), 0, 0);
        require(liquidity >= amount, "exceed borrowable amount");

        borrowStableBalance[msg.sender] += amount;
        stableCoin.mint(msg.sender, amount);
    }

    function repayStable(uint amount) external {
        require(borrowStableBalance[msg.sender] >= amount, "invalid amount");

        borrowStableBalance[msg.sender] -= amount;
        stableCoin.burn(msg.sender, amount);
    }
}