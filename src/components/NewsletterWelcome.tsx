// src/components/NewsletterWelcome.tsx

import * as React from 'react';

interface NewsletterWelcomeProps {
  name?: string;
}

export const NewsletterWelcome: React.FC<NewsletterWelcomeProps> = ({ 
  name = 'There' 
}) => {
  return (
    <html dir="ltr" lang="en">
      <head>
        <meta content="width=device-width" name="viewport" />
        <style>{`
          body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #fffeff;
            margin: 0;
            padding: 0;
            color: #333333;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 2px 12px rgba(0, 100, 169, 0.08);
            overflow: hidden;
          }
          .header {
            background-color: #ffffff;
            text-align: center;
            padding: 40px 20px 30px;
            color: #0064a9;
          }
          .header img {
            width: 120px;
            margin-bottom: 10px;
          }
          .header h1 {
            margin: 10px 0 5px;
            font-size: 24px;
            color: #0064a9;
          }
          .header p {
            font-size: 14px;
            margin-top: 4px;
            color: #0064a9;
          }
          .content {
            padding: 30px 25px;
            line-height: 1.7;
          }
          .content h2 {
            color: #0062a8;
            font-size: 20px;
            margin-top: 0;
          }
          .content p {
            font-size: 15px;
            color: #333333;
            margin: 12px 0;
          }
          .highlight {
            color: #0d9db9;
            font-weight: 600;
          }
          ul {
            padding-left: 18px;
            margin: 15px 0;
          }
          ul li {
            margin-bottom: 8px;
          }
          .social {
            text-align: center;
            padding: 25px 20px;
            background-color: #f4f9fc;
          }
          .social p {
            font-weight: 600;
            color: #0064a9;
            margin-bottom: 12px;
          }
          .social-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
          }
          .social-icons a {
            display: inline-block;
            text-decoration: none;
          }
          .social-icons img {
            width: 30px;
            height: 30px;
            vertical-align: middle;
            transition: transform 0.2s ease;
          }
          .social-icons img:hover {
            transform: scale(1.1);
          }
          .footer {
            background-color: #0064a9;
            color: #ffffff;
            text-align: center;
            padding: 15px;
            font-size: 13px;
          }
          .footer a {
            color: #d9ecff;
            text-decoration: none;
          }
          @media (max-width: 600px) {
            .content {
              padding: 25px 18px;
            }
            .header h1 {
              fontSize: 20px;
            }
            .header img {
              width: 100px;
            }
            .social-icons img {
              width: 26px;
              height: 26px;
            }
          }
        `}</style>
      </head>
      <body>
        <div style={{display:'none',overflow:'hidden',lineHeight:'1px',opacity:0,maxHeight:0,maxWidth:0}} data-skip-in-text="true">
          Your LocalDrive newsletter journey begins with expert driving tips and updates!
          <div>
            &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
          </div>
        </div>

        <table align="center" width="100%" border={0} cellPadding={0} cellSpacing={0} role="presentation">
          <tbody>
            <tr>
              <td>
                <div className="container">
                  <table align="center" width="100%" border={0} cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody style={{width: '100%'}}>
                      <tr style={{width: '100%'}}>
                        <td align="center">
                          <img
                            alt="LocalDrive logo with a car icon inside a location pin, representing a local transportation or car-sharing service."
                            height="103"
                            src="https://resend-attachments.s3.amazonaws.com/0CciF10Ftgavv02"
                            style={{display: 'block', outline: 'none', border: 'none', textDecoration: 'none', backgroundColor: '#ffffff'}}
                            width="154"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="header">
                    <h1>💌 You're Officially Subscribed!</h1>
                    <p>Welcome to the LocalDrive Newsletter 🚗</p>
                  </div>
                  
                  <div className="content">
                    <p>Hi <strong>{name}</strong> 👋</p>
                    <p>Thanks for subscribing to the LocalDrive Newsletter!</p>
                    <p>You're now part of a growing community that's redefining how Nigerians learn to drive — smarter, safer, and stress-free.</p>
                    <p>At LocalDrive, we don't just teach driving — we empower confidence behind the wheel with real-life lessons that fit your lifestyle.</p>
                    
                    <h2>Here's what you'll get from us:</h2>
                    <ul>
                      <li>✅ Driving tips tailored for Nigerian roads</li>
                      <li>✅ Exclusive updates on our app launch</li>
                      <li>✅ Stories from real learners and instructors</li>
                      <li>✅ Early invites to LocalDrive events & offers</li>
                    </ul>
                    
                    <p>We'll drop fresh insights, product updates, and opportunities straight to your inbox — no spam, just value 🚀</p>
                  </div>
                  
                  <div className="social">
                    <p>Stay connected with us:</p>
                    <div className="social-icons">
                      <img alt="Instagram" src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" />
                      <img alt="LinkedIn" src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" />
                      <img alt="Twitter X" src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" />
                    </div>
                  </div>
                  
                  <div className="footer">
                    <p>Your Journey to Confident Driving Starts Here 🚗 Learn, Book, Drive Smarter.</p>
                    <p>© 2025 LocalDrive | <a href="https://localdriveapp.com" style={{color: '#d9ecff', textDecoration: 'none'}}>localdriveapp.com</a></p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default NewsletterWelcome