import { expect } from "chai";
import { Flag, Flags } from "../src/evm/structs";


describe("Decode correct raw flag", function () {
  it("Should decode 1 to flags" , async function () {
    const flags = Flags.decode(1).getFlags();
    expect(flags).to.be.eql([0]);
  });
  it("Should decode 2 to flags" , async function () {
    const flags = Flags.decode(2).getFlags();
    expect(flags).to.be.eql([1]);
  });
  it("Should decode 3 to flags" , async function () {
    const flags = Flags.decode(3).getFlags();
    expect(flags).to.be.eql([0,1]);
  });
  it("Should decode 4 to flags" , async function () {
    const flags = Flags.decode(4).getFlags();
    expect(flags).to.be.eql([2]);
  });
  it("Should decode 5 to flags" , async function () {
    const flags = Flags.decode(5).getFlags();
    expect(flags).to.be.eql([0,2]);
  });
  it("Should decode 6 to flags" , async function () {
    const flags = Flags.decode(6).getFlags();
    expect(flags).to.be.eql([1,2]);
  });
  it("Should decode 7 to flags" , async function () {
    const flags = Flags.decode(7).getFlags();
    expect(flags).to.be.eql([0,1,2]);
  });
  it("Should decode 8 to flags" , async function () {
    const flags = Flags.decode(8).getFlags();
    expect(flags).to.be.eql([3]);
  });
  it("Should decode 9 to flags" , async function () {
    const flags = Flags.decode(9).getFlags();
    expect(flags).to.be.eql([0,3]);
  });
  it("Should decode 10 to flags" , async function () {
    const flags = Flags.decode(10).getFlags();
    expect(flags).to.be.eql([1,3]);
  });
  it("Should decode 16 to flags" , async function () {
    const flags = Flags.decode(16).getFlags();
    expect(flags).to.be.eql([4]);
  });
  it("Should decode 32 to flags" , async function () {
    const flags = Flags.decode(32).getFlags();
    expect(flags).to.be.eql([5]);
  });
  it("Should decode 33 to flags" , async function () {
    const flags = Flags.decode(33).getFlags();
    expect(flags).to.be.eql([0,5]);
  });
  it("Should decode 34 to flags" , async function () {
    const flags = Flags.decode(34).getFlags();
    expect(flags).to.be.eql([1,5]);
  });
});

describe("Decode incorrect raw flag", function () {
  it("Should decode 64 to empty flags" , async function () {
    const flags = Flags.decode(64).getFlags();
    expect(flags).to.be.eql([]);
  });
  it("Should decode 128 to empty flags" , async function () {
    const flags = Flags.decode(128).getFlags();
    expect(flags).to.be.eql([]);
  });
});
