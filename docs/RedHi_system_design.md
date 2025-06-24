# RedHi System Design Document

## Implementation approach

For implementing RedHi, a decentralized orderbook-based exchange on the Hive blockchain, we'll take the following approach:

### Challenges and Solutions

1. **Decentralized but Fast Trading**:
   - Challenge: Keeping the exchange decentralized while ensuring fast trading operations.
   - Solution: Use MongoDB for off-chain orderbook maintenance while recording finalized transactions on Hive blockchain. This hybrid approach provides speed while maintaining transparency.

2. **Perpetual Contracts with Leverage**:
   - Challenge: Implementing perpetual contracts with up to x50 leverage without complex liquidation logic.
   - Solution: For the MVP, implement a simplified perpetual contract system using MongoDB to track positions and calculate leverage. Use Hive blockchain only for recording open/close positions.

3. **Security for Trading Operations**:
   - Challenge: Ensuring secure trading operations without holding user keys.
   - Solution: Integrate with Hive Keychain for transaction signing, keeping the system non-custodial.

### Technology Selection

- **Frontend**: React.js with Tailwind CSS for a clean, responsive interface inspired by V4V.
- **Charts**: Lightweight Charts for efficient real-time price visualization.
- **Backend**: Bun as JavaScript runtime with Express.js for API endpoints.
- **Database**: MongoDB Atlas for storing the orderbook, user positions, and trading data.
- **Blockchain Integration**: Hive-JS for interacting with the Hive blockchain.
- **Authentication**: Hive Keychain for secure wallet connection and transaction signing.
- **Deployment**: Vercel for frontend, Render for backend, MongoDB Atlas for database.

This architecture balances the need for decentralization with the practical requirements of a functional exchange, using established libraries and services to accelerate development while maintaining security and transparency.

## Data structures and interfaces

The system consists of several core components that handle different aspects of the decentralized exchange:

1. **Authentication & Wallet Management**
2. **Token Swap Module**
3. **Spot Trading Engine**
4. **Perpetual Trading Engine**
5. **Orderbook Management**
6. **Blockchain Integration Layer**

Below is a detailed class diagram showing the system's key components and their relationships.

```mermaid
classDiagram
    class User {
        +String username
        +String accountName
        +Object balances
        +Array positions
        +Array orders
        +getBalance(token: String) Number
        +updateBalance(token: String, amount: Number) void
    }
    
    class WalletService {
        +connectWallet(username: String) Promise~User~
        +fetchBalances(username: String) Promise~Object~
        +signTransaction(tx: Object) Promise~Object~
        +broadcastTransaction(signedTx: Object) Promise~Object~
    }
    
    class KeychainIntegration {
        +requestSignBuffer(username: String, message: String, key: String) Promise~Object~
        +requestBroadcast(username: String, operations: Array) Promise~Object~
        +requestTransfer(username: String, recipient: String, amount: Number, memo: String, currency: String) Promise~Object~
    }
    
    class Token {
        +String symbol
        +String name
        +Number decimals
        +String blockchain
        +Number totalSupply
    }
    
    class SwapService {
        +calculateSwapRate(fromToken: Token, toToken: Token, amount: Number) Promise~Object~
        +executeSwap(user: User, fromToken: Token, toToken: Token, amount: Number, minReturn: Number) Promise~Object~
        +getSwapPairs() Promise~Array~
    }
    
    class Order {
        +String id
        +String userId
        +String pair
        +String type
        +Number price
        +Number amount
        +Number filled
        +String status
        +Date timestamp
        +Boolean isCancelled
        +cancel() Promise~Boolean~
        +fill(amount: Number) Promise~Boolean~
    }
    
    class SpotTradingService {
        +createLimitOrder(user: User, pair: String, price: Number, amount: Number, side: String) Promise~Order~
        +createMarketOrder(user: User, pair: String, amount: Number, side: String) Promise~Order~
        +cancelOrder(orderId: String) Promise~Boolean~
        +getOrderHistory(userId: String) Promise~Array~
        +getOpenOrders(userId: String) Promise~Array~
    }
    
    class OrderBook {
        +String pair
        +Array bids
        +Array asks
        +addOrder(order: Order) void
        +removeOrder(orderId: String) void
        +matchOrders() Promise~Array~
        +getBidAsk() Object
        +getDepth(levels: Number) Object
    }
    
    class OrderBookManager {
        -Map orderBooks
        +getOrderBook(pair: String) OrderBook
        +createOrderBook(pair: String) OrderBook
        +processOrder(order: Order) Promise~Array~
        +getMarketDepth(pair: String, levels: Number) Object
    }
    
    class Trade {
        +String id
        +String pair
        +String makerOrderId
        +String takerOrderId
        +Number price
        +Number amount
        +Date timestamp
    }
    
    class PerpetualPosition {
        +String id
        +String userId
        +String pair
        +String side
        +Number entryPrice
        +Number size
        +Number leverage
        +Number liquidationPrice
        +Date openTime
        +Date closeTime
        +Boolean isOpen
        +Number pnl
        +calculatePnL(currentPrice: Number) Number
        +close(exitPrice: Number) Promise~Object~
    }
    
    class PerpetualTradingService {
        +openPosition(user: User, pair: String, side: String, size: Number, leverage: Number, price: Number) Promise~PerpetualPosition~
        +closePosition(positionId: String, price: Number) Promise~Object~
        +getOpenPositions(userId: String) Promise~Array~
        +getPositionHistory(userId: String) Promise~Array~
        +calculateLiquidationPrice(side: String, entryPrice: Number, leverage: Number) Number
    }
    
    class PriceService {
        +getCurrentPrice(pair: String) Promise~Number~
        +getPriceHistory(pair: String, timeframe: String) Promise~Array~
        +subscribeToPriceUpdates(pair: String, callback: Function) void
    }
    
    class BlockchainService {
        +recordTrade(trade: Trade) Promise~Object~
        +recordPosition(position: PerpetualPosition) Promise~Object~
        +recordSwap(swap: Object) Promise~Object~
        +queryTransactions(accountName: String, type: String) Promise~Array~
    }
    
    class DatabaseService {
        +saveOrder(order: Order) Promise~Order~
        +getOrder(orderId: String) Promise~Order~
        +updateOrder(order: Order) Promise~Order~
        +saveTrade(trade: Trade) Promise~Trade~
        +savePosition(position: PerpetualPosition) Promise~PerpetualPosition~
        +getPosition(positionId: String) Promise~PerpetualPosition~
        +updatePosition(position: PerpetualPosition) Promise~PerpetualPosition~
    }
    
    class APIService {
        +initializeRoutes() void
        +handleRequest(req: Object, res: Object) Promise~void~
        +authenticateRequest(req: Object) Promise~Boolean~
    }
    
    class WebsocketService {
        +initializeServer() void
        +broadcastOrderBookUpdate(pair: String, data: Object) void
        +broadcastTradeUpdate(pair: String, trade: Trade) void
        +broadcastPriceUpdate(pair: String, price: Number) void
    }
    
    User "1" -- "*" Order : places
    User "1" -- "*" PerpetualPosition : holds
    WalletService -- KeychainIntegration : uses
    SwapService -- Token : processes
    SpotTradingService -- Order : creates
    SpotTradingService -- OrderBookManager : uses
    OrderBookManager "1" -- "*" OrderBook : manages
    OrderBook -- Order : contains
    OrderBook -- Trade : generates
    PerpetualTradingService -- PerpetualPosition : manages
    SpotTradingService -- PriceService : uses prices from
    PerpetualTradingService -- PriceService : uses prices from
    PerpetualTradingService -- BlockchainService : records positions with
    SpotTradingService -- BlockchainService : records trades with
    SwapService -- BlockchainService : records swaps with
    APIService -- WalletService : authenticates via
    APIService -- SpotTradingService : routes to
    APIService -- SwapService : routes to
    APIService -- PerpetualTradingService : routes to
    WebsocketService -- OrderBookManager : broadcasts
    WebsocketService -- PriceService : broadcasts
    SpotTradingService -- DatabaseService : persists data
    PerpetualTradingService -- DatabaseService : persists data
```

## Program call flow

The sequence diagrams below illustrate the key flows within the RedHi platform:

1. Wallet Connection Flow
2. Token Swap Flow
3. Spot Trading Flow
4. Perpetual Trading Flow

### Wallet Connection Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant K as Keychain
    participant A as API Service
    participant W as Wallet Service
    participant H as Hive Blockchain
    
    U->>F: Click Connect Wallet
    F->>K: Request connect
    K->>U: Prompt for authorization
    U->>K: Authorize
    K->>F: Return account details
    F->>A: /api/auth/connect with account
    A->>W: connectWallet(username)
    W->>H: Query account info
    H-->>W: Return account data
    W->>A: Return User object
    A-->>F: Return authenticated session
    F->>W: fetchBalances(username)
    W->>H: Query balances
    H-->>W: Return balance data
    W-->>F: Return formatted balances
    F-->>U: Display connected wallet and balances
```

### Token Swap Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Service
    participant S as Swap Service
    participant K as Keychain
    participant B as Blockchain Service
    participant H as Hive Blockchain
    
    U->>F: Select token pair and amount
    F->>A: /api/swap/rate with token pair & amount
    A->>S: calculateSwapRate(fromToken, toToken, amount)
    S-->>A: Return estimated rate & slippage
    A-->>F: Return swap details
    F-->>U: Display swap details
    U->>F: Confirm swap
    F->>A: /api/swap/execute with swap details
    A->>S: executeSwap(user, fromToken, toToken, amount, minReturn)
    S->>K: Request transaction signing
    K->>U: Prompt for approval
    U->>K: Approve transaction
    K-->>S: Return signed transaction
    S->>B: recordSwap(swapDetails)
    B->>H: Broadcast swap transaction
    H-->>B: Return transaction hash
    B-->>S: Return success status
    S-->>A: Return swap result
    A-->>F: Return updated balances and status
    F-->>U: Display swap success and new balances
```

### Spot Trading Flow - Limit Order

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Service
    participant T as Spot Trading Service
    participant O as OrderBook Manager
    participant K as Keychain
    participant D as Database Service
    participant W as Websocket Service
    participant B as Blockchain Service
    participant H as Hive Blockchain
    
    U->>F: Create limit order (pair, price, amount, side)
    F->>A: /api/spot/order/limit with order details
    A->>T: createLimitOrder(user, pair, price, amount, side)
    T->>K: Request signature for order placement
    K->>U: Prompt for approval
    U->>K: Approve order
    K-->>T: Return signed approval
    T->>D: saveOrder(order)
    D-->>T: Return saved order
    T->>O: processOrder(order)
    O->>O: getOrderBook(pair)
    O->>O: addOrder(order)
    alt Order matched
        O->>O: matchOrders()
        O->>T: Return matches
        T->>D: saveTrade(trade)
        D-->>T: Return saved trade
        T->>B: recordTrade(trade)
        B->>H: Record trade on blockchain
        H-->>B: Return transaction hash
        B-->>T: Return success status
        T->>W: broadcastTradeUpdate(pair, trade)
        W-->>F: Push trade update
    else No match
        O-->>T: Return no matches
    end
    T->>D: updateOrder(order)
    D-->>T: Return updated order
    T->>W: broadcastOrderBookUpdate(pair, orderBookUpdate)
    W-->>F: Push orderbook update
    T-->>A: Return order status
    A-->>F: Return order confirmation
    F-->>U: Display order status & updated orderbook
```

### Perpetual Trading Flow - Open Position

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Service
    participant P as Perpetual Trading Service
    participant PS as Price Service
    participant K as Keychain
    participant D as Database Service
    participant B as Blockchain Service
    participant H as Hive Blockchain
    
    U->>F: Open perpetual position (pair, side, size, leverage)
    F->>A: /api/perp/position/open with position details
    A->>P: openPosition(user, pair, side, size, leverage)
    P->>PS: getCurrentPrice(pair)
    PS-->>P: Return current price
    P->>P: calculateLiquidationPrice(side, price, leverage)
    P->>K: Request signature for position opening
    K->>U: Prompt for approval
    U->>K: Approve position
    K-->>P: Return signed approval
    P->>D: savePosition(position)
    D-->>P: Return saved position
    P->>B: recordPosition(position)
    B->>H: Record position on blockchain
    H-->>B: Return transaction hash
    B-->>P: Return success status
    P-->>A: Return position status
    A-->>F: Return position confirmation
    F-->>U: Display position details
```

## Anything UNCLEAR

1. **Liquidation mechanism**: The PRD mentions that complex liquidation mechanisms are out of scope for the MVP. We should clarify how liquidation will be handled in the simple implementation. Will positions be monitored for liquidation price breaches? Will there be an automated liquidation process?

2. **Price feeds**: The system requires real-time price data for spot and perpetual trading. The PRD doesn't specify if we should use internal price discovery from the orderbook or integrate with external price oracles.

3. **Token standard**: For trading non-native Hive tokens (BTC, ETH, USDT), we need to clarify which token standard will be used. Are these wrapped tokens on Hive-Engine, or will we interact with external blockchains?

4. **Fees structure**: How will trading fees be implemented? Will there be maker/taker fees? How will these be collected and distributed?

5. **Funding rate for perpetuals**: For perpetual contracts, a funding rate mechanism is typically required to keep the perpetual price close to the index price. The PRD doesn't specify how this will be implemented.
