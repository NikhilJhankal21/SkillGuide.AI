import React, { useRef, useState, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { useNavigate } from 'react-router'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const { user, handleLogout } = useAuth()

    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [error, setError] = useState("")
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        const root = document.getElementById("root");
        if (darkMode) {
            document.documentElement.style.backgroundColor = "#080b12"
            document.body.style.backgroundColor = "#080b12"
            document.body.style.color = "#f8fafc"
            if (root) root.style.backgroundColor = "#080b12"
        } else {
            document.documentElement.style.backgroundColor = "#f1f5f9"
            document.body.style.backgroundColor = "#f1f5f9"
            document.body.style.color = "#0f172a"
            if (root) root.style.backgroundColor = "#f1f5f9"
        }
    }, [darkMode])

    const resumeInputRef = useRef()
    const navigate = useNavigate()

    // Handle Resume Upload
    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (!file) {
            setSelectedFile(null)
            return
        }

        // 5MB validation
        if (file.size > 5 * 1024 * 1024) {
            setError("Resume file must be less than 5MB.")
            setSelectedFile(null)
            e.target.value = ""
            return
        }

        setError("")
        setSelectedFile(file)
    }

    // Generate Interview Report
    const handleGenerateReport = async () => {
        setError("")
        const resumeFile = resumeInputRef.current?.files[0]

        // Job description validation
        if (!jobDescription.trim()) {
            setError("Please enter the job description.")
            return
        }

        // Resume / self-description validation
        if (!resumeFile && !selfDescription.trim()) {
            setError("Please upload a resume or enter your self-description.")
            return
        }

        try {
            const data = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile
            })

            if (!data) {
                setError("We couldn't generate your interview plan right now. Please try again.")
                return
            }

            navigate(`/interview/${data._id}`)
        } catch (err) {
            console.error(err)
            setError("Something went wrong while generating your interview plan.")
        }
    }

    // Logout
    const handleLogoutUser = async () => {
        await handleLogout()
        navigate("/login")
    }

    // Loading Screen (Modern Glass Card + Spinner)
    if (loading) {
        return (
            <main className="loading-screen">
                <div className="loading-card">
                    <div className="loading-spinner"></div>
                    <h2>Building your interview strategy...</h2>
                    <p>Our AI is analyzing the job description and your profile. This will take just a moment.</p>
                </div>
            </main>
        )
    }

    return (
        <div className={`home-page ${darkMode ? "dark-mode" : "light-mode"}`}>

            {/* ================= NAVBAR ================= */}
            <nav className="navbar">
                <div className="brand" onClick={() => navigate("/")}>
                    <div className="brand-icon">✦</div>
                    <div className="brand-text">
                        <h2>SkillGuide.AI</h2>
                        <span>Career Preparation</span>
                    </div>
                </div>

                <div className="navbar-actions">
                    <div className="user-info">
                        <div className="user-avatar">
                            {user?.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="user-details">
                            <strong>{user?.username || "User"}</strong>
                            <span>Candidate</span>
                        </div>
                    </div>

                    <button
                        className="icon-button"
                        onClick={() => setDarkMode(!darkMode)}
                        title="Toggle theme"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <button
                        className="logout-button"
                        onClick={handleLogoutUser}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* ================= HERO ================= */}
            <header className="page-header">
                <div className="hero-badge">
                    <span>✦</span>
                    AI-Powered Interview Preparation
                </div>

                <h1>
                    Prepare Smarter.
                    <br />
                    <span className="highlight">Interview Better.</span>
                </h1>

                <p>
                    Upload your resume, add the target job description,
                    and let AI create a personalized interview strategy for you.
                </p>
            </header>

            {/* ================= MAIN CARD ================= */}
            <div className="interview-card">
                <div className="interview-card__body">

                    {/* ================= JOB DESCRIPTION ================= */}
                    <div className="panel panel--left">
                        <div className="panel__header">
                            <span className="panel__icon">💼</span>
                            <h2>Target Job Description</h2>
                            <span className="badge badge--required">Required</span>
                        </div>

                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="panel__textarea"
                            placeholder={`Paste the full job description here...\n\nExample:\nFrontend Developer with strong React, JavaScript, TypeScript and REST API experience...`}
                            maxLength={5000}
                        />

                        <div className="char-counter">
                            {jobDescription.length} / 5000
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="panel-divider"></div>

                    {/* ================= PROFILE ================= */}
                    <div className="panel panel--right">
                        <div className="panel__header">
                            <span className="panel__icon">👤</span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className="upload-section">
                            <label className="section-label">
                                Upload Resume
                                <span className="badge badge--best">Best Results</span>
                            </label>

                            <label
                                className={`dropzone ${selectedFile ? "has-file" : ""}`}
                                htmlFor="resume"
                            >
                                <span className="dropzone__icon">
                                    {selectedFile ? "📄" : "☁️"}
                                </span>

                                {selectedFile ? (
                                    <>
                                        <p className="dropzone__title">{selectedFile.name}</p>
                                        <p className="dropzone__subtitle">Resume selected successfully</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="dropzone__title">Click to upload your resume</p>
                                        <p className="dropzone__subtitle">PDF or DOCX • Maximum 5MB</p>
                                    </>
                                )}

                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf,.docx"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className="or-divider">
                            <span>OR</span>
                        </div>

                        {/* Self Description */}
                        <div className="self-description">
                            <label className="section-label" htmlFor="selfDescription">
                                Quick Self-Description
                            </label>
                            <textarea
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id="selfDescription"
                                name="selfDescription"
                                className="panel__textarea panel__textarea--short"
                                placeholder="Briefly describe your experience, skills and background..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className="info-box">
                            <span className="info-box__icon">💡</span>
                            <p>
                                Upload a <strong>resume</strong> or provide a <strong>self-description</strong> to get personalized interview preparation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="generation-error">
                        ⚠️ {error}
                    </div>
                )}

                {/* Footer */}
                <div className="interview-card__footer">
                    <span className="footer-info">
                        ✦ AI Strategy Generation • Usually takes ~30 seconds
                    </span>

                    <button
                        onClick={handleGenerateReport}
                        className="generate-btn"
                        disabled={loading}
                    >
                        <span>✦</span>
                        Generate Interview Strategy
                    </button>
                </div>
            </div>

            {/* ================= RECENT REPORTS ================= */}
            {reports && reports.length > 0 && (
                <section className="recent-reports">
                    <div className="section-heading">
                        <div>
                            <span className="small-label">YOUR HISTORY</span>
                            <h2>Recent Interview Plans</h2>
                        </div>
                        <span className="report-count">{reports.length} Plans</span>
                    </div>

                    <div className="reports-list">
                        {reports.map((report) => (
                            <div
                                key={report._id}
                                className="report-item"
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <div className="report-icon">💼</div>
                                <div className="report-content">
                                    <h3>{report.title || "Untitled Position"}</h3>
                                    <p>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="report-score">
                                    <span>Match</span>
                                    <strong>{report.matchScore ?? 0}%</strong>
                                </div>
                                <span className="report-arrow">→</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ================= FOOTER ================= */}
            <footer className="page-footer">
                <span>© 2026 SkillGuide.AI</span>
                <div>
                    <a href="#privacy">Privacy</a>
                    <a href="#terms">Terms</a>
                    <a href="#help">Help</a>
                </div>
            </footer>
        </div>
    )
}

export default Home