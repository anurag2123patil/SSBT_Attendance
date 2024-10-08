const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://anuragpatil01978:qZac6Xq3YuGlIXv3@cluster0.3o7pt.mongodb.net', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

connectDb();

const studentSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true } ,
  prn: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  section: { type: String, required: true },

});

const StudentTEA = mongoose.model('TEA', studentSchema);
const StudentTEB = mongoose.model('TEB', studentSchema);
const StudentTEC = mongoose.model('TEC', studentSchema);

const getStudentModel = (section) => {
  switch (section) {
    case 'A': return StudentTEA;
    case 'B': return StudentTEB;
    case 'C': return StudentTEC;
    default: throw new Error('Invalid section');
  }
};


const validateStudentData = (data) => {
  const { prn, password, mobile, branch, year, section } = data;
  if (!prn || !password || !mobile || !branch || !year || !section) {
    return 'All fields are required.';
  }
  if (!/^\d{16}$/.test(prn)) {
    return 'PRN must be exactly 16 digits long.';
  }
  return null;
};

app.post('/add-student', async (req, res) => {
  const validationError = validateStudentData(req.body);
  if (validationError) {
    return res.status(400).send(validationError); 
  }

  const { prn, password, mobile, branch, year, section } = req.body;

  try {
    const Student = getStudentModel(section);

    const lastStudent = await Student.findOne().sort({ serialNumber: -1 }).limit(1);
    const newSerialNumber = lastStudent ? lastStudent.serialNumber + 1 : 1;

    console.log('New Serial Number:', newSerialNumber); e

    const newStudent = new Student({
      prn,
      password,
      mobile,
      branch,
      year,
      section,
      serialNumber: newSerialNumber
    });

    await newStudent.save();
    res.status(200).send('Student added');
  } catch (error) {
    console.error('Error adding student:', error.message);  
    res.status(500).send('Error adding student');
  }
});

app.post('/login', async (req, res) => {
  const { prn, password } = req.body;

  try {
    for (const section of ['A', 'B', 'C']) {
      const Student = getStudentModel(section);
      const student = await Student.findOne({ prn, password });
      if (student) {
        return res.json({ success: true });
      }
    }

    res.json({ success: false });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

app.delete('/remove-student/:prn', async (req, res) => {
  const { prn } = req.params;
  const { section } = req.body;
 
  console.log('Received section:', section); 

  try {
    const Student = getStudentModel(section);
    const result = await Student.deleteOne({ prn });

    if (result.deletedCount === 0) {
      return res.status(404).send('Student not found');
    }

    res.status(200).send('Student removed');
  } catch (error) {
    console.error('Error removing student:', error.message);
    res.status(500).send('Error removing student');
  }
});

app.get('/students', async (req, res) => {
  const { branch, year, section } = req.query;

  try {
    const Student = getStudentModel(section);
    const students = await Student.find({ branch, year, section }).select('prn password mobile branch year section serialNumber');
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error.message);  
    res.status(500).send('Error fetching students');
  }
});

app.get('/prns', async (req, res) => {
  const { section } = req.query;

  try {
    const Student = getStudentModel(section);
    const prns = await Student.find({}, 'prn');
    res.status(200).json(prns);
  } catch (error) {
    console.error('Error fetching PRNs:', error.message);
    res.status(500).send('Error fetching PRNs');
  }
});

app.listen(5002, () => {
  console.log('Server running on port 5002');
}); 