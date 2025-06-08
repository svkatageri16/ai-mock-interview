import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
    return Response.json({ success: true, data: "THANK YOU!" }, { status: 200 });
}

export async function POST(request: Request) {
    // 🔍 Debug: Log incoming request details
    console.log("📩 Vapi Request Method:", request.method);
    console.log("📩 Vapi Request Headers:", JSON.stringify(request.headers, null, 2));
    const body = await request.json();
    console.log("📩 Vapi Request Body:", JSON.stringify(body, null, 2));

    // ✅ Extract from Vapi ToolCall structure
    const args = JSON.parse(
        body?.message?.toolCallList?.[0]?.function?.arguments || "{}"
    );

    console.log("📤 Parsed Arguments:", JSON.stringify(args, null, 2));
    const { type, role, level, techstack, amount, userid } = args;

    try {
        // 🔍 Debug: Log prompt about to be sent to Gemini
        const prompt = `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
        `;
        console.log("📤 Prompt sent to Gemini:\n", prompt);

        // Call Gemini to generate questions
        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt
        });

        console.log("✅ Raw Gemini Output:", questions);

        // Clean and parse the questions array
        const cleaned = questions.trim().replace(/^```json/, '').replace(/```$/, '').trim();
        let parsedQuestions;
        try {
            parsedQuestions = JSON.parse(cleaned);
            console.log("✅ Parsed Questions Array:", parsedQuestions);
        } catch (parseError) {
            console.error("❌ Error parsing Gemini response:", parseError);
            throw parseError;
        }

        // Prepare interview object for Firestore
        const interview = {
            role,
            type,
            level,
            techstack: techstack.split(","),
            questions: parsedQuestions,
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        // 🔍 Debug: Log Firestore document to be added
        console.log("📤 Storing interview in Firestore:", JSON.stringify(interview, null, 2));
        await db.collection("interviews").add(interview);

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("🔥 VAPI POST Error:", error);
        return Response.json({ success: false, error }, { status: 500 });
    }
}
