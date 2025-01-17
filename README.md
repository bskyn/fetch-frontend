# Fetch Frontend Challenge

## Get Started

To run the app:
`npm install && npm run dev`

## Note

Please note do not test in your broweser incognito mode as that prevents cookies stored on the browser and the authenticated endpoint api calls will fail.

## Documentation

Deployed site link: [https://fetch-frontend.pages.dev/](https://fetch-frontend.pages.dev/)

Completed using Vite+React/TS.

For the app architecture, I chose to use react-query with axios as the client fetching library as its declarative with simple api's for the consumer to use. It also provides out of the box caching with loading and error handling. For all of the requests, I've built a custom hook each for ease of re-use and maintainability.

For the base-component library with styling, I went ahead and chose shad-cn with tailwind as my styling library. Shad-cn is builds ontop of radix and provides great component api's that are light-weight and very customizable for the consumer. I also like tailwind because it gives you ready-to-use utility classes for quick styling and development. It's also incredibly performant and lightweight.

For authentication handling, I created a `AuthProvider` context, `useAuth`, and `useLogin` hook which centralizes the logic for route handling and checks if the user has authenticated via the call to `/auth/login`. If the user is logged in, a cookie is stored in the browser with the credentials. This provider also checks if the user is logged in by calling an authenticated endpoint (in this app demo `/dogs/breeds`). This is a bit hacky, as the ideal way would be to call an endpoint to check the user auth status (e.g. `/auth/status`), however we don't have an api provided to us, so I think this is an ok solution for this challenge. If the api call fails and returns an 401 unauthenticated, we know the user will need to re-log in to our application. This auth provider context allows the user to refresh the app and still get routed to the correct page based on their authentication status.

I went ahead with react-router for the routing management. Fairly simple with a login route when users are unauthenticated, and a home route which users get routed to if they are authenticated.

In the home route, we have our search bar which houses the searching logic, favorite selection section, data dog grid cards (which is only shown if there are results), and pagination. Users can search immediately which provides the default results or they can filter and select breeds, zipcodes, min and max age, sort by, and sort order. When the click search, it should return the dogs results back to the user. Users can then select the their favorites by clicking onto a card, and that should populate the selected favorites section. User can then click on match and they will get randomly matched to a dog they love which is opened up in a modal view. Additionally, the site should be responsive to the user on either desktop or mobile view.
