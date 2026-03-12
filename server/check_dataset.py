import pandas as pd
df = pd.read_excel(r"C:\Users\gowth\OneDrive\Desktop\Crop Recommendations and Resource Allocation using FRNN\Fuzzified_RNN_Crop_Recommendation_With_Yield_CORRECTED.xlsx")
print("UNIQUE CROPS IN DATASET:")
print(df['Recommended_Crop'].unique())
