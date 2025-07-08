# Bangladesh Board Results Proxy

This project lets you fetch Bangladesh board results even when the official site is overloaded. It uses Netlify Functions to proxy requests and handle captcha/session.

## Features
- Fetches captcha image and session from eboardresults.com
- Lets user input all required info and captcha
- Proxies result request to official server
- Deployable to Netlify (free tier)

## Setup
1. Clone this repo
2. Run `npm install`
3. Run locally: `npm start` (for frontend) or `netlify dev` (for full stack)

## Deploy
- Push to GitHub and connect to Netlify
- Netlify will auto-detect and deploy

## Usage
- Fill in exam, year, board, roll, reg, captcha
- Reload captcha if needed
- See your result instantly

## Notes
- This is an unofficial tool. Use responsibly.
- For educational/demo purposes only. 