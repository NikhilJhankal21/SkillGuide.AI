const { PDFParse } = require('pdf-parse')
const {
    generateInterviewReport,
    generateResumePdf
} = require('../services/ai.service')

const interviewReportModel = require('../models/interviewReport.model')


/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterviewReportController(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Resume PDF file is required."
            })
        }

        const parser = new PDFParse({
            data: req.file.buffer
        })

        const result = await parser.getText()

        const resumeContent = result.text

        await parser.destroy()

        const {
            selfDescription,
            jobDescription
        } = req.body

        if (!jobDescription) {
            return res.status(400).json({
                message: "Job description is required."
            })
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        })

        const userId = req.user._id || req.user.id

        const interviewReport = await interviewReportModel.create({
            user: userId,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })

    } catch (error) {

        console.error(
            "[Controller Error] generateInterviewReport:",
            error
        )

        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}


/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    try {

        const { interviewId } = req.params

        const userId = req.user._id || req.user.id

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: userId
        })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })

    } catch (error) {

        console.error(
            "[Controller Error] getInterviewReportById:",
            error
        )

        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}


/**
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {

    try {

        const userId = req.user._id || req.user.id

        const interviewReports = await interviewReportModel
            .find({ user: userId })
            .sort({ createdAt: -1 })
            .select(
                "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
            )

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })

    } catch (error) {

        console.error(
            "[Controller Error] getAllInterviewReports:",
            error
        )

        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {

    try {

        const { interviewReportId } = req.params

        const userId = req.user._id || req.user.id

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: userId
        })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const {
            resume,
            jobDescription,
            selfDescription
        } = interviewReport

        console.log(
            "[Resume PDF] Generating PDF for report:",
            interviewReportId
        )

        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription
        })

        console.log("[Resume PDF] PDF generated.")

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)

    } catch (error) {

        console.error(
            "[Controller Error] generateResumePdf:",
            error
        )

        res.status(500).json({
            message: error.message || "Internal server error"
        })
    }
}


module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
}