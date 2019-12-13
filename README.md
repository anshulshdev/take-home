# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

This is a simple rails app for take-home project(using Rails 6, webpacker + react-rails gems).

* How to run the application.
1. Simply bundle install, db create/migrate and then run seed. Inside seed file, I've added all of the records you provided inside data.json file.
2. After finishing this, simply run rails server.
3. You can see custom table react component on the root page.
4. We have the User model which has all of the records, CustomTable component inside app/javascript/components which is our main component.
Also we have users_controller/index method which provides paginated data to the frontend.
5. I've added loading animation while API fetching, but it's quite fast to load new data, so maybe you can't notice that. ;)

* Things to improve
1. We need to use debounced API call - right now we only have 100 records. But if we have millions of records, we should implement debounced API call for the performance.
2. I tried to keep the component as simple as possible - so I have per page param as 10. Maybe we can add a dropdown to select more records to show.
