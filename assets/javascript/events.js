/* ========================================
   EVENTS PAGE
   ======================================== */

.events-hero {
    position: relative;
    min-height: 720px;
    display: flex;
    align-items: center;
    padding: 150px 0 100px;
    overflow: hidden;

    background:
        radial-gradient(
            circle at 15% 25%,
            rgba(37, 99, 235, 0.2),
            transparent 34%
        ),
        radial-gradient(
            circle at 90% 70%,
            rgba(124, 58, 237, 0.22),
            transparent 36%
        ),
        var(--bg-body);
}

.events-hero::after {
    content: '';
    position: absolute;
    width: 520px;
    height: 520px;
    right: -180px;
    top: 100px;
    border: 1px solid rgba(96, 165, 250, 0.15);
    border-radius: 50%;
    box-shadow:
        0 0 0 35px rgba(96, 165, 250, 0.04),
        0 0 0 70px rgba(167, 139, 250, 0.03);
    pointer-events: none;
}

.events-hero-grid {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 70px;
    align-items: center;
}

.events-hero-content {
    position: relative;
    z-index: 2;
}

.events-hero h1 {
    max-width: 700px;
    margin: 22px 0;
    font-size: clamp(42px, 6vw, 72px);
    line-height: 1.05;
    letter-spacing: -3px;
    font-weight: 900;
}

.events-hero-content > p {
    max-width: 600px;
    color: var(--text-secondary);
    font-size: 18px;
    line-height: 1.8;
}

.events-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 34px 0 42px;
}

.events-hero-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
    padding-top: 25px;
    border-top: 1px solid var(--border-color);
}

.events-hero-stats div {
    display: flex;
    flex-direction: column;
}

.events-hero-stats strong {
    color: var(--text-primary);
    font-size: 25px;
    font-weight: 800;
}

.events-hero-stats span {
    color: var(--text-secondary);
    font-size: 12px;
}

/* Hero calendar artwork */

.events-hero-visual {
    position: relative;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.events-calendar-card {
    position: relative;
    z-index: 2;
    width: min(100%, 430px);
    padding: 30px;
    border: 1px solid rgba(147, 197, 253, 0.3);
    border-radius: 28px;
    background:
        linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.15),
            rgba(255, 255, 255, 0.045)
        );
    box-shadow:
        0 35px 90px rgba(0, 0, 0, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(20px);
    transform: rotate(3deg);
}

.calendar-top {
    display: flex;
    justify-content: space-between;
    color: #93c5fd;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
}

.calendar-date {
    display: flex;
    align-items: center;
    gap: 18px;
    margin: 38px 0 28px;
}

.calendar-date strong {
    font-size: 110px;
    line-height: 0.8;
    font-weight: 900;
    background: var(--gradient-2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.calendar-date span {
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 1px;
}

.calendar-divider {
    height: 1px;
    margin-bottom: 24px;
    background: rgba(255, 255, 255, 0.14);
}

.calendar-event {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 16px 0;
}

.calendar-event i {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 11px;
    color: #fff;
    background: var(--gradient-1);
}

.calendar-event strong,
.calendar-event span {
    display: block;
}

.calendar-event strong {
    margin-bottom: 3px;
    color: var(--text-primary);
    font-size: 14px;
}

.calendar-event span {
    color: var(--text-secondary);
    font-size: 12px;
}

.events-orbit {
    position: absolute;
    border: 1px solid rgba(96, 165, 250, 0.25);
    border-radius: 50%;
    pointer-events: none;
}

.orbit-one {
    width: 460px;
    height: 250px;
    transform: rotate(-28deg);
}

.orbit-two {
    width: 360px;
    height: 190px;
    transform: rotate(48deg);
    border-color: rgba(167, 139, 250, 0.25);
}

/* ========================================
   CATEGORY CARDS
   ======================================== */

.event-categories {
    padding: 30px 0 100px;
    background: var(--bg-body);
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
}

.category-card {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 105px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    background: var(--bg-card);
    transition: var(--transition);
}

.category-card:hover {
    transform: translateY(-6px);
    border-color: var(--border-hover);
    box-shadow: var(--shadow-card);
}

.category-card strong,
.category-card small {
    display: block;
}

.category-card strong {
    color: var(--text-primary);
    font-size: 14px;
}

.category-card small {
    margin-top: 4px;
    color: var(--text-secondary);
    font-size: 11px;
}

.category-icon,
.opportunity-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 14px;
    color: #fff;
}

.category-icon {
    width: 45px;
    height: 45px;
}

.category-arrow {
    margin-left: auto;
    color: var(--text-muted);
    font-size: 13px;
    transition: var(--transition);
}

.category-card:hover .category-arrow {
    color: var(--primary-light);
    transform: translateX(4px);
}

.blue {
    background: linear-gradient(135deg, #2563eb, #38bdf8);
}

.purple {
    background: linear-gradient(135deg, #7c3aed, #c084fc);
}

.green {
    background: linear-gradient(135deg, #059669, #34d399);
}

.orange {
    background: linear-gradient(135deg, #ea580c, #fbbf24);
}

/* ========================================
   FEATURED EVENT
   ======================================== */

.featured-event,
.events-list-section,
.opportunities-section {
    padding: 100px 0;
}

.featured-event,
.opportunities-section {
    background: var(--bg-section);
}

.featured-event-card {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: 24px;
    background: var(--bg-card);
    box-shadow: var(--shadow-card);
}

.featured-event-image {
    min-height: 420px;
}

.placeholder-image {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.85);
    background:
        radial-gradient(
            circle at 30% 25%,
            rgba(96, 165, 250, 0.5),
            transparent 30%
        ),
        linear-gradient(135deg, #111c4b, #32145c);
}

.placeholder-image::before {
    content: '';
    position: absolute;
    inset: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
}

.placeholder-image > div {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.placeholder-image i {
    margin-bottom: 10px;
    color: #bfdbfe;
    font-size: 50px;
}

.placeholder-image span {
    font-size: 15px;
    font-weight: 700;
}

.placeholder-image small {
    color: rgba(255, 255, 255, 0.65);
    font-size: 11px;
}

.featured-label {
    position: absolute;
    top: 25px;
    left: 25px;
    z-index: 2;
    padding: 8px 14px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    color: #fff;
    background: rgba(0, 0, 0, 0.25);
    font-size: 11px;
    font-weight: 700;
    backdrop-filter: blur(10px);
}

.featured-event-content {
    padding: 55px;
}

.event-meta,
.event-card-footer,
.featured-event-details {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.event-meta {
    margin-bottom: 20px;
    color: var(--primary-light);
    font-size: 12px;
    font-weight: 600;
}

.event-meta span,
.featured-event-details div {
    display: flex;
    align-items: center;
    gap: 8px;
}

.featured-event-content h3 {
    max-width: 520px;
    margin-bottom: 18px;
    color: var(--text-primary);
    font-size: clamp(27px, 4vw, 42px);
    line-height: 1.15;
}

.featured-event-content > p {
    max-width: 540px;
    margin-bottom: 28px;
    color: var(--text-secondary);
    line-height: 1.8;
}

.featured-event-details {
    margin-bottom: 32px;
    padding: 20px 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.featured-event-details div {
    color: var(--primary-light);
}

.featured-event-details span {
    display: flex;
    flex-direction: column;
    color: var(--text-primary);
    font-size: 13px;
}

.featured-event-details small {
    margin-bottom: 2px;
    color: var(--text-secondary);
    font-size: 10px;
}

/* ========================================
   EVENT CARDS
   ======================================== */

.event-card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
}

.event-card {
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    background: var(--bg-card);
    transition: var(--transition);
}

.event-card:hover,
.opportunity-card:hover {
    transform: translateY(-8px);
    border-color: var(--border-hover);
    box-shadow: var(--shadow-card);
}

.event-card-image {
    height: 220px;
    flex-direction: column;
    gap: 8px;
}

.event-card-image i {
    font-size: 48px;
}

.event-card-image span {
    font-size: 12px;
}

.purple-placeholder {
    background:
        radial-gradient(circle at 75% 25%, rgba(216, 180, 254, 0.45), transparent 30%),
        linear-gradient(135deg, #25104d, #48145b);
}

.green-placeholder {
    background:
        radial-gradient(circle at 25% 25%, rgba(110, 231, 183, 0.35), transparent 30%),
        linear-gradient(135deg, #073b3a, #064e3b);
}

.event-card-body {
    padding: 25px;
}

.event-type {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 12px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.blue-text {
    color: #60a5fa;
}

.purple-text {
    color: #c084fc;
}

.green-text {
    color: #34d399;
}

.event-card h3 {
    margin-bottom: 12px;
    color: var(--text-primary);
    font-size: 20px;
    line-height: 1.3;
}

.event-card p {
    min-height: 75px;
    margin-bottom: 20px;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.7;
}

.event-card-footer {
    justify-content: space-between;
    padding-top: 17px;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-size: 11px;
}

.event-card-footer a,
.text-link {
    color: var(--primary-light);
    font-weight: 600;
}

.event-card-footer a i,
.text-link i {
    margin-left: 5px;
    transition: var(--transition);
}

.event-card-footer a:hover i,
.text-link:hover i {
    transform: translateX(4px);
}

/* ========================================
   OPPORTUNITIES
   ======================================== */

.opportunity-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.opportunity-card {
    padding: 32px 28px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    background: var(--bg-card);
    transition: var(--transition);
}

.opportunity-icon {
    width: 58px;
    height: 58px;
    margin-bottom: 25px;
    font-size: 23px;
}

.opportunity-label {
    display: block;
    margin-bottom: 8px;
    color: var(--primary-light);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.opportunity-card h3 {
    margin-bottom: 12px;
    color: var(--text-primary);
    font-size: 21px;
}

.opportunity-card p {
    min-height: 75px;
    margin-bottom: 22px;
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.75;
}

/* ========================================
   CTA
   ======================================== */

.events-cta {
    padding: 100px 0;
    background: var(--bg-body);
}

.events-cta-card {
    display: grid;
    grid-template-columns: 1fr 0.8fr;
    gap: 60px;
    align-items: center;
    padding: 55px;
    border: 1px solid rgba(96, 165, 250, 0.25);
    border-radius: 25px;
    background:
        radial-gradient(
            circle at 10% 10%,
            rgba(37, 99, 235, 0.18),
            transparent 35%
        ),
        radial-gradient(
            circle at 90% 90%,
            rgba(124, 58, 237, 0.18),
            transparent 35%
        ),
        var(--bg-card);
    box-shadow: var(--shadow-card);
}

.events-cta-card h2 {
    margin: 16px 0 12px;
    font-size: clamp(28px, 4vw, 42px);
}

.events-cta-card p {
    max-width: 580px;
    color: var(--text-secondary);
    line-height: 1.8;
}

.events-subscribe-form {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.events-subscribe-form input {
    flex: 1 1 220px;
    min-width: 0;
    padding: 15px 18px;
    border: 1px solid var(--border-color);
    border-radius: 40px;
    outline: none;
    color: var(--text-primary);
    background: var(--bg-input);
    font-family: inherit;
}

.events-subscribe-form input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.events-subscribe-form small {
    flex-basis: 100%;
    color: var(--text-muted);
    font-size: 11px;
}

/* Accessibility helper */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* ========================================
   RESPONSIVE EVENTS PAGE
   ======================================== */

@media (max-width: 1000px) {
    .events-hero-grid {
        grid-template-columns: 1fr;
    }

    .events-hero-content {
        text-align: center;
    }

    .events-hero-content > p {
        margin-left: auto;
        margin-right: auto;
    }

    .events-hero-actions,
    .events-hero-stats {
        justify-content: center;
    }

    .events-hero-visual {
        min-height: 420px;
    }

    .category-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .featured-event-card {
        grid-template-columns: 1fr;
    }

    .featured-event-image {
        min-height: 320px;
    }

    .event-card-grid,
    .opportunity-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .opportunity-card:last-child {
        grid-column: span 2;
    }

    .events-cta-card {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}

@media (max-width: 700px) {
    .events-hero {
        min-height: auto;
        padding: 130px 0 70px;
    }

    .events-hero h1 {
        letter-spacing: -2px;
    }

    .events-hero-actions {
        flex-direction: column;
        align-items: stretch;
    }

    .events-hero-actions a {
        justify-content: center;
    }

    .events-hero-stats {
        gap: 18px;
    }

    .events-hero-visual {
        min-height: 360px;
    }

    .events-calendar-card {
        padding: 23px;
        transform: none;
    }

    .calendar-date strong {
        font-size: 82px;
    }

    .orbit-one {
        width: 340px;
        height: 200px;
    }

    .orbit-two {
        width: 280px;
        height: 160px;
    }

    .category-grid,
    .event-card-grid,
    .opportunity-grid {
        grid-template-columns: 1fr;
    }

    .opportunity-card:last-child {
        grid-column: auto;
    }

    .featured-event-content {
        padding: 30px 24px;
    }

    .featured-event-image {
        min-height: 270px;
    }

    .events-cta-card {
        padding: 30px 24px;
    }
}
