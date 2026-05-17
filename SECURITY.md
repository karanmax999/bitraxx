# Security Policy

Bitraxx is committed to maintaining the highest security standards for our investors, administrators, and the Web3 ecosystem. This document outlines our security measures, vulnerability reporting policy, and response procedures.

## 🛡️ Security Measures

The Bitraxx Launchpad has been engineered with security-first architecture. Our core defensive measures include:

- **OAuth 2.0 Authentication**: Standardized identity management and session isolation integrated directly with the Manus OAuth portal.
- **Strict Rate Limiting**: Application-wide limits (`100 requests per 15-minute window` per unique IP) protecting endpoints against brute-force and DDoS attempts.
- **Robust Input Validation**: Strict validation of all API payloads and queries using declarative Zod schemas on the tRPC layer.
- **SQL Injection Prevention**: Parameterized queries and prepared statements enforced natively by the Drizzle ORM layer.
- **Cross-Site Scripting (XSS) Protection**: Automatic JSX escaping coupled with a hardened Content Security Policy (CSP) header set.
- **Cross-Site Request Forgery (CSRF) Protection**: Strict `SameSite=Strict` and secure HTTP-Only cookie enforcement for web session tokens.
- **Access Control Policies**: Strict server-side route guards enforcing separate `publicProcedure`, `protectedProcedure`, and `adminProcedure` contexts.
- **Encrypted Storage**: Secure KYC documentation uploads processed via pre-signed S3 URLs into encrypted private storage buckets.
- **Audit Logging**: Comprehensive internal audit ledger records documenting database mutations, IP origins, administrative updates, and actor hashes.

---

## 🐛 Reporting Vulnerabilities

If you discover a security vulnerability in our platform, please report it to us immediately. **Do NOT open public GitHub issues or discuss bugs publicly.**

### How to Submit a Report
Please send an email to our Security Operations team:
* **Email**: [security@bitraxx.io](mailto:security@bitraxx.io)

For sensitive reports, we encourage encrypting your message. Please include the following details in your report:
1. **Description**: Detailed description of the vulnerability and its potential impact.
2. **Steps to Reproduce**: Clear, step-by-step instructions (with proof-of-concept scripts or screenshots if applicable).
3. **Environment**: Details about the client, endpoint, or environment where the bug was found.
4. **Fix Suggestion**: If you have a recommendation on how to patch the issue, please include it.

---

## ⏱️ Response SLA & Disclosure Policy

Our security response lifecycle follows a strict protocol:

| Stage | Action | Target Timeline |
|:---|:---|:---|
| **Acknowledgment** | Initial receipt of report and start of triage process | Within 24 hours |
| **Status Update** | Assessment results and validation confirmation | Within 72 hours |
| **Remediation Plan** | Finalizing the software patch and testing deployment | Within 7 days |
| **Public Disclosure** | Coordinated publication of the fix (if required) | Mutual agreement (post-patch) |

We practice **Coordinated Vulnerability Disclosure**. We ask that you give us adequate time to patch and verify the vulnerability before disclosing it to the public or any third party.

---

## 🤝 Safe Harbor Statement

We greatly value the work of security researchers. If you make a good faith effort to comply with this policy during your security research, we will:

- Consider your research to be authorized and helpful.
- Not pursue legal action against you for research activities conducted under this policy.
- Work with you to understand and resolve the issue quickly.
- Acknowledge your contribution in our upcoming CHANGELOG files and security credits.

Thank you for helping keep the Bitraxx Launchpad safe for everyone!
