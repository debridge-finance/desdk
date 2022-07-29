import { task } from "hardhat/config";
import { getSubmissions } from "./evm";
import { DeBridgeGate__factory } from "./evm/typechain";

task("getSubmission")
  .addOptionalParam("hash", '', '0x240d2b5fb28e3268f6526105bc00b2221c67080a97e31ff946b1456e98a45179')
  .setAction(async (args, hre) => {
    const res = await getSubmissions(args.hash, {
      rpcUrl: 'https://bsc-dataseed.binance.org'
    })


    // console.log(res[0].siu)


    // const tx = await hre.ethers.provider.getTransactionReceipt(args.hash);

    // const contract = await hre.ethers.getContractFactory('DeBridgeGate') as DeBridgeGate__factory;
    // const map = tx.logs.map((log) => {
    //   try {
    //     return contract.interface.parseLog(log)
    //   } catch (e) {}
    // });

    // console.log(map)
  })
