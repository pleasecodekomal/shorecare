from pymongo import MongoClient

from dotenv import load_dotenv
import os
# Load .env
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://komal2:mangoes@cluster0.2w2lrmf.mongodb.net/shorecare?retryWrites=true&w=majority&appName=Cluster0")
DB_NAME = os.getenv("MONGO_DB", "shorecare")
client = MongoClient(MONGO_URI)
db=client[DB_NAME]
collection = db["ngo_ai"]

ngo_ai_prompts = [
    {
        "prompt": "Write me an invite for beach drives",
        "context": "We are hosting a community beach cleanup drive this weekend to protect marine life..."
    },
    {
        "prompt": "Help me with quotes related beach cleanup",
        "context": "One person can make a difference, and everyone should try..."
    },
    {
    "prompt": "Write me an invite for beach cleanup drives",
    "context": "We are organizing a community beach cleanup drive this weekend to protect marine life, spread awareness about plastic pollution, and encourage civic responsibility. We warmly invite you, your friends, and your family to join hands with us to make our shoreline cleaner and safer. Refreshments and cleanup equipment will be provided. Together, let's make a visible impact!"
    },
    {
        "prompt": "Help me with quotes related beach cleanup",
        "context": "Here are some inspirational quotes you can use for your beach cleanup campaigns: 'One person can make a difference, and everyone should try.'- by John F. Kennedy. 'The ocean stirs the heart, inspires the imagination, and brings eternal joy to the soul.' -by Wyland. 'Take nothing but memories, leave nothing but footprints.' - Chief Seattle. Use such quotes to motivate volunteers and spread awareness."
    },
    {
        "prompt": "How to properly do the best skill deployment for each drive",
        "context": "To deploy volunteer skills effectively for each beach drive, first identify the key roles: logistics coordinators, on-site waste handlers, media and photography teams, social media managers, and community liaisons. Match volunteers to these roles based on their experience and interests. Hold a quick pre-event briefing to communicate responsibilities and ensure smooth coordination during the drive."
    },
    {
        "prompt": "How to efficiently communicate with CSR members",
        "context": "Maintain strong communication with CSR partners by providing them with regular updates on impact metrics, detailed post-event reports, and photos from each cleanup drive. Schedule periodic check-ins, share success stories, and express gratitude through personalized thank-you emails and certificates. Keeping CSR members engaged builds long-term partnerships and attracts more support."
    },
    {
        "prompt": "Give me ideas to make a poster to promote the drive",
        "context": "Create an eye-catching poster for your beach cleanup drive by including an impactful slogan, high-quality visuals of clean beaches and marine life, and a clear call to action. Mention the event date, time, location, contact details, and a QR code for easy registration. Use vibrant colors and simple layouts to attract attention and encourage community participation."
    },
    {
        "prompt": "How to manage volunteers properly in the time of cleanup drive",
        "context": "Proper volunteer management during a beach cleanup involves assigning clear roles, designating team leaders, maintaining a sign-in/sign-out register, and ensuring all volunteers have safety gear. Give a short briefing on tasks, safety protocols, and waste handling before starting. Keep everyone motivated with small breaks, refreshments, and appreciation for their efforts."
    },
    {
        "prompt": "How to handle irresponsible behaviour of volunteers",
        "context": "If volunteers behave irresponsibly during a cleanup, address the issue calmly but firmly. Remind them of the code of conduct they agreed to before the event. If needed, have a designated team leader speak to them privately to correct the behavior. Consistently communicate expectations and enforce rules respectfully to maintain a positive atmosphere."
    },
    {
        "prompt": "What are the strict beach cleanup policies do I need to include",
        "context": "Your strict beach cleanup policies should cover: no littering during the cleanup, mandatory use of gloves and safety gear, proper segregation of waste into recyclable and non-recyclable categories, punctual arrival and departure, respectful conduct toward fellow volunteers and local communities, and adherence to any local government or environmental guidelines for beach conservation."
    }
]

ngo_ai_faqs = [
    {
        "question": "How to manage volunteers?",
        "answer": "Use the volunteer dashboard features..."
    },
  {
    "question": "How can I register as a ngo?",
    "answer": "You can register via the ShoreCare NGO Dashboard under 'Profile & Settings'."
  },
  {
    "question": "How do I connect to new Corporate Sponser Relationship members(CSR Members)?",
    "answer": "CSR Members will contact you themselves when they want to be a part of cleanup drives"
  },
  {
    "question": "How can NGOs create new cleanup drives?",
    "answer": "NGOs can create drives through the NGO Dashboard under 'My Drives'."
  },
  {
    "question": "Where do I see impact analytics?",
    "answer": "Impact analytics are available under the 'Reports' section in the NGO Dashboard."
  }
]

db.ngo_ai_prompts.delete_many({})
db.ngo_ai_faqs.delete_many({})

db.ngo_ai_prompts.insert_many(ngo_ai_prompts)
db.ngo_ai_faqs.insert_many(ngo_ai_faqs)

print("✅ DB seeded successfully!")
