import axios from "axios";

async function testChatEndpoint() {
    try {
        console.log("Testing /api/chat endpoint...");
        const response = await axios.post("http://localhost:5000/api/chat", {
            message: "Hello, I need medical help."
        });

        console.log("Response Status:", response.status);
        console.log("AI Reply:", response.data.reply);
    } catch (error) {
        console.error("Endpoint Error:", error.response?.data || error.message);
    }
}

testChatEndpoint();
