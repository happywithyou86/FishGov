(function() {
  'use strict';

  module.exports = {
    FACEBOOK_SECRET           : '846afb68eb37526fd74b61bd4291fc16',
    FACEBOOK_ACCESS_TOKEN_URL : 'https://graph.facebook.com/oauth/access_token',
    FACEBOOK_GRAPHAPI_URL     : 'https://graph.facebook.com/me',
    GOOGLE_SECRET             : 'cj7XlTFoISLGZsBpNktjTjid',
    GOOGLE_ACESS_TOKEN_URL    : 'https://accounts.google.com/o/oauth2/token',
    GOOGLE_API_URL            : 'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
    LINKEDIN_SECRET           : 'KfXHyaG4zFKx84p5',
    LINKEDIN_ACCESS_TOKEN_URL : 'https://www.linkedin.com/uas/oauth2/accessToken',
    LINKEDIN_API_URL          : 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)?format=json',
    EMAIL_SECRET              : 'something',
    dbName                    : 'mongodb://localhost:27017/magens',
    API                       : true
  };
}());
