# Overview
- bonny-admin-dashboard
    - contains a next.js project to show bonny transactions
- bonny-backend
    - made with nest.js
- bonny-frontend
    - mobile (web-)app made with ionic
- bonny-function-parse-receipt
    - google cloud / firebase function to process uploaded receipts with Google Document AI 
    and forward the response to bonny-backend
- bonny-program-library
    - the solana program, deployed on Solana Devnet

# Test instructions

## 1. Login
- Website: demo.bonny.so
- Signup with a random email-adress (won't be verified) or use these credentials
    - Username: colosseum@bonny.so
    - Password: *****

## 2. Upload Receipt and gain Bonny Tokens
WARNING: Don't make photos of sensitive information: IT'S PUBLICLY AVAILABLE
- Push/Klick the "+"-Symbol
- Select "PDF & Gallery" or "Scan Receipt With your camera" and select/make a photo of a receipt
    - check test_data folder, if you need a picture of a receipt
- Wait until it's uploaded and processed. After some time (usually quite fast, but sometimes can take up to 1 minute)
- You may need to reload the page to see your updated your Bonny Token balance

## 3. Check the dashboard
- Check the dashboard for your receipt (dashboard.bonny.so)
- You can click the Blockchain Transaction and you'll be forwarded to solscan.io and can see the transaction.
    - The instruction data has an url that leads to dashboard.bonny.so and shows the single transaction

## 4. Bonus: Share your Uber rides and gain Bonny Tokens
Hint: you need the Reclaim Protocol app and an Uber account
- Push/Klick the "+"-Symbol
- Select "Earn Tokens"
- Start the "Connect Uber" Quest
- Follow the instructions

## 5. Bonus: Login with your Phantom Wallet
Hint: Reclaim features doesn't work with wallet login, yet
- Open Phantom app and change your settings to Testnet mode, select Solana Devnet
- Add some Sol to your account (e.g. solfaucet.com)
- You may need to logout first, if you're automatically logged in with the colosseum@bonny.so account
- Press on "Connect Wallet", select Phantom and follow the instructions
- Now you can upload receipts and gain token