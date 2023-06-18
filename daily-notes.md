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

## 6/18/23
### Slice reducer for key "goal" (keyname) returned undefined
- The slice reducer was not working
- Honing in on the problem that there was not INITAL STATE being passed which the value was null
- I knew the fix would be in the files that pertain to redux
    - goalService.js
    - goalSlice.js
- Particularly in the reducer/slice
- sure enough I noticed that I had misspelled initialState and initalState