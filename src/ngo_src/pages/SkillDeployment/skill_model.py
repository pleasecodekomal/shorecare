import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

# Sample training data
data = {
    'First Aid': [1, 0, 0, 1, 0],
    'Waste Sorting': [1, 1, 0, 0, 1],
    'Team Lead': [1, 0, 1, 0, 0],
    'ExperienceYears': [3, 1, 2, 4, 1],
    'BestRole': ['Team Lead', 'Waste Sorter', 'Team Lead', 'First Aider', 'Waste Sorter']
}

df = pd.DataFrame(data)

X = df.drop('BestRole', axis=1)
y = df['BestRole']

model = DecisionTreeClassifier()
model.fit(X, y)

joblib.dump(model, 'skill_predictor.joblib')
