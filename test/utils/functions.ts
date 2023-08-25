import { ethers } from 'hardhat'
import { BigNumber } from 'ethers'
import { assert, expect } from 'chai'
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const hre:HardhatRuntimeEnvironment = require('hardhat')

// CONSTANTS
const UNIT = BigNumber.from('1' + '0'.repeat(18))
const MAX_UINT = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
const ZeroAddress = '0x0000000000000000000000000000000000000000'

// EVM
const currentTime = async () => {
    const block =  await ethers.provider.getBlock('latest')

    return block.timestamp
}

const mineBlock = async (numBlock: number) => {
    let requests = []
    while (numBlock > 0) {
        requests.push(hre.network.provider.request({ method: 'evm_mine' }))
        numBlock--
    }
    await Promise.all(requests)
}

// ASSERT
const assertEqual = (value: BigNumber | number | boolean | string, expected: BigNumber | number | boolean | string) => {
    assert.strictEqual(value.toString(), expected.toString())
}
const assertGte = (value: BigNumber, expected: BigNumber) => {
    assert.ok(value.gt(expected), `${value.toString()} is not greater than or equal to ${expected.toString()}`)
}
const assertClose = (value: BigNumber, expected: BigNumber, delta = '100000') => {
    const variance = BigNumber.isBigNumber(delta) ? delta : BigNumber.from(delta)
    const actualDelta = expected.sub(value).abs()

    assert.ok(value.gte(expected.sub(variance)), `Number is too small to be close (Delta between actual and expected is ${fromEther(actualDelta)}, but variance was only ${fromEther(variance)}`)
    assert.ok(value.lte(expected.add(variance)), `Number is too large to be close (Delta between actual and expected is ${fromEther(actualDelta)}, but variance was only ${fromEther(variance)})`)
}
const assertRevert = async (promise: any, msg: string) => {
    await expect(promise).to.be.revertedWith(msg)
}

// FORMATTER
// @ts-ignore
const toEther = (amount, unit = 'ether') => ethers.utils.parseUnits(amount.toString(), unit)
// @ts-ignore
const fromEther = (amount, unit = 'ether') => ethers.utils.formatUnits(amount.toString(), unit)

export default {
    UNIT, MAX_UINT, ZeroAddress,
    currentTime, toEther, fromEther, mineBlock,
    assertClose, assertGte, assertEqual, assertRevert
}