const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')
const puppeteer = require('puppeteer')

// Initialize Google Gen AI client with the environment API key
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day")
    })).describe("A day-wise preparation plan for the candidate"),
    title: z.string().describe("The title of the job for which the interview report is generated")
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
        Resume: ${resume || "Not provided"}
        Self Description: ${selfDescription || "Not provided"}
        Job Description: ${jobDescription}
    `

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    return JSON.parse(response.text)
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
    })
    
    try {
        const page = await browser.newPage()
        await page.setContent(htmlContent, { waitUntil: "networkidle0" })

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            displayHeaderFooter: false,
            margin: {
                top: "15mm",
                bottom: "15mm",
                left: "15mm",
                right: "15mm"
            }
        })
        return pdfBuffer
    } finally {
        await browser.close()
    }
}

async function generateResumePdf({ resume, jobDescription, selfDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The clean, styled HTML content of the resume with inline CSS suitable for PDF conversion")
    })

    const prompt = `Generate an ATS-friendly, professional resume for a candidate:
        Resume: ${resume || "Not provided"}
        Self Description: ${selfDescription || "Not provided"}
        Job Description: ${jobDescription}

        Return a single JSON field "html" containing clean semantic HTML and inline CSS. 
        CRITICAL REQUIREMENT FOR LINKS: Ensure all links (LinkedIn, GitHub, LeetCode, portfolio, etc.) are valid HTML anchor tags with full absolute URLs including 'https://' (e.g., <a href="https://github.com/username">GitHub</a>) so that they remain interactive and clickable in the downloaded PDF.
        The resume must be visually polished, 1 page long, and tailored directly to the target role.
    `

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema)
        }
    })

    const jsonContent = JSON.parse(response.text)
    return await generatePdfFromHtml(jsonContent.html)
}

module.exports = { generateInterviewReport, generateResumePdf }