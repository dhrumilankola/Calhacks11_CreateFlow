from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from datetime import datetime
from dotenv import load_dotenv
import os
load_dotenv()



app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

def generate_schedule(post_frequency):
    prompt = f"""Generate a posting schedule for {post_frequency} posts per week.
    Format the response as a markdown list with emojis, like this:
    
    1. 📅 [Day] at [Time]
    2. 📅 [Day] at [Time]
    3. 📅 [Day] at [Time]
    """
    
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

def generate_summaries(area_of_interest, content_type, keywords, schedule):
    prompt = f"""Given the following context:
    - Area of interest: {area_of_interest}
    - Content type: {content_type}
    - Keywords: {', '.join(keywords)}
    - Schedule: {schedule}

    Generate brief summaries for {len(schedule.split('\n'))} posts.
    Format the response as a markdown list with emojis related to the content, like this:
    
    1. 📌 [Emoji] Brief summary of post 1
    2. 📌 [Emoji] Brief summary of post 2
    3. 📌 [Emoji] Brief summary of post 3
    """
    
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

def generate_full_posts(area_of_interest, content_type, keywords, schedule, summaries):
    current_date = datetime.now().strftime('%Y-%m-%d')
    prompt = f"""Given the following context:
    - Area of interest: {area_of_interest}
    - Content type: {content_type}
    - Keywords: {', '.join(keywords)}
    - Schedule: {schedule}
    - Summaries: {summaries}

    Generate full content for each post. Format each post as follows:

    ### Post [Number] - {current_date}
    
    #### 🚀 [Catchy Title]
    
    [Full content of the post]
    
    **Key Points:**
    - 🔑 [Key point 1]
    - 🔑 [Key point 2]
    - 🔑 [Key point 3]
    
    #[Hashtag1] #[Hashtag2] #[Hashtag3]
    """
    
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

@app.route('/schedule', methods=['POST'])
def generate_content():
    try:
        data = request.get_json()
        area_of_interest = data.get('area_of_interest')
        content_type = data.get('content_type')
        post_frequency = data.get('post_frequency')
        keywords = data.get('keywords')

        schedule = generate_schedule(post_frequency)
        summaries = generate_summaries(area_of_interest, content_type, keywords, schedule)
        full_posts = generate_full_posts(area_of_interest, content_type, keywords, schedule, summaries)

        return jsonify({
            'schedule': schedule,
            'post_summaries': summaries,
            'full_posts': full_posts,
        }), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'detail': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)