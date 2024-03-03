# NextJS and NextUI Dashboard

You can see the demo here: https://restaurant-driver-app.vercel.app/

```
├── components
│   ├── areas
│   │   ├── cities
│   │   │   └── city
│   │   ├── countries
│   │   └── governorates
│   ├── clients
│   │   ├── accounts
│   │   └── branches
│   │       └── branch
│   ├── customer
│   ├── drivers
│   │   ├── drivers-types
│   │   ├── list
│   │   └── teams
│   ├── guards
│   ├── hooks
│   ├── icons
│   │   ├── areas
│   │   ├── drivers
│   │   ├── map
│   │   ├── navbar
│   │   ├── orders
│   │   ├── permissions
│   │   ├── sidebar
│   │   ├── support
│   │   └── table
│   ├── layout
│   ├── login
│   ├── map
│   │   └── tabs
│   ├── navbar
│   ├── orders
│   │   ├── auto-cancel
│   │   └── list
│   ├── reports
│   ├── settings
│   │   ├── access-profiles
│   │   └── users-access
│   ├── shared
│   ├── sidebar
│   ├── styles
│   ├── support
│   │   └── files-upload
│   └── table
│       ├── drivers
│       ├── orders
│       └── reports
├── context
│   ├── areas
│   ├── auto-cancelled-orders
│   ├── clients
│   ├── drivers
│   ├── map
│   ├── orders
│   ├── reports
│   ├── support
│   └── users
├── docs
│   ├── auto-cancel-orders
│   ├── orders-payment-method
│   ├── orders-payment-type-filter
│   └── transfer-order-to-another-driver
├── firebase
├── interfaces
├── lib
│   ├── api
│   └── search
├── pages
│   ├── api
│   │   └── auth
│   ├── areas
│   ├── clients
│   ├── customer
│   │   └── choose-location
│   ├── customers
│   ├── dashboard
│   ├── drivers
│   ├── orders
│   ├── pricing
│   ├── reports
│   ├── settings
│   └── support
├── public
│   └── images
│       └── icons
├── styles
├── types
└── utils1
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
