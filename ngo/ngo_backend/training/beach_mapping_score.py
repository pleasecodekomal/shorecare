# ✅ retrain_beach_score.py

from pymongo import MongoClient
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

# ✅ Connect to your Mongo Atlas
client = MongoClient("mongodb+srv://komal2:mangoes@cluster0.2w2lrmf.mongodb.net/shorecare?retryWrites=true&w=majority&appName=Cluster0")
db = client['shorecare']
beaches = db['beaches']

# ✅ Fetch all beaches
all_beaches = beaches.find({})

for beach in all_beaches:
    name = beach['name']
    stats = beach.get('monthly_stats', [])

    if len(stats) < 3:
        print(f"⏭️ Skipping {name} — not enough history.")
        continue

    # ✅ Prepare DataFrame
    df = pd.DataFrame(stats)
    df['num_events'] = df['events'].apply(lambda x: len(x) if isinstance(x, list) else 0)

    X = df[['waste_kg', 'tourists', 'num_events']]
    y = df['beach_score']

    # ✅ Train model
    model = LinearRegression()
    model.fit(X, y)

    # ✅ Predict next month’s score
    last = df.iloc[-1]
    next_features = np.array([[
        last['waste_kg'] * 1.05,
        last['tourists'] * 1.05,
        last['num_events']
    ]])
    next_score = model.predict(next_features)[0].round(2)

    next_month = "2025-07"  # 👉 TODO: Automate this!

    # ✅ Insert new month
    beaches.update_one(
        {'_id': beach['_id']},
        {'$push': {
            'monthly_stats': {
                'month': next_month,
                'waste_kg': last['waste_kg'] * 1.05,
                'tourists': last['tourists'] * 1.05,
                'events': last['events'],
                'beach_score': next_score
            }
        }}
    )

    print(f"✅ Updated {name} with new score: {next_score}")

print("🏁 Retrain done.")
