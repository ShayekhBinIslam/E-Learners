# E-Learners

E-Learners is a CS-related eLearning platform for school students, built using Django and React, with a PostgreSQL database. The platform is designed to provide a comprehensive learning experience for students and teachers, including a range of tools and resources to facilitate effective learning.

## Demo link:
https://drive.google.com/file/d/1fmS0ZbMPjjLyP_MbB0XSaCcK8tH7LU_I/view?usp=sharing

## Features

Some of the features of eLearning include:

- User authentication and authorization
- Course management and enrollment
- Content creation and management, including text, images, videos, and quizzes
- Progress tracking and assessment tools
- Multi-language support

## Requirements

To use eLearning, you will need:

- Python 3.x
- Django
- React-Node.js
- PostgreSQL

## Installation

1. Clone the repository
2. Install Python packages: `pip install -r requirements.txt`
3. Install Node.js packages: `npm install`
4. Create a PostgreSQL database for eLearning
5. Update the database settings in `elearning/settings.py`
6. Run migrations: `python manage.py migrate`
7. Load initial data: `python manage.py loaddata fixtures.json`
8. Build the React app: `npm run build`
9. Start the Django server: `python manage.py runserver`

## Usage

After installation, you can access the eLearning platform by navigating to `http://localhost:8000` in your web browser. The platform provides a comprehensive user interface that includes a range of tools and resources for both students and teachers.

## Contributing

If you would like to contribute to eLearning, please create a pull request with your proposed changes. We welcome all contributions that improve the platform and make it more effective for students and teachers.

## License

E-Learners is released under the MIT License. You are free to use, modify, and distribute the platform as you see fit. However, we do not provide any warranties or guarantees for the platform, and we are not liable for any damages or losses that may arise from its use.


