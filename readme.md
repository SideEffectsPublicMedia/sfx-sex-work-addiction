# Pregnant and Addicted
The [Side Effects Public Media](http://sideeffectspublicmedia.org/) special project ___.

## Deployment
This project uses Gulp.js, a toolkit for automated building and deployment. Here's what you need to do to get things going:

1. Make sure you have the base dependencies available. These include Node.js (Ideally 5 or greater), Gulp.js global (can be installed with `npm install -g gulp`) Python 2, Ruby, Compass ans Susy, some sort of bash shell and the AWS-CLI tool (only if you will be deploying to Amazon S3).

2. Clone this repository.

3. Install all other dependencies. Navigate to the base project directory in your command line and enter `npm install`. This could take a little while, so go get a cup of coffee.

4. Make an initial build of the project: `gulp build`

5. At this point, if you want to see what you have put together, you can easily make your machine into a temporary staging server -- just navigate to the build directory in your bash shell and type `python -m SimpleHTTPServer 8989` (you can use any port number at the end of this command, but it's very unlikely you're running anything else taking port 8989). Now you can open a web browser and type `localhost:8989` to see a live version of the site hosted from your computer.

6. Once you are ready to deploy, you can change this line in `gulpfile.js` to reflect your own profiles and upload destination on Amazon S3: `aws s3 cp build s3://apps.kbia.org/*** --recursive --profile kbia`. After that, just run `gulp upload` to deploy to Amazon S3. If you want to deploy differently, you can simply move the contents of the build folder to your deployment destination. 