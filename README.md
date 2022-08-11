<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Project developed by Frank Su, Eddy Wong, Zachary Ngooi and Alex Sanders for [COMP9447](https://www.handbook.unsw.edu.au/postgraduate/courses/2022/COMP9447?year=2022) during 22T2.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [React](https://reactjs.org/)
-   [AWS Lambda](https://aws.amazon.com/lambda/)
-   [AWS S3](https://aws.amazon.com/s3/)
-   [Github Actions](https://github.com/features/actions)

<!-- GETTING STARTED -->

## Getting Started

### Deploying React App (Hosting Locally)

1. Clone the repo
    ```sh
    $ git clone https://github.com/XelaSnad/IAM-Static-FRONTEND
    ```
2. Install dependencies
    ```sh
    $ npm install
    ```
3. Deploy lambda function with the files in extra/lambda
4. Deploy an api gateway for the function with the files in extra/apigateway
5. Change the lambda function link in .env to the link you have generated from steps 3 and 4
6. Start Application Locally
    ```sh
    $ npm start
    ```
     <p align="right">(<a href="#top">back to top</a>)</p>

### Deploying React App via Actions to a Static S3 Bucket
1. Clone and Fork The Repo i.e. on Github when you are cloning select 'For My Own Purposes ... ME/IAM-Static-Frontend
2. Create an S3 Bucket that is a static website.
3. Create a role that has get and put rights upon the S3 Bucket.
4. Upload the secrets to github so we can fulfill the yaml file in 
   ```
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
   ```
   With AWS_REGION being the region your bucket is hosted
5. Update the YAML file as follows
  ```
  run: aws s3 sync ./build/ s3://static-iam-frontend --delete
  ```
  replace 'static-iam-frontend' with the name of your s3 bucket 
6. Now make sure your github actions executes and any time you push you will update you 'website'.
7. Deploy lambda function with the files in extra/lambda
8. Deploy an api gateway for the function with the files in extra/apigateway
9. Change the lambda function link in .env to the link you have generated from steps 7 and 8
<!-- ROADMAP -->

## Roadmap

-   [] Implement diff checker
-   [] Make website deployable via github pages
-   [] Lambda and API gateway deployment pipeline

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

-   E.W
-   A.U

<p align="right">(<a href="#top">back to top</a>)</p>
