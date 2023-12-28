import pandas as pd
from io import BytesIO


def process_excel_file(file) -> dict:
    
    # use the pandas to parse the excel file contents
    excel_data = pd.read_excel(BytesIO(file.read()))
    
    return excel_data.to_dict(orient="records")