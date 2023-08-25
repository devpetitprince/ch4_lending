import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Contract } from "ethers";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import utils from "./utils";

describe("CToken Test", function () {
    let fish: Contract, whale: Contract, stable: Contract
    let cFISH: Contract, cWHALE: Contract
    let controller: Contract
    let deployer: SignerWithAddress, user: SignerWithAddress
    
    async function initTest() {
        [deployer, user] = await ethers.getSigners();

        const tokenFactory = await ethers.getContractFactory("TestToken")
        fish = await tokenFactory.deploy("FISH token", "FISH")
        whale = await tokenFactory.deploy("WHALE token", "WHALE")
        
        const controllerFactory = await ethers.getContractFactory("Controller")
        controller = await controllerFactory.deploy()

        const cTokenFactory = await ethers.getContractFactory("CToken");
        cFISH = await cTokenFactory.deploy(controller.address, fish.address, "Market FISH", "cFISH", 18);
        cWHALE = await cTokenFactory.deploy(controller.address, whale.address, "Market WHALE", "cWHALE", 18);

        await fish.mint(deployer.address, utils.toEther(1000000))
        await whale.mint(deployer.address, utils.toEther(100000))
        await fish.mint(user.address, utils.toEther(10000))
        await whale.mint(user.address, utils.toEther(1000))
    }
    beforeEach(async () => {
        await initTest();
    })
    
    it("Mint: mint exact cToken amount at first", async () => {
        const amountIn = utils.toEther(222)
        const exchangeRate = await cFISH.getExchangeRate()
        const expectAmount = amountIn.mul(utils.UNIT).div(exchangeRate)
        
        const beforeCFISH = await cFISH.balanceOf(user.address)
        await fish.connect(user).approve(cFISH.address, utils.MAX_UINT)
        await cFISH.connect(user).mint(amountIn)
        const afterCFISH = await cFISH.balanceOf(user.address)

        utils.assertEqual(afterCFISH.sub(beforeCFISH), expectAmount)
        
        // TODO check expected result
    });
    it("Mint: mint exact cToken amount after minting", async () => {
        await fish.connect(user).approve(cFISH.address, utils.MAX_UINT)
        await fish.connect(deployer).approve(cFISH.address, utils.MAX_UINT)
        await cFISH.connect(deployer).mint(utils.toEther(1000))
        
        const amountIn = utils.toEther(100)
        const exchangeRate = await cFISH.getExchangeRate()
        const expectAmount = amountIn.mul(utils.UNIT).div(exchangeRate)

        const beforeCFISH = await cFISH.balanceOf(user.address)
        await cFISH.connect(user).mint(amountIn)
        const afterCFISH = await cFISH.balanceOf(user.address)

        utils.assertEqual(afterCFISH.sub(beforeCFISH), expectAmount)
    })
    it("Mint: mint exact cToken amount after pouring interest", async () => {
        await fish.connect(user).approve(cFISH.address, utils.MAX_UINT)
        await fish.connect(deployer).approve(cFISH.address, utils.MAX_UINT)
        await cFISH.connect(deployer).mint(utils.toEther(1000))
        await cFISH.connect(deployer).pourInterest(utils.toEther(50))
        
        const amountIn = utils.toEther(100)
        const exchangeRate = await cFISH.getExchangeRate()
        const expectAmount = amountIn.mul(utils.UNIT).div(exchangeRate)
        // console.log("exchangeRate: ", utils.fromEther(exchangeRate))
        
        const beforeCFISH = await cFISH.balanceOf(user.address)
        await cFISH.connect(user).mint(amountIn)
        const afterCFISH = await cFISH.balanceOf(user.address)

        utils.assertEqual(afterCFISH.sub(beforeCFISH), expectAmount)
    })
    describe("test after Mint", async () => {
        beforeEach(async () => {
            await initTest()
            await fish.connect(user).approve(cFISH.address, utils.MAX_UINT)
            await fish.connect(deployer).approve(cFISH.address, utils.MAX_UINT)
            await cFISH.connect(deployer).mint(utils.toEther(1000))            
            await cFISH.connect(user).mint(utils.toEther(1000))            
        })
        it("Redeem: redeem underlying by cToken amount", async() => {
            const amountIn = utils.toEther(100)
            const exchangeRate = await cFISH.getExchangeRate()
            const expectAmount = amountIn.mul(exchangeRate).div(utils.UNIT) 
            
            const beforeCFISH = await cFISH.balanceOf(user.address)
            const beforeFISH = await fish.balanceOf(user.address)
            await cFISH.connect(user).redeem(amountIn)
            const afterCFISH = await cFISH.balanceOf(user.address)
            const afterFISH = await fish.balanceOf(user.address)

            utils.assertEqual(beforeCFISH.sub(afterCFISH), amountIn)
            utils.assertEqual(afterFISH.sub(beforeFISH), expectAmount)
        })
        it("Redeem: redeem underlying by uderlying amount", async() => {
            const amountOutExpected = utils.toEther(100)
            
            const beforeFISH = await fish.balanceOf(user.address)
            await cFISH.connect(user).redeemUnderlying(amountOutExpected)
            const afterFISH = await fish.balanceOf(user.address)

            utils.assertEqual(afterFISH.sub(beforeFISH), amountOutExpected)
        })
        it("Redeem: redeem exact amount after pouring interest", async() => {
            await cFISH.connect(deployer).pourInterest(utils.toEther(50))
            console.log(`exchange Rate: ${utils.fromEther(await cFISH.getExchangeRate())}`)
            
            const amountOutExpected = utils.toEther(333)
            
            const beforeFISH = await fish.balanceOf(user.address)
            await cFISH.connect(user).redeemUnderlying(amountOutExpected)
            const afterFISH = await fish.balanceOf(user.address)

            
            utils.assertEqual(afterFISH.sub(beforeFISH), amountOutExpected)
        })
        it("Redeem: redeem amount all after pouring interest", async() => {
            await cFISH.connect(deployer).pourInterest(utils.toEther(50))
            
            const amountIn = await cFISH.balanceOf(user.address)
            
            const beforeFISH = await fish.balanceOf(user.address)
            await cFISH.connect(user).redeem(amountIn)
            const afterFISH = await fish.balanceOf(user.address)
            console.log(`amountIn : ${utils.fromEther(amountIn)}`)
            console.log(`amountOut: ${utils.fromEther(afterFISH.sub(beforeFISH))}`)
            
            // TODO check expected result
            utils.assertGte(afterFISH.sub(beforeFISH),amountIn)
        })
        it.only("Borrow: borrow exact amount", async () => {
            const borrowAmount = utils.toEther(500)
            
            const beforeFISH = await fish.balanceOf(user.address)
            await cFISH.connect(user).borrow(borrowAmount)
            const afterFISH = await fish.balanceOf(user.address)

            utils.assertEqual(afterFISH.sub(beforeFISH), borrowAmount)
            utils.assertEqual(await cFISH.accountBorrow(user.address), borrowAmount)

            // TODO check expected result
        })
        it.only("Repay: repay exact amount", async () => {
            const borrowAmount = utils.toEther(500)
            const repayAmount = utils.toEther(200)
            await cFISH.connect(user).borrow(borrowAmount)
            
            const beforeFISH = await fish.balanceOf(user.address)
            await cFISH.connect(user).repay(repayAmount)
            const afterFISH = await fish.balanceOf(user.address)

            utils.assertEqual(beforeFISH.sub(afterFISH), repayAmount)
            utils.assertEqual(await cFISH.accountBorrow(user.address), borrowAmount.sub(repayAmount))
        })
        it.only("Repay: repay all", async () => {
            const borrowAmount = utils.toEther(500)
            const repayAmount = utils.MAX_UINT
            await cFISH.connect(user).borrow(borrowAmount)

            const beforeFISH = await fish.balanceOf(user.address)
            await cFISH.connect(user).repay(repayAmount)
            const afterFISH = await fish.balanceOf(user.address)
            
            utils.assertEqual(await cFISH.accountBorrow(user.address), 0)
            utils.assertEqual(beforeFISH.sub(afterFISH), borrowAmount)
        })
    })
});
