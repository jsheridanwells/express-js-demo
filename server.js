const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');
const routes = require('./routes');

const speakerService = new SpeakersService('./data/speakers.json');
const feedbackService = new FeedbackService('./data/feedback.json');
const app = express();
const port = 3000;
app.set('trust proxy', 1); // helps cookies work when routed through reverse proxy
app.use(cookieSession({
  names: 'session',
  keys: [ // keys used to encrypt cookie
    '0987a4f1-1061-4d22-b54f-dbf01d30adfa',
    '3de1da75-e963-4323-a8c3-3307f957a3e3'
  ]
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './static')));
app.use('/', routes({
  feedbackService,
  speakerService
}));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
