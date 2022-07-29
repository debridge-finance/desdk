//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@debridge-finance/contracts/contracts/interfaces/IDeBridgeGate.sol";
import "@debridge-finance/contracts/contracts/interfaces/ICallProxy.sol";

import "./interfaces/ICrossChainCounter.sol";

/// @notice IDeBridgeGate interface doesn't contain a getter for the `callProxy` public variable, which is
///         defined in the `DeBridgeGate` contract, so we create a dummy interface solely for this getter
interface IDebridgeGateWithCallProxyGetter is IDeBridgeGate {
    function callProxy() external returns (address);
}

contract CrossChainCounter is AccessControl, ICrossChainCounter {
    /// @dev DeBridgeGate's address on the current chain
    IDebridgeGateWithCallProxyGetter public deBridgeGate;

    /// @dev chains, where commands are allowed to come from
    /// @dev chain_id_from => ChainInfo
    mapping(uint256 => ChainInfo) supportedChains;

    uint256 public counter;

    /* ========== MODIFIERS ========== */

    modifier onlyAdmin() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) revert AdminBadRole();
        _;
    }

    /// @dev Restricts calls made by deBridge's CallProxy
    ///         AND that are originating from the whitelisted CrossChainCounter address on the origin chain
    modifier onlyCrossChainIncrementor() {
        ICallProxy callProxy = ICallProxy(
            deBridgeGate.callProxy()
        );

        // caller is CallProxy?
        if (address(callProxy) != msg.sender) {
            revert CallProxyBadRole();
        }

        uint256 chainIdFrom = callProxy.submissionChainIdFrom();

        if (supportedChains[chainIdFrom].callerAddress.length == 0) {
            revert ChainNotSupported(chainIdFrom);
        }

        // has the transaction being initiated by the whitelisted CrossChainIncrementor on the origin chain?
        bytes memory nativeSender = callProxy.submissionNativeSender();
        if (
            keccak256(supportedChains[chainIdFrom].callerAddress) !=
            keccak256(nativeSender)
        ) {
            revert NativeSenderBadRole(nativeSender, chainIdFrom);
        }

        _;
    }

    /* ========== INITIALIZERS ========== */

    constructor(IDebridgeGateWithCallProxyGetter deBridgeGate_) {
        deBridgeGate = deBridgeGate_;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /* ========== MAINTENANCE METHODS ========== */

    function addChainSupport(
        uint256 _chainId,
        bytes memory _crossChainIncrementorAddress
    ) external onlyAdmin {
        supportedChains[_chainId]
            .callerAddress = _crossChainIncrementorAddress;
        supportedChains[_chainId].isSupported = true;

        emit SupportedChainAdded(_chainId, _crossChainIncrementorAddress);
    }

    function removeChainSupport(uint256 _chainId) external onlyAdmin {
        supportedChains[_chainId].isSupported = false;
        emit SupportedChainRemoved(_chainId);
    }

    /* ========== PUBLIC METHODS: RECEIVING ========== */

    /// @inheritdoc ICrossChainCounter
    function receiveIncrementCommand(uint8 _amount, address _initiator)
        external
        override
        onlyCrossChainIncrementor
    {
        counter += _amount;

        uint256 chainIdFrom = ICallProxy(deBridgeGate.callProxy()).submissionChainIdFrom();
        emit CounterIncremented(counter, _amount, chainIdFrom, _initiator);
    }
}
