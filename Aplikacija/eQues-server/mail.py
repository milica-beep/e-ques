from app import mail
from flask_mail import Message

def send_mail(subject, recipient, body):
    print('u mail')
    msg = Message(subject, recipients=[f'{recipient}'])
    print(subject)
    print(recipient)
    msg.body = body
    mail.send(msg)