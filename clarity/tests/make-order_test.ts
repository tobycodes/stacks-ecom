import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
  //@ts-ignore
} from "https://deno.land/x/clarinet@v0.14.0/index.ts";
//@ts-ignore
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

const TRX_AMOUNT = 12;

Clarinet.test({
  name: "Test that init-order gets called and transaction goes through",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get("wallet_1")!;
    const deployer = accounts.get("deployer")!;
    let assetMaps = chain.getAssetsMaps();
    const address = wallet_1.address as string;
    const balance = assetMaps.assets["STX"][address];
    const deployerBalance = assetMaps.assets["STX"][deployer.address];

    let block = chain.mineBlock([
      Tx.contractCall(
        "make-order",
        "init-order",
        [types.ascii("abcdef"), types.uint(TRX_AMOUNT)],
        address
      ),
      Tx.contractCall(
        "make-order",
        "get-transaction",
        [types.ascii("abcdef")],
        address
      ),
    ]);

    assertEquals(block.receipts.length, 2);

    block.receipts[0].result.expectOk();
    block.receipts[1].result.expectOk();
    console.log(block.receipts[1].result);
    assertEquals(
      block.receipts[1].result,
      types.ok(`{amount: ${types.uint(TRX_AMOUNT)}}`)
    );

    assetMaps = chain.getAssetsMaps();
    const newBalance = assetMaps.assets["STX"][address];
    const newDeployerBalance = assetMaps.assets["STX"][deployer.address];

    assertEquals(newBalance, balance - TRX_AMOUNT);
    assertEquals(newDeployerBalance, deployerBalance + TRX_AMOUNT);
  },
});
