import React from 'react'
import { useNavigate } from 'react-router'
import '../style/landing.scss'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="landing-page">

            {/* ================= NAVBAR ================= */}
            <nav className="landing-navbar">
                <div
                    className="landing-brand"
                    onClick={() => navigate('/')}
                >
                    <div className="landing-brand-icon">
                        ✦
                    </div>
                    <div className="landing-brand-text">
                        <h2>SkillGuide.AI</h2>
                        <span>Career Preparation</span>
                    </div>
                </div>

                <div className="landing-nav-actions">
                    <button
                        className="landing-login-btn"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>

                    <button
                        className="landing-start-btn"
                        onClick={() => navigate('/register')}
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ================= HERO ================= */}
            <main>
                <section className="landing-hero">
                    <div className="hero-badge">
                        <span>✦</span>
                        AI-Powered Career & Interview Preparation
                    </div>

                    <h1>
                        Prepare Smarter.
                        <br />
                        <span>Interview Better.</span>
                    </h1>

                    <p>
                        Turn your resume and target job description into a
                        personalized preparation strategy powered by AI.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="hero-primary-btn"
                            onClick={() => navigate('/register')}
                        >
                            Start Preparing
                            <span>→</span>
                        </button>

                        <button
                            className="hero-secondary-btn"
                            onClick={() => navigate('/login')}
                        >
                            I already have an account
                        </button>
                    </div>

                    <div className="hero-note">
                        No complicated setup • Personalized for you • AI powered
                    </div>
                </section>

                {/* ================= FEATURES ================= */}
                <section className="features-section">
                    <div className="section-heading">
                        <span>WHY SKILLGUIDE.AI?</span>
                        <h2>
                            Everything you need to prepare with confidence.
                        </h2>
                        <p>
                            Stop preparing blindly. SkillGuide.AI understands the
                            role you're targeting and helps you focus on what
                            actually matters.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📄</div>
                            <h3>Resume Analysis</h3>
                            <p>
                                Upload your resume and let AI understand your
                                experience, skills and background.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Job-Specific Preparation</h3>
                            <p>
                                Analyze the target job description and identify
                                the skills and topics most relevant to the role.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>AI Interview Strategy</h3>
                            <p>
                                Get personalized technical questions, answer
                                guidance and a preparation strategy.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📈</div>
                            <h3>Skill Gap Insights</h3>
                            <p>
                                Discover where your current profile stands
                                against the requirements of your target role.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ================= HOW IT WORKS ================= */}
                <section className="how-section">
                    <div className="section-heading">
                        <span>HOW IT WORKS</span>
                        <h2>
                            From profile to interview plan in minutes.
                        </h2>
                    </div>

                    <div className="steps">
                        <div className="step">
                            <div className="step-number">01</div>
                            <div>
                                <h3>Tell us about the role</h3>
                                <p>
                                    Paste the job description you're preparing
                                    for.
                                </p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-number">02</div>
                            <div>
                                <h3>Share your profile</h3>
                                <p>
                                    Upload your resume or describe your
                                    experience and skills.
                                </p>
                            </div>
                        </div>

                        <div className="step">
                            <div className="step-number">03</div>
                            <div>
                                <h3>Get your strategy</h3>
                                <p>
                                    Let AI create a focused interview plan
                                    tailored specifically to you.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= CTA ================= */}
                <section className="landing-cta">
                    <div>
                        <span>READY TO PREPARE?</span>
                        <h2>
                            Walk into your next interview prepared.
                        </h2>
                        <p>
                            Build your personalized interview strategy today.
                        </p>
                    </div>

                    <button onClick={() => navigate('/register')}>
                        Create Your Plan
                        <span>→</span>
                    </button>
                </section>
            </main>

            {/* ================= FOOTER ================= */}
            <footer className="landing-footer">
                <div>
                    © 2026 SkillGuide.AI
                </div>
                <div className="footer-links">
                    <span>Privacy</span>
                    <span>Terms</span>
                    <span>Help</span>
                </div>
            </footer>
        </div>
    )
}

export default Landing