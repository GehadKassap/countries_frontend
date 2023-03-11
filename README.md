# Countries

This small application is mainly about showing all countries with some info like country flag , country code and some phone numbers and the status of the phone which refer to if this phone number matches the regex pattern of this country or not and then determine the status according to this .

The user can select any country from dropdown menu and write any phone number and then hits save the phone and it will be saved in our database and iternally will check if this phone number matches our regex or not then automatically will apply status ok which means valid and nok which means invalid phone number

The user can also search for specific country and get all countries with its info even the valid phone number and also invalid phone number and also he/she can filter the data with only the status so if he/she hits nok it will search for all countries that has this status and show it .

The user can also update the phone number and sure thing that it will be reflect in phone status too and also can record specific country .

## Deployment

To deploy this project clone the project

```bash
  https://github.com/GehadKassap/countries_frontend.git
```

Then after clone it . install node modules file by

```bash
  npm i
```

or

```bash
  npm istall
```

then serve the project by write in terminal

```bash
  npm run serve
```

and also make sure that the backend project is served to get countries and see the output as it's deployed locally .
to install the backend project

```bash
  https://github.com/GehadKassap/countries_backend.git
```
