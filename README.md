# lawalbolaji.github.io

🎆 This repo demonstrates a basic CI workflow that runs an image regression test everytime a commit is made to this github repo.

This is achieved by:
1. Taking a screenshot of the webpage and storing that as baseShot.png
2. Running a script that takes a screenshot of the page everytime a commit is made.
3. Running a regression test on the two images to determine if any breaking changes have been made to the site.
4. Updating the image in README.md to reflect the current look of the website.

The image will be updated automatically everytime there is a new commit on the project repo.

![Live image of site](https://s3.us-east-2.amazonaws.com/bonango.io-screenshots/pageShot.png)
