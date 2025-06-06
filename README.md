# Fullstack Web Application (Next.js + Express.js + Cloud Firestore + Twilio)

## Front-end (Next.js + Tailwind CSS + shadcn/ui)

### Structure

- Sign in with phone number page for Owner
- Phone verification page
- Dashboard page include:
	+ Employee management (Add, edit, delete, filter)
	+ Task management (Not done)
	+ Message (Not done)

### Run front-end

```bash
#Change directory Front-end
cd Front-end/

#Install dependencies necessary
npm i

#Run dev environment
npm run dev

#Run product environment
npm run build
npm run start
```

## Back-end (Express.js + Cloud Firestore + Twilio)

### Structure

- Employee module: CURD employee basic
- Auth module: createNewAccessCode to send sms for Owner and validateAccessCode to authentication and return jwt
- Message module (Not done)
- Employee role (Not done)

### Run back-end

```bash
#Change directory Back-end
cd Back-end/

#Install dependencies necessary
npm i

#Create file .env from file .env.example
cp .env.example .env

#Config firebase, jwt secret and twilio in file .env
#Example
PORT=8000
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1h

FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id

TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

#Run back-end
npm start
```