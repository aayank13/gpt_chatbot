# AI Chatbot

## Description

This project is an AI chatbot application built with Next.js, leveraging the Vercel AI SDK and OpenAI's GPT model. It provides a modern, responsive interface for users to interact with an AI assistant.

## Features

- Real-time chat interface with streaming responses
- Integration with OpenAI's GPT model via Vercel AI SDK
- Responsive design with dark mode support
- Error handling with modal dialogs
- Auto-resizing text area for input
- Modern UI components from shadcn/ui

## Technologies Used

- Next.js 14
- React 18
- Vercel AI SDK
- OpenAI API
- Tailwind CSS
- Radix UI components (via shadcn/ui)
- TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- npm or yarn

You will also need an OpenAI API key.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/aayank13/gpt_chatbot.git
    cd gpt_chatbot
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file and add your OpenAI API key:
    ```sh
    OPENAI_API_KEY=your-api-key
    ```

4. Run the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage Guide

- Navigate to the home page to access the chatbot interface.
- Type your queries into the input field and press Enter or click the send button.
- View the AI's responses in real-time, with smooth streaming text updates.
- Use the dark mode toggle to switch between light and dark themes.

## Deployment Information

To deploy the application, you can use Vercel:

1. Push your code to a GitHub repository.
2. Link the repository to your Vercel account.
3. Set up the necessary environment variables in the Vercel dashboard.
4. Deploy the project with a single click.

Alternatively, you can use another hosting provider that supports Next.js.

## Contribution Guidelines

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
    ```sh
    git checkout -b feature-name
    ```
3. Commit your changes with clear messages:
    ```sh
    git commit -m "Add feature-name"
    ```
4. Push the branch to your forked repository:
    ```sh
    git push origin feature-name
    ```
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Vercel AI SDK](https://sdk.vercel.ai/) for providing easy integration with OpenAI.
- [shadcn/ui](https://ui.shadcn.com/) for modern and accessible UI components.
- [OpenAI](https://platform.openai.com/) for the GPT model API.
- All contributors who helped build and improve this project.
