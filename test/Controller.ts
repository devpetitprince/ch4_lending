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
            
            utils.assertEqual(beforeNumMarket, 0)
            utils.assertEqual(afterNumMarket, 1)
            utils.assertEqual((await controller.markets(cFISH.address)).isListed, true)
        })
        it("supportMaket: revert if duplicated", async () => {
            await controller.supportMarket(cFISH.address)
            
            await utils.assertRevert(controller.supportMarket(cFISH.address), "already listed!")
        })
        it("enterMarket", async () => {
            await controller.supportMarket(cFISH.address)
            
            const membershipBefore = await controller.getAccountMembership(cFISH.address, user.address)
            await controller.connect(user).enterMarket(cFISH.address)
            const membershipAfter = await controller.getAccountMembership(cFISH.address, user.address)
            const userAsset = await controller.accountAssets(user.address, 0)
            
            utils.assertEqual(membershipBefore, false)
            utils.assertEqual(membershipAfter, true)
            utils.assertEqual(userAsset, cFISH.address)
        })
        it("exitMarket", async () => {
            await controller.supportMarket(cFISH.address)
            await controller.connect(user).enterMarket(cFISH.address)
            
            const membershipBefore = await controller.getAccountMembership(cFISH.address, user.address)
            await controller.connect(user).exitMarket(cFISH.address)
            const membershipAfter = await controller.getAccountMembership(cFISH.address, user.address)

            utils.assertEqual(membershipBefore, true)
            utils.assertEqual(membershipAfter, false)
        })
        it("exitMarket: revert if remain borrow", async () => {
            await controller.supportMarket(cFISH.address)
            await controller.setPrice(fish.address, utils.UNIT.mul(10)) // 1 FISH = $10
            await cFISH.connect(user).mint(utils.toEther(1000))
            
            await controller.connect(user).enterMarket(cFISH.address)
            await cFISH.connect(user).borrow(utils.toEther(1))
            
            await utils.assertRevert(controller.connect(user).exitMarket(cFISH.address), "non-zero borrow amount")
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
            // max borrowable value = (1000 * 0.6 + 1000 * 0.6) = $1200
            // max borrowable FISH = $1200 / $10 = 120
            // max borrowable WHALE = $1200 / $50 = 24
            
            utils.assertEqual(await controller.borrowAllowed(cFISH.address, user.address, utils.toEther(120)), true)
            utils.assertEqual(await controller.borrowAllowed(cFISH.address, user.address, utils.toEther(121)), false)
            
            utils.assertEqual(await controller.borrowAllowed(cWHALE.address, user.address, utils.toEther(24)), true)
            utils.assertEqual(await controller.borrowAllowed(cWHALE.address, user.address, utils.toEther(24.1)), false)
        })

        it("redeemAllowed", async () => {
            // borrow
            await cFISH.connect(user).borrow(utils.toEther(80))

            // current borrow value = 80 FISH * $10 = $800
            // max redeemable value = $1200 - $800 = $400
            // max redeemable FISH = min(100, ($400 / $10) / 0.6 = 66.67) = 66.66.. FISH
            // max redeemable WHALE = min(20, ($400 / $50) / 0.6 = 14) = 13.33... WHALE

            utils.assertEqual(await controller.redeemAllowed(cFISH.address, user.address, utils.toEther(66.66)), true)
            utils.assertEqual(await controller.redeemAllowed(cFISH.address, user.address, utils.toEther(66.67)), false)
            
            utils.assertEqual(await controller.redeemAllowed(cWHALE.address, user.address, utils.toEther(13.33)), true)
            utils.assertEqual(await controller.redeemAllowed(cWHALE.address, user.address, utils.toEther(13.34)), false)
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
                
                // revert if exceed borrowable amount
                await utils.assertRevert(controller.connect(user).borrowStable(utils.toEther(1)), "exceed borrowable amount")
            })
            it("repay StableCoin", async () => {
                const borrowAmount = utils.toEther(1200)
                await controller.connect(user).borrowStable(borrowAmount)

                const repayAmount = utils.toEther(500)
                const beforeBorrow = await controller.borrowStableBalance(user.address)
                await controller.connect(user).repayStable(repayAmount)
                const afterBorrow = await controller.borrowStableBalance(user.address)

                utils.assertEqual(beforeBorrow.sub(afterBorrow), repayAmount)
            })
        })
    })
})
