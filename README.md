# MEDAID

MEDAID is a health-focused application that includes a **sleep tracker**, **calorie tracker**, and a **mental health chatbot** powered by Gemini API. The chatbot ensures high-quality responses by analyzing the entire chat history before generating each reply. Additionally, users can retrieve **summaries, solutions, and journals** of their conversations, which are securely stored using **IPFS (via Pinata) and Avalanche Fuji C-Chain** for privacy and security.

## Features

- **Sleep Tracker**: Monitor and analyze sleep patterns.
- **Calorie Tracker**: Keep track of daily calorie intake.
- **Mental Health Chatbot**: Provides AI-driven mental health resolutions.
- **Chat Summarization & Storage**:
  - Chat summaries/solutions are stored first in **IPFS (via Pinata)**.
  - Data is then stored securely on **Avalanche Fuji C-Chain** for enhanced privacy.

## Technical Details

- **Gemini API**: Used for chatbot response generation.
- **IPFS via Pinata**: Used for decentralized journal storage.
- **Avalanche Fuji C-Chain**: Stores chat summaries securely on the blockchain.
- **MongoDB**: Used for additional data storage.
- **Blockchain Implementation**:
  - Currently, private key and smart contract addresses are **hardcoded** in the `.env` file.
  - Future improvements will automate key and contract management for better scalability.

## Environment Variables (`.env`)

```plaintext
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=your_contract_address
MONGO_URI=your_mongo_uri
```

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/Krutideepatripathy/MEDAID.git
   ```
2. Navigate to the project directory:
   ```sh
   cd MEDAID
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up the `.env` file with the required API keys and credentials.
5. Start the application:
   ```sh
   npm run dev
   ```

## Future Improvements

- Automate blockchain private key and contract address management.

---

## License

This project is licensed under the MIT License.
