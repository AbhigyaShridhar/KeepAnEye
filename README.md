# KeepAnEye

Keep an Eye is a chrome browser extension which runs in the background and sends a notification to the registered mobile number if inflamatory/vulgar/hateful text is detected

## Collaborators: [Abhigya](https://github.com/AbhigyaShridhar) [Meryl](https://github.com/wetstapler) [Gianni](https://github.com/giannicrivello)

## Powered by:

 - twilio: for authentication and generating notifications
 - cockroachDB: for hosting the database
 - Linode: for hosting the backend

API: http://45.79.123.200/docs

Routes:
 - ```/current```: Gets the credentials of the current user
 - ```/otp```: Sends an OTP to the given phone number if correct (along with the country code)
 - ```/auth```: Verifies OTP, if the user with given phone number doesn't exist, creates the user else logs them in
 - ```/check```: Takes a string and returns if the string contains trigger words
 - ```/notify```: Sends a notification to the authenticated number along with the URL which triggered the notification

To run the project:
 - go to the frontend directory
 - ctr + shift + f and search for 127.0.0.1:8000, and replace that with either the about given **API** route or your custom route (if you create one for testing)
 - Add the extension to your google chrome profile by simply dropping the `frontend` directory in the add box
 - Authenticate
