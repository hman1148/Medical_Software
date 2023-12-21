from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
import os
import tempfile


def create_report(patient_data):
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:

        
        filename = f"{patient_data.name}_medical_report.pdf"
        #initialize 
        c = canvas.Canvas(tmp_file.name, pagesize=letter)
        width, height = letter
        
        c.setStrokeColor(colors.black)
        c.setFillColor(colors.lightgrey)
        c.rect(50, height - 100, width - 100, 60, fill=1)
        
        c.setFont("Helvetica-Bold", 16)
        c.setFillColor(colors.black)
        c.drawString(60, height - 80, f"{patient_data.name}'s Report")
        
        c.setFont("Helvetica", 12)
        pattient_info_y = height - 130

        patient_info_fields = [
            ('Name', patient_data.name),
            ('Address', patient_data.address),
            ('Email', patient_data.email),
            ('Birthday', patient_data.birthday.strftime('%B %d, %Y') if patient_data.birthday else ''),
            ('Phone Number', patient_data.phone_number),
            ('Primary Insurance', patient_data.primary_insurance),
            ('Secondary Insurance', patient_data.secondary_insurance),
            ('Date of Fitting', patient_data.date_of_fitting.strftime('%B %d, %Y') if patient_data.date_of_fitting else ''),
            ('Warranty Expiration', patient_data.warranty_expiration.strftime('%B %d, %Y') if patient_data.warranty_expiration else ''),
            ('Cost of Reimbursement', f"${patient_data.cost_of_hearing_aid}")
        ]
        c.setFont("Helvetica", 12)
        
        for key, value in patient_info_fields:
            c.drawString(60, pattient_info_y, f"{key}: {value}")
            pattient_info_y -= 20
        
        c.save()
        
        return tmp_file.name