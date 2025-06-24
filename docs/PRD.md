RedHi: Product Requirements Document (PRD)

1. Overview
1.1 Purpose
This Product Requirements Document (PRD) outlines the vision, objectives, and requirements for RedHi, a decentralized orderbook-based exchange built on the Hive blockchain. RedHi aims to provide a secure, transparent, and user-friendly platform for trading spot, perpetual contracts (up to x50 leverage), and token swaps, targeting both beginner and professional traders within the Hive community.

1.2 Background

Context: The Hive blockchain is a decentralized ecosystem with fast transactions (3-second block times) and a vibrant community, but lacks a dedicated platform for perpetual trading and user-friendly DeFi experiences.
Problem: Existing solutions like BeeSwap (https://beeswap.dcity.io/wallet) focus on token swaps, while external exchanges like Stealthex (https://stealthex.io/?to=hive) and Tradoor (https://tradoor.io/trade/btc_usdt) do not fully integrate with Hive’s ecosystem or offer perpetuals.
Opportunity: RedHi will fill this gap by offering a simple, secure, and community-driven exchange for trading HIVE-based assets, inspired by the clean UX of V4V (https://v4v.app/).

1.3 Scope

In-Scope:
Web-based decentralized exchange with a simple UX for beginners.
Trading spot, perpetual contracts (x50 leverage), and token swaps.
Initial trading pairs: HIVE/HBD, BTC/HBD, ETH/HBD, HBD/USDT.
Integration with Hive Keychain for secure transaction signing.
Decentralized orderbook stored off-chain (MongoDB) with transactions recorded on Hive.

Out-of-Scope (for MVP):
Mobile app (to be considered post-MVP).
Advanced trading features (e.g., margin lending, options beyond perpetuals).
Complex liquidation mechanisms for perpetuals.
Fiat on-ramps (may integrate Stealthex in future phases).

2. Objectives
2.1 Business Objectives

Create a functional MVP within 12 months as a learning project for blockchain development.
Attract initial users (developer and close friends) for beta testing, with potential expansion to the Hive community.
Build a foundation for a scalable, community-driven exchange that could gain traction in the Hive ecosystem.

2.2 User Objectives

Beginner Traders: Easily connect their Hive wallet, swap tokens, and trade spot/perpetuals with a simple interface.
Hive Community: Access a secure, transparent platform for trading HIVE-based assets.
Developer (You): Gain hands-on experience with Hive blockchain, JavaScript, and DeFi development.

3. User Personas

Beginner Trader (Primary):
Name: Ana, 25, new to crypto.
Needs: Simple interface to swap HIVE/HBD or trade spot without technical complexity.
Pain Points: Overwhelmed by complex exchanges; needs clear instructions and secure wallet integration.

Hive Community Member:
Name: Carlos, 30, active in Hive.blog.
Needs: Trade HIVE/HBD and community tokens (e.g., dCity tokens) within the Hive ecosystem.
Pain Points: Limited DeFi options on Hive; wants a platform that feels native to the community.

Developer (mowgl1ph):
Name: mowgl1ph, junior developer.
Needs: Learn blockchain development, build a portfolio project, and create a functional MVP.
Pain Points: Limited resources, no team, and beginner-level knowledge of blockchain.

4. Functional Requirements
4.1 Core Features
4.1.1 Wallet Connection

Users can connect their Hive wallet using Hive Keychain.
Displays user’s HIVE and HBD balances after connection.
Success Criteria: Secure authentication with no errors; balance updates in real-time.

4.1.2 Token Swap

Users can swap between HIVE/HBD, BTC/HBD, ETH/HBD, HBD/USDT.
Interface shows current price, slippage, and estimated fees.
Transactions are signed via Hive Keychain and recorded on Hive blockchain.
Success Criteria: Swaps complete in <10 seconds with accurate balance updates.

4.1.3 Spot Trading

Decentralized orderbook for HIVE/HBD, BTC/HBD, ETH/HBD, HBD/USDT.
Supports limit and market orders.
Orderbook stored in MongoDB, with executed trades recorded on Hive via custom JSONs.
Displays real-time orderbook and trade history.
Success Criteria: Orders placed and matched accurately; trades recorded on Hive.

4.1.4 Perpetual Contracts (x50 Leverage)

Users can open perpetual positions with up to x50 leverage on supported pairs.
Simplified for MVP: Tracks positions in MongoDB, no complex liquidation logic.
Transactions (open/close positions) signed via Hive Keychain.
Success Criteria: Users can open/close positions; leverage calculations are accurate.

4.1.5 User Interface

Simple, beginner-friendly UX inspired by V4V (https://v4v.app/).
Single-page app with tabs for Swap, Spot, and Perpetuals.
Real-time price charts using Lightweight Charts.
Responsive design for desktop and mobile browsers.
Success Criteria: 90% of beta testers find the interface intuitive (based on feedback).

4.2 Non-Functional Requirements

Performance: Page load time <2 seconds; transaction confirmation <10 seconds.
Security: All transactions signed via Hive Keychain; HTTPS for web app.
Scalability: Backend supports up to 100 concurrent users for MVP.
Reliability: 99% uptime for web app (using Vercel/Render hosting).
Accessibility: Supports English and Spanish (for Hive community).

5. Technical Requirements
5.1 Tech Stack

Frontend:
React.js for single-page app.
Chakra UI or Tailwind CSS for styling.
Lightweight Charts for price visualizations.

Backend:
Bun (https://bun.sh/) as JavaScript runtime for improved performance over Node.js.
Express.js for API (compatible with Bun).
MongoDB Atlas (free tier) for orderbook storage.
Hive-JS for blockchain interactions.
Hive Keychain SDK for wallet authentication.

Blockchain:
Hive blockchain for transaction recording (custom JSONs).
Hive-Engine for token swaps.

Deployment:
Vercel for frontend (free tier).
Render for backend (free tier).
MongoDB Atlas for database.

Tools:
VS Code for coding.
Excalidraw for flow design.
Grok 3 for code generation and debugging.

5.2 Integrations

Hive Keychain: For secure wallet connection and transaction signing.
Hive API (https://developers.hive.io/): For reading blockchain data and sending transactions.
Hive-Engine: For token swap functionality (similar to BeeSwap).
Lightweight Charts: For real-time price charts.

5.3 Security

Use HTTPS for all API calls.
Validate all user inputs to prevent injection attacks.
Store no sensitive data (e.g., private keys) on the server.
Rely on Hive Keychain for transaction security.

6. User Flow

Home Page:
User sees a “Connect Wallet” button.
Clicks to authenticate via Hive Keychain.

Dashboard:
Displays wallet balance (HIVE, HBD).
Tabs for Swap, Spot, Perpetuals.

Swap:
Select pair (e.g., HIVE/HBD).
Enter amount, view price/slippage, confirm with Keychain.

Spot Trading:
View orderbook and price chart.
Place limit/market order, confirm with Keychain.

Perpetuals:
Select pair, set leverage (up to x50), open position, confirm with Keychain.

Confirmation:
Show transaction status (success/error) and updated balance.

7. Success Metrics

Development: Functional MVP completed within 12 months.
User Feedback: 80% of beta testers (your friends) report a positive experience.
Technical: <5% error rate in transactions; app uptime >99%.
Community: At least 10 Hive community members test the MVP (post-beta).

8. Risks and Mitigation

Risk: Limited blockchain knowledge.
Mitigation: Use Grok 3 for learning and code generation; follow Hive tutorials.

Risk: Insufficient liquidity for orderbook.
Mitigation: Start with swap feature to attract users; incentivize early adopters.

Risk: Bugs in MVP.
Mitigation: Test thoroughly with friends; use testnet for blockchain interactions.

Risk: Slow development due to solo work.
Mitigation: Break tasks into small milestones; seek community feedback for motivation.

9. Timeline

Month 1-2: Research Hive blockchain, write PRD, design user flow.
Month 3-6: Develop backend (Bun, Express, MongoDB, Hive-JS).
Month 7-10: Build frontend (React, Chakra UI, Lightweight Charts).
Month 11-12: Test MVP with friends, deploy on Vercel/Render, gather feedback.

10. Future Considerations

Add mobile app using React Native.
Integrate fiat on-ramp via Stealthex (https://stealthex.io/?to=hive).
Expand trading pairs (e.g., dCity tokens).
Propose project to Decentralized Hive Fund (DHF) for community funding.

11. Appendices

Inspiration: BeeSwap (https://beeswap.dcity.io/wallet), V4V (https://v4v.app/).
Resources: Hive Developer Portal (https://developers.hive.io/), Hive-Engine (https://hive-engine.com/), Hive Keychain (https://hive-keychain.com/).

