
class Helper {

  static passwordResetTemplate(url) {
    return `
    <html>
    <head>
    <title>PropertyPro-Lite</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700&display=swap" rel="stylesheet">
    <style type="text/css">
        /* FONTS */
        @media screen {
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 400;
              src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
            }
            
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 700;
              src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
            }
            
            @font-face {
              font-family: 'Lato';
              font-style: italic;
              font-weight: 400;
              src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
            }
            
            @font-face {
              font-family: 'Lato';
              font-style: italic;
              font-weight: 700;
              src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
            }
        }
        
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
    
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
    
        div[style*="margin: 16px 0;"] { margin: 0 !important; }
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
    </style>
    </head>
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#7c72dc" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="480" >
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                            <a href="https://emmanuelnwankwo.github.io/PropertyPro-lite/UI/" class="logo">
                                PropertyPro-<span class="logo-small">Lite</span>
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#7c72dc" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="480" >
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                          <h1 style="font-size: 32px; font-weight: 400; margin: 0;">Trouble signing in?</h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="480" >
                  <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                      <p style="margin: 0;">Resetting your password is easy. Just click the button below and follow the instructions. We'll have you up and running in no time. </p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" align="left">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                  <td align="center" style="border-radius: 3px;" bgcolor="#7c72dc"><a href="${url}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #7c72dc; display: inline-block;">Reset Password</a></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
            </td>
        </tr>  
    </table>
    
    </body>
    </html>
    
        `;
  }

  static resetTemplate(email = '', error = '') {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PropertyPro-Lite</title>
    <style>
        * {
            box-sizing: border-box;
        }

        html,
        body {
            height: 100vh;
        }

        body {
            padding: 0;
            margin: 0;
        }

        .form-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 80vh;
        }

        input {
            outline: none;
            padding: 0.8rem;
            margin: 0.5rem auto;
            width: 250px;
        }

        .container {
            height: 100vh;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        input[type="submit"] {
            background: #F64C72;
            border: none;
            outline: none;
            color: #FFFFFF;
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0.8;
        }

        input[type="submit"]:hover {
            opacity: 1;
        }

        fieldset {
            padding: 10px;
            border: 1px solid #6784C7;
        }

        .alert {
            padding: 10px;
            text-align: center;
            width: 250px;
            background: red;
            color: #FFFFFF;
            font-style: bold;
            overflow-wrap: break-word;
        }

        @media screen and (min-width: 768px) {

            input,
            .alert {
                width: 350px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <form action="/password/reset" method="post">
            <div class="form-container">
                <fieldset>
                    <legend>Password Reset</legend>
                    ${error}
                    <div class="form-group">
                        <label>New Password:</label>
                        <input name="password" type="password">
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input name="passwordConfirmation" type="password">
                    </div>
                    <input type="hidden" name="email" value="${email}">
                    <input type="submit" value="Reset">
                </fieldset>
            </div>
        </form>
    </div>
</body>

</html>
    `;
  }

  static successTemplate(success, url = '') {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PropertyPro-Lite</title>
    <style>
        * {
            box-sizing: border-box;
        }

        html,
        body {
            height: 100vh;
        }

        body {
            padding: 0;
            margin: 0;
        }

        .container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .success {
            width: 250px;
            overflow-wrap: break-word;
            background: green;
            color: #FFFFFF;
            font-size: 18px;
            text-align: center;
            padding: 20px 0;
        }

        a {
            background: #F64C72;
            border: none;
            outline: none;
            color: #FFFFFF;
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0.8;
            padding: 0.8rem;
            width: 10rem;
            text-align: center;
            font-size: 1rem;
            margin-top: 20px;
        }

        a:hover {
            opacity: 1;
        }

        @media screen and (min-width: 768px) {
            .success {
                width: 300px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="success">${success}</div>
        ${url}
    </div>
</body>

</html>
    `;
  }

  static errorTemplate(error) {
    return `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>PropertyPro-Lite</title>
    <style>
      * {
        box-sizing: border-box;
      }
      html,
      body {
        height: 100vh;
      }
      body {
        padding: 0;
        margin: 0;
      }

      .container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .error {
        width: 250px;
        overflow-wrap: break-word;
        background: red;
        color: #ffffff;
        font-size: 18px;
        text-align: center;
        padding: 20px 0;
      }
      @media screen and (min-width: 768px) {
        .error {
          width: 300px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="error">${error}</div>
    </div>
  </body>
</html>

      `;
  }

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
