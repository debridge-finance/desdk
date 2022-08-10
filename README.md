# deBridge SDK

**Send, track and claim arbitrary cross-chain messages over the [deBridge protocol](https://debridge.finance)  programmatically**. deSDK is a framework-agnostic software development kit focused on handling typed messages routed by deBridge - a generic messaging and cross-chain interoperability protocol that enables decentralized transfers of arbitrary data and assets between various blockchains.

## Installation

Install the package:

```bash
npm i --save @debridge-finance/desdk
```

Import the `evm` namespace:

```ts
import { evm } from "@debridge-finance/desdk";
```

## Sending messages directly

`evm.Message` is a high-level typed interface to the `send()` method of the `deBridgeGate` contract. This is the only one method needed to submit a new cross-chain call. The `evm.Message` object takes raw scalar values and typed structs to avoid possible hassles with encoding of complex nested structs. Its `toSendArgs()` method returns a tuple of scalar args (containing encoded values) ready to be passed to the `deBridgeGate`'s `send()` method in an unopinionated manner. Example:

```ts
// the address on the BNB Chain where deETH should be sent to
const BNB_receiver = "0x...";

// send 1 ether from Ethereum to BNB
const message = new evm.Message({
    tokenAddress: "0x0000000000000000000000000000000000000000",
    amount: "1000000000000000000",
    chainIdTo: "56",
    receiver: BNB_receiver,
    autoParams: new evm.SendAutoParams({
        executionFee: "0",
        fallbackAddress: BNB_receiver,
        flags: new Flags(),
        data: "0x", // nothing to call on the dst chain, just bridge wrapped ether
    })
});

// the resulting tuple of args to be then passed to the deBridgeGate.send() method
const argsForSend = message.getEncodedArgs();

// argsForSend may now be passed to the deBridgeGate.send() call
// via web3.js, ethers.js, or passed to your smart contract which will call
// deBridgeGate onchain

// example using hardhat-ethers:
// const deBridgeGate = await ethers.getContractAt('DeBridgeGate', '0x43dE2d77BF8027e25dBD179B491e8d64f38398aA);
// const fee = await deBridgeGate.globalFixedNativeFee();
// const etherToSend = fee.add(parseEther('1))
// const tx = await deBridgeGate.send(
//     ...argsForSend,
//     { value: etherToSend }
// )
```

## Tracking submissions

After the submission has been successfully submitted (by calling the `deBridgeGate.send()` method either off-chain or onchain), its status can be tracked using the `evm.Submission` helper methods.

First things first, prepare the context deSDK should work within: you need to provide a URL to EVM RPC node of the origin chain (where the cross-chain call has been started):

```ts
const evmOriginContext: evm.Context = {
    // provide a URL to the RPC node of the 🛫origin chain
    provider: "https://mainnet.infura.io/v3/...",
}
```

Then pass this context to the `evm.Submission` initialization:

```ts
// find all submissions submitted in your transaction by its hash
// Obviously, a single transaction may contain multiple submissions:
// a contract may call deBridgeGate.send() multiple times, e.g. to submit data
// to different chains simultaneously - that's why Submission.findAll()
// returns an array of Submission objects
const submissions = await evm.Submission.findAll(transactionHash, evmOriginContext);

// take the first submission.
// DO YOUR OWN SANITY CHECKS TO ENSURE IT CONTAINS THE EXPECTED NUMBER OF SUBMISSIONS
const [submission] = submissions;

// check if submission if confirmed: validator nodes wait a specific block
// confirmations before sign the message. Currently, 12 blocks is expected
// for most supported EVM chains (256 for Polygon).
const isConfirmed = await submission.hasRequiredBlockConfirmations();

// there is also a bunch of useful properties that describe the submission, e.g.
console.log("cross-chain asset ID transferred: ", submission.debridgeId)
console.log("amount transferred to", submission.amount, submission.receiver)
```

## Tracking and executing claims

After the submission has been confirmed, each elected validator verifies, signs it with its own private key and publishes the signature to the publicly available storage. After enough signatures were published, a call to `deBridgeGate.claim()` method may be made on the destination chain to finalize the submission and execute the message. The `claim()` methods expects a variety of args, including the contents of the submission and the signatures. To handle this step, an `evm.Claim` object exists, providing handy methods to check the status of the claim and craft a tuple of scalar args (containing encoded values) ready to be passed to the `deBridgeGate`'s `claim()` method in an unopinionated manner.

Again, the first thing to do is to construct a context with the destination chain:

```ts
const evmDestinationContext: evm.Context = {
    // provide a URL to the RPC node of the 🛬destination chain
    provider: "https://mainnet.infura.io/v3/...",
}
```

Pass this context while accessing the `Claim` object of the particular submission:

```ts
if (isConfirmed) {
    const claim = await submission.toEVMClaim(evmDestinationContext);

    // check if claim has been signed by enough validators
    await isSigned = await claim.isSigned();

    // check if this claim has been already executed
    await isExecuted = await claim.isExecuted();

    // get claim args
    if (isSigned && !isExecuted) {
        // the resulting tuple of args to be then passed to the deBridgeGate.claim() method
        const claimArgs = await claim.getEncodedArgs();

        // e.g. using ethers.js:
        // await deBridgeGate.claim(...claimArgs, { gasLimit: 8_000_000 });
    }
}
```

## Works with a `hardhat-debridge` emulated environment!

[`hardhat-debridge`](https://github.com/debridge-finance/hardhat-debridge) is a plugin for Hardhat that provides the toolkit to test and emulate dApps built on top of deBridge protocol, and it is confirmed to be deSDK-compatible. This means that you can develop automated tests to validate how your deSDK-based scripts cooperate with deBridge infrastructure. After all, the [`hardhat-debridge`](https://github.com/debridge-finance/hardhat-debridge) itself uses deSDK under the hood and is covered with extensive tests which use the plugin and deSDK simultaneously.

By default, deSDK internals are configured to run against production environments (mainnets for all supported networks: Ethereum, Polygon, etc). To make it work against local emulated environment, craft a special `evmContext` object:

```ts
// craft the context deSDK shall work within
const evmLocalContext: evm.Context = {
    // pass the current hardhat network. deSDK is ready to accept it
    provider: hre,

    // pass the custom address of the gate we are interacting with
    deBridgeGateAddress: gate.address,

    // emulated gate works without signatures, so pass a dummy
    signatureStorage: new evm.DummySignatureStorage()
}
```

Then pass this object as an optional param every time you communicate with deSDK classes:

```ts
const message = new evm.Message(messageParams, evmLocalContext);
const submissions = await evm.Submission.findAll(transactionHash, evmLocalContext);
const claim = await submission.toEVMClaim(evmLocalContext);
```