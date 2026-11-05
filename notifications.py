"""Outbound notification helpers configured entirely through environment variables."""
import json
import os
import smtplib
import urllib.request
from email.message import EmailMessage


def send_email(recipient: str, subject: str, body: str):
    resend_key = os.getenv('RESEND_API_KEY')
    if resend_key:
        sender = os.getenv('RESEND_FROM')
        if not sender:
            return False, 'Resend sender address is not configured.'
        payload = json.dumps({
            'from': sender, 'to': [recipient], 'subject': subject,
            'text': body,
        }).encode('utf-8')
        request = urllib.request.Request('https://api.resend.com/emails', data=payload, method='POST')
        request.add_header('Authorization', f'Bearer {resend_key}')
        request.add_header('Content-Type', 'application/json')
        try:
            with urllib.request.urlopen(request, timeout=15) as response:
                response.read()
            return True, 'Email sent.'
        except Exception as error:
            print(f'Resend notification error: {error}')
            return False, 'Email could not be sent through Resend.'

    host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
    username = os.getenv('SMTP_USERNAME')
    # Google displays App Passwords in groups; whitespace is not part of the password.
    password = ''.join(os.getenv('SMTP_PASSWORD', '').split())
    sender = os.getenv('SMTP_FROM', username or '')
    if not username or not password or not sender:
        return False, 'Email service is not configured.'
    message = EmailMessage()
    message['From'], message['To'], message['Subject'] = sender, recipient, subject
    message.set_content(body)
    try:
        port = int(os.getenv('SMTP_PORT', '465'))
        if port == 465:
            smtp_connection = smtplib.SMTP_SSL(host, port, timeout=15)
        else:
            smtp_connection = smtplib.SMTP(host, port, timeout=15)
        with smtp_connection as smtp:
            if port != 465:
                smtp.starttls()
            smtp.login(username, password)
            smtp.send_message(message)
        return True, 'Email sent.'
    except Exception as error:
        print(f'Email notification error: {error}')
        return False, 'Email could not be sent.'


def send_reservation_notification(details: dict):
    recipient = os.getenv('NOTIFICATION_EMAIL', 'Xpharma25@gmail.com')
    body = '\n'.join([
        'New XPharma reservation', '',
        f"Customer: {details['customer_name']}", f"Email: {details['customer_email']}",
        f"Phone: {details['customer_phone']}", f"Product reference: {details['product_id']}",
        f"City: {details.get('customer_city') or 'Not provided'}", f"Address: {details.get('customer_address') or 'Not provided'}",
        f"Quantity: {details['quantity']}", f"Collection date: {details['pickup_date']}",
        f"Payment: {details['payment_method']}", f"Total: EGP {details['total']:.2f}",
    ])
    return send_email(recipient, 'New XPharma reservation', body)


def send_cancellation_notification(details: dict):
    recipient = os.getenv('NOTIFICATION_EMAIL', 'Xpharma25@gmail.com')
    body = '\n'.join([
        'XPharma reservation cancelled', '',
        f"Reservation ID: {details['reservation_id']}",
        f"Customer: {details['customer_name']}",
        f"Email: {details['customer_email']}",
        f"Phone: {details['customer_phone']}",
        f"Product: {details['product_name']} ({details['product_id']})",
        f"Quantity: {details['quantity']}",
        f"Collection date: {details['pickup_date']}",
        f"Payment method: {details['payment_method']}",
    ])
    return send_email(recipient, 'XPharma reservation cancelled', body)
