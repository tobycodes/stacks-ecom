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

const CART_ID = "cart-id";
const TRX_AMOUNT = 12;

Clarinet.test({
  name: "Test that init-order gets called and transaction goes through",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const sender = accounts.get("wallet_1")!;
    let assetMaps = chain.getAssetsMaps();
    const senderAddress = sender.address as string;
    const senderBalance = assetMaps.assets["STX"][senderAddress];

    let block = chain.mineBlock([
      Tx.contractCall(
        "make-order",
        "init-order",
        [types.ascii(CART_ID), types.uint(TRX_AMOUNT)],
        senderAddress
      ),
      Tx.contractCall(
        "make-order",
        "get-transaction",
        [types.ascii(CART_ID)],
        senderAddress
      ),
      Tx.contractCall(
        "make-order",
        "get-transactions",
        [],
        senderAddress
      ),
    ]);

    // Check that both contracts were called successfully
    assertEquals(block.receipts.length, 3);
    block.receipts[0].result.expectOk();
    block.receipts[1].result.expectOk();
    block.receipts[2].result.expectOk();

    console.log(block.receipts[2].result)

    // Check that the transaction was added to the transactions map and the sender debited
    assetMaps = chain.getAssetsMaps();
    const newBalance = assetMaps.assets["STX"][senderAddress];

    assertEquals(newBalance, senderBalance - TRX_AMOUNT);
    assertEquals(
      block.receipts[1].result,
      types.ok(`{amount: ${types.uint(TRX_AMOUNT)}, paid: ${types.bool(true)}}`)
    );
  },
});
