const dotenv = require("dotenv");
dotenv.config();
const { OpenAI } = require("openai");

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text input is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a summarization assistant." }, { role: "user", content: `Summarize this: \n${text}` }],
      max_tokens: 500,
      temperature: 0.5,
    });

    const summary = response.choices[0]?.message?.content?.trim();
    if (summary) {
      return res.status(200).json(summary);
    } else {
      return res.status(204).json({ message: "No summary generated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text input is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a paragraph writing assistant." }, { role: "user", content: `Write a detailed paragraph about: \n${text}` }],
      max_tokens: 500,
      temperature: 0.5,
    });

    const paragraph = response.choices[0]?.message?.content?.trim();
    if (paragraph) {
      return res.status(200).json(paragraph);
    } else {
      return res.status(204).json({ message: "No paragraph generated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text input is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are Yoda from Star Wars." }, { role: "user", content: `${text}` }],
      max_tokens: 300,
      temperature: 0.7,
    });

    const answer = response.choices[0]?.message?.content?.trim();
    if (answer) {
      return res.status(200).json(answer);
    } else {
      return res.status(204).json({ message: "No response generated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text input is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a JavaScript code converter." }, { role: "user", content: `Convert these instructions into JavaScript code:\n${text}` }],
      max_tokens: 400,
      temperature: 0.25,
    });

    const code = response.choices[0]?.message?.content?.trim();
    if (code) {
      return res.status(200).json(code);
    } else {
      return res.status(204).json({ message: "No code generated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text input is required" });
    }

    const response = await openai.images.generate({
      prompt: `Generate a sci-fi image of: ${text}`,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data[0]?.url;
    if (imageUrl) {
      return res.status(200).json(imageUrl);
    } else {
      return res.status(204).json({ message: "No image generated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
