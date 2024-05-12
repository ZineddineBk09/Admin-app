# NextJS and NextUI Dashboard

You can see the demo here: https://restaurant-driver-app.vercel.app/

```bash
├── components
│   ├── admin
│   │   ├── areas
│   │   │   ├── cities
│   │   │   │   └── city
│   │   │   ├── countries
│   │   │   └── governorates
│   │   ├── clients
│   │   │   ├── accounts
│   │   │   └── branches
│   │   │       └── branch
│   │   ├── drivers
│   │   │   ├── drivers-types
│   │   │   ├── list
│   │   │   │   └── driver
│   │   │   ├── shared
│   │   │   └── teams
│   │   ├── map
│   │   │   └── tabs
│   │   ├── orders
│   │   │   ├── auto-cancel
│   │   │   └── list
│   │   ├── reports
│   │   ├── settings
│   │   │   ├── access-profiles
│   │   │   └── users-access
│   │   └── support
│   │       └── files-upload
│   ├── client
│   │   └── orders
│   ├── customer
│   ├── guards
│   ├── hooks
│   ├── icons
│   │   ├── areas
│   │   ├── drivers
│   │   ├── map
│   │   ├── navbar
│   │   ├── orders
│   │   ├── permissions
│   │   ├── sidebar
│   │   ├── support
│   │   └── table
│   ├── layout
│   ├── login
│   ├── modals
│   ├── navbar
│   ├── shared
│   ├── sidebar
│   ├── styles
│   └── table
│       ├── admin
│       │   ├── orders
│       │   └── reports
│       └── client
│           └── orders
├── context
│   ├── admin
│   │   ├── areas
│   │   ├── auto-cancelled-orders
│   │   ├── clients
│   │   ├── drivers
│   │   ├── map
│   │   ├── orders
│   │   ├── reports
│   │   ├── support
│   │   └── users
│   └── client
│       └── orders
├── Dockerfile
├── docs
│   ├── auto-cancel-orders
│   ├── orders-payment-method
│   ├── orders-payment-type-filter
│   └── transfer-order-to-another-driver
├── firebase
├── hooks
├── interfaces
├── lib
│   ├── api
│   ├── search
│   └── socket
├── pages
│   ├── admin
│   │   ├── areas
│   │   ├── clients
│   │   ├── customers
│   │   ├── dashboard
│   │   ├── drivers
│   │   ├── orders
│   │   ├── pricing
│   │   ├── reports
│   │   ├── settings
│   │   └── support
│   ├── api
│   │   └── auth
│   ├── client
│   │   ├── orders
│   │   └── settings
│   └── customer
│       └── select-location
├── public
│   └── images
│       └── icons
├── styles
├── types
└── utils
```
## For Run

Fill in the environment variables in .env.local.example and rename the file to .env.local

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
...
```


Install dependencies

    
```bash
npm install
```

Start the server

    
        
```bash
npm run dev
```

Now you can visit https://localhost:3000 in your browser.
