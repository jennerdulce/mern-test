# Notes

## 6/16/23
### Submit button not working
- On 'Register' page, submit button was not working
- retraced to authSlice and authService to see if there were any errors
- noticed that this should make a request to the backend API in order to create a new user
- in `authService.js`
    - `API_URL` is `'api/users/'`
- the correct route for the API typically looks like `localhost:3000/api/users`
- i previously added a proxy to the frontend `package.json` and set it to `5000` which was wrong
    - i then changed it to the correct localhost that my backend is running on
    - this solved the issue