import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"
import { ethers } from "hardhat"
import { BigNumber, Contract } from "ethers"
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import utils from "./utils"

describe("Controller Test", function () {
    let fish: Contract, whale: Contract, stable: Contract
    let cFISH: Contract, cWHALE: Contract
    let controller: Contract
    let deployer: SignerWithAddress, user: SignerWithAddress
    
    async function initTest() {
        [deployer, user] = await ethers.getSigners()

        const tokenFactory = await ethers.getContractFactory("TestToken")
        fish = await tokenFactory.deploy("FISH token", "FISH")
        whale = await tokenFactory.deploy("WHALE token", "WHALE")
        
        const controllerFactory = await ethers.getContractFactory("Controller")
        controller = await controllerFactory.deploy()
        
        const cTokenFactory = await ethers.getContractFactory("CToken")
        cFISH = await cTokenFactory.deploy(controller.address, fish.address, "Market FISH", "cFISH", 18)
        cWHALE = await cTokenFactory.deploy(controller.address, whale.address, "Market WHALE", "cWHALE", 18)
        
        await fish.mint(deployer.address, utils.toEther(1000000))
        await whale.mint(deployer.address, utils.toEther(100000))
        await fish.mint(user.address, utils.toEther(10000))
        await whale.mint(user.address, utils.toEther(1000))

        await fish.connect(user).approve(cFISH.address, utils.MAX_UINT)
        await whale.connect(user).approve(cWHALE.address, utils.MAX_UINT)
        await fish.connect(deployer).approve(cFISH.address, utils.MAX_UINT)
        await whale.connect(deployer).approve(cWHALE.address, utils.MAX_UINT)
    }
    beforeEach(async () => {
        await initTest()
    })
    
    describe("Manage Markets", async () => {
        it("supportMaket", async () => {
            const beforeNumMarket = await controller.marketLength()
            await controller.supportMarket(cFISH.address)
            const afterNumMarket = await controller.marketLength()
            
            // TODO check expected results when execute supportMarket again
        })
        it("supportMaket: revert if duplicated", async () => {
            await controller.supportMarket(cFISH.address)
            
            // TODO check expected results when execute supportMarket again
        })
        it("enterMarket", async () => {
            await controller.supportMarket(cFISH.address)
            
            const membershipBefore = await controller.getAccountMembership(cFISH.address, user.address)
            await controller.connect(user).enterMarket(cFISH.address)
            const membershipAfter = await controller.getAccountMembership(cFISH.address, user.address)
            const userAsset = await controller.accountAssets(user.address, 0)
            
            // TODO check expected results when execute enterMarket
        })
        it("exitMarket", async () => {
            await controller.supportMarket(cFISH.address)
            await controller.connect(user).enterMarket(cFISH.address)
            
            const membershipBefore = await controller.getAccountMembership(cFISH.address, user.address)
            await controller.connect(user).exitMarket(cFISH.address)
            const membershipAfter = await controller.getAccountMembership(cFISH.address, user.address)

            // TODO check expected results when execute exitMarket
        })
        it("exitMarket: revert if remain borrow", async () => {
            await controller.supportMarket(cFISH.address)
            await controller.setPrice(fish.address, utils.UNIT.mul(10)) // 1 FISH = $10
            
            // TODO mint cFISH and borrow FISH
            
            // TODO check expected results when execute exitMarket with remaining debt
        })
    })

    describe("Check allowance", async () => {
        beforeEach(async () => {
            await controller.supportMarket(cFISH.address)
            await controller.supportMarket(cWHALE.address)
            
            await controller.setPrice(fish.address, utils.UNIT.mul(10)) // 1 FISH = $10
            await controller.setPrice(whale.address, utils.UNIT.mul(50)) // 1 WHALE = $50

            // deployer enter the markets
            await controller.connect(deployer).enterMarket(cFISH.address)
            await controller.connect(deployer).enterMarket(cWHALE.address)

            // deployer supply liquidity
            await cFISH.connect(deployer).mint(utils.toEther(1000))     // $10,000
            await cWHALE.connect(deployer).mint(utils.toEther(1000))    // $50,000
            
            // user enter the markets
            await controller.connect(user).enterMarket(cFISH.address)
            await controller.connect(user).enterMarket(cWHALE.address)

            // user supply liquidity
            await cFISH.connect(user).mint(utils.toEther(100))  // $1,000
            await cWHALE.connect(user).mint(utils.toEther(20))  // $1,000
        })

        it("borrowAllowed", async () => {
            // max borrowable value = ???
            // max borrowable FISH = ???
            // max borrowable WHALE = ???
            
            // TODO check borrowAllowed both success & fail cases with FISH

            // TODO check borrowAllowed both success & fail cases with WHALE
        })

        it("redeemAllowed", async () => {
            // borrow
            await cFISH.connect(user).borrow(utils.toEther(80))

            // current borrow value = 80 FISH * $10 = $800
            // max redeemable value = ???
            // max redeemable FISH = ???
            // max redeemable WHALE = ???
            
            // TODO check redeemAllowed both success & fail cases with FISH
            
            // TODO check redeemAllowed both success & fail cases with WHALE
        })

        describe("Test Stable coin", async () => {
            beforeEach(async () => {
                // Mint stableCoin
                const tokenFactory = await ethers.getContractFactory("TestToken")
                stable = await tokenFactory.deploy("Stable token", "tUSD")

                // set Minter
                await stable.setMinter(controller.address)

                // set StableCoin
                await controller.setStableCoin(stable.address)
            })
            it("borrow StableCoin", async () => {
                // max borroable value = $1200
                const borrowAmount = utils.toEther(1200)
                const beforeStable = await stable.balanceOf(user.address)
                await controller.connect(user).borrowStable(borrowAmount)
                const afterStable = await stable.balanceOf(user.address)

                utils.assertEqual(afterStable.sub(beforeStable), borrowAmount)
                
                // TODO check revert if exceed borrowable amount
            })
            it("repay StableCoin", async () => {
                const borrowAmount = utils.toEther(1200)
                await controller.connect(user).borrowStable(borrowAmount)

                const repayAmount = utils.toEther(500)
                const beforeBorrow = await controller.borrowStableBalance(user.address)
                await controller.connect(user).repayStable(repayAmount)
                const afterBorrow = await controller.borrowStableBalance(user.address)
                
                // TODO check repay
            })
        })
    })
})
