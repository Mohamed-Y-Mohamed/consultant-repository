from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import asyncio
import re
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
import html as html_lib

import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend config
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
CONTACT_TO_EMAIL = os.environ.get('CONTACT_TO_EMAIL', 'm.y.m1995@outlook.com').strip()
CONTACT_FROM_EMAIL = os.environ.get('CONTACT_FROM_EMAIL', 'onboarding@resend.dev').strip()

if RESEND_API_KEY and not RESEND_API_KEY.startswith('re_placeholder'):
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Evora Capital API")
api_router = APIRouter(prefix="/api")


class ContactRequest(BaseModel):
    fullName: str = Field(min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)
    company: Optional[str] = Field(default="", max_length=200)
    enquiryType: Optional[str] = Field(default="General Enquiry", max_length=100)


@api_router.get("/")
async def root():
    return {"message": "Evora Capital API", "ok": True}


@api_router.get("/contact")
async def contact_health():
    configured = bool(RESEND_API_KEY) and not RESEND_API_KEY.startswith('re_placeholder')
    return {"ok": True, "route": "contact", "email_configured": configured}


def _build_email_html(name: str, email: str, company: str, enquiry: str, message: str) -> str:
    esc = html_lib.escape
    return f"""
    <div style="font-family: Arial, sans-serif; background:#0E0C0A; color:#F5F0E8; padding:32px;">
      <div style="max-width:600px; margin:0 auto; background:#1A1816; border:1px solid #3A3530; padding:32px;">
        <p style="color:#C9A96E; letter-spacing:0.22em; font-size:11px; text-transform:uppercase; margin:0 0 8px;">Evora Capital — New Enquiry</p>
        <h1 style="font-family: Georgia, serif; color:#F5F0E8; font-weight:300; margin:0 0 24px; font-size:26px;">{esc(enquiry)}</h1>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:8px 0; color:#A8A09A; width:120px;">Name</td><td style="padding:8px 0; color:#F5F0E8;">{esc(name)}</td></tr>
          <tr><td style="padding:8px 0; color:#A8A09A;">Email</td><td style="padding:8px 0; color:#F5F0E8;"><a href="mailto:{esc(email)}" style="color:#C9A96E; text-decoration:none;">{esc(email)}</a></td></tr>
          <tr><td style="padding:8px 0; color:#A8A09A;">Company</td><td style="padding:8px 0; color:#F5F0E8;">{esc(company) if company else '—'}</td></tr>
          <tr><td style="padding:8px 0; color:#A8A09A; vertical-align:top;">Enquiry</td><td style="padding:8px 0; color:#F5F0E8;">{esc(enquiry)}</td></tr>
        </table>
        <hr style="border:none; border-top:1px solid #3A3530; margin:20px 0;" />
        <p style="color:#A8A09A; letter-spacing:0.22em; font-size:10px; text-transform:uppercase; margin:0 0 10px;">Message</p>
        <p style="color:#F5F0E8; font-size:14px; line-height:1.7; white-space:pre-wrap; margin:0;">{esc(message)}</p>
      </div>
      <p style="color:#7F7872; font-size:11px; text-align:center; margin-top:20px;">Sent via evoracapital.com contact form</p>
    </div>
    """


@api_router.post("/contact")
async def contact_submit(payload: ContactRequest):
    name = payload.fullName.strip()
    email = str(payload.email).strip()
    message = payload.message.strip()
    company = (payload.company or "").strip()
    enquiry = (payload.enquiryType or "General Enquiry").strip()

    if not name or not email or not message:
        raise HTTPException(status_code=400, detail="Full name, email, and message are required.")

    if not RESEND_API_KEY or RESEND_API_KEY.startswith('re_placeholder'):
        logging.warning("Contact enquiry received but RESEND_API_KEY not configured: %s <%s> | %s", name, email, enquiry)
        raise HTTPException(
            status_code=503,
            detail="Email service is not yet configured. The site owner needs to add RESEND_API_KEY.",
        )

    html_body = _build_email_html(name, email, company, enquiry, message)

    params = {
        "from": f"Evora Capital <{CONTACT_FROM_EMAIL}>",
        "to": [CONTACT_TO_EMAIL],
        "reply_to": [email],
        "subject": f"New Enquiry — {enquiry} — {name}",
        "html": html_body,
    }

    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logging.info("Enquiry sent via Resend: id=%s to=%s", (result or {}).get('id'), CONTACT_TO_EMAIL)
        return {"ok": True, "id": (result or {}).get('id')}
    except Exception as exc:
        logging.exception("Failed to send email via Resend: %s", exc)
        raise HTTPException(status_code=502, detail="Unable to send message. Please try again shortly.")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
