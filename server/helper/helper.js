
class Helper {

  static indexTemplate() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="description"
            content="ProperyPro Lite is a platform where people can create and search properties for sale or rent">
        <meta name="author" content="Emmanuel Nwankwo">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>PropertyPro-Lite</title>
        <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,700,800&display=swap"
            rel="stylesheet">
    </head>
    <style>
        * {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        color: #FFFFFF;
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
    }
        .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    .front-navbar {
        position: fixed;
        top: 0;
        background-color: #2F2FA2;
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 10px;
    }
    .fixed {
        position: fixed;
        z-index: 9;
    }
    .get-started {
        min-width: 150px;
        margin: 50px 10px 0 0;
        padding: 10px 0 10px 0;
        text-align: center;
        line-height: 20px;
        background-color: #F64C72;
        letter-spacing: 0.3px;
        color: #FFFFFF;
        border: none;
        outline: none;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
    }
    
        .get-started:hover {
            background-color: #F64C72;
            opacity: 0.8;
            transition-duration: 300ms;
        }
        .header {
        z-index: 2 !important;
        animation: fadein 2s;
        -moz-animation: fadein 2s; 
        -webkit-animation: fadein 2s;
        -o-animation: fadein 2s;
    }
    @keyframes fadein {
        from {
            opacity: 0;
        }
    
        to {
            opacity: 1;
        }
    }
    
    @-moz-keyframes fadein {
        from {
            opacity: 0;
        }
    
        to {
            opacity: 1;
        }
    }
    
    @-webkit-keyframes fadein { 
        from {
            opacity: 0;
        }
    
        to {
            opacity: 1;
        }
    }
    
    @-o-keyframes fadein { 
        from {
            opacity: 0;
        }
    
        to {
            opacity: 1;
        }
    }
    
        @media screen and (min-width: 768px) {
        .front-navbar {
            display: flex;
            justify-content: space-between;
            padding-bottom: 0;
            height: 70px;
            align-items: center;
        }
    
        .front-main-nav {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            padding-bottom: 0;
        }
    
            .front-main-nav li {
                margin: 0;
                padding: 0;
            }
    
        .logo {
            margin-top: 0;
            padding: 0;
        }
    
    
        .header {
            font-size: 2rem;
        }
    
    
        .get-started {
            width: 20%;
            padding: 20px 0;
            font-size: 24px;
        }
    }
    @media (min-width: 480px) and (max-width: 767px) {
    
        .get-started {
            width: 20%;
            padding: 20px 0;
            font-size: 24px;
        }
    }
    .w-100 {
        width: 100%;
    }
    .f-18 {
        font-size: 18px;
    }
    .logo {
        font-family: 'Quicksand', sans-serif !important;
        display: inline-block;
        font-size: 24px;
        margin-top: 10px;
        margin-left: 20px;
        font-weight: 700 !important;
        padding: 10px;
        color: #F64C72 !important;
    }
    
    .logo-small {
        font-weight: 300 !important;
    }
    
    .logo {
        text-decoration: none;
        line-height: 24px;
    }
    .logo-title {
        color: #F64C72;
        font-weight: 800;
        font-family: 'Quicksand', sans-serif !important;
    }
    .banner {
        background: url("https://res.cloudinary.com/enwankwo/image/upload/v1562254293/PropertyPro-Lite/background.jpg") no-repeat center;
        background-size: cover;
        padding-top: 150px;
        padding-bottom: 200px;
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    
        .banner:after {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            content: '';
            background: rgba(0,0,0,.4);
            z-index: 1;
        }
        .d-flex {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex !important;
    }
    .flex-col {
        flex-direction: column;
    }
    .j-c-center {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
    .a-i-center {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .hv-100 {
        height: 100vh !important;
    }
    .text-center {
        text-align: center;
    }
    .mt-32 {
        margin-top: 32px !important;
    }
    .p-10 {
        padding: 10px !important;
    }
    footer {
        background-color: #99738E;
        position: relative;
        bottom: 0;
        min-height: 50px;
    }
    a {
        text-decoration: none;
    }
    small > a{
        color: #F64C72 !important;
        font-weight: bold;
    }
    </style>
    <body>
        <div id="container">
            <nav class="fixed front-navbar container f-18 w-100">
                <a href="https://emmanuelnwankwo.github.io/PropertyPro-lite/UI/" class="logo">
                    PropertyPro-<span class="logo-small">Lite</span>
                </a>
            </nav>
    
            <section class="banner d-flex flex-col j-c-center a-i-center hv-100">
                <header class="header container d-flex flex-col j-c-center a-i-center f-18">
                    <h1 class="text-center">Welcome to <span class="logo-title">PropertyPro-Lite</span></h1>
                    <p class="text-center mt-32 p-10">Search and Post properties for sale and for rent in Nigeria</p>
                    <small>Developed by <a href="https://twitter.com/emmanwankwom">Emmanuel Nwankwo</a></small>
                <a href="https://emmanuelnwankwo.github.io/PropertyPro-lite/UI/" class="get-started">Go to full site</a>
                <a href="/api/docs" class="get-started">API Docs</a>
                </header>
    
            </section>
            <footer class="w-100 d-flex flex-col j-c-center a-i-center text-center">
                <p> &copy;copyright 2019 PropertyPro-Lite all rights reserved</p>
            </footer>
        </div>
    </body>
    
    </html>
        `;
  }
}

export default Helper;
