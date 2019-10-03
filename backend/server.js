import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
// eslint-disable-next-line import/named
import { Staff, Organisation } from './data';

const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb+srv://antkiewiczk:Ax1e25Prla@antkiewiczk-qnlaw.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// set port as 3001 unless specified otherwise
app.set('port', process.env.PORT || 3001);

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Staff.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
});

// get organisation
router.get('/getOrganisation', (req, res) => {
  Organisation.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
});

// create organisation
router.put('/putOrganisation', (req, res) => {
  const organisation = new Organisation();

  const {
    name, city, ownerFullName, operatingHours,
  } = req.body;
  console.log('req.body', req.body);
  if (!name || !city || !ownerFullName || !operatingHours) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  organisation.name = name;
  organisation.city = city;
  organisation.ownerFullName = ownerFullName;
  organisation.operatingHours = operatingHours;
  organisation.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: organisation });
  });
});

router.delete('/deleteOrganisation', (req, res) => {
  const { id } = req.query;
  console.log('id', id);
  Organisation.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Staff.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Staff.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {
  const data = new Staff();

  const {
    id, fullName, position, schedule,
  } = req.body;

  if ((!id && id !== 0) || !fullName || !position) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.fullName = fullName;
  data.schedule = schedule;
  data.position = position;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(app.get('port'), () => console.log(`LISTENING ON PORT ${app.get('port')}`));
