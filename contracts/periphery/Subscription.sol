// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract Subscription is Initializable, AccessControlUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    /* ========== STATE VARIABLES ========== */

    address public paymentAsset;

    uint public monthlyPayment;
    uint public discountedMonthlyPayment;
    uint8 public discountedPeriodInMonths;

    uint32 subscriptionIdCounter;
    mapping(uint32 => address) public subscriptionOwner;
    mapping(uint32 => SubscriptionBasicInfo) public subscriptionBasicInfo;

    /* ========== Events ========== */

    event PaymentConfigured(
        address newPaymentAsset,
        uint newMonthlyPayment,
        uint newDiscountedMonthlyPayment,
        uint8 newDiscountedPeriodInMonths
    );
    event SubscriptionCreated(uint32 subscriptionId);
    event SubscriptionPaid(uint32 subscriptionId, uint monthsPeriod, address token, uint payment);
    event SubscriptionChangedOwner(uint32 subscriptionId, address oldOwner, address newOwner);
    event SubscriptionChangedBasicInfo(
        uint32 subscriptionId,
        SubscriptionBasicInfo oldBasicInfo,
        SubscriptionBasicInfo newBasicInfo
    );

    /* ========== ERRORS ========== */

    error AdminBadRole();
    error SubscriptionOwnerBadRole();
    error WrongArgument();
    error MonthlyPaymentNotSet();

    /* ========== STRUCTURES ========== */

    enum Engine {
        EVM
    }

    struct SubscriptionBasicInfo {
        Engine engine;
        uint8 blockFinality;
        string chainName;
        string chainRpc;
        string websocketUrl;
        string nativeTokenSymbol;
        string reservedMetadata;
    }

    /* ========== MODIFIERS ========== */

    modifier onlyAdmin() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) revert AdminBadRole();
        _;
    }

    modifier onlySubscriptionOwner(uint32 subscriptionId) {
        if (msg.sender != subscriptionOwner[subscriptionId]) revert SubscriptionOwnerBadRole();
        _;
    }

    /* ========== CONSTRUCTOR  ========== */

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(
        address newPaymentAsset,
        uint newMonthlyPayment,
        uint newDiscountedMonthlyPayment,
        uint8 newDiscountedPeriodInMonths
    ) public initializer {
        subscriptionIdCounter = 100_000_000;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setPaymentAsset(
            newPaymentAsset,
            newMonthlyPayment,
            newDiscountedMonthlyPayment,
            newDiscountedPeriodInMonths
        );
    }

    function subscribe(uint8 monthsPeriod) external {
        subscriptionIdCounter += 1;
        paySubscription(subscriptionIdCounter, monthsPeriod);
        _setSubscriptionOwner(subscriptionIdCounter, msg.sender);
        emit SubscriptionCreated(subscriptionIdCounter);
    }

    function paySubscription(uint32 subscriptionId, uint8 monthsPeriod) public {
        if (monthsPeriod == 0) revert WrongArgument();
        if (monthlyPayment == 0) revert MonthlyPaymentNotSet();

        uint expectedPayment = expectedSubscriptionPayment(monthsPeriod);
        emit SubscriptionPaid(subscriptionId, monthsPeriod, paymentAsset, expectedPayment);

        IERC20Upgradeable(paymentAsset).safeTransferFrom(
            msg.sender,
            address(this),
            expectedPayment
        );
    }

    function changeSubscriptionOwner(
        uint32 subscriptionId,
        address newSubscriptionOwner
    ) external onlySubscriptionOwner(subscriptionId) {
        _setSubscriptionOwner(subscriptionId, newSubscriptionOwner);
    }

    function changeSubscriptionBasicInfo(
        uint32 subscriptionId,
        SubscriptionBasicInfo memory newSubscriptionBasicInfo
    ) external onlySubscriptionOwner(subscriptionId) {
        _setSubscriptionBasicInfo(subscriptionId, newSubscriptionBasicInfo);
    }

    // ============ VIEWS ============

    function expectedSubscriptionPayment(uint8 monthsPeriod) public view returns (uint) {
        return
            monthsPeriod *
            (monthsPeriod >= discountedPeriodInMonths ? discountedMonthlyPayment : monthlyPayment);
    }

    /* ========== ADMIN ========== */

    function setPaymentAsset(
        address newPaymentAsset,
        uint newMonthlyPayment,
        uint newDiscountedMonthlyPayment,
        uint8 newDiscountedPeriodInMonths
    ) external onlyAdmin {
        _setPaymentAsset(
            newPaymentAsset,
            newMonthlyPayment,
            newDiscountedMonthlyPayment,
            newDiscountedPeriodInMonths
        );
    }

    function withdraw(address token, address recipient, uint amount) external onlyAdmin {
        if (token == address(0)) {
            (bool success, ) = recipient.call{value: amount}("");
            require(success);
        } else {
            IERC20Upgradeable(token).safeTransfer(recipient, amount);
        }
    }

    /* ========== INTERNAL ========== */

    function _setPaymentAsset(
        address newPaymentAsset,
        uint newMonthlyPayment,
        uint newDiscountedMonthlyPayment,
        uint8 newDiscountedPeriodInMonths
    ) internal {
        paymentAsset = newPaymentAsset;
        monthlyPayment = newMonthlyPayment;
        discountedMonthlyPayment = newDiscountedMonthlyPayment;
        discountedPeriodInMonths = newDiscountedPeriodInMonths;
        emit PaymentConfigured(
            newPaymentAsset,
            newMonthlyPayment,
            newDiscountedMonthlyPayment,
            newDiscountedPeriodInMonths
        );
    }

    function _setSubscriptionOwner(uint32 subscriptionId, address newSubscriptionOwner) internal {
        address oldOwner = subscriptionOwner[subscriptionId];
        subscriptionOwner[subscriptionId] = newSubscriptionOwner;
        emit SubscriptionChangedOwner(subscriptionId, oldOwner, newSubscriptionOwner);
    }

    function _setSubscriptionBasicInfo(
        uint32 subscriptionId,
        SubscriptionBasicInfo memory newSubscriptionInfo
    ) internal {
        if (newSubscriptionInfo.blockFinality == 0) revert WrongArgument();
        if (bytes(newSubscriptionInfo.chainName).length == 0) revert WrongArgument();
        if (bytes(newSubscriptionInfo.chainRpc).length == 0) revert WrongArgument();
        if (bytes(newSubscriptionInfo.nativeTokenSymbol).length == 0) revert WrongArgument();
        SubscriptionBasicInfo memory oldSubscription = subscriptionBasicInfo[subscriptionId];
        // The engine field can only be set initially and cannot be updated thereafter
        if (
            oldSubscription.blockFinality != 0 &&
            oldSubscription.engine != newSubscriptionInfo.engine
        ) revert WrongArgument();
        subscriptionBasicInfo[subscriptionId] = newSubscriptionInfo;
        emit SubscriptionChangedBasicInfo(subscriptionId, oldSubscription, newSubscriptionInfo);
    }

    // ============ Version Control ============
    function version() external pure returns (uint256) {
        return 100; // 1.0.0
    }
}
